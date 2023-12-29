export type KundeCreationAttributes = {
  email: string;
  vorname: string;
  nachname: string;
  passwort: string;
  telefonnummer: string;
  zeitungsaboablaufdatum: Date;
};

export type AdresseCreationAttributes = {
  kundenId: string;
  postleitzahl: string;
  isthauptadresse: boolean;
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
};

export type ZutatCreationAttributes = {
  zutatsname: string;
  zutatseigenschaft: string;
  zutatspreis: number;
  zutatseinheit: string;
};

export type BestellungCreationAttributes = {
  adressenId: string;
  zahlungsId: string;
  bestellDatum: Date;
  gewünschtesLieferdatum: Date;
  produktIds: Array<string>;
};

export type ZutatenPositionCreationAttributes = {
  productId: string;
  zutatIdWithAmount: Array<ZutatenPostitionObject>;
};

type ZutatenPostitionObject = {
  zutatId: string;
  zutatenMenge: string;
};
