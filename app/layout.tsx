// import { Analytics } from '@vercel/analytics/next'
// import type { Metadata, Viewport } from 'next'
// import './globals.css'

// export const metadata: Metadata = {
//   title: 'getFitaa | A Cleaner Home, Made Easy',
//   description: 'Professional, reliable home and office cleaning made simple with getFitaa.',
//   generator: 'v0.app',
//   icons: {
//     icon: [
//       {
//         url: '/icon-light-32x32.png',
//         media: '(prefers-color-scheme: light)',
//       },
//       {
//         url: '/icon-dark-32x32.png',
//         media: '(prefers-color-scheme: dark)',
//       },
//       {
//         url: '/icon.svg',
//         type: 'image/svg+xml',
//       },
//     ],
//     apple: '/apple-icon.png',
//   },
// }

// export const viewport: Viewport = {
//   colorScheme: 'light dark',
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: 'white' },
//     { media: '(prefers-color-scheme: dark)', color: 'black' },
//   ],
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body className="antialiased">
//         {children}
//         {process.env.NODE_ENV === 'production' && <Analytics />}
//       </body>
//     </html>
//   )
// }


 
   import type { Metadata } from "next";
   import Navbar from "@/components/Navbar";
   import PageShell from "@/components/PageShell";
   import "./globals.css";
 
   export const metadata: Metadata = { title: "getFitaa" };
 
   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <body className="bg-white antialiased">
           <PageShell>
             <Navbar />
             <main>{children}</main>
           </PageShell>
         </body>
       </html>
     );
   }