<template>
  <div class="joe">
    <br>
    <h1>Joe Pugliano</h1>
    <br>
    <hr>
    <table>
      <tr>
        <th>File Name</th>
        <th>View</th>
        <th>Download</th>
      </tr>
      <tr v-for="file in fileURLs">
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


export default {
  name: 'Joe',
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
      this.$modal.show(file.name);
    }
  },
  created() {
    var filenameArr = [];

    var self = this;

    firebase.database().ref('/Joe').once('value').then(function(snapshot){
      filenameArr.push(Object.values(snapshot.val()));
      filenameArr = filenameArr[0];

      var storageTest = firebase.storage();
      var storageRef = storageTest.ref();

      filenameArr.forEach(function(element, index){
        var joeRef = storageRef.child('Joe').child(element);

        joeRef.getMetadata().then(function(metadata) {
          joeRef.getDownloadURL().then(function(url) {
            self.fileURLs.push({
              name: metadata.name,
              path: url
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
