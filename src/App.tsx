import { LogoGithub } from 'framework7-icons-plus/react'
import { atom, useAtom } from 'jotai'
import './App.css'
import DynamicIsland, { SceneName } from './DynamicIsland'
import NavAndMusicScene from './scenes/NavAndMusicScene'
import PhoneCallScene from './scenes/PhoneCallScene'

const scenes = [PhoneCallScene, NavAndMusicScene]

const currentSceneNameAtom = atom<SceneName<typeof scenes>>(null)

function App() {
  const [currentSceneName, setCurrentSceneName] = useAtom(currentSceneNameAtom)

  return (
    <div className="demo">
      <h1 className="title">Dynamic Island</h1>

      <DynamicIsland scenes={scenes} currentSceneName={currentSceneName} />

      <div className="controls">
        <button
          onClick={() => {
            setCurrentSceneName(null)
          }}
        >
          Default
        </button>
        <button
          onClick={() => {
            setCurrentSceneName('PhoneCall')
          }}
        >
          Phone Call
        </button>
        <button
          onClick={() => {
            setCurrentSceneName('NavAndMusic')
          }}
        >
          Split
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
