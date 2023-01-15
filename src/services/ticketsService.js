// IMPORTS
const client = require('../client');

class TicketsService {
    // récupération du tableau de tous les tickets établis
    async getAllTickets() {

        const data = await client.query('SELECT * FROM tickets');
        if (data.rowCount) {
            return data.rows;
        }
        return undefined;
    };

    // récupération d'un ticket défini
    async getTicketsById(id) {
        const data = await client.query('SELECT * FROM tickets where id = $1', [id]);
        if (data.rowCount) {
            return data.rows[0];
        }
        return undefined;
    }

    // création d'un ticket dans la table tickets
    async postTickets(problem, done, userId) {
        const data = await client.query('INSERT INTO tickets (problem, done, user_id) VALUES ($1, $2, $3) RETURNING *', [problem, done, userId]);
        if (data.rowCount) {
            return data.rows[0];
        }
        return undefined;
    }

    // modification d'un ticket défini et les messages d'erreur
    async putTickets(problem, done, userId) {
        console.log("test PUT ticketsService")
        const data = await client.query('UPDATE tickets SET problem =$1, done =$2 WHERE user_id =$3 RETURNING*', [problem, done, userId]);
        if (data.rowCount) {
            return data.rows[0];
        }
        return undefined;
    }

    //suppression d'un ticket dans la table tickets
    async deleteTickets(id){
            const data = await client.query('DELETE FROM tickets where id = $1 RETURNING*', [id]);
            if (data.rowCount) {
                return data.rows[0];
            }
            return undefined;
        }
};

module.exports = TicketsService;

