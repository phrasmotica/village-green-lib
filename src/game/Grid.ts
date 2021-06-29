import { Feature } from "./Feature"
import { Pile } from "./Pile"

import { Award } from "./awards/Award"

/**
 * Represents a grid.
 */
export class Grid {
    /**
     * Creates a new grid.
     */
    private constructor(
        private width: number,
        private height: number,
        public piles: Pile[],
        public rowAwards: (Award | null)[],
        public columnAwards: (Award | null)[],
    ) { }

    /**
     * Returns an empty grid of the given width and height.
     */
    static empty(width: number, height: number) {
        let piles = []
        for (let i = 0; i < width * height; i++) {
            piles.push(new Pile([]))
        }

        let rowAwards = []
        for (let i = 0; i < height; i++) {
            rowAwards.push(null)
        }

        let columnAwards = []
        for (let i = 0; i < width; i++) {
            columnAwards.push(null)
        }

        return new Grid(width, height, piles, rowAwards, columnAwards)
    }

    /**
     * Gets the piles in the row with the given index.
     */
    getPilesInRow(row: number) {
        if (row >= this.height) {
            return []
        }

        return this.piles.slice(row * this.width, this.width)
    }

    /**
     * Gets the piles in the column with the given index.
     */
    getPilesInColumn(col: number) {
        if (col >= this.width) {
            return []
        }

        // get every nth element of the array of pile offset by the column index,
        // where n is the width of the grid
        return this.piles.filter((_, index) => (index - col) % this.width === 0)
    }

    /**
     * Returns the score for the grid.
     */
    getScore() {
        let score = 0

        for (let i = 0; i < this.height; i++) {
            let award = this.rowAwards[i]
            if (award !== null) {
                let pilesInRow = this.getPilesInRow(i)
                score += award.getReward(pilesInRow)
            }
        }

        for (let i = 0; i < this.width; i++) {
            let award = this.columnAwards[i]
            if (award !== null) {
                let pilesInColumn = this.getPilesInColumn(i)
                score += award.getReward(pilesInColumn)
            }
        }

        for (let pile of this.piles) {
            if (!pile.isEmpty()) {
                let features = pile.topCard()!.getFeatures()
                let pondCount = features.filter(f => f === Feature.Pond).length
                score += pondCount * 2
            }
        }

        return score
    }
}
