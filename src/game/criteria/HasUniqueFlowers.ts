import { Pile } from "../Pile"
import { Description } from "./Description"
import { ICriterion } from "./ICriterion"

export class HasUniqueFlowers implements ICriterion {
    constructor(
        public amount: number,
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let numberOfUniqueFlowers = [...new Set(cards.map(c => c.getFlower()).filter(f => f !== null))].length
        return numberOfUniqueFlowers >= this.amount ? this.reward : 0
    }

    getDescription() {
        let pointStr = this.reward === 1 ? "point" : "points"
        return new Description(`Awards ${this.reward} ${pointStr} for having ${this.amount} unique flowers`)
    }
}
