import { Pile } from "../Pile"
import { Description } from "./Description"
import { ICriterion } from "./ICriterion"

export class EachEmpty implements ICriterion {
    constructor(
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let matchingPiles = piles.filter(p => p.isEmpty()).length
        return matchingPiles * this.reward
    }

    getDescription() {
        return new Description(`Awards ${this.reward} points for each empty space`)
    }
}
