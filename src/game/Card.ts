import { Colour } from "./Colour"
import { Feature } from "./Feature"
import { Flower } from "./Flower"
import { Tree } from "./Tree"

/**
 * Represents a card.
 */
export abstract class Card {
    constructor(
        public colour: Colour,
        public flower: Flower,
    ) { }

    abstract getFeatures(): Feature[]
    abstract getTrees(): Tree[]
}
