import './App.css'
import { Sidebar } from './components/Sidebar'
import { MarketplacePage } from './pages/MarketplacePage'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <MarketplacePage />
    </div>
  )
}

export default App
