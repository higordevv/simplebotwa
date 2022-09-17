import mongoose from "../db";
import { proto } from "@adiwajshing/baileys";
import KeyWordSchemma from "./keywordModel";

async function read_keyWord() {
  const KeyWord = mongoose.model("keyword", KeyWordSchemma, "keyword");
  try {
    let data = await KeyWord.find({});
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function create_keyWord(msg: proto.IMessage | any) {
  const KeyWord = mongoose.model("keyword", KeyWordSchemma, "fluxkeyword");
  try {
    const key_word = new KeyWord(msg);
    await key_word.save();
    return true;
  } catch (err) {
    return null;
  }
}

async function delete_keyWord(id: string) {
  const KeyWord = mongoose.model("keyword", KeyWordSchemma, "keyword");
  let data = await KeyWord.findById(id);
  if (data != null) {
    await KeyWord.deleteOne({ _id: id });
    return true;
  } else {
    return null;
  }
}

export { read_keyWord, create_keyWord, delete_keyWord };
