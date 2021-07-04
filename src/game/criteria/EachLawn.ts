import { Pile } from "../Pile"
import { ICriterion } from "./ICriterion"

export class EachLawn implements ICriterion {
    constructor(
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let amount = cards.filter(c => c.hasLawn()).length
        return amount * this.reward
    }

    getDescription() {
        return `Awards ${this.reward} points for each Lawn`
    }
}
