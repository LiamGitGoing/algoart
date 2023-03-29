let button1, button2;
let latInput, longInput;
let textContent = '';
// let lScale = 4;
let minLongitude;
let maxLongitude;
let minLatitude;
let maxLatitude;
let url = '';
let flightArr = [];
let checkFlightArr = [];
let planeArr = [];
let CtoP = [];
let PtoC = [];
var easyCam;
let interReg, interSB;
let ceiling = 500;
let sceneNum = 0;
let errorM = false;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
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

  angleMode(DEGREES);
  setAttributes('antialias', true);
  push();
  translate(-width / 2, -height / 2);
  pop();



  button1 = createButton('Use my location');
  button1.position(width / 2 + 100, 470);
  button1.mousePressed(function() {
    geoFindMe();
    setInterval(submit, 10500);
  });

}


function draw() {
  // setPrimaryBallGradient(31, 32);
  // background(300, 6, 13);

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

  switch (sceneNum) {

    case 0:
      break;

    case 1:
      background(230);
      push();
      translate(width / 2, height / 2, -2);
      fill(200);
      plane(650, 650);
      pop();
      push();
      pop();
      noStroke();
      fill(230, 0, 0);
      ellipse(width / 2, height / 2, 50, 50);

      for (var x = 0; x < planeArr.length; x++) {
        planeArr[x].display();
        planeArr[x].hover();
      }
      break;
  }
}




function submit() {
  checkFlightArr.splice(0, checkFlightArr.length);
  url = 'https://opensky-network.org/api/states/all?lamin=' + minLatitude + '&lomin=' + minLongitude + '&lamax=' + maxLatitude + '&lomax=' + maxLongitude;

  loadJSON(url, gotData);
}

function gotData(data) {
  if (data.states != null) {
    sceneNum = 1;
    hideUI();
  } 
  for (var i = 0; i < data.states.length; i++) {
    if (!data.states[i][8]) {
      checkFlightArr.push(data.states[i]);
    }
  }

  matchArray();
  cDiff();
}



function matchArray() {
  //initally populate planeArr

  if (planeArr.length < 1) {
    for (var x = 0; x < checkFlightArr.length; x++) {
      let xL = map(checkFlightArr[x][5], minLongitude, maxLongitude, 0, width);
      let yL = map(checkFlightArr[x][6], minLatitude, maxLatitude, 0, height);
      let zL = map(checkFlightArr[x][7], 0, 15000, 0, ceiling);
      if (checkFlightArr[x][7] != null) {
        planeArr.push(new Plane(xL, yL, zL, checkFlightArr[x][0], checkFlightArr[x][10], checkFlightArr[x][9], checkFlightArr[x][1], checkFlightArr[x][2]));
      }
    }
  }

  //update positions
  for (var i = 0; i < checkFlightArr.length; i++) {
    for (var j = 0; j < planeArr.length; j++) {
      if (planeArr[j].ident == checkFlightArr[i][0]) {
        let xL = map(checkFlightArr[i][5], minLongitude, maxLongitude, 0, width);
        let yL = map(checkFlightArr[i][6], minLatitude, maxLatitude, 0, height);
        let zL = map(checkFlightArr[i][7], 0, 15000, 0, ceiling);
        planeArr[j].update(xL, yL, zL, checkFlightArr[i][8], checkFlightArr[i][10], checkFlightArr[i][9]);
      }
    }
  }

}

function cDiff() {
  //create temporary arrays
  let cArr = [];
  let pArr = [];
  cArr.splice(0, cArr.length);
  pArr.splice(0, pArr.length);

  //check if there are any new planes added
  for (var a = 0; a < checkFlightArr.length; a++) {
    cArr.push(checkFlightArr[a][0]);
  }
  for (var b = 0; b < planeArr.length; b++) {
    pArr.push(planeArr[b].ident);
  }
  CtoP.splice(0, CtoP.length);
  let intersection1 = cArr.filter(x => !pArr.includes(x));
  for (var i = 0; i < intersection1.length; i++) {
    CtoP.push(intersection1[i]);
  }
  for (var y = 0; y < CtoP.length; y++) {
    for (let x = 0; x < checkFlightArr.length; x++) {
      if (CtoP[y] == checkFlightArr[x][0]) {
        let xL = map(checkFlightArr[x][5], minLongitude, maxLongitude, 0, width);
        let yL = map(checkFlightArr[x][6], minLatitude, maxLatitude, 0, height);
        let zL = map(checkFlightArr[x][7], 0, 15000, 0, ceiling);
        if (checkFlightArr[x][7] != null) {
          planeArr.push(new Plane(xL, yL, zL, checkFlightArr[x][0], checkFlightArr[x][10], checkFlightArr[x][9], checkFlightArr[x][1], checkFlightArr[x][2]));
        }
      }

    }
  }
  PtoC.splice(0, PtoC.length);
  let intersection2 = pArr.filter(w => !cArr.includes(w));

  for (var k = 0; k < intersection2.length; k++) {
    PtoC.push(intersection2[k]);
  }

  for (var v = 0; v < PtoC.length; v++) {
    for (let z = 0; z < planeArr.length; z++) {
      if (PtoC[v] == planeArr[z].ident) {
        planeArr.splice(z, 1);
      }
    }
  }

}



