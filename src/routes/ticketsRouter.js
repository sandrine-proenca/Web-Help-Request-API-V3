// IMPORTS
const express = require('express');
const client = require('../client');
const authenticateJWT = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const TicketsController = require('../controllers/ticketsController');

const ticketsRouter = express.Router();
const ticketsController = new TicketsController();

// ROUTE : table des tickets

// récupération du tableau de tous les tickets établis
ticketsRouter.get('/', authenticateJWT, ticketsController.getAllTickets);

// récupération d'un ticket défini
ticketsRouter.get('/:id', authenticateJWT, ticketsController.getTicketsById);


// création d'un ticket dans la table tickets
ticketsRouter.post('/', authenticateJWT, ticketsController.postTickets);

// modification d'un ticket défini et les messages d'erreur
ticketsRouter.put('/:id', authenticateJWT, ticketsController.putTickets);

//suppression d'un ticket dans la table tickets
ticketsRouter.delete('/:id', authenticateJWT, ticketsController.deleteTickets);



module.exports = ticketsRouter;