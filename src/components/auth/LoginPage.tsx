import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { AlertCircle, Loader2 } from "lucide-react";
import { EicCanLogoIcon } from "@/components/brand";
import { useAuth } from "@/state/AuthContext";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, error: authError, loading: authLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError(authError || "Login failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormDisabled = isLoading || authLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900/90 backdrop-blur-sm border-slate-700">
        <CardHeader className="text-center space-y-6">
          <div className="flex justify-center">
            <EicCanLogoIcon width={120} height={120} variant="can-purple" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-3xl font-heading font-bold text-slate-300 tracking-wider">
              EICON HUB
            </CardTitle>
            <CardDescription className="text-slate-400">
              <TypingAnimation
                words={[
                  "Manage your fleet.",
                  "Monitor your agents.",
                  "Configure your network.",
                ]}
                cursorStyle="block"
                blinkCursor={true}
                pauseDelay={1500}
                loop
                className="text-xl font-bold"
              />
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300">
                User ID
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isFormDisabled}
                placeholder="Enter your user ID"
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-can-purple"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isFormDisabled}
                placeholder="Enter your password"
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-can-purple"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-can-purple hover:bg-can-purple/90 text-white"
              disabled={isFormDisabled || !username || !password}
            >
              {isLoading || authLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="text-center pt-4">
            <button
              onClick={() => {
                sessionStorage.clear();
                window.location.reload();
              }}
              className="text-xs text-can-purple hover:text-can-purple/80 underline bg-transparent border-none cursor-pointer"
            >
              Clear Auth Cache
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
