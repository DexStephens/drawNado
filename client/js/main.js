import Communicate from "./sockets/communicate.js";
import Draw from "./ui/draw.js";

import { attachHelpers } from "./ui/helpers.js";

const communicate = new Communicate();
const draw = new Draw(document, communicate);

window.onload = () => {
  attachHelpers();
  draw.fillColorPallette();
  draw.addMouseListener();
};

// LEARNINGS
// Understand the context of the function, this has to do with the challenge of the this.drawColor in the new box, the function() instantiation had the context of newBox, while the arrow function has the context of the class
// How in the world does the bind function work for context of the current class
