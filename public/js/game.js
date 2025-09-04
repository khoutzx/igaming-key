////////////////////////////////////////////////////////////
// GAME v1.7
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */

//slot shape
const shape_arr = [
	{src:'assets/grid_front.png', posX:41, posY:28, regX:53, regY:156, hitsrc:'assets/hit1.png', hitPosX:0, hitPosY:-50, hitRegX:12, hitRegY:9},
	{src:'assets/grid_front2.png', posX:41, posY:28, regX:53, regY:156, hitsrc:'assets/hit2.png', hitPosX:0, hitPosY:-40, hitRegX:10, hitRegY:15},
];

//prize
const prize_arr = [
	{src:'assets/obj_pig.png', regX:53, regY:85, point:50}, //0
	{src:'assets/obj_vr.png', regX:50, regY:64, point:1200}, //1
	{src:'assets/obj_tablet.png', regX:25, regY:130, point:800}, //2
	{src:'assets/obj_phone.png', regX:15, regY:90, point:200}, //3
	{src:'assets/obj_necklace.png', regX:47, regY:90, point:1500}, //4
	{src:'assets/obj_money.png', regX:44, regY:71, point:500}, //5
	{src:'assets/obj_money2.png', regX:44, regY:92, point:5000}, //6
	{src:'assets/obj_gopro.png', regX:30, regY:50, point:1000}, //7
	{src:'assets/obj_gamepad.png', regX:30, regY:64, point:800}, //8
	{src:'assets/obj_earphone.png', regX:46, regY:78, point:500}, //9
	{src:'assets/obj_cup.png', regX:36, regY:97, point:50}, //10
	{src:'assets/obj_car.png', regX:48, regY:66, point:50}, //11
	{src:'assets/obj_camera.png', regX:30, regY:56, point:500}, //12
	{src:'assets/obj_bear.png', regX:53, regY:139, point:50} //13
];

//slot				
const slot_arr = [
	{shape:0, prize:-1},
	{shape:1, prize:0},
	{shape:0, prize:-1},
	{shape:0, prize:3},
	{shape:1, prize:10},
	{shape:0, prize:2},
	{shape:1, prize:11},
	{shape:0, prize:12},
	{shape:0, prize:5},
	{shape:0, prize:7},
	{shape:0, prize:4},
	{shape:0, prize:8},
	{shape:0, prize:9},
	{shape:0, prize:1},
	{shape:1, prize:13},
	{shape:0, prize:6}
];
				
const machineMoveSpeed = 1; //machine move speed
const totalCredit = 5; //total credit
const totalTime = 25; //total time
const showInstruction = true; //show instruction during gameplay 
const showInstructionOnce = true; //show instruction only once during gameplay
const stickAimGuide = true; //show stick aim guide

const exitMessage = 'Are you sure you want\nto quit the game?'; //quit game message

//Social share, [SCORE] will replace with game score
const shareSettings = {
	enable:true,
	options:['facebook','twitter','whatsapp','telegram','reddit','linkedin'],
	shareTitle:'Highscore on Push Me Out is [SCORE]',
	shareText:'[SCORE] is mine new highscore on Push Me Out! Try it now!',
	customScore:true, //share a custom score to Facebook, it use customize share.php (Facebook and PHP only)
	gtag:true //Google Tag
};

/*!
 *
 * GAME BUTTONS CUSTOMIZATION END
 *
 */

