<template>
  <div id="assigned-store" class="container">
    <div class="store-container" v-if="!loading">
      <h1>Assigned stores</h1>
      <ul>
        <li v-for="(store, index) in details" :key="index" class="company-name">
          <h2>{{ store.business_name | setUppercase }}</h2>
          <p class="address">
            {{ store.address.street | setUppercase }},
            {{ store.address.lga | setUppercase }},
            {{ store.address.state | setUppercase }},
            {{ store.country | setUppercase }}.
          </p>
          <label class="label" for="contact details">Contact details</label>
          <h3 class="number">
            <img src="@/assets/img/phone.svg" alt="phone icon" />0{{
              store.phone_number
            }}
          </h3>
          <h3 class="email">
            <img src="@/assets/img/mail.svg" alt="phone icon" />{{
              store.email
            }}
          </h3>
        </li>
      </ul>
    </div>
    <ContentLoader v-if="loading">
      <div class="loader"></div>
    </ContentLoader>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ContentLoader from "@/components/ContentLoader";

export default {
  name: "AssignedShops",
  components: {
    ContentLoader,
  },
  data() {
    return {};
  },
  mounted() {
    this.getAssignedStore();
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      details: (state) => state.userModule.assignedStore.store,
    }),
  },
  methods: {
    ...mapActions("userModule", ["getAssignedStore"]),
  },
};
</script>

<style lang="scss" scoped>
#assigned-store {
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
  .store-container {
    padding-top: 3rem;

    h1 {
      text-align: left;
      font-size: 20px;
      margin-left: 1.2rem;
    }
    ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin-bottom: 5rem;

      li {
        background: #ffffff;
        margin: 1.8rem 1rem 0 1rem;
        border-radius: 10px;
        padding: 1rem;
        text-align: left;
      }

      .company-name {
        font-size: 14px;
        margin-bottom: 0.5rem;
      }

      .address {
        margin-bottom: 2rem;
      }

      .label {
        font-size: 1rem;
        color: #99b8e9;
      }

      .number {
        font-size: 0.9rem;
        margin: 0.8rem 0 0.5rem 0;
      }

      .email {
        font-size: 0.9rem;
      }

      h3 {
        display: flex;
        align-items: center;

        img {
          margin-right: 0.3rem;
        }
      }

      button {
        display: flex;
        align-items: center;
        margin: auto;
        background: var(--cyanBlue);
        border-radius: 5px;
        padding: 0.5rem 2rem;
        margin-top: 1.4rem;
        transition: all 0.3s;
      }
    }
  }
}
</style>
