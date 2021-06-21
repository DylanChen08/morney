import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
// @ts-ignore
import VAnimateCss from 'v-animate-css';
import {tagListModel} from "@/models/tagListModel";


Vue.config.productionTip = false;


Vue.use(VAnimateCss);
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);
// @ts-ignore

window.tagList = tagListModel.fetch();
window.createTag = (name: string) => {
    const message = tagListModel.create(name)
    if (message === "duplicated") {
        window.alert('标签重复')
    } else if (message === 'success') {
        console.log('标签创建成功')
    }
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
