import { EachLawn } from "../../../src/game/criteria/EachLawn"
import { Pile } from "../../../src/game/Pile"
import { Tree } from "../../../src/game/cards/Tree"
import { lawnCard, treeCard } from "../../Util"

describe("Each lawn", () => {
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
                new Pile([treeCard([Tree.Oak])]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Oak, Tree.Willow])]),
                new Pile([lawnCard()]),
            ],
            expectedReward: 1,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Oak, Tree.Willow])]),
                new Pile([lawnCard()]),
                new Pile([lawnCard()]),
            ],
            expectedReward: 2,
        },
        {
            piles: [
                new Pile([lawnCard()]),
                new Pile([lawnCard()]),
                new Pile([lawnCard()]),
            ],
            expectedReward: 3,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new EachLawn(1)

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
