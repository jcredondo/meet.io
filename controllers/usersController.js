const users = require('../models/users');

exports.users = (req, res) => {
    res.render('criar-conta', {
        nomePagina: 'Registo'
    });
};

exports.novoUser = async (req, res) => {
    const user = req.body;
    try {
        const novoUser = await users.create(user);

        console.log('User criado', novoUser);
    } catch (error) {
        const errosSequelize = error.errors.map(err => err.message);
        // console.log(errosSequelize);
        req.flash('error', errosSequelize);
        res.redirect('/criar-conta');
    }

};