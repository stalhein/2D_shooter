import { Constants } from "./constants.js";

export class World {
    constructor () {
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
    }

    render (ctx, screenWidth, screenHeight, playerX, playerY) {
        const topX = Math.floor(screenWidth/2 - playerX);
        const topY = Math.floor(screenHeight/2 - playerY);

        const TILE_SIZE = Constants.TILE_SIZE;

        ctx.fillStyle = "green";
        for (let row = 0; row < Constants.MAP_HEIGHT; ++row) {
            for (let col = 0; col < Constants.MAP_WIDTH; ++col) {
                if (this.map[row][col] == 0) continue;
                const x = topX + col * TILE_SIZE;
                const y = topY + row * TILE_SIZE;
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}