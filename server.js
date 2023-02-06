const exp = require("express");
const cors = require('cors');
const app = exp();
const mongoose = require('mongoose')
const login_router = require('./router/login')
const home_router = require('./router/home')
const manager_router = require('./router/manager')
const reports_router = require('./router/reports')


app.use(cors({ origin: 'http://localhost:3000', }))
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8080;

async function main() {
  await mongoose.connect('mongodb://localhost:27017/newspaper')
  console.log('connect to mongodb');
}
main().then(_ =>
  app.listen(PORT, console.log(`Server started on port ${PORT}/`)))

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.use('/home', home_router)
app.use('/login', login_router)
app.use('/manager', manager_router)
app.use('/reports',reports_router)




