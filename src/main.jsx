import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Layout from '../routes/Layout.jsx';
import DetailView from '../routes/DetailView.jsx';
import NotFound from '../routes/NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="comics/:id" element={<DetailView />} />
        </Route>
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
