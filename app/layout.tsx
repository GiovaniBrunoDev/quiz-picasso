import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Avaliação Picasso",
  description: "Avalie sua experiência e ganhe um drink",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="overflow-hidden">
        {children}
      </body>
    </html>
  );
}