import { Feature } from "../cards/Feature"
import { Pile } from "../Pile"
import { ICriterion } from "./ICriterion"

export class NaturalAndManMade implements ICriterion {
    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)

        let features = cards.flatMap(c => c.getFeatures())
        let structureCount = features.filter(f => f === Feature.Structure).length

        let treeCount = cards.flatMap(c => c.getTrees()).length

        if (structureCount === 1) {
            if (treeCount === 0) {
                return -2
            }

            if (treeCount === 2) {
                return 4
            }
        }

        if (structureCount === 2 && treeCount === 2) {
            return 6
        }

        return 0
    }

    getDescription() {
        let description = "Awards points as follows:"
        description += "\n1 structure and 0 trees => -2 points"
        description += "\n1 structure and 2 trees => 4 points"
        description += "\n2 structures and 2 trees => 6 points"
        description += "\notherwise 0 points"

        return description
    }
}
