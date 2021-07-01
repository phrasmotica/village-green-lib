import { Feature } from "../../src/game/cards/Feature"
import { GreenCard } from "../../src/game/cards/GreenCard"
import { Grid } from "../../src/game/Grid"
import { Pile } from "../../src/game/Pile"
import { awardCard, featureCard, isAny, mock, villageCard } from "../Util"

describe("Grid", () => {
    let sizes = [0, -2]
    sizes.forEach(v => {
        it("cannot have non-positive width", () => {
            expect(() => Grid.create(v, 3, villageCard(), () => new Pile([]))).toThrowError()
        })

        it("cannot have non-positive height", () => {
            expect(() => Grid.create(3, v, villageCard(), () => new Pile([]))).toThrowError()
        })
    })

    it("can be created with positive width and height", () => {
        expect(() => Grid.create(3, 3, villageCard(), () => new Pile([]))).not.toThrow()
    })

    it("allows a green card to be played on a pile", () => {
        // arrange
        let pile = mock<Pile>()
        pile.setup(m => m.canBePlayed(isAny<GreenCard>())).returns(() => true)
        pile.setup(m => m.push(isAny<GreenCard>())).returns(() => true)

        let grid = Grid.create(1, 1, villageCard(), () => pile.object)

        // act
        let success = grid.playGreenCard(featureCard(Feature.Structure), 0, 0)

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
        it("prevents a green card from being played on an out-of-range pile", () => {
            // arrange
            let grid = Grid.create(1, 1, villageCard(), () => new Pile([]))

            // act
            let success = grid.playGreenCard(featureCard(Feature.Structure), l[0], l[1])

            // assert
            expect(success).toBe(false)
        })
    })

    it("allows an award card to be played in a slot", () => {
        // arrange
        let grid = Grid.create(1, 1, villageCard(), () => new Pile([]))

        // act
        let success = grid.playAwardCard(awardCard(), false, 0)

        // assert
        expect(success).toBe(true)
    })

    let slotLocations: [boolean, number][] = [
        [false, -1],
        [false, 1],
        [true, -1],
        [true, 1],
    ]

    slotLocations.forEach(l => {
        it("prevents an award card from being played in an out-of-range slot", () => {
            // arrange
            let grid = Grid.create(1, 1, villageCard(), () => new Pile([]))

            // act
            let success = grid.playAwardCard(awardCard(), l[0], l[1])

            // assert
            expect(success).toBe(false)
        })
    })

    it("can be cleared", () => {
        // arrange
        let grid = Grid.create(1, 1, villageCard(), () => new Pile([]))

        // act
        grid.clear()

        // assert
        expect(grid.rowAwards).toStrictEqual([null])
        expect(grid.columnAwards).toStrictEqual([null])
    })
})
