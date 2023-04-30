class PrimaryBall {
  constructor(x, y, d, zIndex, chaosOrbit, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.zIndex = zIndex;
    this.chaosOrbit = chaosOrbit;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }


  show() {
 
    sphere(this.d / 4);
  }
}
