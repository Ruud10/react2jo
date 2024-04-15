import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

// 리액트 쿼리 QueryClient , 리덕스 툴킷 Provider 사용
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);

reportWebVitals();
