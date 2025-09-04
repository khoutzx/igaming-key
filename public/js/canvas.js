////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage;
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas",{ antialias: true });
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", tick);	
}

var safeZoneGuide = false;
var canvasContainer, mainContainer, gameContainer, resultContainer, exitContainer, optionsContainer, shareContainer, shareSaveContainer, socialContainer;
var guideline, bg, bgP, logo, logoP;
var itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel;
var itemResult, itemResultP, buttonContinue, resultTitleTxt, resultDescTxt, buttonShare, buttonSave;
var resultTitleOutlineTxt,resultDescOutlineTxt,resultShareTxt,resultShareOutlineTxt,popTitleOutlineTxt,popDescOutlineTxt;
var buttonSettings, buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonMusicOn, buttonMusicOff, buttonExit;
$.share = {};

var backgroundContainer, insertCoinContainer, machineContainer, controlContainer;
var background, insertCoinMachine, insertCoinMask, coin, machine, dropMask, machineGlass, collectArea, collectAreaMask, collectAreaGlass, gridBottom, gridSide, stickMachineMove, stickMachine, stickMachineDetails,  stickPush, btnLeft, btnRight, btnUp, btnPush, stickHit, chainBottom, chainSide, chainMask, resultCon, btnFb, btnTwitter, btnWhatsapp, txtCredit, txtTime, txtPoint, txtPointShadow, txtResultScore, txtResultScoreShadow, insturction;
var controlBoard;
var confirmMessageTxt;
$.grid = {};
$.prize = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    exitContainer = new createjs.Container();
    resultContainer = new createjs.Container();
    shareContainer = new createjs.Container();
    shareSaveContainer = new createjs.Container();
    socialContainer = new createjs.Container();
	
	backgroundContainer = new createjs.Container();
	insertCoinContainer = new createjs.Container();
	machineContainer = new createjs.Container();
	controlContainer = new createjs.Container();
	
	machineContainer.y =  canvasH;
	
	background = new createjs.Bitmap(loader.getResult("background"));
	logo = new createjs.Bitmap(loader.getResult("logo"));
	insertCoinMachine = new createjs.Bitmap(loader.getResult("insertCoinMachine"));
	insertCoinMask = new createjs.Shape();
	coin = new createjs.Bitmap(loader.getResult("coin"));
	
	centerReg(logo);
	centerReg(insertCoinMachine);
	insertCoinMachine.regY = insertCoinMachine.image.naturalHeight;
	logo.x = canvasW/2;
	logo.y = canvasH/100 * 40;
	insertCoinMachine.x = canvasW/2;
	insertCoinMachine.y = canvasH;
	
	centerReg(coin);
	insertCoinMask.alpha = 0;
	insertCoinMask.graphics.beginFill("#ccff00");
	insertCoinMask.graphics.drawRect(0,0,140, 105);
	
	insertCoinMask.x = canvasW/100*48.5;
	insertCoinMask.y = canvasH/100*76;
	coin.mask = insertCoinMask;
	
	insturction = new createjs.Bitmap(loader.getResult("insturction"));
	insturction.alpha = 0;
	machine = new createjs.Bitmap(loader.getResult("machine"));
	machineGlass = new createjs.Bitmap(loader.getResult("machineGlass"));
	machine.x = canvasW/100 * 3.5;
	machineGlass.x = canvasW/100 * 6;
	machineGlass.y = canvasH/100 * 1;
	
	dropMask = new createjs.Shape();
	dropMask.alpha = 0;
	dropMask.graphics.beginFill("#ccff00");
	dropMask.graphics.moveTo(machine.x + 31, machine.y + 763).lineTo(machine.x + 151, machine.y + 834).lineTo(machine.x+571, machine.y+591).lineTo(machine.x+571,machine.y+0).lineTo(machine.x+31,machine.y+0);
	machineContainer.addChild(machine, dropMask);
	
	gridBottom = new createjs.Bitmap(loader.getResult("gridBottom"));
	gridSide = new createjs.Bitmap(loader.getResult("gridSide"));
	
	gridBottom.regX = 94;
	gridBottom.regY = 56;
	
	gridSide.regX = 42;
	gridSide.regY = 149;
	
	var gridCount = 0;
	var gridStartX = 505;
	var gridStartY = 598;
	var gridX = gridStartX;
	var gridY = gridStartY;
	var gridHeight = 125;
	var gridSpaceX = -107;
	var gridSpaceY = 62;
	
	for(var n=0;n<slot_arr.length;n++){
		$.grid['b'+n] = gridBottom.clone();
		$.grid['b'+n].x = gridX;
		$.grid['b'+n].y = gridY;
		
		$.grid['s'+n] = gridSide.clone();
		$.grid['s'+n].x = gridX+52;
		$.grid['s'+n].y = gridY+(-32);
		
		var targetShapeNum = slot_arr[n].shape;
		$.grid['f'+n] = new createjs.Bitmap(loader.getResult("shape_"+targetShapeNum));
		$.grid['f'+n].regX = shape_arr[targetShapeNum].regX;
		$.grid['f'+n].regY = shape_arr[targetShapeNum].regY;
		$.grid['f'+n].x = gridX+shape_arr[targetShapeNum].posX;
		$.grid['f'+n].y = gridY+shape_arr[targetShapeNum].posY;
		
		$.grid['h'+n] = new createjs.Bitmap(loader.getResult("hit_"+targetShapeNum));
		$.grid['h'+n].regX = shape_arr[targetShapeNum].hitRegX;
		$.grid['h'+n].regY = shape_arr[targetShapeNum].hitRegY;
		$.grid['h'+n].x = $.grid['f'+n].x+shape_arr[targetShapeNum].hitPosX;
		$.grid['h'+n].y = $.grid['f'+n].y+shape_arr[targetShapeNum].hitPosY;
		$.grid['h'+n].alpha = 0;
		
		gridX += gridSpaceX;
		gridY += gridSpaceY;
		
		if(gridCount >= 3){
			gridCount = 0;
			gridX = gridStartX;
			gridStartY -= gridHeight;
			gridY = gridStartY;
		}else{
			gridCount++;	
		}
		
		var targetPrizeNum = slot_arr[n].prize;
		if(targetPrizeNum != -1){
			$.prize[n] = new createjs.Bitmap(loader.getResult('obj'+targetPrizeNum));
			$.prize[n].regX = prize_arr[targetPrizeNum].regX;
			$.prize[n].regY = prize_arr[targetPrizeNum].regY;
		}
		
		machineContainer.addChild($.grid['b'+n], $.grid['s'+n], $.grid['f'+n], $.grid['h'+n]);
		
		if(targetPrizeNum != -1){
			machineContainer.addChild($.prize[n]);
			
			var bottomIndex = machineContainer.getChildIndex($.grid['b'+n]);
			$.prize[n].x = $.grid['b'+n].x;
			$.prize[n].y = $.grid['b'+n].y;
			$.prize[n].mask = dropMask;
			machineContainer.setChildIndex($.prize[n], bottomIndex+1);
		}
	}
	
	chainMask = new createjs.Shape();
	chainMask.visible = 0;
	drawChainMask();
	
	chainSide = new createjs.Bitmap(loader.getResult("chainSide"));
	chainBottom = new createjs.Bitmap(loader.getResult("chainBottom"));
	chainSide.regX = 37;
	chainSide.regY = 594;
	
	chainBottom.regX = 417
	chainBottom.regY = 23;
	
	chainBottom.mask = chainMask;
	chainSide.x = chainBottom.x = 692;
	chainSide.y = chainBottom.y = 738;
	
	gamePosData.chainX = chainSide.x;
	gamePosData.chainY = chainSide.y;
	
	stickMachineMove = new createjs.Bitmap(loader.getResult("stickMachineMove"));
	stickMachineDetails = new createjs.Bitmap(loader.getResult("stickMachineDetails"));
	stickMachine = new createjs.Bitmap(loader.getResult("stickMachine"));
	stickPush = new createjs.Bitmap(loader.getResult("stickPush"));
	stickHit = new createjs.Bitmap(loader.getResult("stickHit"));
	stickGuide = new createjs.Bitmap(loader.getResult("stickGuide"));
	stickHit.alpha = 0;
	centerReg(stickHit);
	centerReg(stickGuide);
	
	stickMachineMove.regX = 53;
	stickMachineMove.regY = 43;
	
	stickMachine.regX = stickMachineDetails.regX = 102;
	stickMachine.regY = stickMachineDetails.regY = 75;
	
	stickPush.regX = 81;
	stickPush.regY = 52;
	
	stickMachineMove.x = 680;
	stickMachineMove.y = 720;
	gamePosData.movX = stickMachineMove.x;
	gamePosData.movY = stickMachineMove.y;
	
	stickMachine.x = stickMachineDetails.x = 700;
	stickMachine.y = stickMachineDetails.y = 700;
	
	gamePosData.macX = stickMachine.x;
	gamePosData.macY = stickMachine.y;
	gamePosData.newMacY = stickMachine.y;
	
	stickPush.x = stickMachine.x;
	stickPush.y = stickMachine.y - 30;
	gamePosData.pushX = stickPush.x;
	gamePosData.pushY = stickPush.y;
	
	stickHit.x = stickPush.x - gamePosData.hitX;
	stickHit.y = stickPush.y - gamePosData.hitY;
	
	collectArea = new createjs.Bitmap(loader.getResult("collectArea"));
	collectAreaMask = new createjs.Shape();
	collectAreaMask.alpha = 0;
	collectAreaGlass = new createjs.Bitmap(loader.getResult("collectAreaGlass"));
	
	collectArea.x = canvasW/100 * 60;
	collectArea.y = canvasH/100 * 90;
	collectAreaGlass.x = collectArea.x;
	collectAreaGlass.y = collectArea.y;
	
	collectAreaMask.graphics.beginFill("#ccff00");
	collectAreaMask.graphics.moveTo(collectArea.x + 2, collectArea.y + 94).lineTo(collectArea.x + 145, collectArea.y + 10).lineTo(collectArea.x+145, collectArea.y+146).lineTo(collectArea.x+2,collectArea.y+228);
	
	txtPoint = new createjs.Text();
	txtPoint.font = "200px shumiregular";
	txtPoint.color = "#fff";
	txtPoint.text = '+100';
	txtPoint.textAlign = "center";
	txtPoint.textBaseline='alphabetic';
	txtPoint.x = canvasW/2;
	txtPoint.y = canvasH/100*80;
	
	txtPointShadow = new createjs.Text();
	txtPointShadow.font = "200px shumiregular";
	txtPointShadow.color = "#999";
	txtPointShadow.text = '+100';
	txtPointShadow.textAlign = "center";
	txtPointShadow.textBaseline='alphabetic';
	txtPointShadow.x = canvasW/2;
	txtPointShadow.y = canvasH/100*77.5;
	
	txtPoint.alpha = txtPointShadow.alpha =  0
	
	controlBoard = new createjs.Bitmap(loader.getResult("controlBoard"));
	btnLeft = new createjs.Bitmap(loader.getResult("controlArrow"));
	btnRight = new createjs.Bitmap(loader.getResult("controlArrow"));
	btnUp = new createjs.Bitmap(loader.getResult("controlPush"));
	btnPush = new createjs.Bitmap(loader.getResult("controlPush"));
	
	centerReg(controlBoard);
	controlBoard.regY = controlBoard.image.naturalHeight;
	centerReg(btnLeft);
	centerReg(btnRight);
	centerReg(btnUp);
	centerReg(btnPush);
	
	controlContainer.y = canvasH+200;
	controlBoard.x = canvasW/2;
	controlBoard.y = canvasH;
	
	btnLeft.x = canvasW/100 * 20;
	btnRight.x = canvasW/100 * 33;
	btnRight.scaleX = -1;
	btnUp.x = canvasW/100 * 60;
	btnPush.x = canvasW/100 * 80;
	
	btnLeft.y = btnRight.y = btnUp.y = btnPush.y = canvasH/100 * 94;
	
	txtCredit = new createjs.Text();
	txtCredit.font = "65px digitallregular";
	txtCredit.color = "#FF2929";
	txtCredit.text = '00';
	txtCredit.textAlign = "center";
	txtCredit.textBaseline='alphabetic';
	txtCredit.x = canvasW/100*48;
	txtCredit.y = canvasH/100*96;
	
	txtTime = new createjs.Text();
	txtTime.font = "65px digitallregular";
	txtTime.color = "#FF2929";
	txtTime.text = '00';
	txtTime.textAlign = "center";
	txtTime.textBaseline='alphabetic';
	txtTime.x = canvasW/100*64;
	txtTime.y = canvasH/100*96;
	btnUp.visible = false;
	
	
	resultCon = new createjs.Bitmap(loader.getResult("resultCon"));
	
	txtResultScore = new createjs.Text();
	txtResultScore.font = "180px shumiregular";
	txtResultScore.color = "#fff";
	txtResultScore.textAlign = "center";
	txtResultScore.textBaseline='alphabetic';
	
	txtResultScoreShadow = new createjs.Text();
	txtResultScoreShadow.font = "180px shumiregular";
	txtResultScoreShadow.color = "#999";
	txtResultScoreShadow.textAlign = "center";
	txtResultScoreShadow.textBaseline='alphabetic';
	txtResultScoreShadow.x = txtResultScore.x;
	txtResultScoreShadow.y = txtResultScore.x.y + 20;

	shareContainer.x = shareSaveContainer.x = canvasW/2;
    shareContainer.y = shareSaveContainer.y = canvasH/100 * 58;

    socialContainer.visible = false;
    socialContainer.scale = 1;
    shareContainer.addChild(socialContainer);

    if(shareSettings.enable){
        buttonShare = new createjs.Bitmap(loader.getResult('buttonShare'));
        centerReg(buttonShare);
        
        var pos = {x:0, y:45, spaceX:65};
        pos.x = -(((shareSettings.options.length-1) * pos.spaceX)/2)
        for(let n=0; n<shareSettings.options.length; n++){
            var shareOption = shareSettings.options[n];
            var shareAsset = String(shareOption[0]).toUpperCase() + String(shareOption).slice(1);
            $.share['button'+n] = new createjs.Bitmap(loader.getResult('button'+shareAsset));
            $.share['button'+n].shareOption = shareOption;
            centerReg($.share['button'+n]);
            $.share['button'+n].x = pos.x;
            $.share['button'+n].y = pos.y;
            socialContainer.addChild($.share['button'+n]);
            pos.x += pos.spaceX;
        }
        buttonShare.y = (buttonShare.image.naturalHeight/2) + 10;
        shareContainer.addChild(buttonShare);
    }

    if ( typeof toggleScoreboardSave == 'function' ) { 
        buttonSave = new createjs.Bitmap(loader.getResult('buttonSave'));
        centerReg(buttonSave);
        buttonSave.y = (buttonSave.image.naturalHeight/2) + 10;
        shareSaveContainer.addChild(buttonSave);
    }
	
	resultContainer.x = canvasW;
	resultContainer.y = canvasH;
	
	exitContainer = new createjs.Container();
	optionsContainer = new createjs.Container();
	
	//option
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonMusicOn = new createjs.Bitmap(loader.getResult('buttonMusicOn'));
	centerReg(buttonMusicOn);
	buttonMusicOff = new createjs.Bitmap(loader.getResult('buttonMusicOff'));
	centerReg(buttonMusicOff);
	buttonMusicOn.visible = false;
	
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonMusicOn);
	createHitarea(buttonMusicOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	optionsContainer = new createjs.Container();
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonMusicOn, buttonMusicOff, buttonExit);
	optionsContainer.visible = false;
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	centerReg(itemExit);
	itemExit.x = canvasW/2;
	itemExit.y = canvasH/2;
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	buttonConfirm.x = canvasW/100* 35;
	buttonConfirm.y = canvasH/100 * 63;
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	buttonCancel.x = canvasW/100 * 65;
	buttonCancel.y = canvasH/100 * 63;
	
	confirmMessageTxt = new createjs.Text();
	confirmMessageTxt.font = "50px shumiregular";
	confirmMessageTxt.lineHeight = 65;
	confirmMessageTxt.color = "#fff";
	confirmMessageTxt.textAlign = "center";
	confirmMessageTxt.textBaseline='alphabetic';
	confirmMessageTxt.text = exitMessage;
	confirmMessageTxt.x = canvasW/2;
	confirmMessageTxt.y = canvasH/100 *44;
	
	exitContainer.addChild(itemExit, buttonConfirm, buttonCancel, confirmMessageTxt);
	exitContainer.visible = false;

	guideline = new createjs.Shape();
	
	machineContainer.addChild(chainSide, chainBottom, chainMask, stickMachineMove, stickMachine, stickMachineDetails, stickPush, stickHit, stickGuide, machineGlass, collectArea, collectAreaMask, collectAreaGlass, txtPointShadow, txtPoint);
	controlContainer.addChild(controlBoard, btnLeft, btnRight, btnUp, btnPush, txtCredit, txtTime);
	gameContainer.addChild(machineContainer, insturction, controlContainer);
	resultContainer.addChild(resultCon, txtResultScoreShadow, txtResultScore, shareContainer, shareSaveContainer);

	backgroundContainer.addChild(background, logo, resultContainer);
	insertCoinContainer.addChild(insertCoinMachine, insertCoinMask, coin);
	canvasContainer.addChild(backgroundContainer, insertCoinContainer, gameContainer, exitContainer, optionsContainer, buttonSettings);
	stage.addChild(canvasContainer);
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
	const cssWidth = stageW * scalePercent;
	const cssHeight = stageH * scalePercent;
	const gameCanvas = document.getElementById("gameCanvas");
	gameCanvas.style.width = cssWidth + "px";
	gameCanvas.style.height = cssHeight + "px";

	gameCanvas.style.left = (offset.left/2) + "px";
	gameCanvas.style.top = (offset.top/2) + "px";
	
	gameCanvas.width = stageW * dpr;
	gameCanvas.height = stageH * dpr;
	
 	if(canvasContainer!=undefined){
		stage.scaleX = stage.scaleY = dpr;
		
		if(safeZoneGuide){	
			guideline.graphics.clear().setStrokeStyle(2).beginStroke('red').drawRect((stageW-contentW)/2, (stageH-contentH)/2, contentW, contentH);
		}

		buttonSettings.x = (canvasW - offset.x) - 60;
		buttonSettings.y = offset.y + 45;
		
		var distanceNum = 75;
		var nextCount = 0;
		buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
		buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
		buttonSoundOn.x = buttonSoundOff.x;
		buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
		if (typeof buttonMusicOn != "undefined") {
			buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
			buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
			buttonMusicOn.x = buttonMusicOff.x;
			buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
			nextCount = 2;
		}else{
			nextCount = 1;
		}
		buttonFullscreen.x = buttonSettings.x;
		buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));

		if(curPage == 'main' || curPage == 'result'){
			buttonExit.visible = false;			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
		}else{
			buttonExit.visible = true;			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*(nextCount+2));
		}
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}