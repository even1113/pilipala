<template>
  <CommonHeader></CommonHeader>
  <div class="user-index">
    <h2>个人中心</h2>
    <div class="user-form">
      <el-form :model="formData" label-width="120px">
        <el-form-item label="修改头像">
          <el-upload
            :http-request="httpRequest"
            multiple
            :show-file-list="true"
            list-type="picture-card"
            :before-upload="beforeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="formData.username" :placeholder="(userInfo as any).username" />
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="formData.phone" :placeholder="(userInfo as any).phone" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="formData.password" :placeholder="(userInfo as any).password" />
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="formData.email" :placeholder="(userInfo as any).email" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit(formData)">提交修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonHeader from '@/components/Header/CommonHeader.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { toRaw } from 'vue'

import { changeInfo } from '@/api/user/index'
import { uploadCover } from '@/api/user'
import axios from 'axios'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
console.log('user:', userInfo.value)

const formData = reactive({
  username: '',
  phone: '',
  password: '',
  email: '',
  head: (userInfo as any).value.head,
  id: (userInfo as any).value.id
})

// ============= 用户头像 ===========

const imageUrl = ref('')
function httpRequest(option: any) {
  let dataForm = new FormData()
  dataForm.append('filePath', (userInfo as any).value.head)
  dataForm.append('file', option.file)
  console.log('dataForm', dataForm)
  // http://localhost:8888/hdfs/head
  // http://8.130.90.51:8888/hdfs/head
  axios
    .post('http://localhost:8888/hdfs/head', dataForm, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res: any) => {
      console.log('上传照片的返回值', res)
      if (res.data.code == 200) {
        console.log('上传成功')
        ElMessage({
          message: '上传个人头像成功',
          type: 'success',
          duration: 1000
        })
        formData.head = res.data.data
      } else {
        ElMessage.error('上传个人头像失败，请重新上传')
      }
    })
  // uploadCover(dataForm).then((res: any) => {
  //   console.log('上传照片的返回值', res)
  //   if (res.data.code == 200) {
  //     ElMessage({
  //       message: '上传个人头像成功',
  //       type: 'success',
  //       duration: 1000
  //     })
  //     formData.head = res.data.data
  //   } else {
  //     ElMessage.error('上传个人头像失败，请重新上传')
  //   }
  // })
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const type = ['image/jpeg', 'image/jpg', 'image/png']
  if (type.indexOf(file.type) === -1) {
    ElMessage.error('上传的文件必须是JPG、JPEG、PNG三种之一!')
    return false
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  }
  return true
}

// 提交表单
async function onSubmit(formData: any) {
  const params = toRaw(formData)

  for (let i in params) {
    if (params[i] === '') {
      params[i] = (userInfo as any).value[i]
    }
  }
  console.log('changeInfo params', params)
  await changeInfo(params)
    .then((res: any) => {
      console.log('res', res)
      if (res.code === 500) ElMessage.error('用户名已存在')
      if (res.code === 200) {
        userStore.setUserOtherInfo(res.data)
        console.log('userInfo.value', userInfo.value)
        console.log('user:', userInfo.value)

        ElMessage({
          message: '更新个人信息成功',
          type: 'success',
          duration: 1000
        })
      }
    })
    .catch((err) => {
      ElMessage.error('更新个人信息失败')
    })
}
</script>

<style lang="scss" scoped>
.user-index {
  width: 600px;
  margin: 0px auto;
  border-radius: 10px;
  padding: 70px;
  background-color: rgb(247, 247, 247);
  h2 {
    margin-bottom: 20px;
  }
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
