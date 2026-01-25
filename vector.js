export function add(a, b) {
    return new Vec2(a.x + b.x, a.y + b.y);
}

export function normalize(a) {
    const len = Math.sqrt(a.x * a.x + a.y * a.y);
    if (len == 0) return a;

    const factor = 1 / len;

    a.x *= factor;
    a.y *= factor;
}

export function multiplyScalar(a, b) {
    a.x *= b;
    a.y *= b;
}

export class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}