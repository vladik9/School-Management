import ProtectedRoute from '@/components/protected-route';
import SchoolDashboard from '@/components/school-dashboard';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <SchoolDashboard />
    </ProtectedRoute>
  );
}
