import ClientLayout from "./components/ClientLayout";
import SplashGate from "./components/SplashGate";
import "./globals.css";

export const metadata = {
  title: "Port. | Sweetha Muniraj",
  description: "UI/UX Designer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.cdnfonts.com/css/agustina" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var t = localStorage.getItem('theme') || 'dark';
              document.documentElement.setAttribute('data-theme', t);
              document.documentElement.style.backgroundColor = t === 'light' ? '#f0f6ff' : '#020617';
            } catch(e) {}
          })();
        ` }} />
        <SplashGate>
          <ClientLayout>
            {children}
          </ClientLayout>
        </SplashGate>
      </body>
    </html>
  );
}
