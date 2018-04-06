<template>

<div id="app" class="container">
    <div class="page-header">
        <h1>Challenge Rikki's Quizzes</h1>
    </div>
    <!-- Use component's template instead of writing it directly, pass parameters as attributes -->
<!--     <new-book-form
        :inputFields="newBookInput"
        :onSubmit="addBook">
    </new-book-form> -->

    <div class="page-header">
        <div class="row">
            <button class="duke_questions" v-on:click="index=0; Show=false">
                Duke Questions
            </button>
<!--             <NewBookForm v-if="DukeQuiz" :quiz=""> </NewBookForm> -->
            <button class="math_questions" v-on:click="index=1; Show=false">
                Math Questions
            </button>
            <button class="math_questions" v-on:click="index=2; Show=false">
                Rikki's Select Trivia
            </button>
        </div>
    </div>
    <div class="page-header" v-if="!Show" v-bind:style="{ color: '#3B3EF7', fontSize: '20px', borderColor: '#5BC0EB'}">

        <NewBookForm   :quiz="AllQs[index].NewBookForm"
                :questions="AllQs[index].questions"
                :choices="AllQs[index].questions[qindex].choices"
                :index="index"
                :qindex="qindex"
                :Show="Show">
        </NewBookForm>
<!--                 <NewBookForm
                :questions="[index].questions">
        </NewBookForm> -->
        <p> YES! 
        </p>
    </div>
</div>
</template>
<script>

import NewBookForm from './components/NewBookForm.vue'
import questions from './data/duke_questions.json'
// import Style from './css/NewBookForm.css';


// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'app',
    // NOTE in a component, data must be a function that returns a NEW version of the values
    data () {
        return {
            AllQs: questions,
            index: 0,
            qindex: 0,
            Show: true,
        }
    },
    // components (HTML, CSS, and JS) used by this app
    components: {
        // imported components to use in HTML template
        NewBookForm
    },
    // functions you want to be called from HTML code
    methods: {
        // var css = document.createElement("style");
        // css.type = "text/css";
        // css.innerHTML = "strong { color: red }";
        // document.body.appendChild(css);
    }
}
</script>

<style>
/* load global variable definitions so colors can be managed in a single place if needed */


#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: $formColor;
    margin-top: 20px;
    color: #FF5733;
}

.table {
    color: $tableColor;
}
</style>
