import { Feature } from "../cards/Feature"
import { Pile } from "../Pile"
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

    getDescription() {
        let description = `Awards points for the number of ${this.feature}s:`
        this.rewards.forEach(r => {
            let featureStr = r[0] === 1 ? this.feature : `${this.feature}s`
            let pointStr = r[1] === 1 ? "point" : "points"
            description += `\n${r[0]} ${featureStr} => ${r[1]} ${pointStr}`
        })

        description += "\notherwise 0 points"

        return description
    }
}
