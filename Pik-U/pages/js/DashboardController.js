const btnDoubleCheeseBurger = document.getElementById("btnDoubleCheeseBurger");
const btnCheeseBurger = document.getElementById("btnCheeseBurger");
const btnBbqBurger = document.getElementById("btnBbqBurger");
const btnChickenBurger = document.getElementById("btnChickenBurger");
const btnBeefBurger = document.getElementById("btnBeefBurger");

const cartData = JSON.parse(localStorage.getItem("cart"));

btnDoubleCheeseBurger.addEventListener("click", (e) => {
  // const cartData = {
  //   menuId: menuData.filter(
  //     (menu) => menu.menuName === "The Ultimate Double Cheese Burger"
  //   )[0].menuId,
  //   addOns: [],
  // };
  // localStorage.setItem("cart", JSON.stringify(cartData));

  const menuId = menuData.filter(
    (menu) => menu.menuName === "The Ultimate Double Cheese Burger"
  )[0].menuId;

  location.href = `createOrder.html?menuId=${menuId}`;
});

btnCheeseBurger.addEventListener("click", (e) => {
  // const cartData = {
  //   menuId: menuData.filter((menu) => menu.menuName === "Cheese Burger")[0]
  //     .menuId,
  //   addOns: [],
  // };

  // localStorage.setItem("cart", JSON.stringify(cartData));
  // location.href = "createOrder.html";

  const menuId = menuData.filter((menu) => menu.menuName === "Cheese Burger")[0]
    .menuId;

  location.href = `createOrder.html?menuId=${menuId}`;
});

btnBbqBurger.addEventListener("click", (e) => {
  // const cartData = {
  //   menuId: menuData.filter((menu) => menu.menuName === "BBQ Burger")[0].menuId,
  //   addOns: [],
  // };

  // localStorage.setItem("cart", JSON.stringify(cartData));
  // location.href = "createOrder.html";

  const menuId = menuData.filter((menu) => menu.menuName === "BBQ Burger")[0]
    .menuId;

  location.href = `createOrder.html?menuId=${menuId}`;
});

btnChickenBurger.addEventListener("click", (e) => {
  // const cartData = {
  //   menuId: menuData.filter(
  //     (menu) => menu.menuName === "Fried Chicken Sandwich"
  //   )[0].menuId,
  //   addOns: [],
  // };

  // localStorage.setItem("cart", JSON.stringify(cartData));
  // location.href = "createOrder.html";
  const menuId = menuData.filter(
    (menu) => menu.menuName === "Fried Chicken Sandwich"
  )[0].menuId;

  location.href = `createOrder.html?menuId=${menuId}`;
});

btnBeefBurger.addEventListener("click", (e) => {
  // const cartData = {
  //   menuId: menuData.filter((menu) => menu.menuName === "Beef Burger")[0]
  //     .menuId,
  //   addOns: [],
  // };

  // localStorage.setItem("cart", JSON.stringify(cartData));
  // location.href = "createOrder.html";

  const menuId = menuData.filter((menu) => menu.menuName === "Beef Burger")[0]
    .menuId;

  location.href = `createOrder.html?menuId=${menuId}`;
});

const btnCart = document.getElementById("btnCart");

btnCart.addEventListener("click", (e) => {
  location.href = `cart.html`;
});
