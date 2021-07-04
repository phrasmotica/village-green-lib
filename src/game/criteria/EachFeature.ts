import { Feature } from "../cards/Feature"
import { Pile } from "../Pile"
import { Description } from "./Description"
import { ICriterion } from "./ICriterion"

export class EachFeature implements ICriterion {
    constructor(
        public feature: Feature,
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let amount = cards.flatMap(c => c.getFeatures()).filter(f => f === this.feature).length
        return amount * this.reward
    }

    getDescription() {
        return new Description(`Awards ${this.reward} points for each ${this.feature}`)
    }
}
