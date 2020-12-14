const validCheck = require('../common/validCheck');

const isValidObj = (objBody) => {
    //console.log(123, objBody)
    let isValid = true;
    let msg = null;
    if (validCheck.isEmpty(objBody.roomName)) {
        isValid = false;
        msg = "Room name is required."
    } else if (validCheck.isEmpty(objBody.roomType)) {
        isValid = false;
        msg = "roomType is required."
    } else if (validCheck.isEmpty(objBody.userId)) {
        isValid = false;
        msg = "userId is required."
    } else if (!validCheck.isValidObjectId(objBody.userId)) {
        isValid = false;
        msg = "Not a valid userId."
    } else if (validCheck.isEmpty(objBody.actualCost)) {
        isValid = false;
        msg = "Actual Cost is required."
    } else if (validCheck.isEmpty(objBody.rent)) {
        isValid = false;
        msg = "Rent is required."
    } else if (validCheck.isEmpty(objBody.builtIn)) {
        isValid = false;
        msg = "Built In is required."
    } else if (!validCheck.isValidDate(objBody.builtIn)) {
        //console.log(objBody.builtIn)
        isValid = false;
        msg = "Enter valid Built In in YYYY-MM-DD format."
    }
    // else if (validCheck.isEmpty(objBody.isAvailable)) {
    //     isValid = false;
    //     msg = "isAvailable is required."
    // } else if (!validCheck.isBoolean(objBody.isAvailable)) {
    //     isValid = false;
    //     msg = "isAvailable should be boolen value."
    // }
    //console.log(1234, isValid, msg)
    return [isValid, msg];
}

const isValidUser = (val) => {
    //console.log(userId)
    let isValid = true;
    let msg = null;
    if (validCheck.isEmpty(val)) {
        isValid = false;
        msg = "userId is required."
    } else if (!validCheck.isValidObjectId(val)) {
        isValid = false;
        msg = "Not a valid userId."
    }
    return [isValid, msg];
}

const isValidRentObj = (objBody) => {
    let isValid = true;
    let msg = null;
    if (validCheck.isEmpty(objBody.userId)) {
        isValid = false;
        msg = "userId is required."
    } else if (!validCheck.isValidObjectId(objBody.userId)) {
        isValid = false;
        msg = "Not a valid userId."
    } else if (validCheck.isEmpty(objBody.roomId)) {
        isValid = false;
        msg = "roomId is required."
    } else if (!validCheck.isValidObjectId(objBody.roomId)) {
        isValid = false;
        msg = "Not a valid roomId."
    } else if (validCheck.isEmpty(objBody.rent)) {
        isValid = false;
        msg = "rent is required."
    } else if (!validCheck.isValidFloatNo(objBody.rent)) {
        isValid = false;
        msg = "rent should be positive amount."
    }
    return [isValid, msg];
}

const isValidDeleteObj = (objBody) => {
    let isValid = true;
    let msg = null;
    if (validCheck.isEmpty(objBody.userId)) {
        isValid = false;
        msg = "userId is required."
    } else if (!validCheck.isValidObjectId(objBody.userId)) {
        isValid = false;
        msg = "Not a valid userId."
    } else if (validCheck.isEmpty(objBody.roomId)) {
        isValid = false;
        msg = "roomId is required."
    } else if (!validCheck.isValidObjectId(objBody.roomId)) {
        isValid = false;
        msg = "Not a valid roomId."
    }
    return [isValid, msg];
}

module.exports = { isValidObj, isValidUser, isValidRentObj, isValidDeleteObj }