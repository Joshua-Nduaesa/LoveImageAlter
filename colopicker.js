const brightbutton = document.querySelector(".check");
const imageinput = document.getElementById("imageinput")
const outputImage = document.getElementById("outputimage");
const colorpicker = document.getElementById("color");
const r = document.querySelector("#r");
const g = document.querySelector("#g");
const b = document.querySelector("#b");
const h = document.querySelector("#h");
const s = document.querySelector("#s");
const l = document.querySelector("#l");
const hex = document.querySelector("#hex");
const colorformat = document.querySelector("#colroformat")
const copied = document.querySelector(".copied")

let brightness = localStorage.getItem("brightness") === "true"; // Convert string to boolean
if (brightness){
    document.body.style.filter = document.body.style.filter === 'invert(1)' ? 'invert(0)' : 'invert(1)';
    document.body.style.backgroundColor = "white";
    
}
brightbutton.checked = brightness;

function changeBrightness() {
    brightness = !brightness;
    localStorage.setItem("brightness", brightness); // Store the updated boolean as a string
    brightbutton.checked = brightness;
    
    // Directly apply the filter and background color change
    if (brightness) {
        document.body.style.filter = 'invert(1)';
        document.body.style.backgroundColor = "white";
    } else {
        document.body.style.filter = 'invert(0)';
        document.body.style.backgroundColor = "black";
    }
    
}

imageinput.addEventListener("change", event => {
    const file = event.target.files[0];
    if (file) {
        outputImage.src = URL.createObjectURL(file);
        
    }
});

colorpicker.addEventListener("change",event => {
    r.value = hexToRgb(event.target.value).r;
    g.value = hexToRgb(event.target.value).g;
    b.value = hexToRgb(event.target.value).b;
    // console.log(rgbToHex(r.value, g.value, b.value))
    h.value = rgbToHsl(r.value, g.value, b.value).h;
    s.value = rgbToHsl(r.value, g.value, b.value).s;
    l.value = rgbToHsl(r.value, g.value, b.value).l;
    hex.value = event.target.value;
})

function Copy() {
    let text = "";
    if (colorformat.value == "hsl") {
        text = `hsl(${h.value}, ${s.value}, ${l.value})`;
    } else if (colorformat.value == "rgb") {
        text = `rgb(${r.value}, ${g.value}, ${b.value})`; // Corrected second 'r' to 'g'
    } else if (colorformat.value == "hex") {
        text = hex.value;
    }
    navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Error copying text to clipboard: ', err);
    });
    copied.classList.add('animate')
}
copied.addEventListener('animationend', () => {
    copied.classList.remove('animate');
}, { once: true }); // Ensures the event listener is removed after it triggers once


function hexToRgb(hex) {
    // Remove the    '#' if it exists
    hex = hex.replace(/^#/, '');

    // Parse the hex values to integers
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return { r, g, b };
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}
function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
}
function rgbToHex(r, g, b) {
    const toHex = (n) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}