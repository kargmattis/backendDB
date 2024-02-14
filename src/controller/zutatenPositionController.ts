import express from "express";
import CustomError from "../utilities/error";
import { findAllProductsIngridiendsRelations } from "../database/zutatenPostion/operation/findProductsIngridientsRelations";
import Zutat from "../database/zutat/zutat";
import { addProduktZutatRelation } from "../database/zutatenPostion/operation/addProduktZutatRelation";
import { ZutatenPositionCreationAttributes } from "../global/types";
export const ZutatenPositionController = express.Router();

ZutatenPositionController.get("/ZutatenPosition", (_req, res) => {
  findAllProductsIngridiendsRelations()
    .then((zutatPosition) => {
      res.status(200).json(zutatPosition);
    })
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

ZutatenPositionController.post("/ZutatenPosition", (req, res) => {
  let zutatenPosition: ZutatenPositionCreationAttributes = req.body;

  // Überprüfen, ob zutatIdWithAmount ein Array ist
  if (!Array.isArray(zutatenPosition.zutatIdWithAmount)) {
    return res.status(400).send("zutatIdWithAmount must be an array");
  }

  // Überprüfen, ob jedes Element in zutatIdWithAmount die erforderlichen Felder hat
  for (const zutat of zutatenPosition.zutatIdWithAmount) {
    if (!zutat.zutatsId || !zutat.zutatenMenge) {
      return res
        .status(400)
        .send("Each zutat must have a zutatsId and zutatenMenge");
    }
  }

  addProduktZutatRelation(zutatenPosition)
    .then((zutatenPosition) => {
      res.status(200).json(zutatenPosition);
    })
    .catch((error: any) => {
      console.error(error);
      res
        .status(error.statusCode || 500)
        .send(error.message || "An error occurred");
    });
});
