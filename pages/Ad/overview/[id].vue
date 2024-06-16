<template>
  <div class="container">
    <div class="announcement">
      <h1>校外賃居廣告頁</h1>
    </div>

    <hr />
    <h2 style="font-weight: bold; font-size: 26px">公告</h2>
    <hr />
    <div>
      <!--class="announcement"-->
      <p></p>
    </div>

    <hr />

    <div class="search">
      <label for="keyword">關鍵字:</label>
      <input id="keyword" v-model="keyword" type="text" />

      <label for="rent">房屋租金:</label>
      <select id="rent" v-model="rent">
        <option value="不限">不限</option>
        <option value="3000以下">3000以下</option>
        <option value="5000以下">5000以下</option>
        <option value="10000以下">10000以下</option>
        <option value="10000~15000">10000~15000</option>
        <option value="20000以上">20000以上</option>
      </select>

      <label for="building">建築類型:</label>
      <select id="building" v-model="building">
        <option value="不限">不限</option>
        <option value="透天">透天</option>
        <option value="大樓">大樓</option>
        <option value="學舍">學舍</option>
        <option value="公寓">公寓</option>
      </select>

      <label for="rentType">出租類型:</label>
      <select id="rentType" v-model="rentType">
        <option value="不限">不限</option>
        <option value="整棟出租">整棟出租</option>
        <option value="套房出租">套房出租</option>
        <option value="房間分租">房間分租</option>
      </select>
    </div>

    <div class="filters">
      <fieldset>
        <legend>關鍵字查詢</legend>

        <div class="filter">
          <label for="male"
            ><input
              id="male"
              v-model="gender"
              type="radio"
              value="male"
              name="gender"
            />
            男性</label
          >
          <label for="female"
            ><input
              id="female"
              v-model="gender"
              type="radio"
              value="female"
              name="gender"
            />
            女性</label
          >
          <label for="any"
            ><input
              id="any"
              v-model="gender"
              type="radio"
              value="any"
              name="gender"
            />
            不限</label
          >
        </div>

        <div class="filter">
          <label
            ><input v-model="facilities" type="checkbox" value="18" />
            有電視</label
          >
          <label
            ><input v-model="facilities" type="checkbox" value="19" />
            有冰箱</label
          >
          <label
            ><input v-model="facilities" type="checkbox" value="20" />
            有洗衣機</label
          >
          <label
            ><input v-model="facilities" type="checkbox" value="21" />
            有烘衣機</label
          >
          <label
            ><input v-model="facilities" type="checkbox" value="22" />
            有飲水機</label
          >
          <label
            ><input v-model="facilities" type="checkbox" value="23" />
            有衣櫃</label
          >
          <label
            ><input v-model="facilities" type="checkbox" value="24" />
            有單人床</label
          >
          <label
            ><input v-model="facilities" type="checkbox" value="25" />
            有雙人床</label
          >
          <label
            ><input v-model="facilities" type="checkbox" value="26" />
            有書桌</label
          >
          <label
            ><input v-model="facilities" type="checkbox" value="27" />
            有寬頻網路</label
          >
        </div>
      </fieldset>
    </div>

    <button class="btn-search" @click="search">查詢</button>

    <hr />

    <div class="content">
      <div class="infinite-scroll">
        <div v-if="Ads">
          <div v-for="ad in Ads" :key="ad.id">
            <NuxtLink :to="`/Ad/${ad.id}`">
              <AdTitleCard :ad="ad" />
            </NuxtLink>
          </div>
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
      <div class="pagination">
        <div v-if="numberOfAds">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="numberOfAds * 10"
            :current-page="currentPage * 1"
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </div>

    <!-- 原房屋列表
    <div class="house-list">
      <h2>房屋列表</h2>
      <ul>
        <li v-for="(house, index) in houses" :key="index" class="house-item">
          <h3>{{ house.type }}</h3>
          <p>地點：{{ house.location }}</p>
          <p>價格：{{ house.price }}</p>
          <p>面積：</p>
        </li>
      </ul>
    </div>
    -->
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import AdTitleCard from "~/components/AdTitleCard.vue"; //*

const route = useRoute();
const router = useRouter();
const Ads = ref(null); // *posts
const numberOfAds = ref(null); //*
const currentPage = ref(1);

currentPage.value = route.params.id || 1;

const handlePageChange = (page) => {
  router.push(`/Ad/overview/${page}`); //*
};

const params = {
  skip: currentPage.value * 10 - 10 || 0,
  take: 10,
  thestatus: ["ADOPTED"], // "NORMAL", "REPORTED"
  ids: null,
};

const params2 = {
  thestatus: ["ADOPTED"], // "NORMAL", "REPORTED"
};

onMounted(async () => {
  const responseAd = await fetch("/api/ad/get-n-ads", {
    //*
    method: "POST", //
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (responseAd.ok) {
    //*
    const responseData = await responseAd.json();
    if (responseData.statusCode === 200) {
      Ads.value = responseData.body;
      console.log("Ads:", Ads.value[0].title);
    } else {
      console.error("Failed to fetch Ads:", responseData);
    }
  } else {
    console.error("Failed to fetch Ads: HTTP status", responseAd.status);
  }

  const responseNumberOfAd = await fetch("/api/ad/get-number-of-ads", {
    //*
    method: "POST", // POST
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params2),
  });
  numberOfAds.value = await responseNumberOfAd.json();
  numberOfAds.value = Math.ceil(numberOfAds.value / 10);
});

definePageMeta({
  middleware: "auth",
});
</script>

<script>
export default {
  data() {
    return {
      title: "校外賃居網",
      keyword: " ",
      rent: "不限",
      building: "不限",
      rentType: "不限",
      gender: "any",
      facilities: [],
      /* houses: [
        { type: '公寓', location: '', price: '$/月' },
        { type: '透天', location: '', price: '$/月' },
        { type: '別墅', location: '', price: '$/月' }
      ] */
    };
  },
  methods: {
    search() {
      // 進行查詢的相關邏輯
      console.log("進行查詢");
    },
  },
};
</script>

<style>
.content {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.content .infinite-scroll {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  flex-basis: 100%;
}
.content .pagination {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block-end: 50px;
}
</style>

<!--*(多了scoped)-->
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.announcement {
  display: flex;
  justify-content: space-between; /* 將標題和按鈕靠左和靠右對齊 */
  align-items: center; /* 垂直置中對齊 */
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
  font-size: 30px;
}

.search {
  margin-top: 20px;
}

.search label {
  margin-right: 10px;
}

.btn-search {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px; /* 調整查詢按鈕與 fieldset 之間的間距 */
}

.filters {
  margin-top: 20px;
}

.filters legend {
  font-weight: bold;
}

.filter {
  margin-bottom: 10px;
}

.house-list {
  margin-top: 20px;
}

.house-item {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.house-item h3 {
  margin-top: 0;
  margin-bottom: 5px;
}

.house-item p {
  margin: 5px 0;
}
</style>
