import { EachEmpty } from "../../../../src/game/awards/criteria/EachEmpty"
import { Feature } from "../../../../src/game/Feature"
import { Pile } from "../../../../src/game/Pile"
import { featureCard } from "../../../Util"

describe("Each empty", () => {
    let testCases = [
        {
            piles: [],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([])
            ],
            expectedReward: 2,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)])
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([]),
                new Pile([featureCard(Feature.Structure)]),
            ],
            expectedReward: 2,
        },
        {
            piles: [
                new Pile([featureCard(Feature.Structure)]),
                new Pile([featureCard(Feature.Structure)]),
            ],
            expectedReward: 0,
        },
        {
            piles: [
                new Pile([]),
                new Pile([]),
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
            expectedReward: 0,
        },
    ]

    testCases.forEach(t => {
        it("uses the correct reward for a given amount", () => {
            // arrange
            let criteria = new EachEmpty(2)

            // act
            let reward = criteria.getReward(t.piles)

            // assert
            expect(reward).toBe(t.expectedReward)
        })
    })
})
