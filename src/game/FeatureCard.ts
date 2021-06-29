import { Card } from "./Card"
import { Colour } from "./Colour"
import { Feature } from "./Feature"
import { Flower } from "./Flower"

/**
 * Represents a card with a feature.
 */
export class FeatureCard extends Card {
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
