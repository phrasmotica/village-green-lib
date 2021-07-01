import { allTrees } from "../util/Util"
import { AmountOfFeature } from "./criteria/AmountOfFeature"
import { AmountOfGroupsOfFeature } from "./criteria/AmountOfGroupsOfFeature"
import { AmountOfGroupsOfTree } from "./criteria/AmountOfGroupsOfTree"
import { AmountOfLawns } from "./criteria/AmountOfLawns"
import { AmountOfTrees } from "./criteria/AmountOfTrees"
import { AmountOfUniqueTrees } from "./criteria/AmountOfUniqueTrees"
import { AwardCard } from "./cards/AwardCard"
import { Colour } from "./cards/Colour"
import { Deck } from "./Deck"
import { EachCard } from "./criteria/EachCard"
import { EachColour } from "./criteria/EachColour"
import { EachEmpty } from "./criteria/EachEmpty"
import { EachFeature } from "./criteria/EachFeature"
import { EachFlower } from "./criteria/EachFlower"
import { EachFlowerAndColour } from "./criteria/EachFlowerAndColour"
import { EachLawn } from "./criteria/EachLawn"
import { EachTree } from "./criteria/EachTree"
import { Feature } from "./cards/Feature"
import { FeatureVariety } from "./criteria/FeatureVariety"
import { Flower } from "./cards/Flower"
import { HasUniqueColours } from "./criteria/HasUniqueColours"
import { HasUniqueFlowers } from "./criteria/HasUniqueFlowers"
import { NaturalAndManMade } from "./criteria/NaturalAndManMade"
import { Tree } from "./cards/Tree"

/**
 * Represents a deck of award cards.
 */
