<template>
  <div class="brandon">
    <br>
    <h1>Brandon Sehestedt</h1>
    <br>
    <hr>
    <table style="margin-left: 5vw;">
        <tbody v-for="key in Object.keys(entries)" :key="'tb-' + getRandom(key)">
            <tr>
                <td><h4>{{key}}</h4></td>
            </tr>
            <tr v-for="entry in entries[key]" :key="'entry-' + getRandom(entry)">
                <td align="right">-</td>
                <td align="left">{{entry}}</td>
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
    name: 'Brandon',
    data () {
        return {
        entries: []
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
        firebase.database().ref('/Brandon/entries').on('value', function(snapshot){
            if(snapshot.val() != null){
                self.entries = snapshot.val()
            }
            else{
                self.entries = []
            }
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

</style>
