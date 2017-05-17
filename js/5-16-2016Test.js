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
var goals;
var e1;
var e2;
var e3;
var r1;
function preload(){
	game.load.image('e1','assets/sprites/square.png');

	game.load.image('e2','assets/sprites/triangle.png');

	game.load.image('e3','assets/sprites/square.png');
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
	goals=[];

	graphics = game.add.graphics( 0,0);
	graphics.beginFill(0x000000);
	graphics.drawRoundedRect(xOffset,yOffset, 400, 300, 10);
	graphics.endFill();
	graphics.alpha = 0.2;

	e1=game.add.physicsGroup();
	addedEntities['e1']=e1;
	initEntityProperties(e1);

	e2=game.add.physicsGroup();
	addedEntities['e2']=e2;
	initEntityProperties(e2);

	e3=game.add.physicsGroup();
	addedEntities['e3']=e3;
	initEntityProperties(e3);
	r1=11;



	setUpWalls();

	var x=300+ xOffset;var y=50+ yOffset;for (var ii = 0; ii < 2; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e1'].create(x,y,'e1');
		updateGrid();
		initEntityProperties(addedEntities['e1']);
	}
	var x=300+ xOffset;var y=250+ yOffset;for (var ii = 0; ii < 2; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e1'].create(x,y,'e1');
		updateGrid();
		initEntityProperties(addedEntities['e1']);
	}
	var x=50+ xOffset;var y=50+ yOffset;for (var ii = 0; ii < 2; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e2'].create(x,y,'e2');
		updateGrid();
		initEntityProperties(addedEntities['e2']);
	}
	var x=50+ xOffset;var y=250+ yOffset;for (var ii = 0; ii < 2; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e2'].create(x,y,'e2');
		updateGrid();
		initEntityProperties(addedEntities['e2']);
	}
	var x=190+ xOffset;var y=50+ yOffset;for (var ii = 0; ii < 10; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e3'].create(x,y,'e3');
		updateGrid();
		initEntityProperties(addedEntities['e3']);
	}
	var x=190+ xOffset;var y=250+ yOffset;for (var ii = 0; ii < 10; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e3'].create(x,y,'e3');
		updateGrid();
		initEntityProperties(addedEntities['e3']);
	}
	
	
	
	
	
	
	game.time.events.loop(Phaser.Timer.SECOND*2, t1_t1Listener, this);

	addedEntities['e3'].forEach(function(item){item.body.immovable=true;}, this);};

function update(){
	for(var k in addedEntities) {if (addedEntities.hasOwnProperty(k)) {
		var entity = addedEntities[k];
		entity.forEach(function(item) {
		item.body.velocity.x *= 0.9;
		item.body.velocity.y *= 0.9;
		}, this);
	}}

	r1=r1-1*this.game.time.elapsed/10000.0;

	if (!game.physics.arcade.overlap(addedEntities['e1'],addedEntities['e2'],null,null, this)){o1NotOverlapHandler();}
	if(game.input.activePointer.leftButton.isDown){
		r1=r1+6*this.game.time.elapsed/10000.0;

	addedEntities['e2'].forEach(function(item){item.angle += 10;}, this);
		}

	if(game.input.activePointer.leftButton.isDown){
		addedEntities['e1'].forEach(function(item) {
		var tempPoint = new Phaser.Point(game.input.mousePointer.x-item.x,game.input.mousePointer.y-item.y);
		tempPoint.normalize();
		tempPoint.x *= 10;
		tempPoint.y *= 10;
		move_towards(item, tempPoint);
}, this);

		}

	if(r1<=0){
		changeMode('game_loss');

		}

	addedEntities['e2'].forEach(function(item) {
		move_forward(item,10);
}, this);

	game.physics.arcade.collide(e1,walls,null,null,this);
	game.physics.arcade.collide(e2,walls,null,null,this);
	game.physics.arcade.collide(e3,walls,null,null,this);
	addedEntities['e1'].forEach(function(item){item.tint=0xff0000;}, this);
	addedEntities['e2'].forEach(function(item){item.tint=0x0000ff;}, this);
	game.physics.arcade.collide(e1,e3,null,null,this);
	game.physics.arcade.collide(e3,e2,null,null,this);
	for(var k in addedEntities) {if (addedEntities.hasOwnProperty(k)) {
		var entity = addedEntities[k];
		entity.forEach(function(item) {
		item.body.velocity.clamp(-300,300);
			if(item.x>game.width){item.x=game.width;}if (item.x<0){item.x=0;} if (item.y>game.height){item.y=game.height;}if (item.y<0){item.y=0;}
		if(item.deleted){item.destroy();}
		}, this);
	}}

	updateProgressBar(r1, 0, labels['r1']);
	};

