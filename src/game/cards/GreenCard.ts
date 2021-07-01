import { Card } from "./Card"
import { Colour } from "./Colour"
import { Feature } from "./Feature"
import { Flower } from "./Flower"
import { Tree } from "./Tree"

/**
 * Represents a green card.
 */
export abstract class GreenCard extends Card {
    abstract getColour(): Colour | null
    abstract getFlower(): Flower | null
    abstract getFeatures(): Feature[]
    abstract getTrees(): Tree[]
    abstract hasLawn(): boolean
}
