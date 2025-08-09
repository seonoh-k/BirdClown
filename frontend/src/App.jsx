import { React, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Performance from "./pages/Performance.jsx"
import Show from "./pages/Show.jsx"
import Booth from "./pages/Booth.jsx"
import Gallery from './pages/Gallery.jsx'
import Contact from './pages/Contact.jsx'
import GalleryDetail from './pages/GalleryDetail.jsx'
import Admin from './pages/Admin.jsx'
import AdminGallery from './pages/AdminGallery.jsx'
import AdminGalleryDetail from './pages/AdminGalleryDetail.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import TopBtn from './TopBtn.jsx'
import Login from './pages/AdminLogin.jsx'

export default function App() {

  return (
    <BrowserRouter>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1 bg-[#EFF8F2] bg-opacity-90'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services/*" element={<Services />}>
              <Route index element={<Performance />} />
              <Route path="performance" element={<Performance />} />
              <Route path="show" element={<Show />} />
              <Route path="booth" element={<Booth />} />
            </Route>
            <Route path="/gallery/" element={<Gallery />} />
            <Route path="/gallery/detail/:albumId" element={<GalleryDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/*" element={<Admin />}>
              <Route index element={<Login />} />
              <Route path='gallery' element={<AdminGallery />} />
              <Route path='gallery/detail/:albumId' element={<AdminGalleryDetail />} />
            </Route>
          </Routes>
          <TopBtn />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
