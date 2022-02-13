import React from 'react'

// components
import AppHeader from './AppHeader'
import Create from '../../components/gratibum/Create'

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


      <p>Hi, { localStorage.getItem("userData") }!</p>

      <div className="create">
            <Create />
        </div>
    </div>
  )
}

export default Main