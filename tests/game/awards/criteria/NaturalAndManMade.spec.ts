import { NaturalAndManMade } from "../../../../src/game/awards/criteria/NaturalAndManMade"
import { Feature } from "../../../../src/game/cards/Feature"
import { Pile } from "../../../../src/game/Pile"
import { Tree } from "../../../../src/game/cards/Tree"
import { featureCard, treeCard } from "../../../Util"

describe("Natural and man-made", () => {
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
                new Pile([featureCard(Feature.Structure)]),
            ],
            expectedReward: -2,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
                new Pile([treeCard([Tree.Oak])]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
                new Pile([treeCard([Tree.Oak, Tree.Birch])]),
            ],
            expectedReward: 4,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
                new Pile([featureCard(Feature.Structure)]),
                new Pile([treeCard([Tree.Oak, Tree.Birch])]),
            ],
            expectedReward: 6,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
                new Pile([treeCard([Tree.Birch])]),
                new Pile([treeCard([Tree.Oak, Tree.Willow])]),
            ],
            expectedReward: 0,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new NaturalAndManMade()

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
