import { Feature } from "../cards/Feature"
import { Pile } from "../Pile"
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
        let description = `Awards ${this.reward} points for having all of the following:`
        description += "\n1 structure"
        description += "\n1 tree"
        description += "\n1 pond OR 1 empty space"
        description += "\notherwise 0 points"

        return description
    }
}
