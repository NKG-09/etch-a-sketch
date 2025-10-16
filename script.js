const stylesheet = document.styleSheets[0];

const grid = document.querySelector(".square-grid");
const size = document.querySelector(".size");
const sizeDisplay = document.querySelector(".size-display");
const colorPicker = document.querySelector(".color-picker");

const colorButton = document.querySelector(".color");
const eraserButton = document.querySelector(".eraser");
const randomizeButton = document.querySelector(".randomize");
const clearButton = document.querySelector(".clear");

let isMouseDown = false;

let brushState = 0;

document.addEventListener("mousedown", () => isMouseDown = true);
document.addEventListener("mouseup", () => isMouseDown = false);

grid.addEventListener("mousedown", (event) => { isMouseDown = true; paint(event); } );
grid.addEventListener("mouseover", paint);

size.addEventListener("input", () => sizeDisplay.textContent = `${size.value}x${size.value}`);
size.addEventListener("change", () => generateGrid(size.value));

colorButton.addEventListener("click", () => brushState = 0);
eraserButton.addEventListener("click", () => brushState = 1);
randomizeButton.addEventListener("click", () => brushState = 2);
clearButton.addEventListener("click", () => generateGrid(size.value));

generateGrid(16);

function generateGrid(gridSize) {
    grid.innerHTML = '';
    for (let i = 0; i < gridSize ** 2; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.style.height = (100 / gridSize) + "%";
        grid.appendChild(pixel);
    }
}

function paint (event) {
    event.preventDefault();
    if (!event.target.classList.contains("pixel") || !isMouseDown) return;

    const pixel = event.target;
    
    let color = "";

    if (brushState === 0) color = colorPicker.value;
    if (brushState === 1) color = "white";
    if (brushState === 2) color = getRandomColor();

    pixel.style.backgroundColor = color;
}

function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${blue}, ${green})`;
}