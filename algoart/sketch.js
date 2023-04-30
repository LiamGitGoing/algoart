let button1;
let distance;
let balls = [];
let url = "";
let sceneNum = 0;
let errorM = false;
let x = 0;
let asteroids = {};
let currentDate = "";
let zIndex = [];
let chaosOrbit = 0;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  translate(-windowWidth * 2, windowHeight * 2);
  background(58, 107, 53);

  noFill();

  getAsteroids();
  setInterval(getAsteroids, 3600000); // get data every hour
}
function getAsteroids() {
  currentDate = new Date().toISOString().split("T")[0];
  url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&end_date=${currentDate}&api_key=vnc4nPGb2oXoSGq81OJMmpKDsqpmLWG3nnfSkW1p `;
  loadJSON(url, createAsteroids);
}
function createAsteroids(asteroidData) {
  button1 = createButton("Look up");
  button1.size(80, 30);
  button1.position(windowWidth / 2 - 40, windowHeight / 2 - 15);
  button1.style("background-color", "#958FD1");
  button1.style("border-color", "#736BC2");
  button1.style("border-radius", "8px");
  button1.mousePressed(function () {
    for (let i = 1; i <= asteroidData.element_count; i++) {
      zIndex[i - 1] =
        asteroidData.near_earth_objects[currentDate][i - 1].estimated_diameter.meters.estimated_diameter_max / 2;
    }
    for (let i = 1; i <= asteroidData.element_count; i++) {
      chaosOrbit = random([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      balls[i - 1] = new PrimaryBall(
        windowWidth / i,
        windowWidth / i,
        asteroidData.near_earth_objects[currentDate][i - 1].estimated_diameter.meters.estimated_diameter_max / 2,
        zIndex[i - 1],
        chaosOrbit,
        0.5,
        0.5
      );
    }
    console.log("🚀 ~ file: sketch.js:56 ~ chaosOrbit:", chaosOrbit);

    hideUI();
  });
}

function draw() {
  background(58, 107, 53);
  // setPrimaryBallGradient(203, 149);

  for (let i = 1; i <= balls.length; i++) {
    if (balls[i - 1].chaosOrbit == 1) {
      rotateY(millis() / 5000);
      rotateX(millis() / 5000);
      translate(150, 30, 0);
    }
    if (balls[i - 1].chaosOrbit == 2) {
      rotateY(millis() / 6000);
      rotateX(millis() / 6000);
      translate(-150, -30, 0);
    }
    if (balls[i - 1].chaosOrbit == 3) {
      rotateY(millis() / 7000);
      rotateX(millis() / 7000);
      translate(-150, 30, 0);
    }
    if (balls[i - 1].chaosOrbit == 4) {
      rotateY(millis() / 4500);
      rotateX(millis() / 4500);
      translate(150, -30, 0);
    }
    if (balls[i - 1].chaosOrbit == 5) {
      rotateY(millis() / 5500);
      rotateX(millis() / 5500);
      translate(130, 40, 0);
    }
    if (balls[i - 1].chaosOrbit == 6) {
      rotateY(millis() / 6500);
      rotateX(millis() / 6500);
      translate(-130, -40, 0);
    }
    if (balls[i - 1].chaosOrbit == 7) {
      rotateY(millis() / 5000);
      rotateX(millis() / 5000);
      translate(-130, 40, 0);
    }
    if (balls[i - 1].chaosOrbit == 8) {
      rotateY(millis() / 6000);
      rotateX(millis() / 6000);
      translate(130, -40, 0);
    }
    if (balls[i - 1].chaosOrbit == 9) {
      rotateY(millis() / 7000);
      rotateX(millis() / 7000);
      translate(100, 20, 20);
    }
    if (balls[i - 1].chaosOrbit == 10) {
      rotateY(millis() / 4500);
      rotateX(millis() / 4500);
      translate(-100, -20, 20);
    }
    if (balls[i - 1].chaosOrbit == 11) {
      rotateY(millis() / 5500);
      rotateX(millis() / 5500);
      translate(-100, 20, 20);
    }
    if (balls[i - 1].chaosOrbit == 12) {
      rotateY(millis() / 6500);
      rotateX(millis() / 6500);
      translate(100, -20, 20);
    }

    balls[i - 1].show();
  }
}

function hideUI() {
  button1.hide();
}
