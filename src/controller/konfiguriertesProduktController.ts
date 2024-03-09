import express from "express";
import CustomError from "../utilities/error";
import { findAllProductsIngridiendsRelations } from "../database/zutatenPostion/operation/findProductsIngridientsRelations";
import Zutat from "../database/zutat/zutat";
import { addProduktZutatRelation } from "../database/zutatenPostion/operation/addProduktZutatRelation";
import {
  ProduktCreationAttributes,
  ZutatenPositionCreationAttributes,
  ZutatenPostitionObject
} from "../global/types";
export const ZutatenPositionController = express.Router();
import { createProdukt } from "../database/produkt/operations/createProdukt";
import { createZutat } from "../database/zutat/operations/createZutat";
import ZutatenPosition from "../database/zutatenPostion/zutatenPosition";
import { Request, Response } from "express";
import { errorChecking, errorValidation } from "../utilities/errorChecking";

interface AusgewählteZutat {
  zutatsId: string;
  zutatenMenge: string;
}

interface KonfiguriertesProdukt {
  kundenId: string;
  titel: string;
  preis: number;
  bild: string;
  sparte: string;
  zutaten: Array<AusgewählteZutat>;
}

ZutatenPositionController.get("/KundenProdukt", (_req, res) => {
  findAllProductsIngridiendsRelations()
    .then((zutatPosition) => {
      res.status(200).json(zutatPosition);
    })
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

async function getGesamtpreis(
  zutaten: Array<AusgewählteZutat>
): Promise<number> {
  let preis: number = 0;
  for (const zutat1 of zutaten) {
    const zutat = await Zutat.findByPk(zutat1.zutatsId);
    if (zutat) {
      preis += zutat.zutatspreis * parseInt(zutat1.zutatenMenge);
    }
  }
  return parseFloat(preis.toFixed(2));
}

async function makeProduct(req: Request, res: Response) {
  try {
    const importedProduct: KonfiguriertesProdukt = {
      titel: req.body.titel,
      preis: await getGesamtpreis(req.body.zutat),
      bild: "Logo.webp",
      sparte: "KundenProdukt",
      kundenId: req.body.kundenId,
      zutaten: req.body.zutat
    };

    const zwischenspeicherungprodukt: ProduktCreationAttributes = {
      titel: importedProduct.titel,
      preis: importedProduct.preis,
      bild: importedProduct.bild,
      sparte: importedProduct.sparte,
      kundenId: importedProduct.kundenId
    };

    let productID = "";

    const produkt = await createProdukt(zwischenspeicherungprodukt);
    if (produkt) {
      productID = produkt.produktId;
    }

    const zutatenPosition: ZutatenPositionCreationAttributes = {
      produktId: productID,
      zutatIdWithAmount: importedProduct.zutaten
    };
    await addProduktZutatRelation(zutatenPosition);
    res.status(201).json(productID);
  } catch (err) {
    console.log(err);
    throw errorChecking(err);
  }
}

ZutatenPositionController.post("/KundenProdukt", async (req, res) => {
  try {
    await makeProduct(req, res);
  } catch (error) {
    console.log(error, "error");
    res.status(500).send("unknown error");
  }
});
