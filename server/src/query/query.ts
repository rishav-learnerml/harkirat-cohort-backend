const CREATE_USERS_TABLE = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        `;

const CREATE_ADRESSES_TABLE = `
    CREATE TABLE IF NOT EXISTS adresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        street VARCHAR(50) NOT NULL,
        city VARCHAR(255) NOT NULL,
        pincode VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        );
        `;

const INSERT_USER = `INSERT INTO users (username,password,email) VALUES ($1, $2, $3);`;
const INSERT_ADRESSES = `INSERT INTO adresses (user_id,street,city,pincode) VALUES ($1, $2, $3, $4);`;

const GET_ALL_USERS = "SELECT * FROM users;";
const GET_ALL_ADRESSES = "SELECT * FROM adresses;";

const GET_USER = "SELECT * FROM users WHERE username=$1;";
const USERS_AND_ADRESSES_SELECT_JOIN = `
        SELECT u.username, u.email, u.password, a.street, a.city, a.pincode
        FROM users u
        JOIN adresses a ON u.id = a.user_id
        WHERE u.id = $1;
    `;
const USERS_AND_ADRESSES_FULL_JOIN = `
        SELECT u.username, u.email, u.password, a.street, a.city, a.pincode
        FROM users u
        FULL JOIN adresses a ON u.id = a.user_id;
    `;

export {
  CREATE_USERS_TABLE,
  CREATE_ADRESSES_TABLE,
  INSERT_USER,
  INSERT_ADRESSES,
  USERS_AND_ADRESSES_SELECT_JOIN,
  GET_ALL_USERS,
  GET_USER,
  GET_ALL_ADRESSES,
  USERS_AND_ADRESSES_FULL_JOIN,
};
