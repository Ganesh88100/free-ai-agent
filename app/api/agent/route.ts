import { runAgent } from '@/server/agentController';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const result = runAgent(prompt);
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ status: 'planning' })}\n\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ status: 'complete', result })}\n\n`));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    }
  });
}
