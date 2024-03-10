import { ErrorHandle } from "../../../global/enums";
import CustomError from "../../../utilities/error";
import { errorChecking } from "../../../utilities/errorChecking";
import Lastschrift from "../lastschrift";
import PayPal from "../paypal";
import ZahlungsMoeglichkeiten from "../zahlungsMoeglichkeiten";

export async function findCurrentZahlungsmöglichkeiten(kundenId: string) {
  try {
    const result = await ZahlungsMoeglichkeiten.findAndCountAll({
      where: {
        kundenId
      },
      order: [["laufendeZahlungsId", "DESC"]],
      limit: 1
    });
    if (result.count === 0) {
      throw new CustomError(ErrorHandle.NotFound, "Kunde not found");
    }
    return result.rows[0];
  } catch (error) {
    throw errorChecking(error);
  }
}

export async function findActiveZahlungsmöglichkeiten(kundenId: string) {
  try {
    const paypalArray: Array<PayPal> = [];
    const lastschriftArray: Array<Lastschrift> = [];
    const allZahlungsmöglichkeiten = await ZahlungsMoeglichkeiten.findAll({
      where: { kundenId, istAktiv: true }
    });
    for (const zahlungsmöglichkeit of allZahlungsmöglichkeiten) {
      console.log(
        zahlungsmöglichkeit.dataValues.kundenId,
        zahlungsmöglichkeit.dataValues.laufendeZahlungsId,
        "zahlungsmöglichkeit"
      );

      const paypal = await PayPal.findOne({
        where: {
          kundenId: zahlungsmöglichkeit.dataValues.kundenId,
          laufendeZahlungsId: zahlungsmöglichkeit.dataValues.laufendeZahlungsId
        }
      });
      console.log(paypal, "paypal");

      if (paypal) {
        paypalArray.push(paypal);
        continue;
      }
      console.log(paypalArray, "paypalArray");

      const lastschrift = await Lastschrift.findOne({
        where: {
          kundenId: zahlungsmöglichkeit.dataValues.kundenId,
          laufendeZahlungsId: zahlungsmöglichkeit.dataValues.laufendeZahlungsId
        }
      });
      if (lastschrift) {
        lastschriftArray.push(lastschrift);
        continue;
      }
    }
    console.log(paypalArray, "paypalArray");

    return {
      paypalArray,
      lastschriftArray
    };
  } catch (error) {
    throw errorChecking(error);
  }
}

export async function findAllZahlungsmöglichkeiten(kundenId: string) {
  try {
    const paypal = await PayPal.findAll({ where: { kundenId } });
    const lastschrift = await Lastschrift.findAll({
      where: { kundenId }
    });
    return {
      paypal,
      lastschrift
    };
  } catch (error) {
    throw errorChecking(error);
  }
}
export async function findZahlungsmöglichkeitByPKs(primaryKeys: {
  kundenId: string;
  laufendeZahlungsId: number;
}) {
  const payPal = await PayPal.findOne({
    where: {
      kundenId: primaryKeys.kundenId,
      laufendeZahlungsId: primaryKeys.laufendeZahlungsId
    }
  });

  if (payPal) {
    return payPal;
  }

  const lastschrift = await Lastschrift.findOne({
    where: {
      kundenId: primaryKeys.kundenId,
      laufendeZahlungsId: primaryKeys.laufendeZahlungsId
    }
  });

  if (lastschrift) {
    return lastschrift;
  }

  return null;
}
