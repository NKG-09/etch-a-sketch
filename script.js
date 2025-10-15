const grid = document.querySelector(".square-grid");
let mouseDown = false;

for (let i = 0; i < 256; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    grid.appendChild(pixel);
}

grid.addEventListener("mousedown", () => mouseDown = true);
grid.addEventListener("mouseup", () => mouseDown = false);
grid.addEventListener("mouseover", paint);

function paint (event) {
    if (!event.target.classList.contains("pixel") || !mouseDown) return;
    
    const pixel = event.target;

    pixel.style.backgroundColor = "black";
}