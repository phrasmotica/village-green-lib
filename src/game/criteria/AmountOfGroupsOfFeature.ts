import { Feature } from "../cards/Feature"
import { Pile } from "../Pile"
import { Description } from "./Description"
import { ICriterion } from "./ICriterion"

export class AmountOfGroupsOfFeature implements ICriterion {
    constructor(
        public feature: Feature,
        public groupSize: number,
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let amount = cards.flatMap(c => c.getFeatures()).filter(f => f === this.feature).length
        let amountOfGroups = Math.floor(amount / this.groupSize)
        return amountOfGroups * this.reward
    }

    getDescription() {
        let featureName = this.feature.toLowerCase()
        let pointStr = this.reward === 1 ? "point" : "points"
        return new Description(`Awards ${this.reward} ${pointStr} for every ${this.groupSize} ${featureName}s`)
    }
}
