import { ReactNode } from 'react'

enum IslandMode {
  DEFAULT,
  EXPANDED,
  SPLIT,
  LARGE,
  SQUARE,
}

type SharedIslandScene = {
  name: string
}

type ExpandedIslandScene = SharedIslandScene & {
  mode: IslandMode.EXPANDED
  left: ReactNode
  right: ReactNode
}

type SplitIslandScene = SharedIslandScene & {
  mode: IslandMode.SPLIT
  left: ReactNode
  right: ReactNode
}

type LargeIslandScene = SharedIslandScene & {
  mode: IslandMode.LARGE
  left: ReactNode
  right: ReactNode
}

type SquareIslandScene = SharedIslandScene & {
  mode: IslandMode.SQUARE
  item: ReactNode
}

type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never

type IslandScene =
  | ExpandedIslandScene
  | SplitIslandScene
  | LargeIslandScene
  | SquareIslandScene
type IslandSceneOptions = DistributiveOmit<IslandScene, 'name'>

export function makeScene<
  Name extends string,
  SceneOptions extends IslandSceneOptions
>(name: Name, options: SceneOptions): { name: Name } & SceneOptions {
  return {
    ...options,
    name,
  }
}

export type DynamicIslandProps<T extends IslandScene[]> = {
  scenes: T
  currentScene: T[number]['name'] | IslandMode.DEFAULT
}

const DynamicIsland = <T extends IslandScene[]>({}: DynamicIslandProps<T>) => {
  return <></>
}

export default DynamicIsland
