const jwt = require('jsonwebtoken');
const authConfig = require('../bin/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'Token não autorizado' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' });
    
    const [ scheme, token ] = parts;

// [Regex] = negação -> inicio Regex -> inicio do valor -> Valor -> fim valor -> fim Regex
// [i] indica que é case sensitive -> Chama a função de test
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token incorreto' });
    
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) return res.status(401).send({ error: 'Token inválido' });

            req.userId = decoded.id;
            return next();
        })


};

