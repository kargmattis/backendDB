import Paypal from "../paypal";

export default async function putPaypal(
  zahlungsId: string,
  updatedData: { kundenId?: string; email?: string }
): Promise<Paypal | null> {
  try {
    // Find the existing PayPal record by zahlungsId
    const existingPaypalRecord = await Paypal.findByPk(zahlungsId);

    if (!existingPaypalRecord) {
      console.error("Paypal record not found");
      return null;
    }

    // Update the record with the provided data
    await existingPaypalRecord.update(updatedData);

    return existingPaypalRecord;
  } catch (error) {
    console.error("Error updating Paypal record:", error);
    return null;
  }
}
