var currentMuteStatus = "muteOff"
var currentVolume;

var btn = {
	addButtons: function () {
		stage.addChild(buttons.play);
		stage.addChild(buttons.playAgain);		
		stage.addChild(buttons.cont);
		stage.addChild(buttons.instruction);
		stage.addChild(buttons.menu);
		stage.addChild(buttons.mute);
				
		buttons.play.gotoAndPlay("playUp");
		buttons.playAgain.gotoAndPlay("playAgainUp");
		buttons.cont.gotoAndPlay("continueUp");
		buttons.instruction.gotoAndPlay("instructUp");
		buttons.menu.gotoAndPlay("menuUp");
		buttons.mute.gotoAndPlay("muteOff");
		
		buttons.play.visible = false;
		buttons.playAgain.visible = false;
		buttons.cont.visible = false;
		buttons.instruction.visible = false;
		buttons.menu.visible = false;
		buttons.mute.visible = false;
		
		buttons.mute.on("click", function() {
			currentMuteStatus = currentMuteStatus == "muteOn"? "muteOff": "muteOn";
			buttons.mute.gotoAndPlay(currentMuteStatus);
			currentVolume = currentVolume == 0? 1: 0; 
			music.volume = currentVolume;
		});
	},
	setButtonFunctions: function (button, clickEvent, buttonName) {
		button.off("click");
		button.on("click", clickEvent);
		button.on("mouseout", function() {button.gotoAndPlay(buttonName + "Up");});
		button.on("mouseover", function() {button.gotoAndPlay(buttonName + "Over");});
		button.on("mousedown", function() {button.gotoAndPlay(buttonName + "Down");});
		button.on("mouseup", function() {button.gotoAndPlay(buttonName + "Up");});
	}
};