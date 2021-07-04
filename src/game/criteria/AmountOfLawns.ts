import { Pile } from "../Pile"
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
        let description = `Awards points for the number of lawns:`
        this.rewards.forEach(r => {
            let lawnStr = r[0] === 1 ? "lawn" : "lawns"
            let pointStr = r[1] === 1 ? "point" : "points"
            description += `\n${r[0]} ${lawnStr} => ${r[1]} ${pointStr}`
        })

        description += "\notherwise 0 points"

        return description
    }
}
