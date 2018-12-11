<template>
  <div>
    <div class="searchContainer">
      <input type="text" class="searchBar" v-model="input.searchQuery" placeholder="Suchbegriff eingeben" />
      <button class="searchBarButton" v-on:click="sendData()">Suchen</button>
    </div>
    <br />
    <br />
    <div v-html="response">
      {{ response }}
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import SearchPosition from "./SearchPosition.vue";

  export default {
    name: 'Downloadcenter',
    data () {
      return {
        input: {
          searchQuery: ""
        },
        response: ""
      }
    },
    methods: {
      sendData() {
        console.log("im boooooty")
        let authorizationToken = "Bearer "+this.$getAccessToken().access_token;
        let search = encodeURI('&search={"title":"*'+this.input.searchQuery+'*"}')
        axios({ method: "GET", "url": "https://api-rs.mycliplister.com/v2.2/apis/asset/list?limit=10&order_by=title&order_method=desc"+search,"data": {}, "headers": { "Authorization": authorizationToken } }).then(result => {
          let output = "";
          result.data.forEach(function (va) {
            output += "Titel: "+va.title +" - <br>"
          })
          console.log("call doneso")
          this.response = output;
        }, error => {
          console.error(error);
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

  .searchContainer {
    height: 40px;
    margin-top: 2.5%;
  }

  .searchBar {
    height: 100%;
    width: 30%;
    padding: 6px 10px 6px 27px;
    color: #616161;
    background: transparent;
    font-size: 13px;
    line-height: 17px;
    border: 3px solid #0098dd;
    position: relative;
    margin-right: -.3%;
  }

  .searchBarButton {
    background: #0098dd;
    color: white;
    height: 145%;
    width: 5%;
    border: none;
  }
</style>
