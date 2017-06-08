var variables;
var gridSize;
var gridLinesHorizontal;
var gridLinesVertical;
var grid;
var gridIdx;
var addedEntities;
var labels;
var low;
var medium;
var mid;
var high;
var walls;
var xOffset;
var yOffset;
var lossTextDisplayed;
var goals;
var e1;
var e2;
var r1;
function preload(){
	game.load.image('e1','assets/sprites/circle.png');
};

function create(){
	variables={'confidence':'5','optimism':'2','difficulty':'3'};
	gridSize=30;
	gridLinesHorizontal=Math.floor((game.width-1)/gridSize);
	gridLinesVertical=Math.floor((game.height-1)/gridSize);
	grid=initGrid();
	gridIdx=0;
	addedEntities={};
	labels={};
	low=1;
	medium=6;
	mid=medium;
	high=11;
	xOffset=50;
	yOffset=50;
	lossTextDisplayed=false;
	goals=[];

	e1=game.add.physicsGroup();
	addedEntities['e1']=e1;
	initEntityProperties(e1);

	e2=game.add.physicsGroup();
	addedEntities['e2']=e2;
	initEntityProperties(e2);
	r1=0;

	graphics = game.add.graphics( 0,0);
	graphics.beginFill(0x000000);
	graphics.drawRoundedRect(xOffset,yOffset, 400, 300, 10);
	graphics.endFill();
	graphics.alpha = 0.2;

	setUpWalls();

	var x=300+ xOffset;var y=50+ yOffset;for (var ii = 0; ii < 1; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		initEntity(addedEntities['e1'].create(x,y,'e1'));
		updateGrid();
		}
	
	
	var barConfig0 = createProgressBarConfig(r1, 0, labels['r1']);
	this.resourceBar0 = new HealthBar(this.game, barConfig0)
	addBarLabel(barConfig0, 0, labels['r1']);
	
	var percent0 = r1/10;
	percent0 = percent0 * 100;
	this.resourceBar0.setPercentNow(percent0);
	};

function update(){
	for(var k in addedEntities) {if (addedEntities.hasOwnProperty(k)) {
		var entity = addedEntities[k];
		entity.forEach(function(item) {
		item.body.velocity.x *= 0.9;
		item.body.velocity.y *= 0.9;
		}, this);
	}}

	addedEntities['e1'].forEach(function(item){item.health = item.health-1; console.log(item.health)}, this);
	if(r1>=40){
		addedEntities['e_1_XX_'].forEach(function(item) {
		var tempPoint = new Phaser.Point(game.input.mousePointer.x-item.x,game.input.mousePointer.y-item.y);
		tempPoint.normalize();
		tempPoint.x *= 10;
		tempPoint.y *= 10;
		move_away(item, tempPoint);
}, this);

		}

	game.physics.arcade.collide(e1,walls,null,null,this);
	game.physics.arcade.collide(e2,walls,null,null,this);
	addedEntities['e1'].forEach(function(item){item.tint=0x00ff00;}, this);
	for(var k in addedEntities) {if (addedEntities.hasOwnProperty(k)) {
		var entity = addedEntities[k];
		entity.forEach(function(item) {
		item.body.velocity.clamp(-300,300);
			if(item.x>game.width){item.x=game.width;}if (item.x<0){item.x=0;} if (item.y>game.height){item.y=game.height;}if (item.y<0){item.y=0;}
		if(item.deleted){item.destroy();}
		}, this);
	}}

	if(r1 > 10){
		r1 = 10;
	}
	else if (r1 < 0 ){
		r1 = 0;
	}
	
	var percent0 = r1/10;
	percent0 = percent0 * 100;
	this.resourceBar0.setPercent(percent0);
	};

function render(){};

