import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "@chakra-ui/color-mode";

createRoot(document.getElementById("root")).render(
  <ColorModeProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ColorModeProvider>
);
