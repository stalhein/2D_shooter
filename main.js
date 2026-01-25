import { World } from "./world.js";
import { Player } from "./player.js";


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let screenWidth = 0;
let screenHeight = 0;

function resize() {
    const dpr = window.devicePixelRatio || 1;
    const cssSize = canvas.getBoundingClientRect();

    canvas.width = cssSize.width * dpr;
    canvas.height = cssSize.height * dpr;

    screenWidth = cssSize.width;
    screenHeight = cssSize.height;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    ctx.imageSmoothingEnabled = false;
}
resize();
window.addEventListener("resize", resize);


const world = new World();
const player = new Player();

function loop(time) {
    ctx.clearRect(0, 0, screenWidth, screenHeight);

    world.render(ctx, screenWidth, screenHeight, player.x, player.y);
    player.render(ctx, screenWidth, screenHeight);

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);