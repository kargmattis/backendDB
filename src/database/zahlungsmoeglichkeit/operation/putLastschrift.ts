import Lastschrift from "../lastschrift";

export default async function putLastschrift(
  zahlungsId: string,
  updatedData: {
    kundenId?: string;
    bankname?: string;
    bic?: string;
    iban?: string;
  }
): Promise<Lastschrift | null> {
  try {
    // Find the existing Lastschrift record by zahlungsId
    const existingLastschriftRecord = await Lastschrift.findByPk(zahlungsId);

    if (!existingLastschriftRecord) {
      return null; // Record not found
    }

    // Update the record with the provided data
    await existingLastschriftRecord.update(updatedData);

    return existingLastschriftRecord;
  } catch (error) {
    console.error("Error updating Lastschrift record:", error);
    return null;
  }
}
