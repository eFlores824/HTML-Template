var myTween, otherTween;
var tweenContainer, scoreContainer;
var tweenText, tweenScore;

var draw = {
	makeCircle: function (color, x, y, radius) {
		var circle = new createjs.Shape();
		circle.graphics.beginFill(color).drawCircle(x, y, radius);
		stage.addChild(circle);
		return circle;
	},
	writeText: function (text, font, color, x, y) {
		var theText = new createjs.Text(text, font, color);
		theText.x = x;
		theText.y = y;
		stage.addChild(theText);
		return theText;
	},
	makeRectangle: function (color, x, y, width, height) {
		var rectangle = new createjs.Shape();
		rectangle.graphics.beginFill(color).drawRect(x, y, width, height);
		stage.addChild(rectangle);
		return rectangle;
	},
	tween: function (text, textx, texty, completionCallback) {
		if (tweenContainer == undefined) {
			tweenContainer = new createjs.Container();
			var containerBackground = new createjs.Bitmap(queue.getResult("levelSign"));
			tweenText = new createjs.Text(text, "20px Impact", "#000000");
			
			tweenText.x = textx;
			tweenText.y = texty;
			
			tweenContainer.addChild(containerBackground);
			tweenContainer.addChild(tweenText);
			stage.addChild(tweenContainer);
		}
		else {
			tweenText.text = text;
			tweenText.x = textx;
			tweenText.y = texty;
		}
		tweenContainer.visible = true;
		tweenContainer.x = 200;
		tweenContainer.y = 0;
		stage.setChildIndex(tweenContainer, stage.getNumChildren() - 1);
		myTween = createjs.Tween.get(tweenContainer,{loop:false})
			.to({x: 200, y:150, rotation: 0}, 1500, createjs.Ease.bounceOut)
			.wait(2000)
			.to({y:1000, rotation: 0}, 1000, createjs.Ease.backIn)
			.call(completionCallback);
	},
	tweenContinue: function (score, continueCallback) {
		if (scoreContainer == undefined) {
			scoreContainer = new createjs.Container();
			var containerBackground = new createjs.Bitmap(queue.getResult("levelSign"));
			tweenScore = new createjs.Text("Score: " + score, "20px Impact", "#000000");
			
			tweenScore.x = 150;
			tweenScore.y = 100;
			
			buttons.cont.x = 150;
			buttons.cont.y = 150;
			buttons.cont.visible = true;
			btn.setButtonFunctions(buttons.cont, continueCallback, "continue");
			
			scoreContainer.addChild(containerBackground);
			scoreContainer.addChild(tweenScore);
			scoreContainer.addChild(buttons.cont);
			stage.addChild(scoreContainer);
		}
		else {
			tweenScore.text = "Score: " + score;
		}
		scoreContainer.visible = true;
		scoreContainer.x = 200;
		scoreContainer.y = 0;
		stage.setChildIndex(scoreContainer, stage.getNumChildren() - 1);
		otherTween = createjs.Tween.get(scoreContainer,{loop:false})
			.to({x: 200, y:150, rotation: 0}, 1500, createjs.Ease.bounceOut);
	},
	unTweenContinue: function(completionCallback) {
		otherTween = createjs.Tween.get(scoreContainer,{loop:false})
			.to({x: 200, y:1000, rotation: 0}, 1500, createjs.Ease.backIn)
			.call(completionCallback);
	}
};