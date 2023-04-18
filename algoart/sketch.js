let button1;

let distance;
let balls = [];
let url = "";
let sceneNum = 0;
let errorM = false;
let element_count;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  strokeWeight(3);
  stroke(32, 51, 88);

  translate(-windowWidth / 2, -windowHeight / 2);

  const currentDate = new Date().toISOString().split("T")[0];

  button1 = createButton("Look up");
  button1.size(80, 30);
  button1.position(windowWidth / 2 - 40, windowHeight / 2 - 15);
  button1.style("background-color", "#debe9b");
  button1.style("border-radius", "8px");
  button1.mousePressed(function () {
    submit(currentDate);
  });

  // ballCenter = new PrimaryBall(windowWidth / 2, windowHeight / 2, 400, 0.5, 0.5);
  // ballLeftTop = new PrimaryBall(windowWidth / 5, windowHeight / 4, 250, 0.3, 0.3);
  // ballRightTop = new PrimaryBall(windowWidth / 1.2, windowHeight / 5, 200, 0.2, 0.2);
  // ballLeftBottom = new PrimaryBall(windowWidth / 5.8, windowHeight / 1.3, 150, 0.3, 0.3);
  // ballRightBottom = new PrimaryBall(windowWidth / 1.3, windowHeight / 1.4, 100, 0.4, 0.4);
  // ballCenterTop = new PrimaryBall(windowWidth / 2.05, windowHeight / 8, 80, 0.6, 0.6);
}

async function submit(currentDate) {
  url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&end_date=${currentDate}&api_key=vnc4nPGb2oXoSGq81OJMmpKDsqpmLWG3nnfSkW1p `;

// I might need to construct this asteroid object here locally as well to match the data-structure returned from the api call

  let asteroids = await loadJSON(url);
  prepData(asteroids);
}

function hideUI() {
  button1.hide();
}

function prepData(asteroids) {
  if (asteroids != null) {
    sceneNum = 1;
    hideUI();
  }

  switch (sceneNum) {
    case 0:
      break;

    case 1:
      console.log("🚀 ~ file: sketch.js:46 ~ submit ~ asteroids:", asteroids);
      console.log("🚀 ~ file: sketch.js:67 ~ prepData ~ asteroids.element_count:", asteroids.element_count);
      for (let i = 0; i < asteroids.element_count; i++) {
        balls[i] = new PrimaryBall(windowWidth / i + 1, windowHeight / i + 1, 400, 0.5, 0.5);
        balls[i].move();
        balls[i].show();
      }

      break;
  }
}

function draw() {
  // setPrimaryBallGradient(31, 32);
  background(300, 6, 20);

  // ballCenter.move();
  // ballCenter.show();

  // ballLeftTop.move();
  // ballLeftTop.show();

  // ballRightTop.move();
  // ballRightTop.show();

  // ballLeftBottom.move();
  // ballLeftBottom.show();

  // ballRightBottom.move();
  // ballRightBottom.show();

  // ballCenterTop.move();
  // ballCenterTop.show();
}
