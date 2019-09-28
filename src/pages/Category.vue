<template>
    <div class="category">
        <HeadNormal title="栏目管理"></HeadNormal>

        <div class="delete">
            <p>点击删除以下频道</p>
            <ul>
                <li v-for="(item,index) in list" :key="index" @click="deleteCategory(index)">{{item.name}}</li>
            </ul>
        </div>

        <div class="add">
            <p>点击添加以下频道</p>
            <ul>
                <li v-for="(item,index) in addlist" :key="index" @click="addCategory(index)">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import HeadNormal from '@/components/HeadNormal.vue'
export default {
    data() {
        return {
            list: [],
            addlist: []
        }
    },
    components: {
        HeadNormal
    },
    methods: {
        editcategory(data) {
            const config = { url: '/category' }
            if (localStorage.getItem("token")) {
                config.headers = { Authorization: localStorage.getItem("token") }
            }
            this.$axios(config).then(res => {
                const { data } = res.data
                if (localStorage.getItem("token")) {
                    data.splice(0, 2)
                }else{
                    data.splice(0,1)
                }
                this.list = data
            })
        },
        deleteCategory(index) {
            // event.path[0].style.backgroundColor = '#f0f0f0';
            this.addlist = [...this.addlist, ...this.list.splice(index, 1)]
            
            const config = { url: '/category',method:'post' ,data:this.list.splice(index, 1).name}
            if (localStorage.getItem("token")) {
                config.headers = { Authorization: localStorage.getItem("token") }
            }
            this.$axios(config).then(res => {
                console.log(res.data)
                // const { data } = res.data
                // if (localStorage.getItem("token")) {
                //     data.splice(0, 2)
                // }else{
                //     data.splice(0,1)
                // }
                // data.splice(index,1)
                // console.log(data)
                // this.list = data
            })
            
        },
        addCategory(index) {
            this.editcategory()
            this.list = [...this.list, ...this.addlist.splice(index, 1)]
        }
    },
    mounted() {
        this.editcategory()
    }
}
</script>

<style scoped lang="less">
.category {
    padding: 20px;
}

p {
    margin: 20px 0;
    color: #999;
    font-size: 14px;
}

ul {
    display: flex;
    flex-wrap: wrap;
    li {
        width: 20%;
        border: 1px solid #ddd;
        margin-right: 23px;
        margin-bottom: 10px;
        line-height: 30 / 360 *100vw;
        text-align: center;
        &:nth-child(4n) {
            margin-right: 0
        }
    }
}
</style>
