// ascii-art.js
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById('upload');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const asciiArtContainer = document.getElementById('ascii-art');

    const asciiChars = '@%#*+=-:. '; // Characters from dark to light

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const asciiArt = convertToAscii(imageData);
                    asciiArtContainer.textContent = asciiArt;
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    function convertToAscii(imageData) {
        const { data, width, height } = imageData;
        let asciiArt = '';

        for (let y = 0; y < height; y += 2) {
            for (let x = 0; x < width; x++) {
                const offset = (y * width + x) * 4;
                const red = data[offset];
                const green = data[offset + 1];
                const blue = data[offset + 2];
                const brightness = (red + green + blue) / 3;

                const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
                asciiArt += asciiChars[charIndex];
            }
            asciiArt += '\n';
        }

        return asciiArt;
    }
});
