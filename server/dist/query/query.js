"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSERT_USER = exports.CREATE_USERS_TABLE = void 0;
const INSERT_USER = `INSERT INTO users (username,password,email) VALUES ($1, $2, $3);`;
exports.INSERT_USER = INSERT_USER;
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
