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
        let pointStr = this.reward === 1 ? "point" : "points"
        return new Description(`Awards ${this.reward} ${pointStr} for each empty space`)
    }
}
