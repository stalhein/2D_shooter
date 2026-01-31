import { Constants, Globals } from "./constants.js";
import * as vector from "./utils/vector.js";
import * as aabb from "./utils/aabb.js";

export class Enemy {
    constructor(position, size) {
        this.position = position;
        this.size = size;
    }

    render(ctx, playerPosition) {
        const topX = Math.floor(Globals.screenWidth/2 - playerPosition.x - 24);
        const topY = Math.floor(Globals.screenHeight/2 - playerPosition.y - 24);

        ctx.fillStyle = "red";
        ctx.fillRect(topX + this.position.x, topY + this.position.y, this.size, this.size);
    }
}