////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest = [{src:'assets/background.jpg', id:'background'},
				{src:'assets/logo.png', id:'logo'},
				{src:'assets/insertCoinMachine.png', id:'insertCoinMachine'},
				{src:'assets/coin.png', id:'coin'},
				
				{src:'assets/insturction.png', id:'insturction'},
				{src:'assets/machine.png', id:'machine'},
				{src:'assets/machineGlass.png', id:'machineGlass'},
				{src:'assets/grid_bottom.png', id:'gridBottom'},
				{src:'assets/grid_side.png', id:'gridSide'},
				
				{src:'assets/stick_machine_move.png', id:'stickMachineMove'},
				{src:'assets/stick_machine.png', id:'stickMachine'},
				{src:'assets/stick_machine_details.png', id:'stickMachineDetails'},
				{src:'assets/stick_push.png', id:'stickPush'},
				{src:'assets/stickHit.png', id:'stickHit'},
				{src:'assets/stickAim.png', id:'stickGuide'},
				
				{src:'assets/chain_bottom.png', id:'chainBottom'},
				{src:'assets/chain_side.png', id:'chainSide'},
				
				{src:'assets/collectArea.png', id:'collectArea'},
				{src:'assets/collectAreaGlass.png', id:'collectAreaGlass'},
				
				{src:'assets/controlArrow.png', id:'controlArrow'},
				{src:'assets/controlPush.png', id:'controlPush'},
				{src:'assets/controlBoard.png', id:'controlBoard'},
				
				{src:'assets/button_share.png', id:'buttonShare'},
				{src:'assets/button_save.png', id:'buttonSave'},
				{src:'assets/social/button_facebook.png', id:'buttonFacebook'},
				{src:'assets/social/button_twitter.png', id:'buttonTwitter'},
				{src:'assets/social/button_whatsapp.png', id:'buttonWhatsapp'},
				{src:'assets/social/button_telegram.png', id:'buttonTelegram'},
				{src:'assets/social/button_reddit.png', id:'buttonReddit'},
				{src:'assets/social/button_linkedin.png', id:'buttonLinkedin'},
				{src:'assets/result.png', id:'resultCon'},
				
				{src:'assets/button_confirm.png', id:'buttonConfirm'},
				{src:'assets/button_cancel.png', id:'buttonCancel'},
				{src:'assets/item_exit.png', id:'itemExit'},
				{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
				{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
				{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
				{src:'assets/button_music_on.png', id:'buttonMusicOn'},
				{src:'assets/button_music_off.png', id:'buttonMusicOff'},
				{src:'assets/button_exit.png', id:'buttonExit'},
				{src:'assets/button_settings.png', id:'buttonSettings'}
				
				];
				
	for(n=0; n<shape_arr.length;n++){
		manifest.push({src:shape_arr[n].src, id:'shape_'+n});
		manifest.push({src:shape_arr[n].hitsrc, id:'hit_'+n});
	}
				
	for(n=0; n<prize_arr.length;n++){
		manifest.push({src:prize_arr[n].src, id:'obj'+n});	
	}
		
	if ( typeof addScoreboardAssets == 'function' ) { 
		addScoreboardAssets();
	}
	
	audioOn = true;
	if(!isDesktop){
		if(!enableMobileAudio){
			audioOn=false;
		}
	}else{
		if(!enableDesktopAudio){
			audioOn=false;
		}
	}
	
	if(audioOn){
		manifest.push({src:'assets/sounds/collect.ogg', id:'collect'});
		manifest.push({src:'assets/sounds/evillaugh.ogg', id:'evillaugh'});
		manifest.push({src:'assets/sounds/insert_coin.ogg', id:'insertCoin'});
		manifest.push({src:'assets/sounds/machine_move.ogg', id:'machineMove'});
		manifest.push({src:'assets/sounds/machine_rise.ogg', id:'machineRise'});
		manifest.push({src:'assets/sounds/machine_push_loop.ogg', id:'machinePushLoop'});
		manifest.push({src:'assets/sounds/machine_rise_loop.ogg', id:'machineRiseLoop'});
		manifest.push({src:'assets/sounds/machine_move_loop.ogg', id:'machineMoveLoop'});
		
		manifest.push({src:'assets/sounds/music.ogg', id:'music'});
		manifest.push({src:'assets/sounds/musicGame.ogg', id:'musicGame'});
		manifest.push({src:'assets/sounds/press.ogg', id:'press'});
		manifest.push({src:'assets/sounds/over.ogg', id:'over'});
		manifest.push({src:'assets/sounds/victory.ogg', id:'victory'});
		manifest.push({src:'assets/sounds/hit_window.ogg', id:'hitWindow'});
		manifest.push({src:'assets/sounds/point.ogg', id:'point'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader').html(Math.round(loader.progress/1*100)+' PERCENT');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}