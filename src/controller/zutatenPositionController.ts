import express from "express";
import type CustomError from "../utilities/error";
import { findAllProductsIngridiendsRelations } from "../database/zutatenPostion/operation/findProductsIngridientsRelations";
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
