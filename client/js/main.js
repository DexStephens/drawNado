import { loadGames, gameCardClickHandler } from "./ui/helpers.js";

window.onload = () => {
  loadGames();
  gameCardClickHandler();
};

// LEARNINGS
// Understand the context of the function, this has to do with the challenge of the this.drawColor in the new box, the function() instantiation had the context of newBox, while the arrow function has the context of the class
// How in the world does the bind function work for context of the current class
