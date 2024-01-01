import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

function SignUp() {

    // Schema de validation pour les inputs
    // Tant que c'est pas bon, ça affiche les messages correspondants
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email invalide')
            .required('Email obligatoire'),
        password: Yup.string()
            .min(5, "5 caractères min.")
            .matches(/^(?=.*[0-9])/, "Un chiffre obliatoire")
            .required('Mot de passe obligatoire'),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Les mots de passe ne correspondent pas')
            .required('Répéter le mot de passe est obligatoire'),
    })

    // Hook useFormik()
    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            email: "",
            pseudonyme: "",
            password: "",
            repeatPassword: ""
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))

            if (values.password !== values.repeatPassword) {
                alert("Les mots de passe ne correspondent pas");
            } else {
                // Les mots de passe correspondent, procédez avec l'action souhaitée
                alert(JSON.stringify(values, null, 2));
            }
        },
        validationSchema,
    })


    return (
        <>
            <Header />
            <div className="w-full h-screen background">
                <form onSubmit={handleSubmit} className='form-control w-6/12 mx-auto'>
                    <label htmlFor="email" className="label">
                        <span className="label-text text-white">Votre email ?</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete='off'
                        placeholder="exemple@mail.fr"
                        className="input input-bordered w-full max-w-xs"
                        onChange={handleChange}
                        value={values.email}
                    />
                    {errors.email && (<p className='mt-2 text-red-500'>{errors.email}</p>)}
                    <label htmlFor="nickname" className="label">
                        <span className="label-text text-white">Pseudonyme ?</span>
                    </label>
                    <input
                        id="nickname"
                        type="text"
                        placeholder="Pseudonyme"
                        className="input input-bordered w-full max-w-xs"
                        onChange={handleChange}
                        value={values.pseudonyme}
                    />
                    {errors.pseudonyme && (<p className='mt-2 text-red-500'>{errors.pseudonyme}</p>)}
                    <label className="label">
                        <span className="label-text text-white">Votre mot de passe ?</span>
                    </label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Mot de passe"
                        className="input input-bordered w-full max-w-xs"
                        onChange={handleChange}
                        value={values.password}
                    />
                    {errors.password && (<p className='mt-2 text-red-500'>{errors.password}</p>)}
                    <label className="label">
                        <span className="label-text text-white">Répétez mot de passe ?</span>
                    </label>
                    <input
                        name="repeatPassword"
                        type="password"
                        placeholder="Répétez votre mot de passe"
                        className="input input-bordered w-full max-w-xs"
                        onChange={handleChange}
                        value={values.repeatPassword}
                    />
                    <button
                        type='submit'
                        onClick={() => handleSubmit()}
                        className="btn btn-active my-5 w-3/12">Valider</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default SignUp