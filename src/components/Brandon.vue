<template>
  <div class="brandon">
    <br>
    <h1>Brandon Sehestedt</h1>
    <br>
    <hr>
    <table>
      <tr>
        <th>Date</th>
        <th>File Name</th>
        <th>View</th>
        <th>Download</th>
      </tr>
      <tr v-for="file in fileURLs">
        <td>{{file.date}}</td>
        <td>{{file.name}}</td>
        <td><button type="button" @click="viewFile(file)" class="btn btn-primary mybutton" style="padding: 5px 20px 5px 20px;">View</button></td>
        <td><button type="button" @click="downloadFile(file)" class="btn btn-primary mybutton" style="padding: 5px 20px 5px 20px;">Download</button></td>
      </tr>
    </table>

    <hr>

    <modal v-for="file in fileURLs" :name="file.name"
                                     :draggable="true"
                                     :height="'auto'"
                                     :scrollable="true"
                                     :adaptive="true"
                                     style="padding: 50px 0px 50px 0px;">
      <PDF :filepath="file.path"></PDF>
    </modal>
  </div>
</template>

<script>
import PDF from '@/components/PDF'
import firebase from 'firebase'
import axios from 'axios'

export default {
  name: 'Brandon',
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
      storageRef.child('/Brandon/' + file.name).getDownloadURL().then(function(url) {
        axios({
          url: url,
          method: 'GET',
          responseType: 'blob'
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'BrandonSehestedt-' + file.name);
          document.body.appendChild(link);
          link.click();
        })
      })
    },
    parseDateString(date) {
      var year = date.substring(0, 4);
      var month = date.substring(5, 7);
      var day = date.substring(8, date.indexOf('T'))

      return month + '/' + day + '/' + year;
    }
  },
  created() {
    var filenameArr = [];

    var self = this;

    firebase.database().ref('/Brandon').once('value').then(function(snapshot){
      filenameArr.push(Object.values(snapshot.val()));
      filenameArr = filenameArr[0];

      var storageTest = firebase.storage();
      var storageRef = storageTest.ref();

      filenameArr.forEach(function(element, index){
        var brandonRef = storageRef.child('Brandon').child(element);

        brandonRef.getMetadata().then(function(metadata) {
          brandonRef.getDownloadURL().then(function(url) {
            var date = self.parseDateString(metadata.updated);
            self.fileURLs.push({
              name: metadata.name,
              path: url,
              date: date
            })
          })
        })
      })
    });
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
