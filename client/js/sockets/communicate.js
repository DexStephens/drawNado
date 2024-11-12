export default class Communicate {
  socket = new io("http://localhost:3000");

  receive(event, callback) {
    this.socket.on(event, (e) => {
      callback(e);
    });
  }

  send(event, data) {
    console.log(event, data);
    this.socket.emit(event, data);
  }
}
