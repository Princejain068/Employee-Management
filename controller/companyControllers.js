const CompanySchema = require('../models/Company');
const EmployeeSchema = require('../models/Employee');
const DepartmentSchema = require('../models/Department');
const AdminSchema = require('../models/Admin');
const { mongoose } = require('mongoose');

// Company created by anyone
const addcompany = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {
            Registration,
            CompanyName,
            Description,
            Email, Phone, Website, Address, Headquarters, Founder,
            AdminPhone, AdminAddress, AdminEmail, AdminAge, AdminDateOfBirth,
            Gender
        } = req.body;

        const Founder_name = Founder.Name;
        const company = new CompanySchema({
            Registration,
            Name: CompanyName, Description, Email, Phone, Website, Address, Headquarters,
            Founder: { Name: Founder_name }
        });

        await company.save({ session });

        const password = `${Registration}@123`;

        const admin = new AdminSchema({
            Name: Founder_name, Email: AdminEmail,
            password, Role: "Company Admin", companyId: company._id
        });

        await admin.save({ session });

        const department = new DepartmentSchema({
            departmentId: `Admin${Registration}001`,
            DepartmentName: 'Admin', Company: company._id,
            Description: "Admin functionality",
            ManagerId: admin._id, Email, Phone
        });

        await department.save({ session });

        const employee = new EmployeeSchema({
            EmployeeID: `${Gender}1`,
            password: `${Registration}@123`,
            Company: company._id,
            Department: department._id,
            Role: "Company Admin", Name: Founder_name, Gender, DateOfBirth: AdminDateOfBirth,
            Address: AdminAddress, Age: AdminAge, Email: AdminEmail, Phone: AdminPhone
        });

        await employee.save({ session });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({ Message: "Company Created Successfully" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ Error: error.message });
    }
};

const getAllCompany = async (req, res) => {
    if (req.user.Role === "Super Admin") {
        const companies = await CompanySchema.find();
        return res.send(companies);
    }
    return res.status(403).send("Not Authorized to fetch data");
};

const updateCompany = async (req, res) => {
    if (req.user.Role === 'Company Admin' || req.user.Role === 'Super Admin') {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const admin = req.user;
            const company = await CompanySchema.findById(admin.companyId).session(session);

            if (!company) {
                throw new Error("Company not found");
            }

            for (let key in req.body) {
                if (req.body[key] && key !== 'user') company[key] = req.body[key];
            }

            await company.save({ session });
            await session.commitTransaction();
            session.endSession();

            return res.send(company);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({ Error: error.message });
        }
    }
};

const deleteCompany = async (req, res) => {
    if (req.user.Role === 'Company Admin' || req.user.Role === 'Super Admin') {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const admin = req.user;
            const company = await CompanySchema.findById(admin.companyId).session(session);

            if (!company) {
                throw new Error("Company not found");
            }

            await EmployeeSchema.deleteMany({ Company: company._id }).session(session);
            await DepartmentSchema.deleteMany({ Company: company._id }).session(session);
            await CompanySchema.findByIdAndDelete({ _id: admin.companyId }).session(session);

            await session.commitTransaction();
            session.endSession();

            return res.send("Company deleted successfully");
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({ Error: error.message });
        }
    }

    return res.status(403).send("Not a valid user to perform this task");
};

module.exports = {
    addcompany,
    getAllCompany,
    updateCompany,
    deleteCompany
};
