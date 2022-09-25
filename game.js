
const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");
const reset=document.querySelector("#resetButton");

class SnakePart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }

}




let speed=10; /*refresh rate/speed */
let blockSpeed;
let tileCount=29; /*the game is all about moving objects through tiles in certain directions */
let tileSize= canvas.width/tileCount-2;
let headX=10;
let headY=10;
const snakeParts=[];
let tailLength=2;

let xVelocity=0; //controls 
let yVelocity=0;

let appleX=5;  //food
let appleY=5;

let block1X=30;
let block1Y=30;
let block2X=40;
let block2Y=40;
let block3X=40;
let block3Y=40;

let score=0;



//Game loop - updates the game 

function drawGame(){  //this can be done with "requestAnimationFrame(), setInterval() and setTimeOut(which can affect how often the screen gets updated)" 
changeSnakePosition(); 

let result= isgameOver();

if(result){
    return;
}

clearScreen();    

checkAppleCollision();
drawApple();
drawSnake();
drawScore();


    if(score>4){
        speed=12.5;
        drawBlocks1();
            
        
    }
    if(score>9){
       speed=14;
       drawBlocks2();
    }
    if(score>19){
        speed=16;
        drawBlocks3(); 
    }

// blockX=2; blockY=2;

   setTimeout(drawGame, 1000/speed);   
//ORDER OF FUNCTIONS IS IMPORTANT!!!!!!!!!
}

function isgameOver(){
    
  let gameOver=false;

  //self-collision
  if(xVelocity===0 && yVelocity===0){
    return false;
  }

  //walls

  if(headX<0){
    gameOver=true;

  }

  else if(headX>tileCount +4.9){
    gameOver=true;
  }
  else if(headY<0){
    gameOver=true;
  }
  else if(headY>tileCount +1){
    gameOver=true;
  }

  for(let i=0;i<snakeParts.length;i++){
    let part=snakeParts[i];
    if(part.x===headX && part.y===headY){
         gameOver=true;
         break;
    }
  }

  //blocks
  if(block1X==headX && block1Y==headY){
    
     gameOver=true;
}
if(block2X==headX && block2Y==headY && score>9){
    
    gameOver=true;
}
if(block3X==headX && block3Y==headY){
    
    gameOver=true;
}

  if(gameOver){
    ctx.fillStyle="white";
    ctx.font="50px Verdana";

    ctx.fillText("Game Over!", canvas.width/3, canvas.height/2 );
  }

  return gameOver;
}

function drawScore(){
    ctx.fillStyle="white";
    ctx.font="30px Verdana";
    ctx.fillText("Score "+score,canvas.width-140,35);
    
}

function clearScreen(){
    ctx.fillStyle="#333";
    ctx.fillRect(0,0,canvas.width,canvas.height); //0,0 are the x and y positions, the other 2 are width and height of the element 
}

function drawSnake(){
    

    ctx.fillStyle="green";
    for(let i=0; i<snakeParts.length; i++){
        let part=snakeParts[i];
        ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize,tileSize);
    }

    snakeParts.push(new SnakePart(headX,headY));
    while(snakeParts.length>tailLength){
        snakeParts.shift();
    }
    ctx.fillStyle="orange";
    ctx.fillRect(headX*tileCount, headY*tileCount,tileSize,tileSize);
}

function changeSnakePosition(){
    headX=headX + xVelocity;
    headY=headY + yVelocity;
}

function checkAppleCollision(){
    if(appleX==headX && appleY==headY){
        appleX=Math.floor(Math.random()*tileCount);
        appleY=Math.floor(Math.random()*tileCount);
        tailLength++;
        score++;
        changeBlockPosition1();
      if(score>9){
        changeBlockPosition2();
        
      }
      if(score>19){
        changeBlockPosition3();
      }

    }
}

function drawApple(){
    ctx.fillStyle="red";
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize);
}


//Blocks
function drawBlocks1(){
    ctx.fillStyle="blue";
    ctx.fillRect(block1X*tileCount, block1Y*tileCount, tileSize, tileSize);
    
}

function drawBlocks2(){
    ctx.fillStyle="black";
    ctx.fillRect(block2X*tileCount, block2Y*tileCount, tileSize, tileSize);
}

function drawBlocks3(){
    ctx.fillStyle="purple";
    ctx.fillRect(block3X*tileCount, block3Y*tileCount, tileSize, tileSize);
}



function changeBlockPosition1(){
   
        block1X=Math.floor(Math.random()*tileCount);
        block1Y=Math.floor(Math.random()*tileCount);
}
function changeBlockPosition2(){
   
    block2X=Math.floor(Math.random()*tileCount);
    block2Y=Math.floor(Math.random()*tileCount);
}
function changeBlockPosition3(){
   
    block3X=Math.floor(Math.random()*tileCount);
    block3Y=Math.floor(Math.random()*tileCount);
}




 //controls
 reset.addEventListener("click", resetGame);
document.addEventListener("keydown", keyDown);
function keyDown(event){

    //up
    if(event.keyCode==38){
        if(yVelocity==1){
            return;
        }
        yVelocity=-1;
        xVelocity=0;
    }
     
    //down
    if(event.keyCode==40){
        if(yVelocity==-1){
            return;
        }
        yVelocity=1;
        xVelocity=0;
    }
    //left
    if(event.keyCode==37){
        if(xVelocity==1){
            return;
        }
        yVelocity=0;
        xVelocity=-1;
    }
     //right
     if(event.keyCode==39){
        if(xVelocity== -1){
            return;
        }
        yVelocity=0;
        xVelocity=1;
    }
  }

drawGame();



function resetGame(){
    speed=10;
     headX=10;
     headY=10;
     tailLength=2;
     appleX=5;
     appleY=5;
     xVelocity=0;  
     yVelocity=0;
     score=0;


    drawGame();
}