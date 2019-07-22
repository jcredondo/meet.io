email: {
    type: Sequelize.STRING(30),
    allowNull: false,
    validate: {
        isEmail: { msg: 'Adicona email válido' }
    },
    unique: {
        args: true,
        msg: { msg: 'User já registado' }
    },
},
password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
        nomEmpty: {
            msg: { msg: 'Password sem informação' }
        }
    }
},
ativo: {
    type: Sequelize.INTEGER,
    defaultValue: 0
},
tokenPassword: Sequelize.STRING,
expiraToken: Sequelize.DATE