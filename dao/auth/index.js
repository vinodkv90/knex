const db = require('../../db/db')

class AuthDAO {
    async createUser(name, email, phone, password, gender) {
        const emailUser = await this.findByEmail(email);
        const phoneUser = await this.findByPhone(phone);
        if (emailUser || phoneUser) {
            return null;
        }
        const [id] = await db('users')
            .insert({ name, email, phone, password, gender })
            .returning('id');

        return id;
    }

    async findByEmail(email) {
        return db('users')
            .where({ email })
            .first();
    }
    async findByPhone(phone) {
        return db('users')
            .where({ phone })
            .first();
    }
}

module.exports = new AuthDAO();
