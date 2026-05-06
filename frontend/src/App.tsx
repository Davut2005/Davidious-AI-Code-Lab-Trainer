import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthLayout } from './components/AuthLayout';
import Layout from './components/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { IntroductionPage } from './pages/Introduction';
import { CodeLabPage } from './pages/CodeLab';
import DashboardPage from "./pages/Dashboard";
import PathListPage from "./pages/PathList";
import PathDetailPage from "./pages/PathDetail";
import UploadPage from "./pages/Upload";
import CreatePathPage from "./pages/CreatePath";
import { CareersPage } from './pages/Careers';
import { SupportPage } from './pages/Support';
import { PrivacyPolicyPage } from './pages/PrivacyPolicy';
import { TermsOfServicePage } from './pages/TermsOfService';
import { SecurityPage } from './pages/Security';
import { AboutPage } from './pages/About';
import { ContactPage } from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<IntroductionPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/security" element={<SecurityPage />} />

              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/codelab" element={<CodeLabPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/paths" element={<PathListPage />} />
                <Route path="/paths/new" element={<CreatePathPage />} />
                <Route path="/paths/:id" element={<PathDetailPage />} />
                <Route path="/upload" element={<UploadPage />} />
              </Route>

            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
