import { Request, Response } from "npm:express@4.18.2";
import MonumentosModel from "../db/person.ts";

  
const addMonumento = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, codigopostal, iso } = req.body;

    if (!nombre || !descripcion || !codigopostal || !iso) {
      res.status(500).send("no has metido los datos correctos");
      return;
    }

    const BASE_URL="https://zip-api.eu/api/v1/info";
    const url= `${BASE_URL}/${iso}-${codigopostal}`;
    const data= await fetch (url);

    if(data.status!==200){
      throw new Error("esta puesto mal el iso o el codigo postal")
  }
  
    const foundSlot = await MonumentosModel.findOne({ nombre, codigopostal });
    if (foundSlot) {
      res.status(400).send("ya esta ocupado el nombre y el codigo postal");
      return;
      
    }

    const newMonumento = new MonumentosModel({ nombre, descripcion, codigopostal, iso });
    await newMonumento.save();

    res.status(200).send({
      nombre: newMonumento.nombre,
      descripcion: newMonumento.descripcion,
      codigopostal: newMonumento.codigopostal,
      iso: newMonumento.iso,
      id: newMonumento._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addMonumento;