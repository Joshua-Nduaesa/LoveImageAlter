const brightbutton = document.querySelector(".check");
const imageinput = document.getElementById("imageinput")
const outputImage = document.getElementById("outputimage");
const width = document.getElementById("width");
const height = document.getElementById("height");
const aspect_ratio_box = document.getElementById("ratio");

let width_number;
let height_number;
let aspect_ratio = 1;
let filename;
let filetype;

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
        
        // Wait for the image to load before accessing its natural dimensions
        outputImage.onload = () => {
            width.value = outputImage.naturalWidth;
            height.value = outputImage.naturalHeight;
            width_number = outputImage.naturalWidth;
            height_number = outputImage.naturalHeight;
            aspect_ratio = width_number / height_number;
            filename = file.name;
            filetype = file.type;
        };
    }
});
width.addEventListener("change", event =>{
    width_number = event.target.value;

    if (aspect_ratio_box.checked){
        height_number = Math.floor(width_number / aspect_ratio);
        height.value = height_number;
    }
})
height.addEventListener("change", event =>{
    height_number = event.target.value;
   
    if (aspect_ratio_box.checked){
        width_number = Math.floor(height_number * aspect_ratio);
        width.value = width_number;
    }
})

function Export(){
    if (imageinput.value){
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
    
        canvas.width = width_number; // Use naturalWidth for original image dimensions
        canvas.height = height_number; // Use naturalHeight for original image dimensions
    
        ctx.drawImage(outputImage, 0, 0, canvas.width, canvas.height);
    
        const a = document.createElement("a");
        a.href = canvas.toDataURL(filetype);
        a.download = filename;
        a.click();
        console.log(imageinput.value)
    }
}
