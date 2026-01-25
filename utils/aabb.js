

export function intersects(a, b) {
    return a.x < b.x + b.width && 
        a.x + a.width > b.x &&
        a.y < b.y + b.height && 
        a.y + a.height > b.y;
}

export class AABB {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}