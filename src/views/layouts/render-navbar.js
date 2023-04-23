function renderNavbar() {
  const navbar = document.querySelector('.navbar');
  navbar.innerHTML = `
  <ul class="nav__cate">
    <li>
      <a class="nav__cate--on" href="/">All</a>
    </li>
    <li>
      <a href="/products/food">Food</a>
    </li>
    <li>
      <a href="/products/snack">Snack</a>
    </li>
    <li>
      <a href="/products/toy">Toy</a>
    </li>
    <li>
      <a href="/products/toilet">Toilet</a>
    </li>
    <li>
      <a href="/products/fashion">Fashion</a>
    </li>
  </ul>
  `;
}

export { renderNavbar };
