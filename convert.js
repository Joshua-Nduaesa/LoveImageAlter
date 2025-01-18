const brightbutton = document.querySelector(".check");
const imageinput = document.getElementById("imageinput");
const outputImage = document.getElementById("outputimage");
const from = document.getElementById("from");
const select = document.querySelector("select");

let filename;
let filetype = "jpeg";

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

imageinput.addEventListener("change", event => {
    const file = event.target.files[0];
    if (file) {
        outputImage.src = URL.createObjectURL(file);
        
        // Wait for the image to load before accessing its natural dimensions
        outputImage.onload = () => {
            filename = file.name;
            from.textContent = file.type.replace("image/", "");
        };
    }
});

select.addEventListener("change", ()=>{
    filetype = select.value;

})

function Export() {
    if (imageinput.value) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
    
        canvas.width = outputImage.naturalWidth; // Use naturalWidth for original image dimensions
        canvas.height = outputImage.naturalHeight; // Use naturalHeight for original image dimensions
    
        ctx.drawImage(outputImage, 0, 0, canvas.width, canvas.height);
        
        filetype = select.value;
        canvas.toBlob(blob => {
            const a = document.createElement("a");
            const url = URL.createObjectURL(blob);
            a.href = url;
            a.download = `${filename.replace(/\.[^/.]+$/, '')}.${filetype}`;
            a.click();
            URL.revokeObjectURL(url); // Clean up the object URL
        }, `image/${filetype}`);
    }
}
