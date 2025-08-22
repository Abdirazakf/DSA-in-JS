export class Node {
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
    }
}

export function Inorder(root, sol = []){
    if (!root){
        return sol
    }

    Inorder(root.left,sol)
    sol.push(root.value)
    Inorder(root.right,sol)

    return sol
}