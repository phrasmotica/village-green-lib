import { Pile } from "../Pile"
import { Description } from "./Description";

export interface ICriterion {
    getReward(piles: Pile[]): number
    getDescription(): Description
}
