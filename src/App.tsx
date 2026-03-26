import { Toaster } from "sonner";
import { HomePage } from "./pages/home";

export default function App() {
  return (
    <>
      <HomePage />
      <Toaster position="top-right" richColors />
    </>
  );
}
