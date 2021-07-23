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
import presets from "@/lib/presets";

import {NumberKeyboard} from 'vant';

Vue.use(NumberKeyboard);
Vue.config.productionTip = false;

presets.autoScroll()
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);


Vue.use(VAnimateCss);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');



