import React, { useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import SignUp from '../SignUp/SignUp'
import { logIn } from '../../services/auth'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    const [handleSignUp, setHandleSignUp] = useState(false)

    // Schema de validation pour les inputs
    // Tant que c'est pas bon, ça affiche les messages correspondants
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email invalide')
            .required('Email obligatoire'),
        password: Yup.string()
            .min(5, "5 caractères min.")
            .matches(/^(?=.*[0-9])/, "Un chiffre obliatoire")
            .required('Mot de passe obligatoire')
    })

    // Hook useFormik()
    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: values => {
            // La valeur null est utilisée pour spécifier une fonction de remplacement
            //  dans la sérialisation JSON. La sérialisation JSON par défaut fait référence 
            // à la manière standard dont les objets JavaScript sont convertis en chaînes JSON.
            // Sans null et 2, on obtient un objet sur une ligne avec la key et la valeur récupérée
            // Avec vous avez un objet formaté sur 2 lignes
            alert(JSON.stringify(values, null, 2))
            const response: any = logIn({ values })
            console.log("🚀 ~ file: Login.tsx:42 ~ Login ~ response:", response)
            if (response.status === true) {
                navigate("/home")
            }
        },
        validationSchema,
        // Message qui s'affiche d'office, pas obligatoire
        // initialErrors: {
        //     email: "Email obligatoire",
        //     password: "Mot de passe invalide"
        // }
    })

    return (
        <>
            <Header />
            <div className="w-full h-screen background">
                {!handleSignUp ? (
                    <form onSubmit={handleSubmit} className='form-control w-6/12 mx-auto'>
                        <h1 className='text-xl font-bold'>Se connecter</h1>
                        <label htmlFor="email" className="label">
                            <span className="label-text text-white">Votre email ?</span>
                        </label>
                        <input
                            required
                            name="email"
                            type="email"
                            placeholder="exemple@mail.fr"
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleChange}
                            value={values.email}
                        />
                        {errors.email && (<p className='mt-2 text-red-600'>{errors.email}</p>)}

                        <label className="label">
                            <span className="label-text text-white">Votre mot de passe ?</span>
                        </label>
                        <input
                            required
                            name="password"
                            type="password"
                            placeholder="Mot de passe"
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleChange}
                            value={values.password}
                        />
                        {errors.password && (<p className='mt-2 text-red-600'>{errors.password}</p>)}

                        <a href="/passwordLost" className="text-white hover:text-base-300 mt-2">Mot de passe oublié</a>

                        <button
                            type='submit'
                            onClick={() => handleSubmit()}
                            className="btn btn-active mt-5 w-3/12">Connexion</button>

                    </form>
                ) : <SignUp />
                }
                <h4 className='flex justify-end mr-4 text-lg font-bold'>Visiteur
                    <a href="/home">
                        <img className='w-6/12 ml-3' src="./src/assets/logo.png" alt="logo cliquable" />
                    </a>
                </h4>
            </div>
            <Footer />
        </>
    )
}

export default Login