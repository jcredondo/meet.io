const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const usersController = require('../controllers/usersController');

module.exports = () => {
    router.get('/', homeController.home);

    router.get('/criar-conta', usersController.users);
    router.post('/criar-conta',usersController.novoUser);


    return router;
};