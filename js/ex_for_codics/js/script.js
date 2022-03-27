const myBtn = document.querySelector('#myBtn');
const inputText = document.querySelector('#myInput');
const clearBtn = document.querySelector('#clearBtn');
myBtn.onclick = showText;
clearBtn.onclick = clearText;

async function loadFonts() {
    const font = new FontFace("Alfa Slab One", "url(//db.onlinewebfonts.com/t/092d2fc4b6fd921ba340df3151fe4aa3.woff2)");
    await font.load();
    document.fonts.add(font);
  }
  
  function renderTextToPixelList(font, text, canvas, sampleStep = 3) {
    const context = canvas.getContext("2d");
    context.font = font;
    context.fillStyle = "#000";
    const measurements = context.measureText(text);
    const width = Math.ceil(measurements.width);
    const height = Math.ceil(measurements.actualBoundingBoxAscent - measurements.actualBoundingBoxDescent);
    context.fillText(text, measurements.actualBoundingBoxLeft, height);
    const imageData = context.getImageData(0, 0, width, height);
    const opaquePixels = [];
    for (let y = 0; y < height; y += sampleStep) {
      for (let x = 0; x < width; x += sampleStep) {
        const off = y * width * 4 + x * 4 + 3; // Offset to alpha channel
        if (imageData.data[off] > 240) {
          opaquePixels.push([x, y]);
        }
      }
    }
    return {
      opaquePixels,
      width,
      height,
    };
  }
  
  function drawDot(context, pmap) {
    const idx = Math.floor(pmap.opaquePixels.length * Math.random());
    let [x, y] = pmap.opaquePixels[idx];
    x *= 1.5;
    y *= 1.5;
    const hue = (x + 5 + +new Date() / 150) % 360;
    context.beginPath();
    context.fillStyle = `hsla(${hue}, 100%, 50%, 0.5)`;
    context.ellipse(x - 1, y - 1, 2, 2, 0, 0, 6.283);
    context.fill();
  }

  function showText(){
    let text = inputText.value;
        loadFonts().then(() => {
            const canvas = document.getElementById("canvas");
            const pmap = renderTextToPixelList("100px Alfa Slab One", text, canvas);
            canvas.width = canvas.width + 0; // clear canvas
            const context = canvas.getContext("2d");
            setInterval(() => {
              for (let i = 0; i < 5; i++) drawDot(context, pmap);
            }, 20);
      }) 
        inputText.value = '';
  }
function clearText(){
    window.location.reload(true);
}