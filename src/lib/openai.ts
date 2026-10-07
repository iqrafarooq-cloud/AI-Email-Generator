import OpenAI from "openai";
import { z } from "zod";

import { buildEmailPrompt } from "@/lib/prompts";
import { emailFormSchema, emailResponseSchema } from "@/lib/validations";
import type { EmailFormData, GeneratedEmail } from "@/types/email";

function getOpenAIClient() {
  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing API key.");
  }

  return new OpenAI({
    apiKey,
    baseURL: "https://api.groq.com/openai/v1",
  });
}

export async function generateEmailFromAI(
  input: EmailFormData,
  action: "generate" | "improve" | "shorten" | "professional" | "friendly" = "generate",
  currentEmail?: GeneratedEmail,
): Promise<GeneratedEmail> {
  const parsedInput = emailFormSchema.parse(input);
  const client = getOpenAIClient();

  const { systemPrompt, userPrompt } = buildEmailPrompt(parsedInput, action, currentEmail);

  const completion = await client.chat.completions.create({
    model: "openai/gpt-oss-20b",
    temperature: 0.8,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("OpenAI returned an empty response.");
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error("Invalid AI response format.");
  }

  const result = emailResponseSchema.safeParse(parsed);

  if (!result.success) {
    throw new Error("The AI response did not match the expected email format.");
  }

  return result.data as GeneratedEmail;
}

export function mapLanguageToRequest(language: string) {
  const normalized = language.toLowerCase().replace(/\s+/g, "-");
  return z.enum(["english", "urdu", "roman-urdu"]).safeParse(normalized).success
    ? normalized
    : "english";
}
