const express = require('express');
const router = express.Router();
const User = require('../src/models/user');
const bcrypt = require('bcryptjs');
const Perfil = require('../routes/perfil');

router.get('/', function(req, res) {
    res.render('login');
})


router.post('/', async(req, res) => {

    const { username, pass } = req.body;

    const user = await User.findOne({ username }).select('+pass');

    
    if (!user)
        return res.status(400).send('Usuario não encontrado');

    if (!await bcrypt.compare(pass, user.pass))
        return res.status(400).send('Senha Inválida');

    user.pass = undefined;

    res.redirect('/perfil')

});

module.exports = router;