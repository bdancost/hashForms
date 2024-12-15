"use strict";

function isValidName(string) {
  for (let index = 0; index < string.length; index++) {
    let char = string[index];

    if (
      !(
        (char >= "A" && char <= "Z") ||
        (char >= "a" && char <= "z") ||
        char == " "
      )
    ) {
      return false;
    }
  }
  return true;
}

function isValidCPF(cpf) {
  return cpf.length === 11 && !isNaN(cpf);
}

function isValidPhone(phone) {
  return phone.length === 11 && !isNaN(phone);
}

function isValidCEP(cep) {
  return cep.length === 8 && !isNaN(cep);
}

// Função para buscar endereço via API de CEP
async function buscaEndereco(cep) {
  if (!isValidCEP(cep)) {
    alert("CEP inválido! Por favor, insira um CEP com 8 dígitos.");
    return;
  }

  try {
    const response = await fetch(` https://cep.awesomeapi.com.br/json/${cep}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar endereço");
    }
    const data = await response.json();

    if (data.status && data.status !== 200) {
      alert("CEP não encontrado");
      return;
    }

    // Preenchendo os campos com os dados da API
    document.getElementById("rua").value = data.address;
    document.getElementById("bairro").value = data.district;
    document.getElementById("cidade").value = data.city;
    document.getElementById("estado").value = data.state;
  } catch (error) {
    alert("Erro ao buscar endereço: " + error.message);
  }
}

// Evento para o camopo CEP
document.getElementById("cep").addEventListener("blur", (event) => {
  const cep = event.target.value.trim();
  buscaEndereco(cep);
});

function isValidState(state) {
  return (
    state.length === 2 &&
    state[0] >= "A" &&
    state[0] <= "Z" &&
    state[1] >= "A" &&
    state[1] <= "Z"
  );
}

function validarEGuardarFormulario(evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const cep = document.getElementById("cep").value.trim();
  const rua = document.getElementById("rua").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const bairro = document.getElementById("bairro").value.trim();
  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim();

  // Verificação se todos os campos estão preenchidos
  if (
    !nome ||
    !cpf ||
    !telefone ||
    !cep ||
    !rua ||
    !numero ||
    !bairro ||
    !cidade ||
    !estado
  ) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (!isValidName(nome)) {
    alert("O nome deve contar apenas letras e espaços.");
    return;
  }

  if (!isValidCPF(cpf)) {
    alert("O CPF deve conter 11 dígitos numéricos.");
    return;
  }

  if (!isValidPhone(telefone)) {
    alert("O telefone deve conter 11 dígitos numéricos.");
    return;
  }
  if (!isValidCEP(cep)) {
    alert("O CEP deve conter 8 dígitos numéricos.");
    return;
  }

  if (!isValidState(estado)) {
    alert("O estado deve conter 2 letras maiúsculas.");
    return;
  }
}

// Evento para o formulário
const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", validarEGuardarFormulario);
