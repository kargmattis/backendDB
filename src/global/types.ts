import Produkt from "../database/produkt/produkt";

export type KundeCreationAttributes = {
  email: string;
  vorname: string;
  nachname: string;
  passwort: string;
  telefonnummer: string;
  zeitungsaboablaufdatum?: Date;
};

export type AdresseCreationAttributes = {
  kundenId: string;
  postleitzahl: string;
  strasse: string;
  hausnummer: string;
  ort: string;
  hausnummerzusatz: string;
};

export type PaypalCreationAttributes = {
  kundenId: string;
  email: string;
};

export type LastschriftCreationAttributes = {
  kundenId: string;
  bankname: string;
  bic: string;
  iban: string;
};

export type ProduktCreationAttributes = {
  titel: string;
  preis: number;
  bild?: string;
  kundenId?: string;
  sparte: string;
};

export type ZutatCreationAttributes = {
  zutatsname: string;
  zutatseigenschaft: string;
  zutatspreis: number;
  zutatseinheit: string;
  zutatBild: string;
  zutatensparte: string;
};

export type addOrOpenWarenkorbBestellungCreationAttributes = {
  kundenId: string;
  produktId: string;
  produktMenge: number;
};

export type ZutatenPositionCreationAttributes = {
  produktId: string;
  zutatIdWithAmount: ZutatenPostitionObject[];
};

type ZutatenPostitionObject = {
  zutatenId: string;
  zutatenMenge: string;
};

export type SingleBestellungType = {
  addressenInformation: AdresseCreationAttributes;
  zahlungsinformation: PaypalCreationAttributes | LastschriftCreationAttributes;
  produktInformationen: Array<ProduktCreationAttributes>;
  gesamtpreis: number;
  bestellDatum: Date;
};

export type PlaceOrderCreationAttributes = {
  kundenId: string;
  adressenId: string;
  zahlungsId: string;
  bestellDatum: Date;
  gewünschtesLieferdatum: Date;
};

export type PlaceOrderApiAttributes = {
  kundenId: string;
  zahlungsId: string;
  bestellDatum: Date;
  gewünschtesLieferdatum: Date;
};
export type ProduktWithBestellmenge = Produkt & {
  anzahl: number;
};
