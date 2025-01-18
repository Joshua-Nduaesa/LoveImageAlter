const brightbutton = document.querySelector(".check");

let brightness = localStorage.getItem("brightness") === "true"; // Convert string to boolean
if (brightness){
    document.body.style.filter = document.body.style.filter === 'invert(1)' ? 'invert(0)' : 'invert(1)';
    document.body.style.backgroundColor = "white"
    
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

