import { ThemeProvider } from "@/app/ThemeProvider";
import { AuthProvider } from "../app/authContext";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
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
