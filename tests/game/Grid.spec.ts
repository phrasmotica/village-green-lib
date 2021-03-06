import { AwardCard } from "../../src/game/cards/AwardCard"
import { Colour } from "../../src/game/cards/Colour"
import { Feature } from "../../src/game/cards/Feature"
import { Flower } from "../../src/game/cards/Flower"
import { GreenCard } from "../../src/game/cards/GreenCard"
import { Grid } from "../../src/game/Grid"
import { Pile } from "../../src/game/Pile"
import { awardCard, cardWith, featureCard, isAny, lawnCard, mock, pile, villageCard } from "../Util"

describe("Grid", () => {
    let sizes = [0, -2]
    sizes.forEach(v => {
        it("cannot have non-positive width", () => {
            expect(() => Grid.create(v, 3, villageCard(), pile)).toThrowError()
        })

        it("cannot have non-positive height", () => {
            expect(() => Grid.create(3, v, villageCard(), pile)).toThrowError()
        })
    })

    it("can be created with positive width and height", () => {
        expect(() => Grid.create(3, 3, villageCard(), pile)).not.toThrow()
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
            let grid = Grid.create(1, 1, villageCard(), pile)

            // act
            let success = grid.playGreenCard(featureCard(Feature.Structure), l[0], l[1])

            // assert
            expect(success).toBe(false)
        })
    })

    it("allows a green card to be played on a pile with an empty pile to it", () => {
        // arrange
        let grid = Grid.create(2, 1, villageCard(), pile)

        // act
        let success = grid.playGreenCard(cardWith(Colour.Red, Flower.Petunia), 0, 1)

        // assert
        expect(success).toBe(true)
    })

    it("allows a green card to be played on a pile with a lawn next to it", () => {
        // arrange
        let grid = Grid.create(2, 1, villageCard(), pile)
        grid.playGreenCard(lawnCard(), 0, 0)

        // act
        let success = grid.playGreenCard(cardWith(Colour.Red, Flower.Petunia), 0, 1)

        // assert
        expect(success).toBe(true)
    })

    it("allows a green card to be played on a pile with the same flower next to it", () => {
        // arrange
        let grid = Grid.create(2, 1, villageCard(), pile)
        grid.playGreenCard(cardWith(Colour.Red, Flower.Petunia), 0, 0)

        // act
        let success = grid.playGreenCard(cardWith(Colour.Yellow, Flower.Petunia), 0, 1)

        // assert
        expect(success).toBe(true)
    })

    it("allows a green card to be played on a pile with the same colour next to it", () => {
        // arrange
        let grid = Grid.create(2, 1, villageCard(), pile)
        grid.playGreenCard(cardWith(Colour.Red, Flower.Petunia), 0, 0)

        // act
        let success = grid.playGreenCard(cardWith(Colour.Red, Flower.Rose), 0, 1)

        // assert
        expect(success).toBe(true)
    })

    it("prevents a green card from being played on a pile with a different flower and colour next to it", () => {
        // arrange
        let grid = Grid.create(2, 1, villageCard(), pile)
        grid.playGreenCard(cardWith(Colour.Blue, Flower.Lily), 0, 0)

        // act
        let success = grid.playGreenCard(cardWith(Colour.Red, Flower.Petunia), 0, 1)

        // assert
        expect(success).toBe(false)
    })

    let adjacentPilesCases = [
        {
            pile: [0, 0],
            expected: [
                [1, 0],
                [0, 1],
            ],
        },
        {
            pile: [0, 1],
            expected: [
                [0, 0],
                [0, 2],
                [1, 1],
            ],
        },
        {
            pile: [0, 2],
            expected: [
                [0, 1],
                [1, 2],
            ],
        },
        {
            pile: [1, 0],
            expected: [
                [1, 1],
                [0, 0],
                [2, 0],
            ],
        },
        {
            pile: [1, 1],
            expected: [
                [1, 0],
                [1, 2],
                [0, 1],
                [2, 1],
            ],
        },
        {
            pile: [1, 2],
            expected: [
                [0, 2],
                [2, 2],
                [1, 1],
            ],
        },
        {
            pile: [2, 0],
            expected: [
                [1, 0],
                [2, 1],
            ],
        },
        {
            pile: [2, 1],
            expected: [
                [2, 0],
                [2, 2],
                [1, 1],
            ],
        },
        {
            pile: [2, 2],
            expected: [
                [1, 2],
                [2, 1],
            ],
        },
    ]

    adjacentPilesCases.forEach(c => {
        it("returns the correct adjacent piles", () => {
            // arrange
            let grid = Grid.create(3, 3, villageCard(), pile)

            // act
            let adjacentPileLocations = grid.getAdjacentPileLocations(c.pile[0], c.pile[1])

            // assert
            expect(adjacentPileLocations.sort()).toStrictEqual(c.expected.sort())
        })
    })

    it("allows an award card to be played in a slot", () => {
        // arrange
        let grid = Grid.create(1, 1, villageCard(), pile)

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
            let grid = Grid.create(1, 1, villageCard(), pile)

            // act
            let success = grid.playAwardCard(awardCard(), l[0], l[1])

            // assert
            expect(success).toBe(false)
        })
    })

    it("calculates a row score correctly", () => {
        // arrange
        let grid = Grid.create(1, 1, villageCard(), pile)

        let award = mock<AwardCard>()
        award.setup(m => m.getReward(isAny<Pile[]>())).returns(() => 2)

        grid.playAwardCard(award.object, false, 0)

        // act
        let rowScore = grid.getRowScore(0)

        // assert
        expect(rowScore).toBe(2)
    })

    it("calculates a row score as 0 if there is no award card", () => {
        // arrange
        let grid = Grid.create(1, 1, villageCard(), pile)

        // act
        let rowScore = grid.getRowScore(0)

        // assert
        expect(rowScore).toBe(0)
    })

    let invalidRows = [-1, 1]
    invalidRows.forEach(r => {
        it("does not calculate a row score for an out-of-range row", () => {
            // arrange
            let grid = Grid.create(1, 1, villageCard(), pile)

            // act and assert
            expect(() => grid.getRowScore(r)).toThrow()
        })
    })

    it("calculates a column score correctly", () => {
        // arrange
        let grid = Grid.create(1, 1, villageCard(), pile)

        let award = mock<AwardCard>()
        award.setup(m => m.getReward(isAny<Pile[]>())).returns(() => 2)

        grid.playAwardCard(award.object, true, 0)

        // act
        let columnScore = grid.getColumnScore(0)

        // assert
        expect(columnScore).toBe(2)
    })

    it("calculates a column score as 0 if there is no award card", () => {
        // arrange
        let grid = Grid.create(1, 1, villageCard(), pile)

        // act
        let columnScore = grid.getColumnScore(0)

        // assert
        expect(columnScore).toBe(0)
    })

    let invalidColumns = [-1, 1]
    invalidColumns.forEach(c => {
        it("does not calculate a column score for an out-of-range column", () => {
            // arrange
            let grid = Grid.create(1, 1, villageCard(), pile)

            // act and assert
            expect(() => grid.getColumnScore(c)).toThrow()
        })
    })

    it("calculates the total score correctly", () => {
        // arrange
        let grid = Grid.create(2, 1, villageCard(), pile)

        grid.playGreenCard(featureCard(Feature.Pond), 0, 0)

        let rowAward = mock<AwardCard>()
        rowAward.setup(m => m.getReward(isAny<Pile[]>())).returns(() => 2)

        grid.playAwardCard(rowAward.object, false, 0)

        let colAward1 = mock<AwardCard>()
        colAward1.setup(m => m.getReward(isAny<Pile[]>())).returns(() => 3)

        grid.playAwardCard(colAward1.object, true, 0)

        let colAward2 = mock<AwardCard>()
        colAward2.setup(m => m.getReward(isAny<Pile[]>())).returns(() => 4)

        grid.playAwardCard(colAward2.object, true, 1)

        // act
        let score = grid.getScore()

        // assert
        expect(score).toBe(12)
    })

    it("calculates the total score correctly with a flipped village card", () => {
        // arrange
        let grid = Grid.create(2, 1, villageCard(), pile)

        let rowAward = mock<AwardCard>()
        rowAward.setup(m => m.getReward(isAny<Pile[]>())).returns(() => 2)

        grid.playAwardCard(rowAward.object, false, 0)

        let colAward1 = mock<AwardCard>()
        colAward1.setup(m => m.getReward(isAny<Pile[]>())).returns(() => 3)

        grid.playAwardCard(colAward1.object, true, 0)

        let colAward2 = mock<AwardCard>()
        colAward2.setup(m => m.getReward(isAny<Pile[]>())).returns(() => 4)

        grid.playAwardCard(colAward2.object, true, 1)

        grid.flipVillageCard()

        // act
        let score = grid.getScore()

        // assert
        expect(score).toBe(9)
    })

    it("can be cleared", () => {
        // arrange
        let grid = Grid.create(1, 1, villageCard(), pile)

        // act
        grid.clear()

        // assert
        expect(grid.rowAwards).toStrictEqual([null])
        expect(grid.columnAwards).toStrictEqual([null])
    })
})
