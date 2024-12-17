"use strict";

function toggleDiscount() {
  const discountBody = document.getElementById("apply-discount-body");
  const icon = document.getElementById("toggle-icon");

  // Alternar a visibilidade do formulário desconto
  if (
    discountBody.style.display === "none" ||
    discountBody.style.display === ""
  ) {
    discountBody.style.display = "block";
    icon.classList.add("bxs-chevron-up");
    icon.classList.remove("bxs-chevron-down");
  } else {
    discountBody.style.display = "none";
    icon.classList.add("bxs-chevron-down");
    icon.classList.remove("bxs-chevron-up");
  }
}

const discountCupons = {
  DESCONTO10: 0.1, // 10% DESCONTO
  DESCONTO20: 0.2, // 20% DESCONTO
  DESCONTO50: 0.5, // 50% DESCONTO
};

// Função para aplicar o desconto
function applyDiscount() {
  const discountCode = document
    .getElementById("discount-code")
    .value.trim()
    .toUpperCase();
  const discountMenssageElement = document.getElementById("discount-message");
  const totalPriceElement = document.getElementById("total-price");

  //Verificar se o cupom de desconto é valido
  if (discountCupons[discountCode]) {
    const discount = discountCupons[discountCode];
    const originalPrice = 1200;
    const discountedPrice = originalPrice * (1 - discount);

    //Atualizar o preço com o desconto
    totalPriceElement.textContent = `Preço Total: R$ ${discountedPrice.toFixed(
      2
    )}`;

    // Armazenar o cupom no LocalStorage
    localStorage.setItem("discount", discountCode);

    // Exibir a mensagem de desconto

    discountMenssageElement.textContent = `Desconto de ${discountCode} aplicado!`;

    // Limpar o campo de cupom de desconto
    document.getElementById("discount-code").value = "";
  } else {
    // Exibir a mensagem de cupom de desconto inválido
    discountMenssageElement.style.color = "red";
    discountMenssageElement.textContent = "Cupom de desconto inválido!";
  }
}

function checkStorageDiscount() {
  const storageDiscount = localStorage.getItem("discount");
  const discountMenssageElement = document.getElementById("discount-message");

  if (storageDiscount) {
    localStorage.removeItem("discount");
  }

  discountMenssageElement.textContent = "";
}

window.onload = checkStorageDiscount;

const discountInput = document.getElementById("discount-code");
discountInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    applyDiscount();
  }
});

//<i class='bx bxs-chevron-up'></i>
