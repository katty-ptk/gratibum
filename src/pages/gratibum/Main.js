import React from 'react'

// components
import AppHeader from './AppHeader'
import Create from '../../components/gratibum/Create'

const Main = () => {
  return (
    <div className="gratibum">
      <AppHeader />


      <div className="test-greeting">
        <h3>Hey, you! :)</h3>
      </div>

      <div className="create">
            <Create />
        </div>
    </div>
  )
}

export default Main