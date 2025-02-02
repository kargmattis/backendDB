import express from "express";
import { createProdukt } from "../database/produkt/operations/createProdukt";
import CustomError from "../utilities/error";
import {
  findAllProducts,
  findProductWithoutKundeId,
  findProduktByKundeId,
  findProduktByPk
} from "../database/produkt/operations/findProdukt";
import { errorValidation } from "../utilities/errorChecking";
import { ErrorHandle } from "../global/enums";
import {
  findZutat,
  findZutatById
} from "../database/zutat/operations/findZutat";
import { ProduktUndZutaten, ZutatenMitProduktId } from "./productHelper";
import Produkt from "../database/produkt/produkt";
import Zutat from "../database/zutat/zutat";
import { Request, Response } from "express";
import { addProduktZutatRelation } from "../database/zutatenPostion/operation/addProduktZutatRelation";
import {
  ProduktCreationAttributes,
  ZutatenPositionCreationAttributes
} from "../global/types";

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
import { deleteProdukt } from "../database/produkt/operations/deleteProdukt";

export const ProduktController = express.Router();

ProduktController.get("/produkt", async (_req, res) => {
  try {
    const productWithIngredients: Array<ProduktUndZutaten> = [];
    const products = await findAllProducts();
    if (!products) {
      throw new CustomError(ErrorHandle.NotFound, "General Products");
    }
    for (const product of products) {
      const zutaten = await ZutatenMitProduktId(product.produktId);
      const produktUndZutaten: ProduktUndZutaten = {
        produktId: product.produktId,
        titel: product.titel,
        preis: product.preis,
        bild: product.bild,
        sparte: product.sparte,
        kundenId: product.kundenId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        Zutaten: zutaten
      };
      productWithIngredients.push(produktUndZutaten);
    }
    res.status(200).json(productWithIngredients);
  } catch (error) {
    const err = errorValidation(error);
    res.status(err.statusCode).send(err.message);
  }
});

ProduktController.put("/produkt/loeschen", async (req, res) => {
  deleteProdukt(req.body.produktId)
    .then((success) => res.status(201).json(success))
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

ProduktController.get("/generalProdukts", async (_req, res) => {
  try {
    const productWithIngredients: Array<ProduktUndZutaten> = [];
    const products = await findProductWithoutKundeId();
    if (!products) {
      throw new CustomError(ErrorHandle.NotFound, "General Products");
    }
    const filteredProducts = products.filter(
      (product) => product.sparte !== null
    ); //filtert alle deaktivierten (gelöschten) Produkte heraus

    for (const product of filteredProducts) {
      const zutaten = await ZutatenMitProduktId(product.produktId);
      const produktUndZutaten: ProduktUndZutaten = {
        produktId: product.produktId,
        titel: product.titel,
        preis: product.preis,
        bild: product.bild,
        sparte: product.sparte,
        kundenId: null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        Zutaten: zutaten
      };
      productWithIngredients.push(produktUndZutaten);
    }
    res.status(200).json(productWithIngredients);
  } catch (error) {
    const err = errorValidation(error);
    res.status(err.statusCode).send(err.message);
  }
});

ProduktController.get("/CustomerProducts/:id", async (_req, res) => {
  try {
    const { id } = _req.params;
    const productWithIngredients: Array<ProduktUndZutaten> = [];
    const products = await findProduktByKundeId(id);
    if (!products) {
      throw new CustomError(ErrorHandle.NotFound, "General Products");
    }

    const filteredProducts = products.filter(
      (product) => product.sparte !== null
    ); //filtert alle deaktivierten (gelöschten) Produkte heraus

    for (const product of filteredProducts) {
      const zutaten = await ZutatenMitProduktId(product.produktId);
      const produktUndZutaten: ProduktUndZutaten = {
        produktId: product.produktId,
        titel: product.titel,
        preis: product.preis,
        bild: product.bild,
        sparte: product.sparte,
        kundenId: id,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        Zutaten: zutaten
      };
      productWithIngredients.push(produktUndZutaten);
    }
    res.status(200).json(productWithIngredients);
  } catch (error) {
    const err = errorValidation(error);
    res.status(err.statusCode).send(err.message);
  }
});

// ProduktController.get("/CustomerProducts/:id", (_req, res) => {
//   const { id } = _req.params;
//   const productWithIngredients: Array<ProduktUndZutaten> = [];
//   findProduktByKundeId(id)
//     .then((produkt) => {
//       res.status(200).json(produkt);
//     })
//     .catch((error: CustomError) => {
//       res.status(error.statusCode).send(error.message);
//     });
// });

ProduktController.put("/produkt", (_req, res) => {
  res.send("Create Put product request");
});

ProduktController.delete("/produkt", (_req, res) => {
  res.send("Delete delete product request");
});
