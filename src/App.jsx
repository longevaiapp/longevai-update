import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import DashboardHub from './pages/DashboardHub'
import CEODashboard from './pages/CEODashboard'
import GerontologistDashboard from './pages/GerontologistDashboard'
import GeriatricianDashboard from './pages/GeriatricianDashboard'
import FamilyDoctorDashboard from './pages/FamilyDoctorDashboard'
import PsychologistDashboard from './pages/PsychologistDashboard'
import PhysiotherapistDashboard from './pages/PhysiotherapistDashboard'
import NutritionistDashboard from './pages/NutritionistDashboard'
import ChefDashboard from './pages/ChefDashboard'
import NursingDashboard from './pages/NursingDashboard'
import FinanceDashboard from './pages/FinanceDashboard'
import FamilyPortal from './pages/FamilyPortal'
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
        <Route path="/dashboard/gerontologist" element={<ProtectedRoute><GerontologistDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/geriatrician" element={<ProtectedRoute><GeriatricianDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/family-doctor" element={<ProtectedRoute><FamilyDoctorDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/psychologist" element={<ProtectedRoute><PsychologistDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/physiotherapist" element={<ProtectedRoute><PhysiotherapistDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/nutritionist" element={<ProtectedRoute><NutritionistDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/chef" element={<ProtectedRoute><ChefDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/nursing" element={<ProtectedRoute><NursingDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/finance" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/family" element={<ProtectedRoute><FamilyPortal /></ProtectedRoute>} />
        <Route path="/dashboard/:dashboardId" element={<ProtectedRoute><DummyDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
