import { Pile } from "../../Pile"
import { Tree } from "../../Tree"
import { ICriterion } from "./ICriterion"

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
}
