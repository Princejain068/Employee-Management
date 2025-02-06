const bycrpt = require("bcryptjs")

const validateEmployeeInput =(Email,password) =>{

    return(
        Email && password
    )

}

const comparePassword =  (password , hashedPassword) =>{

    return  bycrpt.compareSync(password,hashedPassword)

}

module.exports ={
    validateEmployeeInput,
    comparePassword
}