import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Doctors Chamber — Chamber management',
  description: 'Multi-tenant SaaS for appointments, patients, and prescriptions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
