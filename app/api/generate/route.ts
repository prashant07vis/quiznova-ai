import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { topic, difficulty, questionCount } = body

    const prompt = `
Generate ${questionCount} MCQ questions about "${topic}".

Difficulty: ${difficulty}

Return ONLY valid JSON array.

Format:
[
  {
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0,
    "explanation": "Explanation"
  }
]
`

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    })

    const text =
      completion.choices[0]?.message?.content || "[]"

    return Response.json({
      success: true,
      data: text,
    })
  } catch (error) {
    console.log(error)

    return Response.json({
      success: false,
      error: "Failed to generate MCQs",
    })
  }
}