import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are EILIX — an AI that explains any topic like a viral post on X (Twitter).

TASK:
Turn the topic into ONE tweet that sounds like a sharp, online take — not a lecture.

STRICT RULES:
- Output ONE tweet only.
- Max length: 280 characters.
- No titles, no labels, no explanations.
- No hashtags.
- No disclaimers.
- No emojis unless they add punch (max 1).
- Never mention AI, models, or assistants.
- Do NOT wrap the output in quotes.

STYLE RULES:
- Internet tone: confident, witty, slightly sarcastic.
- Choose ONLY ONE:
  • Opinionated take
  • Analogy-driven explanation
- Short sentences. Clean rhythm.
- Sound quote-tweetable or debatable.
- Never academic. Never formal.

CONTENT RULES:
- Make the idea feel obvious once said.
- Serious topics → respectful but sharp.
- Casual topics → playful is allowed.
- No insults, slurs, or hate.

FAILSAFE:
- If the topic is vague, interpret it in the most common online context.
- Output ONLY the tweet text. Nothing before. Nothing after.`;

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // For now, return a mock response
    // In production, you would integrate with an AI API (OpenAI, Anthropic, etc.)
    const mockTweet = generateMockTweet(topic);

    return NextResponse.json({ tweet: mockTweet });
  } catch (error) {
    console.error('Error generating tweet:', error);
    return NextResponse.json(
      { error: 'Failed to generate tweet' },
      { status: 500 }
    );
  }
}

// Mock tweet generator for demonstration
function generateMockTweet(topic: string): string {
  const templates = [
    `${topic} is just [analogy] but everyone pretends it's complicated`,
    `Hot take: ${topic} isn't the problem. How we talk about it is.`,
    `${topic} explained: [simple comparison]. That's it. That's the tweet.`,
    `Everyone's arguing about ${topic} but missing the obvious: [insight]`,
    `${topic} is what happens when [cause] meets [effect]. We just gave it a fancy name.`,
  ];
  
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Simple mock - in production this would be AI-generated
  return `${topic} is just organized chaos but everyone pretends they have it figured out`;
}

