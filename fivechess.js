var canvas=document.getElementById("chess");
var context=canvas.getContext("2d");
var chesscolor=true;
var chess=[];
for (var i = 0; i < 15; i++) {
	chess[i]=[];
	for(j=0;j<15;j++)
	{
		chess[i][j]=0;
	}
}

context.strokeStyle="#bfbfbf";

var logo=new Image();
logo.src="Ts.png";

window.onload=function(){
context.drawImage(logo,70,70,300,300);
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

canvas.onclick=function(e)
{
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if (chess[i][j]==0) {
	onestep(i,j,chesscolor);
	if(chesscolor)
	{
		chess[i][j]=1;
	}
	else
	{
		chess[i][j]=2;
	}
	}
	chesscolor=!chesscolor;

}



