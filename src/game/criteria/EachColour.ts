import { Colour } from "../cards/Colour"
import { Pile } from "../Pile"
import { Description } from "./Description"
import { ICriterion } from "./ICriterion"

export class EachColour implements ICriterion {
    constructor(
        public colour: Colour,
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let matchingCards = cards.filter(c => c.getColour() === this.colour).length
        return matchingCards * this.reward
    }

    getDescription() {
        return new Description(`Awards ${this.reward} points for each ${this.colour} flower`)
    }
}
