import { SingleBestellungType } from "./../../../global/types";
import Bestellungposition from "../../bestellungsPosition/bestellungsPosition";
import Bestellung from "../bestellung";
import CustomError from "../../../utilities/error";
import { ErrorHandle } from "../../../global/enums";
import Paypal from "../../zahlungsmoeglichkeit/paypal";
import Adresse from "../../adresse/adresse";
import Produkt from "../../produkt/produkt";
import { errorChecking } from "../../../utilities/errorChecking";

export async function findAllBestellungen(
  kundenId: string
): Promise<SingleBestellungType[]> {
  try {
    const bestellungenArray = [];

    const adressen = await Adresse.findAll({ where: { kundenId } });
    for (const adresse of adressen) {
      const bestellungen = await Bestellung.findAll({
        where: {
          adressenId: adresse.adressenId
        }
      });
      for (const bestellung of bestellungen) {
        const singleBestellung = await findSingleBestellung(
          bestellung.bestellungsId
        );
        bestellungenArray.push(singleBestellung);
      }
    }
    if (!bestellungenArray) {
      throw new CustomError(ErrorHandle.NotFound, "Bestellungen not found");
    }
    return bestellungenArray;
  } catch (error) {
    console.error("Error finding bestellung:", error);
    throw error;
  }
}

export async function findSingleBestellung(
  bestellId: string
): Promise<SingleBestellungType> {
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
      produkte.push(singleProduct.dataValues);
    }
    const zahlungsInformation = await Paypal.findByPk(bestellung.zahlungsId);
    const adressInformation = await Adresse.findByPk(bestellung.adressenId);
    if (zahlungsInformation && adressInformation && produkte && sumPrice) {
      const bestellungsObject: SingleBestellungType = {
        zahlungsinformation: zahlungsInformation.dataValues,
        addressenInformation: adressInformation.dataValues,
        produktInformationen: produkte,
        gesamtpreis: sumPrice,
        bestellDatum: bestellung.dataValues.bestellDatum
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
        where: { adressenId: adresse.adressenId, zahlungsId: null }
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
