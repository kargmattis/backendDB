import { AdresseCreationAttributes } from "../../../global/types";
import Adresse from "../addresse";

export async function createAdress(data: { data: AdresseCreationAttributes }) {
  try {
    const newAdress = await Adresse.create(data);
    return newAdress;
  } catch (error) {
    console.error("Error creating new Paypal record: ", error);
  }
}
