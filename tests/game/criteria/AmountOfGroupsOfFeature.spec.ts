import { AmountOfGroupsOfFeature } from "../../../src/game/criteria/AmountOfGroupsOfFeature"
import { Feature } from "../../../src/game/cards/Feature"
import { Pile } from "../../../src/game/Pile"
import { featureCard } from "../../Util"

describe("Amount of groups of feature", () => {
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
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
                new Pile([featureCard(Feature.Structure)]),
            ],
            expectedReward: 2,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
                new Pile([featureCard(Feature.Structure)]),
                new Pile([featureCard(Feature.Structure)]),
            ],
            expectedReward: 2,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new AmountOfGroupsOfFeature(Feature.Structure, 2, 2)

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
