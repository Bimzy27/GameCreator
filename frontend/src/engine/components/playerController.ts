import { Transform } from "../transform.js";
import { Component } from "./component.js";

export class PlayerController implements Component {
    private transform: Transform;
    constructor(transform: Transform) {
        this.transform = transform;
    }
}