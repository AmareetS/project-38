var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var track;
var runners, runner1, runner2, runner3, runner4;
var runner1_Img, runner2_Img, runner3_Img, runner4_Img, runnerTrack_Img;
function preload(){
  runner1_Img=loadImage("images/g1.png")
  runner2_Img=loadImage("images/g2.png")
  //runner3_Img=loadImage("images/g3.jpg")
  //runner4_Img=loadImage("images/g4.jpg")
  runnerTrack_Img=loadImage("images/runnerTrack.png")
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
}
