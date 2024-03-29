let randomDestabilizerX;
let randomDestabilizerY;
let randomDestabilizerArray = new Array(1000);
for (let i = 0; i < randomDestabilizerArray.length; i++) {
  randomDestabilizerArray[i] = i / randomDestabilizerArray.length + 1;
}

function linearGradient(sX, sY, eX, eY, colorS, colorE) {
  let gradient = drawingContext.createLinearGradient(sX, sY, eX, eY);
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
  drawingContext.strokeStyle = gradient;
}

function shadow() {
  drawingContext.shadowOffsetX = 14;
  drawingContext.shadowOffsetY = 14;
  drawingContext.shadowBlur = 14;
  drawingContext.shadowColor = color(227, 180, 72);
}

function setPrimaryBallGradient(colorGradientA, colorGradientB) {
  linearGradient(
    0,
    0, //Start point
    windowWidth,
    windowHeight, //End point
    color(colorGradientA, 209, 143), //Start color
    color(colorGradientB, 143, 209) //End color
  );

  shadow();
}
