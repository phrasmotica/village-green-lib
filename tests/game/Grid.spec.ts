import { Grid } from "../../src/game/Grid"

describe("Grid", () => {
    [0, -2].forEach(v => {
        it("cannot have non-positive width", () => {
            expect(() => Grid.create(v, 3)).toThrowError()
        })

        it("cannot have non-positive height", () => {
            expect(() => Grid.create(3, v)).toThrowError()
        })
    })

    it("can be created with positive width and height", () => {
        expect(() => Grid.create(3, 3)).not.toThrow()
    })
})
