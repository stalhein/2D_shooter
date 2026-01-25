import { Constants, Globals } from "./constants.js";
import { World } from "./world.js";
import { Player } from "./player.js";
import * as vector from "./utils/vector.js";


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
    const dpr = window.devicePixelRatio || 1;
    const cssSize = canvas.getBoundingClientRect();

    canvas.width = cssSize.width * dpr;
    canvas.height = cssSize.height * dpr;

    Globals.screenWidth = cssSize.width;
    Globals.screenHeight = cssSize.height;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    ctx.imageSmoothingEnabled = false;
}
resize();
window.addEventListener("resize", resize);

let lastTime = performance.now();

const world = new World();
const player = new Player(world);

function loop(time) {
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    ctx.clearRect(0, 0, Globals.screenWidth, Globals.screenHeight);

    player.update(dt, world.map);
    world.update(dt);

    world.render(ctx, player.position);
    player.render(ctx);

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);