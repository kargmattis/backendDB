import Paypal from "../paypal";
import type { PaypalCreationAttributes } from "../../../global/types.ts";

export async function createPaypalRecord(
  data: PaypalCreationAttributes
): Promise<Paypal> {
  try {
    // Your logic to create a Paypal record
    const newPaypalRecord = await Paypal.create(data);

    // Return the created Paypal record
    return newPaypalRecord;
  } catch (error) {
    console.error("Error creating new Paypal record: ", error);
    throw error;
  }
}
