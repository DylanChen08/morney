import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [],
        createRecordError: null,
        createTagError: null,
        tagList: [],
        currentTag: undefined
    } as RootState,
    mutations: {
        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },
        updateTag(state, payload: { id: string, name: string }) {
            const {id, name} = payload;
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复了');
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTags');
                }
            }
        },
        removeTag(state, id: string) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                state.tagList.splice(index, 1);
                store.commit('saveTags');
                router.back();
            } else {
                window.alert('删除失败');
            }

        },
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state, record: RecordItem) {
            const record2 = clone(record);
            record2.createdAt = record2.createdAt || new Date().toISOString();
            state.recordList.push(record2);
            store.commit('saveRecords');
        },
        saveRecords(state) {
            window.localStorage.setItem('recordList',
                JSON.stringify(state.recordList));
        },
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
            if (!state.tagList || state.tagList.length === 0) {
                //初始化数组
                let tagTypes3 = [//对照表
                    {chinese: "衣服", eng: "clothes",mark:"initialization"},
                    {chinese: "食品", eng: "food",mark:"initialization"},
                    {chinese: "住宿", eng: "house",mark:"initialization"},
                    {chinese: "旅行", eng: "travel",mark:"initialization"},
                    {chinese: "礼物", eng: "presents",mark:"initialization"},
                    {chinese: "聚餐", eng: "party",mark:"initialization"},
                    {chinese: "约会", eng: "dating",mark:"initialization"}
                ];
                let tagTypes2 = ["衣服", "食品", "住宿", "旅行", "礼物", "聚餐", "约会"]
                tagTypes2.map(tag => {
                    store.commit('createTag', tag);
                })
            }
        },
        createTag(state, name: string) {
            state.createTagError = null;
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                state.createTagError = new Error('tag name duplicated');
                return;
            }
            const id = createId().toString();
            state.tagList.push({id, name: name});
            store.commit('saveTags');
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
    }
});

export default store;
