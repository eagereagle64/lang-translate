import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1", //We use OpenRouter for now
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const { text, targetLanguage } = await req.json()

  try {
    const response = await openai.chat.completions.create({
      model: "amazon/nova-pro-v1",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that translates text, provides explanations, and gives cultural context. Translate the following text to ${targetLanguage}, then provide a brief explanation and cultural context.`
        },
        {
          role: "user",
          content: text
        }
      ],
    })

    const result = response.data.choices[0].message?.content
    if (!result) {
      throw new Error('No response')
    }

    const [translation, explanation, culturalContext] = result.split('\n\n')

    return NextResponse.json({ translation, explanation, culturalContext })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}

