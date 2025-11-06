import { convertToModelMessages, type UIMessage } from 'ai';
import { DurableAgent } from '@workflow/ai/agent';
import { FLIGHT_ASSISTANT_PROMPT, flightBookingTools } from './steps/tools';

/**
 * The main chat workflow
 */
export async function chat(messages: UIMessage[]) {
  'use workflow';

  console.log('Starting workflow');

  const agent = new DurableAgent({
    model: 'bedrock/claude-4-sonnet-20250514-v1',
    system: FLIGHT_ASSISTANT_PROMPT,
    tools: flightBookingTools,
  });

  await agent.stream({
    messages: convertToModelMessages(messages),
  });

  console.log('Finished workflow');
}
