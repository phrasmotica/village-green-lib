import { EachCard } from "../../../src/game/criteria/EachCard"
import { Feature } from "../../../src/game/cards/Feature"
import { Pile } from "../../../src/game/Pile"
import { featureCard } from "../../Util"

describe("Each card", () => {
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
                new Pile([featureCard(Feature.Structure)])
            ],
            expectedReward: 2,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
                new Pile([featureCard(Feature.Structure)]),
            ],
            expectedReward: 4,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
                new Pile([featureCard(Feature.Structure)]),
                new Pile([featureCard(Feature.Structure)]),
            ],
            expectedReward: 6,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new EachCard(2)

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
