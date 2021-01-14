<template>
  <div id="content-loader">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
#content-loader {
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

  margin-top: 31px;
  font-size: 20px;
  text-align: center;
  padding-top: 200px;
  padding-bottom: 200px;
  @media screen and (max-width: 900px) {
    margin-top: 0.5rem;
  }
  .loader {
    display: flex;
    border: 6px solid #99b8e9;
    border-top: 6px groove var(--cyanBlue);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0% auto;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loader-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--cyanBlue);
    font-size: 1.6rem;
  }
}
</style>
