const bcrypt = require('bcrypt');
const { usersModel } = require('../models/users.model')


exports.login = (request, response) => {
    console.log(request.user);
    usersModel.findUser(request.body.username, (error, data) => {
        console.log('Password :', data[0].password);
        if (error) return response.status(400).json({ err: JSON.stringify(error) })

        else if (data.length == 0) {
            return response.status(401).json({ 'error': 'No such user' });
        } else if (!bcrypt.compareSync(request.body.password, data[0].password)) {
            return response.status(403).json({ 'error': 'Bad password' });
        } else {

            return response.json({ result: 1, token: request.user.token, role: data[0].role, name: data[0].name });
        }
    });
}