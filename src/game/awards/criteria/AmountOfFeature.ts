import { Feature } from "../../cards/Feature"
import { Pile } from "../../Pile"
import { ICriterion } from "./ICriterion"

export class AmountOfFeature implements ICriterion {
    constructor(
        public feature: Feature,
        public rewards: [number, number][],
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let amount = cards.flatMap(c => c.getFeatures()).filter(f => f === this.feature).length
        let rewardPair = this.rewards.find(r => r[0] === amount)
        if (rewardPair !== undefined) {
            return rewardPair[1]
        }

        return 0
    }
}
