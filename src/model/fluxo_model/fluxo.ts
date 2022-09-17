import { proto } from "@adiwajshing/baileys";
import mongoose from "../db";
import FluxoSchema from "./fluxoModel";

async function consult_fluxoMsg() {
  const Fluxo = mongoose.model("fluxo", FluxoSchema, "fluxo");
  try {
    let data = await Fluxo.find({});
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function create_fluxo(msg: proto.IMessage | any) {
  const Fluxo = mongoose.model("fluxo", FluxoSchema, "fluxo");
  try {
    const FluxMsg = new Fluxo(msg);
    await FluxMsg.save();
    return true;
  } catch (err) {
    return null;
  }
}

async function delete_msg(id: string) {
  const Fluxo = mongoose.model("fluxo", FluxoSchema, "fluxo");
  let data = await Fluxo.findById(id);
  if (data != null) {
    await Fluxo.deleteOne({ _id: id });
    return true;
  } else {
    return null;
  }
}

export { consult_fluxoMsg, create_fluxo, delete_msg };
