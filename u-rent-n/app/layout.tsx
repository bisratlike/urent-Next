// import type { Metadata } from "next";

// import "./globals.css";


// import { MantineProvider } from "@mantine/core";
// import { Notifications } from "@mantine/notifications";
// import '@mantine/core/styles.css';
// import '@mantine/notifications/styles.css';
// import 'normalize.css/normalize.css';
// import { CartProvider } from '@/context/CartContext'
// export const metadata: Metadata = {
//   title: "U-rent",
//   description: "",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <MantineProvider >
//         <CartProvider>
//         <Notifications />
//         {children}
        
//         </CartProvider>
         
//         </MantineProvider>
//       </body>
//     </html>
//   );
// }


// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: "U-rent",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider
          defaultColorScheme="light"
        >
          <CartProvider>
            <Notifications />
            {children}
          </CartProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
