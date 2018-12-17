<template>
  <div>

    <select class="languageSetter" @change="setLang()" v-model="selectLanguage">
      <option value="de">Deutsch</option>
      <option value="en">English</option>
      <option value="nl">Netherlands</option>
      <option value="fr">France</option>
      <option value="se">Schweden</option>
      <option value="svk">Slowakei</option>
      <option value="svn">Slowenien</option>
      <option value="cs">Czechien</option>
      <option value="es">Spanien</option>
      <option value="it">Italien</option>
      <option value="pl">Polen</option>
      <option value="ru">Russland</option>
    </select>

    <img class="logo" @click="response = []; wrongQuery = false;" src="../assets/conrad_logo_regular.svg">

    <div class="searchContainer">

      <select  class="languageFilter" v-model="input.languageFilter">
        <option value="">Sprache</option>
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

      <input type="text" class="searchBar" v-model="input.searchQuery" @keyup.enter="sendData()" placeholder="Suchbegriff eingeben" />
      <button class="searchBarButton" v-on:click="sendData()">Suchen</button>

    </div>

    <div v-if="wrongQuery">
      Sorry, your search returned no results
    </div>

    <div v-if="response.length == 0 && !wrongQuery">
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
        <span>Es stehen bereits über 980.000 Dokumente für Sie zur Verfügung.</span>
        <span>
          <br><br> Darunter finden Sie : <br><br>
          Datenblätter <br>
          Schaltpläne <br>
          Informationen <br>
          Anleitungen <br>
          Sicherheitsdatenblätter <br>
          Zertifikate <br>
          Ersatzteillisten <br>
          Software <br>

        </span>
      </div>
    </div>

    <div class="resultBox" v-if="response.length != 0">
      <table id="resultTable" class="resultTable">
        <tr>
          <th class="firstRow">Artnr</th>
          <th>Dateibezeichnung</th>
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

    <div class="footer">
      <a href="https://www.conrad.de" target="_blank">Zum Conrad Webshop</a>
    </div>

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
        },

        response: [],
        wrongQuery: false,
        selectLanguage: "de"

      }

    },
    methods: {
      sendData() {

        if(this.input.searchQuery == "") {
          this.response = [];
          this.wrongQuery = true;
          return;
        }

        let authorizationToken = "Bearer "+this.$getAccessToken().access_token;

        let apiHost = "https://api-rs.mycliplister.com";
        let api = "/v2.2/apis/asset/list"
        let apiParas = "?limit=30&order_by=title&order_method=desc&include_meta=true"
        let search = '&search={"title":"*'+this.input.searchQuery+'*","object_type":"document"';

        let languageFilter = "}&search_hits=2";
        if (this.input.languageFilter != "") {
          languageFilter = ',"language": "'+this.input.languageFilter+'"}&search_hits=3';
        }

        let apiQuery = apiHost + api + apiParas + search + languageFilter;

        axios({ method: "GET", "url": encodeURI(apiQuery),"data": {}, "headers": { "Authorization": authorizationToken } }).then(result => {

          this.response = [];

          result.data.forEach((va) => {
            this.response.push(va)
          })

          console.log(this.response)
          this.wrongQuery = false;

        }, error => {

          this.response = [];
          this.wrongQuery = true;

        });
      },
      setLang: function () {

        let lang = this.selectLanguage
        localStorage.setItem("i18n",lang)
        this.$i18n.locale = lang

      }
    }
  }
</script>

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

.resultTable {
  border-collapse: collapse;
  width: 100%;

}

.footer {
  width: 100%;
  background-color: #0098dd;
  height: 30px;
  position: absolute;
  bottom: 0;
  color: white;
  text-align: center;
  padding-top: 10px;
  font-weight: bold;
}

.footer a {
  text-decoration: none;
  color: white;
}

.firstRow {
  width: 430px;
}

.infoText {
  width: 30%;
  margin: auto;
  margin-top: 3%;
  font-size: 18px;
  color: darkgray;
}

tbody:nth-child(even) {
  background-color: #f4f4f4;
}

.languageSetter {
  position: absolute;
  left: 0;
  top: 0;
  border: none;
  outline: none;
  width: 6%;
  height: 3%;
}

  .searchContainer {
    height: 40px;
    margin-bottom: 2.5%;
  }

  .resultBox {
    overflow-y: scroll;
    height: 592px;
  }

  /*Just filter out this part here if you dont want sticky table headers*/
  .resultBox th {
    position: sticky;
    top: 0;
    background: white;
    padding-bottom: 10px;
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
    outline: none;
  }

  .searchBarButton {
    background: #0098dd;
    color: white;
    height: 145%;
    width: 8%;
    border: none;
    outline: none;
  }


  .languageFilter {
    outline: none;
    height: 145%;
    width: 8%;
    padding: 6px 10px 6px 27px;
    color: white;
    background: #0098dd;
    font-size: 13px;
    line-height: 17px;
    border: 3px solid #0098dd;
    position: relative;
    margin-right: -.3%;
  }

  .logo {
    width: 35%;
    height: 20%;
    cursor: pointer;
    margin-top: .9%;
    margin-bottom: 1.5%;
  }
</style>
