import { Pile } from "../Pile"
import { Tree } from "../cards/Tree"
import { ICriterion } from "./ICriterion"
import { Description } from "./Description"

export class EachTree implements ICriterion {
    constructor(
        public tree: Tree,
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let matchingTrees = cards.flatMap(c => c.getTrees()).filter(t => t === this.tree).length
        return matchingTrees * this.reward
    }

    getDescription() {
        let treeName = this.tree.toLowerCase()
        let pointStr = this.reward === 1 ? "point" : "points"
        return new Description(`Awards ${this.reward} ${pointStr} for each ${treeName} tree`)
    }
}
