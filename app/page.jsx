import SignIn from "@/components/credentials/SignIn";
import SignUp from "@/components/credentials/SignUp";
import Dashboard from "@/components/dashboard/Dashboard";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <div>
      <Sidebar />
      <Dashboard />
    </div>
  );
}
