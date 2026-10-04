import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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

// Auth Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminProductForm } from './pages/admin/AdminProductForm';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminAwards } from './pages/admin/AdminAwards';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';

// Super Admin Pages
import { SuperAdminDashboard } from './pages/superadmin/SuperAdminDashboard';
import { SuperAdminNurseries } from './pages/superadmin/SuperAdminNurseries';
import { SuperAdminUsers } from './pages/superadmin/SuperAdminUsers';
import { SuperAdminCategories } from './pages/superadmin/SuperAdminCategories';
import { SuperAdminEnquiries } from './pages/superadmin/SuperAdminEnquiries';

import { NurseryProvider } from './context/NurseryContext';

export function App() {
  return (
    <AuthProvider>
      <NurseryProvider>
        <Router>
          <Routes>
            {/* Public Routes wrapped in PublicLayout */}
            <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/plants" element={<Plants />} />
            
            {/* Category & Nutmeg Propagation Routes */}
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
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Nursery Admin Protected Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="awards" element={<AdminAwards />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/:id/edit" element={<AdminProductForm />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Super Admin Protected Dashboard Routes */}
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<SuperAdminDashboard />} />
            <Route path="nurseries" element={<SuperAdminNurseries />} />
            <Route path="admins" element={<SuperAdminUsers />} />
            <Route path="customers" element={<SuperAdminUsers />} />
            <Route path="categories" element={<SuperAdminCategories />} />
            <Route path="enquiries" element={<SuperAdminEnquiries />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      </NurseryProvider>
    </AuthProvider>
  );
}

export default App;
