import { Ifluxo } from "../../interfaces/Ifluxo";
import mongoose from "../db";
import FluxoSchema from "./fluxoModel";

async function read_fluxoMsg() {
  const Fluxo = mongoose.model("fluxo", FluxoSchema, "fluxo");
  try {
    let data = await Fluxo.find({});
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
async function consult_fluxoMsg(name: string) {
  const Fluxo = mongoose.model("fluxo", FluxoSchema, "fluxo");
  try {
    let data = await Fluxo.findOne({ titulo: name });
    return data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

async function create_fluxo(fluxo: Ifluxo | any) {
  const Fluxo = mongoose.model("fluxo", FluxoSchema, "fluxo");
  try {
    const FluxMsg = new Fluxo(fluxo);
    await FluxMsg.save();
    console.log("fluxo criado");
    return true;
  } catch (err) {
    return null;
  }
}

async function delete_msg(titulo: string) {
  const Fluxo = mongoose.model("fluxo", FluxoSchema, "fluxo");
  let data = await Fluxo.findOne({ titulo });
  if (data != null) {
    await Fluxo.deleteOne({ _id: data.id });
    return true;
  } else {
    return null;
  }
}

export { consult_fluxoMsg, create_fluxo, delete_msg, read_fluxoMsg };
