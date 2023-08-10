import "./globals.css";

export const metadata = {
  title: "Online Video Editor",
  description: "Online app to trim video's.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
