const db = require('../../db/db')

class UserDAO {
    async createUser(name, email, phone, password, gender) {
        const [id] = await db('users')
        .insert({ name, email, phone, password, gender })
        .returning('id');

        return id;
    }
}

module.exports = new UserDAO();