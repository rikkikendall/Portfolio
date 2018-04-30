<template>
<div id="nav" class="nav">
    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'site-header',
    data() {
        return {
              drawer: false  
        }
    }
}
</script>




<style>
 /*NAVBAR */
        .bs-docs-sidebar .nav > li > a {
            display: block;
            padding: 4px 20px;
            font-size: 14px;
            font-weight: 500;
            color: #999;
            background-color: darkblue;
        }
        .bs-docs-sidebar .nav > li > a:hover,
        .bs-docs-sidebar .nav > li > a:focus {
            padding-left: 19px;
            color: #A1283B;
            text-decoration: none;
            background-color: darkblue;
            border-left: 1px solid #A1283B;
        }
        .bs-docs-sidebar .nav > .active > a,
        .bs-docs-sidebar .nav > .active:hover > a,
        .bs-docs-sidebar .nav > .active:focus > a {
            padding-left: 18px;
            font-weight: bold;
            color: #A1283B;
            background-color: darkblue;
            border-left: 2px solid #A1283B;
        } 

</style>

