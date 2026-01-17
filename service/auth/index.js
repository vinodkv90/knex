const authDAO = require('../../dao/auth');

class AuthService {
    async createUser({ name, email, phone, password, gender }) {
        if (await authDAO.findByEmail(email) || await authDAO.findByPhone(phone)) {
            return null;
        }
        return await authDAO.createUser(name, email, phone, password, gender);
    }
    async login(email) {
        const user = await authDAO.findByEmail(email);
        if (!user) {
            return null;
        }
        return user;
    }
}

module.exports = new AuthService();
