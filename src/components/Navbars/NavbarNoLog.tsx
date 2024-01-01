import React from 'react'

function NavbarNoLog() {
    return (
        <>
            <div className="navbar bg-base-300">
                <img src="./src/assets/logo.png" alt="logo" />
                <a href='/' className="normal-case text-5xl text-title ml-14">Beaujolais, Beaujolais</a>
                <a href="/contact" className='ml-auto text-3xl'>Contactez-nous</a>
                <a href="/apropos" className='mx-auto text-3xl'>A propos</a>
            </div>
        </>
    )
}

export default NavbarNoLog