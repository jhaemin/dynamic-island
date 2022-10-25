import { LogoGithub } from 'framework7-icons-plus/react'
import { atom, useAtom } from 'jotai'
import { useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import './App.css'
import phoneDownFill from './assets/phone_down_fill.svg'
import phoneFill from './assets/phone_fill.svg'
import DynamicIsland, { SceneName } from './DynamicIsland'
import NavAndMusicScene from './scenes/NavAndMusicScene'
import PhoneCallScene from './scenes/PhoneCallScene'

const Gaussian = animated('feGaussianBlur')
const ColorMatrix = animated('feColorMatrix')

const scenes = [PhoneCallScene, NavAndMusicScene]

const currentSceneNameAtom = atom<SceneName<typeof scenes>>(null)

function App() {
  const [currentSceneName, setCurrentSceneName] = useAtom(currentSceneNameAtom)

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
          transform: 'translateX(-42px)',
          width: 112 + 33 + 9,
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

  const minimizedModeLeftItemStyles = useSpring(
    isLonelyIslandActivated
      ? {
          config: {
            duration: 200,
          },
          transform: 'scaleX(1)',
          filter: 'blur(0px)',
          opacity: 1,
          delay: 100,
        }
      : {
          config: {
            duration: 150,
          },
          transform: 'scaleX(0.5)',
          filter: 'blur(4px)',
          opacity: 0,
        }
  )

  const lonelyIslandItemStyles = useSpring(
    isLonelyIslandActivated
      ? {
          config: {
            duration: 200,
          },
          transform: 'translateX(0px) scaleX(1)',
          filter: 'blur(0px)',
          opacity: 1,
          delay: 100,
        }
      : {
          config: {
            duration: 150,
          },
          transform: 'translateX(-100px) scaleX(0.5)',
          filter: 'blur(4px)',
          opacity: 0,
        }
  )

  return (
    <div className="demo">
      <h1 className="title">Dynamic Island</h1>
      <animated.div className="dynamic-island" style={dynamicIslandStyles}>
        <animated.div className="darkroom" style={darkRoomStyles}>
          {/* Expanded mode left item */}
          <div className="expanded-mode-item-wrapper expanded-mode-left-item-wrapper">
            <animated.div className="left" style={expandedItemStyles}>
              <div className="caller">
                <img src="/profile.png" className="photo" />
                <div className="caller-info">
                  <span className="device">iPhone</span>
                  <span className="name">Jang Haemin</span>
                </div>
              </div>
            </animated.div>
          </div>

          {/* Expanded mode right item */}
          <div className="expanded-mode-item-wrapper expanded-mode-right-item-wrapper">
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
          </div>

          {/* Minimized mode left item */}
          <div className="minimized-mode-item-wrapper minimized-mode-left-item-wrapper">
            <animated.div
              style={minimizedModeLeftItemStyles}
              className="minimized-mode-left-item"
            >
              <img className="photo" src="/lyft.png" />
            </animated.div>
          </div>

          {/* Minimized mode right item */}
          <div className="minimized-mode-item-wrapper minimized-mode-right-item-wrapper">
            <animated.div></animated.div>
          </div>
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

        <animated.div className="lonely-island-item-wrapper">
          <animated.div
            className="lonely-island-item"
            style={lonelyIslandItemStyles}
          >
            {/* W */}
          </animated.div>
        </animated.div>
      </animated.div>

      <DynamicIsland scenes={scenes} currentSceneName={currentSceneName} />

      <div className="controls">
        <button
          onClick={() => {
            setCurrentSceneName((curr) => {
              if (curr === 'PhoneCall') {
                return 'NavAndMusic'
              } else if (curr === 'NavAndMusic') {
                return null
              } else {
                return 'PhoneCall'
              }
            })
          }}
        >
          Toggle Scene
        </button>
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
