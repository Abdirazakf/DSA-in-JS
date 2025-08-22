export class Node {
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
    }
}

export function levelOrder(root){
    if (!root){
        return []
    }

    const sol = []
    const queue = [root]

    while (queue.length > 0){
        let currentNode = queue.shift()
        sol.push(currentNode.value)

        if (currentNode.left){
            queue.push(currentNode.left)
        }

        if (currentNode.right){
            queue.push(currentNode.right)
        }
    }

    return sol
}