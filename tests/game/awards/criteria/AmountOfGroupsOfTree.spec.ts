import { AmountOfGroupsOfTree } from "../../../../src/game/awards/criteria/AmountOfGroupsOfTree"
import { Pile } from "../../../../src/game/Pile"
import { Tree } from "../../../../src/game/Tree"
import { treeCard } from "../../../Util"

describe("Amount of groups of tree", () => {
    let testCases = [
        {
            piles: [],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch, Tree.Oak])]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
                new Pile([treeCard([Tree.Oak])]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch, Tree.Birch])]),
            ],
            expectedReward: 2,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
                new Pile([treeCard([Tree.Birch, Tree.Willow])]),
            ],
            expectedReward: 2,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
                new Pile([treeCard([Tree.Birch, Tree.Oak])]),
                new Pile([treeCard([Tree.Birch, Tree.Willow])]),
            ],
            expectedReward: 2,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new AmountOfGroupsOfTree(Tree.Birch, 2, 2)

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