const playerData = {point:0, credit:0, time:0};
const gameData = {isometricScale:.58, targetHitNum:-1, targetHitObject:false, resetCon:false, moveCon:'', controlCon:true, releaseCon:false, insertCoin:false, instruction:0};
const gamePosData = {chainX:0, chainY:0, maskChainX:0, maskChainY:0, movX:0, movY:0, maxMacX:320, maxMacY:480, macX:0, macY:0, newMacY:0, pushX:0, pushY:0, hitX:72, hitY:43, stickPushLimit:41, stickPushEnd:70};

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	$(window).focus(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(false);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(false);
			}
		}
	});
	
	$(window).blur(function() {
		if(!buttonSoundOn.visible){
			toggleSoundInMute(true);
		}

		if (typeof buttonMusicOn != "undefined") {
			if(!buttonMusicOn.visible){
				toggleMusicInMute(true);
			}
		}
	});

	if(audioOn){
		if(muteSoundOn){
			toggleSoundMute(true);
		}
		if(muteMusicOn){
			toggleMusicMute(true);
		}
	}

	insertCoinContainer.cursor = "pointer";
	insertCoinContainer.addEventListener("mousedown", function(evt) {
		animateCoin();
	});
	
	btnLeft.cursor = "pointer";
	btnLeft.addEventListener("mousedown", function(evt) {
		playSound('press', false);
		pressMachine('left');
	});
	btnLeft.addEventListener("pressup", function(evt) {
		pressMachine('');
	});
	
	btnRight.cursor = "pointer";
	btnRight.addEventListener("mousedown", function(evt) {
		playSound('press', false);
		pressMachine('right');
	});
	btnRight.addEventListener("pressup", function(evt) {
		pressMachine('');
	});
	
	btnPush.cursor = "pointer";
	btnPush.addEventListener("mousedown", function(evt) {
		/*if(gameData.moveCon == ''){
			pressMachine('up');
		}else{
			pressMachine('push');
		}*/
		playSound('press', false);
		pressMachine('up');
	});
	btnPush.addEventListener("pressup", function(evt) {
		pressMachine('push');
		gameData.releaseCon = true;
	});
	
	if(shareSettings.enable){
		buttonShare.cursor = "pointer";
		buttonShare.addEventListener("click", function(evt) {
			playSound('soundButton');
			toggleSocialShare(true);
		});

		for(let n=0; n<shareSettings.options.length; n++){
			$.share['button'+n].cursor = "pointer";
			$.share['button'+n].addEventListener("click", function(evt) {
				shareLinks(evt.target.shareOption, addCommas(playerData.point));
			});
		}
	};
	
	//confirm
	buttonConfirm.cursor = "pointer";
	buttonConfirm.addEventListener("click", function(evt) {
		playSound('soundClick');
		togglePop(false);
		stopGame(true);
		goPage('result');
	});
	
	buttonCancel.cursor = "pointer";
	buttonCancel.addEventListener("click", function(evt) {
		playSound('soundClick');
		togglePop(false);
	});
	
	itemExit.addEventListener("click", function(evt) {
	});
	
	//options
	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleSoundMute(true);
	});
	
	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleSoundMute(false);
	});

	if (typeof buttonMusicOff != "undefined") {
		buttonMusicOff.cursor = "pointer";
		buttonMusicOff.addEventListener("click", function(evt) {
			toggleMusicMute(true);
		});
	}
	
	if (typeof buttonMusicOn != "undefined") {
		buttonMusicOn.cursor = "pointer";
		buttonMusicOn.addEventListener("click", function(evt) {
			toggleMusicMute(false);
		});
	}
	
	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
	});
	
	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		toggleOptions();
	});
	
	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(evt) {
		togglePop(true);
		toggleOptions();
	});
}

/*!
 * 
 * TOGGLE SOCIAL SHARE - This is the function that runs to toggle social share
 * 
 */
function toggleSocialShare(con){
	if(!shareSettings.enable){return;}
	buttonShare.visible = con == true ? false : true;
	shareSaveContainer.visible = con == true ? false : true;
	socialContainer.visible = con;

	if(con){
		if (typeof buttonSave !== 'undefined') {
			TweenMax.to(buttonShare, 3, {overwrite:true, onComplete:toggleSocialShare, onCompleteParams:[false]});
		}
	}
}

function positionShareButtons(){
	if(!shareSettings.enable){return;}
	if (typeof buttonShare !== 'undefined') {
		if (typeof buttonSave !== 'undefined') {
			if(buttonSave.visible){
				buttonShare.x = -((buttonShare.image.naturalWidth/2) + 5);
				buttonSave.x = ((buttonShare.image.naturalWidth/2) + 5);
			}else{
				buttonShare.x = 0;
			}
		}
	}
}

/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
 var curPage = '';
