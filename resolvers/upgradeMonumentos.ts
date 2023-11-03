import { Request, Response } from "npm:express@4.18.2";
import MonumentosModel from "../db/person.ts";

const updateMonumentos = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const { nombre, descripcion, codigopostal, iso } = req.body;
    if (!nombre || !descripcion || !codigopostal || !iso) {
      res.status(400).send("no has puesto todos los parametros");
      return;
    }

    const BASE_URL="https://zip-api.eu/api/v1/info";
    const url= `${BASE_URL}/${iso}-${codigopostal}`;
    const data= await fetch (url);

    if(data.status!==200){
      throw new Error("esta puesto mal el iso o el codigo postal")
    }

    const updatedMonumento = await MonumentosModel.findByIdAndUpdate(
        {_id},
        { nombre, descripcion, codigopostal, iso },
        { new: true }
        ).exec();
    if (!updatedMonumento) {
      res.status(404).send("monumento no encontarado");
      return;
    }

    res.status(200).send({
        nombre: updatedMonumento.nombre,
        descripcion: updatedMonumento.descripcion,
        codigopostal: updatedMonumento.codigopostal,
        iso: updatedMonumento.iso,
        id: updatedMonumento._id.toString(),
      });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateMonumentos;