import { Constants } from "./constants.js";
import * as vector from "./vector.js";

export class Player {
    constructor() {
        this.position = new vector.Vec2(0, 0);
        this.velocity = new vector.Vec2(0, 0);

        this.size = 48;
        this.speed = 200;

        this.keys = {};
        window.addEventListener("keydown", e => this.keys[e.key.toLowerCase()] = true);
        window.addEventListener("keyup", e => this.keys[e.key.toLowerCase()] = false);
    }

    update(dt) {
        let acceleration = new vector.Vec2(0, 0);
        if (this.keys["a"]) acceleration.x -= 1;
        if (this.keys["d"]) acceleration.x += 1;
        if (this.keys["w"]) acceleration.y -= 1;
        if (this.keys["s"]) acceleration.y += 1;

        vector.normalize(acceleration);
        vector.multiplyScalar(acceleration, this.speed * dt * 0.5);

        this.velocity = vector.add(this.velocity, acceleration);

        vector.multiplyScalar(this.velocity, 0.8);

        if (this.velocity.x > this.speed) this.velocity.x = this.speed;
        if (this.velocity.y > this.speed) this.velocity.y = this.speed;

        this.position = vector.add(this.position, this.velocity);
    }

    render(ctx, screenWidth, screenHeight) {
        ctx.fillStyle = "blue";
        ctx.fillRect(Math.floor(screenWidth/2 - this.size/2), Math.floor(screenHeight/2 - this.size/2), this.size, this.size);
    }
}