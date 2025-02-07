import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";


createRoot(document.getElementById('root')).render(
  <ColorModeProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ColorModeProvider>  
)
