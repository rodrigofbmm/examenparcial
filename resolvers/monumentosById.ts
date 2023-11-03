import { Request, Response } from "npm:express@4.18.2";
import MonumentosModel from "../db/person.ts";

const getMonumentosById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const monumento = await MonumentosModel.findById(id).exec();
    const codigo = monumento?.codigopostal;
    const iso = monumento?.iso;

    const BASE_URL="https://zip-api.eu/api/v1/info";
    const url= `${BASE_URL}/${iso}-${codigo}`;

    const data= await fetch (url);
    const json= await data.json();

    if(data.status!==200){
        throw new Error("Errorrrr")
    }

    const BASE_URL2="http://api.weatherapi.com/v1/current.json?";
    const API_KEY="c5dc536080eb4d0e9b4105931230610";
    const url2= `${BASE_URL2}Key=${API_KEY}&q=${json.place_name}`;
    const data2= await fetch (url2);
    if(data.status!==200){
        throw new Error("Errorrrr")
    }
    const json2= await data2.json();

    if (!monumento) {
      res.status(404).send("Person not found");
      return;
    }
    res.status(200).send({
      nombre: monumento.nombre,
      descripcion: monumento.descripcion,
      codigopostal: monumento.codigopostal,
      ciudad: json.place_name,
      pais: json2.location.country,
      iso: json.country_code,
      clima: json2.current.condition.text,
      hora: json2.location.localtime,
      id: monumento._id.toString(),
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMonumentosById;