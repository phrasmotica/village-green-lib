import { FeatureVariety } from "../../../../src/game/awards/criteria/FeatureVariety"
import { Feature } from "../../../../src/game/cards/Feature"
import { Pile } from "../../../../src/game/Pile"
import { Tree } from "../../../../src/game/cards/Tree"
import { featureCard, treeCard } from "../../../Util"

describe("Feature variety", () => {
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
                new Pile([featureCard(Feature.Structure)]),
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
                new Pile([featureCard(Feature.Pond)]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
                new Pile([featureCard(Feature.Pond)]),
            ],
            expectedReward: 0,
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
                new Pile([treeCard([Tree.Oak])]),
                new Pile([]),
            ],
            expectedReward: 6,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
                new Pile([treeCard([Tree.Oak])]),
                new Pile([featureCard(Feature.Pond)]),
            ],
            expectedReward: 6,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new FeatureVariety(6)

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
