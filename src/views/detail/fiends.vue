<template>
  <div>
    <div class="goods2">
      <div class="container">
        <h4>我的好友</h4>
        <div class="category" v-for="item in category1" :key="item.id" @click="gotodetail(item.id)">
          <img :src="item.cover" alt=""><div class="content"><p>{{ item.title }}</p><span>￥{{item.price}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category1: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  name: "fiends"
}
</script>

<style scoped>

</style>