<template>
    <body>
    <div id="mainPage">
    <Search
        @search-book="searchBook"
        @sort-key="sortBooks"
    />
    <book-results :books="books"></book-results>
    </div>
    </body>
</template>

<script>
import Search from '@/components/Search'
import BookResults from '@/components/BookResults'
import axios from "axios";
export default {
    components: {
    Search,
    'book-results': BookResults,
    },
    data: function() {
    return {
        books: [],
        sKey: ''
    }
},
    mounted(){
        if (sessionStorage.getItem("books")!=null){
            this.books = JSON.parse(sessionStorage.getItem("books"))
        }
    },
    beforeDestroy() {
            sessionStorage.setItem("books", JSON.stringify(this.books))
    },
    methods: {
        searchBook(inputBook){
            let queryURL = 'https://www.googleapis.com/books/v1/volumes?q=' + inputBook
            axios.get(queryURL).then((data) => {
            this.books = data.data.items;
        }).then(() => {
            this.results = true
        })
        .catch((error) => {
            console.log(error);
        });
        },
        sortBooks(inputKey){
            if (inputKey.name === 'Название'){
                this.books.sort((a,b) => {
                    if (a.volumeInfo.title > b.volumeInfo.title)
                        return 1
                    if (a.volumeInfo.title < b.volumeInfo.title)
                        return -1
                    return 0
                })
            }
            if (inputKey.name === 'Автор'){
                this.books.sort((a,b) => {
                    if (a.volumeInfo.authors > b.volumeInfo.authors)
                        return 1
                    if (a.volumeInfo.authors < b.volumeInfo.authors)
                        return -1
                    return 0
                })
            }
            if (inputKey.name === 'Дата'){
                this.books.sort((a,b) => {
                    if (a.volumeInfo.publishedDate > b.volumeInfo.publishedDate)
                        return 1
                    if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate)
                        return -1
                    return 0
                })
            }
        }
    
    }
}
</script>

<style>
    #mainPage{
        background: rgb(236, 236, 236);
    }
    body {
    margin: 0;
    }
</style>
