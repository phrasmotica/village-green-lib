import { Colour } from "./Colour"
import { Flower } from "./Flower"
import { GreenCard } from "./GreenCard"
import { Tree } from "./Tree"

/**
 * Represents a card with trees.
 */
export class TreeCard extends GreenCard {
    constructor(
        colour: Colour,
        flower: Flower,
        public trees: Tree[],
    ) {
        super(colour, flower)
    }

    getFeatures = () => []
    getTrees = () => this.trees
}
