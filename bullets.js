import { Constants, Globals } from "./constants.js";
import * as vector from "./utils/vector.js";
import { BulletTypes } from "./data.js";

export class Bullets {
    constructor(world, ctx) {
        this.world = world;
        this.ctx = ctx;

        this.bullets = [];
    }

    update(dt) {
        for (let i = this.bullets.length-1; i >= 0; --i) {
            const bullet = this.bullets[i];

            bullet.previous = bullet.position;

            let timeLeft = dt;
            let safe = 5;

            while (timeLeft > 0 && safe > 0) {
                if (bullet.distance >= bullet.type.maxDistance) {
                    this.deleteBullet(i);
                    break;
                }

                safe--;
                const move = vector.multiplyScalar(vector.normalize(new vector.Vec2(Math.cos(bullet.angle), Math.sin(bullet.angle))), timeLeft * bullet.type.speed);
                const length = vector.length(move);
                const newPosition = vector.add(bullet.position, move);

                const ray = this.raycast(bullet.position, newPosition);

                if (!ray.hit) {
                    bullet.position = newPosition;
                    bullet.distance += length;
                    break;
                }

                bullet.distance += ray.distance;

                bullet.position = vector.add(bullet.position, vector.multiplyScalar(vector.normalize(move), ray.distance-0.0001));

                timeLeft *= 1-ray.distance / length;

                bullet.bounces++;

                if (bullet.bounces >= bullet.type.bounces) {
                    this.deleteBullet(i);
                    break;
                }

                if (ray.side == 0) {
                    bullet.angle = Math.PI - bullet.angle;
                } else {
                    bullet.angle = -bullet.angle;
                }
            }
        }
    }

    render(playerPosition) {
        const topX = Math.floor(Globals.screenWidth/2 - playerPosition.x - 24);
        const topY = Math.floor(Globals.screenHeight/2 - playerPosition.y - 24);

        this.ctx.lineWidth = 6;
        this.ctx.strokeStyle = "grad";
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.7";
        
        for (const bullet of this.bullets) {
            this.ctx.beginPath();
            this.ctx.moveTo(topX+bullet.previous.x, topY+bullet.previous.y);
            this.ctx.lineTo(topX+bullet.position.x, topY+bullet.position.y);
            this.ctx.stroke();
        }


        this.ctx.fillStyle = "black";
        for (const bullet of this.bullets) {
            this.ctx.fillRect(topX + bullet.position.x-bullet.type.size/2, topY + bullet.position.y-bullet.type.size/2, bullet.type.size, bullet.type.size);
        }
    }

    raycast(origin, finish) {
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
        return this.world.map[ty][tx] != 0;
    }

    addBullet(position, angle, type, spread) {
        const spreadAngle = (Math.random()-0.5)*2 * spread;
        this.bullets.push({
            position: position,
            previous: position,
            angle: angle + spreadAngle,
            distance: 0,
            bounces: 0,
            type: type,
        });
    }

    deleteBullet(index) {
        this.bullets.splice(index, 1);
    }
}