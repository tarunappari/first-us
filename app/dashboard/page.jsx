import Dashboard from "@/components/dashboard/Dashboard";
import Sidebar from "@/components/sidebar/Sidebar";

export const metadata = {
  title: "Dashboard - First-Us",
  description: "Your First-Us dashboard overview",
};

export default function DashboardPage() {
  return (
    <div>
      <Sidebar />
      <Dashboard />
    </div>
  );
}
