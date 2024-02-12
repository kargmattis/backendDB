import { ErrorHandle } from "../../../global/enums";
import { ZahlungsmöglichkeitenCreationAttributes } from "../../../global/types";
import CustomError from "../../../utilities/error";
import { errorChecking } from "../../../utilities/errorChecking";
import Lastschrift from "../lastschrift";
import PayPal from "../paypal";
import ZahlungsMoeglichkeiten from "../zahlungsMoeglichkeiten";

export async function createZahlungsmöglichkeit(
  zahlungsMöglichkeitenData: ZahlungsmöglichkeitenCreationAttributes
): Promise<PayPal | Lastschrift> {
  try {
    const { kundenId, bankname, bic, iban, paypalEmail } =
      zahlungsMöglichkeitenData;
    if (bankname && bic && iban) {
      const newZahlungsId = await ZahlungsMoeglichkeiten.create({ kundenId });
      const laufendeZahlungsId = newZahlungsId.laufendeZahlungsId;
      const lastschrift = await Lastschrift.create({
        laufendeZahlungsId,
        Bankname: bankname,
        BIC: bic,
        IBAN: iban
      });
      console.log("lastschrift !!!", lastschrift);

      return lastschrift;
    }
    if (paypalEmail) {
      const newZahlungsId = await ZahlungsMoeglichkeiten.create({ kundenId });
      const laufendeZahlungsId = newZahlungsId.laufendeZahlungsId;
      const payPal = await PayPal.create({ laufendeZahlungsId, paypalEmail });
      console.log("paypal: ", payPal);

      return payPal;
    }
    throw new CustomError(
      ErrorHandle.DatabaseError,
      "No valid payment method provided"
    );
  } catch (error) {
    console.error("Error creating new Adresse record: ", error);
    throw errorChecking(error);
  }
}
