<template>
  <div class="advertisement-form">
    <div class="form-group">
      <label for="title">廣告標題：<span class="required">*</span></label>
      <input id="title" v-model="form.title" type="text" name="title" />
      <abbr title="required" aria-label="required">(最多255個字)</abbr>
    </div>
    <div class="form-group">
      <label for="phone">電話：<span class="required">*</span></label>
      <input id="phone" v-model="form.phone" type="text" name="phone" />
    </div>
    <div class="form-group">
      <label for="address">地址：<span class="required">*</span></label>
      <input id="address" v-model="form.address" type="text" name="address" />
    </div>
    <div class="form-group">
      <label for="rental_rm">出租房數：<span class="required">*</span></label>
      <input
        id="rental_rm"
        v-model="form.rental_rm"
        type="text"
        name="rental_rm"
      />
      <p class="hint">
        範例: [雅房 約3坪]共5間; 空房0間; [套房 約7坪]共4間; 空房3間
      </p>
    </div>
    <div class="form-group">
      <label>目前滿租：<span class="required">*</span></label>
      <div class="radio-group">
        <input
          id="availability_yes"
          v-model="form.noroom"
          type="radio"
          name="availability"
          value="yes"
        />
        <label for="availability_yes">是</label>
        <input
          id="availability_no"
          v-model="form.noroom"
          type="radio"
          name="availability"
          value="no"
        />
        <label for="availability_no">否</label>
      </div>
    </div>
    <div class="form-group">
      <label>可預約看房：<span class="required">*</span></label>
      <div class="radio-group">
        <input
          id="appointment_yes"
          v-model="form.reserve"
          type="radio"
          name="appointment"
          value="yes"
        />
        <label for="appointment_yes">是</label>
        <input
          id="appointment_no"
          v-model="form.reserve"
          type="radio"
          name="appointment"
          value="no"
        />
        <label for="appointment_no">否</label>
      </div>
    </div>
    <div class="form-group">
      <label>請選擇房屋類型：<span class="required">*</span></label>
      <select v-model="form.buildtype">
        <option>請選擇房屋類型</option>
        <option>公寓</option>
        <option>大樓</option>
        <option>學舍</option>
        <option>透天</option>
      </select>
    </div>
    <div class="form-group">
      <label>請選擇出租類型：<span class="required">*</span></label>
      <select v-model="form.rm_type">
        <option>請選擇出租類型</option>
        <option>整棟出租</option>
        <option>獨立套房</option>
        <option>房間分租</option>
      </select>
    </div>
    <div class="form-group">
      <label for="rent_low">最低租金：<span class="required">*</span></label>
      <input
        id="rent_low"
        v-model="form.rent_low"
        type="text"
        name="rent_low"
      />
      <p class="hint">(請以月為單位，並輸入阿拉伯數字，範例: 2000)</p>
    </div>
    <div class="form-group">
      <label for="rent_high">最高租金：<span class="required">*</span></label>
      <input
        id="rent_high"
        v-model="form.rent_high"
        type="text"
        name="rent_high"
      />
      <p class="hint">(若價格單一，最低、最高租金請分別填入相同數字)</p>
    </div>
    <div class="form-group">
      <label for="deposit">押金：<span class="required">*</span></label>
      <input id="deposit" v-model="form.deposit" type="text" name="deposit" />
    </div>
    <div class="form-group">
      <label for="other_fee">其他費用</label>
      <input
        id="other_fee"
        v-model="form.other_fee"
        type="text"
        name="other_fee"
      />
    </div>
    <div class="form-group">
      <label for="floor">建築樓層</label>
      <input id="floor" v-model="form.floor" type="text" name="floor" />
    </div>
    <div class="form-group">
      <label for="indp_mete">獨立電表 : <font color="red">*</font></label>
      <input
        id="indp_mete"
        v-model="form.indp_mete"
        type="text"
        name="indp_mete"
      />
    </div>
    <div class="form-group">
      <label for="part_mate">隔間材質 : <font color="red">*</font></label>
      <input
        id="part_mate"
        v-model="form.part_mate"
        type="text"
        name="part_mate"
      />
    </div>
    <div class="form-group">
      <label for="houseAge">屋齡：</label>
      <input
        id="houseAge"
        v-model="form.houseAge"
        type="text"
        name="houseAge"
      />
    </div>
    <div class="form-group">
      <label for="endAt">下架時間：</label>
      <input id="endAt" v-model="form.endAt" type="text" name="endAt" />
    </div>
    <div class="form-group">
      <p>性別要求：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row">
        <input
          id="gender_male"
          v-model="form.gender"
          type="radio"
          name="gender"
          value="男"
        />
        <label for="gender_male">男</label>
        <input
          id="gender_female"
          v-model="form.gender"
          type="radio"
          name="gender"
          value="女"
          style="margin-left: 10px"
        />
        <label for="gender_female">女</label>
        <input
          id="gender_none"
          v-model="form.gender"
          type="radio"
          name="gender"
          value="無要求"
          style="margin-left: 10px"
        />
        <label for="gender_none">無要求</label>
      </form>
    </div>
    <div class="form-group">
      <p>無菸要求：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row">
        <input
          id="smoking_yes"
          v-model="form.Smoke_fre"
          type="radio"
          name="smoking"
          value="是"
        />
        <label for="smoking_yes">是</label>
        <input
          id="smoking_no"
          v-model="form.Smoke_fre"
          type="radio"
          name="smoking"
          value="否"
          style="margin-left: 10px"
        />
        <label for="smoking_no">否</label>
        <input
          id="smoking_none"
          v-model="form.Smoke_fre"
          type="radio"
          name="smoking"
          value="無要求"
          style="margin-left: 10px"
        />
        <label for="smoking_none">無要求</label>
      </form>
    </div>
    <div class="form-group">
      <label for="identity">身分要求：</label>
      <input
        id="identity"
        v-model="form.identity"
        type="text"
        name="identity"
      />
    </div>
    <div class="form-group">
      <p>有電視：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row">
        <input
          id="television_yes"
          v-model="form.telev"
          type="radio"
          name="television"
          value="true"
        />
        <label for="television_yes">有</label>
        <input
          id="television_no"
          v-model="form.telev"
          type="radio"
          name="television"
          value="false"
          style="margin-left: 10px"
        />
        <label for="television_no">無</label>
      </form>
    </div>
    <div class="form-group">
      <p>有冰箱：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row">
        <input
          id="refrigerator_yes"
          v-model="form.fridge"
          type="radio"
          name="refrigerator"
          value="true"
        />
        <label for="refrigerator_yes">有</label>
        <input
          id="refrigerator_no"
          v-model="form.fridge"
          type="radio"
          name="refrigerator"
          value="false"
          style="margin-left: 10px"
        />
        <label for="refrigerator_no">無</label>
      </form>
    </div>
    <div class="form-group">
      <p>有洗衣機：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row">
        <input
          id="washingMachine_yes"
          v-model="form.washmch"
          type="radio"
          name="washingMachine"
          value="true"
        />
        <label for="washingMachine_yes">有</label>
        <input
          id="washingMachine_no"
          v-model="form.washmch"
          type="radio"
          name="washingMachine"
          value="false"
          style="margin-left: 10px"
        />
        <label for="washingMachine_no">無</label>
      </form>
    </div>
    <div class="form-group">
      <p>有烘衣機：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row">
        <input
          id="dryer_yes"
          v-model="form.clothdry"
          type="radio"
          name="dryer"
          value="true"
        />
        <label for="dryer_yes">有</label>
        <input
          id="dryer_no"
          v-model="form.clothdry"
          type="radio"
          name="dryer"
          value="false"
          style="margin-left: 10px"
        />
        <label for="dryer_no">無</label>
      </form>
    </div>
    <div class="form-group">
      <p>有飲水機：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row">
        <input
          id="waterDispenser_yes"
          v-model="form.waterdisp"
          type="radio"
          name="waterDispenser"
          value="true"
        />
        <label for="waterDispenser_yes">有</label>
        <input
          id="waterDispenser_no"
          v-model="form.waterdisp"
          type="radio"
          name="waterDispenser"
          value="false"
          style="margin-left: 10px"
        />
        <label for="waterDispenser_no">無</label>
      </form>
    </div>
    <div class="form-group">
      <p>有單人床：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row">
        <input
          id="singleBed_yes"
          v-model="form.singlebed"
          type="radio"
          name="singleBed"
          value="true"
        />
        <label for="singleBed_yes">有</label>
        <input
          id="singleBed_no"
          v-model="form.singlebed"
          type="radio"
          name="singleBed"
          value="false"
          style="margin-left: 10px"
        />
        <label for="singleBed_no">無</label>
      </form>
    </div>
    <div class="form-group">
      <p>有雙人床：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row">
        <input
          id="doubleBed_yes"
          v-model="form.doublebea"
          type="radio"
          name="doubleBed"
          value="true"
        />
        <label for="doubleBed_yes">有</label>
        <input
          id="doubleBed_no"
          v-model="form.doublebea"
          type="radio"
          name="doubleBed"
          value="false"
          style="margin-left: 10px"
        />
        <label for="doubleBed_no">無</label>
      </form>
    </div>
    <div class="form-group">
      <p>有冷氣：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row">
        <input
          id="aircond_yes"
          v-model="form.aircond"
          type="radio"
          name="aircond"
          value="true"
        />
        <label for="aircond_yes">有</label>
        <input
          id="aircond_no"
          v-model="form.aircond"
          type="radio"
          name="aircond"
          value="false"
          style="margin-left: 10px"
        />
        <label for="aircond_no">無</label>
      </form>
    </div>
    <div class="form-group">
      <p>有衣櫃：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row">
        <input
          id="wardrobe_yes"
          v-model="form.wardrobe"
          type="radio"
          name="wardrobe"
          value="true"
        />
        <label for="wardrobe_yes">有</label>
        <input
          id="wardrobe_no"
          v-model="form.wardrobe"
          type="radio"
          name="wardrobe"
          value="false"
          style="margin-left: 10px"
        />
        <label for="wardrobe_no">無</label>
      </form>
    </div>
    <div class="form-group">
      <p>有書桌：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row">
        <input
          id="desk_yes"
          v-model="form.desk"
          type="radio"
          name="desk"
          value="true"
        />
        <label for="desk_yes">有</label>
        <input
          id="desk_no"
          v-model="form.desk"
          type="radio"
          name="desk"
          value="false"
          style="margin-left: 10px"
        />
        <label for="desk_no">無</label>
      </form>
    </div>
    <div class="form-group">
      <p>有寬頻網路：<span style="color: red">*</span></p>
      <form style="display: flex; flex-direction: row">
        <input
          id="internet_yes"
          v-model="form.internet"
          type="radio"
          name="internet"
          value="true"
        />
        <label for="internet_yes">有</label>
        <input
          id="internet_no"
          v-model="form.internet"
          type="radio"
          name="internet"
          value="false"
          style="margin-left: 10px"
        />
        <label for="internet_no">無</label>
      </form>
    </div>
    <div class="form-group">
      <label for="heater">熱水器：</label>
      <input id="heater" v-model="form.heater" type="text" name="heater" />
    </div>
    <div class="form-group">
      <label for="safe_faci">安全設施：</label>
      <input
        id="safe_faci"
        v-model="form.safe_faci"
        type="text"
        name="safe_faci"
      />
    </div>
    <div class="form-group">
      <label for="commonFacilities">公共設備：</label>
      <input
        id="commonFacilities"
        v-model="form.pub_equi"
        type="text"
        name="commonFacilities"
      />
    </div>
    <div class="form-group">
      <label for="housingCondition">屋況說明：</label>
      <input
        id="housingCondition"
        v-model="form.condition"
        type="text"
        name="housingCondition"
      />
    </div>
    <div class="form-group">
      <label for="safetyDocuments">安全文件：</label>
      <input
        id="safetyDocuments"
        v-model="form.certified"
        type="text"
        name="safetyDocuments"
      />
    </div>
    <div class="form-group">
      <label for="picture">圖片：</label>
      <el-upload
        class="upload-demo"
        :before-upload="beforeUpload"
        list-type="picture"
        :file-list="fileList"
        multiple
      >
        <el-button size="small" type="primary">選擇圖片</el-button>
        <template #tip>
          <div class="el-upload__tip">只能上傳 jpg/png 文件</div>
        </template>
      </el-upload>
    </div>
    <button class="favorite styled" type="button" @click="submitForm">
      新增
    </button>
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from "uuid";

