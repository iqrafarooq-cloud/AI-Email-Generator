import type { EmailFormData, GeneratedEmail } from "@/types/email";

export function buildEmailPrompt(input: EmailFormData, action: string, currentEmail?: GeneratedEmail) {
  const lengthGuidance = {
    short: "Keep it brief and concise, usually 2-4 short paragraphs or a tight message.",
    medium: "Keep it polished and balanced, with natural flow and clear structure.",
    detailed: "Provide a fuller, more complete email while staying concise and natural.",
  };

  const actionInstructions: Record<string, string> = {
    generate:
      "Write a fresh email that matches the user intent and the selected tone. Preserve meaning and avoid inventing facts.",
    improve:
      "Improve the current email for clarity, grammar, flow, professionalism, and naturalness while preserving the original meaning and facts.",
    shorten:
      "Shorten the existing email while preserving the original meaning and intent.",
    professional:
      "Rewrite the email in a more professional and polished tone while keeping the original meaning intact.",
    friendly:
      "Rewrite the email in a warmer, friendlier, and more approachable tone while keeping the original meaning intact.",
  };

  const relevantContext = currentEmail
    ? `
Current email to transform:
- Subject: ${currentEmail.subject}
- Greeting: ${currentEmail.greeting}
- Body: ${currentEmail.body}
- Closing: ${currentEmail.closing}
`
    : "";

  const systemPrompt = `You are an expert professional email writer.
Write natural human-sounding emails.
Do not sound robotic.
Do not unnecessarily exaggerate.
Do not invent facts.
Preserve the user's intended meaning.
Correct grammar automatically.
Adapt the writing style to the selected tone.
Respect the requested length.
Keep the email concise unless detailed length is selected.
Use professional formatting.
Do not include explanations outside the email.
Do not add fake names, dates, companies, promises, or facts.
If information is missing, write naturally without inventing it.
Avoid generic AI phrases.
Avoid excessive corporate jargon.
Avoid repetitive sentences.
Return valid JSON only in this exact format:
{
  "subject": "...",
  "greeting": "...",
  "body": "...",
  "closing": "..."
}
Do not wrap the JSON in markdown fences.`;

  const userPrompt = `
Email type: ${input.emailType}
Recipient: ${input.recipient || "Not specified"}
Tone: ${input.tone}
Length: ${input.length}
Language: ${input.language}
Context / message: ${input.context}

${relevantContext}

Instructions:
- ${actionInstructions[action] || actionInstructions.generate}
- ${lengthGuidance[input.length]}
- Write in ${input.language === "english" ? "English" : input.language === "urdu" ? "Urdu" : "Roman Urdu"}.
- Use a realistic greeting and closing appropriate to the context.
- Keep the email natural, readable, and polished.
- Below is the exact JSON schema you must follow:
{
  "subject": "...",
  "greeting": "...",
  "body": "...",
  "closing": "..."
}
`;

  return { systemPrompt, userPrompt };
}
