import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import DashboardHub from './pages/DashboardHub'
import CEODashboard from './pages/CEODashboard'
import DummyDashboard from './pages/DummyDashboard'

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem('longevai-auth') === 'true'
  return isAuth ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/hub" element={<ProtectedRoute><DashboardHub /></ProtectedRoute>} />
        <Route path="/dashboard/ceo" element={<ProtectedRoute><CEODashboard /></ProtectedRoute>} />
        <Route path="/dashboard/:dashboardId" element={<ProtectedRoute><DummyDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
