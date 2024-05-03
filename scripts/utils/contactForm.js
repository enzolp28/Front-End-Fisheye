function handleContactForm() {
  const body = document.querySelector("body");
  const headerPage = document.querySelector(".photograph-header");
  const btnCloseModal = document.getElementById("close-modal");
  const btnOpenModal = document.querySelector(".contact_button");
  const modal = document.getElementById("contact_modal");
  
  btnOpenModal.addEventListener("click", displayModal);
  btnCloseModal.addEventListener("click", closeModal);

  function displayModal() {
    body.setAttribute("aria-hidden", "true");
    body.setAttribute("tabindex", "-1");
    modal.focus();
    btnCloseModal.focus();
    headerPage.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");
    modal.style.display = "block";
    console.log("appeler");
  }

  function closeModal() {
    headerPage.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
    btnOpenModal.focus();
  }

  document.addEventListener("keydown", (e) => {
    if (modal.getAttribute("aria-hidden") == "false" && e.keyCode === 27) {
      closeModal();
    }
  });
}
