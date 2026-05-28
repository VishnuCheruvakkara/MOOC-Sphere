import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/ui/Loader.jsx';

createRoot(document.getElementById('root')).render(
   
        <Provider store={store}>
            <PersistGate loading={<Loader/>} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
  
);
