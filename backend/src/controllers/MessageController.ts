interface IMessage {
  message: any;
  text: string;
}

class MessageController {
  public async sendMessage({ message, text }: IMessage) {
    message.reply(text);
  }
}

export default MessageController;
