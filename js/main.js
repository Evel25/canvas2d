var canvas = document.querySelector('canvas');

// set Canvas dimentions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x : undefined,
    y : undefined
};
var circlesArray = [];

// create colors array to give the circles a pecific sircles
var coclorArray = [
    '#2c3e50',
    '#e74c3c',
    '#ecf0f1',
    '#3498db',
    '#ff1100'
];
// but first you need to get the brush to draw things
var brush = canvas.getContext('2d');

// max raduis 
var maxRaduis = 40;
// min raduis
var minRaduis = 3;

// set an event listner to control the resizing of the canvas whene the window is resizing
window.addEventListener('resize',function(){
    // set Canvas dimentions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}) ;


// add a window listener to update get the mouse cordinate
window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
}); 


// cretae circle Object
function Circle(x,y,dx,dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.raduis = Math.random() * 3 + 1;
    this.realRaduis = this.raduis;
    this.color = coclorArray[Math.floor(Math.random() * 5)];
    

    this.Draw = function(){
        brush.beginPath();
        brush.arc(this.x, this.y, this.raduis, 0, Math.PI * 2, true);
        brush.fillStyle = this.color;
        brush.fill();
        };

    this.Update = function(){
        this.Draw();
        // Increment the x, and y to start the animation
        if(this.x + this.raduis > innerWidth || this.x - this.raduis < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.raduis > innerHeight || this.y - this.raduis < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // update the raduis
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.raduis < maxRaduis){
                this.raduis += 1;
            }
        }else if(this.raduis > this.realRaduis){
            this.raduis -= 1;
        }
    };

}

function init(){
    // clear the circle array first
    circlesArray = [];
    // create a bunsh of circles
    for(let i =0;i<200;i++){
        // globale variables
        var raduis = 10;
        var  x = getX(raduis);
        var  y = getY(raduis);;
        var dx = (Math.random() - 0.5) * 4;
        var dy = (Math.random() - 0.5) * 4;
        circlesArray.push(new Circle(x,y,dx,dy,raduis));
    }
}

// call the init function the push all the circles objects to
// the array
init();

function animate(){
    brush.clearRect(0,0,innerWidth,innerHeight);
    for(let i=0;i<circlesArray.length;i++){
        circlesArray[i].Update();
    }

    // create a loop to execute the animate function
    requestAnimationFrame(animate);
}

// call the animate function
animate();

// getting starting x value
function getX(raduis){
    var  x = (Math.random() * window.innerWidth);
    if(x + raduis >= innerWidth){
        x -= raduis;
    }else if(x +raduis <= 0){
        x += raduis;
    }else if(x < raduis){
        x += raduis;
    }
    return x;
}

// the same way to get the y value
function getY(raduis){
    var y = (Math.random() * innerHeight);
    if(y + raduis >= innerHeight){
        y -= raduis;
    }else if(y+raduis <= 0){
        y += raduis;
    }else if(y < raduis){
        y += raduis;
    }
    return y;
}


