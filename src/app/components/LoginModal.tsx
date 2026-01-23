import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState, FormEvent } from "react";
// Adjust these imports based on your auth.js file exports
import { loginWithEmail, loginWithGoogle } from "../../auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginWithEmail(email, password);
      window.location.href = "/";
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError("");

    try {
      await loginWithGoogle();
      // Supabase redirects automatically
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative">
        <button
          onClick={() => {
            setError("");
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-gray-500">Login to continue your learning journey</p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6 1.54 7.38 2.84l5.04-4.91C33.89 4.36 29.47 2 24 2 14.82 2 7.09 7.83 4.24 16.08l6.91 5.36C12.65 14.04 17.88 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.14 24.49c0-1.57-.14-3.08-.41-4.53H24v8.58h12.39c-.53 2.79-2.16 5.15-4.61 6.73l7.1 5.51C43.3 36.39 46.14 30.9 46.14 24.49z"/>
                <path fill="#4A90E2" d="M10.77 28.44c-.48-1.43-.75-2.95-.75-4.49s.27-3.06.75-4.49L3.86 13.9C2.65 16.78 2 20.04 2 23.5s.65 6.72 1.86 9.6l6.91-5.36z"/>
                <path fill="#FBBC05" d="M24 46c6.48 0 11.92-2.13 15.89-5.78l-7.1-5.51c-2.02 1.36-4.61 2.18-7.59 2.18-6.11 0-11.34-4.54-12.85-10.94l-6.91 5.36C7.09 40.17 14.82 46 24 46z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center mt-6 text-sm">
            Don't have an account?{" "}
            <button 
              onClick={onSwitchToSignup} 
              className="text-blue-600 font-medium hover:underline focus:outline-none"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}