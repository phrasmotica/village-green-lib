import { Feature } from "./Feature"
import { GreenCard } from "./GreenCard"
import { Pile } from "./Pile"
import { VillageCard } from "./VillageCard"
import { Award } from "./awards/Award"

/**
 * Represents a grid.
 */
export class Grid {
    /**
     * Creates a new grid.
     */
    private constructor(
        public villageCard: VillageCard,
        public piles: Pile[][],
        public rowAwards: (Award | null)[],
        public columnAwards: (Award | null)[],
    ) { }

    /**
     * Returns an empty grid of the given width and height.
     */
    static create(width: number, height: number, villageCard: VillageCard, pileFact: () => Pile) {
        if (width <= 0 || height <= 0) {
            throw "Grid cannot have non-positive width or height!"
        }

        let piles = []

        for (let i = 0; i < height; i++) {
            let row = []

            for (let j = 0; j < width; j++) {
                row.push(pileFact())
            }

            piles.push(row)
        }

        let rowAwards = piles.map(_ => null)
        let columnAwards = piles[0].map(_ => null)

        return new Grid(villageCard, piles, rowAwards, columnAwards)
    }

    /**
     * Gets the piles in the row with the given index.
     */
    getPilesInRow(row: number) {
        return row < this.piles.length ? this.piles[row] : []
    }

    /**
     * Gets the piles in the column with the given index.
     */
    getPilesInColumn(col: number) {
        return col < this.piles[0].length ? this.piles.map(r => r[col]) : []
    }

    /**
     * Plays the given green card on the pile at the given location.
     */
    playCard(card: GreenCard, row: number, col: number) {
        if (row < 0 || row >= this.piles.length) {
            return false
        }

        if (col < 0 || col >= this.piles[0].length) {
            return false
        }

        let pile = this.piles[row][col]
        return pile.push(card)
    }

    /**
     * Flips the village card.
     */
    flipVillageCard() {
        this.villageCard.isFlipped = true
    }

    /**
     * Returns the score for the grid.
     */
    getScore() {
        let score = 0

        for (let i = 0; i < this.piles.length; i++) {
            let award = this.rowAwards[i]
            if (award !== null) {
                let pilesInRow = this.getPilesInRow(i)
                score += award.getReward(pilesInRow)
            }
        }

        for (let i = 0; i < this.piles[0].length; i++) {
            let award = this.columnAwards[i]
            if (award !== null) {
                let pilesInColumn = this.getPilesInColumn(i)
                score += award.getReward(pilesInColumn)
            }
        }

        for (let pile of this.piles.flatMap(r => r)) {
            if (!pile.isEmpty()) {
                let features = pile.topCard()!.getFeatures()
                let pondCount = features.filter(f => f === Feature.Pond).length
                score += pondCount * 2
            }
        }

        if (!this.villageCard.isFlipped) {
            score += 1
        }

        return score
    }
}
