
class PrimaryBall {
  constructor(x, y, d, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  move() {
    randomDestabilizerX = random(randomDestabilizerArray);
    randomDestabilizerY = random(randomDestabilizerArray);

    // x values of movement with destabilizer
    this.x += this.xSpeed * randomDestabilizerX * sin(this.y);
    // boundary behaviour
    if (this.x - this.d / 2 < 0 || this.x + this.d / 2 > windowWidth) {
      this.xSpeed *= -1;
    }
    
    // y values of movement with destabilizer
    this.y += this.ySpeed * randomDestabilizerY * sin(this.x);
    // boundary behaviour
    if (this.y - this.d / 2 < 0 || this.y + this.d / 2 > windowHeight) {
      this.ySpeed *= -1;
    }
  }

  show() {
    circle(this.x, this.y, this.d);
    
  }
}
