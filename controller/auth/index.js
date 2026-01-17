const authService = require('../../service/auth');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt');

class AuthController {
    async register(req, res) {
        const { name, email, phone, password, gender } = req.body || {};
        try {
            if (!name || !email || !phone || !password || !gender) {
                return res.status(400).json({ error: 'name, email, phone, password, gender are required' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const id = await authService.createUser({ name, email, phone, password: hashedPassword, gender });
            if (!id) {
                return res.status(400).json({ error: 'Account already exists' });
            }
            res.status(201).json({ id });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        const user = await authService.login(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Minimal session payload
        const sessionData = {
            id: user.id,
            issuedAt: Date.now(),
        };
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // const token = generateToken({
        //     id: user.id,
        //     email: user.email,
        // });

        // res.json({ token });

        res.cookie('session', JSON.stringify(sessionData), {
            httpOnly: true,                     // ❌ JS access
            secure: true,                       // ✅ HTTPS only
            sameSite: 'strict',                 // ❌ CSRF
            signed: true,                       // 🔒 Tamper-proof
            maxAge: 24 * 60 * 60 * 1000,         // 1 day
        });

        res.json({ success: true });
    }
}

module.exports = new AuthController();
