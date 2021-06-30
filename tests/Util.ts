import * as TypeMoq from "typemoq"

import { Colour } from "../src/game/Colour"
import { Feature } from "../src/game/Feature"
import { FeatureCard } from "../src/game/FeatureCard"
import { Flower } from "../src/game/Flower"
import { Tree } from "../src/game/Tree"
import { TreeCard } from "../src/game/TreeCard"
import { VillageCard } from "../src/game/VillageCard"

export const villageCard = () => new VillageCard("village")
export const cardWith = (colour: Colour, flower: Flower) => new FeatureCard(colour, flower, Feature.Structure)
export const featureCard = (feature: Feature) => new FeatureCard(Colour.Red, Flower.Lily, feature)
export const treeCard = (trees: Tree[]) => new TreeCard(Colour.Red, Flower.Lily, trees)

export const mock = <T>() => TypeMoq.Mock.ofType<T>()
export const isAny = <T>() => TypeMoq.It.is<T>(_ => true)
