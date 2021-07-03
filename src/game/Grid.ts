import { Feature } from "./cards/Feature"
import { GreenCard } from "./cards/GreenCard"
import { VillageCard } from "./cards/VillageCard"
import { Pile } from "./Pile"
import { AwardCard } from "./cards/AwardCard"

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
        public rowAwards: (AwardCard | null)[],
        public columnAwards: (AwardCard | null)[],
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
    playGreenCard(card: GreenCard, row: number, col: number) {
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
     * Plays the given award card in the given location.
     */
    playAwardCard(card: AwardCard, onColumn: boolean, location: number) {
        let awardSlots = onColumn ? this.columnAwards : this.rowAwards

        if (location < 0 || location >= awardSlots.length) {
            return false
        }

        awardSlots[location] = card
        return true
    }

    /**
     * Flips the village card.
     */
    flipVillageCard() {
        this.villageCard.isFlipped = true
    }

    /**
     * Returns the score for the given row.
     */
    getRowScore(row: number) {
        if (row < 0 || row >= this.piles.length) {
            throw `Row ${row} is out of range!`
        }

        let award = this.rowAwards[row]
        let pilesInRow = this.getPilesInRow(row)
        return award?.getReward(pilesInRow) ?? 0
    }

    /**
     * Returns the score for the given column.
     */
    getColumnScore(column: number) {
        if (column < 0 || column >= this.piles[0].length) {
            throw `Column ${column} is out of range!`
        }

        let award = this.columnAwards[column]
        let pilesInColumn = this.getPilesInColumn(column)
        return award?.getReward(pilesInColumn) ?? 0
    }

    /**
     * Returns the score for the grid.
     */
    getScore() {
        let score = 0

        for (let i = 0; i < this.piles.length; i++) {
            score += this.getRowScore(i)
        }

        for (let i = 0; i < this.piles[0].length; i++) {
            score += this.getColumnScore(i)
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

    /**
     * Clears the grid.
     */
    clear() {
        this.rowAwards = this.piles.map(_ => null)
        this.columnAwards = this.piles[0].map(_ => null)

        this.piles.flatMap(row => row).forEach(pile => pile.clear())
    }
}
