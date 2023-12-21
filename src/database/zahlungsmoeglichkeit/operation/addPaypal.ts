import Paypal from "../paypal";
import { PaypalCreationAttributes } from "../../../global/types";

export async function createPaypalRecord(
  paypaldata: PaypalCreationAttributes
): Promise<Paypal> {
  try {
    const newPaypalRecord = await Paypal.create(paypaldata);
    return newPaypalRecord;
  } catch (error) {
    console.error("Error creating new Paypal record: ", error);
  }
}
