// server/services/claudeService.js
const Anthropic = require('@anthropic-ai/sdk');

exports.getFeedback = async (resumeText, jobDescription) => {
  const apiKey = process.env.CLAUDE_API_KEY;

  // Initialize the Anthropic client with the API key
  const client = new Anthropic({
    apiKey: apiKey,
  });

  // Prepare the system prompt and user messages
  const systemPrompt = "You are an advanced Applicant Tracking System (ATS) designed to analyze resumes against job descriptions and provide comprehensive scoring and feedback.";

  const userMessage = `Here is a resume:

${resumeText}

Here is a job description:

${jobDescription}

Please provide detailed feedback on how well the resume matches the job description and suggest improvements, following the instructions provided in the system prompt.`;

  try {
    // Call the Claude API using messages.create
    const response = await client.messages.create({
      model: 'claude-3-sonnet-20240229', // Use the appropriate model you have access to
      max_tokens: 1024,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: userMessage,
            },
          ],
        },
      ],
    });

    // Extract the feedback from the response
    const feedback = response.completion.trim();
    return feedback;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error('Failed to get feedback from Claude API.');
  }
};
