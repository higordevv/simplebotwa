import mongoose from 'mongoose';

const KeyWordSchemma = new mongoose.Schema(
    {
      key_word: String,
      answers: String,
    },
    { collection: "keyword" }
  );
  export default KeyWordSchemma;
  