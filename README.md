# MailCraft AI

An AI-powered email generator built with Next.js. Enter the recipient and a few details to create, edit, and refine an email draft.

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Add your Groq API key to `.env.local` before generating emails:

```env
GROQ_API_KEY=your_groq_api_key
```

The key is read by the server-side API route and should not be exposed in client-side code.