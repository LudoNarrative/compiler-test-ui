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
var e3;
var r1;
function preload(){
	game.load.image('e1','assets/sprites/square.png');

	game.load.image('e2','assets/sprites/circle.png');

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
	low=1;
	medium=6;
	mid=medium;
	high=11;
	goals=[];

	e1=game.add.physicsGroup();
	addedEntities['e1']=e1;
	initEntityProperties(e1);

	e2=game.add.physicsGroup();
	addedEntities['e2']=e2;
	initEntityProperties(e2);

	e3=game.add.physicsGroup();
	addedEntities['e3']=e3;
	initEntityProperties(e3);
	r1=high;

	var x=300;var y=50;for (var ii = 0; ii < 2; ii++){
		x+=(Math.random() * 100)-50;
		y+=(Math.random() * 100)-50;
		addedEntities['e1'].create(x,y,'e1');
		updateGrid();
		initEntityProperties(addedEntities['e1']);
	}
	var x=300;var y=250;for (var ii = 0; ii < 2; ii++){
		x+=(Math.random() * 100)-50;
		y+=(Math.random() * 100)-50;
		addedEntities['e1'].create(x,y,'e1');
		updateGrid();
		initEntityProperties(addedEntities['e1']);
	}
	var x=50;var y=50;for (var ii = 0; ii < 2; ii++){
		x+=(Math.random() * 100)-50;
		y+=(Math.random() * 100)-50;
		addedEntities['e2'].create(x,y,'e2');
		updateGrid();
		initEntityProperties(addedEntities['e2']);
	}
	var x=50;var y=250;for (var ii = 0; ii < 2; ii++){
		x+=(Math.random() * 100)-50;
		y+=(Math.random() * 100)-50;
		addedEntities['e2'].create(x,y,'e2');
		updateGrid();
		initEntityProperties(addedEntities['e2']);
	}
	var x=190;var y=50;for (var ii = 0; ii < 10; ii++){
		x+=(Math.random() * 100)-50;
		y+=(Math.random() * 100)-50;
		addedEntities['e3'].create(x,y,'e3');
		updateGrid();
		initEntityProperties(addedEntities['e3']);
	}
	var x=190;var y=250;for (var ii = 0; ii < 10; ii++){
		x+=(Math.random() * 100)-50;
		y+=(Math.random() * 100)-50;
		addedEntities['e3'].create(x,y,'e3');
		updateGrid();
		initEntityProperties(addedEntities['e3']);
	}






	addedEntities['e3'].forEach(function(item){item.immovable=true;}, this);};

function update(){
	r1=r1-low*this.game.time.elapsed/10000.0;

	game.physics.arcade.overlap(addedEntities['e1'],addedEntities['e2'],o3OverlapHandler,null, this);
	game.physics.arcade.overlap(addedEntities['e1'],addedEntities['e2'],o1OverlapHandler,null, this);
	if(game.input.activePointer.leftButton.isDown){
		addedEntities['e1'].forEach(function(item) {
		var tempPoint = new Phaser.Point(game.input.mousePointer.x-item.x,game.input.mousePointer.y-item.y);
		tempPoint.normalize();
		tempPoint.x *= 100;
		tempPoint.y *= 100;
		item.body.velocity.x *= 0.1;
		item.body.velocity.y *= 0.1;
		move_towards(item, tempPoint);
}, this);

		}

	if(r1<=0){
		changeMode('game_loss');

		}

	addedEntities['e2'].forEach(function(item) {
		move_forward(item,1);
}, this);

	addedEntities['e1'].forEach(function(item){item.tint=0x00ff00;}, this);
	addedEntities['e2'].forEach(function(item){item.tint=0x0000ff;}, this);
	game.physics.arcade.collide(e1,e1,null,null,this);
	game.physics.arcade.collide(e1,e2,null,null,this);
	game.physics.arcade.collide(e1,e3,null,null,this);
	game.physics.arcade.collide(e2,e2,null,null,this);
	game.physics.arcade.collide(e2,e3,null,null,this);
	for(var k in addedEntities) {if (addedEntities.hasOwnProperty(k)) {
		var entity = addedEntities[k];
		entity.forEach(function(item) {
		item.body.velocity.clamp(-300,300);
			if(item.x>game.width){item.x=game.width;}if (item.x<0){item.x=0;} if (item.y>game.height){item.y=game.height;}if (item.y<0){item.y=0;}
		}, this);
	}}
};

function render(){};

function o3OverlapHandler(e1,e2){


	if(game.input.activePointer.leftButton.isDown){
		r1=r1+medium*this.game.time.elapsed/10000.0;

		}
};

function o1OverlapHandler(e1,e2){


	if(game.input.activePointer.leftButton.isDown){
		r1=r1-low*this.game.time.elapsed/10000.0;

		}
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

goals=['Prevent:[r1] le [0]','Maintain r1'];
