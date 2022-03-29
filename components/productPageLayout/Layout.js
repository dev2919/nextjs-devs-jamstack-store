import React from 'react'
import NavBar from '../navBar/NavBar'
import Footer from '../footer/Footer'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <NavBar/>
      <main>
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout