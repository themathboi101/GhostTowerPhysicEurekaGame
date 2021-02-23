var ghost, ghostImage;
var door, doorImage;
var climber, climberImage;
var tower, towerImg;
var invisibleDetection;

var invisibleBoundary;

var invisibleDetectionG, climberG, doorG;

var PLAY=1;
var END=0;
var gameState=PLAY;

var spookyWave;


function preload(){
     ghostImage=loadAnimation("ghost-jumping.png","ghost-standing.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  towerImg=loadImage("tower.png");
  
  spookyWave=loadSound("spooky.wav");
}
function setup(){
     createCanvas(600,700);
  
  tower=createSprite(300,350,100,100);
  tower.addImage("tower",towerImg);
  
  ghost=createSprite(300,300,40,40);
  ghost.addAnimation("ghost",ghostImage);
  ghost.scale=0.4;
  
  invisibleBoundary=createSprite(300,650,700,30);
  invisibleBoundary.visible=false;
  
  //ghost.debug=true;
  
  invisibleDetectionG=createGroup();
  doorG=createGroup();
  climberG=createGroup();
  
  
}
function draw(){
  background(220);
  
  if(gameState===PLAY){
    
    spookyWave.play();
    tower.velocityY=4;
    
    if(tower.y>400){
      tower.y=350/2;
    }
 
  
  if(keyDown("right")){
    ghost.x=ghost.x+10;
  }
    if(keyDown("left")){
      ghost.x=ghost.x-10;
    }
    if(keyDown("space")){
      ghost.velocityY=ghost.velocityY-5;
      //invisibleBoundary.destroy();
      }
   
     ghost.velocityY=ghost.velocityY+1;
   
  spawnDoor();
    if(invisibleDetectionG.isTouching(ghost)|| ghost.y<0||ghost.y>700){
      gameState=END;
    }
    
  }
  else if(gameState===END){
    ghost.velocityY=0;
fill (255,255,255);
    textSize(20); 
    
    text("Game Over. Try again using the refresh button yeet", 120,100);
    tower.destroy();
    climberG.destroyEach();
    invisibleDetectionG.destroyEach();
    doorG.destroyEach();
    ghost.destroy();
  
    
   
  }
  
  ghost.collide(invisibleBoundary);
  
  
  drawSprites();
  
}
function spawnDoor(){
  if(frameCount%100===0){
    door=createSprite((random(120,500)),0,100,100);
    door.addImage(doorImage);
    door.velocityY=4;
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
    doorG.add(door);
    
    climber=createSprite(door.x,door.y+60,60,20);
    climber.addImage(climberImage);
    climber.velocityY=4;
    climber.depth=door.depth;
    climberG.add(climber);
    
    
    invisibleDetection=createSprite(climber.x,climber.y+15,60,20);
    invisibleDetection.velocityY=4;
    invisibleDetection.visible=false;
    invisibleDetectionG.add(invisibleDetection);
   }
}
