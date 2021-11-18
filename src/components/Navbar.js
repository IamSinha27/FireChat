import React from 'react'

const Navbar = (props) => {
    return (
        <div>
            <div className='nav-bar'>
        <div className='logo-tab'>
          {props.logoName}
        </div>

        <div onClick={props.clicked} className='logout-tab'>
          {props.text}
        </div>
      </div>
        </div>
    )
}

export default Navbar;