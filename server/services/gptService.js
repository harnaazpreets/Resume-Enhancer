// server/services/gptService.js
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.GPT_API_KEY,
});

exports.enhanceResume = async (resumeText, jobDescription) => {
  // Prepare the messages for the chat completion
  const messages = [
    {
      role: 'system',
      content: 'You are an advanced Resume Enhancement Advisor designed to provide detailed, personalized recommendations to improve resumes.',
    },
    {
      role: 'user',
      content: `Enhance the following resume to better match the job description provided. Ensure the resume aligns with the requirements and highlights relevant skills and experiences.

Resume:
${resumeText}

Job Description:
${jobDescription}

Please provide the enhanced resume in plain text format.`,
    },
  ];

  try {
    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use the appropriate model you have access to
      messages: messages,
      max_tokens: 1500,
      temperature: 0.7,
      n: 1,
    });

    // Extract the enhanced resume from the response
    const enhancedResume = response.choices[0].message.content.trim();
    return enhancedResume;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to enhance resume using OpenAI API.');
  }
};