const supabase = useSupabaseClient();

const showAlert = ref(false);
const alertTrigger = ref(null);
const router = useRouter();
const success = ref(false);
const user = useState("user");
const authorId_temp = ref("");
watch(
  () => user.value,
  (newUser) => {
    if (newUser) {
      authorId_temp.value = newUser.id;
    }
  },
  { immediate: true }
);
const form = ref({
  title: "",
  phone: "",
  address: "",
  rental_rm: "",
  noroom: "",
  reserve: "",
  buildtype: "",
  rm_type: "",
  rent_low: "",
  rent_high: "",
  deposit: "",
  other_fee: "",
  floor: "",
  indp_mete: "",
  part_mate: "",
  houseAge: "",
  endAt: "",
  gender: "",
  Smoke_fre: "",
  identity: "",
  telev: null,
  fridge: null,
  washmch: null,
  clothdry: null,
  waterdisp: null,
  singlebed: null,
  doublebea: null,
  pub_equi: "",
  condition: "",
  certified: "",
  aircond: null,
  wardrobe: null,
  desk: null,
  internet: null,
  heater: "",
  safe_faci: "",
  images: [],
  authorId: authorId_temp.value,
});

const fileList = ref([]);

const beforeUpload = async (file) => {
  const imageUrl = await uploadImage(file);
  if (imageUrl) {
    form.value.images.push(imageUrl);
    return true;
  }
  return false;
};

