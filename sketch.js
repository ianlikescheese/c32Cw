const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var fruit,rope;
var fruit_con;
var bunny
var rabbit;
var melon;
var cutButton;
var background;
var blink;
var eat;
var cry;
var muteBtn;
var blower;
var rope2;
var fruit_con2;
var bgSound;
var cutSound;
var sadSound;
var eatingSound;
var airSound;

function preload(){
  rabbit = loadImage("Rabbit.png")
  melon = loadImage("melon.png")
  background = loadImage("background.png")
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
  cry = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")
  bgSound = loadSound("sound1.mp3")
  cutSound = loadSound("rope_cut.mp3")
  sadSound = loadSound("sad.wav")
  eatingSound = loadSound("eating_sound.mp3")
  airSound = loadSound("air.wav")

  blink.playing = true
  cry.playing = true
  eat.playing = true

  cry.looping = false
  eat.looping = false
}
function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  bgSound.play()
  bgSound.setVolume(0.3)

  ground = new Ground(200,690,600,20);

  rope = new Rope(7,{x:245,y:30});
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  //btn
  cutButton = createImg(`cut_button.png`)
  cutButton.position(220,30)
  cutButton.size(50,50)
  cutButton.mouseClicked(drop)

  blower = createImg('balloon.png')
  blower.position(10,250)
  blower.size(50,50)
  blower.mouseClicked(airBlow)
  
  muteBtn = createImg('mute.png')
  muteBtn.position(450,20)
  muteBtn.size(50,50)
  muteBtn.mouseClicked(mute)

  blink.frameDelay = 20
  cry.frameDelay = 20
  eat.frameDelay = 20

  bunny = createSprite(250, 620)
  bunny.addAnimation("blinking", blink)
  bunny.addAnimation("eating", eat)
  bunny.addAnimation("crying", cry)
  bunny.changeAnimation("blinking")
  bunny.scale = 0.25

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
  
}

function draw() 
{
  //background(51);

  image(background, width/2, height/2, 500, 700)
  
  rope.show();

  if(fruit != null){
    image(melon, fruit.position.x, fruit.position.y,100,100 );
  }
  
  Engine.update(engine);

  ground.show();   

  if(collide(fruit, bunny)== true){
    bunny.changeAnimation("eating")
    eatingSound.play()
  }
  if(fruit != null && fruit.position.y >= 650){
    bunny.changeAnimation("crying")
    fruit = null
    sadSound.play()
    bgSound.stop()
  }
  drawSprites()
}
function collide(body,sprite){
  if(body!= null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if(d <= 80){
      World.remove(world,fruit)
      fruit = null
      return true;
    }else{
      return false;
    }

  }
}

function drop(){
  rope.break()
  fruit_con.detach()
  fruit_con = null
  cutSound.play()
}

function airBlow(){
  Matter.Body.applyForce(fruit, {x:0,y:0}, {x:0.01, y:0})
  airSound.play()
}

function mute(){
  if(bgSound.isPlaying()){
    bgSound.stop()
  }else{
    bgSound.play()
  }
}