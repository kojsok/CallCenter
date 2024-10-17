import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx'
import './index.css'
import { queryClient } from './api/queryDatas.ts';
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { injectStore } from './api/Api'

injectStore(store)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
