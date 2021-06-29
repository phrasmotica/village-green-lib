import { Pile } from "../../Pile"
import { ICriterion } from "./ICriterion"

export class EachEmpty implements ICriterion {
    constructor(
        public reward: number,
    ) { }

    getReward(piles: Pile[]) {
        let matchingPiles = piles.filter(p => p.isEmpty()).length
        return matchingPiles * this.reward
    }
}
