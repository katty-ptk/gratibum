import React from 'react'

// components
import AppHeader from './AppHeader'
import Create from '../../components/gratibum/Create'
import Logout from '../../components/gratibum/Logout'

const Main = () => {
  return (
    <div className="gratibum">
      <AppHeader />


      <div className="test-greeting">
        <h3>Hi, { localStorage.getItem("currentUser") }!</h3>
        <Logout />
      </div>

      <div className="create">
            <Create />
        </div>
    </div>
  )
}

export default Main