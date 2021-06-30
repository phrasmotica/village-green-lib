import { Card } from "./Card"

export class VillageCard extends Card {
    constructor(
        public name: string,
        public isFlipped: boolean = false,
    ) {
        super()
    }
}
