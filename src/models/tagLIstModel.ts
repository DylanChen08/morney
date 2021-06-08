const localStorageKeyName = 'tagList'
type Tag = {
    id: string
    name: string
}
type TagListModel = {
    //  string[] => 空字符串
    //  string   => 非空字符串
    data: string[]
    fetch: () => string[]
    create: (name: string) => 'success' | 'duplicated'
    save: () => void
}
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
    }

}

export {tagListModel}


