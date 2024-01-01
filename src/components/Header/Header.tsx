import React from 'react'

function Header() {
    return (
        <>
            <div className="navbar bg-base-300 justify-center">
                <img src="./src/assets/logo.png" alt="logo" />
                <a href='/' className="normal-case text-5xl text-title ml-14">Beaujolais, Beaujolais</a>
            </div>
        </>
    )
}

export default Header