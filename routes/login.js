const express = require('express');
const router = express.Router();
const User = require('../src/models/user');
const bcrypt = require('bcryptjs');

router.get('/', function(req, res) {
    res.render('login');
})


router.post('/', async(req, res) => {

    const { username, pass } = req.body;

    const user = await User.findOne({ username }).select('+pass');

    try{
        if (!user)
            return res.status(400).send('Usuario não encontrado');

        if (!await bcrypt.compare(pass, user.pass))
            return res.status(400).send('Senha Inválida');

        user.pass = undefined;

        res.send({
            user
        })

    }

    catch (err) {
        return res.status(400).send({ error: 'Falha no Registro' });
    }
    

});



module.exports = router;