import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';

// Pages
import Welcome from './pages/Welcome';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AICoach from './pages/AICoach';
import CareerPaths from './pages/CareerPaths';
import CareerDetail from './pages/CareerDetail';
import InterviewPrep from './pages/InterviewPrep';
import JobMarketInsights from './pages/JobMarketInsights';

// Simple placeholder for Home if it has issues, otherwise use real one
import Home from './pages/Home';

const queryClient = new QueryClient();

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  // Helper to determine active page for the Sidebar
  const getPageName = (path) => {
    if (path === '/' || path === '/welcome') return 'Welcome';
    if (path.includes('auth')) return 'Auth';
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('career')) return 'Career Paths';
    if (path.includes('interview')) return 'Interview Prep';
    if (path.includes('coach')) return 'AI Coach';
    if (path.includes('market')) return 'Market Insights';
    return 'Home';
  };

  return <Layout currentPageName={getPageName(location.pathname)}>{children}</Layout>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/careerpaths" element={<CareerPaths />} />
            <Route path="/careerdetail" element={<CareerDetail />} />
            <Route path="/interviewprep" element={<InterviewPrep />} />
            <Route path="/aicoach" element={<AICoach />} />
            <Route path="/jobmarketinsights" element={<JobMarketInsights />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
