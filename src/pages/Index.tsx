import { useState } from "react";
import AuthPage from "@/components/cloud/AuthPage";
import Dashboard from "@/components/cloud/Dashboard";

export default function Index() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  if (!user) {
    return <AuthPage onAuth={(u) => setUser(u)} />;
  }

  return <Dashboard user={user} onLogout={() => setUser(null)} />;
}
