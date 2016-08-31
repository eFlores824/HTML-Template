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
	}
};