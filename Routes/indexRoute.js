const express = require("express")

const router = express.Router()
const { routeaccess, adminaccess } = require('../middlewares/authmiddleware');

const employeeRoute = require("./employeeRoutes")
const companyRoute = require("./companyRoutes")
const departmentRoute = require("./departmentRoutes")
const adminRoute = require("./adminRoutes")
const leavesRoute = require("./leavesRoutes")
const attendanceRuoute = require("./attandanceRoutes")
const auth = require("./auth")

router.use("/company/employee",routeaccess,employeeRoute)
router.use("/compnay",companyRoute)
router.use("/company/department",adminaccess,departmentRoute)
router.use("/admin",adminaccess,adminRoute)
router.use("/employee",routeaccess,leavesRoute)
router.use("/employee",routeaccess,attendanceRuoute)
router.use("/auth",auth)

module.exports = {router}