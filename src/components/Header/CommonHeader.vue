<template>
  <div class="common-header">
    <div class="header">
      <el-affix :offset="0">
        <div class="header-search">
          <div class="demo-input-size">
            <el-input
              v-model="input"
              style="width: 300px"
              size="large"
              placeholder="请输入你想搜索的番剧！"
              :suffix-icon="Search"
              @input="handleInput"
            />

            <div class="input-large" v-show="input.length">
              <div
                class="input-large-item"
                v-for="item in searchValue"
                :key="(item as any).id"
                @click="linkToAnime((item as any).id)"
              >
                <span>{{ (item as any).animeName }}</span>
                <el-icon><CaretRight /></el-icon>
              </div>
            </div>
          </div>

          <div class="avatar-container">
            <el-avatar
              class="avatar"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <div class="tooltip">
              <p>{{ userName }}</p>
              <div class="tooltip-item login" v-if="!isToolTip" @click="isLogin">
                <div class="left">
                  <el-icon class="icon"><User /></el-icon>
                  <span>登录</span>
                </div>
                <div class="right">
                  <el-icon><ArrowRight /></el-icon>
                </div>
              </div>
              <div class="usercenter" v-else>
                <div class="tooltip-item center" @click="router.push('/user')">
                  <div class="left">
                    <el-icon class="icon"><UserFilled /></el-icon>
                    <span>个人中心</span>
                  </div>
                  <div class="right">
                    <el-icon><ArrowRight /></el-icon>
                  </div>
                </div>
                <div class="tooltip-item logout" @click="logout">
                  <div class="left">
                    <el-icon class="icon"><Promotion /></el-icon>
                    <span>退出登录</span>
                  </div>
                  <div class="right">
                    <el-icon><ArrowRight /></el-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-affix>
    </div>

    <!-- 登录弹出框 -->
    <el-dialog v-model="login" align-center class="dialog" :draggable="true">
      <el-tabs v-model="activeName" stretch>
        <el-tab-pane label="密码登陆" name="first">
          <el-form
            :model="userForm"
            ref="userFormRef"
            status-icon
            :rules="userRules"
            class="tab-form"
          >
            <!-- input账号 -->
            <el-form-item prop="user">
              <el-input
                type="text"
                size="large"
                v-model.number="userForm.phone"
                placeholder="请输入手机号"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                type="text"
                size="large"
                v-model.number="userForm.password"
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>
          </el-form>

          <div class="user-button">
            <el-button class="user-button-login" @click="submitUserForm(userFormRef)">
              登录
            </el-button>
            <el-button @click="regist" class="user-button-login"> 注册 </el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="短信登录" name="second">
          <el-form
            :model="phoneForm"
            ref="phoneFormRef"
            status-icon
            :rules="phoneRules"
            class="tab-form"
          >
            <el-form-item prop="phone">
              <div style="display: flex" class="phone-box">
                <el-input
                  type="text"
                  size="large"
                  v-model.number="phoneForm.phone"
                  placeholder="请输入手机号"
                />
                <div>
                  <el-button class="verification-button" @click="getValideNumber"
                    >获取验证码</el-button
                  >
                </div>
              </div>
            </el-form-item>

            <el-form-item prop="validate">
              <el-input
                type="text"
                size="large"
                v-model.number="phoneForm.captcha"
                placeholder="请输入验证码"
              />
            </el-form-item>
          </el-form>

          <div class="phone-button">
            <el-button class="phone-button-login" @click="submitValideForm(phoneFormRef)">
              登录/注册
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { FormInstance } from 'element-plus'
import { userLogin, getCaptcha, userRegister } from '@/api/login/index'
import { useUserStore } from '@/stores/user'
import { getSearchAnime } from '@/api/swiper'

const router = useRouter()
const userStore = useUserStore()

const userName = ref('用户名')
let name = localStorage.getItem('userName')
if (name) {
  userName.value = name
}

// const userAvatar = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
// let avatar = localStorage.getItem('')
// if (avatar) {
//   userAvatar.value = avatar
// }
// head
// 页面转化
const isToolTip = ref(false)
const userId = localStorage.getItem('userId')
if (userId) {
  isToolTip.value = true
}

// =======登录======
const login = ref(false)
const isLogin = () => {
  login.value = !login.value
}
const activeName = ref('first')
const regist = () => {
  activeName.value = 'second'
}

const userFormRef = ref<FormInstance>()
const phoneFormRef = ref<FormInstance>()
const userForm = ref({
  phone: '',
  password: ''
})
const phoneForm = ref({
  phone: '',
  captcha: ''
})
const userRules = reactive({
  mobile: [
    {
      min: 11,
      max: 11,
      required: true,
      pattern: /^1[34578]\d{9}$/,
      message: '',
      trigger: 'blur'
    }
  ],
  password: [
    {
      pattern: /^[\w]{6,16}$/, // 弱密码
      required: true,
      message: '',
      trigger: 'blur'
    }
  ]
})
const phoneRules = reactive({
  mobile: [
    {
      min: 11,
      max: 11,
      required: true,
      pattern: /^1[34578]\d{9}$/,
      message: '',
      trigger: 'blur'
    }
  ]
})

