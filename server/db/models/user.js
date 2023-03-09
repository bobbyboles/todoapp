const Sequelize = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { V4: PasetoV4 } = require("paseto");
const crypto = require("crypto");

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

// crypto.generateKeyPair(
//     "ed25519",
//     {
//         modulusLength: 530, // options
//         publicExponent: 0x10101,
//         publicKeyEncoding: {
//             type: "spki",
//             format: "der",
//         },
//         privateKeyEncoding: {
//             type: "pkcs8",
//             format: "der",
//             cipher: "aes-192-cbc",
//             passphrase: "GeeksforGeeks is a CS-Portal!",
//         },
//     },
//     (err, publicKey, privateKey) => {
//         // Callback function
//         if (!err) {
//         } else {
//             // Prints error
//             console.log("Errr is: ", err);
//         }
//     }
// );
//
const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
// const pasetoV4 = new PasetoV4()

User.prototype.correctPassword = function (candidatePwd) {
    return argon2.verify(this.password, candidatePwd);
};

User.authenticate = async function ({ username, password }) {
    console.log(username, password);
    const user = await this.findOne({ where: { username } });
    if (!user || !(await user.correctPassword(password))) {
        const error = Error("Incorrect Username / Password");
        error.status = 401;
        throw error;
    }
    return user.generateToken();
};
User.prototype.generateToken = async function () {
    console.log(privateKey.toString("hex"), "Private Key in generate");
    return PasetoV4.sign({ id: this.id }, privateKey);
};

User.findByToken = async function (token) {
    try {
        console.log(publicKey, "public key in findBy");
        const { id } = await PasetoV4.verify(token, publicKey);
        const user = await User.findByPk(id);
        if (!user) {
            throw "noo";
        }
        return user;
    } catch (err) {
        const error = Error("bad token");
        error.status = 401;
        throw error;
    }
};

const hashPassword = async (user) => {
    if (user.changed("password")) {
        user.password = await argon2.hash(user.password);
    }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
