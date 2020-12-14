const Users = require('../models/mongoModels/users');
const resp = require('../common/commonResponse')
const user = require('../models/users');
const bcrypt = require('bcryptjs');
const { signAccessToken, signRefreshToken } = require('../helpers/jwt_helper');

exports.GetAllUsers = async (req, res) => {
    let respMsg = null;
    let erroMsg = null;
    let status = resp.statusCode.status200;
    let data = null;
    try {
        let users = await Users.find();
        let usrList = []
        users.forEach(usr => {
            {
                usrList.push({
                    id: usr._id,
                    firstName: usr.firstName,
                    lastName: usr.lastName,
                    email: usr.email,
                    DOB: usr.DOB,
                    createdAt: usr.createdAt
                })
            }
        });
        return resp.resType.noRoute(res, status, respMsg, data = usrList, erroMsg);
    } catch (err) { return resp.resType.noRoute(res, 401, respMsg, data, err); }
};

exports.CreateUser = (req, res) => {
    let respMsg = null;
    let erroMsg = null;
    let status = resp.statusCode.status200;
    let data = null;
    let useBody = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.Gender,
        email: req.body.email,
        password: req.body.password,
        DOB: req.body.DOB,
        isActive: 1
    }
    //console.log('1', useBody);
    const [isValidUser, msg] = user.isValidUser(useBody);
    //console.log('2', isValidUser, msg);
    if (isValidUser) {
        //const usr = new Users(useBody);
        Users.findOne({
            email: useBody.email.toLowerCase(),
            isActive: true
        }).exec((err, user) => {
            if (err) {
                return resp.resType.noRoute(res, resp.statusCode.status500, null, null, err);
            }
            //console.log('12', user);
            if (!user) {
                Users.create(useBody, function (err, User) {
                    if (err) {
                        //console.log('13', err);
                        data = null;
                        respMsg = err;
                        status = resp.statusCode.status500;
                        erroMsg = resp.statusCode.status500Msg;
                        resp.resType.noRoute(res, status, respMsg, data, erroMsg);
                    } else {
                        //console.log(3, User);
                        respMsg = "User created successfully.";
                        status = resp.statusCode.status200;
                        erroMsg = null;
                        return resp.resType.noRoute(res, status, respMsg, data, erroMsg);
                    }
                })
            } else {
                return resp.resType.noRoute(res, resp.statusCode.status401, "User alredy exits!", null, null);
            }
        });
    } else {
        //console.log('4', msg);
        erroMsg = msg;
        status = resp.statusCode.status400;
        return resp.resType.noRoute(res, status, respMsg, data, erroMsg);
    }
};

exports.LogIn = (req, res) => {
    let respMsg = null;
    let erroMsg = null;
    let status = resp.statusCode.status200;
    let data = null;
    let useBody = {
        email: req.body.email,
        password: req.body.password
    }
    const [isValidUser, msg] = user.isValidUserLoginObj(useBody);
    if (isValidUser) {
        Users.findOne({
            email: useBody.email.toLowerCase(),
            isActive: true
        }).exec((err, user) => {
            if (err) {
                return resp.resType.noRoute(res, resp.statusCode.status500, null, null, err);
            }

            if (!user) {
                return resp.resType.noRoute(res, resp.statusCode.status404, "Invalid Email/Password !", null, null);
            }
            var passwordIsValid = bcrypt.compareSync(
                useBody.password,
                user.password
            );
            //console.log(passwordIsValid)
            if (!passwordIsValid) {
                return resp.resType.normalResp(res, resp.statusCode.status200, "Invalid Email/Password !");
            }

            const accessToken = signAccessToken(user._id)
            const refreshToken = signRefreshToken(user._id)
            //console.log(accessToken)
            //console.log(refreshToken)
            //console.log(token)
            let usrResult = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt
            }
            //console.log(usrResult)
            return resp.resType.normalResp(res, resp.statusCode.status200, "Login successfully!", accessToken, refreshToken, usrResult);
        });
    } else {
        erroMsg = msg;
        status = resp.statusCode.status400;
        return resp.resType.noRoute(res, status, respMsg, data, erroMsg);
    }
};