const userDAO = require('../../dao/user');

class UserService {
    async createUser(name, email) {
        return await userDAO.createUser(name, email);
    }
}

module.exports = new UserService();