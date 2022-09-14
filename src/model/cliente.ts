import { Iclient } from "../interfaces/Iclient";
import clienteSchema from "./clienteModel";
import mongoose from "./db";

async function consultOne(nome: string) {

    const cliente = mongoose.model('cliente', clienteSchema, 'cliente')
    try {
        let data = await cliente.findOne({nome:nome})
        
        return data
    } catch (err) {
        return {}
    }
}
async function consultList(listName:string) {

    const cliente = mongoose.model('cliente', clienteSchema, 'cliente')
    try {
        let data = await cliente.find({tipoDeCliente:listName})
        console.log(data)
        return data
    } catch (err) {
        return []
    }
}
async function create(obj: Iclient|any) {
    if(!obj){

        throw "erro ao gravar cliente"
    }
    const Cliente = mongoose.model('cliente', clienteSchema, 'cliente')
    try {

        const standOne = new Cliente(obj)
        await standOne.save()
        return true
    } catch (err) {
        return null
    }


}
async function deleteOne(id: string) {

    const Cliente = mongoose.model('cliente', clienteSchema, 'cliente')
    let data = await Cliente.findById(id)
    if (data != null) {
        await Cliente.deleteOne({ _id: id })
        return true
    } else {
        return null
    }

}
export default {
    create, consultOne, consult, deleteOne,consultList
}

async function consultOne(id: string) {
  const cliente = mongoose.model("cliente", clienteSchema, "cliente");
  try {
    let data = await cliente.findById(id);
    return data;
  } catch (err) {
    return {};
  }
}
async function create(obj: Iclient) {
  const Cliente = mongoose.model("cliente", clienteSchema, "cliente");
  try {
    const standOne = new Cliente(obj);
    await standOne.save();
    return true;
  } catch (err) {
    return null;
  }
}
async function deleteOne(id: string) {
  const Cliente = mongoose.model("cliente", clienteSchema, "cliente");
  let data = await Cliente.findById(id);
  if (data != null) {
    await Cliente.deleteOne({ _id: id });
    return true;
  } else {
    return null;
  }
}

