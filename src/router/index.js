import Vue from "vue"
import VueRouter from "vue-router" //引入vue-router
import Logined from "@/components/common/Login.vue"//引入Login

import Shome from "@/components/Students/Home.vue"//引入学生端主页面
import myMajor from "@/components/Students/myMajor.vue"
import myCourse from "@/components/Students/myCourse.vue"
import myGrowth from "@/components/Students/myGrowth.vue"
import myPar from "@/components/Students/myPar.vue"
import myExam from "@/components/Students/myExam.vue"
import mine from "@/components/Students/mine.vue"
import myQuestion from "@/components/Students/myQuestion.vue"
//----------------------------------------------------------------
import Thome from "@/components/Teachers/Home.vue"//引入教师端的主页面
import myMajorT from "@/components/Teachers/myMajorT.vue"//
import myCourseT from "@/components/Teachers/myCourseT.vue"//
import examManager from "@/components/Teachers/examManager.vue"//
import stuManager from "@/components/Teachers/stuManager.vue"//
import courseManager from "@/components/Teachers/courseManager.vue"//
import myContributions from "@/components/Teachers/myContributions.vue"//
import myAnswer from "@/components/Teachers/myAnswer.vue"//
import MasterSetting from "@/components/Teachers/MasterSetting.vue"//内容维护详情页

Vue.use(VueRouter) //在vue对象中使用vue-router

//路由管理器
const routes = [
    {
        path: '/', 
        redirect: '/logined'   //路由重定向 当用户访问根目录时，重定向到logined路径
    },
    {
        path: '/logined',
        component: Logined
    },
    // 学生端
    {
        path: '/student',
        component: Shome,
        children: [
            {//我的专业
                path: 'myMajor',
                component: myMajor,
                name: 'myMajor'
            },
            {//我的课程
                path: 'myCourse',
                component: myCourse,
                name: 'myCourse'
            },
            {//我的成长
                path: 'myGrowth',
                component: myGrowth,
                name: 'myGrowth'
            },
            {//我的参与
                path: 'myPar',
                component: myPar,
                name: 'myPar'
            },
            {//我的考试
                path: 'myExam',
                component: myExam,
                name: 'myExam'
            },
            {//我~
                path: 'mine',
                component: mine,
                name: 'mine'
            },
            {//我的提问
                path: 'myQuestion',
                component: myQuestion,
                name: 'myQuestion'
            },
        ]
    },
    //教师端
    {
        path: '/teacher',
        component: Thome,
        children: [
            {//我教的专业
                path: 'myMajorT',
                component: myMajorT,
                name: 'myMajorT'
            },
            {//我教的课程
                path: 'myCourseT',
                component: myCourseT,
                name: 'myCourseT'
            },
            {//考试管理
                path: 'examManager',
                component: examManager,
                name: 'examManager'
            },
            {//学员管理
                path: 'stuManager',
                component: stuManager,
                name: 'stuManager'
            },
            {//课程管理
                path: 'courseManager',
                component: courseManager,
                name: 'courseManager'
            },
            {//我的贡献
                path: 'myContributions',
                component: myContributions,
                name: 'myContributions'
            },
            {//在线解答
                path: 'myAnswer',
                component: myAnswer,
                name: 'myAnswer'
            },
            {//内容维护详情页
                path: 'MasterSetting',
                component: MasterSetting,
                name: 'MasterSetting'
            }
            
        ]
    }
]

const router = new VueRouter({//将routes注册待router中
    routes
})

export default router;



