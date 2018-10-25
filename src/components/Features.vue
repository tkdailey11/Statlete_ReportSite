<template>
    <div id="Features">
        <br>
        <h1>Features</h1>
        <hr>
        <table style="display: inline-block; margin: 30px;">
            <tr>
                <td colspan="3"><h4>Alpha</h4></td>
            </tr>
            <tr style="border-bottom: thin black solid;">
                <td> </td>
                <td align="left" style="font-weight: bold; padding-left: 5px;" class="tableCell">Feature</td>
                <td style="font-weight: bold;" class="tableCell">Status</td>
            </tr>
            <tbody v-for="feature in alphaFeatures" :key="'alphaentry-' + getRandom(feature)">
                <tr>
                    <td align="right" class="bulletCell">-</td>
                    <td align="left" class="tableCell">{{feature.Text}}</td>
                    <td class="tableCell" v-if="feature.Status === 'Done'" style="color: green;">{{feature.Status}}</td>
                    <td class="tableCell" v-else style="color: red;">{{feature.Status}}</td>
                </tr>
                <tr v-for="subT in feature.Subtext" :key="'alphaSub-' + getRandom(subT)">
                    <td align="right" class="bulletCellBlank">-</td>
                    <td align="left" class="tableCellSub">- {{subT}}</td>
                </tr>
            </tbody>
            <tr>
                <td colspan="3"><h4>Beta</h4></td>
            </tr>
            <tr style="border-bottom: thin black solid;">
                <td> </td>
                <td align="left" style="font-weight: bold; padding-left: 5px;" class="tableCell">Feature</td>
                <td style="font-weight: bold;" class="tableCell">Status</td>
            </tr>
            <tbody v-for="feature in betaFeatures" :key="'betaentry-' + getRandom(feature)">
                <tr>
                    <td align="right" class="bulletCell">-</td>
                    <td align="left" class="tableCell">{{feature.Text}}</td>
                    <td class="tableCell" v-if="feature.Status === 'Done'" style="color: green;">{{feature.Status}}</td>
                    <td class="tableCell" v-else style="color: red;">{{feature.Status}}</td>
                </tr>
                <tr v-for="subT in feature.Subtext" :key="'betaSub-' + getRandom(subT)">
                    <td align="right" class="bulletCellBlank">-</td>
                    <td align="left" class="tableCellSub">- {{subT}}</td>
                </tr>
            </tbody>
            <tr>
                <td colspan="3"><h4>Production</h4></td>
            </tr>
            <tr style="border-bottom: thin black solid;">
                <td> </td>
                <td align="left" style="font-weight: bold; padding-left: 5px;" class="tableCell">Feature</td>
                <td style="font-weight: bold;" class="tableCell">Status</td>
            </tr>
            <tbody v-for="feature in prodFeatures" :key="'prodentry-' + getRandom(feature)">
                <tr>
                    <td align="right" class="bulletCell">-</td>
                    <td align="left" class="tableCell">{{feature.Text}}</td>
                    <td class="tableCell" v-if="feature.Status === 'Done'" style="color: green;">{{feature.Status}}</td>
                    <td class="tableCell" v-else style="color: red;">{{feature.Status}}</td>
                </tr>
                <tr v-for="subT in feature.Subtext" :key="'prodSub-' + getRandom(subT)">
                    <td align="right" class="bulletCellBlank">-</td>
                    <td align="left" class="tableCellSub">- {{subT}}</td>
                </tr>
            </tbody>
        </table>
        <br>
        <br>
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        data() {
            return {
                alphaFeatures: [],
                betaFeatures: [],
                prodFeatures: []
            }
        },
        methods: {
            getRandom(entry){
                //I am passing in entry here to ignore a warning above, it isn't used
                return Math.random().toString(36).substring(2,7);
            }
        },
        mounted() {
            var self = this;
            firebase.database().ref('/Features/Alpha').on('value', function(snapshot){
                if(snapshot.val() != null){
                    self.alphaFeatures = snapshot.val()
                }
                else{
                    self.alphaFeatures = []
                }
            })
            firebase.database().ref('/Features/Beta').on('value', function(snapshot){
                if(snapshot.val() != null){
                    self.betaFeatures = snapshot.val()
                }
                else{
                    self.betaFeatures = []
                }
            })
            firebase.database().ref('/Features/Prod').on('value', function(snapshot){
                if(snapshot.val() != null){
                    self.prodFeatures = snapshot.val()
                }
                else{
                    self.prodFeatures = []
                }
            })
        }
    }
</script>

<style scoped>
    table {
    border-collapse: collapse;
    }

    table tbody {
    border-bottom: 45px solid white;
    }

    .tableCell{
        /*border-right: 25px solid white;*/
        padding-right: 50px;
    }
    .tableCellSub{
        padding-left: 25px;
        padding-right: 50px;
    }
    .bulletCell{
        padding-right: 15px;
    }
    .bulletCellBlank{
        padding-right: 15px;
        color: white;
    }

</style>
