export default class Communicate {
  socket = new io("http://localhost:3000");

  receive(callback) {
    this.socket.on("draw", (e) => {
      callback(e);
    });
  }

  send(left, top, color) {
    const event = { left, top, color };
    this.socket.emit("draw", event);
  }
}
