const btnBack = document.getElementById("btnBack");
btnBack.addEventListener("click", (e) => {
  const confirmBack = confirm("Warning: leaving will reset the customization");
  if (confirmBack) {
    localStorage.removeItem("addOns");
    location.href = "dashboard.html";
  }
});

const btnAddToCart = document.getElementById("btnAddToCart");
btnAddToCart.addEventListener("click", (e) => {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];

  // const orderNumber = parseInt(localStorage.getItem("orderNumber")) || 0;

  cartData.push({
    orderId: new Date().getTime(),
    menuId: menuId,
    addOns: JSON.parse(localStorage.getItem("addOns")).addOns,
  });

  localStorage.setItem("cart", JSON.stringify(cartData));

  location.href = "cart.html";
});

const IMAGE_LOCATION = "../images";

// const cartData = JSON.parse(localStorage.getItem("addOns"));

const urlParams = new URLSearchParams(window.location.search);
const menuId = parseInt(urlParams.get("menuId"));

const cartMenu = menuData.filter((menu) => menu.menuId === menuId)[0];

const createOrderBody = document.getElementById("createOrderBody");

createOrderBody.style.background = `url(${IMAGE_LOCATION}/${cartMenu.imageName}) no-repeat fixed center`;
createOrderBody.style.backgroundSize = "cover";

{
  /* <div class='add-on'>
  <div class='add-on-left'>
    <img src='../images/white-bun.png' alt='' class='img img-ingredient' />
    <div class='title-price'>
      <p>white bun</p>
      <p>
        &#8369;<span>100</span>
      </p>
    </div>
  </div>
  <div class='add-on-right'>
    <img src='../images/minus-icon.png' alt='' class='img add-minus-icon' />
    <p id='addOnCount'>0</p>
    <img src='../images/add-icon.png' alt='' class='img add-minus-icon' />
  </div>
</div>; */
}

const btnBun = document.getElementById("btnBun");
const btnVegetables = document.getElementById("btnVegetables");
const btnMeat = document.getElementById("btnMeat");
const btnSauce = document.getElementById("btnSauce");

let currentAddOn = "bun";

getActiveCateg(currentAddOn);
displayAddOns(currentAddOn);
listAddedIngredients();

btnBun.addEventListener("click", (e) => {
  if (currentAddOn === "bun") {
    return;
  }
  removeActiveCateg(currentAddOn);
  currentAddOn = "bun";

  displayAddOns(currentAddOn);
  getActiveCateg(currentAddOn);
});

btnVegetables.addEventListener("click", (e) => {
  if (currentAddOn === "vegetable") {
    return;
  }
  removeActiveCateg(currentAddOn);
  currentAddOn = "vegetable";

  displayAddOns(currentAddOn);
  getActiveCateg(currentAddOn);
});

btnMeat.addEventListener("click", (e) => {
  if (currentAddOn === "meat") {
    return;
  }
  removeActiveCateg(currentAddOn);
  currentAddOn = "meat";

  displayAddOns(currentAddOn);
  getActiveCateg(currentAddOn);
});

btnSauce.addEventListener("click", (e) => {
  if (currentAddOn === "sauce") {
    return;
  }
  removeActiveCateg(currentAddOn);
  currentAddOn = "sauce";

  displayAddOns(currentAddOn);
  getActiveCateg(currentAddOn);
});

function getActiveCateg(currentAddOn) {
  if (currentAddOn === "bun") {
    btnBun.classList.toggle("active-categ");
  }

  if (currentAddOn === "vegetable") {
    btnVegetables.classList.toggle("active-categ");
  }

  if (currentAddOn === "meat") {
    btnMeat.classList.toggle("active-categ");
  }

  if (currentAddOn === "sauce") {
    btnSauce.classList.toggle("active-categ");
  }
}

function removeActiveCateg(currentAddOn) {
  if (currentAddOn === "bun") {
    btnBun.classList.toggle("active-categ");
  }

  if (currentAddOn === "vegetable") {
    btnVegetables.classList.toggle("active-categ");
  }

  if (currentAddOn === "meat") {
    btnMeat.classList.toggle("active-categ");
  }

  if (currentAddOn === "sauce") {
    btnSauce.classList.toggle("active-categ");
  }
}

