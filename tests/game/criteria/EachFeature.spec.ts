import { EachFeature } from "../../../src/game/criteria/EachFeature"
import { Feature } from "../../../src/game/cards/Feature"
import { Pile } from "../../../src/game/Pile"
import { Tree } from "../../../src/game/cards/Tree"
import { featureCard, treeCard } from "../../Util"

describe("Each feature", () => {
    let testCases = [
        {
            piles: [],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([])
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])])
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Lawn)]),
            ],
            expectedReward: 3,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
                new Pile([featureCard(Feature.Lawn)]),
            ],
            expectedReward: 3,
        },
        {
            piles: [
                new Pile([treeCard([Tree.Birch])]),
                new Pile([featureCard(Feature.Lawn)]),
                new Pile([featureCard(Feature.Lawn)]),
            ],
            expectedReward: 6,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Lawn)]),
                new Pile([featureCard(Feature.Lawn)]),
                new Pile([featureCard(Feature.Lawn)]),
            ],
            expectedReward: 9,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new EachFeature(Feature.Lawn, 3)

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
