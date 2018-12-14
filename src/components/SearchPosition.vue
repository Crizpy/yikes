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
      <td><img :src="getLanguageIcon()"></td>
      <td>{{ searchPositionObject.fileType }}</td>
      <td>{{ (searchPositionObject.fileSize / 1000 / 1000).toFixed(3) }} MB</td>
      <a :href="searchPositionObject.links[0].location" target="_blank">Klick hier</a>
    </tr>

<!--
  </a>
-->
</template>

<script>

  var images = require.context('../assets/icons/languages/', false, /\.png$/)

  export default {
    name: 'SearchPosition',
    props: {
      searchPositionObject: {
        type: Object,
        required: true
      },
    },
    methods: {
      getLanguageIcon() {
        switch (this.searchPositionObject.language) {
          case "en" :
            return images("./gb.png")
        }
      }
    }
  };
</script>

<style scoped>

  a {
    width: 100%;
    height: 100%;
  }

</style>