function goPage(page){
	curPage=page;
	insertCoinContainer.visible=false;
	stopMusicLoop('music');
	stopMusicLoop('musicGame');
	
	switch(page){
		case 'main':
			gameData.insertCoin = false;
			insertCoinContainer.visible=true;
			toggleControlBoard(false);
			playMusicLoop('music');
			toggleInstruction(false);
		break;
		
		case 'game':
			moveBackground('game');
			toggleControlBoard(true);
			startGame();
			playMusicLoop('musicGame');
		break;
		
		case 'result':
			playSound('over',false);
			
			moveBackground('result');
			toggleControlBoard(false);
			insertCoinContainer.visible=true;
			
			txtResultScore.text = txtResultScoreShadow.text = playerData.point;
			toggleSocialShare(false);
			saveGame(playerData.point);
			
			setTimeout(function(){
				gameData.insertCoin = false;
				playMusicLoop('music');
			}, 1500);
		break;
	}
	
	resizeCanvas();
}

/*!
 * 
 * COIN ANIMATION - This is the function that runs to animate insert coin
 * 
 */
function animateCoin(){
	if(!gameData.insertCoin){
		playSound('insertCoin', false);
		
		gameData.insertCoin = true;
		coin.x = canvasW/100*60;
		coin.y = canvasH/100*81;
		
		$(coin)
		.clearQueue()
		.stop(true,true)
		.animate({x:canvasW/100*40}, 500, function(){
			  goPage('game');
		});
	}
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
 function startGame(){
	 gameData.releaseCon = false;
	 gameData.controlCon = true;
	 playerData.point = 0;
	 playerData.credit = totalCredit;
	 playerData.time = totalTime;
	 updateBoardStatus();
	 
	 if(showInstruction){
		 if(showInstructionOnce && gameData.instruction == 0){
			 gameData.instruction++;
	 		toggleInstruction(true);
		 }else if(!showInstructionOnce){
			toggleInstruction(true); 
		 }
	 }
 }
 
 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
 function stopGame(){
	clearInterval(gameTimerInterval);
	gameTimerInterval = null;
	gameData.controlCon = false;
	
	setTimeout(function(){ goPage('result') }, 1500);
 }
 
 /*!
 *
 * SAVE GAME - This is the function that runs to save game
 *
 */
function saveGame(score){
    if ( typeof toggleScoreboardSave == 'function' ) { 
		$.scoreData.score = score;
		if(typeof type != 'undefined'){
			$.scoreData.type = type;	
		}
		toggleScoreboardSave(true);
	}

	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}
 
 
function toggleInstruction(con){
	if(con){
		$(insturction)
		.clearQueue()
		.stop(true,true)
		.animate({ alpha:1}, 500);
	}else{
		$(insturction)
		.clearQueue()
		.stop(true,true)
		.animate({ alpha:0}, 500);	
	}
}

/*!
 * 
 * GAME LOOP - This is the function that runs for game loop
 * 
 */ 
function updateGame(){
	moveMachine();
}

/*!
 * 
 * MOVE MACHINE - This is the function that runs to move machine
 * 
 */ 
function moveMachine(){
	var moveRange = 0;
	stickGuide.x = stickMachine.x - 112;
	stickGuide.y = stickMachine.y - 98;
	if(gameData.moveCon == 'left' || gameData.moveCon == 'right' || gameData.moveCon == 'up' || gameData.moveCon == 'down'){
		stickGuide.visible = stickAimGuide == true ? true : false;
		if(gameData.moveCon == 'left'){
			stickMachine.x -= machineMoveSpeed;
			stickMachine.x = stickMachine.x < gamePosData.maxMacX ? gamePosData.maxMacX : stickMachine.x;
			moveRange = gamePosData.macX - stickMachine.x;
			stickMachine.y = gamePosData.macY + Math.abs(moveRange * gameData.isometricScale);
			gamePosData.newMacY = stickMachine.y;
		}else if(gameData.moveCon == 'right'){
			stickMachine.x += machineMoveSpeed;
			stickMachine.x = stickMachine.x > gamePosData.macX ? gamePosData.macX : stickMachine.x;
			moveRange = gamePosData.macX - stickMachine.x;
			stickMachine.y = gamePosData.macY + Math.abs(moveRange * gameData.isometricScale);
			gamePosData.newMacY = stickMachine.y;
			
			if(stickMachine.x >= gamePosData.macX && gameData.resetCon){
				stickMachine.x = gamePosData.macX;
				resetMachineComplete();
			}
		}else if(gameData.moveCon == 'up'){
			stickMachine.y -= machineMoveSpeed;
		}else if(gameData.moveCon == 'down'){
			stickMachine.y += machineMoveSpeed;
			
			if(stickMachine.y >= gamePosData.newMacY){
				stickMachine.y = gamePosData.newMacY;
				updateMachine('right');
			}
		}
		
		if(gameData.moveCon != 'up' && gameData.moveCon != 'down'){
			stickMachineMove.x = stickMachine.x - (gamePosData.macX - gamePosData.movX);
			stickMachineMove.y = stickMachine.y - (gamePosData.macY - gamePosData.movY);
			
			chainSide.x = stickMachine.x - (gamePosData.macX - gamePosData.chainX);
			chainSide.y = stickMachine.y - (gamePosData.macY - gamePosData.chainY);
			
			chainMask_arr[2].x = stickMachine.x - (gamePosData.macX - gamePosData.maskChainX);
			chainMask_arr[2].y = stickMachine.y - (gamePosData.macY - gamePosData.maskChainY);
			drawChainMask();
		}
		
		stickMachineDetails.x = stickMachine.x;
		stickMachineDetails.y = stickMachine.y;
		
		stickPush.x = stickMachine.x;
		stickPush.y = stickMachine.y - 30;
		gamePosData.pushX = stickPush.x;
		gamePosData.pushY = stickPush.y;
		
		if(stickMachine.y < (gamePosData.newMacY - gamePosData.maxMacY)){
			stickMachine.y = gamePosData.newMacY - gamePosData.maxMacY;
			pressMachine('push');	
		}
	}else if(gameData.moveCon == 'push' || gameData.moveCon == 'pushback'){
		stickGuide.visible = false;
		moveRange = gamePosData.pushX - stickPush.x;
		checkCollision(moveRange);
		
		if(gameData.moveCon == 'pushback'){
			stickPush.x += machineMoveSpeed;
			if(stickPush.x >= stickMachine.x){
				stickPush.x = stickMachine.x
				updateMachine('down');
			}
		}else{
			if(Math.abs(moveRange) <= gamePosData.stickPushEnd && gameData.targetHitNum != -1){
				stickPush.x -= machineMoveSpeed;
			}else if(Math.abs(moveRange) <= gamePosData.stickPushLimit){
				stickPush.x -= machineMoveSpeed;
			}else{
				if(gameData.targetHitNum != -1 && !gameData.targetHitObject){
					toggleGameTimer(false);
					moveObject(gameData.targetHitNum);
				}
				
				if(Math.abs(moveRange) >= gamePosData.stickPushLimit){
					resetMachine(true);
				}else{
					resetMachine(false);	
				}
			}
		}
		
		stickPush.y = gamePosData.pushY - Math.abs(moveRange*gameData.isometricScale);
		stickHit.x = stickPush.x - gamePosData.hitX;
		stickHit.y = stickPush.y - gamePosData.hitY;
	}
}

/*!
 * 
 * BUTTON PRESS STATUS - This is the function that runs for button press status
 * 
 */ 
function pressMachine(con){
	toggleInstruction(false);
	
	if(!gameData.resetCon && gameData.controlCon && !gameData.releaseCon){
		checkGameTimer();
		updateMachine(con);
	}
}

/*!
 * 
 * UPDATE MACHINE STATUS - This is the function that runs to update machine status
 * 
 */
function updateMachine(con){
	gameData.moveCon = con;
	
	stopSoundLoop('machineMoveLoop');
	stopSoundLoop('machineRiseLoop');
	stopSoundLoop('machinePushLoop');
	
	if(gameData.moveCon == 'left' || gameData.moveCon == 'right'){
		//playSound('machineMove',false);
		playSoundLoop('machineMoveLoop');	
	}else if(gameData.moveCon == 'up' || gameData.moveCon == 'down'){
		//playSound('machineRise',false);
		playSoundLoop('machineRiseLoop');	
	}else if(gameData.moveCon == 'push' || gameData.moveCon == 'pushback'){
		playSound('machinePush',false);
		playSoundLoop('machinePushLoop');	
	}
}

/*!
 * 
 * RESET MACHINE - This is the function that runs to reset machine
 * 
 */
function resetMachine(con){
	if(!gameData.resetCon){
		if(gameData.targetHitNum == -1){
			if(con){
				playSound('hitWindow', false);
			}
			playSound('evillaugh',false);
		}
		updateMachine('');
		
		gameData.resetCon = true;
		updateMachine('pushback');
		updateCredit();
		toggleGameTimer(false);
	}
}

/*!
 * 
 * RESET MACHINE COMPLETE - This is the function that runs when reset machine animation complete
 * 
 */
function resetMachineComplete(){
	gameData.releaseCon = false;
	gameData.resetCon = false;
	updateMachine('');
	gameData.targetHitNum = -1;
	gameData.targetHitObject = false;
	
	if(playerData.credit == 0){
		stopGame();
	}
}

/*!
 * 
 * PUSH STICK COLLISION - This is the function that runs to check push stick collision
 * 
 */
function checkCollision(range){
	if(gameData.targetHitNum != -1 && !gameData.targetHitObject){
		console.log('check');
		var pointStage = $.prize[gameData.targetHitNum].globalToLocal(stickHit.x*dpr, stickHit.y*dpr);
		var posY = 0 - machineContainer.y;
		
		if($.prize[gameData.targetHitNum].hitTest(pointStage.x, pointStage.y - (0 - machineContainer.y))){
			toggleGameTimer(false);
			moveObject(gameData.targetHitNum);
		};
	}else{
		if(range >= gamePosData.stickPushLimit){
			for(var n=0;n<16;n++){
				var pointStage = $.grid['h'+n].globalToLocal(stickHit.x*dpr, stickHit.y*dpr);
				var posY = 0 - machineContainer.y;
				if($.grid['h'+n].hitTest(pointStage.x, pointStage.y - (0 - machineContainer.y)) && slot_arr[n].prize != -1){
					var fontTopIndex = machineContainer.getChildIndex($.grid['ft'+n]);
					machineContainer.setChildIndex(stickPush, fontTopIndex-1);
					gameData.targetHitNum = n;
				};
			}
		}
	}
}

/*!
 * 
 * MACHINE CHAIN MASKING - This is the function that runs to mask machine chain
 * 
 */
var chainMask_arr = [{x:150, y:923},{x:278, y:996},{x:709, y:748},{x:0, y:0}];
gamePosData.maskChainX = chainMask_arr[2].x;
gamePosData.maskChainY = chainMask_arr[2].y;

function drawChainMask(){
	chainMask.graphics.clear();
	chainMask.graphics.beginFill("#ccff00");
	
	chainMask_arr[3].x = chainMask_arr[2].x - (chainMask_arr[1].x - chainMask_arr[0].x);
	chainMask_arr[3].y = chainMask_arr[2].y - (chainMask_arr[1].y - chainMask_arr[0].y);
	
	chainMask.graphics.moveTo(chainMask_arr[0].x, chainMask_arr[0].y).lineTo(chainMask_arr[1].x, chainMask_arr[1].y).lineTo(chainMask_arr[2].x, chainMask_arr[2].y).lineTo(chainMask_arr[3].x,chainMask_arr[3].y);
}

/*!
 * 
 * MOVE OBJECT - This is the function that runs to move object when collision hit
 * 
 */
function moveObject(num){
	playSound('victory',false);
	
	gameData.targetHitObject = true;
	var moveRange = 0;
	var dropRange = 500;
	
	TweenMax.to($.prize[num], .5, {x:$.prize[num].x - 60, onUpdate:function(){
		moveRange = $.grid['b'+num].x - $.prize[num].x;
		$.prize[num].y = $.grid['b'+num].y - Math.abs(moveRange * gameData.isometricScale);
	}, overwrite:true, onComplete:function(){
		var machineIndex = machineContainer.getChildIndex(machine);
		machineContainer.setChildIndex($.prize[num], machineIndex+1);
		
		TweenMax.to($.prize[num], 1, {y:$.prize[num].y + dropRange, alpha:1, overwrite:true, onComplete:function(){
			$.prize[num].mask = null;
			var collectIndex = machineContainer.getChildIndex(collectArea);
			machineContainer.setChildIndex($.prize[num], collectIndex+1);
			
			$.prize[num].mask = collectAreaMask;
			$.prize[num].x = collectArea.x + (canvasW/100 * 5);
			$.prize[num].y = collectArea.y;
			
			moveBackground('prize');
			setTimeout(function(){ playSound('collect',false); playSound('point',false); }, 300);
			
			TweenMax.to($.prize[num], 1, {y:collectArea.y + (canvasH/100 * 18), ease:Bounce.easeOut, overwrite:true, onComplete:function(){
				
			}});
		}});
	}});
	
	/*$($.prize[num])
	.clearQueue()
	.stop(true,true)
	.animate({ x:$.prize[num].x - 60}, {
		duration: 1000,
	  step: function() {
		moveRange = $.grid['b'+num].x - $.prize[num].x;
		$.prize[num].y = $.grid['b'+num].y - Math.abs(moveRange * gameData.isometricScale);
	  },
	  complete:function(){
		  var machineIndex = machineContainer.getChildIndex(machine);
		  machineContainer.setChildIndex($.prize[num], machineIndex+1);
	  }
	})
	.animate({ y:$.prize[num].y + dropRange, alpha:1}, 500, function() {
		$.prize[num].mask = null;
		
		var collectIndex = machineContainer.getChildIndex(collectArea);
		machineContainer.setChildIndex($.prize[num], collectIndex+1);
		
		$.prize[num].mask = collectAreaMask;
		$.prize[num].x = collectArea.x + (canvasW/100 * 5);
		$.prize[num].y = collectArea.y;
		
		moveBackground('prize');
  	})
	.animate({ y:collectArea.y + (canvasH/100 * 18)}, 500, 'easeOutBounce');*/
	
	var originalY = canvasH/100*100;
	var shadowOriginalY = canvasH/100*97.5;
	var moveRange = 150;
	txtPoint.alpha = txtPointShadow.alpha = 0;
	
	txtPoint.y = originalY;
	txtPointShadow.y = shadowOriginalY;
	txtPoint.text = txtPointShadow.text = '+'+prize_arr[slot_arr[num].prize].point;
	playerData.point += prize_arr[slot_arr[num].prize].point;
	
	$(txtPoint)
	.clearQueue()
	.stop(true,true)
	.animate({ alpha:0}, 1800)
	.animate({ y:originalY - moveRange, alpha:1}, 500)
	.animate({ alpha:1}, 800)
	.animate({ alpha:0}, 500, function(){
		$.prize[num].visible = false;
		moveBackground('game');	
	})
	
	$(txtPointShadow)
	.clearQueue()
	.stop(true,true)
	.animate({ alpha:0}, 1800)
	.animate({ y:shadowOriginalY - moveRange, alpha:1}, 500)
	.animate({ alpha:1}, 800)
	.animate({ alpha:0}, 500)
}

/*!
 * 
 * MOVE BACKGROUND TRANSITION - This is the function that runs to move background
 * 
 */
function moveBackground(con){
	switch(con){
		case 'game':
			$(machineContainer)
			.clearQueue()
			.stop(true,true)
			.animate({x:0, y:-100}, 1000);
			
			$(backgroundContainer)
			.clearQueue()
			.stop(true,true)
			.animate({x:0, y:0-(canvasH)}, 1000);
		break;
		
		case 'prize':
			var range = 450;
			
			$(machineContainer)
			.clearQueue()
			.stop(true,false)
			.animate({ y:-range}, 500);
			
			$(backgroundContainer)
			.clearQueue()
			.stop(true,false)
			.animate({ y:0-(canvasH+range)}, 500);
		break;
		
		case 'result':
			$(machineContainer)
			.clearQueue()
			.stop(true,false)
			.animate({ x:-canvasW}, 500);
			
			$(backgroundContainer)
			.clearQueue()
			.stop(true,false)
			.animate({ x:-canvasW}, 500);
		break;
	}
}

/*!
 * 
 * TOGGLE CONTROL BOARD - This is the function that runs to show and hide control board
 * 
 */
function toggleControlBoard(con){
	if(con){
		$(controlContainer)
		.clearQueue()
		.stop(true,false)
		.animate({ y:0}, 500);
	}else{
		$(controlContainer)
		.clearQueue()
		.stop(true,false)
		.animate({ y:200}, 500);	
	}
}

/*!
 * 
 * UPDATE CONTROL BOARD STATUS - This is the function that runs to update control board credit and time status
 * 
 */
function updateCredit(){
	playerData.credit-=1;
	updateBoardStatus();
}

function updateBoardStatus(){
	txtCredit.text = playerData.credit;
	txtTime.text = formatScore(playerData.time,2);
	
	if(playerData.credit <= 0){
		gameData.controlCon = false;
	}
}

/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
var gameTimerInterval = null;
var gameTimerCount = 0;
var countdownTimer = 0;

function checkGameTimer(){
	if(gameTimerInterval == null){
		toggleGameTimer(true);
	}
}

function toggleGameTimer(con){
	playerData.time = totalTime;
	updateBoardStatus();
		
	if(con){
		clearInterval(gameTimerInterval);
		gameTimerInterval = setInterval(function(){
			playerData.time--;
			if(playerData.time <= 0){
				resetMachine(false);
			}
			updateBoardStatus();
		}, 1000);
	}else{
		clearInterval(gameTimerInterval);
		gameTimerInterval = null;
	}
}

/*!
 * 
 * CONFIRM - This is the function that runs to toggle confirm
 * 
 */
function togglePop(con){
	exitContainer.visible = con;
}

/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */

function toggleOptions(con){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
	}else{
		optionsContainer.visible = true;
	}
	if(con!=undefined){
		optionsContainer.visible = con;
	}
}

