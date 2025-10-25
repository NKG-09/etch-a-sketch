let isMouseDown = false;
let brushState = 0;
let selectedColor = "#000000";
let selectedGridSize = 16;

document.addEventListener("mousedown", () => isMouseDown = true);
document.addEventListener("mouseup", () => isMouseDown = false);

const grid = document.querySelector(".square-grid");
grid.addEventListener("mousedown", (event) => { isMouseDown = true; paint(event); } );
grid.addEventListener("mouseover", paint);

grid.addEventListener("touchstart", (event) => { isMouseDown = true; paintTouch(event); }, { passive: false });
grid.addEventListener("touchmove", paintTouch, { passive: false });
grid.addEventListener("touchend", () => isMouseDown = false);
grid.addEventListener("touchcancel", () => isMouseDown = false);

document.querySelector(".options").addEventListener("click", editOptions);
document.querySelector(".options").addEventListener("touchend", editOptions);
document.querySelector(".options").addEventListener("input", editOptions);

generateGrid();

function editOptions (event) {
    const element = event.target;
    
    if (element.tagName === "BUTTON") {
        if (element.textContent === "Clear") { generateGrid(); }
        else {
            [...document.querySelectorAll("button")].forEach(element => element.classList.remove("selected"));
            element.classList.add("selected");
            brushState = ["Color", "Eraser", "Randomize", "Shade", "Lighten"].indexOf(element.textContent);
        }
    }
    
    else if (element.tagName === "INPUT") {
        if (element.type === "color") { selectedColor = element.value; }
        else if (element.type === "range") {
            selectedGridSize = element.value;
            document.querySelector("h2").textContent = `${selectedGridSize}x${selectedGridSize}`;
            if (event.type === "click" || event.type === "touchend") generateGrid();
        }
    }
}

function generateGrid () {
    grid.innerHTML = '';
    
    for (let i = 0; i < selectedGridSize ** 2; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.style.flexBasis = (100 / selectedGridSize) + "%";
        pixel.style.backgroundColor = "#ffffff";
        grid.appendChild(pixel);
    }
}

function paint (event) {
    event.preventDefault();
    if (!event.target.classList.contains("pixel") || !isMouseDown) return;

    const pixel = event.target;
    
    let color = "";

    if (brushState === 0) color = selectedColor;
    else if (brushState === 1) color = "#ffffff";
    else if (brushState === 2) color = getRandomColor();
    else if (brushState === 3) shadeColor(pixel);
    else if (brushState === 4) shadeColor(pixel, true);

    if (brushState !== 3 && brushState !== 4) { pixel.style.opacity = "1"; }

    pixel.style.backgroundColor = color || selectedColor;
}

function getRandomColor () {
    let color = [0, 0, 0].map( () => Math.floor(Math.random() * 256) );
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

function shadeColor (pixel, lighten = false) {
    let toShade = parseColor(pixel.style.backgroundColor) === parseColor(selectedColor);

    pixel.style.opacity = 
    (toShade)
    ? "0" 
    : Number(pixel.style.opacity) + (lighten ? -0.1 : 0.1) + "";
}

function parseColor (color) {
    if (!color) { return [0, 0, 0] }

    else return (color[0] === '#')
    ? [
        parseInt(color.slice(1, 3), 16),
        parseInt(color.slice(3, 5), 16),
        parseInt(color.slice(5), 16)
    ]
    : color.slice(4, -1).split(", ").map( (i) => Number(i) );
}

function paintTouch(event) {
    event.preventDefault();
    if (!isMouseDown) return;

    const pixel = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);

    if (pixel && pixel.classList.contains("pixel")) {
        paint({ target: pixel, preventDefault: () => {} });
    }
}