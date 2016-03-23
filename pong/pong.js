

var canvas = document.createElement('canvas');

var width = window.innerWidth;
var height = window.innerHeight;
var f = 1.000;
canvas.width = width;
canvas.height = height;

var context = canvas.getContext('2d');

var bricks = [];
var ball;
window.onload = function(){
    document.body.appendChild(canvas);
    bricks.push(new Wall(0,0,width,8,0));
    bricks.push(new Wall(0,height-8, width, 8,0));
    bricks.push(new Wall(150,0,8,height,0));
    bricks.push(new Wall(width-8,0,8,height,0));


};


function update() {
    ball.update();
    //triangle.update();
}
function draw() {
  context.fillStyle = "#FF00FF";
  context.fillRect(0, 0, width, height);
  ball.draw();
  for(var i = bricks.length-1; i>=0 ; i--){
      bricks[i].draw();
  }
  triangle.draw();
}

//shape
function Shape(x, y, width, height, orientation) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Shape.prototype= {
    constructor : Shape,
    draw : function(x, y){}
};

//mobile
function Mobile(x, y, width, height, orientation, dx, dy) {
    Shape.call(this, x, y, width, height, orientation);
    this.dx = dx;
    this.dy = dy;
}

Mobile.prototype = new Shape;

Mobile.prototype.update = function() {
    if( this.x<this.radius || this.x>width-this.radius) this.dx = -this.dx*f;
    if( this.y<this.radius || this.y>height-this.radius) this.dy = -this.dy*f;
    this.x += this.dx;
    this.y += this.dy;
};


//circle
function Circle(x, y, width, height, orientation, radius, dx, dy) {
    Mobile.call(this,x, y, width, height, orientation, dx, dy);
    this.radius = radius;
}

Circle.prototype = new Mobile;

Circle.prototype.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.closePath();
};

//wall
function Wall(x, y, width, height, orientation) {
    Shape.call(this, x, y, width, height, orientation);
}

Wall.prototype = new Shape;
Wall.prototype.draw = function() {
    context.beginPath();
    context.fillStyle = "#FF4444";
    context.fillRect(this.x, this.y, this.width, this.height);
    context.closePath();
};

//triangle
function Triangle(x, y, width, height, orientation) {
    Mobile.call(this, x, y, width, height, orientation);
}

Triangle.prototype = new Mobile;
Triangle.prototype.draw = function() {
    context.beginPath();
    context.moveTo(this.x-this.width/2, this.y-this.height);
    context.lineTo(this.x+this.width/2, this.y-this.height);
    context.lineTo(this.x, this.y+this.height/2);
    context.fill();
};

//collision Detection
function collisionDetection() {
    if(ball.x+ball.radius >= bricks[3].x){
        ball.dx = -ball.dx;
        update();
    }
    if(ball.y+ball.radius >= bricks[1].y   ){
        ball.dy = -ball.dy;
        update();
    }
    if(ball.y-ball.radius <= bricks[0].y +bricks[0].height){
        console.log("lala");
        ball.dy = -ball.dy;
        update();
    }
    if(ball.x-ball.radius <= bricks[2].x + bricks[2].width){
        ball.dx = -ball.dx;
        update();
    }
}
//color
function Color(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;
}

ball = new Circle(500, 50, 10, 45, 30, 40, 4, 4,8);
var wall = new Wall(60, 80, 10,20,2);
var triangle = new Triangle(95, 110, 70,70,8,5);

function mainLoop() {
    collisionDetection();
    update();
    draw();
    requestAnimationFrame(mainLoop);



}

// Start things off
requestAnimationFrame(mainLoop);
