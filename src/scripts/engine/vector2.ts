export class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    multiply(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    divide(scalar: number): Vector2 {
        return new Vector2(this.x / scalar, this.y / scalar);
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vector2 {
        const len = this.length();
        return new Vector2(this.x / len, this.y / len);
    }
}