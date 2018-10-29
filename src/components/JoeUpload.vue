<template>
  <div class="Joeupload">
    <br>
    <h1>Joe Pugliano</h1>
    <br>
    <hr>
    <label>Week:</label>
    <select id="weekSelector" @change="selectionChanged()" style="border: 1px solid black;">
        <option v-for="i in Object.values(weekDates)" value="i" :key="'value-' + i">{{i}}</option>
    </select>
    <br>
    <table align="center" id="results">
        <tbody>
            <tr v-for="entry in entriesList.length" :key="'tableRow-' + entry">
                <td>Entry:</td>
                <td>
                    <input v-if="entriesList[entry-1] != ''" class="myInput" :id="'entryid-' + entry" :key="'entry-' + entry" :placeholder="entriesList[entry-1]" :value="entriesList[entry-1]" />
                    <input v-else class="myInput" :id="'entryid-' + entry" :key="'entry-' + entry" placeholder="NewEntry" />
                </td>        
            </tr>
            <tr :key="'tableRow-' + (entriesList.length + 1)">
                <td>Entry:</td>
                <td><input class="myInput" :id="'entryid-' + (entriesList.length + 1)" :key="'entry-' + (entriesList.length + 1)" placeholder="NewEntry" /></td>
            </tr>
            <tr>
                <td></td>
                <td><button @click="addRow()">Add a Row</button></td>
            </tr>
        </tbody>
    </table>
    <br>
    <br>
    <button @click="submit()">Submit Entries</button>
  </div>
</template>

<script>
import PDF from '@/components/PDF'
import firebase from 'firebase'
import axios from 'axios'

export default {
  name: 'JoeUpload',
  data () {
    return {
      fileURLs: [],
      numRows: 1,
      entriesList: [],
      weekDates: {}
    }
  },
  components: {
    PDF
  },
  methods: {
      addRow(){
        this.entriesList.push("")
      },
      submit(){
        var entries = [];
        
        for(var j = 0; j <= this.entriesList.length; j++){
            var entryid = "#entryid-" + (j+1);
            var val = jQuery(entryid).val();
            if(val.length != 0){
                entries.push(val)
            }
        }
        var week = jQuery('#weekSelector :selected').text();
        week = "Week " + week
        var data = {
            [week] : entries
        }
        if(confirm("Do you want to sumit the following? " + JSON.stringify(data))){
            firebase.database().ref('/Joe/entries').update({
                [week] : entries
            }).then(function(val){
                alert('SUBMISSION SUCCESS')
            })
        }
      },
      selectionChanged() {
            var week = jQuery('#weekSelector :selected').text();
            week = this.getWeekKey(week)
            var self = this;
            firebase.database().ref('/Joe/entries').child(week).once('value', function(snapshot){
                if(snapshot.val() == null){
                    self.entriesList = []
                }
                else{
                    self.entriesList = snapshot.val();
                }
            })
      },
      getWeekKey(week){
        var obj = this.weekDates
        return Object.keys(obj).find(key => obj[key] === week);
      }
  },
  created() {
    var self = this;
    firebase.database().ref('/Joe/entries/Week 01').once('value', function(snapshot){
        if(snapshot.val() == null){
            self.entriesList = []
        }
        else{
            self.entriesList = snapshot.val();
        }
    })
    firebase.database().ref('/WeekDates').once('value', function(snapshot) {
        self.weekDates = snapshot.val()
        delete self.weekDates['Week 00']
    })
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

.myInput {
    background-color: white;
    border: none;
    border-bottom: 2px black solid;
    min-width: 50vw
}

</style>
