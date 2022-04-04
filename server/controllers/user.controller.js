const { userModel } = require('../models/users.model');


exports.usersList = (request, response) => {
    userModel.usersList((error, data) => {
        if (error) return response.status(400).json({ err: JSON.stringify(error) })
        return response.json(data);
    });
}

exports.findUser = (request, response) => {
    userModel.findUser(request.body.user, (error, data) => {
        if (error) return response.status(400).json({ err: JSON.stringify(error) })
        return response.json(data);
    });
}

exports.register = (request, response) => {
    userModel.register(request.body, (error, data) => {
        if (error) return response.status(400).json({ err: JSON.stringify(error) })
        return response.json(data);
    });

}
exports.update = (request, response) => {
    userModel.updateUser(request.body, (error, data) => {
        if (error) return response.status(400).json({ err: JSON.stringify(error) })
        return response.json(data);
    });

}
exports.deleteUser = (request, response) => {
    userModel.deleteUser(request.body, (error, data) => {
        if (error) return response.status(400).json({ err: JSON.stringify(error) })
        return response.json(data);
    });
}