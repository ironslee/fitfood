function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show", "fade");
  modal.classList.remove("hide");
  // modal.classList.toggle('show');
  document.body.style.overflow = "hidden";
  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
  
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show", "fade");
  // modal.classList.toggle('show');
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal window
  const modalBtn = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);
  // const modalClose = document.querySelector("[data-close]");




  modalBtn.forEach((item) => {
    item.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });


  // modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') === '' ) {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });


  // (window.pageYOffset + document.body.clientHeight >= document.body.scrollHeight)
  function showModalByScroll() {
    if  (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight
      ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);


}

export default modal;
export {closeModal, openModal};