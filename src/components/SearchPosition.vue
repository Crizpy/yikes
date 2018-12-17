<template>

    <tr class="resultRow" @click="openSite(searchPositionObject.links[0].location)">
      <td>837168</td>
      <td>{{ searchPositionObject.title }}<br><span class="fileName">[{{ searchPositionObject.fileName }}]</span></td>
      <td><img :src="getLanguageIcon()"></td>
      <td>{{ searchPositionObject.fileType }}</td>
      <td>{{ (searchPositionObject.fileSize / 1000 / 1000).toFixed(3) }} MB</td>
    </tr>

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
      },
      openSite(link) {
        window.open(link,"_blank")
      }
    }
  };
</script>

<style scoped>

  a {
    width: 100%;
    height: 100%;
  }

  .resultRow {
    height: 30px;
    cursor: pointer;
  }

  .fileName {
    font-size: 12px;
    color: lightgrey;
  }

  td {
    padding: 6px;
    font-size: 14px;
  }

</style>
