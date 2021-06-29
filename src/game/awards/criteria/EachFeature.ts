import { Feature } from "../../Feature"
import { Pile } from "../../Pile"
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
}
