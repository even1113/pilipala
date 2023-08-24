<template>
  <div class="foot">
    <!-- 底部a -->
    <div class="foot-a">
      <!-- 底部左边部分 -->
      <div class="foot-a-left">
        <!-- 底部左边部分1 -->
        <div class="foot-a-left-1">
          <span class="foot-a-left-1-head"> pilipala </span>
          <ul class="foot-a-left-1-ul">
            <a class="link" href="#" target="_blank">关于我们</a>
            <a class="link" href="#" target="_blank">联系我们</a>
            <a class="link" href="#" target="_blank">用户协议</a>
            <a class="link" href="#" target="_blank">加入我们</a>
            <a class="link" href="#" target="_blank">友情链接</a>
            <a class="link" href="#" target="_blank">隐私政策</a>
            <a class="link" href="#" target="_blank">pilipala验证</a>
          </ul>
        </div>
        <!-- 底部左边部分2 -->
        <div class="foot-a-left-2">
          <span class="foot-a-left-1-head"> pilipala </span>
          <ul class="foot-a-left-2-ul">
            <a class="link" href="#" target="_blank">协议汇总</a>
            <a class="link" href="#" target="_blank">帮助中心</a>
            <a class="link" href="#" target="_blank">名人堂</a>
            <a class="link" href="#" target="_blank">活动中心</a>
            <a class="link" href="#" target="_blank">社区中心</a>
            <a class="link" href="#" target="_blank">mcn管理中心</a>
            <a class="link" href="#" target="_blank">活动专题页</a>
            <a class="link" href="#" target="_blank">壁纸站</a>
            <a class="link" href="#" target="_blank">高级弹幕</a>
            <a class="link" href="#" target="_blank">侵权申诉</a>
            <a class="link" href="#" target="_blank">广告合作</a>
            <a class="link" href="#" target="_blank">品牌号官网</a>
          </ul>
        </div>
      </div>
      <!-- 底部右边部分 -->
      <div class="foot-a-right">
        <!-- 图片位置 -->

        <!-- 下载 -->
        <div class="foot-a-right-download">
          <el-popover placement="top" :width="200" trigger="hover" content="图片">
            <template #reference>
              <div class="foot-a-right-download-popover">
                <img class="picture" :src="app" alt="下载logo" />
                <a class="popover-link" href="#">APP下载</a>
              </div>
            </template>
          </el-popover>
        </div>
        <!-- 微博 -->
        <div class="foot-a-right-weibo">
          <el-popover placement="top" :width="200" trigger="hover" content="图片">
            <template #reference>
              <div class="foot-a-right-weibo-popover">
                <img class="picture" :src="wb" alt="微博logo" />
                <a class="popover-link" href="#">官方微博</a>
              </div>
            </template>
          </el-popover>
        </div>
        <!-- 微信 -->
        <div class="foot-a-right-wechat">
          <el-popover placement="top" :width="200" trigger="hover" content="图片">
            <template #reference>
              <div class="foot-a-right-wechat-popover">
                <img class="picture" :src="wx" alt="微信logo" />
                <a class="popover-link" href="#">官方微信</a>
              </div>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
    <!-- 底部b -->
    <div class="foot-b">
      <!-- 底部b左侧 -->
      <div class="foot-b-left">
        <img class="foot-b-left-picture" :src="foot" alt="底部图片" />
      </div>
      <!-- 底部b右侧 -->
      <div class="foot-b-right">
        <span> 营业执照 </span>
        <span> 信息网络传播视听节目许可证：0910417 </span>
        <span> 网络文化经营许可证 沪网文【2019】3804-274号 </span>
        <span> 广播电视节目制作经营许可证：（沪）字第01248号 </span>
        <span> 增值电信业务经营许可证 沪B2-20100043 </span>
        <span> 互联网ICP备案：沪ICP备13002172号-3 </span>
        <span> 出版物经营许可证 沪批字第U6699 号 </span>
        <span> 互联网药品信息服务资格证 </span>
        <span> 沪-非经营性-2022-0011 营业性演出许可证 </span>
        <span> 沪市文演（经）00-2253 </span>
        <p></p>
        <span> 不良信息举报邮箱：help@bilibili.com </span>
        <span> | 涉未成年举报邮箱：teenprotect@bilibili.com </span>
        <span> | 不良信息举报电话：4006262233转3 </span>
        <span> | 上海互联网举报中心 </span>
        <span> | 12345政务服务便民热线 </span>
        <span> | 沪公网安备31011002002436号 </span>
        <span> | 儿童色情信息举报专区 </span>
        <span> | 扫黄打非举报 </span>
        <span> | 网上有害信息举报专区：中国互联网违法和不良信息举报中心 </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import app from '@/assets/img/footer/app.png'
import foot from '@/assets/img/footer/foot.png'
import wb from '@/assets/img/footer/wb.png'
import wx from '@/assets/img/footer/wx.png'
</script>

<style lang="scss" scoped>
.picture {
  margin-left: 25%;
  margin-top: 10%;
  width: 50%;
}
.link {
  color: black;
}
.popover-link {
  margin-left: 28%;
  margin-top: 6%;
  color: black;
}
.foot {
  width: 100%;
  height: 50%;
  background: #f7f9fa;
  .foot-a {
    width: 100%;
    height: 220px;
    background: #f7f9fa;
    .foot-a-left {
      width: 68%;
      height: 200px;
      margin-top: 10px;
      background: #f7f9fa;
      float: left;
      .foot-a-left-1 {
        width: 45%;
        height: 200px;
        background: #f7f9fa;
        float: left;
        margin-left: 24px;
        border-right: 2px solid rgba(226, 214, 214, 0.444);
        .foot-a-left-1-head {
          margin-top: 10px;
        }
        .foot-a-left-1-ul {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 10px;
        }
      }
      .foot-a-left-2 {
        width: 45%;
        height: 200px;
        background: #f7f9fa;
        float: left;
        margin-left: 24px;
        border-right: 2px solid rgba(226, 214, 214, 0.444);
        .foot-a-left-2-ul {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 10px;
        }
      }
    }
    .foot-a-right {
      width: 32%;
      height: 200px;
      margin-top: 10px;
      margin-left: -20px;
      background: #f7f9fa;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;

      .foot-a-right-download {
        width: 30%;
        height: 80%;
        margin-left: -16px;
        background: #f7f9fa;
        .foot-a-right-download-popover {
          display: flex;
          flex-direction: column;
        }
      }
      .foot-a-right-weibo {
        width: 30%;
        height: 80%;
        margin-left: 20px;
        background: #f7f9fa;
        .foot-a-right-weibo-popover {
          display: flex;
          flex-direction: column;
        }
      }
      .foot-a-right-wechat {
        width: 30%;
        height: 80%;
        margin-left: 20px;
        background: #f7f9fa;
        .foot-a-right-wechat-popover {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
  .foot-b {
    width: 100%;
    height: 180px;
    background: #f7f9fa;
    .foot-b-left {
      width: 15%;
      height: 100%;
      float: left;
      .foot-b-left-picture {
        margin-left: 10%;
        height: 90%;
      }
    }
    .foot-b-right {
      width: 70%;
      height: 100%;
      float: left;
    }
  }
}
</style>
