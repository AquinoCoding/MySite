const express = require('express');
const router = express.Router();
const User = require('../src/models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../bin/auth.json');

/*
router.get('/', function(req, res) {
    res.render('cadastro');
});*/

router.post('/cadastro', async(req, res) => {

    const { email } = req.body;
    const { username } = req.body;

    try{
        
        if (await User.findOne({ email })){
            return res.status(400).send({ error: 'Email já existente'});
        }
        else if (await User.findOne({ username })){
            return res.status(400).send({ error: 'Username já existente'});
        } 

        const user = await User.create(req.body);
        user.email = undefined;

        return res.send({ user })
    }
    catch (err) {
        return res.status(400).send({ error: 'Falha no Registro' });
    }
});

router.post('/autenticacao', async(req, res) => {
    const { email, pass,  } = req.body;

    const user = await User.findOne({  email }).select('+pass');

    if (!user)
        return res.status(400).send('Usuario não encontrado');
    
    if (!await bcrypt.compare(pass, user.pass))
        return res.status(400).send('Senha inválida');
    
    user.pass = undefined;

    // Para gerar o token utilizasse ID, MD5 e a duração e de 1 dia

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400,
    });


    res.send({ user, token });

})

module.exports = router;