const CANVAS_HEIGHT = 900;
const CANVAS_WIDTH = 1910;

class Circle {
  constructor(x, y, d, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }
}

let randomDestabilizer;
let randomDestabilizerArray = new Array(1000);
for (let i = 0; i < randomDestabilizerArray.length; i++) {
  randomDestabilizerArray[i] = i / randomDestabilizerArray.length + 1;
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  mainCircle = new Circle(955, 450, 400, 1, 1);
}

function draw() {
  background(200, 200, 300);

  randomDestabilizer = random(randomDestabilizerArray);

  // x values of movement
  // destabilizer
  if (randomDestabilizer < 1.01) {
    mainCircle.xSpeed *= -1;
  } else {
    mainCircle.x += mainCircle.xSpeed;
  }
  // boundary behaviour
  if (
    mainCircle.x - mainCircle.d / 2 < 0 ||
    mainCircle.x + mainCircle.d / 2 > width
  ) {
    mainCircle.xSpeed *= -1;
  }

  // y values of movement
  // destabilizer
  if (randomDestabilizer > 1.99) {
    mainCircle.ySpeed *= -1;
  } else {
    mainCircle.y += mainCircle.ySpeed;
  }
  // boundary behaviour
  if (
    mainCircle.y - mainCircle.d / 2 < 0 ||
    mainCircle.y + mainCircle.d / 2 > height
  ) {
    mainCircle.ySpeed *= -1;
  }

  circle(mainCircle.x, mainCircle.y, mainCircle.d);
}
