const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var birds =[];

function preload() {
    backgroundImg = loadImage("sprites/bg.png");
getbackgroundImg()

redbird=loadImage("sprites/redbird.png")
yellowbird=loadImage("sprites/yellowbird.png")
bluebird=loadImage("sprites/bluebird.png")
bird_flying=loadSound("sprites/bird_flying.mp3")
bird_select=loadSound("sprites/bird_select.mp3")

}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird2 = new Bird(150,170);
    bird3 = new Bird(100,170);

    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird);
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});

refresh = createImg("sprites/refresh.png");
refresh.position(15,10);
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);
    Engine.update(engine);

    refresh.mousePressed(reset);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
    push()
    imageMode(CENTER)
    image(redbird, bird.body.position.x,bird.body.position.y,50,50);
    image(bluebird,bird2.body.position.x,bird2.body.position.y,50,50);
    image(yellowbird,bird3.body.position.x,bird3.body.position.y,50,50);
    pop()
}

function mouseDragged(){
    if (mouseX >=0 && mouseX<200 && gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
    bird_fly.play()
    }
}


function mouseReleased(){
    slingshot.fly();
    birds.pop();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && gameState == "launched"){
       slingshot.attach(birds[birds.length-1].body,{x:200,y:50});
       bird_select.play()
       gameState = "onSling"
    }

}

async function getbackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
var responsejson =await response.json()
var datetime=responsejson.datetime
console.log(datetime)
var hour=datetime.slice(11,13)
console.log(hour)
if(hour>=14&&hour<=19){
bg="sprites/bg.png"

}
else{
bg="sprites/bg2.jpg"

}
backgroundImg=loadImage(bg)
}
function reset(){

location.reload()
}
