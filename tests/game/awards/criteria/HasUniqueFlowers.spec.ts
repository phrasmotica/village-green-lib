import { HasUniqueFlowers } from "../../../../src/game/awards/criteria/HasUniqueFlowers"
import { Colour } from "../../../../src/game/Colour"
import { Flower } from "../../../../src/game/Flower"
import { Pile } from "../../../../src/game/Pile"
import { cardWith } from "../../../Util"

describe("Has unique flowers", () => {
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
                new Pile([cardWith(Colour.Red, Flower.Lily)]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([cardWith(Colour.Red, Flower.Lily)]),
                new Pile([cardWith(Colour.Yellow, Flower.Petunia)]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([cardWith(Colour.Red, Flower.Lily)]),
                new Pile([cardWith(Colour.Yellow, Flower.Petunia)]),
                new Pile([cardWith(Colour.Yellow, Flower.Petunia)]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([cardWith(Colour.Yellow, Flower.Lily)]),
                new Pile([cardWith(Colour.Blue, Flower.Petunia)]),
                new Pile([cardWith(Colour.Blue, Flower.Rose)]),
            ],
            expectedReward: 5,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new HasUniqueFlowers(3, 5)

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
