"use client"
import Dashboard from "@/components/dashboard/Dashboard";
import Sidebar from "@/components/sidebar/Sidebar";
import useAuthStore from '@/store/common/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();
  const { user,logout } = useAuthStore();

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/auth/signin');
  //   }
  // }, [user, router]);

  return (
    <div>
      <Sidebar />
      <Dashboard />
    </div>
  );
}
