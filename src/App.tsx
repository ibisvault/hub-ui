import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/state/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { EiconReachIcon } from "@/components/brand";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <EiconReachIcon width={80} />
      <h1 className="font-heading text-4xl font-bold">hub-ui</h1>
      <ThemeToggle />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthGuard>
          <Routes>
            <Route path="/*" element={<Dashboard />} />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
