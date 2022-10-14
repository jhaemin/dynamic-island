import './App.css'
import { useSpring, animated } from 'react-spring'
import { useState } from 'react'
import phoneDownFill from './assets/phone_down_fill.svg'
import phoneFill from './assets/phone_fill.svg'

function App() {
  const [toggle, setToggle] = useState(false)
  const styles = useSpring(
    toggle
      ? {
          config: {
            tension: 250,
            mass: 1.5,
          },
          width: 271,
          height: 55,
        }
      : {
          config: {
            tension: 300,
            mass: 0.1,
          },
          width: 86,
          height: 25,
        }
  )

  return (
    <div className="App">
      <animated.div
        className="darkroom"
        style={styles}
        onClick={() => {
          setToggle((curr) => !curr)
        }}
      >
        <div className="left"></div>

        <div className="hardware"></div>

        <div className="right">
          <div className="phone-booth">
            <div className="phone refuse">
              <img src={phoneDownFill} className="icon" />
            </div>
            <div className="phone receive">
              <img src={phoneFill} className="icon" />
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  )
}

export default App
