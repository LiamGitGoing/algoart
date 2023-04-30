let button1;
let distance;
let balls = [];
let url = "";
let sceneNum = 0;
let errorM = false;
let asteroids = {};
let x = 0;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}

async function setup(asteroids) {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0,46,126);
  strokeWeight(3);
  stroke(144,197,223);

  translate(-windowWidth / 2, -windowHeight / 2);

  const currentDate = new Date().toISOString().split("T")[0];

  if (!asteroids) {
    url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&end_date=${currentDate}&api_key=vnc4nPGb2oXoSGq81OJMmpKDsqpmLWG3nnfSkW1p `;

    const result = await fetch(url);
    asteroids = await result.json();
  }

  button1 = createButton("Look up");
  button1.size(80, 30);
  button1.position(windowWidth / 2 - 40, windowHeight / 2 - 15);
  button1.style("background-color", "#debe9b");
  button1.style("border-radius", "8px");
  button1.mousePressed(function () {
    for (let i = 1; i <= asteroids.element_count; i++) {
      balls[i - 1] = new PrimaryBall(
        windowWidth / i + 1,
        windowHeight / i + 1,
        asteroids.near_earth_objects[currentDate][i - 1].estimated_diameter.meters.estimated_diameter_max / 2,
        0.5,
        0.5
      );
    }
  
    hideUI();
    if (asteroids) {
      setInterval(display, 50, balls);
    }

    // ballCenter = new PrimaryBall(windowWidth / 2, windowHeight / 2, 400, 0.5, 0.5);
    // ballLeftTop = new PrimaryBall(windowWidth / 5, windowHeight / 4, 250, 0.3, 0.3);
    // ballRightTop = new PrimaryBall(windowWidth / 1.2, windowHeight / 5, 200, 0.2, 0.2);
    // ballLeftBottom = new PrimaryBall(windowWidth / 5.8, windowHeight / 1.3, 150, 0.3, 0.3);
    // ballRightBottom = new PrimaryBall(windowWidth / 1.3, windowHeight / 1.4, 100, 0.4, 0.4);
    // ballCenterTop = new PrimaryBall(windowWidth / 2.05, windowHeight / 8, 80, 0.6, 0.6);
  });
}

function display(balls) {

  // setPrimaryBallGradient(31, 32);

  for (let i = 1; i <= balls.length; i++) {
    console.log(balls[i - 1]);
    balls[i - 1].move();
    balls[i - 1].show();
  }
}

function hideUI() {
  button1.hide();
}

