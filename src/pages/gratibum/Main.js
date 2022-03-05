import React from 'react'

// components
import AppHeader from './AppHeader'
import Create from '../../components/gratibum/Create'
import Logout from '../../components/gratibum/Logout'

// import { motion } from 'framer-motion';

// const albumVariants = {
//     initial: {
//         x: '-100vw'
//     },

//     animate: {
//         x: 0,
//         transition: { type: 'tween' }
//     }
// }

const Main = () => {
  return (
    <div className="gratibum">
      <AppHeader />


      <div className="test-greeting">
        <h3>Hi, { localStorage.getItem("userData") }!</h3>
        <Logout />
      </div>

      <div className="create">
            <Create />
        </div>
    </div>
  )
}

export default Main