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
import {recordListModel} from "@/models/recordListModel";


Vue.config.productionTip = false;


Vue.use(VAnimateCss);
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

//record store
window.recordList = recordListModel.fetch()
window.createRecord = (record: RecordItem) => {
    //@ts-ignore
    return recordListModel.save(record)
}

//tag store
//@ts-ignore
window.tagList = tagListModel.fetch();
window.findTag = (id: string) => {
    return window.tagList.filter(t => t.id === id)[0]
}
window.createTag = (name: string) => {
    const message = tagListModel.create(name)
    if (message === "duplicated") {
        window.alert('标签重复')
    } else if (message === 'success') {
        console.log('标签创建成功')
    }
}
window.removeTag = (id: string) => {
    if (!tagListModel.remove(id)) {
        console.log('fail to deleted ![window]');
        return false
    } else {
        console.log('deleted successfully ![window]');
        return true
    }
}
window.updateTag = (id: string, name: string) => {
    return tagListModel.update(id, name);
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
