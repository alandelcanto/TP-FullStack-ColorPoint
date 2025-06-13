import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "colorpointadmin",
    password: "password",
    database: "colorpoint",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;