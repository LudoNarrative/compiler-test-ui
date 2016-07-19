var variables;
var gridSize;
var gridLinesHorizontal;
var gridLinesVertical;
var grid;
var gridIdx;
var addedEntities;
var low;
var medium;
var mid;
var high;
var goals;
var e1;
var e2;
var r1;
var r2;
function preload(){
	game.load.image('e1','assets/sprites/circle.png');

	game.load.image('e2','assets/sprites/square.png');
};

function create(){
	variables={'confidence':'5','optimism':'2','difficulty':'3'};
	gridSize=30;
	gridLinesHorizontal=Math.floor((game.width-1)/gridSize);
	gridLinesVertical=Math.floor((game.height-1)/gridSize);
	grid=initGrid();
	gridIdx=0;
	addedEntities={};
	low=1;
	medium=6;
	mid=medium;
	high=11;
	goals=[];
	r1=high;
	r2=0;
  document.getElementById("r1").innerHTML = r1;
	document.getElementById("r2").innerHTML = r2;

	e1=addAtRandomPoint('e1');

	addedEntities['e1']=e1;
	initEntityProperties('e1');

	e2=addAtRandomPoint('e2');

	addedEntities['e2']=e2;
	initEntityProperties('e2');

	e1.inputEnabled=true;
	e1.events.onInputDown.add(e1ClickListener,this);

	e2.inputEnabled=true;
	e2.events.onInputDown.add(e2ClickListener,this);
};

function update(){
	r2=r2+r1;

	r1=r1-low;

  document.getElementById("r1").innerHTML = r1;
	document.getElementById("r2").innerHTML = r2;

	if(r1<=medium){
		// changeMode('game_loss');
		}

	var tempPoint = new Phaser.Point(e2.x-e1.x,e2.y-e1.y);
	tempPoint.normalize();
	move_towards(e1, tempPoint);

	var tempPoint = new Phaser.Point(game.input.mousePointer.x-e2.x,game.input.mousePointer.y-e2.y);
	tempPoint.normalize();
	move_towards(e2, tempPoint);

	for(var k in addedEntities) {if (addedEntities.hasOwnProperty(k)) {
		var entity = addedEntities[k];
		entity.directionChange.clamp(-1,1);
		entity.x+=entity.directionChange.x;
		entity.y+=entity.directionChange.y;
	if(entity.x>game.width){entity.x=game.width;}if (entity.x<0){entity.x=0;} if (entity.y>game.height){entity.y=game.height;}if (entity.y<0){entity.y=0;}
	}}
};

function render(){};

function e1ClickListener(){
	if(r2<=high){
		r1=r1+medium;
		}
  document.getElementById("r1").innerHTML = r1;
	document.getElementById("r2").innerHTML = r2;
  document.getElementById("click").innerHTML = "Entity e1 clicked!  r1=r1+medium if r2<=high.";
};

function e2ClickListener(){
	r1=r1-r2;
	r2=r2-medium;
  document.getElementById("r1").innerHTML = r1;
	document.getElementById("r2").innerHTML = r2;
  document.getElementById("click").innerHTML = "Entity e2 clicked! r1=r1-r2. r2=r2-medium.";	
};

function setVariable(varName,value){
	variables[varName]=value;
	State.set(varName, value);
	StoryAssembler.refreshNarrative();
	Display.setAvatar(State);
};

function getVariable(varName){
	return variables[varName];
};

function getRandomPoint(){
	var x=game.rnd.integerInRange(0,game.world.width-1);
	var y=game.rnd.integerInRange(0,game.world.height-1);
	return new Phaser.Point(x,y);
};

function initGrid(){
	grid=[];
	for(var i=0;i<gridLinesHorizontal;i++){for(var j=0;j<gridLinesVertical;j++){grid.push(new Phaser.Point(i*gridSize,j*gridSize));}}
	shuffle(grid);
	return grid;
};

function addAtRandomPoint(sprite){
	var spawned=addAtPos(grid[gridIdx], sprite);
	gridIdx++;
	if(gridIdx===grid.length){gridIdx=0;shuffle(grid);}
	return spawned;
};

function addAtPos(point,sprite){
	return game.add.sprite(point.x,point.y,sprite);
};

function shuffle(a){
	var j,x,i;
	for(i=a.length;i;i--){j=Math.floor(Math.random()*i);x=a[i-1];a[i-1]=a[j];a[j]=x;}
};

function move_towards(e,dir){
	e.directionChange.x += dir.x;
	e.directionChange.y += dir.y;
};

function move_away(e,dir){
	e.directionChange.x -= dir.x;
	e.directionChange.y -= dir.y;
};

function move(e,x,y){
	e.directionChange.x += x;
	e.directionChange.y += y;
};

function move_forward(e,amount){
	e.directionChange += Phaser.Physics.Arcade.velocityFromRotation(e.rotation, Amount);
};

function move_left(e,amount){
	e.directionChange += Phaser.Physics.Arcade.velocityFromRotation(e.rotation+Phaser.Math.PI*0.5, Amount);
};

function move_right(e,amount){
	e.directionChange += Phaser.Physics.Arcade.velocityFromRotation(e.rotation-Phaser.Math.PI*0.5, Amount);
};

function move_backward(e,amount){
	e.directionChange += Phaser.Physics.Arcade.velocityFromRotation(e.rotation-Phaser.Math.PI, Amount);
};

function initEntityProperties(eName){
	game.physics.arcade.enable(addedEntities[eName]);
	addedEntities[eName].body.collideWorldBounds = true;
	if (!addedEntities[eName].body.velocity.hasOwnProperty('x')){addedEntities[eName].body.velocity.x=0;}
	if (!addedEntities[eName].body.velocity.hasOwnProperty('y')){addedEntities[eName].body.velocity.y=0;}
	if (!addedEntities[eName].body.hasOwnProperty('angularVelocity')){addedEntities[eName].body.angularVelocity=0;}
	if (!addedEntities[eName].hasOwnProperty('directionChange')){addedEntities[eName].directionChange=new Phaser.Point(0,0);}
};

function changeMode(newMode){
	if(newMode==='game_win'){mode = 'win'; game.world.removeAll(); displayText('CLEARED');}
	else if(newMode==='game_loss'){mode='loss'; game.world.removeAll(); displayText('GAME OVER');}
};

function displayText(t){
	var style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle'};
	text = game.add.text(0, 0, t, style);
};

function getAspGoals(){
	if (goals === undefined || goals.length == 0){return ['No ASP goals.'];}
	else{return goals;}
};

goals=['Prevent:[r1] le [medium]','Maintain r1'];
