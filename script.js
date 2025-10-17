let isMouseDown = false;
let brushState = 0;
let selectedColor = "#000000";
let selectedGridSize = 16;

document.addEventListener("mousedown", () => isMouseDown = true);
document.addEventListener("mouseup", () => isMouseDown = false);

const grid = document.querySelector(".square-grid");
grid.addEventListener("mousedown", (event) => { isMouseDown = true; paint(event); } );
grid.addEventListener("mouseover", paint);

document.querySelector(".options").addEventListener("click", editOptions);
document.querySelector(".options").addEventListener("input", editOptions);

generateGrid();

function editOptions (event) {
    const element = event.target;
    
    if (element.tagName === "BUTTON") {
        if (element.textContent === "Clear") { generateGrid(); }
        else brushState = ["Color", "Eraser", "Randomize"].indexOf(element.textContent);
    }
    
    else if (element.tagName === "INPUT") {
        if (element.type === "color") { selectedColor = element.value; }
        else if (element.type === "range") {
            selectedGridSize = element.value;
            document.querySelector("#size-display").textContent = `${selectedGridSize}x${selectedGridSize}`;
            if (event.type === "click") generateGrid();
        }
    }
}

function generateGrid () {
    grid.innerHTML = '';
    
    for (let i = 0; i < selectedGridSize ** 2; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.style.height = (100 / selectedGridSize) + "%";
        grid.appendChild(pixel);
    }
}

function paint (event) {
    event.preventDefault();
    if (!event.target.classList.contains("pixel") || !isMouseDown) return;

    const pixel = event.target;
    
    let color = "";

    if (brushState === 0) color = selectedColor;
    if (brushState === 1) color = "white";
    if (brushState === 2) color = getRandomColor();

    pixel.style.backgroundColor = color;
}

function getRandomColor () {
    const red = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${blue}, ${green})`;
}