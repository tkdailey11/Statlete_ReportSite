<template>
  <div class="upload">
    <br>
    <h1>Upload</h1>
    <br>
    <hr>
    <label class="custom-file-upload btn btn-primary mybutton">
      <input type="file" id="selectedFiles"/>
      Select File
    </label>
    <br>
    <v-select v-model="selected"
              :options="['Team']"
              style="margin: 50px 300px 50px 300px;"></v-select>
    <button type="button" @click="uploadFile" class="btn btn-primary mybutton" style="padding: 5px 20px 5px 20px;">Upload</button>

  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'

export default {
  name: 'Upload',
  data () {
    return {
      fileURLs: [],
      selected: 'Team'
    }
  },
  methods: {
    parseDateString(date) {
      var year = date.substring(0, 4);
      var month = date.substring(5, 7);
      var day = date.substring(8, date.indexOf('T'))

      return month + '/' + day + '/' + year;
    },
    uploadFile() {
      if(this.selected != 'none'){
        var storage = firebase.storage();

        var file = document.getElementById("selectedFiles").files[0];

        var storageRef = firebase.storage().ref();

        //dynamically set reference to the file name
        var thisRef = storageRef.child('/' + this.selected + '/' + file.name);
        if(thisRef.getDownloadURL){
          var message = "That file already exists, do you want to replace it?"
          var options = {
            okText: 'YES',
            cancelText: 'NO',
            animation: 'bounce'
          }
          var self = this;
          self.$dialog.confirm(message, options).then(function(){
            thisRef.put(file).then(function(){
              alert('Upload Success!')
            })
          })

        }
        else{
          var self = this;
      
          //put request upload file to firebase storage
          thisRef.put(file).then(function(snapshot) {
            var uuid = new Date();
            var uuidStr = 'file-' + uuid.getTime();
            firebase.database().ref(self.selected).update({
              [uuidStr] : file.name
            }).then(function(){
              alert('Upload Success!')
            })
          });
        }
      }
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
td
{
    padding:5px 15px 10px 15px;
}

.mybutton {
  border: none;
  border-radius: 12px;
}

input[type="file"] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 12px;
}

</style>
