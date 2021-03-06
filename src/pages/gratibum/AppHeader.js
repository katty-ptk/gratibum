import React from 'react'
import { Link } from 'react-router-dom'

const AppHeader = () => {
  return (
    <div className="app-header">
        <h2>Your Gratibum</h2>

        <div className="profile-icon">
          <Link to="/profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#50434F" class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>
          </Link>
        </div>

    </div>
  )
}

export default AppHeader