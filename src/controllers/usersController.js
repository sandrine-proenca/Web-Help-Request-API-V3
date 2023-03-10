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
            res.status(403).json({
                status: "FAIL",
                message: "Le nom est inexistant ou invalide",
                data: undefined
            });
            console.log(`${req.method} | ${req.originalUrl} |  \nLe nom est inexistant ou invalide`);
            return;
        }
        // vérifier le mot de passe existe
        if (password === undefined || typeof password !== typeof String()) {
            res.status(403).json({
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
                bcrypt.compare(password, user.password, function (err, result) {
                    const accessToken = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET);
                    if (result === true) {
                        res.status(201).json({
                            status: "SUCCESS",
                            message: `Nom et Password valides.`,
                            data: accessToken
                        });
                        console.log(`${req.method} | ${req.originalUrl} |  \nNom et Password valides`);
                    }
                    else {
                        res.status(404).json({
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
            res.status(500).json(
                {
                    status: "FAIL",
                    message: "erreur serveur"
                }
            )
            console.log(err.stack);
        };
    }

    register(req, res) {
        const password = req.body.password;
        const name = req.body.name;
        bcrypt.hash(password, 10, async (err, hash) => {
            try {
                const data = await usersService.addUser(name, hash);
                res.status(201).json({
                    status: "SUCCESS",
                    message: `Le nom: ${name} et son mot de passe associé sont validés`,
                    data: data.rows
                });                
                console.log(`${req.method} | ${req.originalUrl} |  \nLe nom: ${name} et son mot de passe associé sont validés`);
            }
            catch (err) {
                res.status(500).json(
                    {
                        status: "FAIL",
                        message: "erreur serveur"
                    }
                )
                console.log(err.stack);
            };
        });
    }
}


module.exports = UsersController;