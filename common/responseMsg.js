const noRoute = (res, status = 400, message = null, data = null, error = null) => {
    res.status(status).send({ status, message, data, error });
}

const normalResp = (res, status = 200, message = null, accessToken = null, refreshToken = null, data = null, error = null) => {
    res.status(status).send({ status, message, accessToken, refreshToken, data, error });
}

const unAuthorized = (res) => {
    res.status(status = 401).send({ status: 401, message: null, accessToken: null, refreshToken: null, data: null, error: 'User is unauthorized' });
}

module.exports = { noRoute, normalResp, unAuthorized };