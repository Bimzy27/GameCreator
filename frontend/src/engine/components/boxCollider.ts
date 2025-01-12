import { Vector2 } from "../vector2.js";
import { Component } from "./component.js";

export class BoxCollider implements Component {
    private size: Vector2;

    constructor(size: Vector2) {
        this.size = size;
    }
}