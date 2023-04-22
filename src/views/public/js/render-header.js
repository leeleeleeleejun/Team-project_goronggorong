function renderHeader(loggedInUser) {
  const header = document.querySelector('header');

  //로그인 한 유저의 헤더
  if (loggedInUser) {
    header.innerHTML = `
    <header>
  <nav class="nav">
    <a href="/"><img class="nav__logo" src="/src/views/img/main/logo.png" width="140" /></a>

    <ul class="nav__user-menu">
      <li>
        <a class="nav__mypage" href="/mypage"><img class="icon" src="/src/views/img/main/profile.png" /></a>
      </li>
      <li>
        <a href="/orders/cart"><img class="icon" src="/src/views/img/main/cart.png" /></a>
      </li>
    </ul>
  </nav>
</header>
`;
  }
  //로그인 안 한 유저의 헤더
  else {
    header.innerHTML = `
    <header>
      <nav class="nav">
        <a href="/">
          <img class="nav__logo" src="/src/views/img/main/logo.png" width="140" />
        </a>

        <ul class="nav__user-menu">
          <li>
            <a class="nav__login" href="/signin">
              로그인
            </a>
          </li>
          <li>
            <a href="/orders/cart">
              <img class="icon" src="/src/views/img/main/cart.png" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
    `;
  }
}

export { renderHeader };
