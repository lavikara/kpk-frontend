<template>
  <div id="customer-account">
    <h1>Hello from customer account</h1>
  </div>
</template>

<style lang="scss" scoped>
#customer-account {
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
}
</style>
