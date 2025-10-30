import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // Remove this for production

import './index.css'
import App from './App.jsx'
import { store } from "./redux/store/store.js";


// Create a client
const client = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} /> // Remove this for production */}
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
