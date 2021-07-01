import { EachColour } from "../../../src/game/criteria/EachColour"
import { Colour } from "../../../src/game/cards/Colour"
import { Flower } from "../../../src/game/cards/Flower"
import { Pile } from "../../../src/game/Pile"
import { cardWith } from "../../Util"

describe("Each colour", () => {
    let testCases = [
        {
            piles: [],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([cardWith(Colour.Blue, Flower.Lily)]),
            ],
            expectedReward: 3,
        },
        {
            piles: [
                new Pile([cardWith(Colour.Blue, Flower.Lily)]),
                new Pile([cardWith(Colour.Yellow, Flower.Lily)]),
            ],
            expectedReward: 3,
        },
        {
            piles: [
                new Pile([cardWith(Colour.Blue, Flower.Lily)]),
                new Pile([cardWith(Colour.Blue, Flower.Petunia)]),
            ],
            expectedReward: 6,
        },
        {
            piles: [
                new Pile([cardWith(Colour.Blue, Flower.Lily)]),
                new Pile([cardWith(Colour.Yellow, Flower.Petunia)]),
                new Pile([cardWith(Colour.Blue, Flower.Lily)]),
            ],
            expectedReward: 6,
        },
        {
            piles: [
                new Pile([cardWith(Colour.Blue, Flower.Lily)]),
                new Pile([cardWith(Colour.Blue, Flower.Petunia)]),
                new Pile([cardWith(Colour.Blue, Flower.Rose)]),
            ],
            expectedReward: 9,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new EachColour(Colour.Blue, 3)

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
