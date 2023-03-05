const Sequelize = require("sequelize");
const db = require("../db");
const bcrypt = require('bcrypt')

const User = db.define("user", {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
    },
});

module.exports = User;

User.prototype.correctPassword = function (candidatePwd) {
    return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
    return jwt({ id: this.id }, "shh");
};

User.authenticate = async function ({ username, password }) {
    const user = await this.findOne({ where: { username } });
    if (!user || !(await user.correctPassword(password))) {
        const error = Error("Incorrect Username / Password");
        error.status = 401;
        throw error;
    }
    return user.generateToken();
};

User.findByToken = async function (token) {
    try {
        const { id } = jwt.verify(token, "shh");
        const user = User.findByPk(id);
        if (!user) {
            throw "noo";
        }
        return user
    } catch (err) {
        const error = Error("bad token")
        error.status = 401
        throw error
    }
};


const hashPassword = async(user) => {
    if(user.changed('password')){
        user.password = await bcrypt.hash(user.password, 5)
    }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
