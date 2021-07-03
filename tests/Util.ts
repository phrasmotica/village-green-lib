import * as TypeMoq from "typemoq"
import { AwardCard } from "../src/game/cards/AwardCard"

import { Colour } from "../src/game/cards/Colour"
import { Feature } from "../src/game/cards/Feature"
import { FeatureCard } from "../src/game/cards/FeatureCard"
import { Flower } from "../src/game/cards/Flower"
import { LawnCard } from "../src/game/cards/LawnCard"
import { Tree } from "../src/game/cards/Tree"
import { TreeCard } from "../src/game/cards/TreeCard"
import { VillageCard } from "../src/game/cards/VillageCard"
import { Pile } from "../src/game/Pile"

export const villageCard = () => new VillageCard("village")
export const cardWith = (colour: Colour, flower: Flower) => new FeatureCard(colour, flower, Feature.Structure)
export const lawnCard = () => new LawnCard()
export const featureCard = (feature: Feature) => new FeatureCard(Colour.Red, Flower.Lily, feature)
export const treeCard = (trees: Tree[]) => new TreeCard(Colour.Red, Flower.Lily, trees)
export const awardCard = () => new AwardCard("award", [])
export const pile = () => new Pile([])

export const mock = <T>() => TypeMoq.Mock.ofType<T>()
export const isAny = <T>() => TypeMoq.It.is<T>(_ => true)
