const userService = require('../../service/user');

class UserController {
    async createUser(req, res) {
        const { name, email, phone, password, gender } = req.body || {};
        try {
            if (!name || !email || !phone || !password || !gender) {
                return res.status(400).json({ error: 'name, email, phone, password, gender are required' });
            }
            const id = await userService.createUser({ name, email, phone, password, gender });
            res.status(201).json({ id });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new UserController();
