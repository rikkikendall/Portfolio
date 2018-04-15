<style scoped>

  .holder {
    background: #fff;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  ul li {
    padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }

  p {
    text-align:center;
    padding: 30px 0;
    color: gray;
  }

  .container {
    box-shadow: 0px 0px 40px lightgray;
  }

</style>

<template>
<div class="panel panel-default">
    <div class="panel-heading" v-bind:style="{ color: '#9BC53D', fontSize: '20px'}">
        <h3 class="panel-title">Tackle These Questions</h3>
    </div>
        <div class="panel-body" v-if="!finished">
            <h3 class="panel-title">{{ questions[whichQ].question }} </h3>
                <div class="radiobuttons" v-for="(choice, ref) in questions[whichQ].choices" v-on:click="Areyoucorrect(check, questions[whichQ].correctAnswer)">

                        <button name="youpicked" v-on:click="check=ref">
<!--                     <input type="radio" name="youpicked" v-on:click="check=ref"> -->
                    {{ questions[whichQ].choices[ref] }}
                </button>

                </div>
                <button v-bind:style="{ color: '#9BC53D', fontSize: '20px'}" v-if="whichQ!=questions.length-1"  v-on:click="whichQ+=1">
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
    props: [ 'quiz', 'questions', 'choices', 'questionref'],
    data() {
        return {
            finished: false,
            yourscore: 0,
            check: null,
            youpicked: '',
            whichQ: this.questionref,
        }
    },
    methods: {
        Areyoucorrect(checkinput, theanswer) {
            if (checkinput != theanswer) {
                alert('WRONG');
            }
            else{
                this.yourscore += 1;
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