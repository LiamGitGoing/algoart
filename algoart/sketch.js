let button1;
let distance;
let balls = [];
let url = "";
let sceneNum = 0;
let errorM = false;
let x = 0;
let asteroids = {};
let currentDate = "";

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(58, 107, 53);
  
  stroke(58, 107, 53);
  
  getAsteroids();
  setInterval(getAsteroids, 3600000); // get data every hour
}
function getAsteroids(){
  currentDate = new Date().toISOString().split("T")[0];
  url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&end_date=${currentDate}&api_key=vnc4nPGb2oXoSGq81OJMmpKDsqpmLWG3nnfSkW1p `;
  loadJSON(url, createAsteroids);
}
function createAsteroids(asteroidData){
  button1 = createButton("Look up");
  button1.size(80, 30);
  button1.position(windowWidth / 2 - 40, windowHeight / 2 - 15);
  button1.style("background-color", "#958FD1");
  button1.style("border-color", "#736BC2");
  button1.style("border-radius", "8px");
  button1.mousePressed(function () {
    for (let i = 1; i <= asteroidData.element_count; i++) {
      balls[i - 1] = new PrimaryBall(
        windowWidth / random(1,4),
        windowHeight / random(1,4) ,
        asteroidData.near_earth_objects[currentDate][i - 1].estimated_diameter.meters.estimated_diameter_max / 2,
        0.5,
        0.5
        );
      }
      
      hideUI();
    });


}

function draw() {
  
  setPrimaryBallGradient(203, 149);

  for (let i = 1; i <= balls.length; i++) {
    console.log(balls[i - 1]);
    balls[i - 1].move();
    balls[i - 1].show();
  }
}

function hideUI() {
  button1.hide();
}

