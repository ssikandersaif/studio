import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from '@/contexts/language-context';
import { ThemeProvider } from '@/contexts/theme-provider';
import Script from 'next/script';
import { AuthProvider } from '@/contexts/auth-context';
import { inter, ptSans } from '@/app/fonts';
import { cn } from '@/lib/utils';


export const metadata: Metadata = {
  title: 'Krishi Mitra',
  description: 'Your AI-powered farming companion for Indian agriculture.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body className={cn("font-body antialiased", inter.variable, ptSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Script src="//code.tidio.co/gktpkpuf8khohc1mzzs8fe6zzdff1y9e.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
