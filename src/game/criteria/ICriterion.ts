import { Pile } from "../Pile"

export interface ICriterion {
    getReward(piles: Pile[]): number
    getDescription(): string
}
