require('dotenv').config();

const db = require("./database")

const port = process.env.SERVER_PORT;

const express = require("express");

const app = express();

app.get("/get-card", async (req, res) => {
    const card = await db.getCard();
    const clues = await db.getClues(card[0].id);

    const cardStruct = {
        name: card[0].name,
        category: card[0].category
    }

    const responseData = {
        name: cardStruct.name,
        category: cardStruct.category,
        clues: clues.map(c => c.clue)
    };

    res.json(responseData);
})

app.listen(port);