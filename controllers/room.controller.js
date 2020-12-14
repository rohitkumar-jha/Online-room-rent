const RoomModel = require('../models/mongoModels/room');
const resp = require('../common/commonResponse');
const roomValidation = require('../models/roomValidation');

exports.CreateRoom = (req, res) => {
    let respMsg = null;
    let erroMsg = null;
    let status = resp.statusCode.status200;
    let data = null;
    let objBody = {
        userId: req.payload.userId,
        roomName: req.body.roomName,
        roomType: req.body.roomType,
        actualCost: req.body.actualCost,
        rent: req.body.rent,
        builtIn: req.body.builtIn,
        isAvailable: true,
        occupiedBy: null,
        occupiedOn: null,
        isDeleted: 0,
        isActive: 1
    }
    //console.log('1', objBody);
    const [isValidObj, msg] = roomValidation.isValidObj(objBody);
    //console.log('2', isValidObj, msg);
    if (isValidObj) {
        RoomModel.create(objBody, function (err, room) {
            if (err) {
                //console.log('13', err);
                data = null;
                respMsg = err;
                status = resp.statusCode.status500;
                erroMsg = resp.statusCode.status500Msg;
                resp.resType.noRoute(res, status, respMsg, data, erroMsg);
            } else {
                //console.log(3, room);
                respMsg = "Room created successfully.";
                status = resp.statusCode.status200;
                erroMsg = null;
                return resp.resType.noRoute(res, status, respMsg, data, erroMsg);
            }
        })
    } else {
        //console.log('4', msg);
        erroMsg = msg;
        status = resp.statusCode.status400;
        return resp.resType.noRoute(res, status, respMsg, data, erroMsg);
    }
};

exports.OnRent = async (req, res) => {
    let respMsg = null;
    let erroMsg = null;
    let status = resp.statusCode.status200;
    let data = null;
    let objBody = {
        userId: req.payload.userId,
        roomId: req.body.roomId,
        rent: req.body.rent,
        updatedAt: new Date()
    }
    const [isValidObj, msg] = roomValidation.isValidRentObj(objBody);
    if (isValidObj) {
        let isRoomValid = await RoomModel.findOne({ _id: objBody.roomId, userId: { $ne: objBody.userId }, isAvailable: true, isDeleted: false, isActive: true })
        if (isRoomValid) {
            if (isRoomValid.rent == objBody.rent) {
                await isRoomValid.updateOne({ rent: objBody.rent, occupiedBy: objBody.userId, occupiedOn: objBody.updatedAt, isAvailable: false, updatedAt: objBody.updatedAt });
                status = resp.statusCode.status200;
                erroMsg = "Room rent paid successfully.";
            } else {
                status = resp.statusCode.status401;
                erroMsg = "Room rent dosen't match";
            }
        } else {
            status = resp.statusCode.status401;
            respMsg = "Room dosen't exit"
        }
        return resp.resType.noRoute(res, status, respMsg, data, erroMsg);
    } else {
        //console.log('4', msg);
        erroMsg = msg;
        status = resp.statusCode.status400;
        return resp.resType.noRoute(res, status, respMsg, data, erroMsg);
    }
}

