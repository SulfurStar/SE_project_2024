<!-- 廣告業面 -->
<template>
    <div class="container">
      <div class="announcement">
        <h1>{{ title }}</h1>
      </div>
    
      <hr />
      <h2>公告</h2>
      <div class="announcement">
        <p>這是一個重要的公告</p>
      </div>
    
      <hr />
    
      <div class="search">
        <label for="keyword">關鍵字:</label>
        <input id="keyword" v-model="keyword" type="text" />
    
        <label for="rent">房屋租金:</label>
        <select v-model="rent" id="rent">
          <option value="不限">不限</option>
          <option value="3000以下">3000以下</option>
          <option value="5000以下">5000以下</option>
          <option value="10000以下">10000以下</option>
          <option value="10000~15000">10000~15000</option>
          <option value="20000以上">20000以上</option>
        </select>
    
        <label for="building">建築類型:</label>
        <select v-model="building" id="building">
          <option value="不限">不限</option>
          <option value="透天">透天</option>
          <option value="大樓">大樓</option>
          <option value="學舍">學舍</option>
          <option value="公寓">公寓</option>
        </select>
    
        <label for="rentType">出租類型:</label>
        <select v-model="rentType" id="rentType">
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
            <label><input type="radio" value="male" v-model="gender"> 男性</label>
            <label><input type="radio" value="female" v-model="gender"> 女性</label>
            <label><input type="radio" value="any" v-model="gender"> 不限</label>
          </div>
    
          <div class="filter">
            <label><input type="checkbox" value="18" v-model="facilities"> 有電視</label>
            <label><input type="checkbox" value="19" v-model="facilities"> 有冰箱</label>
            <label><input type="checkbox" value="20" v-model="facilities"> 有洗衣機</label>
            <label><input type="checkbox" value="21" v-model="facilities"> 有烘衣機</label>
            <label><input type="checkbox" value="22" v-model="facilities"> 有飲水機</label>
            <label><input type="checkbox" value="23" v-model="facilities"> 有衣櫃</label>
            <label><input type="checkbox" value="24" v-model="facilities"> 有單人床</label>
            <label><input type="checkbox" value="25" v-model="facilities"> 有雙人床</label>
            <label><input type="checkbox" value="26" v-model="facilities"> 有書桌</label>
            <label><input type="checkbox" value="27" v-model="facilities"> 有寬頻網路</label>
          </div>
        </fieldset>
      </div>
    
      <button @click="search" class="btn-search">查詢</button>
    
      <hr />
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
    </div>
    </template>
    
    <script>
    export default {
    data() {
      return {
        title: '校外賃居網',
        keyword: '',
        rent: '不限',
        building: '不限',
        rentType: '不限',
        gender: 'any',
        facilities: [],
        houses: [
          { type: '公寓', location: '', price: '$/月' },
          { type: '透天', location: '', price: '$/月' },
          { type: '別墅', location: '', price: '$/月' }
        ]
      };
    },
    methods: {
      search() {
        // 進行查詢的相關邏輯
        console.log('進行查詢');
      }
    }
    };
    </script>
    
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
    