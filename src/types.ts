export interface SMSNumber {
  id: string;
  number: string;
  country: string;
  countryCode: string;
  updatedAt: string;
}

export interface SMSMessage {
  id: string;
  from: string;
  text: string;
  added: string;
}

export interface MailAccount {
  id: string;
  address: string;
  token: string;
}

export interface MailMessage {
  id: string;
  from: {
    address: string;
    name: string;
  };
  subject: string;
  intro: string;
  createdAt: string;
  seen: boolean;
}
