import { Feature } from "../../src/game/Feature"
import { Grid } from "../../src/game/Grid"
import { Tree } from "../../src/game/Tree"
import { featureCard, treeCard } from "../Util"

describe("Grid", () => {
    let sizes = [0, -2]
    sizes.forEach(v => {
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

    it("allows a card to be played on an empty pile", () => {
        // arrange
        let grid = Grid.create(1, 1)

        // act
        let success = grid.playCard(featureCard(Feature.Structure), 0, 0)

        // assert
        expect(success).toBe(true)
    })

    it("allows a card to be played on a pile with a lawn card on top", () => {
        // arrange
        let grid = Grid.create(1, 1)
        let _ = grid.playCard(featureCard(Feature.Lawn), 0, 0)

        // act
        let success = grid.playCard(featureCard(Feature.Structure), 0, 0)

        // assert
        expect(success).toBe(true)
    })

    let cards = [
        featureCard(Feature.Structure),
        featureCard(Feature.Pond),
        treeCard([]),
        treeCard([Tree.Birch]),
        treeCard([Tree.Oak, Tree.Willow]),
    ]

    cards.forEach(c => {
        it("prevents a card from being played on a pile with a non-lawn card on top", () => {
            // arrange
            let grid = Grid.create(1, 1)
            let _ = grid.playCard(c, 0, 0)

            // act
            let success = grid.playCard(featureCard(Feature.Structure), 0, 0)

            // assert
            expect(success).toBe(false)
        })
    })

    let locations = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ]

    locations.forEach(l => {
        it("prevents a card from being played on an out-of-range pile", () => {
            // arrange
            let grid = Grid.create(1, 1)

            // act
            let success = grid.playCard(featureCard(Feature.Structure), l[0], l[1])

            // assert
            expect(success).toBe(false)
        })
    })
})
