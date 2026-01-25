export function add(a, b) {
    return new Vec2(a.x + b.x, a.y + b.y);
}

export function normalize(a) {
    const len = Math.sqrt(a.x * a.x + a.y * a.y);
    if (len == 0) return a;

    const factor = 1 / len;

    a.x *= factor;
    a.y *= factor;

    return a;
}

export function multiplyScalar(a, factor) {
    let result = new Vec2(a.x, a.y);
    result.x *= factor;
    result.y *= factor;

    return result;
}

export function length(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y);
}

export function clamp(a, length) {
    const lengthA = this.length(a);
    if (lengthA < length) return a;
    const factor = length / lengthA;
    a.x *= factor;
    a.y *= factor;
}

export class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}