<template>
  <body>
    <router-link tag="a" class="link" :to="{name: 'main'}">Home</router-link>
    <book-results :books="favorite" @remove="deleteFavorite"></book-results>
  </body>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import BookResults from '@/components/BookResults'
export default {
  props:['fbook'],
  components: {
    'book-results': BookResults,
    },
  data() {
    return {
      book: {},
      user: {},
      favorite: [],
    };
  },
  methods: {
    async deleteFavorite(book){
      try {
            let token = localStorage.getItem("jwt");
            
            let decoded = VueJwtDecode.decode(token);
            const login = {
                email: decoded.email,
                favorite: book
            }
            let response = await this.$http.post("/user/notme", login);
            this.favorite = response.data.list.favorite;
      } catch (err) {
        console.log(err.response);
      }
      
    },
    async getFavorite() {
      try{
        let token = localStorage.getItem("jwt");
        let decoded = VueJwtDecode.decode(token);
        const login = {
          email: decoded.email
        }
        let response = await this.$http.post("/user/favorite", login);
        this.favorite = response.data.list.favorite;
        }
      catch{}
    }
  },
  created() {
    this.getFavorite();
  }
};
</script>

<style scoped></style>
