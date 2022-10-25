import phoneDownFill from '../assets/phone_down_fill.svg'
import phoneFill from '../assets/phone_fill.svg'
import { IslandMode, makeScene } from '../DynamicIsland'

const Left = () => {
  return (
    <div className="caller">
      <img src="/profile.png" className="photo" />
      <div className="caller-info">
        <span className="device">iPhone</span>
        <span className="name">Jang Haemin</span>
      </div>
    </div>
  )
}

const Right = () => {
  return (
    <div className="phone-booth">
      <div className="phone refuse">
        <img src={phoneDownFill} className="icon" />
      </div>
      <div className="phone receive">
        <img src={phoneFill} className="icon" />
      </div>
    </div>
  )
}

const PhoneCallScene = makeScene('PhoneCall', {
  mode: IslandMode.LARGE,
  left: <Left />,
  right: <Right />,
})

export default PhoneCallScene
