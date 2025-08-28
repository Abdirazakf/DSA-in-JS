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
    
    preorder(node = this.root,array = []){
        if (!node) {
            return array
        }
        
        array.push(node.data)
        this.preorder(node.left, array)
        this.preorder(node.right, array)
        
        return array
    }

    inorder(node = this.root, array = []) {
        if (!node) {
            return array
        }

        this.inorder(node.left,array)
        array.push(node.data)
        this.inorder(node.right,array)

        return array
    }

    postorder(node = this.root, array = []) {
        if (!node) {
            return array
        }

        this.postorder(node.left,array)
        this.postorder(node.right,array)
        array.push(node.data)

        return array
    }
}

let tree = new Tree
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
tree.buildTree(array)
console.log(tree)
console.log("Preorder:", tree.preorder())
console.log('Inorder:', tree.inorder())
console.log('Postorder:', tree.postorder())
tree.prettyPrint()