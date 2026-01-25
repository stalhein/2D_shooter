import { Constants } from "./constants.js";
import * as vector from "./utils/vector.js";

export class World {
    constructor() {
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
        ];

        this.bullets = [
            [
                new vector.Vec2(0, 0),
                new vector.Vec2(1000, 0)
            ]
        ];
    }

    update(dt) {

        for (const bullet of this.bullets) {
            const velocity = vector.multiplyScalar(bullet[1], dt)
            bullet[0] = vector.add(bullet[0], velocity);
        }
        
    }

    render(ctx, screenWidth, screenHeight, playerPosition) {
        const topX = Math.floor(screenWidth/2 - playerPosition.x);
        const topY = Math.floor(screenHeight/2 - playerPosition.y);

        const TILE_SIZE = Constants.TILE_SIZE;

        // Map
        ctx.fillStyle = "green";
        for (let row = 0; row < Constants.MAP_HEIGHT; ++row) {
            for (let col = 0; col < Constants.MAP_WIDTH; ++col) {
                if (this.map[row][col] == 0) continue;
                const x = topX + col * TILE_SIZE;
                const y = topY + row * TILE_SIZE;
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            }
        }

        // Bullets
        ctx.fillStyle = "red";
        for (const bullet of this.bullets) {
            ctx.fillRect(topX + bullet[0].x, topY + bullet[0].y, 10, 10);
        }
    }

    raycast(origin, direction) {
        const TILE_SIZE = Constants.TILE_SIZE;

        let tileX = Math.floor(origin.x / TILE_SIZE);
        let tileY = Math.floor(origin.y / TILE_SIZE);

        const normalizedDirection = vector.normalize(direction);
        
    }
}