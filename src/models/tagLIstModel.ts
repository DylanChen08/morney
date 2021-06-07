const localStorageKeyName = 'tagList'
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
        if (this.data.indexOf(name) >= 0) {return 'duplicated'}
        this.data.push(name);
        this.save();
        return 'success'
    },
    save() {
        window.localStorage.setItem('tagList', JSON.stringify(this.data))
    }

}

export {tagListModel}


