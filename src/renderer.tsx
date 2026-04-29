/* eslint-disable @typescript-eslint/no-non-null-assertion */
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);