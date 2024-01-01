import React from 'react'

function Footer(props: any) {

    const { handleSignUp, setHandleSignUp } = props

    const changeComponent = () => {
        setHandleSignUp(true)
    }

    return (
        <>
            <footer className="footer p-5 bg-base-300 text-base-content bottom-0 flex items-center justify-between">
                <aside>
                    <img src="./src/assets/logo.png" alt="logo" />
                    <p className='font-semibold'>Copyright © 2023 - All right reserved</p>
                </aside>
                <section className='w-9/12'>
                    <p>Bienvenue! C'est la première fois que vous visitez ce site ? Parfait, vous avez la possibilité de le consulter
                        sans inscription, vous aurez accès aux posts des internautes ou vous pourrez en apprendre plus sur notre
                        belle région du Beaujolais(histoire, bons plans). Cliquez-ici
                        <a className="link link-error no-underline" href="/home"> Page d'accueil</a>. <br />
                        Si vous voulez contribuer au site, une inscription(cliquez sur
                        <a className="link link-error no-underline" href="/signUp" onClick={changeComponent}> Inscription</a>) suffit pour que vous puissiez faire un post ou des
                        commentaires...Pas d'inquiétude, vous ne serez pas inonder d'emails. Vous aurez le choix plus tard sur
                        votre page "Compte" de reçevoir des mails d'informations ou par ex. d'ajout d'un commentaires sur un de vos posts.
                    </p>
                </section>
                <nav className='flex flex-col'>
                    <a className="link link-hover font-semibold">A propos</a>
                    <a className="link link-hover font-semibold">Mentions légales</a>
                    <a className="link link-hover font-semibold">Contact</a>
                </nav>
            </footer>
        </>
    )
}

export default Footer