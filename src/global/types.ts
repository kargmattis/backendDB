import type Produkt from "../database/produkt/produkt";

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
  zutatBild?: string;
  zutatensparte: string;
};

export type addOrOpenWarenkorbBestellungCreationAttributes = {
  kundenId: string;
  laufendeAdressenId: number;
  produktId: string;
  produktMenge: number;
};

export type ZutatenPositionCreationAttributes = {
  produktId: string;
  zutatIdWithAmount: ZutatenPostitionObject[];
};

type ZutatenPostitionObject = {
  zutatsId: string;
  zutatenMenge: string;
};

export type SingleBestellungType = {
  bestellungsId: string;
  isPaypal: boolean;
  addressenInformation: AdresseCreationAttributes;
  zahlungsinformation: ZahlungsmöglichkeitenCreationAttributes;
  produktInformationen: ProduktCreationAttributes[];
  gesamtpreis: number;
  bestellDatum: Date;
  gewünschtesLieferdatum: Date;
  createdAt: Date;
};

export type PlaceOrderApiAttributes = {
  kundenId: string;
  isPaypal: boolean;
  gewünschtesLieferdatum: Date;
};
export type ProduktWithBestellmenge = Produkt & {
  anzahl: number;
};

export type ZahlungsmöglichkeitenCreationAttributes = {
  kundenId: string;
} & Partial<PayPaylPaymentAttributes & LastschriftPaymentAttributes>;

export type ZahlungsmöglichkeitenDeactivate = {
  kundenId: string;
  laufendeZahlungsId: number;
};

export type PayPaylPaymentAttributes = {
  paypalEmail: string;
};

export type LastschriftPaymentAttributes = {
  bankname: string;
  bic: string;
  iban: string;
};