const uploadImage = async (file) => {
  try {
    const uniqueFileName = `${uuidv4()}.${file.name.split(".").pop()}`;

    const { data, error } = await supabase.storage
      .from("PostPhoto")
      .upload(`public/${uniqueFileName}`, file);

    if (error) {
      console.error("圖片上傳失敗:", error);
      return null;
    }

    const { data: urlData, error: urlError } = supabase.storage
      .from("PostPhoto")
      .getPublicUrl(`public/${uniqueFileName}`);
    if (urlError) {
      console.error("獲取圖片URL失敗:", urlError);
      return null;
    }

    const imageURL = urlData.publicUrl;
    console.log("圖片上傳成功，圖片URL:", imageURL);
    return imageURL;
  } catch (error) {
    console.error("圖片上傳過程中出現錯誤:", error);
    return null;
  }
};

const postForm = ref(null);

const submitForm = async () => {
  try {
    const params = {
      ...form.value,
      images: form.value.images.join(","),
    };
    console.log("提交的參數:", params);
    const response = await fetch("/api/ad/ad-new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const responseData = await response.json();
    if (response.ok) {
      console.log("成功創建新廣告:", responseData.body);
      success.value = true;
      showAlert.value = true;
      ElMessage({
        message: "成功創建新廣告",
        type: "success",
      });
      router.push("/Ad/overview/1");
    } else {
      console.error("創建廣告失敗:", responseData.body || responseData);
      success.value = false;
      showAlert.value = true;
      ElMessage({
        message: "創建廣告失敗",
        type: "error",
      });
    }
  } catch (error) {
    console.error("請求失敗:", error);
    success.value = false;
    showAlert.value = true;
  }
};

const resetForm = () => {
  postForm.value.resetFields();
  form.value.images = [];
  fileList.value = [];
};
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

.upload-demo {
  width: 200px;
  margin: 0 auto;
}
</style>
