import './globals.css'
import NavBar from "../components/NavBar";
import { montserrat } from './font';
import Provider from '../components/Provider';

export const metadata = {
  title: "e-commerce",
  description: "you can ship coding shirts",
  keywords: ["coding dress", "coding shirts"]
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-gray-100 ${montserrat.className}`}>
        <Provider>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  )
}

// root layout file => this file is used as the root layout for all the pages
// when we hit the app, it goes to entry point sr/app and then look for root layout file
// whatever the page(root page.js or products/page.js) we have hit, it's content 
// will come here in children props and get injected to body tag
// so this is the place where all content will come as props and get injected to body and rendered
// this file is useful for the cases where header or footer which is required for all pages
// so every page content will come here and have footer header at common place
