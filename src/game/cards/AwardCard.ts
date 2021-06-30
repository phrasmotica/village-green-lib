import { Pile } from "../Pile"
import { ICriterion } from "../criteria/ICriterion"
import { Card } from "./Card"

export class AwardCard extends Card {
    constructor(
        public name: string,
        public criteria: ICriterion[],
    ) {
        super()
    }

    getReward(piles: Pile[]) {
        return this.criteria.map(cr => cr.getReward(piles))
                            .reduce((a, b) => a + b)
    }
}
