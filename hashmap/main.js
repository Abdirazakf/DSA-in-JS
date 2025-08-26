class Node {
    constructor(key, value) {
        this.key = key
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
    
    append(key,value){
        let newNode = new Node(key,value)
        if (!this.head){
            this.head = newNode
            this.tail = newNode
        } else {
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++
    }
}

class HashMap {
    constructor() {
        this.capacity = 16
        this.loadFactor = 0.8
        this.array = new Array(this.capacity)
        this.storedKeys = 0
    }
    
    hash(key) {
        let hashCode = 0
        const primeNum = 31
        
        for (let i = 0; i < key.length; i++){
            hashCode = (primeNum * hashCode + key.charCodeAt(i)) % this.capacity
        }
        
        return hashCode
    }
    
    set(key, value) {
        let hashCode = this.hash(key)
        
        if (!this.array[hashCode]){
            const list = new LinkedList
            list.append(key,value)
            this.array[hashCode] = list
        } else {
            let current = this.array[hashCode].head
            while (current){
                if (current.key == key){
                    current.value = value
                    return this.array
                }
                current = current.next
            }
            this.array[hashCode].append(key,value)
        }
        this.storedKeys++
        this.checkLoadFactor()
        return this.array
    }

    checkLoadFactor() {
        const load = this.storedKeys / this.capacity

        if (load >= this.loadFactor) {
            this.rehash()
        }
    }

    rehash() {
        console.log('Rehashing')
        const oldArray = this.array
        this.capacity *= 2
        this.array = new Array(this.capacity)
        this.storedKeys = 0

        for (const bucket of oldArray) {
            if (bucket) {
                let current = bucket.head

                while(current) {
                    this.rehashLinkedLists(current.key, current.value)
                    current = current.next
                }

            }
        }
    }

    rehashLinkedLists(key, value) {
        let hashCode = this.hash(key)

        if (!this.array[hashCode]) {
            const list = new LinkedList
            list.append(key,value)
            this.array[hashCode] = list
        } else {
            this.array[hashCode].append(key,value)
        }
        this.storedKeys++
    }

    get(key) {
        let hashCode = this.hash(key)
        let current = this.array[hashCode].head

        while (current){
            if (current.key === key){
                return current.value
            } else {
                current = current.next
            }
        }
        return null
    }

    has(key) {
        let hashCode = this.hash(key)
        let current = this.array[hashCode].head

        while (current){
            if (current.key === key){
                return true
            } else {
                current = current.next
            }
        }

        return false
    }

    remove(key) {
        let hashCode = this.hash(key)
        
        if (!this.array[hashCode]){
            return 'Key not in hash map'
        }

        let current = this.array[hashCode].head
        let previous = null

        while(current) {
            if(current.key === key) {
                if (!previous) {
                    this.array[hashCode].head = current.next

                    if (!current.next) {
                        this.array[hashCode].tail = null
                    }
                } else {
                    previous.next = current.next
                    
                    if (current === this.array[hashCode].tail) {
                        this.array[hashCode].tail = previous
                    }
                }
                this.array[hashCode].length--
                this.storedKeys--
                
                if (this.array[hashCode].length === 0) {
                    this.array[hashCode] = undefined
                }
                
                return this.array
            }
            previous = current
            current = current.next
        }

        return `Key not in hash map`
    }

    length() {
        return this.storedKeys
    }

    clear() {
        this.array = new Array(16)
        this.storedKeys = 0
        return this.array
    }

    keys() {
        let list = []
        
        for (let i = 0; i < this.array.length; i++){
            if (this.array[i]) {
                let current = this.array[i].head
                while (current) {
                    list.push(current.key)
                    current = current.next
                }
            }
        }

        return list
    }

    values() {
        let list = []
        
        for (let i = 0; i < this.array.length; i++){
            if (this.array[i]) {
                let current = this.array[i].head
                while (current) {
                    list.push(current.value)
                    current = current.next
                }
            }
        }

        return list
    }

    entries() {
        let list = []
        
        for (let i = 0; i < this.array.length; i++){
            if (this.array[i]) {
                let subarray = []
                let current = this.array[i].head
                while (current) {
                    if (subarray.length > 1){
                        let newSubArray = []
                        newSubArray.push(current.key)
                        newSubArray.push(current.value)
                        list.push(newSubArray)
                    } else {
                        subarray.push(current.key)
                        subarray.push(current.value)
                        list.push(subarray)
                    }
                    current = current.next
                }
            }
        }

        return list
    }
}

const test = new HashMap
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')
console.log(test)