// 获取验证码
async function getValideNumber() {
  const result: any = await getCaptcha(phoneForm.value.phone + '')

  if (result.code == 200) {
    ElMessage({
      message: '获取验证码成功',
      type: 'success',
      duration: 1000
    })
  } else {
    ElMessage.error('获取验证码失败')
  }
}

// 密码登录
async function submitUserForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate(async function (valid: any) {
    if (!valid) {
      ElMessage.error('请填入正确信息')
      return false
    }

    const result: any = await userLogin({
      phone: userForm.value.phone + '',
      password: userForm.value.password + ''
    })

    console.log('登录result', result)
    if (result.code === 500) {
      ElMessage.error(result.msg)
    }

    if (result.code === 200) {
      ElMessage.success(result.msg)
      login.value = false

      //密码登录成功'
      console.log('userData', result.data)
      userName.value = result.data.username

      localStorage.setItem('userId', result.data.id)
      localStorage.setItem('userName', result.data.username)

      userStore.setUserOtherInfo(result.data)
      userStore.setUserId(result.data.id)
      userStore.setUserState(1)
      router.push('/home')
    }
  })
}

// 验证码登录
async function submitValideForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  const result: any = await userRegister({
    phone: phoneForm.value.phone + '',
    captcha: phoneForm.value.captcha + ''
  })
  if (result.code === 500) ElMessage.error(result.msg)
  if (result.code === 200) {
    ElMessage({
      message: result.msg,
      type: 'success',
      duration: 1000
    })

    // 登录成功
    login.value = false
    console.log('验证码登录成功:', result.data)

    // 保存信息到localStorage中
    localStorage.setItem('userId', result.data.id)
    userStore.setUserId(result.data.id)
    userStore.setUserState(1)

    router.push('/home')
  }
}

// 登出
const logout = () => {
  userStore.setUserState(0)
  localStorage.removeItem('userId')
  localStorage.removeItem('userInfo')
  localStorage.removeItem('userName')

  ElMessage({
    message: '退出登录成功',
    type: 'success',
    duration: 1000
  })
  router.push('/home')
}

// 搜索
const input = ref('')
const searchValue = ref([])

async function handleInput() {
  const result: any = await getSearchAnime(input.value)
  searchValue.value = result.data
  console.log(searchValue.value)
}
const linkToAnime = (id: string) => {
  router.push({
    path: '/vedio',
    query: {
      id: id
    }
  })
}
</script>

<style lang="scss">
.common-header {
  .header {
    width: 100%;
    z-index: 9;
    position: relative;

    .header-search {
      width: 100%;
      background-color: rgb(246, 243, 239);
      display: flex;
      position: absolute;
      align-items: center;
      justify-content: center;
      .demo-input-size {
        position: relative;
        .input-large {
          display: flex;
          flex-direction: column;
          position: absolute;
          width: 100%;
          height: 300px;
          background-color: #fff;
          border: #e5e3e3 solid 1px;
          .input-large-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 10px;
            cursor: pointer;
            &:hover {
              border-radius: 5px;
              padding: 5px;
              background-color: #e5e3e3;
            }
          }
        }
      }

      .avatar-container {
        margin-left: 100px;
        position: relative;
        cursor: pointer;
        transition: transform 0.3s ease;
        z-index: 1;
        .tooltip {
          z-index: -1;
          width: 200px;
          height: 100px;
          position: absolute;
          border: #bbbaba solid 1px;
          top: 20px;
          left: 50%; /* 将 tooltip 水平居中 */
          transform: translateX(-50%); /* 调整位置使 tooltip 水平居中 */
          background-color: #fff;
          padding: 30px 10px;
          border-radius: 5px;
          text-align: center;
          opacity: 0; /* 初始时不显示 */
          // pointer-events: none; /* 防止 tooltip 遮挡鼠标事件 */
          transition: opacity 0.2s ease; /* 添加过渡效果 */
          p {
            margin-bottom: 20px;
          }

          .tooltip-item {
            width: 100%;
            padding: 3px;
            font-size: 14px;
            font-weight: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 25px;
            line-height: 20px;
            color: #8a8888;
            border-radius: 10px;
            margin: 15px 0px;
            .left {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .right {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .icon {
              margin-right: 5px;
            }

            &:hover {
              background-color: #e5e3e3;
            }
          }
        }
        &:hover {
          transform: scale(1.3) translate(-20%, 40%);
          .tooltip {
            opacity: 1;
          }
        }
      }
    }
  }
}

.el-dialog {
  width: 32%;
  height: 36%;
  border: 100px;
}

.el-dialog__body {
  height: 90%;
  padding-top: 10px;
  margin-top: 20px;
}

.el-dialog__header {
  padding: 0 0 0 0;
}

.el-tabs .el-tabs--top {
  margin-top: 10px;
}

.el-form-item__label {
  margin-left: -30px;
}
</style>
