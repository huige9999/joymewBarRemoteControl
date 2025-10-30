import { Button, Checkbox, Dialog, Field, Form, Icon, Picker, Popover, Popup, Swipe, SwipeItem, Switch, Toast } from 'vant';
import Vue from 'vue';
import App from './App.vue';
import './assets/styles/public.css';
import './assets/fonts/iconfont.css';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Toast);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Switch);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Icon);
Vue.use(Popover);

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default app;