class Plane {
  constructor(tX, tY, tZ, tIdent, tHeading, tSpeed, tCall, tOrigin) {
    this.loc = {
      x: tX,
      y: tY,
      z: tZ
    }
    this.arrList = [];
    this.ident = tIdent;
    this.land = false;
    this.heading = tHeading;
    this.speed = tSpeed;
    this.call = tCall;
    this.origin = tOrigin;
    this.v1 = 0;
    this.v2 = 0;
    this.rX = 0;
    this.rY = 0;
    this.rZ = 0;
    this.lX = 0;
    this.lY = 0;
    this.lZ = 0;
  }

  update(Nx, Ny, Nz, tLand, tHeading, tSpeed) {
    this.land = tLand;
    this.heading = tHeading;
    this.speed = tSpeed;

    this.newX = Nx;
    this.newY = Ny;
    this.newZ = Nz;

    push();
    translate(this.newX, this.newY);
    this.v1 = p5.Vector.fromAngle(radians(-this.heading + 180), 20);
    this.v2 = p5.Vector.fromAngle(radians(-this.heading), 20);
    pop();
    this.rX = this.v1.x + this.newX;
    this.rY = this.v1.y + this.newY;
    this.rZ = this.v1.z + this.newZ;
    this.lX = this.v2.x + this.newX;
    this.lY = this.v2.y + this.newY;
    this.lZ = this.v2.z + this.newZ;

    this.newPos = {
      x: this.newX,
      y: this.newY,
      z: this.newZ
    }

    this.randPos = {
      x1: this.rX,
      y1: this.rY,
      z1: this.rZ,
      x2: this.lX,
      y2: this.lY,
      z2: this.lZ
    }
    this.arr = this.arrList;
    this.arr.push(this.randPos)
    this.arrList = this.arr;
    this.loc = this.newPos;
  }

  hover() {
    push();
    translate(this.loc.x + 20, this.loc.y, this.loc.z);
    rotateX((-90));
    fill(0, 230);
    noStroke();
    textFont(interSB);
    text(this.call, 0, 0);

    textFont(interReg);
    text(this.origin, 0, 0 + 12);
    pop();
  }

  display() {
    push();
    fill(2);
    noStroke();
    translate(this.loc.x, this.loc.y, this.loc.z);
    sphere(8);
    // ellipse(0, 0, 10, 10);
    pop();
    push();
    translate(this.rX, this.rY, this.rZ);
    stroke(0, 255, 0);
    sphere(2);
    pop();
    push();
    translate(this.lX, this.lY, this.lZ);
    stroke(255, 0, 0)
    sphere(2);
    pop();

    // strokeWeight(2);
    // noFill();
    // beginShape(QUAD_STRIP);
    beginShape();
    fill(240);
    noStroke();
    // stroke(200);
    for (let i = 0; i < this.arrList.length; i++) {
      if (i > 1) {
        vertex(this.arrList[i].x1, this.arrList[i].y1, this.arrList[i].z1);
        vertex(this.arrList[i - 1].x1, this.arrList[i - 1].y1, this.arrList[i - 1].z1);
        vertex(this.arrList[i - 1].x2, this.arrList[i - 1].y2, this.arrList[i - 1].z2);
        vertex(this.arrList[i].x2, this.arrList[i].y2, this.arrList[i].z2);
      }
    }
    endShape(CLOSE);
  }
}

function hideUI() {
  button1.hide();
  button2.hide();
  latInput.hide();
  longInput.hide();
}