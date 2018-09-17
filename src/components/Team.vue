<template>
  <div class="team">
    <br>
    <h1>Statlete</h1>
    <br>
    <hr>
    <button type="button" @click="sortAsc()" class="btn btn-primary mybutton" style="padding: 5px 20px 5px 20px; margin-bottom: 50px;">Sort Ascending</button>
    <button type="button" @click="sortDesc()" class="btn btn-primary mybutton" style="padding: 5px 20px 5px 20px; margin-bottom: 50px;">Sort Descending</button>    
    <table id="results">
      <thead>
        <tr>
          <th>Date</th>
          <th>File Name</th>
          <th>View</th>
          <th>Download</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in fileURLs" :key="'row-'+file.name">
          <td>{{file.date}}</td>
          <td>{{file.name}}</td>
          <td><button type="button" @click="viewFile(file)" class="btn btn-primary mybutton" style="padding: 5px 20px 5px 20px;">View</button></td>
          <td><button type="button" @click="downloadFile(file)" class="btn btn-primary mybutton" style="padding: 5px 20px 5px 20px;">Download</button></td>
        </tr>
      </tbody>
    </table>
    <hr>

    <modal v-for="file in fileURLs" :name="file.name"
                                     :draggable="true"
                                     :height="'auto'"
                                     :scrollable="true"
                                     :adaptive="true"
                                     style="padding: 50px 0px 50px 0px;"
                                     :key="'file-' + file.name">
      <PDF :filepath="file.path"></PDF>
    </modal>
  </div>
</template>

<script>
import PDF from '@/components/PDF'
import firebase from 'firebase'
import axios from 'axios'

export default {
  name: 'Team',
  data () {
    return {
      fileURLs: []
    }
  },
  components: {
    PDF
  },
  methods: {
    viewFile(file) {
      this.$modal.show(file.name);
    },
    downloadFile(file) {
      var storageRef = firebase.storage().ref();
      storageRef.child('/Team/' + file.name).getDownloadURL().then(function(url) {
        axios({
          url: url,
          method: 'GET',
          responseType: 'blob'
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Statlete-' + file.name);
          document.body.appendChild(link);
          link.click();
        })
      })
    },
    parseDateString(date) {
      var year = date.substring(0, 4);
      var month = date.substring(5, 7);
      var day = parseInt(date.substring(8, date.indexOf('T'))) - 1
      if(day < 1){
        day = 1
      }

      return month + '/' + day + '/' + year;
    },
    convertDate(d) {
      var p = d.split("/");
      if(p[1].length == 1){
        p[1] = '0' + p[1];
      }
      return (p[2]+p[0]+p[1]);
    },
    sortByDate() {
      var tbody = document.querySelector("#results tbody");
      // get trs as array for ease of use
      var rows = [].slice.call(tbody.querySelectorAll("tr"));
      var self = this;
      rows.sort(function(a,b) {
        return self.convertDate(a.cells[0].innerHTML) - self.convertDate(b.cells[0].innerHTML);
      });
      
      rows.forEach(function(v) {
        tbody.appendChild(v); // note that .appendChild() *moves* elements
      });
    },
    sortByName() {
      var tbody = document.querySelector("#results tbody");
      // get trs as array for ease of use
      var rows = [].slice.call(tbody.querySelectorAll("tr"));
      var self = this;
      rows.sort(function(a,b) {
        return a.cells[1].innerHTML > b.cells[1].innerHTML ? 1 : -1;
      });
      
      rows.forEach(function(v) {
        tbody.appendChild(v); // note that .appendChild() *moves* elements
      });
    },
    sortAsc() {
            var tbody = document.querySelector("#results tbody");
      // get trs as array for ease of use
      var rows = [].slice.call(tbody.querySelectorAll("tr"));
      var self = this;
      rows.sort(function(a,b) {
        return a.cells[1].innerHTML > b.cells[1].innerHTML ? 1 : -1;
      });
      
      rows.forEach(function(v) {
        tbody.appendChild(v); // note that .appendChild() *moves* elements
      });
    },
    sortDesc() {
            var tbody = document.querySelector("#results tbody");
      // get trs as array for ease of use
      var rows = [].slice.call(tbody.querySelectorAll("tr"));
      var self = this;
      rows.sort(function(a,b) {
        return a.cells[1].innerHTML < b.cells[1].innerHTML ? 1 : -1;
      });
      
      rows.forEach(function(v) {
        tbody.appendChild(v); // note that .appendChild() *moves* elements
      });
    }
  },
  created() {
    var filenameArr = [];

    var self = this;

    firebase.database().ref('/Team').once('value').then(function(snapshot){
      filenameArr.push(Object.values(snapshot.val()));
      filenameArr = filenameArr[0];

      var storageTest = firebase.storage();
      var storageRef = storageTest.ref();

      filenameArr.forEach(function(element, index){
        var tylerRef = storageRef.child('Team').child(element);

        tylerRef.getMetadata().then(function(metadata) {
          tylerRef.getDownloadURL().then(function(url) {
            var date = self.parseDateString(metadata.updated);
            self.fileURLs.push({
              name: metadata.name,
              path: url,
              date: date
            })
          })
        })
      })
    })
  },
  mounted() {
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
td
{
    padding:5px 15px 10px 15px;
}

.mybutton {
  border: none;
  border-radius: 12px;
}

</style>
