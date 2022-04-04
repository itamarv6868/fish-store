const { usersModel } = require('../models/users.model');
let jwt = require('jsonwebtoken');
let config = require('./config');

function checkToken(request, response, next) {
    let token = request.headers['x-access-token'] || request.headers['authorization'];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return response.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                console.log('Token decoded : ', decoded);
                request.decoded = decoded;
                next();
            }
        });
    } else {
        return response.status(401).json({ 'error': 'Auth token is not supplied' });
    }
}

function isAdmin(request, response, next) {
    if (request.decoded.role == 'Admin') {
        next();
    } else {
        return response.status(401).json({
            success: false,
            message: 'Permittion error'
        });
    }
}

module.exports = {
    checkToken: checkToken,
    isAdmin: isAdmin
};