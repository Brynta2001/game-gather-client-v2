import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Game Gather",
  description: "Review and Discover games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
    <body>
    
        <div className='main'>
            <div className='gradient' />
        </div>

        <main className='app'>
            
            {children}
        </main>
    
    </body>
</html>
  );
}
