var map;
var player, playerImg;
var enemy;
var idle;
var back;
var side;
var gifside;
var backgif;
var bala, balaImg;
var gun, gunImg;
var munition = 7;
var elemuntion;
var rechange;
var balas;
var enemies;

function preload() {
  map = loadImage("map.png");
  playerImg = loadImage("player/frontGif.gif");
  enemyImg = loadImage("dead/frontgif.gif");
  idle = loadImage("player/idle.png");
  back = loadImage("player/idleback.png");
  side = loadImage("player/idleside.png");
  gifside = loadImage("player/sidegif.gif");
  backgif = loadImage("player/backGif.gif");
  balaImg = loadImage("bala.png");
  gunImg = loadImage("gun.png");
  rechangeImg = loadImage("Camada 1.png");
}

function setup() {
  createCanvas(1048, 525);

  player = createSprite(1000, 500);
  player.addImage("idle", idle);
  player.addImage("playerImg", playerImg);
  player.addImage("idleback", back);
  player.addImage("idleside", side);
  player.addImage("sidegif", gifside);
  player.addImage("backgif", backgif);

  gun = createSprite(player.x, player.y);
  gun.addImage(gunImg);
  gun.scale = 0.04;
  elemuntion = createElement("h2");
  //elemuntion.html("munição: " + munition);
  elemuntion.position(200, 200);

  rechange = createSprite(450, 700);
  rechange.addImage(rechangeImg);
  rechange.scale = 0.1;

  enemies = new Group();
  balas = new Group();
}

function draw() {
  background("white");
  image(map, 0, 0, 2000, 1000);

  //console.log("x:" + player.x);
  //console.log("y:" + player.y);
  elemuntion.html("munição: " + munition);

  collected();
  control();
  enemyspawnX();

  balas.overlap(enemies, function (bullet, enemt) {
    bullet.destroy();
    enemt.destroy();
  });

  drawSprites();
}

function control() {
  if (keyIsDown(87) && player.y >= 20) {
    player.y -= 10;
    player.changeImage("backgif");
    gun.x = player.x + 14;
    gun.y = player.y + 15;
  }
  if (keyIsDown(65) && player.x >= 65) {
    player.x -= 10;
    player.changeImage("sidegif");
    player.mirrorX(1);
    gun.mirrorX(-1);
    gun.x = player.x - 15;
    gun.y = player.y + 15;
  }

  if (keyIsDown(68) && player.x <= 1940) {
    player.x += 10;
    player.changeImage("sidegif");
    player.mirrorX(-1);
    gun.mirrorX(1);
    gun.x = player.x + 14;
    gun.y = player.y + 15;
  }
  if (keyIsDown(83) && player.y <= 920) {
    player.y += 10;
    player.changeImage("playerImg");
    gun.x = player.x + 14;
    gun.y = player.y + 15;
  }

  if (player.x <= 530) {
    camera.position.x = 530;
  } else if (player.x >= 1475) {
    camera.position.x = 1475;
  } else {
    camera.position.x = player.position.x;
  }

  if (player.y <= 280) {
    camera.position.y = 280;
  } else if (player.y >= 700) {
    camera.position.y = 700;
  } else {
    camera.position.y = player.position.y;
  }
}
function enemyspawnX() {
  if (frameCount % 60 === 0) {
    enemy = createSprite(Math.round(random(0, 2000), 0));
    enemy.addImage(enemyImg);
    enemy.velocityY = 0.0;
    if (enemy.y >= 920) {
      enemy.y = 0;
    }
    enemy.attractionPoint(1, player.position.x, player.position.y);
    enemies.add(enemy);
    enemy.debug = false;
  }
}
function keyReleased() {
  if (keyCode === 87) {
    player.changeImage("idleback");
  }
  if (keyCode === 65) {
    player.changeImage("idleside");
  }

  if (keyCode === 68) {
    player.changeImage("idleside");
  }
  if (keyCode === 83) {
    player.changeImage("idle");
  }
}
function keyPressed() {
  if (munition > 0) {
    if (keyCode === UP_ARROW) {
      bala = createSprite(gun.x, gun.y);
      bala.addImage(balaImg);
      bala.velocityY = -20;
      bala.scale = 0.05;
      bala.rotation = 0;
      munition -= 1;
      balas.add(bala);
    }
    if (keyCode === LEFT_ARROW) {
      bala = createSprite(gun.x, gun.y);
      bala.addImage(balaImg);
      bala.velocityX = -20;
      bala.scale = 0.05;
      bala.rotation = 270;
      munition -= 1;
      balas.add(bala);
    }

    if (keyCode === RIGHT_ARROW) {
      bala = createSprite(gun.x, gun.y);
      bala.addImage(balaImg);
      bala.velocityX = 20;
      bala.scale = 0.05;
      bala.rotation = 90;
      munition -= 1;
      balas.add(bala);
    }
    if (keyCode === DOWN_ARROW) {
      bala = createSprite(gun.x, gun.y);
      bala.addImage(balaImg);
      bala.velocityY = 20;
      bala.scale = 0.05;
      bala.rotation = 180;
      munition -= 1;
      balas.add(bala);
    }
  }
}
function collected() {
  if (player.isTouching(rechange)) {
    rechange.x = random(100, 2000);
    rechange.y = random(0, 900);
    munition += 10;
  }
}
