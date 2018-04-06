<template>
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">Tackle These Questions</h3>
    </div>
            <h1 v-if="!completed" class="quiztitle">{{ quiz }}</h1>
        <div class="panel-heading" v-if="!completed && !noquiz">
            <h3 class="panel-title">{{ questions[dataQindex].question }} </h3>
                <div class="form-group" v-for="(choice, index) in questions[dataQindex].choices">
                    <input type="radio" name="selectedChoice" v-on:click="answerIndex=index">
                    &nbsp;&nbsp;&nbsp;
                    {{ questions[dataQindex].choices[index] }}
                </div>
        </div>

        <div class="panel-body" v-if="!completed && !noquiz">
            
            <button>
                    What UP
                </button>
        </div>
</div>
</template>

<script>
// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'Quiz',
    // these values will be filled in by parent component, values must match tag's attribute names
    props: [ 'quiz', 'questions', 'choices', 'index', 'qindex', 'noquiz', 'start'],
    data() {
        return {
            selectedChoice: '',
            dataQindex: this.qindex,
            completed: false,
            result: 0,
            answerIndex: null
        }
    },
    methods: {
        // checkAnswer(yours, actual) {
        //     if (yours === actual) {
        //         this.result++;
        //     }
        //     this.selectedChoice = '';
        // }
    }
}
</script>

<!--
<style lang="scss" scoped>
/* load global variable definitions so colors can be managed in a single place if needed */
@import "./css/quiz.css";

.btn-primary {
    background-color: $submitColor;
}
</style>

// WEBPACK FOOTER //
// src/components/NewBookForm.vue