import { Colour } from "./Colour"
import { Feature } from "./Feature"
import { Flower } from "./Flower"
import { FlowerCard } from "./FlowerCard"

/**
 * Represents a card with a feature.
 */
export class FeatureCard extends FlowerCard {
    constructor(
        colour: Colour,
        flower: Flower,
        public feature: Feature,
    ) {
        super(colour, flower)
    }

    getFeatures = () => [this.feature]
    getTrees = () => []
}
