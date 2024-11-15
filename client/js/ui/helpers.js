function clearPicture() {
  const square = document.getElementById("mainContain");

  Array.from(square.childNodes).forEach((node) => {
    node.remove();
  });
}

function loadGames() {
  document.querySelectorAll(".gameCard").forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });
}

function gameCardClickHandler() {
  const bounding = document
    .getElementById("gameOptions")
    .getBoundingClientRect();

  document.querySelectorAll(".gameCard").forEach((oc) => {
    oc.addEventListener("click", (e) => {
      document.querySelectorAll(".gameCard").forEach((card, index) => {
        card.style.opacity = 1;
        if (card.id !== oc.id) {
          card.classList.add("fade-out");
        } else {
          const cardBound = card.getBoundingClientRect();

          const endTransform =
            index % 2 === 0
              ? `translate(${
                  (bounding.width - cardBound.width) / 2 - cardBound.x
                }px, -${cardBound.y}px)`
              : `translate(-${
                  cardBound.x - (bounding.width - cardBound.width) / 2
                }px, -${cardBound.y}px)`;

          card.animate(
            [
              { transform: "translate(0, 0)" },
              {
                transform: endTransform,
              },
            ],
            {
              duration: 1000,
              iterations: 1,
              fill: "forwards",
              delay: 175 * (index + 1),
            }
          );
        }
      });
    });
  });
}

function attachHelpers() {
  document
    .getElementById("clearPicture")
    .addEventListener("click", clearPicture);
}

export { attachHelpers, loadGames, gameCardClickHandler };
