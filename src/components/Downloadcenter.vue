<template>
  <div>
    <div class="filterContainer">
      <select v-model="input.languageFilter">
        <option selected="selected" value="">Sprachen</option>
        <option value="de">Deutsch</option>
        <option value="en">Englisch</option>
        <option value="cs">Tschechisch</option>
        <option value="es">Spanisch</option>
        <option value="fr">Französisch</option>
        <option value="hu">Ungarisch</option>
        <option value="it">Italienisch</option>
        <option value="nl">Niederländisch</option>
        <option value="pl">Polnisch</option>
        <option value="ru">Russisch</option>
        <option value="sk">Slowenisch</option>
        <option value="sv">Schwedisch</option>
      </select>
      <span>{{input.languageFilter}}</span>
      <select v-model="input.categoryFilter">
        <option selected="selected" value="">Alle Dokumente</option>
        <option value="da">Datenblätter</option>
        <option value="sp">Schaltpläne</option>
        <option value="in">Informationen</option>
        <option value="an">Anleitungen</option>
        <option value="si">Sicherheitsdatenblätter</option>
        <option value="cr">Zertifikate</option>
        <option value="up">Software</option>
        <option value="el">Ersatzteillisten</option>
      </select>
      <span>{{input.categoryFilter}}</span>
    </div>
    <div class="searchContainer">
      <input type="text" class="searchBar" v-model="input.searchQuery" placeholder="Suchbegriff eingeben" />
      <button class="searchBarButton" v-on:click="sendData()">Suchen</button>
    </div>
    <div v-if="response.length == 0">
      <img class="icon" src="../assets/icons/an.svg">
      <img class="icon" src="../assets/icons/ce.svg">
      <img class="icon" src="../assets/icons/da.svg">
      <img class="icon" src="../assets/icons/el.svg">
      <img class="icon" src="../assets/icons/in.svg">
      <img class="icon" src="../assets/icons/si.svg">
      <img class="icon" src="../assets/icons/sp.svg">
      <img class="icon" src="../assets/icons/up.svg">
      <div class="infoText">
        <span>Im Conrad-Downloadcenter können Sie verschiedene interessante Informationen rund um die Conrad-Produktfamilie herunterladen.</span><br><br>
        <span>Es stehen bereits über 980.000 Datenblätter, Bedienungsanleitungen, Schaltpläne und Produktinformationen für Sie zur Verfügung.</span>
      </div>
    </div>
    <table v-if="response.length != 0">
      <tr>
        <th>Artnr</th>
        <th>Titel</th>
        <th>Dateiname</th>
        <th>Sprachen</th>
        <th>Typ</th>
        <th>Größe</th>
      </tr>
      <tbody v-for="position in response" >
        <SearchPosition
          :searchPositionObject="position"/>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from "axios";
  import SearchPosition from "./SearchPosition.vue";

  export default {
    name: 'Downloadcenter',
    components: {
      SearchPosition
    },
    data () {
      return {
        input: {
          searchQuery: "",
          languageFilter: "",
          categoryFilter: ""
        },
        response: []
      }
    },
    methods: {
      sendData() {

        let authorizationToken = "Bearer "+this.$getAccessToken().access_token;
        let search = encodeURI('&search={"title":"*'+this.input.searchQuery+'*","extension":"pdf","language":"'+this.input.languageFilter+'"}&search_hits=3&include_meta=true')
        axios({ method: "GET", "url": "https://api-rs.mycliplister.com/v2.2/apis/asset/list?limit=30&order_by=title&order_method=desc"+search,"data": {}, "headers": { "Authorization": authorizationToken } }).then(result => {
          console.log(result)
          this.response = [];
          result.data.forEach((va) => {
            this.response.push(va)
          })
          console.log("call doneso")
          console.log(result.data)
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

.icon {
  width: 5%;
  height: 5%;
}

.infoText {
  width: 20%;
  margin: auto;
  margin-top: 5%;
}

  .searchContainer {
    height: 40px;
    margin-top: 2.5%;
    margin-bottom: 2.5%;
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
