// const btnBack = document.getElementById("btnBack");
// btnBack.addEventListener("click", (e) => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const menuId = parseInt(urlParams.get("menuId"));

//   location.href = "createOrder.html?menuId"=menuId;
// });

const btnAddMore = document.getElementById("btnAddMore");
btnAddMore.addEventListener("click", (e) => {
  location.href = "dashboard.html";
  // localStorage.removeItem("cart");
  localStorage.removeItem("addOns");
});

const IMAGE_LOCATION = "../images";

const cartData = JSON.parse(localStorage.getItem("cart"));
const listCartItems = document.getElementById("listCartItems");

const total = document.getElementById("total");
const subtotal = document.getElementById("subtotal");
const discount = document.getElementById("discount");

let subtotalPrice = 0,
  discountPrice = 0,
  totalPrice = 0;

cartData.map((data) => {
  const menu = menuData.filter((menu) => menu.menuId === data.menuId)[0];

  // const addOnsData = data.addOns

  const cartAddOnsData = data.addOns.map((addOn) => {
    return getAddOnById(addOn.addOnId);
  });

  subtotalPrice += parseInt(menu.price);

  const container = document.createElement("div");
  container.classList = "order-container";
  container.innerHTML = `<div class='menu-section'>
    <h4>${menu.menuName}</h4>
    <span id='${data.orderId}'>&#215;</span>
  </div>
  <table class='receipt-table' cellspacing='0'>
    <thead>
      <tr>
        <th>ㅤ</th>
        <th style='width: 40%'>Item</th>
        <th>QTY</th>
        <th>PRICE</th>
        <th>total</th>
      </tr>
    </thead>
    <tbody id='tableBody${data.orderId}'>
      <tr id='mainMenu'>
        <td>ㅤ</td>
        <td>${menu.menuName}</td>
        <td>1</td>
        <td>${menu.price}</td>
        <td>${menu.price}</td>
      </tr>
      <tr>
        <td colspan='5' class='add-on-label text-left'>
          ADD-ONS ITEM
        </td>
      </tr>
      ${cartAddOnsData
        .map((addOn, index) => {
          subtotalPrice += parseInt(data.addOns[index].qty) * addOn.price;
          return `
        <tr>
          <td>
            <span class='x-btn'>&#215;</span>
          </td>
          <td>${addOn.addOnName}</td>
          <td>${data.addOns[index].qty}</td>
          <td>${addOn.price}</td>
          <td>${parseInt(data.addOns[index].qty) * addOn.price}</td>
        </tr>
        `;
        })
        .join("")}
    </tbody>
  </table>`;

  // const tableBody = document.getElementById(`tableBody${data.orderId}`);

  // const tableRow = document.createElement("tr");
  // tableRow.innerHTML = `
  //   <td>
  //     <span class='x-btn'>&#215;</span>
  //   </td>
  //   <td>lettuce</td>
  //   <td>1</td>
  //   <td>6</td>
  //   <td>6</td>
  // `;

  // tableBody.appendChild(tableRow);

  listCartItems.appendChild(container);
});

function getAddOnById(addOnId) {
  return addOnsData.find((addOn) => addOn.addOnId === addOnId);
}

function getMenuById(menuId) {
  return menuData.find((menu) => menu.menuId === menuId);
}

subtotal.innerText = subtotalPrice;
total.innerText = subtotalPrice - discountPrice;

// Get the modal
var modal = document.getElementById("qrModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const btnPlaceOrder = document.getElementById("btnPlaceOrder");

btnPlaceOrder.addEventListener("click", (e) => {
  modal.style.display = "block";

  const qrData = {
    orderNumber: parseInt(localStorage.getItem("orderNumber")) + 1 || 0,
    orderData: [],
  };

  cartData.map((data) => {
    let tmpData = {
      orderId: data.orderId,
      menuName: getMenuById(data.menuId).menuName,
      price: getMenuById(data.menuId).price,
      qty: 1,
      addOns: data.addOns.map((addOn) => {
        return {
          qty: addOn.qty,
          addOnName: getAddOnById(addOn.addOnId).addOnName,
          price: getAddOnById(addOn.addOnId).price,
        };
      }),
    };
    qrData.orderData.push(tmpData);
  });

  // console.log(qrData);

  const qrcode = document.getElementById("qrcode");

  let text = lzw_encode(JSON.stringify(qrData));

  qrcode.src = `http://api.qrserver.com/v1/create-qr-code/?data=${text}`;

  const btnSave = document.getElementById("btnSave");
  btnSave.addEventListener("click", async (e) => {
    try {
      await downloadImage(qrcode.src, "qr-code-" + new Date().getTime());
      localStorage.removeItem("cart");
      localStorage.removeItem("addOns");
      location.href = "dashboard.html";
    } catch (error) {
      alert(error.message);
    }
  });

  //api.qrserver.com/v1/create-qr-code/?data

  localStorage.setItem(
    "orderNumber",
    parseInt(localStorage.getItem("orderNumber")) + 1 || 0
  );
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
