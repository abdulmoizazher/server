import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        this.listAvailableModels(); // Call this during initialization for testing
    }

    private async listAvailableModels() {
        try {
            // Try accessing listModels through the client or a related object
            // This is a speculative attempt based on the error message.
            // The actual path might be different.
            if (this.genAI && (this.genAI as any).listModels) {
                const modelsResponse = await (this.genAI as any).listModels();
                console.log('Available Models:', modelsResponse.models);
                return modelsResponse.models;
            } else if (this.model && (this.model as any).listModels) {
                const modelsResponse = await (this.model as any).listModels();
                console.log('Available Models (from model):', modelsResponse.models);
                return modelsResponse.models;
            } else {
                console.log('listModels method not found directly.');
            }
        } catch (error: any) {
            console.error('Error listing models:', error);
            return [];
        }
    }

    async generateReply(
        currentText: string,
        history: any[],
        sentiment: any,
        dominantEmotion: any
    ): Promise<string> {
        const historyFormatted = history
            .map(m => `${m.sender === 'user' ? 'User' : 'AI'}: ${m.text}`)
            .join('\n');

        

        const prompt = `
You are SentiCare, an emotionally aware chatbot helping with mental health.

User's current message: "${currentText}"
Top detected emotions:
${dominantEmotion}

Conversation so far:
${historyFormatted}

Respond with empathy and helpfulness.
`;

        try {
            const result = await this.model.generateContent(prompt);
            return result.response?.text();
        } catch (error: any) {
            console.error('Error generating content:', error);
            return 'An error occurred while generating the reply.';
        }
    }
}