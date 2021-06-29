import { Pile } from "../Pile"
import { ICriterion } from "./criteria/ICriterion"

export class Award {
    constructor(
        public name: string,
        public criteria: ICriterion[],
    ) { }

    getReward(piles: Pile[]) {
        return this.criteria.map(cr => cr.getReward(piles))
                            .reduce((a, b) => a + b)
    }
}
