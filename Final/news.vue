<template>
<v-app id="inspire">
    <site-header></site-header>
    <lang-toggle></lang-toggle>
    <v-tabs fixed-tabs>
        <v-tab ripple>
            About
        </v-tab>
        <v-tab ripple>
            Media
        </v-tab>
    <v-tab-item>
        <v-card flat>
            <v-card-text>
                <about-carousel :people="thePeople"></about-carousel>
            </v-card-text>
        </v-card>
    </v-tab-item>
    <v-tab-item>
        <v-card flat>
            <v-card-text>Contents for Item 2 go here</v-card-text>
        </v-card>
    </v-tab-item>  
    </v-tabs>
</v-app>
</template>

<script>

</script>

<script>
import SiteHeader from '~/components/SiteHeader'
import LangToggle from '~/components/LangToggle'
import thePeople from '~/static/personData.json'
import AboutCarousel from '~/components/AboutCarousel'
import { mapState } from 'vuex'

export default {
  components: {
      SiteHeader,
      LangToggle,
      AboutCarousel
  },

  data() {
    return {
      thePeople
    };
  },

  methods: {
    signOut: function() {
        let self = this
        firebase.auth().signOut().then(function() {
            self.$store.state.role= 'guest'
            console.log("signed out")
        // Sign-out successful.
        }, function(error) {
            // An error happened.
        });
    }
  }
}

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('f14ab6c5dfa247989f687ef218d16bbb');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
  sources: 'bbc-news,the-verge',
  q: 'bitcoin',
  category: 'business',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});
// To query /v2/everything
// You must include at least one q, source, or domain
newsapi.v2.everything({
  q: 'bitcoin',
  sources: 'bbc-news,the-verge',
  domains: 'bbc.co.uk, techcrunch.com',
  from: '2017-12-01',
  to: '2017-12-12',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});
// To query sources
// All options are optional
newsapi.v2.sources({
  category: 'technology',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      sources: [...]
    }
  */
});
</script>

<style>

</style>
