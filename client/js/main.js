class Draw {
  rainbowColors = [
    "#FF0000",
    "#FF1100",
    "#FF2200",
    "#FF3300",
    "#FF4400",
    "#FF5500",
    "#FF6600",
    "#FF7700",
    "#FF8800",
    "#FF9900",
    "#FFAA00",
    "#FFBB00",
    "#FFCC00",
    "#FFDD00",
    "#FFEE00",
    "#FFFF00",
    "#DFFF00",
    "#BFFF00",
    "#9FFF00",
    "#80FF00",
    "#40FF00",
    "#00FF00",
    "#00FF40",
    "#00FF80",
    "#00FFBF",
    "#00FFFF",
    "#00DFFF",
    "#00BFFF",
    "#009FFF",
    "#0080FF",
    "#8B4513",
    "#808080",
    "#000000",
    "#FFFFFF",
  ];

  drawColor = this.rainbowColors[0];

  constructor(document, communicate) {
    this.document = document;
    this.communicate = communicate;
    this.isDrawing = false;
    this.square = this.document.getElementById("mainContain");

    this.communicate.receive(this.receivedDot.bind(this));
  }

  fillColorPallette() {
    const pallette = this.document.getElementById("colorPicker");

    this.rainbowColors.forEach((color) => {
      const newBox = this.document.createElement("div");
      newBox.classList.add("colorBox");
      newBox.style.backgroundColor = color;
      newBox.onclick = (e) => {
        this.drawColor = color;
      };
      pallette.appendChild(newBox);
    });
  }

  addMouseListener() {
    this.square.onmousedown = (e) => {
      this.isDrawing = true;
    };

    this.square.onmouseup = (e) => {
      this.isDrawing = false;
    };

    this.square.onmouseleave = (e) => {
      this.isDrawing = false;
    };

    this.square.onmousemove = (e) => {
      this.draw(e);
    };

    this.square.onclick = (e) => {
      this.draw(e, true);
    };
  }

  draw(e, start = this.isDrawing) {
    if (start) {
      const rect = this.square.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.addDot(x, y);
    }
  }

  addDot(x, y, color = this.drawColor, reception = false) {
    const dot = this.document.createElement("div");
    dot.classList.add("dot");
    dot.style.backgroundColor = color;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    this.square.appendChild(dot);

    if (!reception) {
      this.communicate.send(x, y, color);
    }
  }

  receivedDot({ left, top, color }) {
    this.addDot(left, top, color, true);
  }
}

class Communicate {
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

function clearPicture() {
  const square = document.getElementById("mainContain");

  Array.from(square.childNodes).forEach((node) => {
    node.remove();
  });
}

const communicate = new Communicate();
const draw = new Draw(document, communicate);

window.onload = () => {
  draw.fillColorPallette();
  draw.addMouseListener();
};

// LEARNINGS
// Understand the context of the function, this has to do with the challenge of the this.drawColor in the new box, the function() instantiation had the context of newBox, while the arrow function has the context of the class
// How in the world does the bind function work for context of the current class