function displayAddOns(currentAddOn) {
  const addOnsContainer = document.getElementById("addOnsContainer");
  addOnsContainer.replaceChildren();
  const cartData = JSON.parse(localStorage.getItem("addOns"));

  addOnsData
    .filter((addOn) => addOn.addOnCateg === currentAddOn)
    .map((addOn) => {
      const tmpDiv = document.createElement("div");
      tmpDiv.name = `${addOn.addOnCateg}`;
      tmpDiv.classList = "add-on";
      tmpDiv.innerHTML = `
      <div class='add-on-left'>
        <img src='../images/${
          addOn.imageName
        }' alt='' class='img img-ingredient' />
        <div class='title-price'>
          <p>${addOn.addOnName}</p>
          <p>
            &#8369;<span>${addOn.price}</span>
          </p>
        </div>
      </div>
      <div class='add-on-right'>
        <button id='minusAddOnId${
          addOn.addOnId
        }' class="btn-none" onClick='minusOnClick(this)'><img src='../images/minus-icon.png' alt='' class='img add-minus-icon' /></button>
        <p id='addOnCountId${addOn.addOnId}'>${
        cartData?.addOns.filter(
          (cartAddOn) => cartAddOn.addOnId === addOn.addOnId
        )[0]?.qty || 0
      }</p>
        <button id='plusAddOnId${
          addOn.addOnId
        }' class="btn-none" onClick='plusOnClick(this)'><img src='../images/add-icon.png' alt='' class='img add-minus-icon' /></button>
        
      </div>
  `;
      addOnsContainer.appendChild(tmpDiv);
    });
}

function minusOnClick(e) {
  const addOnId = parseInt(e.id.split("minusAddOnId")[1]);

  const cartData = JSON.parse(localStorage.getItem("addOns")) || { addOns: [] };

  const addOnCount = document.getElementById(`addOnCountId${addOnId}`);

  if (addOnCount.innerText == 0) {
    cartData.addOns.map((addOn, index) => {
      if (addOn.qty === 0) {
        cartData.addOns.splice(index, 1);
      }
    });

    localStorage.setItem("addOns", JSON.stringify(cartData));
    return;
  }
  addOnCount.innerText = parseInt(addOnCount.innerText) - 1;

  cartData.addOns.map((addOn) => {
    if (addOn.addOnId === addOnId) {
      addOn.qty = parseInt(addOnCount.innerText);
    }
  });

  cartData.addOns.map((addOn, index) => {
    if (addOn.qty === 0) {
      cartData.addOns.splice(index, 1);
    }
  });

  localStorage.setItem("addOns", JSON.stringify(cartData));
  listAddedIngredients();
}

function plusOnClick(e) {
  const addOnId = parseInt(e.id.split("plusAddOnId")[1]);

  const cartData = JSON.parse(localStorage.getItem("addOns")) || { addOns: [] };

  const addOnCount = document.getElementById(`addOnCountId${addOnId}`);

  addOnCount.innerText = parseInt(addOnCount.innerText) + 1;

  const checkAddOn = cartData?.addOns.filter(
    (addOn) => addOn.addOnId === addOnId
  );

  if (checkAddOn.length === 0) {
    const newAddOn = {
      addOnId: addOnId,
      qty: parseInt(addOnCount.innerText),
    };
    cartData.addOns.push(newAddOn);
    localStorage.setItem("addOns", JSON.stringify(cartData));
    listAddedIngredients();
    return;
  }

  cartData.addOns.map((addOn) => {
    if (addOn.addOnId === addOnId) {
      addOn.qty = parseInt(addOnCount.innerText);
    }
  });

  localStorage.setItem("addOns", JSON.stringify(cartData));
  // console.log(cartData);
}

function listAddedIngredients() {
  const cartData = JSON.parse(localStorage.getItem("addOns"));
  // console.log(cartData);

  const listIngredients = document.getElementById("listIngredients");
  listIngredients.replaceChildren();

  const currentIngredients =
    cartData?.addOns.map((cart) => {
      return addOnsData.filter((addOn) => addOn.addOnId === cart.addOnId);
    }) || [];

  if (currentIngredients.length === 0) {
    return;
  }

  currentIngredients.map((addOn) => {
    const imgIngredient = document.createElement("img");
    imgIngredient.src = `${IMAGE_LOCATION}/${addOn[0].imageName}`;
    imgIngredient.classList = "img img-ingredient";

    listIngredients.appendChild(imgIngredient);
  });

  // <img src="../images/tomato.png" alt="" class="img img-ingredient" />
}
