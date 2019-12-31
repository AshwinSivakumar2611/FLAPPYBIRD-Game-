var PLAY = 1;
var END = 0;
var gameState;

var backgroundState = 2;

var player,playerBird;
var ground, invisibleGround, groundImage;

var obstaclesGroup;

var score = 0;

var gameOver, restart;
var hitSound,click,introMusic,music;
var pipe,pipe1,pipe4up,pipe4down,pipe3down,pipe3up;

var title,button,runGame,texT;

function preload() {
  playerBird = loadImage("BIRD.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  hitSound = loadSound("hit.mp3");
  backGROUND = loadImage("BACKGROUND.png");
  pipe = loadImage("Pipe.png");
  pipeDown = loadImage("PIPEDOWN.png");
  click = loadSound("CLICK.mp3");
  pipe1 = loadImage("pipe1.png");
  pipe4up = loadImage("pipe4up.png");
  pipe4down = loadImage("pipe4down.png");
  pipe3down = loadImage("pipe3down.png");
  pipe3up = loadImage("Pipe3up.png");
  introMusic = loadSound("INTRO.mp3");
  music = loadSound("Get_Outside.mp3");
}

function setup() {

  createCanvas(1350, 610);

  runGame = createButton('RUN GAME');
  runGame.position(650,285);

  texT = createElement('h1');
  texT.html("PRESS SPACE TO JUMP");
  texT.position(470,70);

  runGame.mousePressed(()=>{

    texT.hide();

    backgroundState = 3;

    player = createSprite(100, 180, 20, 40);
    player.setCollider("circle", 0, 0, 450);
    //player.debug=true;
    player.addImage(playerBird);
    player.scale=(0.1)/2;
  
    gameOver = createSprite(650, 270);
    gameOver.addImage(gameOverImg);

    restart = createSprite(650, 310);
    restart.addImage(restartImg);

    gameOver.scale = 0.5;
    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;

    invisibleGround = createSprite(400, 610, 1370, 10);
    invisibleGround.x = invisibleGround.width / 2;
    invisibleGround.velocityX = -(6 + 3 * score / 100);
    invisibleGround.visible = false;

    obstaclesGroup = new Group();
    obstaclesGroup.debug=true;

    score = 0;

    introMusic.loop();

    title = createElement('h1');
    button = createButton('START FLAPPING!');

    title.html("FLAPPY BIRD🦅");
    title.position(500,100);

    button.position(580,300);

    button.mousePressed(()=>{
      gameState=PLAY;
      introMusic.stop();
      click.play();

      music.loop();
    }); 
  runGame.hide();

  });
}

function draw() {

  textSize(50);
  fill("red");
  
  if (backgroundState === 2){
    background("white");
  }  
  
  if (backgroundState === 3){
    background(backGROUND);
  }

  if (gameState === PLAY) {

    text("SCORE : "+score, 1000, 60);
    
    title.hide();
    button.hide();

    score = score + Math.round(getFrameRate() / 60);
    //count = 10;
    invisibleGround.velocityX = -(6 + 3 * score / 100);

    if (keyDown("space")) {
      player.velocityY = -12;
    }
    if (keyWentDown("space")){
      hitSound.play();
    }

    player.velocityY = player.velocityY + 0.8

    if (invisibleGround.x < 0) {
      invisibleGround.x = invisibleGround.width / 2;
    }

    spawnObstacles();
    obstaclesGroup.debug=true;

    if (obstaclesGroup.isTouching(player) || invisibleGround.isTouching(player) || player.y < 8){
      gameState = END;
    }

  } else if (gameState === END) {

    //music.stop();
    text("SCORE : "+score, 550, 240);

    gameOver.visible = true;
    restart.visible = true;

    //set velcity of each game object to 0
    invisibleGround.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);

    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      reset();
    }
  }


  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 120 === 0) {

    //generate random obstacles
    var rand = Math.round(random(1, 4));

    if (rand===1){
      //var obstacle1 = createSprite(1350,40,30,95); 
      //obstacle1.shapeColor="red";
      //obstacle1.velocityX = -8;
      //obstacle1.lifetime = 300;

      var obstacle1d = createSprite(1350,400,30,530); 
      obstacle1d.shapeColor="red";
      obstacle1d.velocityX = -8;
      obstacle1d.lifetime = 300;

      obstacle1d.addImage(pipe1);
      obstacle1d.scale=0.3;
    

      
      //obstaclesGroup.add(obstacle1);
      obstaclesGroup.add(obstacle1d)
    }
    if (rand===2){
      var obstacle2 = createSprite(1350,500,30,300);
      obstacle2.shapeColor="white";
      obstacle2.velocityX = -8;
      obstacle2.lifetime = 300;

      var obstacle2d = createSprite(1350,100,30,200); 
      obstacle2d.shapeColor="white";
      obstacle2d.velocityX = -8;
      obstacle2d.lifetime = 300;

      obstacle2d.addImage(pipeDown);
      obstacle2d.scale=0.3;

      obstacle2.addImage(pipe);
      obstacle2.scale=0.3;

      obstaclesGroup.add(obstacle2);
      obstaclesGroup.add(obstacle2d)
    }
    if (rand===3){
      var obstacle3 = createSprite(1350,600,30,60);
      obstacle3.shapeColor="black";
      obstacle3.velocityX = -8;
      obstacle3.lifetime = 300;

      obstacle3.addImage(pipe3up);
      obstacle3.scale=0.3;

      var obstacle3d = createSprite(1350,150,30,400);
      obstacle3d.shapeColor="black";
      obstacle3d.velocityX = -8;
      obstacle3d.lifetime = 300;

      obstacle3d.addImage(pipe3down);
      obstacle3d.scale=0.3;

      obstaclesGroup.add(obstacle3);
      obstaclesGroup.add(obstacle3d)
    }
    if (rand===4){
      var obstacle4 = createSprite(1350,15,30,150);
      obstacle4.shapeColor="blue";
      obstacle4.velocityX = -8;
      obstacle4.lifetime = 300;

      obstacle4.addImage(pipe4down);
      obstacle4.scale=0.3;

      var obstacle4d = createSprite(1350,470,30,590);
      obstacle4d.shapeColor="blue";
      obstacle4d.velocityX = -8;
      obstacle4d.lifetime = 300;

      obstacle4d.addImage(pipe4up);
      obstacle4d.scale=0.3;

      obstaclesGroup.add(obstacle4);
      obstaclesGroup.add(obstacle4d)
    }

  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  player.x=100;
  player.y=180; 

  obstaclesGroup.destroyEach();

  score = 0;

}