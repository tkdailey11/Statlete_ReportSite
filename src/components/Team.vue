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
          <td v-if="file.name==='Timeline.pdf'" style="color: white;">Timeline</td>
          <td v-else>{{file.date}}</td>
          <td>{{file.name}}</td>
          <td><button v-if="file.name != 'FALL BREAK'" type="button" @click="viewFile(file)" class="btn btn-primary mybutton" style="padding: 5px 20px 5px 20px;">View</button></td>
          <td><button v-if="file.name != 'FALL BREAK'" type="button" @click="downloadFile(file)" class="btn btn-primary mybutton" style="padding: 5px 20px 5px 20px;">Download</button></td>
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
      fileURLs: [],
      weekDates: {}
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
        if(a.cells[0].innerHTML && b.cells[0].innerHTML){
          return self.getWeekKey(a.cells[0].innerHTML) > self.getWeekKey(b.cells[0].innerHTML) ? 1 : -1;
        }
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
        if(a.cells[0].innerHTML && b.cells[0].innerHTML){
          return self.getWeekKey(a.cells[0].innerHTML) > self.getWeekKey(b.cells[0].innerHTML) ? 1 : -1;
        }
      });
      rows.reverse();
      rows.forEach(function(v) {
        tbody.appendChild(v); // note that .appendChild() *moves* elements
      });
    },
    getWeekFromName(name){
      if(name === 'FALL BREAK'){
        return 'Week 08'
      }
      if(name === 'Timeline.pdf'){
        return 'Week 00'
      }
      var result = name.split('-')[1].split('.')[0]
      var resultArr = result.split(' ')
      var intVal = parseInt(resultArr[1])
      if(intVal < 10){
        resultArr[1] = '0' + intVal
      }
      return 'Week ' + resultArr[1]
    },
    getWeekKey(week){
      var obj = this.weekDates
      return Object.keys(obj).find(key => obj[key] === week);
    }
  },
  created() {
    var filenameArr = [];

    var self = this;
    firebase.database().ref('/WeekDates').once('value', function(snapshot) {
      self.weekDates = snapshot.val()

      firebase.database().ref('/Team').once('value').then(function(snap){
      filenameArr.push(Object.values(snap.val()));
      filenameArr = filenameArr[0];

      var storageTest = firebase.storage();
      var storageRef = storageTest.ref();

      filenameArr.forEach(function(element, index){
        if(element != "FALL BREAK"){
          var tylerRef = storageRef.child('Team').child(element);

          tylerRef.getMetadata().then(function(metadata) {
            tylerRef.getDownloadURL().then(function(url) {
              var date = self.weekDates['Week 00']
              if(metadata.name === 'Timeline.pdf'){
                self.fileURLs.push({
                  name: metadata.name,
                  path: url,
                  date: date
                })
              }
              else{
                var dateKey = self.getWeekFromName(metadata.name)
                var date = self.weekDates[dateKey]
                self.fileURLs.push({
                  name: metadata.name,
                  path: url,
                  date: date
                })
              }
            })
          })
        }
        else{
          self.fileURLs.push({
            name: 'FALL BREAK',
            path: 'tmp',
            date: self.weekDates['Week 08']
          })
        }
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
  font-weight: bold;
  font-size: 250%;
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

#results{
  margin-left: 10px;
}

</style>
