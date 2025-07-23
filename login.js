document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginUsername = document.getElementById('loginUsername');
  const loginPassword = document.getElementById('loginPassword');
  const loginBtn = document.getElementById('loginBtn');
  const loginMessage = document.getElementById('loginMessage');

  const registerForm = document.getElementById('registerForm');
  const registerUsername = document.getElementById('registerUsername');
  const registerPassword = document.getElementById('registerPassword');
  const registerBtn = document.getElementById('registerBtn');
  const registerMessage = document.getElementById('registerMessage');

  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');

  function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
  }

  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    loginMessage.textContent = '';
    registerMessage.textContent = '';
  });

  showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    loginMessage.textContent = '';
    registerMessage.textContent = '';
  });

  registerBtn.addEventListener('click', () => {
    const username = registerUsername.value.trim();
    const password = registerPassword.value;

    if (!username || !password) {
      registerMessage.style.color = '#f44336';
      registerMessage.textContent = 'Preencha todos os campos.';
      return;
    }

    if (username.includes(' ') || password.includes(' ')) {
      registerMessage.style.color = '#f44336';
      registerMessage.textContent = 'Usuário e senha não podem conter espaços.';
      return;
    }

    let users = getUsers();

    if (users[username]) {
      registerMessage.style.color = '#f44336';
      registerMessage.textContent = 'Usuário já existe. Escolha outro.';
      return;
    }

    users[username] = password;
    saveUsers(users);

    registerMessage.style.color = 'lightgreen';
    registerMessage.textContent = 'Cadastro realizado com sucesso! Faça login.';
    registerUsername.value = '';
    registerPassword.value = '';
  });

  loginBtn.addEventListener('click', () => {
    const username = loginUsername.value.trim();
    const password = loginPassword.value;

    if (!username || !password) {
      loginMessage.style.color = '#f44336';
      loginMessage.textContent = 'Preencha todos os campos.';
      return;
    }

    const users = getUsers();

    if (!users[username]) {
      loginMessage.style.color = '#f44336';
      loginMessage.textContent = 'Usuário não cadastrado.';
      return;
    }

    if (users[username] !== password) {
      loginMessage.style.color = '#f44336';
      loginMessage.textContent = 'Senha incorreta.';
      return;
    }

    loginMessage.style.color = 'lightgreen';
    loginMessage.textContent = `Bem-vindo, ${username}! Redirecionando...`;

    setTimeout(() => {
      window.location.href = 'https://www.linkedin.com/in/marco-medeirosdev/';
    }, 1000);
  });
});