function render(){};

function t1_t1Listener(){
	r1=11;

	addedEntities['e2'].forEach(function(item){item.angle += 10;}, this);
		
};

function o1NotOverlapHandler(){
	if(game.input.activePointer.leftButton.isDown){
		r1=r1-1*this.game.time.elapsed/10000.0;

		}
};

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

function changeMode(newMode){
	if(newMode==='game_win'){mode = 'win'; game.world.removeAll(); displayText('CLEARED');}
	else if(newMode==='game_loss'){mode='loss'; game.stage.backgroundColor = '#400';}
};

function displayText(t){
	var style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle'};
	text = game.add.text(0, 0, t, style);
};

function getAspGoals(){
	if (goals === undefined || goals.length == 0){return ['No ASP goals.'];}
	else{return goals;}
};

function updateProgressBar(resourceValue,resourceCount,label){
	/*console.log('Updating ' + label + ' progress bar for resource number ' + resourceCount + '(' + resourceValue + ')');*/
	/*Establish some variables for easy tuning*/
	var barHeight = 18;
	var barWidth  = 100;
	var startX = 10 + (10 * resourceCount) + (barWidth * resourceCount);
	var startY = 10;
	var maxBarColor = '#ffffff';
	var currentBarColor = '#ff00ff'
	if(resourceCount === 0) {currentBarColor = '#ff0000'} else if(resourceCount === 1) {currentBarColor = '#00ff00';} else if(resourceCount === 2){currentBarColor = '#0000ff';}
	/*console.log('here is barColor: ' , currentBarColor);*/
	/*Draw the 'max' bar to the screen*/
	var resourceMaxBar;
	var maxBarWidth = barWidth;
	var maxBarHeight = barHeight;
	var maxBarBitmapData = game.add.bitmapData(maxBarWidth,maxBarHeight);
	maxBarBitmapData.ctx.beginPath();
	maxBarBitmapData.boundsPadding = 0;
	maxBarBitmapData.ctx.rect(0,0,maxBarWidth,maxBarHeight);
	maxBarBitmapData.ctx.fillStyle = maxBarColor;
	maxBarBitmapData.ctx.fill();
	resourceMaxBar = game.add.sprite(startX,startY,maxBarBitmapData);
	resourceMaxBar.anchor.setTo(0.0,0.5);
	/*Draw the 'current' bar to the screen*/
	var resourceCurrentBar;
	var currentBarWidth = resourceValue * 10;
	if(currentBarWidth > 100) {currentBarWidth = 100;} else if(currentBarWidth < 0){ currentBarWidth = 0;}
	var currentBarHeight = barHeight
	var currentBarBitmapData = game.add.bitmapData(currentBarWidth,currentBarHeight);
	currentBarBitmapData.ctx.beginPath();
	currentBarBitmapData.boundsPadding = 0;
	currentBarBitmapData.ctx.rect(0,0,currentBarWidth,currentBarHeight);
	currentBarBitmapData.ctx.fillStyle = currentBarColor;
	currentBarBitmapData.ctx.fill();
	resourceCurrentBar = game.add.sprite(startX,startY,currentBarBitmapData);
	resourceCurrentBar.anchor.setTo(0.0, 0.5);
	/*Display Label*/
	if(label !== undefined){
	text = game.add.text(startX + 10, 0, label);
	text.setTextBounds(0,0,barWidth,barHeight);
	text.anchor.set(0.0);
	text.align = 'center';
	//  Font style
	text.font = 'Arial Black';
	text.fontSize =14;
	//text.fontWeight = 'bold';
	text.fontWeight = 'normal';
	text.width = barWidth;
	//  Stroke color and thickness
	text.stroke = '#000000';
	text.strokeThickness = 3;
	text.fill = '#556b2f';
	}
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


