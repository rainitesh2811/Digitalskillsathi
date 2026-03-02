import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { supabase } from "@/supabaseclient";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface UserData {
  email: string | undefined;
  providers: string[];
  hasPassword: boolean;
}

export function Settings() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    email: "",
    providers: [],
    hasPassword: false,
  });

  // Edit email state
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Change password state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Set password for Google users
  const [showSetPasswordForm, setShowSetPasswordForm] = useState(false);
  const [googlePasswordValue, setGooglePasswordValue] = useState("");
  const [confirmGooglePassword, setConfirmGooglePassword] = useState("");
  const [googlePasswordLoading, setGooglePasswordLoading] = useState(false);
  const [googlePasswordMessage, setGooglePasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error("Error fetching user:", userError);
          return;
        }

        setNewEmail(user.email || "");

        const identities = user.identities || [];
        const providers = identities.map((identity: any) => identity.provider);
        const hasPassword = identities.some((identity: any) => identity.provider === "email");

        setUserData({
          email: user.email,
          providers,
          hasPassword,
        });

        if (providers.includes("google") && !hasPassword) {
          setShowSetPasswordForm(true);
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEmailChange = async () => {
    if (!newEmail || newEmail === userData.email) {
      setEmailMessage({ type: "error", text: "Please enter a different email" });
      return;
    }

    setEmailLoading(true);
    setEmailMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });

      if (error) {
        setEmailMessage({ type: "error", text: error.message });
      } else {
        setEmailMessage({
          type: "success",
          text: "Confirmation email sent. Please verify your new email address.",
        });
        setEditingEmail(false);
        setUserData({ ...userData, email: newEmail });
      }
    } catch (error) {
      setEmailMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to update email",
      });
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      setPasswordMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }

    setPasswordLoading(true);
    setPasswordMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        setPasswordMessage({ type: "error", text: error.message });
      } else {
        setPasswordMessage({ type: "success", text: "Password changed successfully" });
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordForm(false);
      }
    } catch (error) {
      setPasswordMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to change password",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSetPassword = async () => {
    if (!googlePasswordValue || !confirmGooglePassword) {
      setGooglePasswordMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    if (googlePasswordValue !== confirmGooglePassword) {
      setGooglePasswordMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    if (googlePasswordValue.length < 6) {
      setGooglePasswordMessage({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }

    setGooglePasswordLoading(true);
    setGooglePasswordMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({ password: googlePasswordValue });

      if (error) {
        setGooglePasswordMessage({ type: "error", text: error.message });
      } else {
        setGooglePasswordMessage({ type: "success", text: "Password set successfully" });
        setGooglePasswordValue("");
        setConfirmGooglePassword("");
        setShowSetPasswordForm(false);
        setUserData({ ...userData, hasPassword: true });
      }
    } catch (error) {
      setGooglePasswordMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to set password",
      });
    } finally {
      setGooglePasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="gap-2 text-gray-600 hover:text-gray-900 px-0 hover:bg-transparent"
            onClick={() => {
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account preferences and security</p>
        </div>

        {/* Email Update Section */}
        <Card className="mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Email Address</h2>
              <p className="text-gray-600 text-sm mt-1">{userData.email}</p>
            </div>
            {!editingEmail && (
              <Button variant="outline" onClick={() => setEditingEmail(true)}>
                Change Email
              </Button>
            )}
          </div>

          {editingEmail && (
            <div className="mt-4 space-y-4">
              <Input
                type="email"
                placeholder="Enter new email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                disabled={emailLoading}
              />
              {emailMessage && (
                <Alert variant={emailMessage.type === "error" ? "destructive" : "default"}>
                  <AlertDescription>{emailMessage.text}</AlertDescription>
                </Alert>
              )}
              <div className="flex gap-2">
                <Button
                  onClick={handleEmailChange}
                  disabled={emailLoading}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {emailLoading ? "Updating..." : "Update Email"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingEmail(false);
                    setNewEmail(userData.email || "");
                    setEmailMessage(null);
                  }}
                  disabled={emailLoading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Google OAuth Set Password Section */}
        {userData.providers.includes("google") && !userData.hasPassword && (
          <Card className="mb-6 p-6 border-blue-200 bg-blue-50">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-blue-900">Secure Your Account</h2>
              <p className="text-blue-800 text-sm mt-1">
                You're currently signed in with Google. Set a password to enable email/password login as well.
              </p>
            </div>

            {showSetPasswordForm && (
              <div className="mt-4 space-y-4">
                <Input
                  type="password"
                  placeholder="Create password"
                  value={googlePasswordValue}
                  onChange={(e) => setGooglePasswordValue(e.target.value)}
                  disabled={googlePasswordLoading}
                />
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmGooglePassword}
                  onChange={(e) => setConfirmGooglePassword(e.target.value)}
                  disabled={googlePasswordLoading}
                />
                {googlePasswordMessage && (
                  <Alert variant={googlePasswordMessage.type === "error" ? "destructive" : "default"}>
                    <AlertDescription>{googlePasswordMessage.text}</AlertDescription>
                  </Alert>
                )}
                <div className="flex gap-2">
                  <Button
                    onClick={handleSetPassword}
                    disabled={googlePasswordLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {googlePasswordLoading ? "Setting..." : "Set Password"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowSetPasswordForm(false);
                      setGooglePasswordMessage(null);
                    }}
                    disabled={googlePasswordLoading}
                  >
                    Skip for Now
                  </Button>
                </div>
              </div>
            )}

            {!showSetPasswordForm && userData.hasPassword && (
              <p className="text-sm text-green-700">✓ Password is set</p>
            )}

            {!showSetPasswordForm && !userData.hasPassword && (
              <Button
                variant="outline"
                onClick={() => setShowSetPasswordForm(true)}
                className="border-blue-600 text-blue-600 hover:bg-blue-100"
              >
                Set Password Now
              </Button>
            )}
          </Card>
        )}

        {/* Change Password Section */}
        {userData.hasPassword && (
          <Card className="mb-6 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Password</h2>
                <p className="text-gray-600 text-sm mt-1">Change your account password</p>
              </div>
              {!showPasswordForm && (
                <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
                  Change Password
                </Button>
              )}
            </div>

            {showPasswordForm && (
              <div className="mt-4 space-y-4">
                <Input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={passwordLoading}
                />
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={passwordLoading}
                />
                {passwordMessage && (
                  <Alert variant={passwordMessage.type === "error" ? "destructive" : "default"}>
                    <AlertDescription>{passwordMessage.text}</AlertDescription>
                  </Alert>
                )}
                <div className="flex gap-2">
                  <Button
                    onClick={handlePasswordChange}
                    disabled={passwordLoading}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    {passwordLoading ? "Updating..." : "Change Password"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setNewPassword("");
                      setConfirmPassword("");
                      setPasswordMessage(null);
                    }}
                    disabled={passwordLoading}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Account Info Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Account Type</span>
              <span className="font-medium">
                {userData.providers.includes("google") ? "Google" : "Email"}
                {userData.providers.length > 1 && ` + ${userData.providers.length - 1} more`}
              </span>
            </div>
            {userData.hasPassword && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Password</span>
                <span className="font-medium text-green-600">✓ Set</span>
              </div>
            )}
            {!userData.hasPassword && userData.providers.includes("google") && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Password</span>
                <span className="font-medium text-gray-500">Not set (Google OAuth only)</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}