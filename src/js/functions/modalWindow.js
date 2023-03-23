// Get the modal
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// ============================================================================ //
// Создание нового списка
const block = document.querySelector(".block");
const createBtn = document.querySelector(".buttons__create");
const closeModalBtn = document.querySelector(".close");
const modals = document.querySelector("#myModal");

createBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const selectValue = document.querySelector(".input__select").value;
  const domenValue = document.getElementById("domen").value;
  const ul = document.createElement("ul");
  ul.classList.add("block__list");
  ul.innerHTML = `
    <li class="block__text number">11223</li>
    <li class="block__text name">${selectValue}</li>
    <li class="block__text hide">http://${domenValue}.work5.ru</li>
    <div class="block__buttons">
      <div class="block__button">
        <button type="button" class="block__btn button-res button-red">
          <img class="block__button_img" src="./assets/svg/карандаш 1.svg">
          <p class="block__button_text">Редактировать</p>
        </button>
        <button type="button" class="block__btn button-res gray dell">
          <img class="block__button_img" src="./assets/svg/cansel.svg">
          <p class="block__button_text dell">Удалить</p>
        </button>
      </div>
    </div>
  `;
  block.appendChild(ul);
  closeModal();
});

closeModalBtn.addEventListener("click", closeModal);

function closeModal() {
  modals.style.display = "none";

  //========================================//

  // Удаление
  const deleteButtons = document.querySelectorAll(".dell");

  deleteButtons.forEach((deleteButton) => {
    const form = deleteButton.closest(".block__list");
    deleteButton.addEventListener("click", () => {
      form.remove();
    });
  });

  // Редактирование
  const editButtons = document.querySelectorAll(".button-red");

  editButtons.forEach((editButton) => {
    const editNumber = editButton
      .closest(".block__list")
      .querySelector(".number");
    const editName = editButton.closest(".block__list").querySelector(".name");
    const editHide = editButton.closest(".block__list").querySelector(".hide");

    editButton.addEventListener("click", () => {
      const newNumber = prompt("Введите новый №:", editNumber.textContent);
      const newName = prompt("Введите новое название:", editName.textContent);
      const newUrl = prompt("Введите новый URL:", editHide.textContent);

      if ((newUrl, newNumber, editName)) {
        // если пользователь ввел новое значение и нажал "ОК"
        editNumber.textContent = newNumber;
        editName.textContent = newName;
        editHide.textContent = newUrl;
      }
    });
  });
}

// ================================================================== //
