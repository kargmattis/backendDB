export type KundeCreationAttributes = {
  email: string;
  vorname: string;
  nachname: string;
  passwort: string;
  telefonnummer: string;
  zeitungsaboablaufdatum: Date;
};

export type AdresseCreationAttributes = {
  adressId: string;
  kundenId: string;
  postleitzahl: string;
  isthaupadresse: boolean;
  straße: string;
  hausnummer: string;
  ort: string;
  hausnummerzusatz: string;
};
