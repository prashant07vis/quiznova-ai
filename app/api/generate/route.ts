import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || ""

    let topic = ""
    let difficulty = "Medium"
    let questionCount = 10
    let pdfText = ""

    // ── FormData (PDF upload wala case) ──────────────────────────────────────
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()
      topic         = (formData.get("topic")         as string) || ""
      difficulty    = (formData.get("difficulty")    as string) || "Medium"
      questionCount = parseInt((formData.get("questionCount") as string) || "10")
      const file    = formData.get("file") as File | null

      if (file) {
        // PDF/TXT/DOCX ka text extract karo
        const arrayBuffer = await file.arrayBuffer()
        const buffer      = Buffer.from(arrayBuffer)

        if (file.type === "text/plain") {
          pdfText = buffer.toString("utf-8")
        } else if (
          file.type === "application/pdf" ||
          file.name.endsWith(".pdf")
        ) {
          // PDF se text extract — pdf-parse use karo
          try {
            const pdfParseModule = await import("pdf-parse")
            const pdfParse = (pdfParseModule as any).default ?? pdfParseModule
            const parsed   = await pdfParse(buffer)
            pdfText        = parsed.text
          } catch (e) {
            console.error("PDF parse error:", e)
            pdfText = ""
          }
        } else if (file.name.endsWith(".docx")) {
          // DOCX se text extract — mammoth use karo
          try {
            const mammoth = await import("mammoth")
            const result  = await mammoth.extractRawText({ buffer })
            pdfText       = result.value
          } catch (e) {
            console.error("DOCX parse error:", e)
            pdfText = ""
          }
        }

        // Text ko limit karo — too long context avoid karne ke liye
        if (pdfText.length > 8000) {
          pdfText = pdfText.substring(0, 8000) + "..."
        }
      }
    } else {
      // ── JSON (normal topic wala case) ───────────────────────────────────────
      const body    = await req.json()
      topic         = body.topic         || ""
      difficulty    = body.difficulty    || "Medium"
      questionCount = body.questionCount || 10
    }

    // ── Prompt build karo ────────────────────────────────────────────────────
    let prompt = ""

    if (pdfText && pdfText.trim().length > 50) {
      // PDF content se questions generate karo
      prompt = `Based on the following document content, generate exactly ${questionCount} MCQ questions.
Difficulty level: ${difficulty}
${topic ? `Focus area: ${topic}` : ""}

Document Content:
"""
${pdfText}
"""

IMPORTANT RULES:
- Generate questions ONLY based on the document content above
- Return ONLY a valid JSON array
- No extra text, no markdown, no code blocks
- Start directly with [ and end with ]

Format:
[
  {
    "question": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Brief explanation based on the document"
  }
]`
    } else {
      // Normal topic se questions generate karo
      prompt = `Generate exactly ${questionCount} MCQ questions about "${topic}".
Difficulty: ${difficulty}

IMPORTANT RULES:
- Return ONLY a valid JSON array
- No extra text, no markdown, no code blocks
- Start directly with [ and end with ]

Format:
[
  {
    "question": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Brief explanation here"
  }
]`
    }

    // ── Groq API call ─────────────────────────────────────────────────────────
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a JSON generator. You only output valid JSON arrays. Never include any text before or after the JSON. Never use markdown code blocks. Always start with [ and end with ].",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    })

    let text = completion.choices[0]?.message?.content || "[]"

    // Extra text hata do — sirf JSON array extract karo
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      text = jsonMatch[0]
    }

    // Validate karo
    JSON.parse(text)

    return Response.json({ success: true, data: text })
  } catch (error) {
    console.error("Generate API error:", error)
    return Response.json({ success: false, error: "Failed to generate MCQs" })
  }
}