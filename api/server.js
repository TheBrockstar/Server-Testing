const express = require('express');

// --- Instantiate Server ---
const server = express();

// --- Use Middleware ---
server.use(express.json());

// --- Export Server ---
module.exports = server;

// Instantiate Resource
let trainers = [
    { 
    id: 0,
    name: "Ash",
    pokemon: "Pikachu" 
    }
];

let id = 0;

// ----- CRUD Endpoints -----

// --- Test Endpoint ---
server.get('/1234/test', (request, response) => {
    response.status(200).json("DO NOT TEST ME BRO!")
})

// --- GET Trainers Endpoint ---
server.get('/api/trainers', (request, response) => {
    response.status(200).json(trainers);
})

// --- CREATE Trainers Endpoint
server.post('/api/addTrainer', (request, response) => {
    // Deconstruct the Request Body
    const { name, pokemon } = request.body;

    if (!name || !pokemon) {
        return response.status(400).json({errorMessage: "You must provide a name and a pokemon."})
    }
    
    id++;

    // Construct Trainer Object
    const trainer = { id, name, pokemon }

    // Add Trainer Object to the trainers array
    trainers.push(trainer);

    // Response with created trainer 
    response.status(201).json(trainer);
})

// --- DELETE Trainer Endpoint ---
server.delete('/api/deleteTrainer/:id', (request, response) => {
    // Get URL Params
    const trainerId = request.params.id;
    let idExists = false;

    for (i = 0; i < trainers.length; i++) {
        if (Number(trainers[i].id) === Number(trainerId)) {
            idExists = i;
        }
    }

    if ( !idExists && idExists !== 0 ) {
        return response.status(404).json({errorMessage: "We were unable to delete the trainer with the provided id."})
    }

    trainers = trainers.slice(0, idExists).concat(trainers.slice(idExists + 1, trainers.length));
    response.status(200).json({ trainerId });
})