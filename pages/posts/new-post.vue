<template>
  <div>
    <div class="header">
      <h1>新增貼文</h1>
    </div>
    <div class="new-post-container">
      <div class="the-form">
        <el-form
          ref="postForm"
          :model="post"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="標題" prop="title">
            <el-input
              v-model="post.title"
              placeholder="輸入貼文標題"
            ></el-input>
          </el-form-item>
          <el-form-item label="內容" prop="content">
            <el-input
              v-model="post.content"
              type="textarea"
              placeholder="輸入貼文內容"
            ></el-input>
          </el-form-item>
          <el-form-item label="圖片" prop="images">
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
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 條件渲染的提示框 -->
    <AlertDialog v-if="showAlert">
      <AlertDialogTrigger>
        <button ref="alertTrigger" class="hidden">Show Dialog</button>
      </AlertDialogTrigger>
      <AlertDialogContent
        class="flex flex-col items-center justify-center w-1/5 max-w-xs p-4 bg-white rounded-lg shadow-lg"
      >
        <AlertDialogTitle class="flex items-center">
          <svg
            v-if="success"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span class="ml-2">{{ success ? "操作成功" : "操作失敗" }}</span>
        </AlertDialogTitle>
        <AlertDialogAction class="mt-4" @click="handleConfirm"
          >確認</AlertDialogAction
        >
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid"; // 引入 UUID 庫
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const supabase = useSupabaseClient();

definePageMeta({
  middleware: "auth",
});

const user = useState("user");
const showAlert = ref(false);
const alertTrigger = ref(null);
const router = useRouter();
const success = ref(false);

const post = ref({
  title: "",
  content: "",
  images: [],
});

watch(showAlert, async (newVal) => {
  if (newVal) {
    await nextTick(); // 等待元素渲染完成
    if (alertTrigger.value) {
      alertTrigger.value.click();
    }
  }
});

const handleConfirm = () => {
  showAlert.value = false;
  if (success.value) router.push("/posts/overview/1");
};

const rules = {
  title: [
    { required: true, message: "請輸入標題", trigger: "blur" },
    { min: 3, message: "標題不能少於 3 個字", trigger: "blur" },
  ],
  content: [
    { required: true, message: "請輸入內容", trigger: "blur" },
    { min: 10, message: "內容不能少於 10 個字", trigger: "blur" },
  ],
  images: [{ required: true, message: "請上傳圖片", trigger: "change" }],
};

const fileList = ref([]);

const beforeUpload = async (file) => {
  const imageUrl = await uploadImage(file);
  if (imageUrl) {
    post.value.images.push(imageUrl);
    return true;
  }
  return false;
};

const uploadImage = async (file) => {
  try {
    // 生成唯一的文件名
    const uniqueFileName = `${uuidv4()}.${file.name.split(".").pop()}`;

    const { data, error } = await supabase.storage
      .from("PostPhoto")
      .upload(`public/${uniqueFileName}`, file);

    if (error) {
      console.error("圖片上傳失敗:", error);
      return null;
    }

    // 獲取公開 URL
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
  console.log("提交", post.value);
  try {
    const params = {
      title: post.value.title,
      content: post.value.content,
      authorId: user.value.id,
      images: post.value.images.join(","),
    };
    console.log("提交的參數:", params.images);
    const response = await fetch("/api/posts/create-new-posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const responseData = await response.json();
    if (response.ok && responseData.statusCode === 200) {
      console.log("成功創建新貼文:", responseData.body);
      success.value = true;
      showAlert.value = true;
    } else {
      console.error("創建貼文失敗:", responseData.body || responseData);
      success.value = false;
      showAlert.value = true;
    }
  } catch (error) {
    console.error("請求失敗:", error);
    success.value = false;
    showAlert.value = true;
  }
};

const resetForm = () => {
  postForm.value.resetFields();
  post.value.images = [];
  fileList.value = [];
};
</script>

<style scoped>
.new-post-container {
  display: flex;
  width: 100%;
  padding: 20px;
  justify-content: center;
  align-items: center;
}

.the-form {
  width: 100%;
  max-width: 600px;
}

.upload-demo {
  width: 200px;
  margin: 0 auto;
}

.header h1 {
  text-align: center;
  margin: 0;
  padding: 20px 0;
}

.header {
  width: 100%;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eaeaea;
}

.main {
  max-width: 600px;
  margin: 0 auto;
}
</style>
