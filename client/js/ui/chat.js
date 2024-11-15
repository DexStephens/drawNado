export default class Chat {
  constructor(document, communicate) {
    this.document = document;
    this.communicate = communicate;
    this.chatForm = this.document.getElementById("chatForm");

    this.communicate.receive("message", this.receiveMessage.bind(this));
    this.addChatFormListener();
  }

  addMessage(author, guess) {
    const chatBox = this.document.getElementById("chat");
    chatBox.appendChild(this.createChatMessage(author, guess));
    this.bottomOfChat();
  }

  createChatMessage(author, guess) {
    const newMessageRow = this.document.createElement("div");
    newMessageRow.classList.add("chatMessage");

    const writer = this.document.createElement("p");
    writer.classList.add("messageAuthor");
    writer.textContent = author + ":";

    const content = this.document.createElement("p");
    content.textContent = guess;

    newMessageRow.appendChild(writer);
    newMessageRow.appendChild(content);

    return newMessageRow;
  }

  addChatFormListener() {
    this.chatForm.onsubmit = (e) => {
      e.preventDefault();
      const chatInput = this.document.getElementById("chatInput");
      const message = chatInput.value;
      chatInput.value = "";
      chatInput.focus();

      this.addMessage("test", message);
      this.communicate.send("message", { author: "test", guess: message });
    };
  }

  receiveMessage({ author, guess }) {
    this.addMessage(author, guess);
  }

  bottomOfChat() {
    const chatMessages = this.document.getElementById("chat");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}
