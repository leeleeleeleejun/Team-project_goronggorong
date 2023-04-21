function renderHeader(loggedInUser) {
  let header;
  //로그인 한 유저의 헤더
  if (loggedInUser) {
    header = `
    <header>
  <nav class="nav">
    <a href="/"><img class="nav__logo" src="../../../img/products/logo.png" width="140" /></a>

    <ul class="nav__user-menu">
      <li>
        <a class="nav__mypage" href="/mypage"><img class="icon" src="../../../img/products/profile.png" /></a>
      </li>
      <li>
        <a href="/orders/cart"><img class="icon" src="../../../img/products/cart.png" /></a>
      </li>
    </ul>
  </nav>
</header>
`;
  }
  //로그인 안 한 유저의 헤더
  else {
    header = `
    <header>
      <nav class="nav">
        <a href="/">
          <img class="nav__logo" src="../../../img/products/logo.png" width="140" />
        </a>

        <ul class="nav__user-menu">
          <li>
            <a class="nav__login" href="/signin">
              로그인
            </a>
          </li>
          <li>
            <a href="/orders/cart">
              <img class="icon" src="../../../img/products/cart.png" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
    `;
  }

  document.body.innerHTML += header;
}

export { renderHeader };
