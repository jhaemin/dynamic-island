import { IslandMode, makeScene } from '../DynamicIsland'

const Left = () => {
  return <></>
}

const Right = () => {
  return <></>
}

const NavAndMusicScene = makeScene('NavAndMusic', {
  mode: IslandMode.SPLIT,
  left: <Left />,
  right: <Right />,
})

export default NavAndMusicScene
