var choose=document.getElementById("choose");
var restart=document.getElementById("restart");
	restart.onclick=function(){
		window.location.reload(true);
	}

var openAI=document.getElementById("openAI");
openAI.onclick=function(){
	//window.location.reload(true);
	canvas.addEventListener('click',addchess,false);
	choose.style.display="none";
	canvas.style.display="block";
}
var closeAI=document.getElementById("closeAI");
closeAI.onclick=function(){
	canvas.removeEventListener('click',addchess,false);
	canvas.addEventListener('click',oneperson,false);
	choose.style.display="none";
	canvas.style.display="block";
    
	//window.location.reload(true);
}


function oneperson(e)
{   
	if (over==true) {
		//context.clearRect(0,0,window.innerWidth,window.innerheight);
		window.location.reload(true);//重新刷新
		return;
	}
	// if (!chesscolor) {
	// 	return;//不是我下棋
	// }
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if (chess[i][j]==0){
	onestep(i,j,chesscolor);
	chess[i][j]=1;
	if (chesscolor) {//当只有黑子的时候进行判断
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
 }else{
 	for (var k = 0;k<count;k++) {
    	if (wins[i][j][k]) {
    		computerwin[k]++;
    		mywin[k]=6;
             
    		if (computerwin[k]==5) 
    		{
    			alert("you lose!");
    	        over=true;
    	    }
    	}
    }
 }
 	if(!over)
    	{
    	   chesscolor=!chesscolor;	
          // computerAI();//棋子变色，我不能下子，电脑下子。下完棋子再变色。结束即退出
    	}
    }
 }    