/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleSoundMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	toggleSoundInMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;	
	}
}

function toggleMusicMute(con){
	buttonMusicOff.visible = false;
	buttonMusicOn.visible = false;
	toggleMusicInMute(con);
	if(con){
		buttonMusicOn.visible = true;
	}else{
		buttonMusicOff.visible = true;	
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function shareLinks(action, shareScore){
	if(shareSettings.gtag){
		gtag('event','click',{'event_category':'share','event_label':action});
	}

	var gameURL = location.href;
	gameURL = encodeURIComponent(gameURL.substring(0,gameURL.lastIndexOf("/") + 1));

	var shareTitle = shareSettings.shareTitle.replace("[SCORE]", shareScore);
	var shareText = shareSettings.shareText.replace("[SCORE]", shareScore);

	var shareURL = '';
	if( action == 'facebook' ){
		if(shareSettings.customScore){
			gameURL = decodeURIComponent(gameURL);
			shareURL = `https://www.facebook.com/sharer/sharer.php?u=`+encodeURIComponent(`${gameURL}share.php?title=${shareTitle}&url=${gameURL}&thumb=${gameURL}share.jpg`);
		}else{
			shareURL = `https://www.facebook.com/sharer/sharer.php?u=${gameURL}`;
		}
	}else if( action == 'twitter' ){
		shareURL = `https://twitter.com/intent/tweet?text=${shareText}&url=${gameURL}`;
	}else if( action == 'whatsapp' ){
		shareURL = `https://api.whatsapp.com/send?text=${shareText}%20${gameURL}`;
	}else if( action == 'telegram' ){
		shareURL = `https://t.me/share/url?url=${gameURL}&text=${shareText}`;
	}else if( action == 'reddit' ){
		shareURL = `https://www.reddit.com/submit?url=${gameURL}&title=${shareText}`;
	}else if( action == 'linkedin' ){
		shareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${gameURL}`;
	}

	window.open(shareURL);
}