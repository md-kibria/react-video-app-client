import { useState } from 'react'
import { Route, Routes, } from 'react-router-dom'
import Navigation from "./Navigation"
import Sidebar from './Sidebar'
import Home from '../pages/Home'
import Video from '../pages/Video'
import NotFound from '../pages/NotFound'

const Index = () => {

  // sidebar open or close
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Navigation />
      <div className='flex'>
        <Sidebar open={open} setOpen={setOpen} />
        <div className='bg-gray-300 grow p-7 px-6 overflow-y-scroll overflow-x-hidden h-nav'>
          <Routes>
            <Route path='/' element={<Home open={open} />} />
            <Route path='/video/:id' element={<Video />}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Index
