import clone from "@/lib/clone.ts";

const localStorageKeyName = 'recordList'
const recordListModel = {
    data: [] as RecordItem[],
    // clone(data: RecordItem[] | RecordItem) {
    //     return JSON.parse(JSON.stringify(data)) as RecordItem[]
    // },
    create() {
        // @ts-ignore
        const record_mod: RecordItem = clone(record)
        record_mod.createAt = new Date()
        this.data.push(record_mod)
    },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") as RecordItem[]
        return this.data
    },
    save() {
        window.localStorage.setItem('recordList', JSON.stringify(this.data))
    }
}

export {recordListModel}


