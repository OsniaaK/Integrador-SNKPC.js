import { select, selectAll, create, read, save } from "./modules-js/utils.js";
import { catalogo } from "./modules-js/data.js";

const burguerNav = select("#nav-mobile");
const burguerMenu = select("#showmenu");
const buttonCart = selectAll(".showcart");
const cartMenu = select("#cart-card");

const showBurguerMenu = () => {
  if ((cartMenu.className = "active")) {
    cartMenu.classList.remove("active");
    cartMenu.classList.add("unActive");
  }
  burguerNav.classList.toggle("active");
  burguerNav.classList.toggle("unActive");
  if (burguerNav.classList.contains("active")) {
    document.body.classList.add("overlay");
  } else {
    document.body.classList.remove("overlay");
  }
};
burguerMenu.addEventListener("click", showBurguerMenu);

const showCart = () => {
  if ((burguerNav.className = "active")) {
    burguerNav.classList.remove("active");
    burguerNav.classList.add("unActive");
  }
  cartMenu.classList.toggle("active");
  cartMenu.classList.toggle("unActive");
  if (cartMenu.classList.contains("active")) {
    document.body.classList.add("overlay");
  } else {
    document.body.classList.remove("overlay");
  }
};
buttonCart.forEach((btn) => btn.addEventListener("click", showCart));
buttonCart.forEach((btn) => btn.addEventListener("click", e => {
  e.preventDefault()
  cartEmpty.classList.add('notShow')
}));

/* Lista de Productos */

const sectProductos = select("#productos");
const listCategories = selectAll("#categories li");
const selectCategory = select("#catalogo form select");

const renderProduct = (datos) => {
  sectProductos.innerHTML = null;
  for (const { id, categoria, imagen, nombre, precio, descripcion } of datos) {
    const card = create("li", "", {
      "data-id": id,
      "data-categoria": categoria,
    });
    const cardForm = create("form", "<button>Agregar al Carrito</button>");
    card.innerHTML = `
      <picture>
      <img src="${imagen}" alt="${nombre}">
      </picture>
      <article>
      <h1>${nombre}</h1>
      <p>${descripcion}</p>
      <p>$${precio.toLocaleString("es-ES")}</p>
      <p></p>
      </article>
      `;

    cardForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target.closest("li");
      const currentId = Number(target.dataset.id);
      const currentProduct = catalogo.find(({ id }) => id == currentId);
      let cart = read("carrito") || [];
      let isInCart = cart.some(
        ({ producto }) => producto.id == currentProduct.id
      );
      if (cart.length == 0 || !isInCart) {
        cart.push({ producto: currentProduct, cantidad: 1 });
      } else {
        cart = cart.map((item) => {
          if (item.producto.id == currentProduct.id) {
            item.cantidad += 1;
          }
          return item;
        });
      }
      save("carrito", cart);
      return renderCart();
    });

    card.append(cardForm);
    sectProductos.append(card);
  }
};
renderProduct(catalogo);

listCategories.forEach((li) =>
  li.addEventListener("click", (e) => {
    const target = e.target.closest("li");
    listCategories.forEach((item) => item.classList.remove("active"));
    target.classList.add("active");
    const category = target.dataset.categoria;
    let list =
      category == "todas"
        ? catalogo
        : catalogo.filter(({ categoria }) => categoria == category);
    return renderProduct(list);
  })
);

selectCategory.addEventListener("change", (e) => {
  let category = e.target.value;
  let list =
    category == "todas"
      ? catalogo
      : catalogo.filter(({ categoria }) => categoria == category);
  return renderProduct(list);
});

// Carrito Dinamico
const countItems = select("#countItems");
const listItems = select("#items");
const totalCart = select("#totalCart");
const btnCheckout = select("#btnCheckout");
const cartEmpty = select("#cartEmpty")

const renderCart = () => {
  let cart = read("carrito") || [];
  countItems.innerHTML = cart.length;
  totalCart.innerHTML = `$${cart
    .reduce((p, c) => (p += Number(c.producto.precio) * c.cantidad), 0)
    .toLocaleString("es-ES")}`;
  listItems.innerHTML =
    cart.length == 0
      ? "<p>No tienes productos agregados al Carrito 😔</p>"
      : null;
  for (const { producto, cantidad } of cart) {
    const item = create("li", "", { "data-id": producto.id });
    const itemForm = create("form", "");
    const btnItemAdd = create("button", "+", { type: "button" });
    const outputItem = create("output", cantidad);
    const btnItemRemove = create("button", "-", { type: "button" });
    item.innerHTML = `
      <picture>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      </picture>
      <article>
      <h1>"${producto.nombre}"</h1>
      <p>$${Number(producto.precio * cantidad).toLocaleString("es-ES")}</p>
      </article>
      `;

    btnItemAdd.addEventListener("click", (e) => {
      const target = e.target.closest("li");
      const currentId = Number(target.dataset.id);
      let cart = read("carrito") || [];
      cart = cart.map((item) => {
        if (item.producto.id == currentId) {
          item.cantidad += 1;
        }
        return item;
      });
      save("carrito", cart);
      return renderCart();
    });

    btnItemRemove.addEventListener("click", (e) => {
      const target = e.target.closest("li");
      const currentId = Number(target.dataset.id);
      let cart = read("carrito") || [];
      cart = cart
        .map((item) => {
          if (item.producto.id == currentId) {
            item.cantidad -= 1;
          }
          return item;
        })
        .filter(({ cantidad }) => cantidad > 0);
      save("carrito", cart);
      return renderCart();
    });

    itemForm.append(btnItemRemove, outputItem, btnItemAdd);
    item.append(itemForm);
    listItems.append(item);
  }
};
renderCart();

btnCheckout.addEventListener('click', e => {
  e.preventDefault()
  let cart = read("carrito");
  if (cart.length==0) {
    cartEmpty.classList.remove('notShow')
  }
})

btnCheckout.addEventListener('click', e => {
  e.preventDefault()
  let cart = read("carrito");
  if (cart.length!==0) {
    alert(`¡Compra Exitosa! Has adquirido un total de ${cart.length} Producto/s`);
  }
})

const footerLinks = selectAll('.hrefFooter')
const contactLinks = selectAll('.contactMedias')

footerLinks.forEach((link) => {
  link.addEventListener('click', () => {
    alert('Estos links son esteticos por el momento.')
  })
})

contactLinks.forEach((link) => {
  link.addEventListener('click', () => {
    alert('Estos links son esteticos por el momento.')
  })
})
