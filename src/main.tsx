import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import App from './App.tsx'
import {StrictMode} from "react";
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App/>
            <Toaster/>
        </BrowserRouter>
    </StrictMode>
)