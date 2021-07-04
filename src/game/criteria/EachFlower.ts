import { Flower } from "../cards/Flower"
import { Pile } from "../Pile"
import { Description } from "./Description"
import { ICriterion } from "./ICriterion"

export class EachFlower implements ICriterion {
    constructor(
        public flower: Flower,
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let matchingCards = cards.filter(c => c.getFlower() === this.flower).length
        return matchingCards * this.reward
    }

    getDescription() {
        return new Description(`Awards ${this.reward} points for each ${this.flower}`)
    }
}
