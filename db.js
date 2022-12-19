const spicedPg = require("spiced-pg");

// remember to place your db credentials in a file called secrets.json that does not get committed to github!
// see .gitignore for that
const { DATABASE_USERNAME, DATABASE_PASSWORD } = require("./secrets.json");
const DATABASE_NAME = "crud"; // it can be whatever you want
const DATABASE_URL = `postgres:${DATABASE_USERNAME}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}`;

const db = spicedPg(DATABASE_URL);

console.log(`[crud:db] connecting to database`);

// plural method - should return an array (result.rows)
function getUsers() {
    return db.query("SELECT * FROM users").then((result) => result.rows);
}

// singular method - should return the first entry of result.rows
function getUserById(id) {
    return db
        .query(`SELECT * FROM users WHERE id = $1`, [id])
        .then((result) => result.rows[0]);
}

// function for search Team
function getUserByFirstName(first_name) {
    return db
        .query(`SELECT * FROM users WHERE first_name = $1`, [first_name])
        .then((result) => result.rows);
}

// function create a new team

function createTeam({ first_name, country, email, profile_picture_url }) {
    console.log("create Team", first_name);
    return db
        .query(
            `
    INSERT INTO users (first_name, country, email, profile_picture_url)
    VALUES ($1, $2, $3, $4);
    `,
            [first_name, country, email, profile_picture_url]
        )
        .then((result) => result.rows);
}

function editTeam({
    first_name,
    country,
    email,
    profile_picture_url,
    user_id,
}) {
    return db.query(
        `UPDATE users SET first_name = $1, country = $2, email = $3, profile_picture_url = $4
    WHERE id = $5`,
        [first_name, country, email, profile_picture_url, user_id]
    );
}

// delete team
function delTeam(id) {
    return db.query(`DELETE FROM users WHERE id = $1`, [id]);
}

module.exports = {
    getUsers,
    getUserById,
    getUserByFirstName,
    createTeam,
    editTeam,
    delTeam,
};
