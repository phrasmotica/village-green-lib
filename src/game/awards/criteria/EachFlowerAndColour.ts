import { Colour } from "../../Colour"
import { Flower } from "../../Flower"
import { Pile } from "../../Pile"
import { ICriterion } from "./ICriterion"

export class EachFlowerAndColour implements ICriterion {
    constructor(
        public flower: Flower,
        public colour: Colour,
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let cards = piles.filter(p => !p.isEmpty()).map(p => p.topCard()!)
        let matchingCards = cards.filter(c => c.flower === this.flower && c.colour === this.colour).length
        return matchingCards * this.reward
    }
}
