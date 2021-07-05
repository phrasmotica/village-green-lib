import { Feature } from "../cards/Feature"
import { Pile } from "../Pile"
import { Description } from "./Description"
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
        let featureName = this.feature.toLowerCase()
        let text = `Awards points for the number of ${featureName}s`

        let details = this.rewards.map(r => {
            let featureStr = r[0] === 1 ? featureName : `${featureName}s`
            let pointStr = r[1] === 1 ? "point" : "points"
            return `${r[0]} ${featureStr} => ${r[1]} ${pointStr}`
        })

        details.push("otherwise => 0 points")

        return new Description(text, details)
    }
}
