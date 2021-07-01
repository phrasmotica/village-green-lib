import { GreenCard } from "./GreenCard"

/**
 * Represents a card with a lawn.
 */
export class LawnCard extends GreenCard {
    getColour = () => null
    getFlower = () => null
    getFeatures = () => []
    getTrees = () => []
    hasLawn = () => true
}
