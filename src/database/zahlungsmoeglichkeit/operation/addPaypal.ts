import Paypal from "../paypal";

export async function createPaypalRecord(data: {
  kundenId: string;
  email: string;
}) {
  try {
    const newPaypalRecord = await Paypal.create(data);
    return newPaypalRecord;
  } catch (error) {
    console.error("Error creating new Paypal record: ", error);
  }
}
