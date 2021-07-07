const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('perfil');
    console.log('Renderizou')
})
module.exports = router;