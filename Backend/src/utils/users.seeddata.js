import bcrypt from "bcrypt"

export default [
    {
        username: "admin",
        password: await bcrypt.hash("password", 10),
    },
    {
        username: "Alan",
        password: await bcrypt.hash("del Canto", 10),
    },
    {
        username: "Shirley",
        password: await bcrypt.hash("Antezana", 10),
    },
]