import { Tree } from "../cards/Tree"
import { Pile } from "../Pile"
import { Description } from "./Description"
import { ICriterion } from "./ICriterion"

export class AmountOfGroupsOfTree implements ICriterion {
    constructor(
        public tree: Tree,
        public groupSize: number,
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let amount = cards.flatMap(c => c.getTrees()).filter(t => t === this.tree).length
        let amountOfGroups = Math.floor(amount / this.groupSize)
        return amountOfGroups * this.reward
    }

    getDescription() {
        let treeName = this.tree.toLowerCase()
        let pointStr = this.reward === 1 ? "point" : "points"
        return new Description(`Awards ${this.reward} ${pointStr} for every ${this.groupSize} ${treeName} trees`)
    }
}
