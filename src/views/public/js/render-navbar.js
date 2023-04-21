function renderNavbar() {
  const navbar = `
  <nav class="navbar">
  <ul class="nav__cate">
    <li>
      <a class="nav__cate--on" href="/products/:food">All</a>
    </li>
    <li>
      <a href="/products/:food">Food</a>
    </li>
    <li>
      <a href="/products/:snack">Snack</a>
    </li>
    <li>
      <a href="/products/:toy">Toy</a>
    </li>
    <li>
      <a href="/products/:toilet">Toilet</a>
    </li>
    <li>
      <a href="/products/:fashion">Fashion</a>
    </li>
  </ul>
</nav>
  `;

  document.body.innerHTML += navbar;
}

export { renderNavbar };
