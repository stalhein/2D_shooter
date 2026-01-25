import { Constants } from "./constants.js";

export class Player {
    constructor () {

        this.x = 100;
        this.y = 50;

        this.size = 48;
    }

    update () {

    }

    render (ctx, screenWidth, screenHeight) {
        ctx.fillStyle = "blue";
        ctx.fillRect(Math.floor(screenWidth/2 - this.size/2), Math.floor(screenHeight/2 - this.size/2), this.size, this.size);
    }
}