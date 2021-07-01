import { AmountOfLawns } from "../../../src/game/criteria/AmountOfLawns"
import { Pile } from "../../../src/game/Pile"
import { Tree } from "../../../src/game/cards/Tree"
import { lawnCard, treeCard } from "../../Util"

describe("Amount of lawns", () => {
    let testCases = [
        {
            piles: [],
            expectedReward: 1,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
            ],
            expectedReward: 1,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch, Tree.Oak])]),
                new Pile([lawnCard()]),
            ],
            expectedReward: 2,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
                new Pile([treeCard([Tree.Oak])]),
            ],
            expectedReward: 1,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch, Tree.Oak])]),
                new Pile([lawnCard()]),
                new Pile([lawnCard()]),
            ],
            expectedReward: 3,
        },
        {
            piles: [
                new Pile([lawnCard()]),
                new Pile([lawnCard()]),
                new Pile([lawnCard()]),
            ],
            expectedReward: 6,
        },
        {
            piles: [
                new Pile([lawnCard()]),
                new Pile([lawnCard()]),
                new Pile([lawnCard()]),
                new Pile([lawnCard()]),
            ],
            expectedReward: 0,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new AmountOfLawns([
                [0, 1],
                [1, 2],
                [2, 3],
                [3, 6],
            ])

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
