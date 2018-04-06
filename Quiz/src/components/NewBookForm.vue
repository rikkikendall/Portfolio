<template>
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">Tackle These Questions</h3>
    </div>
            <h1 v-if="!finished" class="quiztitle">{{ quiz }}</h1>
        <div class="panel-heading" v-if="!finished && !noquiz">
            <h3 class="panel-title">{{ questions[whichQ].question }} </h3>
                <div class="form-group" v-for="(choice, index) in questions[whichQ].choices" @click="checkAnswer(check, questions[whichQ].correctAnswer)">
                    <input type="radio" name="youpicked" v-on:click="check=index">
                    &nbsp;&nbsp;&nbsp;
                    {{ questions[whichQ].choices[index] }}
                </div>
                <button class="next" v-if="whichQ!=questions.length-1"  v-on:click="whichQ++">
                    Next
                </button>
        </div>

        <div class="panel-body">
            <p> Your score: {{ yourscore }} </p>
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
            youpicked: '',
            whichQ: this.qindex,
            finished: false,
            yourscore: 0,
            check: null
        }
    },
    methods: {
        checkAnswer(yours, actual) {
            if (yours === actual) {
                this.yourscore++;
                alert('Correct!');
            }
            this.youpicked = '';
        }
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