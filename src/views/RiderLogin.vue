<template>
  <div>
    <div id="login">
      <div class="form-container">
        <form @submit.prevent="login()" class="form">
          <div class="input-container">
            <div>
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                v-model="details.email"
                placeholder="Email *"
                class="input-field"
                required
              />
            </div>
          </div>
          <div class="input-container">
            <div>
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                v-model="details.password"
                placeholder="Password *"
                class="input-field"
                required
              />
            </div>
          </div>
          <div class="input-container">
            <button :disabled="loading === true">
              Login<span class="loader" v-if="loading"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "RiderLogin",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      details: (state) => state.accountModule.loginDetails,
    }),
  },
  methods: {
    ...mapActions("accountModule", ["loginRider"]),
    login() {
      this.loginRider(this.details);
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  animation-name: fadeIn;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-duration: 0.8s;
  animation-fill-mode: forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .form-container {
    max-width: 50%;
    margin: auto;
    border-radius: 5px;
    padding: 1rem 0;

    .form {
      .input-container {
        display: flex;
        justify-content: space-evenly;
        margin: 1rem 0;

        div {
          width: 100%;

          label {
            width: 100%;
            display: flex;
            font-size: 0.8rem;
            margin-left: 1rem;
          }

          .input-field {
            width: 90%;
            color: var(--cyanBlue);
            font-size: 14px;
            border: 1px solid var(--cyanBlue);
            border-radius: 5px;
            padding: 0.5rem;
          }

          width: 50%;

          .disabled {
            border: 1px solid rgba(0, 0, 0, 0.2);
            &::placeholder {
              color: rgba(0, 0, 0, 0.2);
            }
          }
        }

        button {
          display: flex;
          align-items: center;
          background: var(--cyanBlue);
          border-radius: 5px;
          padding: 0.5rem 2rem;
          margin-top: 1rem;

          span {
            margin-left: 0.5rem;
          }
        }
      }
    }
  }
}
</style>
