import { Constants, Globals } from "./constants.js";
import * as vector from "./utils/vector.js";
import * as aabb from "./utils/aabb.js";

import { Enemy } from "./enemy.js";

export class Enemies {
    constructor(ctx) {
        this.ctx = ctx;

        this.enemies = [new Enemy(new vector.Vec2(300, 400), 100)];
    }

    render(playerPosition) {
        for (const enemy of this.enemies) {
            //enemy.render(this.ctx, playerPosition);
        }
    }
}