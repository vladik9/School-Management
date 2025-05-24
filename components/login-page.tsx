'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from '@/controllers/auth';
import translations from '@/lib/translations';

/**
 * Handles user login.
 *
 * This page is accessible when the user is not authenticated. It renders a
 * form with email and password fields, and a submit button. When the form is
 * submitted, it calls the `login` function with the provided email and
 * password. If the login is successful, it redirects the user to the
 * dashboard page.
 *
 * @return {JSX.Element} The login page.
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  /**
   * Handles the form submission.
   *
   * This function is called when the user submits the login form. It prevents
   * the default form submission behavior, resets the error message, and calls
   * the `login` function with the provided email and password. If the login is
   * successful, it redirects the user to the dashboard page. If the login fails,
   * it displays an error message.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(email, password);
      if (response) {
        router.push('/dashboard');
      }
    } catch (error) {
      setError(translations.loginError);
    }
  };

  /**
   * Toggles the visibility of the password field.
   *
   * This function is called when the user clicks on the eye icon in the
   * password field. It toggles the value of the `showPassword` state variable,
   * which determines whether the password is rendered as a text input or a
   * password input.
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {translations.login}</CardTitle>
          <CardDescription className="text-center">{translations.loginDescription}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{translations.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={translations.your_email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{translations.password}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={translations.your_password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? `${translations.hidePassword}` : `${translations.showPassword}`}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">{translations.login}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
