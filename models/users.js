const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    nome : Sequelize.STRING(60),
    imagem : Sequelize.STRING(60),
    descricao: Sequelize.TEXT,
    email: {
        type: Sequelize.STRING(30),
        allowNull: false, 
        validate: {
            isEmail: { msg : 'Necessário email válido'}
        },
        unique : {
            args: true,
            msg : 'User já registado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate : {
            notEmpty : {
                msg : 'Password vazia!'
            }
        }
    }, 
    activo : {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    tokenPassword : Sequelize.STRING, 
    expiraToken : Sequelize.DATE
}, {
    hooks: {
        beforeCreate(user) { 
            user.password = Users.prototype.hashPassword(user.password);
        }
    }
});

// Método para comparar los password
Users.prototype.validarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}
Users.prototype.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null );
}

module.exports = Users;