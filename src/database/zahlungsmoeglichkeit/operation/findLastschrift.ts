import Lastschrift from "../lastschrift";

export default async function findLastschriftByZahlungsId(
  zahlungsId: string
): Promise<Lastschrift | null> {
  try {
    const lastschrift = await Lastschrift.findOne({
      where: {
        zahlungsId: zahlungsId
      }
    });
    return lastschrift;
  } catch (error) {
    // Handle errors, log them, or throw as needed
    console.error("Error finding Lastschrift:", error);
    throw error;
  }
}
