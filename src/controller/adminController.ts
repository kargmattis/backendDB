import express, { type Request } from "express";
import {
  findAllBestellungen,
  findSingleBestellung
} from "../database/bestellung/operations/findBestellung";
import { errorValidation } from "../utilities/errorChecking";
import { placeOrder } from "../database/bestellung/operations/addBestellung";
import CustomError from "../utilities/error";
import cookieParser from "cookie-parser";
import { ErrorHandle } from "../global/enums";
import Bestellung from "../database/bestellung/bestellung";
import { checkAdmin } from "./adminHelper/adminHelper";

export const AdminController = express.Router();
AdminController.use(cookieParser());
AdminController.use(async (req, res, next) => {
  // cookie steht kundenId drin diese soll hier herausgelsen werden
  try {
    const kundenId = req.cookies.kundenId;
    const admin = await checkAdmin(kundenId);
    if (admin) {
      next();
    }
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

AdminController.get("/bestellungen/:kundenId", async (req: Request, res) => {
  try {
    const kundenId = req.params.kundenId;
    const allBestellungen = await findAllBestellungen(kundenId);
    res.status(200).json(allBestellungen);
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

AdminController.get("/bestellung/:kundenId", async (req: Request, res) => {
  try {
    const kundeId = req.params.kundenId;
    const bestellungen = await findSingleBestellung(kundeId);
    res.status(200).json(bestellungen);
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

AdminController.post("/bestellung", async (req: Request, res) => {
  try {
    console.log(req.body);

    const { kundenId, gewünschtesLieferdatum, isPaypal } = req.body;
    const bestellungen = await placeOrder({
      kundenId,
      isPaypal,
      gewünschtesLieferdatum
    });
    res.status(200).json(bestellungen);
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

AdminController.put("/bestellung/:bestellId", (req, res) => {
  try {
    const singleBestellung = findSingleBestellung(req.params.bestellId);
    if (!singleBestellung) {
      throw new CustomError(ErrorHandle.NotFound, "Bestellung not found");
    }
    res.status(200).json(singleBestellung);
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
});

AdminController.delete("/bestellung", (_req, res) => {
  res.send("Bestellung delete request");
});

AdminController.put("/admin/deliver/:bestellId", async (req: Request, res) => {
  try {
    const bestellId = req.params.bestellId;
    const deliveredbestellung = await Bestellung.findByPk(bestellId);
    const newDate = new Date();
    if (!deliveredbestellung) {
      throw new CustomError(ErrorHandle.NotFound, "Bestellung not found");
    }
    deliveredbestellung.lieferdatum = newDate;
    await deliveredbestellung.save();
    res.status(200).json(deliveredbestellung);
  } catch (error) {
    const err = errorValidation(error);
    res.status(err.statusCode).send(err.message);
  }
});
