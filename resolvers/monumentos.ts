import { Request, Response } from "npm:express@4.18.2";
import MonumentosModel from "../db/person.ts";

const getMonumentos = async (req: Request, res: Response) => {
    try {

        const monumento = await MonumentosModel.find().exec();


        if (!monumento) {
          res.status(404).send("No se encontraron monumentos");
          return;
        }

        const formattedPersons = monumento.map((monumento) => ({
          nombre: monumento.nombre,
          iso: monumento.iso,
          id: monumento._id.toString(),
          codigo: monumento.codigopostal,
        }));
    
        res.status(200).send(formattedPersons);
      } catch (error) {
        res.status(500).send(error.message);
      }
    };
  
  export default getMonumentos;