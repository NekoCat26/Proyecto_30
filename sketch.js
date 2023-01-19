var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "START";


//Función para cargar imágenes y animaciones
function preload(){
towerImg = loadImage("tower.png");
doorImg = loadImage("door.png");
climberImg = loadImage("climber.png");
ghostImg = loadImage("ghost-standing.png");
spookySound = loadSound("spooky.wav");
  
}

//Función para declarar Sprites y grupos
function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

//Función para dibujar los Sprites y establecer reglas del juego
function draw(){
  background(220);
  drawSprites();
  
 
  if(gameState==="START" && keyDown("space")){
      
    //Velocidad y cambio de estado 
    gameState="PLAY";
     }
  
  if(gameState==="PLAY"){
    //Fondo infinito
   tower.velocityY = 1;
    if(tower.y > 400){
      tower.y = 300
    }
    //gravedad
      
  ghost.velocityY = ghost.velocityY + 0.8;
  
  
    //Mover personaje con las flechas 
    if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -10;
  }
  
    //crear bases y hacer que el personaje quede sobre ellas
    spawnDoors();
    
    if(climbersGroup.isTouching(ghost)){
       ghost.velocityY = 0;
       }
    //Aumentar puntos
      
    //Cambiar a estado GAMEOVER
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
       ghost.destroy();
      gameState = "GAMEOVER"
       }
  }
  
  //Estado GAMEOVER 
  
  if(gameState==="GAMEOVER"){
    stroke("yellow");
    fill("yellow");
    textSize(70);
    text("Game Over",100,250);
    textSize(30);
    text("Vuelve a intentar",180,320);
    tower.velocityY = 0;
     }
  }


//Función para crear bases
function spawnDoors() {
  //escribe aquí el código para aparecer las puertas en la torre 
 if (frameCount % 240 === 0){
     var door = createSprite(random(120,400),-50,10,10);
     door.addImage(doorImg);
     var climber = createSprite(door.x,10,100,5);
     climber.addImage(climberImg);
     var invisibleBlock = createSprite(200,15);
     invisibleBlock.width = climber.width;
     invisibleBlock.height = 2;
     climber.x = door.x;
     invisibleBlock.x = door.x;
     invisibleBlock.debug = true;
   
     ghost.depth = door.depth;
     ghost.depth +=1;
     door.velocityY = door.velocityY + 0.8;
     climber.velocityY = climber.velocityY + 0.8;
     invisibleBlock.velocityY = invisibleBlock.velocityY + 0.8;
     doorsGroup.add(door);
     climbersGroup.add(climber);
     invisibleBlockGroup.add(invisibleBlock);
     }
}

