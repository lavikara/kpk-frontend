<template>
  <div id="header">
    <div class="container">
      <div class="left-side">
        <a href="mailto:hello@kpk.com">
          hello@kpk.com <img src="@/assets/img/email.svg" alt="email icon" />
        </a>
        <router-link to="/vendor-home" class="vendor-signup-btn"
          >Vendors</router-link
        >
      </div>
      <div class="right-side">
        <ul>
          <li><img src="@/assets/img/facebook.svg" alt="facebook icon" /></li>
          <li><img src="@/assets/img/twitter.svg" alt="twitter icon" /></li>
          <li><img src="@/assets/img/instagram.svg" alt="instagram icon" /></li>
        </ul>
        <ul>
          <li class="help-btn">
            <img src="@/assets/img/help.svg" alt="help icon" />
          </li>
          <li class="return-btn">
            <img src="@/assets/img/return.svg" alt="return icon" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#header {
  .container {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 0.7rem 0rem;

    .left-side {
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        display: flex;
        align-items: center;
        margin-right: 1.5rem;
      }

      .vendor-signup-btn {
        margin-left: 1.5rem;
      }
    }

    .right-side {
      display: flex;
      justify-content: center;
      align-items: center;

      ul {
        display: flex;

        &:last-child {
          margin-left: 5rem;
        }

        li {
          margin: 0 0.2rem;
        }

        .help-btn {
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>
