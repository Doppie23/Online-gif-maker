import "./globals.css";

export const metadata = {
  title: "Online Gif Maker",
  description: "Online app to create a gif from a video.",
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