export class AwardCardDeck extends Deck<AwardCard> {
    /**
     * Returns the default deck of all award cards.
     */
    static createDefault() {
        let eachFlowerAndColourAwards = [
            new AwardCard("The Ruby Clover Award", [
                new EachFlowerAndColour(Flower.Lily, Colour.Red, 3),
            ]),
            new AwardCard("The Diane Yeller Award", [
                new EachFlowerAndColour(Flower.Lily, Colour.Yellow, 3),
            ]),
            new AwardCard("The Linda Flowers Award", [
                new EachFlowerAndColour(Flower.Lily, Colour.Blue, 3),
            ]),

            new AwardCard("The Alfred Rower Award", [
                new EachFlowerAndColour(Flower.Petunia, Colour.Red, 3),
            ]),
            new AwardCard("The Sonny Rowe Award", [
                new EachFlowerAndColour(Flower.Petunia, Colour.Yellow, 3),
            ]),
            new AwardCard("The Lily Maniare Award", [
                new EachFlowerAndColour(Flower.Petunia, Colour.Blue, 3),
            ]),

            new AwardCard("The Rosie Redford Award", [
                new EachFlowerAndColour(Flower.Rose, Colour.Red, 3),
            ]),
            new AwardCard("The Rosa Gelber Award", [
                new EachFlowerAndColour(Flower.Rose, Colour.Yellow, 3),
            ]),
            new AwardCard("The Peter Petals Award", [
                new EachFlowerAndColour(Flower.Rose, Colour.Blue, 3),
            ]),
        ]

        let pondsAward = new AwardCard("Excellence in Ponds", [
            new EachFeature(Feature.Pond, 2),
        ])

        let uniqueColoursAward = new AwardCard("Award for Polychromatism", [
            new HasUniqueColours(3, 6),
        ])

        let uniqueFlowersAward = new AwardCard("Award for Floral Variety", [
            new HasUniqueFlowers(3, 6),
        ])

        let spaceAward = new AwardCard("Best Use of Space", [
            new EachCard(1),
            ...allTrees().map(t => new EachTree(t, -1)),
        ])

        let scopeAward = new AwardCard("Award for Scope and Ambition of Display", [
            new EachCard(1),
            new EachEmpty(-3),
        ])

        let treeAwards = [
            new AwardCard("Award for Outstanding Birch Plantation", [
                new EachTree(Tree.Birch, 2),
                new EachTree(Tree.Willow, -2),
            ]),
            new AwardCard("Award for Outstanding Oak Plantation", [
                new EachTree(Tree.Birch, -2),
                new EachTree(Tree.Oak, 3),
                new EachTree(Tree.Willow, -1),
            ]),

            new AwardCard("Excellence in Trees", allTrees().map(t => new EachTree(t, 1))),
            new AwardCard("Award for Symmetrical Forestry", allTrees().map(t => new AmountOfGroupsOfTree(t, 2, 2))),
        ]

        let naturalHabitatsAward = new AwardCard("Award for the Provision of Natural Habitats", [
            new EachLawn(3),
            ...allTrees().map(t => new EachTree(t, 1)),
            new EachFeature(Feature.Structure, -1),
        ])

        let manMadeFeaturesAward = new AwardCard("Best Man-Made Features", [
            new AmountOfFeature(Feature.Structure, [
                [0, -4],
                [1, 2],
                [2, -2],
                [3, 6],
            ]),
        ])

        let structuresAward = new AwardCard("Excellence in Structures", [
            new AmountOfFeature(Feature.Structure, [
                [0, -2],
                [1, 1],
                [2, 2],
                [3, 4],
            ]),
        ])

        let lawnsAward = new AwardCard("Excellence in Lawns", [
            new AmountOfLawns([
                [0, -2],
                [1, 1],
                [2, 4],
                [3, 8],
            ]),
        ])

        let featuresConsistencyAward = new AwardCard("Award for Consistency of Features", [
            new AmountOfGroupsOfFeature(Feature.Structure, 3, 5),
            ...allTrees().map(t => new AmountOfGroupsOfTree(t, 3, 5)),
        ])

        let woodDiversityAward = new AwardCard("Award for Diversity of Hard & Soft Wood", [
            new AmountOfUniqueTrees([
                [0, -1],
                [1, 3],
                [2, -1],
                [3, 5],
            ]),
        ])

        let treeVarietyAward = new AwardCard("Award for Variety in Trees", [
            new AmountOfUniqueTrees([
                [0, 1],
                [1, -3],
                [2, 2],
                [3, 6],
            ]),
            new EachEmpty(-2),
        ])

        let forestryAward = new AwardCard("Award for Forestry", [
            new AmountOfTrees([
                [0, -2],
                [1, 4],
                [2, -1],
                [3, -1],
                [4, -1],
                [5, 4],
                [6, 6],
            ])
        ])

        let tastefulFloralAward = new AwardCard("Award for Tasteful Floral Displays", [
            new EachFlower(Flower.Rose, -2),
            new EachFlower(Flower.Lily, 2),
            new EachFlower(Flower.Petunia, 1),
            new EachLawn(-3),
            new EachEmpty(-3),
        ])

        let colourCombinationAward = new AwardCard("Best Colour Combination", [
            new EachColour(Colour.Red, -2),
            new EachColour(Colour.Blue, 2),
            new EachColour(Colour.Yellow, 1),
            new EachLawn(-3),
            new EachEmpty(-3),
        ])

        let featureVarietyAward = new AwardCard("Award for Feature Variety", [
            new FeatureVariety(6),
        ])

        let naturalAndManMadeAward = new AwardCard("Best Integration of the Natural and Man-Made", [
            new NaturalAndManMade(),
        ])

        let cards = [
            ...eachFlowerAndColourAwards,
            pondsAward,
            uniqueColoursAward,
            uniqueFlowersAward,
            spaceAward,
            scopeAward,
            ...treeAwards,
            naturalHabitatsAward,
            manMadeFeaturesAward,
            structuresAward,
            lawnsAward,
            featuresConsistencyAward,
            woodDiversityAward,
            treeVarietyAward,
            forestryAward,
            tastefulFloralAward,
            colourCombinationAward,
            featureVarietyAward,
            naturalAndManMadeAward,
        ]

        return new AwardCardDeck(cards)
    }
}
