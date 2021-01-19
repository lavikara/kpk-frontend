<template>
  <div id="dispatch" class="container">
    <div v-if="!loading && vendorDetails" class="rider-container">
      <div>
        <h1>Selected dispatch</h1>
        <h3
          class="noty"
          v-if="!loading && vendorDetails.asigned_riders.length === 0"
        >
          If you don't select a dispatch, products already uploaded<br />
          would be removed from the shop and you can't upload products.
        </h3>
        <ul>
          <li
            v-for="rider in vendorDetails.asigned_riders"
            :key="rider.phone_number"
            class="company-name"
          >
            <h2>{{ rider.company_name | nameShortenString | setUppercase }}</h2>
            <p class="address">
              {{ rider.address.street | setUppercase }},
              {{ rider.address.lga | setUppercase }},
              {{ rider.address.state | setUppercase }}.
            </p>
            <label class="label" for="contact details">Contact details</label>
            <h3 class="number">0{{ rider.phone_number }}</h3>
            <h3 class="email">{{ rider.email }}</h3>
            <button @click="removeDispatch(rider._id)">
              Remove dispatch
            </button>
          </li>
        </ul>
      </div>
      <div>
        <h1>Other riders</h1>
        <ul>
          <li
            v-for="(rider, index) in riders"
            :key="index"
            class="company-name"
          >
            <h2>{{ rider.company_name | nameShortenString | setUppercase }}</h2>
            <p class="address">
              {{ rider.address.street | setUppercase }},
              {{ rider.address.lga | setUppercase }},
              {{ rider.address.state | setUppercase }}.
            </p>
            <label class="label" for="contact details">Contact details</label>
            <h3 class="number">0{{ rider.phone_number }}</h3>
            <h3 class="email">{{ rider.email }}</h3>
            <button @click="selectDispatch(rider.id)">
              Select dispatch
            </button>
          </li>
        </ul>
      </div>
    </div>
    <ContentLoader v-if="loading">
      <div class="loader"></div>
    </ContentLoader>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ContentLoader from "@/components/ContentLoader";
import storage from "@/utils/storage.js";

export default {
  name: "Dispatch",
  components: {
    ContentLoader,
  },
  data() {
    return {
      vendor: storage.getVendorDetails(),
    };
  },
  mounted() {
    this.getVendorById(this.vendor.id);
    this.getAllRiders();
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      riders: (state) => state.userModule.riderDetails.allRiders,
      vendorDetails: (state) => state.userModule.vendorDetails.vendor,
    }),
  },
  methods: {
    ...mapActions("userModule", [
      "getAllRiders",
      "selectRider",
      "getVendorById",
      "removeRider",
    ]),
    ...mapActions("notificationModule", ["showToast"]),
    selectDispatch(id) {
      if (this.vendorDetails.asigned_riders.length === 1) {
        this.showToast({
          description: "Maximum riders selected",
          display: true,
          type: "error",
        });
        return;
      }
      const found = this.vendorDetails.asigned_riders.find((rider) => {
        return rider._id === id;
      });
      if (found) {
        this.showToast({
          description: "Rider already selected",
          display: true,
          type: "error",
        });
        return;
      }
      this.selectRider({ rider_id: id });
    },
    removeDispatch(id) {
      this.removeRider({ rider_id: id });
    },
  },
};
</script>

<style lang="scss" scoped>
#dispatch {
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
  .rider-container {
    display: grid;
    grid-template-columns: repeat(1fr);
    padding-top: 3rem;

    h1 {
      text-align: left;
      font-size: 20px;
      margin-left: 1.2rem;
    }

    .noty {
      margin: 4rem 0 0 0;
      line-height: 1.5;
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
        font-size: 14px;
        font-weight: 700;
        opacity: 0.6;
      }

      .number {
        font-size: 12px;
        margin: 0.5rem 0 0.2rem 0;
      }

      .email {
        font-size: 12px;
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
