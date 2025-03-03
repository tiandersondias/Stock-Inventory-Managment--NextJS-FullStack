import { ThemeProvider } from "@/app/ThemeProvider";
import { AuthProvider } from "../app/authContext";
import { AppProps } from "next/app"; // Import AppProps for typing
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  // Use AppProps for typing
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
