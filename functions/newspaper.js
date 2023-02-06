const reports_model = require('../models/reports')
const { getOrderByDate, getAllReports } = require('./user')

const newspaperOrder = (date) => {
    return new Promise(async (resolve, reject) => {
        const poster = await getOrderByDate(date).then(data => { return data }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        })
        const firstPage = poster.filter(u => { return u.b.size === 'FirstPage' || u.b.size === 'DoubleFirst' }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        })
        const arrPage = poster.filter(u => { return u.b.size === "Page" }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        })
        const arrHalfWidth = poster.filter(u => { return u.b.size === "HalfToWidth" }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        })
        const arrHalfVertical = poster.filter(u => { return u.b.size === "HalfToVertical" }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        })
        const arrQuarterWidth = poster.filter(u => { return u.b.size === "QuarterToWidth" }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        })
        const arrQuarterVertical = poster.filter(u => { return u.b.size === "QuarterToVertical" }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        })
        const back = poster.filter(u => { return u.b.size === "Back" }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        })
        const report = await getAllReports().then(data => { return data }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
        if (report) {
            const arrbeginreport = []
            for (let i = 0; i < firstPage.length; i++)
                arrbeginreport.push(firstPage.pop())
            report.map((u) => {
                for (let i = 0; i < u.pages.length; i++) {
                    const element = u.pages[i];
                    switch (element) {
                        case 1:
                            arrbeginreport.push(u)
                            if (u.side != "double")
                                checkingPage(arrPage, arrHalfVertical, arrHalfWidth, arrQuarterVertical, arrbeginreport)
                            break;
                        case 5:
                            arrbeginreport.push(u)
                            if (arrHalfVertical.length >= 1)
                                arrbeginreport.push(arrHalfVertical.pop(1))
                            else {
                                if (arrHalfWidth.length >= 1)
                                    arrbeginreport.push(arrHalfWidth.pop(1))
                                else
                                    checkingQuarter(arrQuarterVertical, arrbeginreport)
                            }
                            break;
                        case 75:
                            arrbeginreport.push(u)
                            if (arrQuarterWidth)
                                arrbeginreport.push(arrQuarterWidth.pop(1))
                            else
                                arrbeginreport.push(arrQuarterVertical.pop(1))
                            break;
                        default:
                            arrbeginreport.push(u)
                    }
                }
            })
            arrbeginreport.push(back.pop(1))
            resolve(arrbeginreport)
        }
    })
}
const checkingPage = (arrPage, arrHalfVertical, arrHalfWidth, arrQuarterVertical, arrbeginreport) => {
    if (arrPage.length >= 1) {
        arrbeginreport.push(arrPage.pop(1))
    }
    else {
        checkingHalf(arrHalfVertical, arrHalfWidth, arrQuarterVertical, arrbeginreport)
    }
}
const checkingHalf = (arrHalfVertical, arrHalfWidth, arrQuarterVertical, arrbeginreport) => {
    if (arrHalfWidth.length >= 2) {
        arrbeginreport.push(arrHalfWidth.pop(1))
        arrbeginreport.push(arrHalfWidth.pop(1))
    }
    else {
        if (arrHalfWidth.length === 1) {
            arrbeginreport.push(arrHalfWidth.pop(1))
            checkingQuarter(arrQuarterVertical, arrbeginreport)
        }
        else {
            if (arrHalfWidth.length < 1) {
                // 2 חצאים לאורך
                if (arrHalfVertical.length >= 2) {
                    arrbeginreport.push(arrHalfVertical.pop(1))
                    arrbeginreport.push(arrHalfVertical.pop(1))
                }
                else {
                    // חצי לאורך
                    if (arrHalfVertical.length === 1) {
                        arrbeginreport.push(arrHalfVertical.pop(1))
                        checkingQuarter(arrQuarterVertical, arrbeginreport)
                    }
                    else {
                        checkingQuarter(arrQuarterVertical, arrbeginreport)
                        checkingQuarter(arrQuarterVertical, arrbeginreport)
                    }
                }
            }
        }
    }
}
const checkingQuarter = (arrQuarterVertical, arrbeginreport) => {
    // חצי רוחב ו- 2 רבעים לאורך
    if (arrQuarterVertical.length >= 1) {
        arrbeginreport.push(arrQuarterVertical.pop(1))
        arrbeginreport.push(arrQuarterVertical.pop(1))
    }
    else {
        arrbeginreport.push("null")
        arrbeginreport.push("null")
    }
}
const updateReport = (numPlace, obj) => {
    return new Promise(async (resolve, reject) => {
        reports_model.updateOne({ numPlace },
            {
                $set: {
                    reportName: obj.reportName,
                    author: obj.author,
                    pages: obj.pages,
                }
            }
            , (err, data) => {
                if (err)
                    reject(err)
                else {
                    resolve(obj)
                }

            })
    })
}

module.exports = {newspaperOrder, checkingHalf, checkingPage, checkingQuarter , updateReport}