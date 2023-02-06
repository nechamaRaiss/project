const register_model = require('../models/register')
const category_model = require('../models/category')
const reports_model = require('../models/reports')

const getAllUsers = () => {
    return new Promise((resolve) => {
        register_model.find({}, {}, (err, data) => {
            if (err)
                throw err
            else
                resolve(data)
        })
    })
}

const getAllCategories = () => {
    return new Promise((resolve) => {
        category_model.find({}, {}, (err, data) => {
            if (err)
                throw err
            else
                resolve(data)
        })
    })
}

const getAllReports = () => {
    return new Promise((resolve) => {
        reports_model.find({}, {}, (err, data) => {
            if (err)
                throw err
            else{
                resolve(data)
            }

                
        })
    })
}

const addUsers = (obj) => {
    return new Promise(async (resolve, reject) => {
        const users = await getAllUsers().then(data => { return data }, (err, data) => {
            if (err) {
                reject("err")
            }
        })
        const password = users.find(u => { return u.password === obj.password }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
        if (!password) {
            let add = new register_model({
                name: obj.username,
                password: obj.password
            })
            console.log(add.name);
            add.save((err, data) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(data)
                }
            })
        }
        else
            resolve(false)
    })
}

const getUserByPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        const users = await getAllUsers().then(data => { return data }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
        if (password == '1111') {
            resolve('manager')
        }
        const code = users.find(u => { return u.password === password }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
        if (!code) {
            resolve(false)
        }
        else {
            resolve(code)
        }
    })
}

const getOrderByDate = (date) => {
    return new Promise(async (resolve, reject) => {
        const orders = await getAllUsers().then(data => { return data }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                console.log(data);
            }
        })
        const code = []
        orders.map((u) => {
            const name = u.name
            u.buy.filter(b => {
                if (b.date === date) {
                    code.push({ name, b })
                }
            })
        })
        if (code == 0) {
            resolve(false)
        }
        else {
            resolve(code)
        }
    })
}

const updateUsers = (password, obj) => {
    console.log(obj, "update");
    return new Promise((resolve, reject) => {
        register_model.updateOne({ password },
            {
                $push: {
                    buy:
                    {
                        size: obj.buy.size,
                        date: obj.buy.date
                    }
                }
            }
            , (err, data) => {
                if (err)
                    reject(err)
                else
                    resolve(getUserByPassword(password))

            }
        )
    })
}

const backPage = (password, obj) => {
    console.log(obj, "obj");
    return new Promise(async (resolve, reject) => {
        const d = await getOrderByDate(obj.buy.date).then(data => { return data }, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
        console.log(d, "d");
        if (d) {
            const code = d.find(u => { return u.b.size === obj.buy.size }, (err, data) => {
                if (err) {
                    reject(err)
                }
                else {
                    console.log(data);
                    resolve(data)
                }
            })
            if (code) {
                resolve(false)
            }
            else {
                console.log("משוחרר");
                const ord = await updateUsers(password, obj).then(data => { return data }, (err, data) => {
                    if (err)
                        reject(err)
                    else
                        resolve(data)
                })
                resolve(ord)
            }
        }
        else {
            console.log("משוחרר");
            const ord = await updateUsers(password, obj).then(data => { return data }, (err, data) => {
                if (err)
                    reject(err)
                else
                    resolve(data)
            })
            resolve(ord)
        }
    })
}

const firstPage = (password, obj) => {
    return new Promise(async (resolve, reject) => {
        const d = await getOrderByDate(obj.buy.date).then(data => { return data }, (err, data) => {
            if (err)
                reject(err)
            else
                resolve(data)
        })
        console.log(d, "d");
        if (d) {
            const doublefirst=d.filter(u=>{return u.b.size==='DoubleFirst'},(err,data)=>{
                if (err) {
                    reject(err)
                }
                else {
                    console.log(data);
                    resolve(data)
                }
            })
            const codefirst = d.filter(u => { return u.b.size === "FirstPage" }, (err, data) => {
                if (err) {
                    reject(err)
                }
                else {
                    console.log(data);
                    resolve(data)
                }
            })
            console.log(codefirst, "codefirst");
            if (codefirst.length+(doublefirst.length*2 )>= 14) {
                resolve(false)
            }
            else {
                console.log("משוחרר");
                const ord = await updateUsers(password, obj).then(data => { return data }, (err, data) => {
                    if (err)
                        reject(err)
                    else
                        resolve(data)
                })
                resolve(ord)
            }
        }
        else {
            console.log("משוחרר");
            const ord = await updateUsers(password, obj).then(data => { return data }, (err, data) => {
                if (err)
                    reject(err)
                else
                    resolve(data)
            })
            resolve(ord)
        }
    })
}

const deleteBuy = (password) => {
    console.log(password);
    return new Promise((resolve, reject) => {
        register_model.updateOne({ password },
            {
                $pop: { buy: 1 }
            }
            , (err, data) => {
                console.log(data, "data");
                if (err)
                    reject(err)
                else
                    resolve(getUserByPassword(password))
                console.log("נמחק בהצלחה");
            }
        )
    })
}

const getPrice = (obj) => {
    console.log(obj, "obj");
    return new Promise(async (resolve, reject) => {
        const categor = await getAllCategories().then(data => { return data }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        })
        const code = categor.find(u => { return u.name === obj.buy.size}, (err, data) => {
            if (err)
                reject(err)
            else {
                resolve(data)
                console.log(data);
            }
        })
        resolve(code.price)
    })
}

module.exports = { getAllUsers,getAllCategories,getAllReports, addUsers, getUserByPassword, getOrderByDate, updateUsers, backPage, firstPage, deleteBuy ,getPrice}
