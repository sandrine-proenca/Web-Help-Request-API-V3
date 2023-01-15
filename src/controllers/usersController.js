// IMPORTS
const jwt = require('jsonwebtoken');
const UsersService = require('../services/usersService');
const bcrypt = require('bcrypt');

const usersService = new UsersService;

class UsersController {
    async login(req, res) {
        const { name, password } = req.body;
        // vérifier le nom de l'utilisateur existe
        if (name === undefined || typeof name !== typeof String()) {
            res.status(400).json({
                status: "FAIL",
                message: "Le nom est inexistant ou invalide",
                data: undefined
            });
            console.log(`${req.method} | ${req.originalUrl} |  \nLe nom est inexistant ou invalide`);
            return;
        }
        // vérifier le mot de passe existe
        if (password === undefined || typeof password !== typeof String()) {
            res.status(400).json({
                status: "FAIL",
                message: "Le mot de passe n'existe pas",
                data: undefined
            });
            console.log(`${req.method} | ${req.originalUrl} |  \nLe mot de passe n\'existe pas`);
            return;
        }
        try {
            const user = await usersService.getUserByName(name);
            if (user) {
                bcrypt.compare(password, data.rows[0].password, function (err, result) {
                    const accessToken = jwt.sign({ userId: data.rows[0].id }, process.env.TOKEN_SECRET);
                    if (result === true) {
                        res.status(200).json({
                            status: "SUCCESS",
                            message: `Nom et Password valides.`,
                            data: { ...data.rows[0], token: accessToken }
                        });
                        console.log(`${req.method} | ${req.originalUrl} |  \nNom et Password valides`);
                    }
                    else {
                        res.status(400).json({
                            status: "FAIL",
                            message: `Le password est incorrect`,
                            data: undefined
                        });
                        console.log(`${req.method} | ${req.originalUrl} | \nLe password est incorrect`);
                    }
                })
            }
        }
        catch (err) {
            console.log(err.stack);
        };
    }

    register(req, res) {
        const password = req.body.password;
        const name = req.body.name;
        bcrypt.hash(password, 10, async (err, hash) => {
            try {
                const data = await usersService.addUser(name, hash);
                res.status(200).json({
                    status: "SUCCESS",
                    message: `Le mot de passe de ${name} est valide`,
                    data: data.rows
                });
            }
            catch (err) {
                console.log(err.stack);
            };
        });
    }
}


module.exports = UsersController;