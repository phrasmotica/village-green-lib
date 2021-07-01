import { Colour } from "./Colour"
import { Flower } from "./Flower"
import { FlowerCard } from "./FlowerCard"
import { Tree } from "./Tree"

/**
 * Represents a card with trees.
 */
export class TreeCard extends FlowerCard {
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
