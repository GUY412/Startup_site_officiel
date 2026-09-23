import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Contact from './pages/Contact.jsx'
import Blog from './pages/Blog.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminTeam from './pages/admin/AdminTeam.jsx'
import AdminProjects from './pages/admin/AdminProjects.jsx'
import AdminLinks from './pages/admin/AdminLinks.jsx'
import AdminPosts from './pages/admin/AdminPosts.jsx'
import AdminAnalytics from './pages/admin/AdminAnalytics.jsx'
import AdminServices from './pages/admin/AdminServices.jsx'
import AdminSettings from './pages/admin/AdminSettings.jsx'
import { RequireAuth } from './lib/AuthContext.jsx'
import { useSiteTracking } from './lib/tracking.js'

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  useSiteTracking()

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/realisations" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="equipe" element={<AdminTeam />} />
            <Route path="realisations" element={<AdminProjects />} />
            <Route path="liens" element={<AdminLinks />} />
            <Route path="blog" element={<AdminPosts />} />
            <Route path="parametres" element={<AdminSettings />} />
            <Route path="statistiques" element={<AdminAnalytics />} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  )
}
