import {mapActions} from "vuex";

const localStorageKeyName = 'tagList'
type Tag = {
    id: any
    name: string
}
type TagListModel = {
    //  string[] => 空字符串
    //  string   => 非空字符串
    data: string[]
    fetch: () => string[]
    create: (name: string) => 'success' | 'duplicated'
    save: () => void
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    remove: (id: string) => boolean
}
// @ts-ignore
const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]")
        return this.data
    },
    create(name: string) {
        // @ts-ignore
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            return 'duplicated'
        }
        // @ts-ignore
        this.data.push({id: name, name: name});
        this.save();
        return 'success'
    },
    save() {
        window.localStorage.setItem('tagList', JSON.stringify(this.data))
    },
    update(id, name) {
        // @ts-ignore
        const idList = this.data.map(item => item.id)
        if (idList.indexOf(id) >= 0) {
            // console.log(111);
            // @ts-ignore
            const names = this.data.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                console.log(222);
                console.log(name);
                return 'duplicated';
            } else {
                console.log(333);
                // @ts-ignore
                const tag = this.data.filter(item => item.id === id)[0];
                console.log(tag);
                // @ts-ignore
                tag.name = name;
                this.save();
                return 'success';
            }
        } else {
            return 'not found';
        }
    },
    remove(id: string) {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            // @ts-ignore
            if (this.data[i].id === id) {
                index = i;
                break;
            }
        }
        this.data.splice(index, 1);
        this.save();
        return true;
    },

}

export {tagListModel}


