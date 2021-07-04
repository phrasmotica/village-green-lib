import { Pile } from "../Pile"
import { Description } from "./Description"
import { ICriterion } from "./ICriterion"

export class AmountOfLawns implements ICriterion {
    constructor(
        public rewards: [number, number][],
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let amount = cards.filter(c => c.hasLawn()).length
        let rewardPair = this.rewards.find(r => r[0] === amount)
        if (rewardPair !== undefined) {
            return rewardPair[1]
        }

        return 0
    }

    getDescription() {
        let text = "Awards points for the number of lawns"

        let details = this.rewards.map(r => {
            let lawnStr = r[0] === 1 ? "lawn" : "lawns"
            let pointStr = r[1] === 1 ? "point" : "points"
            return `${r[0]} ${lawnStr} => ${r[1]} ${pointStr}`
        })

        details.push("otherwise => 0 points")

        return new Description(text, details)
    }
}
