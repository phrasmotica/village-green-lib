import { AmountOfTrees } from "../../../src/game/criteria/AmountOfTrees"
import { Pile } from "../../../src/game/Pile"
import { Tree } from "../../../src/game/cards/Tree"
import { treeCard } from "../../Util"

describe("Amount of trees", () => {
    let testCases = [
        {
            piles: [],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([treeCard([])])
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
            ],
            expectedReward: 2,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch, Tree.Oak])]),
            ],
            expectedReward: 4,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
                new Pile([treeCard([Tree.Oak])]),
            ],
            expectedReward: 4,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch, Tree.Oak])]),
                new Pile([treeCard([])]),
            ],
            expectedReward: 4,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch, Tree.Oak])]),
                new Pile([treeCard([Tree.Willow])]),
            ],
            expectedReward: 7,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
                new Pile([treeCard([Tree.Birch, Tree.Oak])]),
                new Pile([treeCard([Tree.Willow])]),
            ],
            expectedReward: 0,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new AmountOfTrees([
                [0, 0],
                [1, 2],
                [2, 4],
                [3, 7],
            ])

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