function setVariable(varName,value){
	variables[varName]=value;
	State.set(varName, value.toFixed(1));
	Display.setAvatar(State);
	Display.setStats('storyStats');
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

function updateGrid(sprite){
	gridIdx++;
	if(gridIdx===grid.length){gridIdx=0;shuffle(grid);}
};

function shuffle(a){
	var j,x,i;
	for(i=a.length;i;i--){j=Math.floor(Math.random()*i);x=a[i-1];a[i-1]=a[j];a[j]=x;}
};

function move_towards(e,dir){
	e.body.velocity.x += dir.x;
	e.body.velocity.y += dir.y;
};

function move_away(e,dir){
	e.body.velocity.x -= dir.x;
	e.body.velocity.y -= dir.y;
};

function moves(e,x,y){
	e.body.velocity.x += x;
	e.body.velocity.y += y;
};

function move_forward(e,amount){
	var newV = game.physics.arcade.velocityFromRotation(e.rotation,amount);
	e.body.velocity.x += newV.x;
	e.body.velocity.y += newV.y;
};

function move_left(e,amount){
	var newV = game.physics.arcade.velocityFromRotation(e.rotation-Math.PI*0.5,amount);
	e.body.velocity.x += newV.x;
	e.body.velocity.y += newV.y;
};

function move_right(e,amount){
	var newV = game.physics.arcade.velocityFromRotation(e.rotation+Math.PI*0.5,amount);
	e.body.velocity.x += newV.x;
	e.body.velocity.y += newV.y;
};

function move_backward(e,amount){
	var newV = game.physics.arcade.velocityFromRotation(e.rotation-Math.PI,amount);
	e.body.velocity.x += newV.x;
	e.body.velocity.y += newV.y;
};

function initEntityProperties(group){
	group.forEach(function(item) {
	item.deleted=false;
	item.body.collideWorldBounds = true;
	item.anchor.x = 0.5;
	item.anchor.y = 0.5;
	item.rotation = 0;
	if (!item.body.velocity.hasOwnProperty('x')){item.body.velocity.x=0;}
	if (!item.body.velocity.hasOwnProperty('y')){item.body.velocity.y=0;}
	if (!item.body.hasOwnProperty('angularVelocity')){item.body.angularVelocity=0;}
	}, this);
};

function initEntity(item){
	item.deleted=false;
	item.body.collideWorldBounds = true;
	item.anchor.x = 0.5;
	item.anchor.y = 0.5;
	item.rotation = 0;
	if (!item.body.velocity.hasOwnProperty('x')){item.body.velocity.x=0;}
	if (!item.body.velocity.hasOwnProperty('y')){item.body.velocity.y=0;}
	if (!item.body.hasOwnProperty('angularVelocity')){item.body.angularVelocity=0;}
};

function changeMode(newMode){
	if(newMode==='game_win'){
	 mode = 'win';
	 game.world.removeAll();
	 displayText('CLEARED');
	}
	else if(newMode==='game_loss'){
	 mode='loss';
	 game.stage.backgroundColor = '#400';
	 if(!lossTextDisplayed){
	   displayText('(Loss State Reached)');
	   lossTextDisplayed=true
	 }
	}
};

function displayText(t){
	var style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle'};
	text = game.add.text(0, 0, t, style);
};

function getAspGoals(){
	if (goals === undefined || goals.length == 0){return ['No ASP goals.'];}
	else{return goals;}
};

function setUpWalls(){
	walls = game.add.physicsGroup();
	var wall1 = walls.create(-100+xOffset,yOffset);
	wall1.width = 100;
	wall1.height = 1000;
	var wall2 = walls.create(xOffset,yOffset-100);
	wall2.width = 4000;
	wall2.height = 100;
	var wall3 = walls.create(400+xOffset,yOffset);
	wall3.width = 100;
	wall3.height = 3000;
	var wall4 = walls.create(xOffset,300+yOffset);
	wall4.width = 4000;
	wall4.height = 100;
	wall1.body.immovable = true;
	wall2.body.immovable = true;
	wall3.body.immovable = true;
	wall4.body.immovable = true;
};

function createProgressBarConfig(resourceValue,resourceCount,label){
	var barConfig = {};
	var barHeight = 18;
	var barWidth = 150;
	barConfig.height = barHeight;
	barConfig.width = barWidth;
	barConfig.x = 100 + (10 * resourceCount) + (barWidth * resourceCount);
	barConfig.y = 10;
	barConfig.bg = {};
	barConfig.bg.color = '#ffffff';
	barConfig.bar = {};
	barConfig.bar.color = '#ff00ff';
	return barConfig;
};

function addBarLabel(barConfig,resourceCount,label){
	var barWidth = 100;
	var barHeight = 40;
	var startX = barConfig.x;
	var startY = barConfig.y + 2;
	if(label !== undefined){
	  text = game.add.text(startX, startY, label);
	  text.anchor.set(0.5,0.5);
	  text.align = 'center';
	  //  Font style
	  text.font = 'Arial Black';
	  text.fontSize =16;
	  text.fontWeight = 'bold';
	  //text.width = barWidth;
	  //text.height = barHeight;
	  //  Stroke color and thickness
	  text.stroke = '#000000';
	  text.strokeThickness = 1;
	  text.fill = '#000000';
	}
};


