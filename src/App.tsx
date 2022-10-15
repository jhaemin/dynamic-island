import './App.css'
import { useSpring, animated } from 'react-spring'
import { useRef, useState } from 'react'
import phoneDownFill from './assets/phone_down_fill.svg'
import phoneFill from './assets/phone_fill.svg'
import { LogoGithub } from 'framework7-icons-plus/react'

const Gaussian = animated('feGaussianBlur')
const ColorMatrix = animated('feColorMatrix')

function App() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLonelyIslandActivated, setIsLonelyIslandActivated] = useState(false)
  const animationStatusRef = useRef<
    | 'idle'
    | 'fromLonelyIslandToNormal'
    | 'fromExpandedToLonelyIsland'
    | 'fromLonelyIslandToExpanded'
  >('idle')

  const dynamicIslandStyles = useSpring(
    isExpanded
      ? {
          config: {
            tension: 250,
            mass: 1.5,
          },
          width: 352,
          height: 72,
          delay:
            animationStatusRef.current === 'fromLonelyIslandToExpanded'
              ? 50
              : 0,
        }
      : {
          config: {
            tension: 300,
            mass: 0.1,
          },
          width: 112,
          height: 32,
          delay:
            animationStatusRef.current === 'fromLonelyIslandToNormal' ? 0 : 100,
        }
  )

  const darkRoomStyles = useSpring(
    isLonelyIslandActivated
      ? {
          config:
            animationStatusRef.current === 'fromExpandedToLonelyIsland'
              ? {
                  tension: 300,
                  mass: 0.1,
                }
              : {
                  tension: 250,
                  mass: 2,
                },
          transform: 'translateX(-39px)',
          width: 112 + 33 + 6,
          height: 32,
          delay:
            animationStatusRef.current === 'fromExpandedToLonelyIsland'
              ? 100
              : 0,
          onStart: () => {
            animationStatusRef.current = 'idle'
          },
        }
      : isExpanded
      ? {
          config: {
            tension: 250,
            mass: 1.5,
          },
          transform: 'translateX(0px)',
          width: 352,
          height: 72,
          delay:
            animationStatusRef.current === 'fromLonelyIslandToExpanded'
              ? 50
              : 0,
        }
      : {
          config: {
            tension: 300,
            mass: 0.1,
          },
          transform: 'translateX(0px)',
          width: 112,
          height: 32,
          delay:
            animationStatusRef.current === 'fromLonelyIslandToNormal' ? 0 : 100,
          onStart: () => {
            animationStatusRef.current = 'idle'
          },
        }
  )

  const expandedItemStyles = useSpring(
    isExpanded
      ? {
          config: {
            duration: 200,
          },
          width: 271,
          height: 55,
          filter: 'blur(0px)',
          opacity: 1,
          delay:
            100 +
            (animationStatusRef.current === 'fromLonelyIslandToExpanded'
              ? 50
              : 0),
          transform: 'scale(1)',
        }
      : {
          config: {
            duration: 150,
          },
          width: 86,
          height: 25,
          filter: 'blur(5px)',
          opacity: 0,
          transform: 'scale(0.9)',
        }
  )

  const lonelyIslandStyles = useSpring(
    isLonelyIslandActivated
      ? {
          config: {
            tension: 250,
            mass: 2,
          },
          transform: 'translateX(42px)',
          delay:
            animationStatusRef.current === 'fromExpandedToLonelyIsland'
              ? 200
              : 0,
        }
      : {
          config: {
            tension: 300,
            mass: 0.1,
          },
          transform: 'translateX(0px)',
        }
  )

  const lonelyIslandAttr = useSpring(
    isLonelyIslandActivated
      ? {
          config: {
            duration: 400,
          },
          stdDeviation: 0,
          delay: 250,
        }
      : {
          config: {
            duration: 100,
          },
          stdDeviation: 10,
        }
  )

  const leftRoomStyles = useSpring(
    isExpanded
      ? {
          config: {
            tension: 250,
            mass: 1.5,
          },
          transform: 'translateX(36px)',
          opacity: 0,
        }
      : isLonelyIslandActivated
      ? {
          config: {
            tension: 250,
            mass: 2,
          },
          transform: 'translateX(-33px)',
          opacity: 1,
        }
      : {
          config: {
            tension: 300,
            mass: 0.1,
          },
          transform: 'translateX(0px)',
          opacity: 1,
        }
  )

  const leftRoomItemStyles = useSpring(
    isLonelyIslandActivated
      ? {
          config: {
            tension: 250,
            mass: 2,
          },
          transform: 'scaleX(1)',
          filter: 'blur(0px)',
          opacity: 1,
          delay: 100,
        }
      : {
          config: {
            tension: 300,
            mass: 0.1,
          },
          transform: 'scaleX(0.4)',
          filter: 'blur(5px)',
          opacity: 0,
        }
  )

  return (
    <div className="demo">
      <h1 className="title">Dynamic Island</h1>
      <animated.div className="dynamic-island" style={dynamicIslandStyles}>
        <animated.div className="darkroom" style={darkRoomStyles}>
          <animated.div className="left" style={expandedItemStyles}>
            <div className="caller">
              <img
                src={
                  import.meta.env.MODE === 'development'
                    ? '/profile2.png'
                    : '/dynamic-island/profile2.png'
                }
                className="photo"
              />
              <div className="caller-info">
                <span className="device">iPhone</span>
                <span className="name">Jang Haemin</span>
              </div>
            </div>
          </animated.div>

          <animated.div className="right" style={expandedItemStyles}>
            <div className="phone-booth">
              <div className="phone refuse">
                <img src={phoneDownFill} className="icon" />
              </div>
              <div className="phone receive">
                <img src={phoneFill} className="icon" />
              </div>
            </div>
          </animated.div>

          {/* <animated.div style={leftRoomStyles} className="left-room">
          <animated.div style={leftRoomItemStyles} className="left-room-item">
            <img src="/baedal.png" className="image" />
          </animated.div>
        </animated.div> */}
        </animated.div>

        <svg width="90" height="52" className="meta-animation-parts">
          <defs>
            <filter id="meta" width="400%" x="-150%" height="400%" y="-150%">
              <Gaussian
                in="SourceGraphic"
                {...lonelyIslandAttr}
                result="blur"
              ></Gaussian>
              <ColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 25 -10"
                result="matrix"
              ></ColorMatrix>
            </filter>
          </defs>
          <g filter="url(#meta)">
            <circle cx="26" cy="26" r="15" fill="black" />
            <animated.rect
              style={lonelyIslandStyles}
              x="6"
              y="10"
              width="36"
              height="32"
              rx="16"
              fill="black"
            />
          </g>
        </svg>
      </animated.div>

      <div className="controls">
        <button
          onPointerDown={() => {
            if (isExpanded) {
              animationStatusRef.current = 'fromExpandedToLonelyIsland'
            } else if (isLonelyIslandActivated) {
              animationStatusRef.current = 'fromLonelyIslandToExpanded'
            }

            setIsExpanded((curr) => !curr)
            setIsLonelyIslandActivated(false)
          }}
        >
          {isExpanded ? 'Minimize' : 'Maximize'}
        </button>
        <button
          onPointerDown={() => {
            if (isExpanded) {
              animationStatusRef.current = 'fromExpandedToLonelyIsland'
            } else if (isLonelyIslandActivated) {
              animationStatusRef.current = 'fromLonelyIslandToNormal'
            }

            setIsLonelyIslandActivated((curr) => !curr)
            setIsExpanded(false)
          }}
        >
          {isLonelyIslandActivated ? 'Merge' : 'Split'}
        </button>
      </div>

      <a
        href="https://github.com/jhaemin/dynamic-island"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="github">
          <LogoGithub /> GitHub
        </span>
      </a>
    </div>
  )
}

export default App
