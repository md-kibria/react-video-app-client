import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './components/Index'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'

export const ListContext = React.createContext({})

const App = () => {

  // sidebar favourite list
  const [list, setList] = useState([])

  return (
    <ListContext.Provider value={{list, setList}}>
      <Routes>
        <Route path="/*" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ListContext.Provider>
  )
}

export default App
