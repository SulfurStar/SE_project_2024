<template>
    <div v-if="Ad" style="text-align: center; max-width: 800px; margin: 0 auto;">
    
      <section>
        <h2>基本資料</h2>
        
        <!-- 基本資料表格 -->
        <table border="1" cellpadding="5" cellspacing="0" style="width:100%; max-width: 800px; margin-bottom: 20px;" >
          <tbody>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000; width: 30%;">標題</td>
              <td colspan="2"> {{Ad.title}} </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">地址</td>
              <td colspan="2"> {{Ad.address}} </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">出租人(房東)</td>
              <td colspan="2">  </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">連絡電話</td>
              <td colspan="2">  </td>
            </tr>
          </tbody>
        </table>
        
        <p>&nbsp;</p>
      </section>
    
      <section>
        <h2>詳細資料</h2>
        <hr />
        
        <!-- 詳細資料表格 -->
        <table border="1" cellpadding="5" cellspacing="0" style="width:100%; max-width: 800px; margin-bottom: 20px;">
          <tbody>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000; width: 30%;">出租房數</td>
              <td colspan="2">  </td>
              <td style="background-color:#99ccff; border-color:#000000; width: 20%;">建物樓層</td>
              <td style="background-color:#ffffff; border-color:#000000">  </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">房屋類型</td>
              <td colspan="2">  </td>
              <td style="background-color:#99ccff; border-color:#000000;">獨立電表</td>
              <td>  </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">
                <p>證明文件</p>
              </td>
              <td colspan="2">  </td>
              <td style="background-color:#99ccff; border-color:#000000;">隔間材質</td>
              <td>  </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">安全訪評</td>
              <td colspan="2">  </td>
              <td style="background-color:#99ccff; border-color:#000000;">性別要求</td>
              <td>  </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">押金</td>
              <td colspan="2">  </td>
              <td style="background-color:#99ccff; border-color:#000000;">無菸租屋</td>
              <td>  </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">其他費用</td>
              <td colspan="2">  </td>
              <td style="background-color:#99ccff; border-color:#000000;">身份要求</td>
              <td>  </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">其他條件</td>
              <td colspan="2">  </td>
              <td style="background-color:#99ccff; border-color:#000000;">公共設施</td>
              <td>  </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">屋內設備</td>
              <td colspan="2">  </td>
              <td style="background-color:#99ccff; border-color:#000000;">屋況說明</td>
              <td>  </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">屋齡</td>
              <td colspan="2">  </td>
              <td style="background-color:#99ccff; border-color:#000000;">下架時間</td>
              <td>  </td>
            </tr>
          </tbody>
        </table>
        
        <p>&nbsp;</p>
      </section>
      
      <section>
        <h2>安全訪視項目</h2>
        
        <!-- 安全訪視項目表格 -->
        <table border="1" cellpadding="5" cellspacing="0" style="width:100%; max-width: 800px; margin-bottom: 20px;">
          <tbody>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000; width: 30%;">熱水器</td>
              <td colspan="2">  </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">安全設施</td>
              <td colspan="2">  </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">證明文件</td>
              <td colspan="2">  </td>
            </tr>
            <tr>
              <td style="background-color:#99ccff; border-color:#000000;">安全訪評</td>
              <td colspan="2">  </td>
            </tr>
          </tbody>
        </table>
        
        <p>&nbsp;</p>
      </section>
      
      <section>
        <h2>圖片區</h2>
        <!-- 圖片區域或其他內容 -->
        <p>&nbsp;</p>
      </section>
    </div>
    </template>
    

<script>

import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

export default {
  setup() {

    const route = useRoute();
    const Ad = ref(null); // 這裡的 Ad 用來存放從 API 取得的廣告資料 

    // 呼叫 API 時所需的參數 
    const params = { 
      AdId: route.params.id, // 這裡的 id 是從路由參數取得的
    };

    onMounted(async () => { // 在元件掛載後執行
      const response = await fetch(`/api/ad/get-single-ad`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params), // 將參數轉成 JSON 字串
      });
      Ad.value = await response.json(); // 將取得的資料存入 Ad 變數中
    });
    // console.log("AD",Ad);
    return { Ad }; // 回傳 Ad 變數
  }
};

</script>
    
<style scoped>
    /* Scoped CSS styles specific to this component */
</style>
    