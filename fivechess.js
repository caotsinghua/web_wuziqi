var canvas=document.getElementById("chess");
var context=canvas.getContext("2d");
var chesscolor=true;
var chess=[];
var over=false;


//赢法
var wins=[];
//赢法统计数组
var mywin=[];
var computerwin=[];
for (var i = 0; i < 15; i++) {
	wins[i]=[];
	for (var j = 0; j < 15; j++) {
		wins[i][j]=[];//三维数组
	}
}
var count=0;

for (var i = 0; i <15; i++) {
	for (var j = 0; j < 11; j++) {
		for(var k=0;k<5;k++)
		{
			wins[i][j+k][count]=true;
		}
		count++;
	}	
}//横着赢法
for (var i = 0; i <11; i++) {
	for (var j = 0; j < 15; j++) {
		for(var k=0;k<5;k++)
		{
			wins[i+k][j][count]=true;
		}
		count++;
	}
}//shu着赢法

for (var i = 0; i < 11; i++) {
	for(var j=14;j>3;j--)
	{
		for(var k=0;k<5;k++ )
		{
			wins[i+k][j-k][count]=true;
		}
		count++;//所有反斜线赢法
	}
}
for (var i = 0; i < 11; i++) {
	for(var j=0;j<11;j++)
	{
		for(var k=0;k<5;k++ )
		{
			wins[i+k][j+k][count]=true;
		}
		count++;//所有正斜线赢法
	}
}
console.log(count);
for (var i = 0; i < count; i++) {
	mywin[i]=0;
	computerwin[i]=0;
}//初始



for (var i = 0; i < 15; i++) {
	chess[i]=[];
	for(j=0;j<15;j++)
	{
		chess[i][j]=0;
	}
}

context.strokeStyle="#000";

// var logo=new Image();
// logo.src="Ts.png";

window.onload=function(){
// context.drawImage(logo,70,70,300,300);
drawChessBoard();

}



function drawChessBoard()
{
	for (var i = 0; i < 15; i++) {

		context.moveTo(15+i*30,15);
	    context.lineTo(15+i*30,450-15);

	    context.stroke();//竖线

	    context.moveTo(15,15+i*30);
	    context.lineTo(450-15,15+i*30);
	    context.stroke();//横线
	}
}

var onestep=function(i,j,chesscolor)
{
	context.beginPath();
	context.arc(15+i*30,15+j*30,12,0,2*Math.PI);
	var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,10,17+i*30,13+j*30,3);
	if(chesscolor){
	gradient.addColorStop(0,"#0a0a0a");
	gradient.addColorStop(1,"#636766");
    }else{
    gradient.addColorStop(0,"#d1d1d1");
	gradient.addColorStop(1,"#f9f9f9");
    }
	context.fillStyle=gradient;
	context.closePath();
	context.fill();
}
//canvas.addEventListener('click',addchess,false);

function addchess(e)
{   
	if (over==true) {
		//context.clearRect(0,0,window.innerWidth,window.innerheight);
		window.location.reload(true);//重新刷新
		return;
	}
	if (!chesscolor) {
		return;//不是我下棋
	}
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if (chess[i][j]==0){
	onestep(i,j,chesscolor);
	chess[i][j]=1;
	//if (chesscolor) {//当只有黑子的时候进行判断
    for (var k = 0;k<count;k++) {
    	if (wins[i][j][k]) {
    		mywin[k]++;
    		computerwin[k]=6;
             
    		if (mywin[k]==5) 
    		{
    			alert("youwin!");
    	        over=true;
    	    }
    	}
    }
//}
 	if(!over)
    	{
    	   chesscolor=!chesscolor;	
           computerAI();//棋子变色，我不能下子，电脑下子。下完棋子再变色。结束即退出
    	}
    }
 }    

var computerAI=function(){
     var myScore=[];
     var computerScore=[];
     var max=0;
     var u=0,v=0;
     for (var i = 0; i < 15; i++) {
     	myScore[i]=[];
     	computerScore[i]=[];
     	for(var j=0;j<15;j++)
     	{
     		myScore[i][j]=0;
     		computerScore[i][j]=0;
     	}
     }
     for(var i=0;i<15;i++){
     	for(var j=0;j<15;j++)
     	{
     		if (chess[i][j]==0) {//尚未下子
     			for(var k=0;k<count;k++)
     			{
     				if(wins[i][j][k]){
     					if(mywin[k]==1)
     					{
     						myScore[i][j]+=200;
     					}else if(mywin[k]==2){
     						myScore[i][j]+=400;
     					}else if(mywin[k]==3){
     						myScore[i][j]+=2000;
     					}else if(mywin[k]==4){
     						myScore[i][j]+=10000;
     					}
     				}
     						if(computerwin[k]==1)
     					{
     						computerScore[i][j]+=220;
     					}else if(computerwin[k]==2){
     						computerScore[i][j]+=420;
     					}else if(computerwin[k]==3){
     						computerScore[i][j]+=2100;
     					}else if(computerwin[k]==4){
     						computerScore[i][j]+=20000;
     					}
     				}
     			}
     			if (myScore[i][j]>max) {
     				max=myScore[i][j];
     				u=i;
     				v=j;
     			}else if (myScore[i][j]==max) {
     				if (myScore[i][j]>computerScore[u][v]) {
     					u=i;
     					v=j;
     				}
     			if (computerScore[i][j]>max) {
     				max=computerScore[i][j];
     				u=i;
     				v=j;
     			}else if (computerScore[i][j]==max) {
     				if (myScore[i][j]>myScore[u][v]) {
     					u=i;
     					v=j;
     				}
     				
     			}
     		}
     	}
     }
     onestep(u,v,false);
     chess[u][v]=2;
     for (var k = 0;k<count;k++) {
    	if (wins[u][v][k]) {
    		computerwin[k]++;
    		mywin[k]=6;
             }
    		if (computerwin[k]==5) 
    		{
    			alert("you lose!");
    	        over=true;
    	        
    	    }
        }
        if(!over)
        chesscolor=!chesscolor;
}


