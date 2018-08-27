<template>
  <div class="pdf">
    <pdf
          v-for="i in numPages"
          :key="i"
          :src="src"
          :page="i">
    </pdf>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  name: 'PDF',
  props: ['filepath'],
  data () {
    return {
      src: undefined,
      numPages: undefined
    }
  },
  mounted() {
    this.src = pdf.createLoadingTask(this.filepath);
    this.src.then(pdf => {
      this.numPages = pdf.numPages;
    })
  },
  components: {
    pdf
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
</style>
