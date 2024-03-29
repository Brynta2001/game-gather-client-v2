import type { Metadata } from "next";
import "./globals.css";
import AppBar from "@/components/AppBar";
import Provider from "@/components/Provider";

// Defining the metadata for the layout
export const metadata: Metadata = {
  title: "Game Gather",
  description: "Review and Discover games",
};

// Defining the RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
    <body>
      <Provider>
        <AppBar />
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app pt-14'>            
            {children}
        </main>
      </Provider>
    </body>
</html>
  );
}
