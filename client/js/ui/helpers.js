function clearPicture() {
  const square = document.getElementById("mainContain");

  Array.from(square.childNodes).forEach((node) => {
    node.remove();
  });
}

function attachHelpers() {
  document
    .getElementById("clearPicture")
    .addEventListener("click", clearPicture);
}

export { attachHelpers };
