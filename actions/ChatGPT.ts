import { Configuration, OpenAIApi } from "openai";
import Env from "../common/Env";

class ChatGPT {
    private configuration: any = null;
    private openai: any = null;
    private messageHistories: any[] = [];

    constructor() {
        this.configuration = new Configuration({
            apiKey: Env.OPENAI_API_KEY,
            basePath: 'https://api.openai.com/v1/chat',
        });

        this.openai = new OpenAIApi(this.configuration);
        this.messageHistories = [];
    }

    reply(message: string, onFinish: Function) {
        this.messageHistories.push({ role: "user", content: message });
        this.openai.createCompletion({
            model: "gpt-3.5-turbo",
            messages: this.messageHistories,
        })
        .then((completion: any) => {
            const completion_text = completion.data.choices[0].message.content;
            this.messageHistories.push({ role: "assistant", content: completion_text });
            onFinish(completion_text);
        })
        .catch((_error: any) => {
            const messageError = `[${new Date().toUTCString()}] Đã ghi nhận "${message}" | Nhưng đã gặp sự cố, không trả lời được, hãy thự lại sau!`;
            onFinish(messageError);
        });

        // Save memory!
        const lenghSaveMem = Env.OPENAI_LENGH_HISTORY_TO_SAVE_MEMORY || '200';
        while (this.messageHistories.length > Number.parseInt(lenghSaveMem)) {
            this.messageHistories.shift();
        }
    }
}

export default ChatGPT;
