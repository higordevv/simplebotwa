import mongoose from "../db";

const FluxoSchema = new mongoose.Schema({}, { collection: "fluxo" });
export default FluxoSchema;
