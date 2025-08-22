import { Node,Preorder } from "./main.js"

function runTests() {
    let testsPassed = 0
    let testsFailed = 0
    
    function assert(condition, testName, expected, actual) {
        if (condition) {
            console.log(`✓ ${testName}`)
            testsPassed++
        } else {
            console.error(`✗ ${testName}`)
            console.error(`  Expected: [${expected}]`)
            console.error(`  Actual: ${actual === undefined ? 'undefined' : `[${actual}]`}`)
            testsFailed++
        }
    }
    
    function arraysEqual(a, b) {
        if (!a || !b) return false
        if (a.length !== b.length) return false
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false
        }
        return true
    }
    
    console.log("Testing:")
    console.log("-".repeat(40))
        
    // Test 1: Empty tree
    {
        const result = Preorder(null)
        const expected = []
        assert(arraysEqual(result, expected), 
               "Fixed: Empty tree", expected, result)
    }
    
    // Test 2: Single node
    {
        const root = new Node(1)
        const result = Preorder(root)
        const expected = [1]
        assert(arraysEqual(result, expected), 
               "Fixed: Single node", expected, result)
    }
    
    // Test 3: Complete binary tree
    {
        const root = new Node(1)
        root.left = new Node(2)
        root.right = new Node(3)
        root.left.left = new Node(4)
        root.left.right = new Node(5)
        root.right.left = new Node(6)
        root.right.right = new Node(7)
        
        const result = Preorder(root)
        const expected = [1, 2, 4, 5, 3, 6, 7]
        assert(arraysEqual(result, expected), 
               "Fixed: Complete binary tree", expected, result)
    }
    
    // Test 4: Unbalanced tree
    {
        //       1
        //      / \
        //     2   3
        //    /     \
        //   4       5
        //  / \       \
        // 6   7       8
        const root = new Node(1)
        root.left = new Node(2)
        root.right = new Node(3)
        root.left.left = new Node(4)
        root.right.right = new Node(5)
        root.left.left.left = new Node(6)
        root.left.left.right = new Node(7)
        root.right.right.right = new Node(8)
        
        const result = Preorder(root)
        const expected = [1, 2, 4, 6, 7, 3, 5, 8]
        assert(arraysEqual(result, expected), 
               "Fixed: Unbalanced tree", expected, result)
    }
    
    // Test 5: Tree with string values
    {
        const root = new Node("A")
        root.left = new Node("B")
        root.right = new Node("C")
        root.left.left = new Node("D")
        root.left.right = new Node("E")
        
        const result = Preorder(root)
        const expected = ["A", "B", "D", "E", "C"]
        assert(arraysEqual(result, expected), 
               "Fixed: String values", expected, result)
    }
    
    // Test 6: Tree with negative numbers
    {
        const root = new Node(-1)
        root.left = new Node(-2)
        root.right = new Node(-3)
        root.left.left = new Node(-4)
        
        const result = Preorder(root)
        const expected = [-1, -2, -4, -3]
        assert(arraysEqual(result, expected), 
               "Fixed: Negative numbers", expected, result)
    }
    
    // Test 7: Tree with duplicate values
    {
        const root = new Node(1)
        root.left = new Node(2)
        root.right = new Node(2)
        root.left.left = new Node(3)
        root.left.right = new Node(3)
        root.right.left = new Node(3)
        
        const result = Preorder(root)
        const expected = [1, 2, 3, 3, 2, 3]
        assert(arraysEqual(result, expected), 
               "Fixed: Duplicate values", expected, result)
    }
    
    // Test 8: Only left children
    {
        const root = new Node(1)
        root.left = new Node(2)
        root.left.left = new Node(3)
        root.left.left.left = new Node(4)
        root.left.left.left.left = new Node(5)
        
        const result = Preorder(root)
        const expected = [1, 2, 3, 4, 5]
        assert(arraysEqual(result, expected), 
               "Fixed: Only left children", expected, result)
    }
    
    // Test 9: Only right children
    {
        const root = new Node(1)
        root.right = new Node(2)
        root.right.right = new Node(3)
        root.right.right.right = new Node(4)
        root.right.right.right.right = new Node(5)
        
        const result = Preorder(root)
        const expected = [1, 2, 3, 4, 5]
        assert(arraysEqual(result, expected), 
               "Fixed: Only right children", expected, result)
    }
    
    // Summary
    console.log("\n" + "=".repeat(40))
    console.log(`Tests Passed: ${testsPassed}`)
    console.log(`Tests Failed: ${testsFailed}`)
    console.log(`Total Tests: ${testsPassed + testsFailed}`)
    console.log("=".repeat(40))
    
    return testsFailed === 0
}

// Run all tests
console.log("DFS Preorder Traversal Test Suite")
console.log("=" * 40 + "\n")

runTests()