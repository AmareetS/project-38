class Game {
  constructor(){}
  

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    runner1 = createSprite(width-30,height-200);
     runner1.addImage(runner1_Img);
    runner2 = createSprite(width-30,height-400);
    runner2.addImage(runner2_Img);
//runner3 = createSprite(400,600);
//    runner3.addImage(runner3_Img);
//    runner4 = createSprite(400,800);
//    runner4.addImage(runner4_Img);
    runners = [runner1, runner2];
    
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
    image(runnerTrack_Img, -displayWidth*4,0,displayWidth*5, displayHeight);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var y = 0;
      var x;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 200;
        //use data form the database to display the cars in y direction
        x = displayHeight - allPlayers[plr].distance;
        runners[index-1].y = y;
        runners[index-1].x = x;

        if (index === player.index){
          runners[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = runners[index-1].x
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    drawSprites();
  }
}
