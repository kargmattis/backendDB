import { SingleBestellungType } from "./../../../global/types";
import Bestellungposition from "../../bestellungsPosition/bestellungsPosition";
import Bestellung from "../bestellung";
import CustomError from "../../../utilities/error";
import { ErrorHandle } from "../../../global/enums";
import Paypal from "../../zahlungsmoeglichkeit/paypal";
import Adresse from "../../adresse/adresse";
import Produkt from "../../produkt/produkt";
import { errorChecking } from "../../../utilities/errorChecking";
import e from "express";

export async function findAllBestellungen(
  kundenId: string
): Promise<SingleBestellungType[]> {
  try {
    const bestellungenArray = [];

    const bestellungen = await Bestellung.findAll({
      where: {
        kundenId: kundenId
      }
    });
    if (!bestellungen) {
      throw new CustomError(ErrorHandle.NotFound, "Bestellung not found");
    }
    for (const bestellung of bestellungen) {
      const singleBestellung = await findSingleBestellung(
        bestellung.bestellungsId
      );
      if (singleBestellung) {
        bestellungenArray.push(singleBestellung);
      }
    }

    if (!bestellungenArray || bestellungenArray.length === 0) {
      throw new CustomError(ErrorHandle.NotFound, "Bestellungen not found");
    }

    return bestellungenArray;
  } catch (error) {
    throw error;
  }
}

export async function findSingleBestellung(
  bestellId: string
): Promise<SingleBestellungType | null> {
  try {
    const produkte = [];
    let sumPrice = 0;
    const bestellung = await Bestellung.findByPk(bestellId);

    if (bestellung === null) {
      throw new CustomError(ErrorHandle.NotFound, "Bestellung not found");
    }

    const bestellungsPosition = await Bestellungposition.findAll({
      where: {
        bestellungsId: bestellung?.bestellungsId
      }
    });

    for (const singlePosition of bestellungsPosition) {
      const singleProduct = await Produkt.findByPk(singlePosition.produktId);
      sumPrice += singlePosition.bestellmenge * singleProduct?.dataValues.preis;
      if (!singleProduct) {
        throw new CustomError(ErrorHandle.NotFound, "Produkt not found");
      }
      const dataValues = singleProduct.dataValues;
      produkte.push({
        ...dataValues,
        bestellmenge: singlePosition.bestellmenge,
        summe: singlePosition.bestellmenge * dataValues.preis
      });
    }
    console.log("bestellung", bestellung.zahlungsId);

    const zahlungsInformation = await Paypal.findByPk(bestellung.zahlungsId);
    console.log("zahlungsInformation", zahlungsInformation);

    const adressInformation = await Adresse.findOne({
      where: { kundenId: bestellung.kundenId }
    });
    console.log("adressInformation", adressInformation);
    console.log("zahlungsInformation", zahlungsInformation);
    console.log("produkte", produkte);
    console.log("sumPrice", sumPrice);
    if (!zahlungsInformation) {
      // ist ein Warenkorb keine bestellung
      return null;
    }
    if (zahlungsInformation && adressInformation && produkte && sumPrice) {
      console.log("in if function");

      const bestellungsObject: SingleBestellungType = {
        zahlungsinformation: zahlungsInformation.dataValues,
        addressenInformation: adressInformation.dataValues,
        produktInformationen: produkte,
        gesamtpreis: sumPrice,
        bestellungsId: bestellungsPosition[0].bestellungsId, // [0] because every position has the same bestellungsId
        bestellDatum: bestellung.dataValues.bestellDatum,
        gewünschtesLieferdatum: bestellung.dataValues.gewünschtesLieferdatum
      };

      return bestellungsObject;
    }

    throw new CustomError(
      ErrorHandle.DatabaseError,
      "Something undefined not found"
    );
  } catch (error) {
    console.error("Error finding bestellung:", error);
    throw errorChecking(error);
  }
}

export async function findWarenkorb(kundenId: string): Promise<Bestellung> {
  try {
    const adressen = await Adresse.findAll({ where: { kundenId } });
    if (!adressen) {
      throw new CustomError(ErrorHandle.NotFound, "Adresse not found");
    }
    for (const adresse of adressen) {
      const bestellung = await Bestellung.findOne({
        where: { kundenId: kundenId, zahlungsId: null }
      });
      if (bestellung) {
        return bestellung;
      }
    }
    throw new CustomError(ErrorHandle.NotFound, "Warenkorb not found");
  } catch (error) {
    throw error;
  }
}
