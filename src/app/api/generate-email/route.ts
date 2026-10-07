import { NextResponse } from "next/server";

import { generateEmailFromAI } from "@/lib/openai";
import { emailRequestSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = emailRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please provide valid email details before generating." },
        { status: 400 },
      );
    }

    const result = await generateEmailFromAI(
      parsed.data,
      parsed.data.action ?? "generate",
      parsed.data.currentEmail,
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Something went wrong while generating your email. Please try again.";

    if (message.includes("rate limit") || message.includes("429")) {
      return NextResponse.json(
        { error: "The service is busy right now. Please try again in a moment." },
        { status: 429 },
      );
    }

    if (message.includes("API key") || message.includes("OpenAI")) {
      return NextResponse.json(
        { error: "Something went wrong while generating your email. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong while generating your email. Please try again." },
      { status: 500 },
    );
  }
}
