class UserController {
    createUser(req, res) {
        res.send('Create User');
    }
}

module.exports = new UserController();