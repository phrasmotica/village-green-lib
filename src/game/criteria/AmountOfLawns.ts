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
}
