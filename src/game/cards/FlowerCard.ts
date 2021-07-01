import { Colour } from "./Colour"
import { Flower } from "./Flower"
import { GreenCard } from "./GreenCard"

/**
 * Represents a card with a flower.
 */
export abstract class FlowerCard extends GreenCard {
    constructor(
        public colour: Colour,
        public flower: Flower,
    ) {
        super()
    }

    getColour = () => this.colour
    getFlower = () => this.flower
    hasLawn = () => false
}
