<template>
  <div
    class="homepage"
    style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
  >
    <PkHomepageTopBar> </PkHomepageTopBar>
    <div
      style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 92px;"
    >
      <PkHeading> Get home remodeling inspiration </PkHeading>
      <PkHeading level="h3"> Get inspired by your own neighbours </PkHeading>
      <PkSearchbar> </PkSearchbar>
      <img class="hero" src="img/neigbourhood-illustration.svg" />
      <div
        style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 92px;"
      >
        <PkHeading level="h2"> Meet your next home remodeling expert </PkHeading>
        <PkContent>
          Pickets.com allows homeowners to discover and get inspired by home remodeling projects in
          their own neighborhood.
        </PkContent>
      </div>
      <PkSteps />
      <PkTestamonials />
      <PkHomepageFooter />
    </div>
  </div>
</template>
<script></script>
<style scoped>
.homepage {
  background-color: white;
}
.hero {
  width: 100%;
  max-width: 1440px;
}
</style>
<docs>
    ```jsx
    <div>
        <PkHomepage />
    </div>
    ```
</docs>
