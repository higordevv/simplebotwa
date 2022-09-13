import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
//variaveis de ambiente
const user = process.env.DB_USER
const password = process.env.DB_PASS

//conexão mongo
mongoose.connect(`mongodb://localhost/banco`)
    .then(() => { console.log('connectado ao mongodb') })
    .catch((e) => { console.log(e) })

export default mongoose
