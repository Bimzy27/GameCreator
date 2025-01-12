import { Component } from "./component.js";

export class SpriteRenderer implements Component {
    private spriteName: string;
    private color: string;

    constructor(spriteName: string, color: string) {
        this.spriteName = spriteName;
        this.color = color;
    }
}