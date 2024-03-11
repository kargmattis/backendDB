import { warenkorbGetHelper } from "../../../controller/warenkorbHelper/warenkorbHelper";
import { ProduktWithBestellmenge } from "../../../global/types";
import Kunde from "../../kunde/kunde";

async function newAboEndDate(kundenId: string) {
  const produkte = await warenkorbGetHelper(kundenId);
  const endDate = await getCurrentEndDate(kundenId);
  const aboDuration = checkForNewspaper(produkte);
  let newEnd;
  if (aboDuration !== 0) {
    if (endDate !== null && DateInFuture(endDate)) {
      newEnd = AddToEndDate(aboDuration, endDate);
    } else {
      newEnd = AddToToday(aboDuration);
    }
    try {
      await Kunde.update(
        { zeitungsaboablaufdatum: newEnd },
        { where: { kundenId: kundenId } }
      );
      console.log("Kunde erfolgreich aktualisiert.");
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Aboenddatums:", error);
    }
  }
}

async function getCurrentEndDate(kundenId: string) {
  try {
    const kunde = await Kunde.findOne({
      attributes: ["zeitungsaboablaufdatum"],
      where: {
        kundenId: kundenId
      }
    });
    return kunde ? kunde.zeitungsaboablaufdatum : null;
  } catch (error) {
    console.error("Fehler beim Abrufen des Zeitungsablaufdatums:", error);
    throw error;
  }
}

function checkForNewspaper(produkte: Array<ProduktWithBestellmenge>) {
  let Anzahl: number = 0;
  produkte.forEach((produkt) => {
    console.log(produkt);
    if (produkt.sparte === "Newspaper") {
      Anzahl = produkt.anzahl;
    }
  });
  return Anzahl;
}

function AddToEndDate(days: number, endDate: Date) {
  endDate.setDate(endDate.getDate() + days);
  return endDate;
}
function AddToToday(days: number) {
  const today = new Date();
  today.setHours(today.getHours() + 1);
  today.setDate(today.getDate() + days);
  return today;
}

function DateInFuture(EndDate: Date): boolean {
  const today = new Date();
  today.setHours(today.getHours() + 1);
  today.setHours(0, 0, 0, 0);
  return EndDate.getTime() > today.getTime();
}

export default newAboEndDate;
