function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  strokeWeight(3);
  stroke(32, 51, 88);

  ballCenter = new PrimaryBall(windowWidth / 2, windowHeight / 2, 400, 0.5, 0.5);
  ballLeftTop = new PrimaryBall(windowWidth / 5, windowHeight / 4, 250, 0.3, 0.3);
  ballRightTop = new PrimaryBall(windowWidth / 1.2, windowHeight / 5, 200, 0.2, 0.2);
  ballLeftBottom = new PrimaryBall(windowWidth / 5.8, windowHeight / 1.3, 150, 0.3, 0.3);
  ballRightBottom = new PrimaryBall(windowWidth / 1.3, windowHeight / 1.4, 100, 0.4, 0.4);
  ballCenterTop = new PrimaryBall(windowWidth / 2.05, windowHeight / 8, 80, 0.6, 0.6);
}

function draw() {
  setPrimaryBallGradient(31, 32);
  background(300, 6, 13);

  ballCenter.move();
  ballCenter.show();

  ballLeftTop.move();
  ballLeftTop.show();

  ballRightTop.move();
  ballRightTop.show();

  ballLeftBottom.move();
  ballLeftBottom.show();

  ballRightBottom.move();
  ballRightBottom.show();

  ballCenterTop.move();
  ballCenterTop.show();
}
