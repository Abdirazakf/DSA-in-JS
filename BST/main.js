class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(root) {
        this.root = root
    }

    mergeSort(array) {
        if (array.length <= 1){
            return array
        }

        let mid = Math.floor(array.length / 2)
        let left = this.mergeSort(array.slice(0,mid))
        let right = this.mergeSort(array.slice(mid))

        let result = []
        let i = 0
        let j = 0

        while (i < left.length && j < right.length){
            if (left[i] <= right[j]) {
                result.push(left[i])
                i++
            } else {
                result.push(right[j])
                j++
            }
        }

        return result.concat(left.slice(i)).concat(right.slice(j))
    }

    removeDups(array) {        
        if (array.length === 0){
            return []
        }

        let prev = 0

        for (let i = 1; i < array.length; i++) {
            if (array[prev] !== array[i]){
                prev++
                array[prev] = array[i]
            }
        }

        return array.slice(0, prev + 1)
    }

    buildTree(array, start = 0, end = array.length - 1){
        if (start === 0 && end === array.length - 1) {
            array = this.mergeSort(array)
            array = this.removeDups(array)
            end = array.length - 1
        }

        if (start > end){
            return null
        }

        let mid = Math.floor((start + end) / 2)

        let node = new Node(array[mid])

        node.left = this.buildTree(array, start, mid - 1)

        node.right = this.buildTree(array, mid + 1, end)

        if (start === 0 && end === array.length - 1){
            this.root = node
        }

        return node
    }

    insert(value, node = this.root) {
        if (!node) {
            return new Node(value)
        }

        if (node.data === value){
            return node
        }

        if (value < node.data) {
            node.left = this.insert(value,node.left)
        } else if (value > node.data) {
            node.right = this.insert(value,node.right)
        }

        return node
    }

    deleteItem(value, node = this.root) {
        function getSuccessor(curr) {
            curr = curr.right
            while (curr && curr.left) {
                curr = curr.left
            }
            return curr
        }

        if (!node) {
            return node
        }

        if (value < node.data) {
            node.left = this.deleteItem(value,node.left)
        } else if (value > node.data) {
            node.right = this.deleteItem(value,node.right)
        } else {
            if (!node.left) {
                return node.right
            }

            if (!node.right) {
                return node.left
            }

            let successor = getSuccessor(node)
            node.data = successor.data
            node.right = this.deleteItem(successor.data, node.right)
        }
        return node
    }

    find(value, node = this.root) {
        if (!node) {
            return null
        }

        if (value === node.data) {
            return node
        }

        if (value < node.data) {
            return this.find(value,node.left)
        } else if (value > node.data) {
            return this.find(value,node.right)
        }
    }

    levelOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required')
        }

        const queue = [this.root]

        while (queue.length > 0) {
            const node = queue.shift()
            callback(node)

            if (node.left) {
                queue.push(node.left)
            }

            if (node.right) {
                queue.push(node.right)
            }
        }
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
    
    preOrderForEach(callback){
        if (typeof callback !== 'function') {
            throw Error('Callback function is required')
        }
        
        function traverse(node) {
            if (!node) {
                return
            }

            callback(node)
            traverse(node.left)
            traverse(node.right)
        }

        traverse(this.root)
    }

    inOrderForEach(callback){
        if (typeof callback !== 'function') {
            throw Error('Callback function is required')
        }
        
        function traverse(node) {
            if (!node) {
                return
            }

            traverse(node.left)
            callback(node)
            traverse(node.right)
        }

        traverse(this.root)
    }

    postOrderForEach(callback){
        if (typeof callback !== 'function') {
            throw Error('Callback function is required')
        }
        
        function traverse(node) {
            if (!node) {
                return
            }

            traverse(node.left)
            traverse(node.right)
            callback(node)
        }

        traverse(this.root)
    }
    
    getHeight(node) {
        if (!node) {
            return -1
        }
        
        return 1 + Math.max(this.getHeight(node.left),this.getHeight(node.right))
    }

    height(value) {
        const target = this.find(value)

        if (!target) {
            return null
        }

        return this.getHeight(target)
    }

    depth(value, node = this.root, current = 0) {
        if (!node) {
            return -1
        }

        if (node.data === value) {
            return current
        }

        if (value < node.data) {
            return this.depth(value,node.left,current + 1)
        } else if (value > node.data) {
            return this.depth(value,node.right,current + 1)
        }

        return current
    }

    isBalanced(node = this.root) {
        if (!node) {
            return true
        }

        const leftHeight = this.getHeight(node.left)
        const rightHeight = this.getHeight(node.right)

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false
        }

        return this.isBalanced(node.left) && this.isBalanced(node.right)
    }

    inorder(node = this.root, array = []) {
        if (!node) {
            return node
        }

        this.inorder(node.left,array)
        array.push(node.data)
        this.inorder(node.right,array)

        return array
    }

    rebalance() {
        if (!this.isBalanced()) {
            let newArray = []
            newArray = this.inorder()
            this.buildTree(newArray)
        }
    }
}

// Function to generate random array
function generateRandomArray(size, max) {
    const array = []
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * max))
    }
    return array
}

function driverScript() { 

    // 1. Create BST from random numbers
    console.log("1. Creating BST from random numbers < 100...")
    const randomArray = generateRandomArray(15, 100)
    console.log("Random array:", randomArray)
    
    const tree = new Tree()
    tree.buildTree(randomArray)
    
    console.log("\nTree structure:")
    tree.prettyPrint()
    
    // 2. Confirm tree is balanced
    console.log("\n2. Is tree balanced?", tree.isBalanced())
    
    // 3. Print all traversal orders
    console.log("\n3. Traversal orders:")
    
    const levelOrder = []
    tree.levelOrderForEach(node => levelOrder.push(node.data))
    console.log("Level order:", levelOrder)
    
    const preOrder = []
    tree.preOrderForEach(node => preOrder.push(node.data))
    console.log("Pre order:  ", preOrder)
    
    const postOrder = []
    tree.postOrderForEach(node => postOrder.push(node.data))
    console.log("Post order: ", postOrder)
    
    // In order
    const inOrder = []
    tree.inOrderForEach(node => inOrder.push(node.data))
    console.log("In order:   ", inOrder)
    
    // 4. Unbalance the tree by adding numbers
    console.log("\n4. Adding numbers > 100 to unbalance tree...")
    const largeNumbers = [105, 110, 115, 120, 125, 130, 135]
    largeNumbers.forEach(num => {
        tree.root = tree.insert(num, tree.root)
        console.log(`   Added ${num}`)
    })
    
    console.log("\nTree after adding large numbers:")
    tree.prettyPrint()
    
    // 5. Confirm tree is unbalanced
    console.log("\n5. Is tree balanced?", tree.isBalanced())
    
    // 6. Balance the tree
    console.log("\n6. Rebalancing tree...")
    tree.rebalance()
    
    console.log("\nTree after rebalancing:")
    tree.prettyPrint()
    
    // 7. Confirm tree is balanced
    console.log("\n7. Is tree balanced?", tree.isBalanced())
    
    console.log("\n=== Driver Script Complete ===")
}

// Run the driver script
driverScript()