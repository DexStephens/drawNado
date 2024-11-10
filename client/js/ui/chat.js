export default class Chat {
  constructor(document, communicate) {
    this.document = document;
    this.communicate = communicate;
  }

  addMessage(author, guess) {
    const chatBox = this.document.getElementById("chat");
    chatBox.appendChild(this.createChatMessage(author, guess));
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
}
