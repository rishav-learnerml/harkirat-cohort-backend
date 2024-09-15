"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERS_AND_ADRESSES_FULL_JOIN = exports.GET_ALL_ADRESSES = exports.GET_USER = exports.GET_ALL_USERS = exports.USERS_AND_ADRESSES_SELECT_JOIN = exports.INSERT_ADRESSES = exports.INSERT_USER = exports.CREATE_ADRESSES_TABLE = exports.CREATE_USERS_TABLE = void 0;
const CREATE_USERS_TABLE = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        `;
exports.CREATE_USERS_TABLE = CREATE_USERS_TABLE;
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
exports.CREATE_ADRESSES_TABLE = CREATE_ADRESSES_TABLE;
const INSERT_USER = `INSERT INTO users (username,password,email) VALUES ($1, $2, $3);`;
exports.INSERT_USER = INSERT_USER;
const INSERT_ADRESSES = `INSERT INTO adresses (user_id,street,city,pincode) VALUES ($1, $2, $3, $4);`;
exports.INSERT_ADRESSES = INSERT_ADRESSES;
const GET_ALL_USERS = "SELECT * FROM users;";
exports.GET_ALL_USERS = GET_ALL_USERS;
const GET_ALL_ADRESSES = "SELECT * FROM adresses;";
exports.GET_ALL_ADRESSES = GET_ALL_ADRESSES;
const GET_USER = "SELECT * FROM users WHERE username=$1;";
exports.GET_USER = GET_USER;
const USERS_AND_ADRESSES_SELECT_JOIN = `
        SELECT u.username, u.email, u.password, a.street, a.city, a.pincode
        FROM users u
        JOIN adresses a ON u.id = a.user_id
        WHERE u.id = $1;
    `;
exports.USERS_AND_ADRESSES_SELECT_JOIN = USERS_AND_ADRESSES_SELECT_JOIN;
const USERS_AND_ADRESSES_FULL_JOIN = `
        SELECT u.username, u.email, u.password, a.street, a.city, a.pincode
        FROM users u
        FULL JOIN adresses a ON u.id = a.user_id;
    `;
exports.USERS_AND_ADRESSES_FULL_JOIN = USERS_AND_ADRESSES_FULL_JOIN;
