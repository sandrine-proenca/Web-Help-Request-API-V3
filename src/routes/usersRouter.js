// IMPORTS
const express = require('express');
const client = require('../client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//const accessTokenSecret = 'youraccesstokensecret';

const usersRouter = express.Router();


// POST DU LOGIN UTILISATEUR
usersRouter.post('/login');



// POST DU REGISTER
usersRouter.post('/register', async (req, res) => {
    console.log(req.body.password);
    const password = req.body.password;
    const name = req.body.name;

    // vérifier le nom de l'utilisateur existe
    if (name === undefined || typeof name !== typeof String()) {
        res.status(400).json({
            status: "FAIL",
            message: "Le nom est inexistant ou invalide",
            data: undefined
        });
        console.log(`${req.method} | ${req.originalUrl} | \nLe nom est inexistant ou invalide`);
        //console.log('POST | users/login | 400 | FAIL \nLe nom est inexistant ou invalide');
    }

    // vérifier le mot de passe existe
    if (password === undefined || typeof password !== typeof String()) {
        res.status(400).json({
            status: "FAIL",
            message: "Le mot de passe est inexistant ou invalide",
            data: undefined
        });
        console.log(`${req.method} | ${req.originalUrl} | n\Le mot de passe est inexistant ou invalide`);
        //console.log('POST | users/login | 400 | FAIL \nLe mot de passe est inexistant ou invalide');

    }
    bcrypt.hash(password, 10, async (err, hash) => {
        // Store hash in your password DB.
        try {
            const userList = await client.query('SELECT * FROM users WHERE name = $1', [name])

            if (userList.rowCount === 0 ){
                const data = await client.query('INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id,name', [name, hash]);
                if (data.rowCount > 0) {
                    res.status(200).json({
                        status: "SUCCESS",
                        message: `Le mot de passe de ${name} est valide`,
                        data: data.rows
                    });
                    console.log(`${req.method} | ${req.originalUrl} | \nLe mot de passe de ${name} est valide`);
                    //console.log(`POST | /api/users/register | 200 | SUCCESS \nLe mot de passe de ${name} est valide`);
    
                }
            }
            else
            {
                res.status(400).json({
                    status: "FAIL",
                    message: `Cet utilisateur existe déjà`,
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} | Cet utilisateur existe déjà`);
            }

        }

        catch (err) {
            console.log(err.stack);
        };
    });
});


module.exports = usersRouter;