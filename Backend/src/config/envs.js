import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT || 3000,
    front_url: process.env.FRONT_URL,
    db_config: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
}