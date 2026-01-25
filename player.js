import { Constants } from "./constants.js";
import * as vector from "./utils/vector.js";
import * as aabb from "./utils/aabb.js";

export class Player {
    constructor() {
        this.position = new vector.Vec2(200, 200);
        this.velocity = new vector.Vec2(0, 0);

        this.size = 48;
        this.speed = 10;
        this.friction = 10;

        this.keys = {};
        window.addEventListener("keydown", e => this.keys[e.key.toLowerCase()] = true);
        window.addEventListener("keyup", e => this.keys[e.key.toLowerCase()] = false);
    }

    update(dt, tileMap) {
        // Apply movement
        let acceleration = new vector.Vec2(0, 0);
        if (this.keys["a"]) acceleration.x -= 1;
        if (this.keys["d"]) acceleration.x += 1;
        if (this.keys["w"]) acceleration.y -= 1;
        if (this.keys["s"]) acceleration.y += 1;

        vector.normalize(acceleration);
        vector.multiplyScalar(acceleration, this.speed * dt * 60);
        this.velocity = vector.add(this.velocity, acceleration);
        vector.multiplyScalar(this.velocity, Math.max(0, 1 - (this.friction*dt)));
        vector.clamp(this.velocity, this.speed);

        // Check collisions
        const TILE_SIZE = Constants.TILE_SIZE;

        // X
        let playerAABB = new aabb.AABB(this.position.x+this.velocity.x, this.position.y, this.size, this.size);
        let top = Math.floor(playerAABB.y / TILE_SIZE);
        let bottom = Math.floor((playerAABB.y + TILE_SIZE) / TILE_SIZE);
        let left = Math.floor(playerAABB.x / TILE_SIZE);
        let right = Math.floor((playerAABB.x + TILE_SIZE) / TILE_SIZE);

        for (let row = top; row <= bottom; ++row) {
            for (let col = left; col <= right; ++col) {
                if (tileMap[row][col] == 0) continue;

                const tile = new aabb.AABB(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                if (aabb.intersects(playerAABB, tile)) {
                    if (this.velocity.x > 0) this.position.x = tile.x - this.size;
                    else if (this.velocity.x < 0) this.position.x = tile.x + tile.width;
                    this.velocity.x = 0;
                }
            }
        }

        this.position.x += this.velocity.x;


        // Y
        playerAABB = new aabb.AABB(this.position.x, this.position.y+this.velocity.y, this.size, this.size);
        top = Math.floor(playerAABB.y / TILE_SIZE);
        bottom = Math.floor((playerAABB.y + TILE_SIZE) / TILE_SIZE);
        left = Math.floor(playerAABB.x / TILE_SIZE);
        right = Math.floor((playerAABB.x + TILE_SIZE) / TILE_SIZE);

        for (let row = top; row <= bottom; ++row) {
            for (let col = left; col <= right; ++col) {
                if (tileMap[row][col] == 0) continue;

                const tile = new aabb.AABB(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                if (aabb.intersects(playerAABB, tile)) {
                    if (this.velocity.y > 0) this.position.y = tile.y - this.size;
                    else if (this.velocity.y < 0) this.position.y = tile.y + tile.height;
                    this.velocity.y = 0;
                }
            }
        }

        this.position.y += this.velocity.y;
    }

    render(ctx, screenWidth, screenHeight) {
        ctx.fillStyle = "blue";
        ctx.fillRect(Math.floor(screenWidth/2), Math.floor(screenHeight/2), this.size, this.size);
    }
}