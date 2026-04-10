import './App.css'
import { Sidebar } from './components/Sidebar'
import { AgencyDashboardPage } from './pages/AgencyDashboardPage'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <AgencyDashboardPage />
    </div>
  )
}

export default App
