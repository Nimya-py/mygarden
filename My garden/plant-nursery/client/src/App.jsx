import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NurseryProvider } from './context/NurseryContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { Home } from './pages/Home';
import { Plants } from './pages/Plants';
import { PlantDetail } from './pages/PlantDetail';
import { NurseryDetail } from './pages/NurseryDetail';
import { About } from './pages/About';
import { PlantCare } from './pages/PlantCare';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Awards } from './pages/Awards';
import { UsesOfNutmeg } from './pages/UsesOfNutmeg';
import { Testimonials } from './pages/Testimonials';

// Admin Authentication Pages (Separated from public layout, no public navbar login)
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminVerifyEmail } from './pages/admin/AdminVerifyEmail';
import { AdminForgotPassword } from './pages/admin/AdminForgotPassword';
import { AdminResetPassword } from './pages/admin/AdminResetPassword';

// Protected Admin Dashboard Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminProductForm } from './pages/admin/AdminProductForm';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminAwards } from './pages/admin/AdminAwards';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { SuperAdminCategories } from './pages/superadmin/SuperAdminCategories';

export function App() {
  return (
    <AuthProvider>
      <NurseryProvider>
        <Router>
          <Routes>
            {/* 1. Public Visitor Routes wrapped in PublicLayout (NO LOGIN BUTTON IN NAVBAR) */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/plants" element={<Navigate to="/plants/nutmeg" replace />} />
              
              {/* Category & Propagation Routes */}
              <Route path="/plants/nutmeg" element={<Plants />} />
              <Route path="/plants/skin-patch-bud" element={<Plants />} />
              <Route path="/plants/crown-bud" element={<Plants />} />
              <Route path="/plants/approach-grafting" element={<Plants />} />
              <Route path="/plants/appicotail-grafting" element={<Plants />} />
              <Route path="/plants/:categorySlug" element={<Plants />} />
              <Route path="/categories/:slug" element={<Plants />} />
              
              <Route path="/plant/:slug" element={<PlantDetail />} />
              <Route path="/nursery/:slug" element={<NurseryDetail />} />
              <Route path="/planting-tips" element={<PlantCare />} />
              <Route path="/plant-care" element={<PlantCare />} />
              <Route path="/nutmeg/uses" element={<UsesOfNutmeg />} />
              <Route path="/uses-of-nutmeg" element={<UsesOfNutmeg />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* 2. Public Admin Authentication Endpoints (Accessible separately at /admin/login) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/verify-email" element={<AdminVerifyEmail />} />
            <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
            <Route path="/admin/reset-password" element={<AdminResetPassword />} />
            
            {/* Redirect generic /login to /admin/login */}
            <Route path="/login" element={<Navigate to="/admin/login" replace />} />

            {/* 3. Protected Nursery Admin Dashboard Routes (Requires Authenticated + Verified Admin) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/:id/edit" element={<AdminProductForm />} />
              <Route path="categories" element={<SuperAdminCategories />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="awards" element={<AdminAwards />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* 4. Super Admin routes redirecting seamlessly to unified /admin */}
            <Route path="/super-admin/*" element={<Navigate to="/admin" replace />} />

            {/* 5. Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </NurseryProvider>
    </AuthProvider>
  );
}

export default App;
