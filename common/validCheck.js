const moment = require('moment');
const mongoose = require('mongoose');

const isEmpty = (val) => {
    return !val;
}

const isValidEmail = (email) => {
    if (email != null) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    return false;
}

const isValidPassword = (Password) => {
    if (Password != null) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return re.test(Password);
    }
    return false;
}

const isValidDate = (dt) => {
    if (!isEmpty(dt)) {
        let isValidDt = moment(dt, 'YYYY-MM-DD', true).isValid();
        //console.log(dt, isValidDt)
        return isValidDt;
    }
    return false;
}

const isValidObjectId = (oid) => {
    return mongoose.Types.ObjectId.isValid(oid);
}

const isBoolean = (val) => {
    console.log('rj', val)
    if (val === true || val === false || val === 1 || val === 0) {
        return true
    } else {
        return false
    }
}

const isValidFloatNo = (val) => {
    return /^(?:[1-9]\d*|0)?(?:\.\d+)?$/gm.test(val);
}

module.exports = { isValidEmail, isValidPassword, isValidDate, isEmpty, isValidObjectId, isBoolean, isValidFloatNo }