import './App.css'
import { Sidebar } from './components/Sidebar'
import { CreateBidPage } from './pages/CreateBidPage'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <CreateBidPage />
    </div>
  )
}

export default App
