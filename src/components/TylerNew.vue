<template>
  <div class="tyler">
    <br>
    <h1>Tyler Dailey</h1>
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
    <!-- <button type="button" @click="upload()" class="btn btn-primary mybutton" style="padding: 5px 20px 5px 20px; margin-bottom: 50px;">Upload</button> -->
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
        },
        upload(){
            var message = "Upload New Entries for Tyler?";
            let options = {
                html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
                loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
                reverse: false, // switch the button positions (left to right, and vise versa)
                okText: 'Continue',
                cancelText: 'Close',
                animation: 'zoom', // Available: "zoom", "bounce", "fade"
                type: 'basic', // coming soon: 'soft', 'hard'
                verification: 'continue', // for hard confirm, user will be prompted to type this to enable the proceed button
                verificationHelp: 'Type "[+:verification]" below to confirm', // Verification help text. [+:verification] will be matched with 'options.verification' (i.e 'Type "continue" below to confirm')
                clicksCount: 3, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
                backdropClose: false, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask 
                customClass: '' // Custom class to be injected into the parent node for the current dialog instance
            };
              var self = this;
              self.$dialog.confirm(message, options, {
                  verificationHelp: 'Enter "[+:verification]" below and click on "[+:okText]"',
     type: 'hard'
              }).then(() => {
                  self.$router.push('/tylerupload')
              })
        }
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
