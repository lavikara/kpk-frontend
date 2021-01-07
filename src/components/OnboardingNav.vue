<template>
  <div id="topnav">
    <div class="topnav container">
      <h1 class="logo">
        <a href="/" class="link"
          >KPK<img src="@/assets/img/trolley.svg" alt="trolley icon"
        /></a>
      </h1>
      <div class="links">
        <ul>
          <li>
            <router-link to="/vendor-login">Login</router-link>
          </li>
          <li>
            <router-link to="/vendor-signup">Signup</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Patrick+Hand+SC&display=swap");
#topnav {
  background: var(--cyanBlue);

  .topnav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--whiteColor);
    padding: 0.5rem 0rem;

    // reduce padding when doing responsivenes

    .logo {
      .link {
        flex: 0.3;
        display: flex;
        align-items: center;
        font-family: "Patrick Hand SC", cursive;
      }
    }

    .form {
      flex: 1;
      display: flex;
      justify-content: center;

      input {
        width: 80%;
        font-size: 1rem;
        color: var(--cyanBlue);
        padding: 0.7rem 0.5rem;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      button {
        color: var(--cyanBlue);
        background: #99b8e9;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 0rem 1rem 0 0.7rem;
      }
    }

    .links {
      display: flex;
      align-items: center;

      ul {
        display: flex;
        margin: 0 1rem;

        &:last-child {
          margin-right: 0;
          margin-left: 0;
        }

        li {
          margin: 0 0.5rem;
        }

        .cart-btn {
          display: flex;
          align-items: center;
          border: 1px solid #ffffff;
          border-radius: 5px;
          padding: 0.5rem 2rem;

          img {
            margin-left: 0.5rem;
          }
        }
      }
    }
  }

  .category-nav {
    display: flex;
    justify-content: center;
    font-size: 0.9rem;
    color: var(--cyanBlue);
    background: #99b8e9;
    padding: 1rem 0rem;

    .links {
      width: 100%;
      display: flex;
      justify-content: space-between;

      ul {
        display: flex;

        &:last-child {
          width: 80%;
          justify-content: space-between;
        }

        li {
          display: flex;
          align-items: center;

          &:last-child {
            margin-right: 0;
          }

          img {
            margin-left: 0.3rem;
          }
        }
      }
    }
  }
}
</style>
