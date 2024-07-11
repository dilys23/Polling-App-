const db = require("../database/connection");

const getAllUsers = async () => {
    const result = await db.query("select * from users");
    console.log(result);
    return result[0];
    //your code goes here
}


const getUserById = async (id) => {
    try {
        const result = await db.query(`SELECT * FROM users WHERE user_id = ${id}`);
        console.log(result);
        return result[0];
        //your code goes here
    } catch (error) {
        console.error("Error querying the database:", error);
        throw error;
    }
}

const createUser = async (user) => {
    try {
        const result = await db.query("INSERT INTO Customers (FirstName, LastName, Email) VALUES ('Khoaine', 'he', 'khoai.he@example.com')");
        console.log(result);
        return result[0];
    } catch (error) {
        console.error("Error querying the database:", error);
        throw error;
    }
    //your code goes here
}

const updateUser = async (id, customers) => {
    try {
        const result = await db.query(`UPDATE Customers SET FirstName = "Dilysnguyen" WHERE CustomerID = ${id}`);
        console.log(result);
        return result[0];
        //your code goes here
    } catch (error) {
        console.error("Error querying the database:", error);
        throw error;
    }
}

const deleteUser = async (id) => {
    try {
        const result = await db.query(`DELETE FROM Customers WHERE CustomerID = ${id}`);
        console.log(result);
        return result[0];
        //your code goes here
    } catch (error) {
        console.error("Error querying the database:", error);
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}