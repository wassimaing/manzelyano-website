import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { clubData } from '@/data/club-data';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: google('gemini-1.5-flash'),
        system: `You are a helpful assistant for the Manzel Yano club.
    You answer questions about the club, its members, events, and other details.
    
    Here is the information about the club to use for your answers:
    ${JSON.stringify(clubData, null, 2)}
    
    If you don't know the answer based on this information, politely say so.
    Keep your answers concise and friendly.`,
        messages,
    });

    return result.toTextStreamResponse();
}
