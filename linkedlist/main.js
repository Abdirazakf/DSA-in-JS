class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }
    
    append(value){
        let newNode = new Node(value)
        if (!this.head){
            this.head = newNode
            this.tail = newNode
            this.head.next = this.tail
        } else {
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++
    }
    
    prepend(value){
        let newNode = new Node(value)
        if (!this.head){
            this.head = newNode
            this.tail = newNode
            this.head.next = this.tail
        } else {
            newNode.next = this.head
            this.head = newNode
        }
        this.length++
    }
    
    size() {
        return this.length
    }
    
    getHead() {
        return this.head ? this.head.value : null
    }
    
    getTail() {
        return this.tail ? this.tail.value : null
    }
    
    createList(list) {
        let current = this.head
        
        while (current){
            list.push(current.value)
            current = current.next
        }
        
        return list
    }
    
    at(index){
        if (!this.head || index < 0 || index > this.length){
            return null
        }
        
        let list = []
        this.createList(list)
        
        return list[index]
    }
    
    pop() {
        if (!this.head){
            return null
        }
        
        let current = this.head
        
        while (current.next !== this.tail){
            current = current.next
        }
        
        let value = this.tail.value
        
        this.tail = current
        this.tail.next = null
        this.length--
        
        return value
    }
    
    contains(value) {
        if (!this.head){
            return false
        }
        
        let list = []
        this.createList(list)
        
        if (list.includes(value)){
            return true
        } else {
            return false
        }
    }
    
    find(value) {
        if (!this.head){
            return null
        }
        
        let list = []
        this.createList(list)
        
        for (let i = 0; i < list.length; i++){
            if (list[i] == value){
                return i
            }
        }
        
        return null
    }
    
    toString() {
        if (!this.head){
            return '[]'
        }
        
        let list = []
        this.createList(list)
        
        return `[${list.join(' -> ')}]`
    }
}
