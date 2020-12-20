import { loginGoogle, sigUpFirebase } from '../../index.js';

export const templateSignUp = () => {
  const divSignUp = document.createElement('div');
  const viewSignUp = `
  <img src="imagenes/logo.png" alt="logoVeg" id="logo">
  <h2> Aqui ira el formulario para el registro <h2>
  <button id="loginGoogle">Login con google</button>
  <form id="signUpForm" method="post">
  <input name="fullName" type="text" placeholder="Nombre Completo" id="fullName" pattern="[a-z]{1, 20}" title="Solo se permiten letras" required>
  <input name="userName" type="text" placeholder="Nombre de Usuario" id="userNameSignUp" required>
  <input name="email" type="email" placeholder="Correo electronico" id="emailSignUp" required>
  <input name="password" type="password" placeholder="Contraseña" id="passwordSignUp" minlength="6" maxlength="8" required>
  <p id="errorPassword">Tu contraseña debe contener minimo 6 caracteres. Al menos 1 caracter numerico y 1 caracter alfabetico.</p> 
  <button type="submit" id="btnSignUp">Registrarme</button>
  </form>
  <div id="foot"> 
  <h3>¿Ya tienes cuenta?</h3>
  <a href=""><h3>Ingresa aquí</h3></a>
  </div>
  `;
  divSignUp.innerHTML = viewSignUp;

  const errorPasswords = divSignUp.querySelector('#errorPassword');

  const bntGoogle = divSignUp.querySelector('#loginGoogle');
  bntGoogle.addEventListener('click', () => {
    loginGoogle();
  });

  const signUpForm = divSignUp.querySelector('#signUpForm');
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.querySelector('#fullName');
    const userName = document.querySelector('#userNameSignUp');
    const email = document.querySelector('#emailSignUp').value;
    const password = document.querySelector('#passwordSignUp').value;
    console.log(password, email);
    console.log("hellooooooooooo");

    if (password.match(/[a-z]/g) && password.match(/[0-9]/g) && password.length >= 6) { // match() se usa para obtener todas las ocurrencias de una expresión regular dentro de una cadena.
      sigUpFirebase(email, password);
    } else {
      errorPasswords.style.display = 'block';
      document.querySelector('#passwordSignUp').value = '';
    }

    // // Acceso de usuarios existentes
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     console.log('datos usuario', user);
    //     user.user.sendEmailVerification();
    //     alert('Te hemos enviado un correo para confirmar tu cuenta. *Recuerda revisar tu bandeja de spam o correos no deseado');
    //     window.location.href = '';
    //     // Signed in
    //   // signUpForm.reset(); // reset() restablece los valores de los elementos en un formulario
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode);
    //     console.log(errorMessage);
    //     if (errorCode === 'auth/email-already-in-use') {
    //       alert('Este usuario ya existe');
    //       cleanForm();
    //     } else {
    //       alert('Error');
    //       cleanForm();
    //     }
    //   });
  });
  //  e.preventDefault();

  return divSignUp;
};

// limpliar los input
export const cleanForm = () => {
  document.querySelector('#emailSignUp').value = '';
  document.querySelector('#passwordSignUp').value = '';
};
