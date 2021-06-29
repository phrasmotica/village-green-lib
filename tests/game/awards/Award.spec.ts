import { Award } from "../../../src/game/awards/Award"
import { ICriterion } from "../../../src/game/awards/criteria/ICriterion"
import { Pile } from "../../../src/game/Pile"
import { isAny, mock } from "../../Util"

describe("Award", () => {
    it("returns the correct reward for a single criterion", () => {
        // arrange
        let criterion = mock<ICriterion>()
        criterion
            .setup(m => m.getReward(isAny<Pile[]>()))
            .returns(() => 2)

        let award = new Award("silly billy", [criterion.object])

        // act
        let reward = award.getReward([])

        // assert
        expect(reward).toBe(2)
    })

    it("returns the correct reward for multiple criteria", () => {
        // arrange
        let criterion1 = mock<ICriterion>()
        criterion1
            .setup(m => m.getReward(isAny<Pile[]>()))
            .returns(() => 2)

        let criterion2 = mock<ICriterion>()
        criterion2
            .setup(m => m.getReward(isAny<Pile[]>()))
            .returns(() => 4)

        let award = new Award("silly billy", [criterion1.object, criterion2.object])

        // act
        let reward = award.getReward([])

        // assert
        expect(reward).toBe(6)
    })
})
