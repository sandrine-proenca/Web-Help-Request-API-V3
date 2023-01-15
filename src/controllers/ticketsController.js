// IMPORTS
const TicketsService = require('../services/ticketsService');

const ticketsService = new TicketsService();

class TicketsController {
    // récupération du tableau de tous les tickets établis
    async getAllTickets(req, res) {
        console.log(req.userId)

        try {
            const tickets = await ticketsService.getAllTickets();
            if (tickets === undefined) {
                res.status(400).json({
                    status: "FAIL",
                    message: "Il n'y a aucun ticket",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} | \nIl n'y a aucun ticket`);
                return;
            }
            res.status(201).json({
                status: "SUCCESS",
                message: "Les tickets existent bien",
                data: tickets
            });
        }
        catch (err) {
            console.log(err.stack)
        }
    }
    // récupération d'un ticket défini
    async getTicketsById(req, res) {
        console.log(req.userId, req.params);
        const ticketsId = req.params.id;
        try {
            const ticket = await ticketsService.getTicketsById(ticketsId);
            // message d'erreur
            if (ticket === undefined) {
                res.status(400).json({
                    status: "FAIL",
                    message: "Le ticket n'existe pas",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} | \nLe ticket n'existe pas`);
                return;
            }
            res.status(201).json({
                status: "SUCCESS",
                message: "Le ticket existe bien",
                data: ticket
            });
        }
        catch (err) {
            console.log(err.stack);
        }
    };

    // création d'un ticket dans la table tickets
    async postTickets(req, res) {
        console.log("test post", req.body);
        const { problem, done } = req.body;
        const userId = req.userId;
        console.log(userId);
        // message d'erreur
        if (problem === undefined || typeof problem !== typeof String()) {
            res.status(400).json({
                status: "FAIL",
                message: "Obligation d'avoir un PROBLEM en string",
                data: undefined
            });
            console.log(`${req.method} | ${req.originalUrl} |  \nObligation d'avoir un PROBLEM en string`);
            return;
        }
        if (done === undefined || typeof done !== typeof Boolean()) {
            res.status(400).json({
                status: "FAIL",
                message: "Obligation d'avoir un DONE en boolean",
                data: undefined
            });
            console.log(`${req.method} | ${req.originalUrl} | \nObligation d'avoir un DONE en boolean`);
            return;
        }
        try {
            const ticket = await ticketsService.postTickets(problem, done, userId);
            if (ticket === undefined) {
                res.status(400).json({
                    status: "FAIL",
                    message: "Le USER n'existe pas dans le tableau des users",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} | \nLe USER n'existe pas dans le tableau des users`);
                return;
            }
            res.status(201).json({
                status: "SUCCESS",
                message: "Le ticket a bien été créé",
                data: ticket
            });
        }
        catch (err) {
            console.log(err.stack);
        }
    }

    // modification d'un ticket défini et les messages d'erreur
    async putTickets(req, res) {
        console.log("test put", req.body);
        const { problem, done } = req.body;
        const userId = req.userId;
        console.log(userId);
        // message d'erreur
        if (!(problem || done !== undefined)) {
            res.status(400).json({
                status: "FAIL",
                message: "Structure incorrect",
                data: undefined
            }),
                console.log(`${req.method} | ${req.originalUrl} | \n Structure incorrect`);
        }
        try {
            const ticket = await ticketsService.putTickets(problem, done, userId);
            if (ticket === undefined) {
                res.status(400).json({
                    status: "FAIL",
                    message: "Le ticket est inexistant",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} | \nLe ticket est inexistant`);
                return;
            }
            res.status(201).json({
                status: "SECCESS",
                message: `Le ticket a bien été modifié`,
                data: ticket
            });
            console.log(`${req.method} | ${req.originalUrl} | \nLe ticket a bien été modifié`);
        }
        catch (err) {
            console.log(err.stack);
        }
    }

    //suppression d'un ticket dans la table tickets
    async deleteTickets(req, res) {
        console.log("test delete", req.body);
        const userId = req.userId;
        const id = req.params.id;
        try {
            const tickets = await ticketsService.deleteTickets(id, userId);
            if (tickets === undefined) {
                res.status(400).json({
                    status: "FAIL",
                    message: "Il n'y a aucun ticket",
                    data: undefined
                });
                console.log(`${req.method} | ${req.originalUrl} | \nIl n'y a aucun ticket`);
                return;
            }
            res.status(201).json({
                status: "SUCCESS",
                message: "Les tickets a été supprimé",
                data: tickets
            });
        }
        catch (err) {
            console.log(err.stack)
        }
    }
}
module.exports = TicketsController;
