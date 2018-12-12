<template>
<!--
  <a :href="searchPositionObject.links[0].location" target="_blank">
-->
<!--
    <tr onclick="window.location=searchPositionObject.links[0].location;">
-->
    <tr onclick="window.location">
      <td>Artnr</td>
      <td>{{ searchPositionObject.title }}</td>
      <td>{{ searchPositionObject.fileName }}</td>
      <td>{{ searchPositionObject.language }}</td>
      <td>{{ searchPositionObject.fileType }}</td>
      <td>{{ (searchPositionObject.fileSize / 1000 / 1000).toFixed(3) }} MB</td>
    </tr>

<!--
  </a>
-->
</template>

<script>

  export default {
    name: 'SearchPosition',
    props: {
      searchPositionObject: {
        type: Object,
        required: true
      },
    },
  };
</script>

<style scoped>

  a {
    width: 100%;
    height: 100%;
  }

</style>
