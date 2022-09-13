import mongoose from "./db";
//schema de post
const clienteSchema = new mongoose.Schema({
    nome:String,
    numero:String,
    tipoDeCliente:String
   
}, { collection: 'clientes' }
);
export default clienteSchema