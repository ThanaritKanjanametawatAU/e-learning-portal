import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "E-Learning Portal",
  description: "An advanced e-learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {children}
    </html>
  );
}