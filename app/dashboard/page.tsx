import ProtectedRoute from '@/components/protected-route';
import Dashboard from '@/components/dashboard';

/**
 * This component renders the Dashboard component wrapped in a ProtectedRoute.
 * This ensures that only authenticated users can access the dashboard.
 */
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
