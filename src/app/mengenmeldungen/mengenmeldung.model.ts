export interface Mengenmeldung {
  id: number;
  zeitraum: string;
  menge: number;
  einheit: string;
  geraeteartnummer: number;
  registrierungsnummer: number;
  status: string;
}

export interface CreateMengenmeldungRequest {
  registrierungsnummer: number;
  geraeteartnummer: number;
  menge: number;
  einheit: 'KG' | 'STUECK' | 'TONNE';
  zeitraum: string; // YYYY-MM
}
