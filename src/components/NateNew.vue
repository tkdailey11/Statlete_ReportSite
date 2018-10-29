<template>
  <div class="nate">
    <br>
    <h1>Nate Gygi</h1>
    <br>
    <hr>
    <table style="margin-left: 5vw; margin-right: 5vw;">
        <tbody v-for="key in Object.keys(entries)" :key="'tb-' + getRandom(key)">
            <tr>
                <td colspan="2" align="left"><h4>{{weekDates[key]}}</h4></td>
            </tr>
            <tr v-for="entry in entries[key]" :key="'entry-' + getRandom(entry)">
                <td align="right">-</td>
                <td align="left">{{entry}}</td>
            </tr>
            <tr style="color: white;">
                <td>hidden</td>
            </tr>
      </tbody>
    </table>
    <br>
    <br>
  </div>
</template>

<script>
import PDF from '@/components/PDF'
import firebase from 'firebase'
import axios from 'axios'

export default {
    name: 'Nate',
    data () {
        return {
            entries: [],
            weekDates: {}
        }
    },
    components: {
        PDF
    },
    methods: {
        getRandom(entry){
            //I am passing in entry here to ignore a warning above, it isn't used
            return Math.random().toString(36).substring(2,7);
        }
    },
    created() {
        var self = this;
        firebase.database().ref('/Nate/entries').on('value', function(snapshot){
            if(snapshot.val() != null){
                self.entries = snapshot.val()
            }
            else{
                self.entries = []
            }
        })

         firebase.database().ref('/WeekDates').once('value', function(snapshot) {
            self.weekDates = snapshot.val()
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: bold;
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
