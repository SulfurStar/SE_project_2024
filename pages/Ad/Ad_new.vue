<template>
    <div class="advertisement-form">
      <div class="form-group">
        <label for="title">廣告標題：<span class="required">*</span></label>
        <input id="title" type="text" name="title" />
        <abbr title="required" aria-label="required">(最多255個字)</abbr>
      </div>
      <div class="form-group">
        <label for="phone">電話：<span class="required">*</span></label>
        <input id="phone" type="text" name="phone" />
      </div>
      <div class="form-group">
        <label for="address">地址：<span class="required">*</span></label>
        <input id="address" type="text" name="address" />
      </div>
      <div class="form-group">
        <label for="rentalCount">出租房數：<span class="required">*</span></label>
        <input id="rentalCount" type="text" name="rentalCount" />
        <p class="hint">範例: [雅房 約3坪]共5間; 空房0間; [套房 約7坪]共4間; 空房3間</p> 
      </div>
      <div class="form-group">
        <label>目前滿租：<span class="required">*</span></label>
        <div class="radio-group">
          <input type="radio" id="availability_yes" name="availability" value="yes">
          <label for="availability_yes">是</label>
          <input type="radio" id="availability_no" name="availability" value="no">
          <label for="availability_no">否</label>
        </div>
      </div>
      <div class="form-group">
        <label>可預約看房：<span class="required">*</span></label>
        <div class="radio-group">
          <input type="radio" id="appointment_yes" name="appointment" value="yes">
          <label for="appointment_yes">是</label>
          <input type="radio" id="appointment_no" name="appointment" value="no">
          <label for="appointment_no">否</label>
        </div>
      </div>
      <div class="form-group">
        <label>請選擇房屋類型：<span class="required">*</span></label>
        <select>
          <option>請選擇房屋類型</option>
          <option>公寓</option>
          <option>大樓</option>
          <option>學舍</option>
          <option>透天</option>
        </select>
      </div>
      <div class="form-group">
        <label>請選擇出租類型：<span class="required">*</span></label>
        <select>
          <option>請選擇出租類型</option>
          <option>整棟出租</option>
          <option>獨立套房</option>
          <option>房間分租</option>
        </select>
      </div>
      <div class="form-group">
      <label for="rentalCount">最低租金：<span class="required">*</span></label>
      <input id="rentalCount" type="text" name="rentalCount" />
      <p class="hint">(請以月為單位，並輸入阿拉伯數字，範例: 2000)</p> 
    </div>
    
    <div class="form-group">
    <label for="rentalCount">最高租金：<span class="required">*</span></label>
    <input id="rentalCount" type="text" name="rentalCount" />
    <p class="hint">(若價格單一，最低、最高租金請分別填入相同數字)</p> 
    </div>
    <div class="form-group">
    <label for="deposit">押金：<span class="required">*</span></label>
    <input id="deposit" type="text" name="deposit" />
    </div> 
    
      <!-- 其他表單元素 -->
      <div>
      <label for="username">其他費用</label>
      
      <input id="username" type="text" name="username" />
      <label for="username"
        ><abbr title="required" aria-label="required"></abbr></label
      >
    </div>
    <div>
    <label for="username">建築樓層</label>
    <input id="username" type="text" name="username" />
    <label for="username"
      ><abbr title="required" aria-label="required"></abbr></label
                                                             
    >
    </div>
    <div>
    <label for="username">獨立電表 : <font color="red">*</font></label>
    <input id="username" type="text" name="username" />
    <label for="username"
      ><abbr title="required" aria-label="required"></abbr></label
                                                             
    >
    </div>
    <div>
    <label for="username">隔間材質 : <font color="red">*</font></label>
    <input id="username" type="text" name="username" />
    <label for="username"
      ><abbr title="required" aria-label="required"></abbr></label>
    </div>
    
    <div>
    <label for="username">屋齡：</label>
    <input id="username" type="text" name="username" />
    <abbr title="required" aria-label="required"></abbr>
    </div>
    
    <div>
    <label for="username">下架時間：</label>
    <input id="username" type="text" name="username" />
    <abbr title="required" aria-label="required"></abbr>
    </div>
    
    <div>
    <p>性別要求：<span style="color: red">*</span></p>
    <form style="display: flex; flex-direction: row;">
      <input type="radio" id="gender_male" name="gender" value="男">
      <label for="gender_male">男</label>
      <input type="radio" id="gender_female" name="gender" value="女" style="margin-left: 10px;">
      <label for="gender_female">女</label>
      <input type="radio" id="gender_none" name="gender" value="無要求" style="margin-left: 10px;">
      <label for="gender_none">無要求</label>
    </form>
    </div>
    
    <div>
    <p>無菸要求：<span style="color: red">*</span></p>
    <form style="display: flex; flex-direction: row;">
      <input type="radio" id="smoking_yes" name="smoking" value="是">
      <label for="smoking_yes">是</label>
      <input type="radio" id="smoking_no" name="smoking" value="否" style="margin-left: 10px;">
      <label for="smoking_no">否</label>
      <input type="radio" id="smoking_none" name="smoking" value="無要求" style="margin-left: 10px;">
      <label for="smoking_none">無要求</label>
    </form>
    </div>
    
    <div>
    <label for="username">身分要求：</label>
    <input id="username" type="text" name="username" />
    <abbr title="required" aria-label="required"></abbr>
    </div>
    <div>
    <p>有電視：<span style="color: red">*</span></p>
    <form style="display: flex; flex-direction: row;">
      <input type="radio" id="television_yes" name="television" value="有">
      <label for="television_yes">有</label>
      <input type="radio" id="television_no" name="television" value="無" style="margin-left: 10px;">
      <label for="television_no">無</label>
    </form>
    </div>
    
    
     <div>
      <p>有冰箱：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row;">
        <input type="radio" id="refrigerator_yes" name="refrigerator" value="有">
        <label for="refrigerator_yes">有</label>
        <input type="radio" id="refrigerator_no" name="refrigerator" value="無" style="margin-left: 10px;">
        <label for="refrigerator_no">無</label>
      </form>
    </div>
    
    <div>
    <p>有洗衣機：<span style="color: red">*</span></p>
    <form style="display: flex; flex-direction: row;">
      <input type="radio" id="washingMachine_yes" name="washingMachine" value="有">
      <label for="washingMachine_yes">有</label>
      <input type="radio" id="washingMachine_no" name="washingMachine" value="無" style="margin-left: 10px;">
      <label for="washingMachine_no">無</label>
    </form>
    </div>
    
    <div>
    <p>有烘衣機：<span style="color: red">*</span></p>
    <form style="display: flex; flex-direction: row;">
      <input type="radio" id="dryer_yes" name="dryer" value="有">
      <label for="dryer_yes">有</label>
      <input type="radio" id="dryer_no" name="dryer" value="無" style="margin-left: 10px;">
      <label for="dryer_no">無</label>
    </form>
    </div>
    
    
    <div>
    <p>有飲水機：<span style="color: red">*</span></p>
    <form style="display: flex; flex-direction: row;">
      <input type="radio" id="waterDispenser_yes" name="waterDispenser" value="有">
      <label for="waterDispenser_yes">有</label>
      <input type="radio" id="waterDispenser_no" name="waterDispenser" value="無" style="margin-left: 10px;">
      <label for="waterDispenser_no">無</label>
    </form>
    </div>
    
    
    
    
    <div>
    <p>有單人床：<span style="color: red">*</span></p>
    <form style="display: flex; flex-direction: row;">
      <input type="radio" id="singleBed_yes" name="singleBed" value="有">
      <label for="singleBed_yes">有</label>
      <input type="radio" id="singleBed_no" name="singleBed" value="無" style="margin-left: 10px;">
      <label for="singleBed_no">無</label>
    </form>
    </div>
    
    <div>
    <p>有雙人床：<span style="color: red">*</span></p>
    <form style="display: flex; flex-direction: row;">
      <input type="radio" id="doubleBed_yes" name="doubleBed" value="有">
      <label for="doubleBed_yes">有</label>
      <input type="radio" id="doubleBed_no" name="doubleBed" value="無" style="margin-left: 10px;">
      <label for="doubleBed_no">無</label>
    </form>
    </div>
    
      <!--         -->
    
      <div>
        <label for="commonFacilities">公共設備：</label>
        <input id="commonFacilities" type="text" name="commonFacilities" />
      </div>
    
      <div>
        <label for="housingCondition">屋況說明：</label>
        <input id="housingCondition" type="text" name="housingCondition" />
      </div>
    
      <div>
        <label for="safetyDocuments">安全文件：</label>
        <input id="safetyDocuments" type="text" name="safetyDocuments" />
      </div>
    
      <div>
        <label for="picture">圖片：</label>
        <input type="file" name="picture"/><br/>
        <p>(圖片數量、大小須限制)</p>
      </div>
    
      <button class="favorite styled" type="button">新增</button>
    </div>
    
    
    
    </template>
    
    <script>
    export default {
    name: 'YourComponentName',
    // 如果有需要，在這裡添加組件的邏輯
    }
    </script>
    
    <style scoped>
    .advertisement-form {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    input[type="text"],
    select {
      width: calc(100% - 16px); /* Subtract padding from width */
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    .radio-group {
      display: flex;
      align-items: center;
    }
    
    .radio-group input[type="radio"] {
      margin-right: 10px;
    }
    
    .required {
      color: red;
    }
    
    .hint {
      font-size: 14px;
      color: #888;
    }
    </style>