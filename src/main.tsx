import { createRoot } from 'react-dom/client'
import { App } from './App'
import { PageProvider } from '@context/pageContext'
import { store } from './slices/index'
import { Provider } from 'react-redux'
import '@assets/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PageProvider>
      <App />
    </PageProvider>
  </Provider>
)
