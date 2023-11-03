import { Request, Response } from "npm:express@4.18.2";
import MonumentosModel from "../db/person.ts";

const deleteMonumento = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const monumento = await MonumentosModel.findByIdAndRemove(_id);
    if (!monumento) {
      res.status(404).send("monumentono no encontrado");
      return;
    }
    res.status(200).send("monumento eliminado");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteMonumento;