import './App.css'
import { Sidebar } from './components/Sidebar'
import { OpportunityDetailPage } from './pages/OpportunityDetailPage'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <OpportunityDetailPage />
    </div>
  )
}

export default App
