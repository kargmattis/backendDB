import Lastschrift from "../lastschrift";
import type { LastschriftCreationAttributes } from "../../../global/types.ts";

export async function createLastschriftRecord(
  Lastschriftdata: LastschriftCreationAttributes
): Promise<Lastschrift> {
  try {
    const newLastschriftRecord = await Lastschrift.create(Lastschriftdata);
    return newLastschriftRecord;
  } catch (error) {
    console.error("Error creating new Lastschrift record: ", error);
    throw error;
  }
}