exports.GetAllRooms = async (req, res) => {
    let respMsg = null;
    let erroMsg = null;
    let status = resp.statusCode.status200;
    let data = null;
    try {
        //let rooms = await RoomModel.find({ userId: { $ne: userId }, isAvailable: true, isDeleted: false, isActive: true });

        let rooms = await RoomModel.aggregate([
            {
                $lookup: {
                    let: { userObjId: { "$toObjectId": "$userId" } },
                    from: 'users',
                    "pipeline": [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and:
                                        [
                                            { $eq: ["$_id", "$$userObjId"] }
                                        ]
                                }
                            }
                        }
                    ],
                    as: 'userDetails'
                }
            },
            { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },
            { $match: { "userDetails.isActive": true, } },
            {
                "$project": {
                    _id: 0,
                    roomId: "$_id",
                    roomName: 1.0,
                    roomType: 1.0,
                    rent: 1.0,
                    publishedBy: { $concat: ["$userDetails.firstName", " ", "$userDetails.lastName"] },
                    publishOn: "$createdAt",
                    builtIn: { $dateToString: { format: "%Y-%m-%d", date: "$builtIn" } },
                    userId: 1.0,
                    isAvailable: 1.0,
                    isDeleted: 1.0,
                    isActive: 1.0,
                    // "publishedBy": "$userDetails.firstName $userDetails.lastName",
                    // "userDetails.firstName": 1.0,
                    // "userDetails.lastName": 1.0,
                    // "userDetails.isActive": 1.0,
                    //"builtIn": "$builtIn",
                }
            }
        ]);
        //console.log(dts)
        //console.log('rooms: ', rooms)
        // let rmsList = []
        // rooms.forEach(rm => {
        //     {
        //         rmsList.push({
        //             roomId: rm._id,
        //             roomName: rm.roomName,
        //             roomType: rm.roomType,
        //             rent: rm.rent,
        //             builtIn: rm.builtIn,
        //             publishedBy: rm.userDetails.firstName + " " + rm.userDetails.lastName,
        //             publishOn: rm.createdAt
        //         })
        //     }
        // });
        if (rooms.length == 0) {
            respMsg = "No rooms available."
        }
        return resp.resType.noRoute(res, status, respMsg, data = rooms, erroMsg);
    } catch (err) {
        //console.log(err)
        return resp.resType.noRoute(res, 401, respMsg, data, err);
    }
}

exports.GetAvailableRooms = async (req, res) => {
    let respMsg = null;
    let erroMsg = null;
    let status = resp.statusCode.status200;
    let data = null;
    const userId = req.payload.userId;
    const [isValidObj, msg] = roomValidation.isValidUser(userId);
    if (isValidObj) {
        try {
            let rooms = await RoomModel.aggregate([
                {
                    $lookup: {
                        let: { userObjId: { "$toObjectId": "$userId" } },
                        from: 'users',
                        "pipeline": [
                            {
                                $match:
                                {
                                    $expr:
                                    {
                                        $and:
                                            [
                                                { $eq: ["$_id", "$$userObjId"] }
                                            ]
                                    }
                                }
                            }
                        ],
                        as: 'userDetails'
                    }
                },
                { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },
                { $match: { isAvailable: true, isDeleted: false, isActive: true, userId: { $ne: userId }, "userDetails.isActive": true, } },
                {
                    "$project": {
                        _id: 0,
                        roomId: "$_id",
                        roomName: 1.0,
                        roomType: 1.0,
                        rent: 1.0,
                        publishedBy: { $concat: ["$userDetails.firstName", " ", "$userDetails.lastName"] },
                        publishOn: "$createdAt",
                        builtIn: { $dateToString: { format: "%Y-%m-%d", date: "$builtIn" } },
                        userId: 1.0
                    }
                }
            ]);
            if (rooms.length == 0) {
                respMsg = "No rooms available."
            }
            return resp.resType.noRoute(res, status, respMsg, data = rooms, erroMsg);
        } catch (err) {
            //console.log(err)
            return resp.resType.noRoute(res, 401, respMsg, data, err);
        }
    } else {
        //console.log('4', msg);
        erroMsg = msg;
        status = resp.statusCode.status400;
        return resp.resType.noRoute(res, status, respMsg, data, erroMsg);
    }

}

exports.DeleteRoom = async (req, res) => {
    let respMsg = null;
    let erroMsg = null;
    let status = resp.statusCode.status200;
    let data = null;
    let objBody = {
        userId: req.payload.userId,
        roomId: req.body.roomId,
        updatedAt: new Date()
    }
    const [isValidObj, msg] = roomValidation.isValidDeleteObj(objBody);
    if (isValidObj) {
        let isRoomValid = await RoomModel.findOne({ _id: objBody.roomId, userId: { $eq: objBody.userId }, isDeleted: false, isActive: true })
        if (isRoomValid) {
            if (isRoomValid.isAvailable) {
                await isRoomValid.updateOne({ isActive: false, isAvailable: false, isDeleted: true, updatedAt: objBody.updatedAt });
                status = resp.statusCode.status200;
                erroMsg = "Room deleted successfully.";
            } else {
                status = resp.statusCode.status404;
                erroMsg = "Currently the room is in use.";
            }
        } else {
            status = resp.statusCode.status401;
            respMsg = "Room dosen't exit"
        }
    } else {
        erroMsg = msg;
        status = resp.statusCode.status400;
    }
    return resp.resType.noRoute(res, status, respMsg, data, erroMsg);
}