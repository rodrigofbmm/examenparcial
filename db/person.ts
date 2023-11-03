import mongoose from "npm:mongoose@7.6.3";
import { Monumentos } from "../types.ts";

const Schema = mongoose.Schema;

const MonumentosSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigopostal: { type: Number, required: true },
    ciudad: { type: String, required: false },
    pais: { type: String, required: false },
    clima: { type: String, required: false },
    iso: { type: String, required: true },
    hora: { type: Number, required: false },
  },
  { timestamps: true }
);

export type MonumentosModelType = mongoose.Document & Omit<Monumentos, "id">;

export default mongoose.model<MonumentosModelType>("Monumentos", MonumentosSchema);