import { Pile } from "../Pile"
import { Description } from "./Description"
import { ICriterion } from "./ICriterion"

export class AmountOfTrees implements ICriterion {
    constructor(
        public rewards: [number, number][],
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let amount = cards.flatMap(c => c.getTrees()).length
        let rewardPair = this.rewards.find(r => r[0] === amount)
        if (rewardPair !== undefined) {
            return rewardPair[1]
        }

        return 0
    }

    getDescription() {
        let text = "Awards points for the number of trees"

        let details = this.rewards.map(r => {
            let treeStr = r[0] === 1 ? "tree" : "trees"
            let pointStr = r[1] === 1 ? "point" : "points"
            return `${r[0]} ${treeStr} => ${r[1]} ${pointStr}`
        })

        details.push("otherwise => 0 points")

        return new Description(text, details)
    }
}
