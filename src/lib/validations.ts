import { z } from "zod";

export const emailFormSchema = z.object({
  emailType: z.string().min(1, "Please choose an email type."),
  recipient: z.string().optional().default(""),
  context: z
    .string()
    .trim()
    .min(10, "Please add a little more detail about what you want to say."),
  tone: z.enum([
    "Professional",
    "Friendly",
    "Formal",
    "Casual",
    "Persuasive",
    "Confident",
    "Polite",
    "Apologetic",
  ]),
  length: z.enum(["short", "medium", "detailed"]),
  language: z.enum(["english", "urdu", "roman-urdu"]),
});

export const emailResponseSchema = z.object({
  subject: z.string().trim().min(1, "Subject is required."),
  greeting: z.string().trim().min(1, "Greeting is required."),
  body: z.string().trim().min(1, "Body is required."),
  closing: z.string().trim().min(1, "Closing is required."),
});

export const emailRequestSchema = emailFormSchema.extend({
  action: z
    .enum(["generate", "improve", "shorten", "professional", "friendly"])
    .optional(),
  currentEmail: emailResponseSchema.optional(),
});
