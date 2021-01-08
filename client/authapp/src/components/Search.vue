<template>
<body>
    <div class="bigSearch">
        <form class=header @submit.prevent="onSubmit">
            <span class = "icon" @click = "$emit('search-book', searchValue)">
            <i class="fa fa-search"></i>
            </span>
            <input id="search" @keyup.enter = "$emit('search-book', searchValue)"
                type="text"
                v-model="searchValue"
                placeholder="Поиск по сайту"
                autocomplete="off">
        </form>
        <select class="select" v-model="sortKey" @click.prevent="onSort" @click = "$emit('sort-key', sortKey)">
            <option>Дата</option>
            <option>Автор</option>
            <option>Название</option>
        </select>
    </div>
    <div class="navigation">
        <router-link tag="t" class="link" :to="{name: 'favorite'}">Favorite</router-link>
        <a class="nav-link" @click="logUserOut"> Logout</a>
    </div>
</body>
</template>

<script>
export default {
    data() {
        return {
            searchValue: '',
            sortKey: ''
        }
    },
    methods:{
        onSubmit() {
            if (this.searchValue.trim()){
                const newBook = {
                    name: this.searchValue
                }
                this.$emit('search-book', newBook)
            }
        },
        onSort() {
            if (this.sortKey.trim()){
                const newSortKey = {
                    name: this.sortKey
                }
                this.$emit('sort-key', newSortKey)
            }
        },
        logUserOut() {
            localStorage.removeItem("jwt");
            this.$router.push("/");
    }
    }
}
</script>

<style scoped>
body{
    height: 130px;
    background: #717b87;
    display: flex;
    justify-content: center;

}
.navigation{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 90vw;
    color: rgb(236, 236, 236);
    cursor: pointer;
}
.bigSearch{
    width: 300px;
    height: 150px;
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.header{
    white-space: nowrap;
    position: relative;
}
.header input#search{
    transition-property: background;
    transition-duration: 0.5s;
    transition-timing-function: linear;
    width: 300px;
    height: 50px;
    background: rgb(236, 236, 236);
    border: none;
    font-size: 10pt;
    color: #63717f;
    padding-left: 45px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
.header input#search::-webkit-input-placeholder {
    color: #65737e;
}
.header input#search:-moz-placeholder {
    color: #65737e;
}
.header input#search::-moz-placeholder {
    color: #65737e;
}
.header input#search:-ms-input-placeholder {
    color: #65737e;
}
header input#search::-ms-clear{
    width: 0;
    height: 0;
}
.icon{
    position: absolute;
    margin-left: 17px;
    margin-top: 17px;
    z-index: 1;
    color: #4f5b66;
}
.header input#search:hover, .header input#search:focus, .header input#search:active{
    outline:none;
    background:  rgb(206, 206, 206);
}
.select{
    width: 100px;
    outline: none;
    margin-top: 5px;
    font-size: 16px;
    line-height: 1;
    border: 0;
    border-radius: 5px;
    height: 20px;
    background: url("../assets/sort-solid.svg") no-repeat right rgb(236, 236, 236);
    appearance: none;
    color: #63717f;
    background-size: 10px;
    background-position-x: 86px;
    background-position-y: 2px;
    text-align-last: center;
    padding-right: 8px;
    font-size: 80%;
}

</style>