
let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

function entrar() {
  console.log('entrei');
  let usuario = document.querySelector('#usuario');
  let userLabel = document.querySelector('#userLabel');

  let senha = document.querySelector('#senha');
  let senhaLabel = document.querySelector('#senhaLabel');

  let msgError = document.querySelector('#msgError');

  fetch('/polls/validar-usuario/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      usuario: usuario.value,
      senha: senha.value
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Usuário ou senha inválidos.');
    })
    .then(data => {
      window.location.href = '/polls/home';
      localStorage.setItem('token', data.token);
      localStorage.setItem('userLogado', JSON.stringify(data));
    })
    .catch(error => {
      userLabel.style.color = 'red';
      usuario.style.borderColor = 'red';
      senhaLabel.style.color = 'red';
      senha.style.borderColor = 'red';
      msgError.style.display = 'block';
      msgError.innerHTML = error.message;
      usuario.focus();
    });
}





