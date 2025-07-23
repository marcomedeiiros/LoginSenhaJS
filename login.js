// Elementos do Login
const loginForm = document.getElementById('loginForm');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');
const loginMessage = document.getElementById('loginMessage');

// Elementos do Cadastro
const registerForm = document.getElementById('registerForm');
const registerUsername = document.getElementById('registerUsername');
const registerPassword = document.getElementById('registerPassword');
const registerBtn = document.getElementById('registerBtn');
const registerMessage = document.getElementById('registerMessage');

// Links para trocar os formulários
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

// Função para carregar usuários do localStorage
function getUsers() {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : {};
}

// Função para salvar usuários no localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Mostrar o formulário de cadastro
showRegister.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
  loginMessage.textContent = '';
  registerMessage.textContent = '';
});

// Mostrar o formulário de login
showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
  loginMessage.textContent = '';
  registerMessage.textContent = '';
});

// Cadastrar usuário
registerBtn.addEventListener('click', () => {
  const username = registerUsername.value.trim();
  const password = registerPassword.value;

  if (!username || !password) {
    registerMessage.style.color = '#f44336';
    registerMessage.textContent = 'Por favor, preencha todos os campos.';
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

// Fazer login
loginBtn.addEventListener('click', () => {
  const username = loginUsername.value.trim();
  const password = loginPassword.value;

  if (!username || !password) {
    loginMessage.style.color = '#f44336';
    loginMessage.textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  let users = getUsers();

  if (users[username] && users[username] === password) {
    loginMessage.style.color = 'lightgreen';
    loginMessage.textContent = `Bem-vindo, ${username}! Login efetuado com sucesso.`;
    // Aqui você pode redirecionar para outra página
    // window.location.href = 'dashboard.html';
  } else {
    loginMessage.style.color = '#f44336';
    loginMessage.textContent = 'Usuário ou senha incorretos.';
  }
});