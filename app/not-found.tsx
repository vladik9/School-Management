import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from 'lucide-react';
import translations from "@/lib/translations";

/**
 * The NotFound component is a fallback page rendered when Next.js is unable
 * to find a route matching the current URL.
 *
 * It displays a centered card with a bold title, a short paragraph of text
 * explaining that the page was not found, and a button to go back to the
 * homepage.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center justify-center">
            <AlertTriangle className="mr-2 h-6 w-6 text-yellow-500" />
            {translations.pageNotFound}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            {translations.pageNotFoundMessage}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              {translations.backToHome}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
