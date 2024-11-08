window.onload = () => {
  fillColorPallette();
  addMouseListener();
};

const socket = io("http://localhost:3000");

const rainbowColors = [
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

let drawColor = rainbowColors[0];

function fillColorPallette() {
  const pallette = document.getElementById("colorPicker");

  rainbowColors.forEach((color) => {
    const newBox = document.createElement("div");
    newBox.classList.add("colorBox");
    newBox.style.backgroundColor = color;
    newBox.onclick = function (e) {
      drawColor = color;
    };
    pallette.appendChild(newBox);
  });
}

function addMouseListener() {
  let isDrawing = false;
  const square = document.getElementById("mainContain");

  square.onmousedown = (e) => {
    isDrawing = true;
  };

  square.onmouseup = (e) => {
    isDrawing = false;
  };

  square.onmouseleave = (e) => {
    isDrawing = false;
  };

  square.onmousemove = (e) => {
    if (isDrawing) {
      const rect = square.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addDot(square, x, y);
    }
  };
}

function addDot(square, x, y) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.style.backgroundColor = drawColor;
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  square.appendChild(dot);
}

function clearPicture() {
  const square = document.getElementById("mainContain");

  Array.from(square.childNodes).forEach((node) => {
    node.remove();
  });
}
