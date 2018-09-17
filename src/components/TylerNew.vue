<template>
  <div class="tyler">
    <br>
    <h1>Tyler Dailey</h1>
    <br>
    <hr>
    <table style="margin-left: 5vw;">
        <tbody v-for="key in Object.keys(entries)">
            <tr>
                <td><h4>{{key}}</h4></td>
            </tr>
            <tr v-for="entry in entries[key]">
                <td align="right">-</td>
                <td align="left">{{entry}}</td>
            </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PDF from '@/components/PDF'
import firebase from 'firebase'
import axios from 'axios'

export default {
    name: 'Tyler',
    data () {
        return {
        entries: []
        }
    },
    components: {
        PDF
    },
    methods: {

    },
    created() {
        var self = this;
        firebase.database().ref('/Tyler/entries').on('value', function(snapshot){
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
