const userDAO = require('../../dao/user');

class UserService {
    async createUser({ name, email, phone, password, gender }) {
        return await userDAO.createUser(name, email, phone, password, gender);
    }
}

module.exports = new UserService();
