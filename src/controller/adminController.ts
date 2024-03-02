import express, { type Request } from "express";
import { errorValidation } from "../utilities/errorChecking";
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
    console.log("cookie kundenId", req.cookies.kundenId);
    console.log("cookie", req.cookies);

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

AdminController.get("/admin", async (req: Request, res) => {
  try {
    res.status(200).send("Welcome Admin");
  } catch (error) {
    const customError = errorValidation(error);
    res.status(customError.statusCode).send(customError.message);
  }
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

AdminController.get("/admin/todayDeliveries", async (_req, res) => {
  try {
    const today = new Date();
    const todayDeliveries = await Bestellung.findAll({
      where: {
        gewünschtesLieferdatum: today
      }
    });
    if (!todayDeliveries) {
      throw new CustomError(ErrorHandle.NotFound, "No deliveries today");
    }
    res.status(200).json(todayDeliveries);
  } catch (error) {
    const err = errorValidation(error);
    res.status(err.statusCode).send(err.message);
  }
});
