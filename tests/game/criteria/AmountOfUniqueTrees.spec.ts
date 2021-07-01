import { AmountOfUniqueTrees } from "../../../src/game/criteria/AmountOfUniqueTrees"
import { Pile } from "../../../src/game/Pile"
import { Tree } from "../../../src/game/cards/Tree"
import { treeCard } from "../../Util"

describe("Amount of unique trees", () => {
    let testCases = [
        {
            piles: [],
            expectedReward: -1,
        },
        {
            piles: [
                new Pile([treeCard([])])
            ],
            expectedReward: -1,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
            ],
            expectedReward: 1,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch, Tree.Birch])]),
            ],
            expectedReward: 1,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch, Tree.Oak])]),
            ],
            expectedReward: 3,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
                new Pile([treeCard([Tree.Oak])]),
            ],
            expectedReward: 3,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch, Tree.Oak])]),
                new Pile([treeCard([])]),
            ],
            expectedReward: 3,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch, Tree.Oak])]),
                new Pile([treeCard([Tree.Willow])]),
            ],
            expectedReward: 6,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
                new Pile([treeCard([Tree.Birch, Tree.Oak])]),
                new Pile([treeCard([Tree.Willow])]),
            ],
            expectedReward: 6,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
                new Pile([treeCard([Tree.Birch, Tree.Oak])]),
                new Pile([treeCard([Tree.Willow, "Elm" as Tree])]),
            ],
            expectedReward: 0,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new AmountOfUniqueTrees([
                [0, -1],
                [1, 1],
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
