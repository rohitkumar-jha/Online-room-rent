const validCheck = require('../common/validCheck');
const Users = require('./mongoModels/users');

const isValidUser = (useBody) => {
    //console.log(123, useBody)
    let isValid = true;
    let msg = null;
    if (validCheck.isEmpty(useBody.firstName)) {
        isValid = false;
        msg = "firstName is required."
    } else if (validCheck.isEmpty(useBody.lastName)) {
        isValid = false;
        msg = "lastName is required."
    } else if (validCheck.isEmpty(useBody.email)) {
        isValid = false;
        msg = "email is required."
    } else if (!validCheck.isValidEmail(useBody.email)) {
        isValid = false;
        msg = "Enter a valid email address."
    } else if (validCheck.isEmpty(useBody.password)) {
        isValid = false;
        msg = "Password is required."
    } else if (!validCheck.isValidPassword(useBody.password)) {
        isValid = false;
        msg = "Password must conatins at least 1 uppercase character,at least 1 lowercase character,at least 1 digit,At least 1 special character and minimum 8 characters"
    } else if (validCheck.isEmpty(useBody.DOB)) {
        isValid = false;
        msg = "DOB is required."
    } else if (!validCheck.isValidDate(useBody.DOB)) {
        console.log(useBody.DOB)
        isValid = false;
        msg = "Enter valid DOB in YYYY-MM-DD format."
    }
    //console.log(1234, isValid, msg)
    return [isValid, msg];
}

const isUserExist = async (userId) => {
    return await Users.findOne({ _id: userId });
}

const isValidUserLoginObj = (useBody) => {
    let isValid = true;
    let msg = null;
    if (validCheck.isEmpty(useBody.email)) {
        isValid = false;
        msg = "email is required."
    } else if (!validCheck.isValidEmail(useBody.email)) {
        isValid = false;
        msg = "Enter a valid email address."
    } else if (validCheck.isEmpty(useBody.password)) {
        isValid = false;
        msg = "Password is required."
    } else if (!validCheck.isValidPassword(useBody.password)) {
        isValid = false;
        msg = "Password must conatins at least 1 uppercase character,at least 1 lowercase character,at least 1 digit,At least 1 special character and minimum 8 characters"
    }
    return [isValid, msg];
}
module.exports = { isValidUser, isUserExist, isValidUserLoginObj }