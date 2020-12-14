const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../helpers/jwt_helper');

const user_controller = require('../controllers/user.controller');
const room_controller = require('../controllers/room.controller');

const resp = require('../common/commonResponse')

router.get('/users', verifyAccessToken, user_controller.GetAllUsers);
router.post('/create-user', user_controller.CreateUser);
router.post('/user-login', user_controller.LogIn);

router.post('/create-room', verifyAccessToken, room_controller.CreateRoom);
router.get('/get-all-rooms', verifyAccessToken, room_controller.GetAllRooms);
router.get('/get-available-rooms', verifyAccessToken, room_controller.GetAvailableRooms);
router.patch('/on-rent', verifyAccessToken, room_controller.OnRent);
router.delete('/delete-room', verifyAccessToken, room_controller.DeleteRoom);

//not founf urls
router.get('*', function (req, res) {
    resp.resType.noRoute(res, resp.statusCode.status404, 'Please check your url', null, resp.statusCode.status404Msg);
});

router.get('*', function (req, res) {
    resp.resType.noRoute(res, resp.statusCode.status404, 'Please check your url', null, resp.statusCode.status404Msg);
});

router.get('*', function (req, res) {
    resp.resType.noRoute(res, resp.statusCode.status404, 'Please check your url', null, resp.statusCode.status404Msg);
});

router.get('*', function (req, res) {
    resp.resType.noRoute(res, resp.statusCode.status404, 'Please check your url', null, resp.statusCode.status404Msg);
});

module.exports = router;