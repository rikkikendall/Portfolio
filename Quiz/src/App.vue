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
            <button class="duke_questions" v-on:click="index=0; noquiz=false">
                Duke Questions
            </button>
            <button class="math_questions" v-on:click="index=1; noquiz=false">
                Math Questions
            </button>
        </div>
        <br><br>
    </div>
    <div class="page-header" v-if="!noquiz">
        <Quiz   :quiz="quizQ[index].quiz"
                :questions="quizQ[index].questions"
                :choices="quizQ[index].questions[qindex].choices"
                :index="index"
                :qindex="qindex"
                :noquiz="noquiz">
        </Quiz>
<!--                 <Quiz
                :questions="[index].questions">
        </Quiz> -->
        <p> YES! 
        </p>
    </div>
</div>
</template>
<script>

import Quiz from './components/NewBookForm.vue'
import questions from './data/duke_questions.json'
// import Style from './css/quiz.css';


// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'app',
    // NOTE in a component, data must be a function that returns a NEW version of the values
    data () {
        return {
            quizQ: questions,
            index: 0,
            qindex: 0,
            noquiz: true,
            start: false,
        }
    },
    // components (HTML, CSS, and JS) used by this app
    components: {
        // imported components to use in HTML template
        Quiz
    },
    // functions you want to be called from HTML code
    methods: {
    }
}
</script>
<!-- 
<style lang="scss" scoped>
/* load global variable definitions so colors can be managed in a single place if needed */
@import "./css/quiz.css";


#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: $formColor;
    margin-top: 20px;
}

.table {
    color: $tableColor;
}
</style>
