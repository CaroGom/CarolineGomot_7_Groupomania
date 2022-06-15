module.exports.signupErrors = (err) => {
    let errors = {email: '', password: ''}
    if (err.message.includes('email')){
        errors.email = 'Cette adresse email n\'est pas valide';
    }
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email')){
        errors.email = "Cette adresse email est déjà enregistrée"
    }
    if (err.message.includes('password')){
        errors.password = 'Le mot de passe doit être composé d\'au moins 6 caractères';
    }
    return errors
}

module.exports.signInErrors = (err) => {
    let errors = {email: '', password:''}

    if (err.message.includes('email')){
        errors.email = 'Email inconnu';
    }
    if (err.message.includes('password')){
        errors.password = 'Le mot de passe est incorrect';
    }
    return errors
} 