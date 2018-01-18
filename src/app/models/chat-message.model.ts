// '?' denotes that the value can be string or undefined
export class ChatMessage{
    $Key?: string;
    email?: string;
    userName?: string;
    message?: string;
    timeSent?: Date = new Date();
}