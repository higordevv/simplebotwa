import { Iclient } from "../interfaces/Iclient"
import clienteSchema from "./clienteModel"
import mongoose from './db'
async function consult() {
    
    const cliente = mongoose.model('cliente', clienteSchema, 'cliente')
    try {
        let data = await cliente.find({})

        return data
    } catch (err) {
        console.log(err)
        return []
    }
}
async function consultOne(id:string){
 
    const cliente = mongoose.model('cliente', clienteSchema, 'cliente')
    try {
        let data = await cliente.findById(id)
        return data
    } catch (err) {
        return {}
    }
}
async function create(obj:Iclient){
    
    const Cliente = mongoose.model('cliente', clienteSchema, 'cliente')
    try {

        const standOne = new Cliente(obj)
        await standOne.save()
        return true
    } catch (err) {
        return null
    }


}
async function deleteOne(id:string){

    const Cliente = mongoose.model('cliente', clienteSchema, 'cliente')
    let data = await Cliente.findById(id)
    if (data != null) {
        await Cliente.deleteOne({ _id: id })
        return true
    } else {
        return null
    }

}