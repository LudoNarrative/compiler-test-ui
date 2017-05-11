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
var e_1_XX_;
var e_2_XX_;
var r_1_XX_;
function preload(){
	game.load.image('e_2_XX_','assets/sprites/circle.png');

	game.load.image('e_1_XX_','assets/sprites/pentagon.png');
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

	e_1_XX_=game.add.physicsGroup();
	addedEntities['e_1_XX_']=e_1_XX_;
	initEntityProperties(e_1_XX_);

	e_2_XX_=game.add.physicsGroup();
	addedEntities['e_2_XX_']=e_2_XX_;
	initEntityProperties(e_2_XX_);
	r_1_XX_=0;

	var x=50;var y=50;for (var ii = 0; ii < 1; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e_1_XX_'].create(x,y,'e_1_XX_');
		updateGrid();
		initEntityProperties(addedEntities['e_1_XX_']);
	}
	var x=190;var y=50;for (var ii = 0; ii < 1; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e_1_XX_'].create(x,y,'e_1_XX_');
		updateGrid();
		initEntityProperties(addedEntities['e_1_XX_']);
	}
	var x=50;var y=160;for (var ii = 0; ii < 1; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e_1_XX_'].create(x,y,'e_1_XX_');
		updateGrid();
		initEntityProperties(addedEntities['e_1_XX_']);
	}
	var x=300;var y=250;for (var ii = 0; ii < 1; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e_1_XX_'].create(x,y,'e_1_XX_');
		updateGrid();
		initEntityProperties(addedEntities['e_1_XX_']);
	}
	var x=300;var y=50;for (var ii = 0; ii < 1; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e_2_XX_'].create(x,y,'e_2_XX_');
		updateGrid();
		initEntityProperties(addedEntities['e_2_XX_']);
	}
	var x=190;var y=160;for (var ii = 0; ii < 1; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e_2_XX_'].create(x,y,'e_2_XX_');
		updateGrid();
		initEntityProperties(addedEntities['e_2_XX_']);
	}
	var x=300;var y=160;for (var ii = 0; ii < 1; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e_2_XX_'].create(x,y,'e_2_XX_');
		updateGrid();
		initEntityProperties(addedEntities['e_2_XX_']);
	}
	var x=50;var y=250;for (var ii = 0; ii < 1; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e_2_XX_'].create(x,y,'e_2_XX_');
		updateGrid();
		initEntityProperties(addedEntities['e_2_XX_']);
	}
	
	
	
	
	
	
	
	};

function update(){
	for(var k in addedEntities) {if (addedEntities.hasOwnProperty(k)) {
		var entity = addedEntities[k];
		entity.forEach(function(item) {
		item.body.velocity.x *= 0.9;
		item.body.velocity.y *= 0.9;
		}, this);
	}}

	addedEntities['e_1_XX_'].forEach(function(item){
		item.inputEnabled=true;
		item.input.enableDrag(true);
	}, this);

	r_1_XX_=r_1_XX_+1*this.game.time.elapsed/10000.0;

	addedEntities['e_1_XX_'].forEach(function(item){
		item.inputEnabled=true;
		item.events.onInputDown.add(o_1_XX__e_1_XX_ClickListener,this);
	}, this);

	addedEntities['e_2_XX_'].forEach(function(item){
		item.inputEnabled=true;
		item.events.onInputDown.add(o_2_XX__e_2_XX_ClickListener,this);
	}, this);

	game.physics.arcade.overlap(addedEntities['e_1_XX_'],addedEntities['e_2_XX_'],o_3_XX_OverlapHandler,null, this);
	if(r_1_XX_>=10){
		changeMode('game_loss');

		}

	addedEntities['e_2_XX_'].forEach(function(item) {
		move_forward(item,4);
}, this);

	addedEntities['e_1_XX_'].forEach(function(item){item.tint=0x00ff00;}, this);
	addedEntities['e_2_XX_'].forEach(function(item){item.tint=0x00ff00;}, this);
	for(var k in addedEntities) {if (addedEntities.hasOwnProperty(k)) {
		var entity = addedEntities[k];
		entity.forEach(function(item) {
		item.body.velocity.clamp(-300,300);
			if(item.x>game.width){item.x=game.width;}if (item.x<0){item.x=0;} if (item.y>game.height){item.y=game.height;}if (item.y<0){item.y=0;}
		if(item.deleted){item.destroy();}
		}, this);
	}}


	barTesting();



};

function render(){};

function o_1_XX__e_1_XX_ClickListener(){
	var x=50;var y=250;for (var ii = 0; ii < 1; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e_2_XX_'].create(x,y,'e_2_XX_');
		updateGrid();
		initEntityProperties(addedEntities['e_2_XX_']);
	}
		
};

function o_2_XX__e_2_XX_ClickListener(){
	r_1_XX_=r_1_XX_+1;

	var x=300;var y=250;for (var ii = 0; ii < 1; ii++){
		x+=(Math.random() * 30) - 15;
		y+=(Math.random() * 30) - 15;
		addedEntities['e_1_XX_'].create(x,y,'e_1_XX_');
		updateGrid();
		initEntityProperties(addedEntities['e_1_XX_']);
	}
		
};

function o_3_XX_OverlapHandler(e1,e2){
	
	
	r_1_XX_=r_1_XX_-2*this.game.time.elapsed/10000.0;

		
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

function barTesting(){

/////TESTING MAKING RESOURCE BARS
	var resourceOneMaxBar;
	var width1 = 100 // example;
	var height1 = 10 // example;
	var bmd1 = game.add.bitmapData(width1, height1);
	 
	bmd1.ctx.beginPath();
	bmd1.ctx.rect(0, 0, width1, height1);
	bmd1.ctx.fillStyle = '#ffffff';
	bmd1.ctx.fill();
	resourceOneMaxBar = game.add.sprite(10, 10, bmd1);
	resourceOneMaxBar.anchor.setTo(0.5, 0.5);

	var resourceOneCurrentBar;
	var width2 = r_1_XX_ * 20 // example;
	//console.log("Here s current value of r: " , r_1_XX_)
	console.log("mouse (x,y): (" + game.input.mousePointer.x + ", " + game.input.mousePointer.y + ")");
	if(width2 > 100){
		width2 = 100
	}
	else if(width2 < 0){
		console.log("do I even show up here?")
		width2 = 0
	}
	var height2 = 10 // example;
	var bmd2 = game.add.bitmapData(width2, height2);
	 
	bmd2.ctx.beginPath();
	bmd2.boundsPadding = 0;
	bmd2.ctx.rect(0, 0, width2, height2);
	bmd2.ctx.fillStyle = '#ff0000';
	bmd2.ctx.fill();
	resourceOneCurrentBar = game.add.sprite(0, 10, bmd2);
	resourceOneCurrentBar.anchor.setTo(0.0, 0.5);


	//END TESTING MAKING RESOURCE BARS
}


