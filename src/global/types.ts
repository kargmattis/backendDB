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
  straße: string;
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
