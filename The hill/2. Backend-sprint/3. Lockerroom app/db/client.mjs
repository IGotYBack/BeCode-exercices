import pkg from 'pg'
import * as dotenv from 'dotenv'

dotenv.config();
// console.log(process.env.lockerPW)

const client = new pkg.Client({
    user: 'adminlr',
    host: 'localhost',
    database: 'locker_room',
    password: process.env.lockerPW,
    port: 5432,
})

export default client;