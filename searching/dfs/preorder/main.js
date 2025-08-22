export class Node {
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
    }
}

export function Preorder(root, sol = []){
    if (!root){
        return sol
    }
    
    sol.push(root.value)
    Preorder(root.left,sol)
    Preorder(root.right,sol)
    return sol
}