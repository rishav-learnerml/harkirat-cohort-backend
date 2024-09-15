"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("../../common/src/index");
const query_1 = require("./query/query");
dotenv_1.default.config();
const client = new pg_1.Client({
    connectionString: process.env.POSTGRES_URI,
});
// Function to handle connection
function initializeDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to the database.");
        }
        catch (error) {
            console.error("Failed to connect to the database:", error);
        }
    });
}
// Function to create users table
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query(query_1.CREATE_USERS_TABLE);
            console.log("users Table created!");
        }
        catch (error) {
            console.error("Error creating table:", error);
        }
    });
}
// Function to create addresses table
function createAddressesTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query(query_1.CREATE_ADRESSES_TABLE);
            console.log("adresses Table created:");
        }
        catch (error) {
            console.error("Error creating table:", error);
        }
    });
}
// Function to insert data into users table
function insertToUsersTable(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const success = index_1.insertUserSchema.safeParse(data);
        if (!success) {
            console.error("Invalid Inputs!");
            return "Invalid Inputs!";
        }
        const { name, email, password } = data;
        try {
            const result = yield client.query(query_1.INSERT_USER, [name, email, password]);
            console.log("User inserted!");
        }
        catch (error) {
            console.error("Error inserting user:", error);
        }
    });
}
// Function to insert data into adresses table
function insertToAdressesTable(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const success = index_1.insertAdressesSchema.safeParse(data);
        if (!success) {
            console.error("Invalid Inputs!");
            return "Invalid Inputs!";
        }
        const { user_id, state, city, pincode } = data;
        try {
            const result = yield client.query(query_1.INSERT_ADRESSES, [
                user_id,
                state,
                city,
                pincode,
            ]);
            console.log("Adress inserted!");
        }
        catch (error) {
            console.error("Error inserting adress:", error);
        }
    });
}
const getUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield client.query(query_1.USERS_AND_ADRESSES_SELECT_JOIN, [userId]);
        console.log('User Details:', res.rows[0]);
        return res.rows[0];
    }
    catch (error) {
        console.error("Error while fetching full user details:", error);
    }
});
const getFullUserDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield client.query(query_1.USERS_AND_ADRESSES_FULL_JOIN);
        console.log('Users Details', res.rows);
        // return res.rows[0];
    }
    catch (error) {
        console.error("Error while fetching full user details:", error);
    }
});
// Initialize connection, create table, and insert user
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield initializeDb();
    // Uncomment this line if you want to create the table
    yield createUsersTable();
    yield createAddressesTable();
    // transaction
    yield client.query("BEGIN;");
    yield insertToUsersTable({
        name: "hanuman",
        email: "hanuman@jaisreeram.com",
        password: "jaisreeram",
    });
    yield insertToUsersTable({
        name: "hanuman1",
        email: "hanuman@jaisreeram.com1",
        password: "jaisreeram1",
    });
    yield insertToUsersTable({
        name: "hanuman2",
        email: "hanuman@jaisreeram.com2",
        password: "jaisreeram2",
    });
    const result = yield client.query(query_1.GET_USER, ["hanuman"]);
    const result1 = yield client.query(query_1.GET_USER, ["hanuman1"]);
    yield insertToAdressesTable({
        user_id: result.rows[0].id,
        state: "UP",
        city: "Ayodhya",
        pincode: 111111,
    });
    yield insertToAdressesTable({
        user_id: result1.rows[0].id,
        state: "UP",
        city: "Ayodhya",
        pincode: 111111,
    });
    yield client.query("COMMIT;");
    yield getUserDetails(result.rows[0].id);
    yield getFullUserDetails();
    yield client.end(); // Close the connection after all operations
    console.log("Connection closed.");
}))();
