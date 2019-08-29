const state = {
    isBreadcrumbShow: false,
    breadcrumbList: [],  //父页面path必须可以在子页面路由中检索
    isFirst: true,
    tabList: [],
    tabIndex: "1"
}

const getters = {

}

const actions = { //可异步
    updateBreadcrumb({ commit }, payload) {
        commit('updateBreadcrumb', payload)
    },
    toggleBreadcrumb({ commit }, payload) {
        commit('toggleBreadcrumb', payload)
    },
    initTab({ commit }) {
        commit('initTab')
    },
    addTab({ commit }, payload) {
        commit('addTab', payload)
    },
    removeTab({ commit }, payload) {
        commit('removeTab', payload)
    },
    updateIndex({ commit }, payload) {
        commit('updIndex', payload)
    },
    initBreadcrumb({ commit }, payload) {
        commit('initBreadcrumb', payload)
    }
}

const mutations = { //同步
    updateBreadcrumb(state, payload) {
        let nowState = state;//拷贝
        let list = nowState.breadcrumbList; //tab列表
        let oldVal = payload.oldVal; //旧route信息
        let newVal = payload.newVal; //新route信息
        let newPath = newVal.path.toLowerCase(); 
        let oldPath = oldVal.path.toLowerCase();
        let newName = newVal.name;
        let v = {};
        if (newPath == "/" || newPath == "/desktop" || newPath == oldPath) {
            return
        }
        if (newPath.indexOf(oldPath) == -1) { //不是父子关系
            if (state.isFirst) {
                state.isFirst = false;
            } else {
                let len = list.length;
                let index = 0;
                for (let i = 1; i < len; i++) { //查找最后一个path的根path的索引
                    if (list[len - 1].path.indexOf(list[i].path) == 0 &&
                        list[len - 1].path != list[i].path) {
                        index = i;
                        break;
                    }
                }
                if (!index) {
                    list.pop();
                } else {
                    list.splice(index, len - index);
                }
            }
        }
        v.path = newPath;
        v.name = newName;
        list.push(v);
        nowState.breadcrumbList = list;
    },
    toggleBreadcrumb(state, payload) {
        if (payload == '/desktop') {
            state.isBreadcrumbShow = false
        } else {
            state.isBreadcrumbShow = true
        }
    },
    addTab(state, payload) {
        let newVal = payload.newVal; //新route信息
        let nowPath = newVal.path.toLowerCase();//传入的路由地址
        let nowState = state;//拷贝
        let list = nowState.tabList; //tab列表
        if (nowPath != "/") {
            for (let i = 0; i < list.length; i++) {
                if (list[i].path == nowPath) {
                    state.tabIndex = (i + 1).toString();//激活已有tab操作
                    return
                }
            }
            let newTab = {};     //构造tab项对象
            newTab.title = newVal.name; //显示的名称
            newTab.name = (list.length + 1).toString(); //设定的name，用于tab-remove事件获取
            newTab.close = "closable";  //除了图标页，其他可关闭
            newTab.path = nowPath;      //存储路由路径用于切换跳转
            state.tabList.push(newTab);  //新增tab操作
            state.tabIndex = (list.length).toString(); //更新当前激活tab索引
        }
        document.querySelector(".el-main").scrollTop = 0
    },
    removeTab(state, payload) {
        let name = payload; //传入的tab的名称
        let nowState = state;//拷贝state
        let list = nowState.tabList; //tab列表
        let idx = 0;    //tab项符合条件的索引
        for (let i = 0; i < list.length; i++) {
            if (list[i].name == name) { //传入的tab的名称和tab列表单独项比较
                idx = i;       //得到索引
            }
        }
        for (let i = idx; i < list.length; i++) {
            list[i].name = (list[i].name * 1 - 1) + ''; //当前删除的索引之后的tab项更新name，name减去一
        }
        list.splice(idx, 1); //根据索引删除当前要删的项
        state.tabIndex = list.length + ''; //更新当前索引，激活当最后一项
        state.tabList = list; //更新state中tab的值
    },
    updIndex(state, payload) {
        state.tabIndex = payload; //更新当前索引
    },
    initTab(state, payload) { //所有的值都初始化
        let item = {
            title: "我的桌面",
            name: "1",
            path: "/desktop",
        }
        let idx = '1';
        state.tabList = [];
        state.tabList.push(item);
        state.tabIndex = idx;
    },
    initBreadcrumb(state, payload) {
        let item = {
            path: '/',
            name: '首页'
        }
        state.breadcrumbList = [];
        state.breadcrumbList.push(item);
        state.isBreadcrumbShow = true;
        state.isFirst = true;
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}