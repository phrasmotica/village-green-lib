import { Card } from "../../src/game/Card"
import { Feature } from "../../src/game/Feature"
import { Grid } from "../../src/game/Grid"
import { Pile } from "../../src/game/Pile"
import { featureCard, isAny, mock } from "../Util"

describe("Grid", () => {
    let sizes = [0, -2]
    sizes.forEach(v => {
        it("cannot have non-positive width", () => {
            expect(() => Grid.create(v, 3, () => new Pile([]))).toThrowError()
        })

        it("cannot have non-positive height", () => {
            expect(() => Grid.create(3, v, () => new Pile([]))).toThrowError()
        })
    })

    it("can be created with positive width and height", () => {
        expect(() => Grid.create(3, 3, () => new Pile([]))).not.toThrow()
    })

    it("allows a card to be played on a pile", () => {
        // arrange
        let pile = mock<Pile>()
        pile.setup(m => m.canBePlayed(isAny<Card>())).returns(() => true)
        pile.setup(m => m.push(isAny<Card>())).returns(() => true)

        let grid = Grid.create(1, 1, () => pile.object)

        // act
        let success = grid.playCard(featureCard(Feature.Structure), 0, 0)

        // assert
        expect(success).toBe(true)
    })

    let locations = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ]

    locations.forEach(l => {
        it("prevents a card from being played on an out-of-range pile", () => {
            // arrange
            let grid = Grid.create(1, 1, () => new Pile([]))

            // act
            let success = grid.playCard(featureCard(Feature.Structure), l[0], l[1])

            // assert
            expect(success).toBe(false)
        })
    })
})
