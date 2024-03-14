import express, { type Request, Response } from "express";
import { errorValidation } from "../utilities/errorChecking";
import CustomError from "../utilities/error";
import cookieParser from "cookie-parser";
import { ErrorHandle } from "../global/enums";
import Bestellung from "../database/bestellung/bestellung";
import {
  checkAdmin,
  findBestellungDependencies
} from "./adminHelper/adminHelper";
import { Sequelize, Op } from "sequelize";
import { deleteIngredient } from "../database/zutat/operations/deleteZutat";
import { createProdukt } from "../database/produkt/operations/createProdukt";
import {
  ProduktCreationAttributes,
  ZutatenPositionCreationAttributes
} from "../global/types";
import { addProduktZutatRelation } from "../database/zutatenPostion/operation/addProduktZutatRelation";
import Zutat from "../database/zutat/zutat";

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
    // res.status(401).send("Not authorized");
  } catch (error) {
    const customError = errorValidation(error);
    res.status(401).send("Not authorized");
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

AdminController.put("/admin/zutatenloeschen", async (req, res) => {
  deleteIngredient(req.body.zutatsId)
    .then((success) => res.status(201).json(success))
    .catch((error: CustomError) => {
      res.status(error.statusCode).send(error.message);
    });
});

AdminController.get("/admin/todayDeliveries", async (_req, res) => {
  try {
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${(
      "0" +
      (today.getMonth() + 1)
    ).slice(-2)}-${("0" + today.getDate()).slice(-2)}`;

    console.log("ft", formattedToday);
    const todayDeliveries = await Bestellung.findAll({
      where: Sequelize.and(
        Sequelize.where(
          Sequelize.fn("date", Sequelize.col("gewünschtesLieferdatum")),
          "=",
          formattedToday
        ),
        { lieferdatum: { [Op.is]: null } }
      )
    });
    console.log("td", todayDeliveries);
    const bestellungWithDependency = await Promise.all(
      todayDeliveries.map(async (bestellung) => {
        try {
          const bestellungWithDependencies = await findBestellungDependencies(
            bestellung
          );
          console.log("bw", bestellungWithDependencies);
          return bestellungWithDependencies;
        } catch (error) {
          console.log("error", error);
        }
      })
    );
    console.log("----------------------", bestellungWithDependency);
    if (!todayDeliveries) {
      throw new CustomError(ErrorHandle.NotFound, "No deliveries today");
    }
    console.log("abw!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("abw", bestellungWithDependency);
    const filteredBestellung = bestellungWithDependency.filter(
      (bestellung) => bestellung !== undefined
    );
    res.status(200).json(filteredBestellung);
  } catch (error) {
    console.log("error status code", error);

    const err = errorValidation(error);
    res.status(err.statusCode).send(err.message);
  }
});

AdminController.get("/admin/sumLieferdatum/:date", async (req, res) => {
  console.log("im here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log(
    "Matthis warum hast du das console.log nicht entfernt?!?!?!?!?!?!?!?!?!"
  );
  try {
    console.log("date", req.params.date);

    const date = new Date(req.params.date);
    const formattedToday = `${date.getFullYear()}-${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

    console.log("ft", formattedToday);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!date", date);

    const todayDeliveries = await Bestellung.findAll({
      where: Sequelize.where(
        Sequelize.fn("date", Sequelize.col("gewünschtesLieferdatum")),
        "=",
        formattedToday
      )
    });
    console.log("td", todayDeliveries);
    const bestellungWithDependency = await Promise.all(
      todayDeliveries.map(async (bestellung) => {
        try {
          const bestellungWithDependencies = await findBestellungDependencies(
            bestellung
          );
          console.log("bw", bestellungWithDependencies);
          return bestellungWithDependencies;
        } catch (error) {
          console.log("error", error);
        }
      })
    );
    console.log("----------------------", bestellungWithDependency);
    if (!todayDeliveries) {
      throw new CustomError(ErrorHandle.NotFound, "No deliveries today");
    }
    console.log("abw!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("abw", bestellungWithDependency);
    const filteredBestellung = bestellungWithDependency.filter(
      (bestellung) => bestellung !== undefined
    );
    res.status(200).json(filteredBestellung);
  } catch (error) {
    const err = errorValidation(error);
    res.status(err.statusCode).send(err.message);
  }
});

async function gesamtPreis(zutaten: Array<AusgewählteZutat>): Promise<number> {
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
  // 1. vom Frontend kommen Zutatid, Zutatenmenge, Kundenid
  let bildpfad = "";
  if (req.body.bild) {
    bildpfad = req.body.bild;
  } else {
    //wenn kein Produktbild angegeben wird, da optionales Feld, dann Stdbild einfügen.
    bildpfad = "Logo.webp";
  }

  const importedProduct: KonfiguriertesProdukt = {
    titel: req.body.titel,
    preis: req.body.preis, // await the getZutaten function to resolve the promise
    bild: bildpfad,
    sparte: req.body.sparte,
    kundenId: req.body.kundenId,
    zutaten: req.body.zutat
  };
  // console.log(importedProduct);

  const zwischenspeicherungprodukt: ProduktCreationAttributes = {
    titel: importedProduct.titel,
    preis: importedProduct.preis,
    bild: importedProduct.bild,
    sparte: importedProduct.sparte,
    kundenId: importedProduct.kundenId
  };

  let productID = "";

  // 2. Produkt erstellen
  try {
    createProdukt(zwischenspeicherungprodukt)
      .then((produkt) => {
        if (produkt) {
          productID = produkt.produktId;
        }
      })
      // 3. Zutatrelationen erstellen
      .then(() => {
        if (productID !== "") {
          const zutatenPosition: ZutatenPositionCreationAttributes = {
            produktId: productID,
            zutatIdWithAmount: importedProduct.zutaten
          };
          addProduktZutatRelation(zutatenPosition);
        } else {
          console.error("ProduktID ist null");
        }
      })
      .then(() => {
        res.status(201).json(productID);
      });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

AdminController.post("/admin/createProduct", (req: Request, res: Response) => {
  makeProduct(req, res);
});
