import { ReactNode } from 'react'

enum IslandMode {
  DEFAULT,
  EXPANDED,
  SPLIT,
  LARGE,
  SQUARE,
}

type SharedIslandScene<Name extends string> = {
  name: Name
}

type ExpandedIslandScene<Name extends string> = SharedIslandScene<Name> & {
  mode: IslandMode.EXPANDED
  left: ReactNode
  right: ReactNode
}

type SplitIslandScene<Name extends string> = SharedIslandScene<Name> & {
  mode: IslandMode.SPLIT
  left: ReactNode
  right: ReactNode
}

type LargeIslandScene<Name extends string> = SharedIslandScene<Name> & {
  mode: IslandMode.LARGE
  left: ReactNode
  right: ReactNode
}

type SquareIslandScene<Name extends string> = SharedIslandScene<Name> & {
  mode: IslandMode.SQUARE
  item: ReactNode
}

type IslandScene<Name extends string = string> =
  | ExpandedIslandScene<Name>
  | SplitIslandScene<Name>
  | LargeIslandScene<Name>
  | SquareIslandScene<Name>

export type DynamicIslandProps<
  Name extends string,
  T extends IslandScene<Name>
> = {
  scenes: T[]
  currentScene: T['name']
}

type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never

export const makeScene = <
  Name extends string,
  T extends DistributiveOmit<IslandScene, 'name'>
>(
  name: Name,
  options: T
): IslandScene<Name> => {
  return {
    name,
    ...options,
  }
}

const DynamicIsland = <
  Name extends string,
  T extends IslandScene<Name>
>({}: DynamicIslandProps<Name, T>) => {
  return <></>
}

export default DynamicIsland
