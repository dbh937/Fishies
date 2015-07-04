let PIXI = require('pixi.js');
let GraphicsObject = require('./graphicsObject');

class FoodGraphicsObject extends GraphicsObject {
  constructor(food) {
    super(food, null);
    let graphics = new PIXI.Graphics();
    graphics.lineStyle(1, #B8860B);
    graphics.beginFill(#DAA520);
    graphics.drawCircle(0, 0, food.amount);
    this.shape = new PIXI.Container();
    this.shape.addChild(graphics);
  }
}
