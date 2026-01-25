import { Constants, Globals } from "./constants.js";
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
            {
                position: new vector.Vec2(0, 0),
                velocity: new vector.Vec2(1000, 0),
                bounces: 0,
            }
        ];
    }

    update(dt) {
        for (let i = this.bullets.length-1; i >= 0; --i) {
            const bullet = this.bullets[i];

            const velocity = vector.multiplyScalar(bullet.velocity, dt)

            const newPosition = vector.add(bullet.position, velocity);

            const ray = this.raycastFromTo(bullet.position, newPosition);

            if (!ray.hit) {
                bullet.position = newPosition;
                continue;
            }

            bullet.bounces++;
            if (bullet.bounces >= 3) {
                this.bullets.pop();
                continue;
            }

            if (ray.side == 0) {
                bullet.velocity.x -= 2 * bullet.velocity.x;
            } else {
                bullet.velocity.y -= 2 * bullet.velocity.y;
            }
        }
    }

    render(ctx, playerPosition) {
        const topX = Math.floor(Globals.screenWidth/2 - playerPosition.x);
        const topY = Math.floor(Globals.screenHeight/2 - playerPosition.y);

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
            ctx.fillRect(topX + bullet.position.x, topY + bullet.position.y, 10, 10);
        }
    }

    raycast(origin, direction) {
        const TILE_SIZE = Constants.TILE_SIZE;

        let tileX = Math.floor(origin.x / TILE_SIZE);
        let tileY = Math.floor(origin.y / TILE_SIZE);

        const d = vector.normalize(direction);
        
        let stepX = 0;
        let stepY = 0;

        let sideX = 0;
        let sideY = 0;

        let deltaX = (d.x == 0) ? 1e30 : Math.abs(Constants.TILE_SIZE / d.x);
        let deltaY = (d.y == 0) ? 1e30 : Math.abs(Constants.TILE_SIZE / d.y);

        if (d.x < 0) {
            stepX = -1;
            sideX = (origin.x - tileX * TILE_SIZE) / Math.abs(d.x);
        } else {
            stepX = 1;
            sideX = ((tileX+1) * TILE_SIZE - origin.x) / Math.abs(d.x);
        }

        if (d.y < 0) {
            stepY = -1;
            sideY = (origin.y - tileY * TILE_SIZE) / Math.abs(d.y);
        } else {
            stepY = 1;
            sideY = ((tileY+1) * TILE_SIZE - origin.y) / Math.abs(d.y);
        }

        let hit = false;
        let side = 0;
        let MAX_DIST = 100;
        let steps = 0;
        while (!hit && steps < MAX_DIST) {
            if (sideX < sideY) {
                sideX += deltaX;
                tileX += stepX;
                side = 0;
            } else {
                sideY += deltaY;
                tileY += stepY;
                side = 1;
            }

            if (this.isSolid(tileX, tileY)) hit = true;

            steps++;
        }

        if (hit) {
            let distance = 0;
            if (side == 0) distance = sideX - deltaX;
            else distance = sideY - deltaY;

            const hitX = origin.x + d.x * distance;
            const hitY = origin.y + d.y * distance;

            return {
                hit: true,
                x: hitX,
                y: hitY,
                tx: tileX,
                ty: tileY,
                distance: distance,
                side: side,
            };
        }

        return { hit: false, };
    }

    raycastFromTo(origin, finish) {
        const TILE_SIZE = Constants.TILE_SIZE;

        let tileX = Math.floor(origin.x / TILE_SIZE);
        let tileY = Math.floor(origin.y / TILE_SIZE);

        let endTileX = Math.floor(finish.x / TILE_SIZE);
        let endTileY = Math.floor(finish.y / TILE_SIZE);

        if (tileX == endTileX && tileY == endTileY) return { hit: false, };

        const d = vector.normalize(new vector.Vec2(finish.x-origin.x, finish.y-origin.y));
        
        let stepX = 0;
        let stepY = 0;

        let sideX = 0;
        let sideY = 0;

        let deltaX = (d.x == 0) ? 1e30 : Math.abs(Constants.TILE_SIZE / d.x);
        let deltaY = (d.y == 0) ? 1e30 : Math.abs(Constants.TILE_SIZE / d.y);

        if (d.x < 0) {
            stepX = -1;
            sideX = (origin.x - tileX * TILE_SIZE) / Math.abs(d.x);
        } else {
            stepX = 1;
            sideX = ((tileX+1) * TILE_SIZE - origin.x) / Math.abs(d.x);
        }

        if (d.y < 0) {
            stepY = -1;
            sideY = (origin.y - tileY * TILE_SIZE) / Math.abs(d.y);
        } else {
            stepY = 1;
            sideY = ((tileY+1) * TILE_SIZE - origin.y) / Math.abs(d.y);
        }

        let hit = false;
        let side = 0;
        let MAX_DIST = 100;
        let steps = 0;
        while (!hit && steps < MAX_DIST && (tileX != endTileX || tileY != endTileY)) {
            if (sideX < sideY) {
                sideX += deltaX;
                tileX += stepX;
                side = 0;
            } else {
                sideY += deltaY;
                tileY += stepY;
                side = 1;
            }

            if (this.isSolid(tileX, tileY)) hit = true;

            steps++;
        }

        if (hit) {
            let distance = 0;
            if (side == 0) distance = sideX - deltaX;
            else distance = sideY - deltaY;

            const hitX = origin.x + d.x * distance;
            const hitY = origin.y + d.y * distance;

            return {
                hit: true,
                x: hitX,
                y: hitY,
                tx: tileX,
                ty: tileY,
                distance: distance,
                side: side,
            };
        }

        return { hit: false, };
    }

    isSolid(tx, ty) {
        if (tx < 0 || ty < 0 || tx >= Constants.MAP_WIDTH || ty >= Constants.MAP_HEIGHT) return true;
        return this.map[ty][tx] != 0;
    }
}