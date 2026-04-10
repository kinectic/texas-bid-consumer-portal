import './App.css'
import { Sidebar } from './components/Sidebar'
import { SubmissionWorkflowPage } from './pages/SubmissionWorkflowPage'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <SubmissionWorkflowPage />
    </div>
  )
}

export default App
