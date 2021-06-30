import { EachTree } from "../../../../src/game/awards/criteria/EachTree"
import { Pile } from "../../../../src/game/Pile"
import { Tree } from "../../../../src/game/cards/Tree"
import { treeCard } from "../../../Util"

describe("Each feature", () => {
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
            expectedReward: 1,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Oak, Tree.Willow])]),
            ],
            expectedReward: 1,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Oak, Tree.Oak])]),
            ],
            expectedReward: 2,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Oak])]),
                new Pile([treeCard([Tree.Oak])]),
            ],
            expectedReward: 2,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Oak, Tree.Birch])]),
                new Pile([treeCard([Tree.Oak, Tree.Oak])]),
            ],
            expectedReward: 3,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new EachTree(Tree.Oak, 1)

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
