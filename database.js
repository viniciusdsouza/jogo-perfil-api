async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }

    const { Pool } = require("pg");
    const pool = new Pool({
        host: process.env.DB_HOST,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_POST,
        user: process.env.DB_USER,
        ssl: true,
    });

    const client = await pool.connect();

    client.release();


    global.connection = pool;
    return pool.connect();
}

connect();

async function getCard() {
    const client = await connect();

    query = `SELECT id, name, category FROM profile.card
                ORDER BY RANDOM()
                LIMIT 1;`
    const res = await client.query(query);

    return res.rows;
}

async function getClues(id) {
    const client = await connect();

    query = `SELECT cl.clue FROM profile.card ca
                JOIN profile.clue cl ON cl.card_id = ca.id
                WHERE ca.id = $1`
    const values = [id]
    const res = await client.query(query, values);

    return res.rows;
}

module.exports = {
    getCard,
    getClues
}