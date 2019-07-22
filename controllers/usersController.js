const users = require('../models/users');

exports.users = (req, res) => {
    res.render('criar-conta', {
        nomePagina: 'Registo'
    });
};

exports.novoUser = async (req, res) => {
    const user = req.body;

    const novoUser = await users.create(user);
    console.log('User criado', novoUser);
};