<template>
  <div>
    <top></top>
    <div id="category">
      <div class="container"></div>
      <div class="goods">
        <goodslist :goodslist="search"></goodslist>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../home/ChildComps/top.vue";
import goodslist from "../category/goodslist.vue";
import { ref, onMounted, reactive, toRefs, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const search = ref([]);
    onMounted(() => {
      search.value = JSON.parse(route.query.id);
      console.log(search.value);
    });
    return {
      search,
    };
  },
  components: {
    top,
    goodslist,
  },
  methods: {},
};
</script>
<style scoped lang='scss'>
#category {
  width: 60%;
  margin: 10% 20% 0 20%;
  z-index: -10;
  .container {
    width: 50%;
    margin-top: 1.5%;
    margin-left: 13%;
    z-index: -2;
    transition: all 0.5s;
    .goods {
      width: 83%;
      float: left;
    }
  }
}
</style>