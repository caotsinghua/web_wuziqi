
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
}