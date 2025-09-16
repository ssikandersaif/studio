"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.28-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C41.38,36.405,44,30.632,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
  );
}

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const next = searchParams.get('next');
    if (user) {
      router.replace(next || '/dashboard');
    }
  }, [user, router, searchParams]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Signed In",
        description: "Welcome back!",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({
        variant: "destructive",
        title: "Sign-in Failed",
        description: "Could not sign in with Google. Please try again.",
      });
    }
  };

  if (loading || user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <Sprout className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Welcome to Krishi Mitra</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon className="mr-2 h-5 w-5" />
            )}
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
