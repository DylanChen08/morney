type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number //数据类型
    createAt?: Date //类/构造函数
}
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

interface Window {
    tagList: Tag[];
    createTag: (name: string) => void
    removeTag: (id: string) => boolean
    updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    findTag: (id: string, name: string) => Tag
    recordList: RecordItem[]
    createRecord: (record: RecordItem) => void
}
