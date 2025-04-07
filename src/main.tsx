import { createRoot } from 'react-dom/client'
import { App } from './App'
import { store } from './store/index'
import { Provider } from 'react-redux'
import '@assets/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
