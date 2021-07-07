const express = require('express');
const router = express.Router();
const User = require('../src/models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../bin/auth.json');


router.get('/cadastro', function(req, res) {
    res.render('cadastro');
});

// Para gerar o token utilizasse ID, MD5 e a duração e de 1 dia
function generateToken(params = {}) {
    
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/recept', async(req, res) => {

    const { email } = req.body;
    const { username } = req.body;
    const { pass } = req.body;
    const { pass2 } = req.body;

    try{
        
        if (await User.findOne({ email })){
            return res.status(400).send({ error: 'Email já existente'});
        }
        else if (await User.findOne({ username })){
            return res.status(400).send({ error: 'Username já existente'});
        }

        if (pass !== pass2)
            return res.status(400).send({ error: 'Senhas não coincidem'});

        const user = await User.create(req.body);
        user.email = undefined;
        user.pass = undefined;

        return res.send({ 
            user,
            token: generateToken({ id: user.id })
         })
        
    }
    catch (err) {
        return res.status(400).send({ error: 'Falha no Registro' });
    }
});

router.post('/autenticacao', async(req, res) => {

    const { email, pass,  } = req.body;

    const user = await User.findOne({ email }).select('+pass');

    if (!user)
        return res.status(400).send('Usuario não encontrado');
    
    if (!await bcrypt.compare(pass, user.pass))
        return res.status(400).send('Senha inválida');
    
    user.pass = undefined;

    res.send({
        user, 
        token: generateToken({ id: user.id }),
        
     });
     
})

module.exports = router;