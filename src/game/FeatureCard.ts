import { Colour } from "./Colour"
import { Feature } from "./Feature"
import { Flower } from "./Flower"
import { GreenCard } from "./GreenCard"

/**
 * Represents a card with a feature.
 */
export class FeatureCard extends GreenCard {
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
