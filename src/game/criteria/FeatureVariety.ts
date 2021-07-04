import { Feature } from "../cards/Feature"
import { Pile } from "../Pile"
import { Description } from "./Description"
import { ICriterion } from "./ICriterion"

export class FeatureVariety implements ICriterion {
    constructor(
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let emptyCount = piles.filter(p => p.isEmpty()).length

        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)

        let features = cards.flatMap(c => c.getFeatures())
        let structureCount = features.filter(f => f === Feature.Structure).length
        let pondCount = features.filter(f => f === Feature.Pond).length

        let treeCount = cards.flatMap(c => c.getTrees()).length

        if (structureCount === 1 && treeCount === 1 && (pondCount === 1 || emptyCount === 1)) {
            return this.reward
        }

        return 0
    }

    getDescription() {
        let text = `Awards ${this.reward} points for having all of the following`

        let details = [
            "1 structure",
            "1 tree",
            "1 pond OR 1 empty space",
        ]

        let ending = "otherwise awards 0 points"

        return new Description(text, details, ending)
    }
}
