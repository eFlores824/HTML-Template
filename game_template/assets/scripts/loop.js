var START_SCREEN = "start_screen";
var IN_GAME = "in_game";
var PAUSE_GAME = "pause_game";
var GAME_OVER = "game_over";

var current_state = titleState;

var score = 0;

function loop() {
	current_state.execute();
	switch (current_state) {
		case START_SCREEN:
			break;
		case IN_GAME:			
			break;
		case PAUSE_GAME:
			break;
		case GAME_OVER:
			break;
	}
	stage.update();
	runGameTimer();
}

function switchStates(new_state) {
	current_state.onExit();
	current_state = new_state;
	current_state.onEnter();
}