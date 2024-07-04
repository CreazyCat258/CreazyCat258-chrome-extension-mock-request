import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './page/home/index'

const container = document.getElementById('root');
const root = createRoot(container!); // 使用 React 18 的 createRoot API
root.render(<Home />);