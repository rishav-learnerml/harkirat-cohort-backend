import { Client } from "pg";
import dotenv from "dotenv";
import {
  insertUserType,
  insertAdressesType,
  insertUserSchema,
  insertAdressesSchema,
} from "../../common/src/index";
import {
  CREATE_ADRESSES_TABLE,
  CREATE_USERS_TABLE,
  GET_USER,
  INSERT_ADRESSES,
  INSERT_USER,
  USERS_AND_ADRESSES_SELECT_JOIN,
  USERS_AND_ADRESSES_FULL_JOIN
} from "./query/query";

dotenv.config();

type pgData = "Invalid Inputs!" | undefined | { id: number };

const client = new Client({
  connectionString: process.env.POSTGRES_URI,
});

// Function to handle connection
async function initializeDb() {
  try {
    await client.connect();
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

// Function to create users table
async function createUsersTable() {
  try {
    const result = await client.query(CREATE_USERS_TABLE);
    console.log("users Table created!");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

// Function to create addresses table
async function createAddressesTable() {
  try {
    const result = await client.query(CREATE_ADRESSES_TABLE);
    console.log("adresses Table created:");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

// Function to insert data into users table
async function insertToUsersTable(data: insertUserType) {
  const success = insertUserSchema.safeParse(data);
  if (!success) {
    console.error("Invalid Inputs!");
    return "Invalid Inputs!";
  }
  const { name, email, password } = data;
  try {
    const result = await client.query(INSERT_USER, [name, email, password]);
    console.log("User inserted!");
  } catch (error) {
    console.error("Error inserting user:", error);
  }
}

// Function to insert data into adresses table
async function insertToAdressesTable(data: insertAdressesType) {
  const success = insertAdressesSchema.safeParse(data);
  if (!success) {
    console.error("Invalid Inputs!");
    return "Invalid Inputs!";
  }
  const { user_id, state, city, pincode } = data;
  try {
    const result = await client.query(INSERT_ADRESSES, [
      user_id,
      state,
      city,
      pincode,
    ]);
    console.log("Adress inserted!");
  } catch (error) {
    console.error("Error inserting adress:", error);
  }
}

const getUserDetails = async (userId: number) => {
  try {
    const res = await client.query(USERS_AND_ADRESSES_SELECT_JOIN, [userId]);
    console.log('User Details:',res.rows[0])
    return res.rows[0];
  } catch (error) {
    console.error("Error while fetching full user details:", error);
  }
};

const getFullUserDetails = async () => {
  try {
    const res = await client.query(USERS_AND_ADRESSES_FULL_JOIN);
    console.log('Users Details',res.rows)
    // return res.rows[0];
  } catch (error) {
    console.error("Error while fetching full user details:", error);
  }
};

// Initialize connection, create table, and insert user
(async () => {
  await initializeDb();
  // Uncomment this line if you want to create the table
  await createUsersTable();
  await createAddressesTable();

  // transaction
  await client.query("BEGIN;");

  await insertToUsersTable({
    name: "hanuman",
    email: "hanuman@jaisreeram.com",
    password: "jaisreeram",
  });
  await insertToUsersTable({
    name: "hanuman1",
    email: "hanuman@jaisreeram.com1",
    password: "jaisreeram1",
  });
  await insertToUsersTable({
    name: "hanuman2",
    email: "hanuman@jaisreeram.com2",
    password: "jaisreeram2",
  });

  const result = await client.query(GET_USER, ["hanuman"]);
  const result1 = await client.query(GET_USER, ["hanuman1"]);

  await insertToAdressesTable({
    user_id: result.rows[0].id,
    state: "UP",
    city: "Ayodhya",
    pincode: 111111,
  });

  await insertToAdressesTable({
    user_id: result1.rows[0].id,
    state: "UP",
    city: "Ayodhya",
    pincode: 111111,
  });

  await client.query("COMMIT;");

  await getUserDetails(result.rows[0].id);
  await getFullUserDetails();

  await client.end(); // Close the connection after all operations
  console.log("Connection closed.");
})();
