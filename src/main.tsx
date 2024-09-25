import { createRoot } from 'react-dom/client'
import { App } from './App'
import { PageProvider } from '@context/pageContext'
import '@assets/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <PageProvider>
    <App />
  </PageProvider>
)
