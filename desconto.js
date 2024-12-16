"use strict";

function toggleDiscount() {
  const discountBody = document.getElementById("apply-discount-body");
  const icon = document.getElementById("toogle-icon");

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

//<i class='bx bxs-chevron-up'></i>
