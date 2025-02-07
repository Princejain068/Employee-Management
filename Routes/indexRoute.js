const express = require("express")

const router = express.Router()

const employeeRoute = require("./employeeRoutes")
const companyRoute = require("./companyRoutes")
const departmentRoute = require("./departmentRoutes")
const adminRoute = require("./adminRoutes")
const leavesRoute = require("./leavesRoutes")
const attendanceRuoute = require("./attandanceRoutes")
const auth = require("./auth")

router.use("/company/employee",employeeRoute)
router.use("/compnay",companyRoute)
router.use("/company/department",departmentRoute)
router.use("/admin",adminRoute)
router.use("/employee",leavesRoute)
router.use("/employee",attendanceRuoute)
router.use("/auth",auth)

module.exports = {router}