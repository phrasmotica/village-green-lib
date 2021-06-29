import { AmountOfFeature } from "../../../../src/game/awards/criteria/AmountOfFeature"
import { Feature } from "../../../../src/game/Feature"
import { Pile } from "../../../../src/game/Pile"
import { featureCard } from "../../../Util"

describe("Amount of feature", () => {
    let testCases = [
        {
            piles: [],
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
                new Pile([featureCard(Feature.Lawn)]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
            ],
            expectedReward: 2,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
                new Pile([featureCard(Feature.Structure)]),
            ],
            expectedReward: 5,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
                new Pile([featureCard(Feature.Structure)]),
                new Pile([featureCard(Feature.Structure)]),
            ],
            expectedReward: 0,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new AmountOfFeature(Feature.Structure, [
                [0, 0],
                [1, 2],
                [2, 5],
            ])

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
