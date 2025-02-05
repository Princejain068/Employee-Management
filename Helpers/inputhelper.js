const bycrpt = require("bcryptjs")

const validateEmployeeInput =(EmployeeID,password) =>{

    return(
        EmployeeID && password
    )

}

const comparePassword =  (password , hashedPassword) =>{

    return  bycrpt.compareSync(password,hashedPassword)

}

module.exports ={
    validateEmployeeInput,
    comparePassword
}