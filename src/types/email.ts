export const emailTypeOptions = [
  "Professional",
  "Follow-up",
  "Job Application",
  "Networking",
  "Sales",
  "Cold Outreach",
  "Meeting Request",
  "Meeting Follow-up",
  "Thank You",
  "Apology",
  "Complaint",
  "Customer Support",
  "Request",
  "Reminder",
  "Resignation",
  "Custom",
] as const;

export const toneOptions = [
  "Professional",
  "Friendly",
  "Formal",
  "Casual",
  "Persuasive",
  "Confident",
  "Polite",
  "Apologetic",
] as const;

export const lengthOptions = ["Short", "Medium", "Detailed"] as const;
export const languageOptions = ["English", "Urdu", "Roman Urdu"] as const;

export type EmailTypeOption = (typeof emailTypeOptions)[number];
export type ToneOption = (typeof toneOptions)[number];
export type LengthOption = (typeof lengthOptions)[number];
export type LanguageOption = (typeof languageOptions)[number];

export type EmailLength = "short" | "medium" | "detailed";
export type EmailLanguage = "english" | "urdu" | "roman-urdu";

export type EmailFormData = {
  emailType: string;
  recipient: string;
  context: string;
  tone: ToneOption;
  length: EmailLength;
  language: EmailLanguage;
};

export type GeneratedEmail = {
  subject: string;
  greeting: string;
  body: string;
  closing: string;
};

export type EmailActionMode =
  | "generate"
  | "improve"
  | "shorten"
  | "professional"
  | "friendly";

export type EmailRequest = EmailFormData & {
  action?: EmailActionMode;
  currentEmail?: GeneratedEmail;
};
