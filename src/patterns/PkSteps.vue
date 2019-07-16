<template>
  <div style="display: flex; justify-content: space-between; width: 864px;">
    <PkStep
      number="1"
      content="Search for the beautiful ideas of home remodeling in your neighborhood"
      img="icons/step1-map.svg"
    />
    <PkStep
      number="2"
      content="Save the ideas you’ve found in your personal account"
      img="icons/step2-suitcase.svg"
    />
    <PkStep
      number="3"
      content="Find a perfect contractor who has already implemented these ideas before"
      img="icons/step3-blueprint.svg"
    />
  </div>
</template>
<script>
export default {
  name: "PkSteps",
  status: "ready",
  release: "1.0.0",
}
</script>
