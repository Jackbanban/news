<template>
    <div class="account">
        <HeadNormal title="编辑资料"></HeadNormal>
        <div class="head_img">
            <img :src="profile.head_img" alt="">
            <van-uploader class="uploader" :after-read="afterRead" />
        </div>

        <CellBar laber="昵称" :text="profile.nickname" @click="show1 = !show1"></CellBar>
        <van-dialog v-model="show1" title="编辑昵称" show-cancel-button @confirm="handlNickname">
            <van-cell-group>
                <van-field :value="profile.nickname" placeholder="请输入昵称" ref="nickname" />
            </van-cell-group>
        </van-dialog>
        <CellBar laber="密码" :text="profile.password" type="password" @click="show2 = !show2"></CellBar>
        <van-dialog v-model="show2" title="编辑密码" show-cancel-button @confirm="handlPassword">
            <van-cell-group>
                <van-field :value="profile.password" placeholder="请输入密码" ref="password" />
            </van-cell-group>
        </van-dialog>
        <CellBar laber="性别" :text="profile.gender === 1 ? '男' : '女'" @click="show3 = !show3"></CellBar>
        <van-dialog v-model="show3" title="编辑密码" show-cancel-button @confirm="handlGender">
            <van-radio-group v-model="genderCode">
                <van-cell-group>
                    <van-cell title="男" clickable @click="genderCode = '1'">
                        <van-radio slot="right-icon" name="1" />
                    </van-cell>
                    <van-cell title="女" clickable @click="genderCode = '0'">
                        <van-radio slot="right-icon" name="0" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-dialog>

    </div>
</template>

<script>

import CellBar from '@/components/CellBar.vue'
import HeadNormal from '@/components/HeadNormal.vue'
export default {
    data() {
        return {
            profile: {},
            show1: false,
            show2: false,
            show3: false,
            genderCode: '1'
        }
    },
    components: {
        CellBar,
        HeadNormal
    },
    methods: {
        editProfile(data, callback) {
            this.$axios({
                url: '/user_update/' + localStorage.getItem('user_id'),
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem("token")
                },
                data
            }).then(res => {
                const { message } = res.data
                if (message === "修改成功") {
                    if (callback) {
                        callback()
                    }
                    this.$toast.success(message);
                }
            })
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            const formData = new FormData()
            // 通过表单使用append方法追加数据
            formData.append('file', file.file)
            this.$axios({
                url: "/upload",
                method: 'post',
                headers: {
                    Authorization: localStorage.getItem("token")
                },
                data: formData
            }).then(res => {
                const { data } = res.data
                this.profile.head_img = this.$axios.defaults.baseURL + data.url

                this.editProfile({ head_img: data.url })
            })
        },
        handlNickname() {
            const value = this.$refs.nickname.$refs.input.value
            this.editProfile({ nickname: value }, () => {
                this.profile.nickname = value
            })
        },
        handlPassword() {
            const value = this.$refs.password.$refs.input.value
            this.editProfile({ password: value }, () => {
                this.profile.password = value
            })
        },
        handlGender(){
            const gender = +this.genderCode
            this.editProfile({ gender }, () => {
                this.profile.gender = gender
            })
        }
    },
    mounted() {
        this.$axios({
            url: '/user_update/' + localStorage.getItem('user_id'),
            method: 'post',
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {
            const { data } = res.data
            this.profile = data
            if (data.head_img) {
                this.profile.head_img = this.$axios.defaults.baseURL + data.head_img
            } else {
                this.profile.head_img = './static/touxiang.jpg'
            }
        })
    }
}
</script>

<style scoped lang="less">
.account {
    padding: 20px;
    .editHead {
        display: flex;
        align-items: center;
        h4 {
            flex: 1;
            text-align: center;
            font-size: 19px;
            font-weight: 600;
        }
    }
    .head_img {
        display: flex;
        position: relative;
        text-align: center;
        justify-content: center;
        align-items: center;
        height: 130 / 360 * 100vw;
        img {
            width: 70 / 360 * 100vw;
            border-radius: 50%;
        }
        input {
            display: block;
            width: 70 / 360 * 100vw;
            height: 70 / 360 * 100vw;
            opacity: 0;
        }
    }
}

.uploader {
    position: absolute;
    opacity: 0;
}

;
/deep/ .van-uploader__upload {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
}
</style>
