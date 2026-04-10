import './App.css'
import { Sidebar } from './components/Sidebar'
import { VendorDashboardPage } from './pages/VendorDashboardPage'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <VendorDashboardPage />
    </div>
  )
}

export default App
