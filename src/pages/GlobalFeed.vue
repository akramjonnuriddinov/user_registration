<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mc-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">POPULAR TAGS</div>
      </div>
    </div>
  </div>
</template>

<script>
import McFeed from '@/components/Feed.vue'

export default {
  name: 'McGlobalFeed',
  components: {
    McFeed,
  },
  data() {
    return {
      apiUrl: '/articles',
    }
  },
}
</script>
