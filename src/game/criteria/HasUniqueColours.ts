import { Pile } from "../Pile"
import { Description } from "./Description"
import { ICriterion } from "./ICriterion"

export class HasUniqueColours implements ICriterion {
    constructor(
        public amount: number,
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let numberOfUniqueColours = [...new Set(cards.map(c => c.getColour()).filter(c => c !== null))].length
        return numberOfUniqueColours === this.amount ? this.reward : 0
    }

    getDescription() {
        let pointStr = this.reward === 1 ? "point" : "points"
        return new Description(`Awards ${this.reward} ${pointStr} for having ${this.amount} unique colours of flower`)
    }
}
