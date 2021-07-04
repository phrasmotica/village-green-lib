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

    getDescription() {
        return this.criteria.map(cr => cr.getDescription())
                            .map((d, i) => `${i + 1}. ${d}`)
                            .reduce((a, b) => a + "\n\n" + b)
    }
}
