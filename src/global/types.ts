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
