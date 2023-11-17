const $ = (id) => document.getElementById(id);

window.onload = function () {
  let titulo = document.querySelector(".moviesAddTitulo");
  let formulario = document.querySelector("#formulario");
  let article = document.querySelector("article");
  titulo.innerHTML = "AGREGAR PELÍCULA";
  titulo.classList.add("titulo");
  article.classList.add("fondoTransparente");
  formulario.classList.add("fondoCRUD");

  //------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
  //-------------------DE REGISTRO DE PELÍCULAS------------------//

  const elementsForm = $("formAdd").elements;

  const showInfo = (id, msg, error) => {
    if (error) {
      $(id).innerHTML = msg;
      $(id).classList.add("alert-warning");
      $(id).classList.remove("alert-info");
    } else {
      $(id).innerHTML = msg;
      $(id).classList.add("alert-info");
      $(id).classList.remove("alert-warning");
    }
  };

  $("title").addEventListener("focus", function () {
    showInfo("msg-title", "Escriba el titulo de la peli", false);
  });

  $("title").addEventListener("blur", function () {
    if (!this.value.trim()) {
      showInfo("msg-title", "Y el titulo abuelito?", true);
    } else {
      showInfo("msg-title", null, true);
    }
  });

  $("rating").addEventListener("focus", function () {
    showInfo("msg-rating", "Indicar valor entre 0 y 10", false);
    this.classList.remove("is-invalid");
  });

  $("rating").addEventListener("blur", function () {
    switch (true) {
      case !this.value.trim():
        showInfo("msg-rating", "No vale nada?", true);
        this.classList.add("is-invalid");
        break;
      case +this.value < 0:
        showInfo("msg-rating", "Tan poco vale?", true);
        this.classList.add("is-invalid");
        break;
      case +this.value > 10:
        showInfo("msg-rating", "Tampoco la pavada", true);
        this.classList.add("is-invalid");
        break;
      default:
        showInfo("msg-rating", null, true);
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
        break;
    }
  });

  $("formAdd").addEventListener("submit", function (event) {
    event.preventDefault();

    const errors = [];
    $("box-errors").innerHTML = null

    for (let i = 0; i < elementsForm.length - 1; i++) {
      if (!elementsForm[i].value) {
        errors.push(`El campo ${elementsForm[i].name} no puede estar vacio`);
      }
      if(elementsForm[i].classList.contains('is-invalid')){
        errors.push(`El campo ${elementsForm[i].name} tiene datos invalidos`);
      }
    }

    if (errors.length) {
      errors.forEach((error) => {
        $("box-errors").innerHTML += `<li>${error}</li>`;
      });
    } else {
      this.submit();
    }
  });
};
