import { Colour } from "../cards/Colour"
import { Flower } from "../cards/Flower"
import { Pile } from "../Pile"
import { Description } from "./Description"
import { ICriterion } from "./ICriterion"

export class EachFlowerAndColour implements ICriterion {
    constructor(
        public flower: Flower,
        public colour: Colour,
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let matchingCards = cards.filter(c => c.getFlower() === this.flower && c.getColour() === this.colour).length
        return matchingCards * this.reward
    }

    getDescription() {
        let pointStr = this.reward === 1 ? "point" : "points"
        let colourName = this.colour.toLowerCase()
        let flowerName = this.flower.toLowerCase()
        return new Description(`Awards ${this.reward} ${pointStr} for each ${colourName} ${flowerName}`)
    }
}
