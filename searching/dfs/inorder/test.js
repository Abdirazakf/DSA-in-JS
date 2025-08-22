import { Node,Inorder } from "./main.js";

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
            console.error(`  Actual: [${actual}]`)
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
    
    console.log("Testing Inorder Traversal:")
    console.log("-".repeat(40))
    
    // Test 1: Empty tree
    {
        const result = Inorder(null)
        const expected = []
        assert(arraysEqual(result, expected), 
               "Empty tree should return empty array", expected, result)
    }
    
    // Test 2: Single node tree
    {
        const root = new Node(1)
        const result = Inorder(root)
        const expected = [1]
        assert(arraysEqual(result, expected), 
               "Single node tree should return [1]", expected, result)
    }
    
    // Test 3: Complete binary tree
    {
        //       4
        //      / \
        //     2   6
        //    / \ / \
        //   1  3 5  7
        const root = new Node(4)
        root.left = new Node(2)
        root.right = new Node(6)
        root.left.left = new Node(1)
        root.left.right = new Node(3)
        root.right.left = new Node(5)
        root.right.right = new Node(7)
        
        const result = Inorder(root)
        const expected = [1, 2, 3, 4, 5, 6, 7]  // Inorder: left, root, right (sorted for BST!)
        assert(arraysEqual(result, expected), 
               "Complete binary tree inorder", expected, result)
    }
    
    // Test 4: Left-skewed tree
    {
        //     3
        //    /
        //   2
        //  /
        // 1
        const root = new Node(3)
        root.left = new Node(2)
        root.left.left = new Node(1)
        
        const result = Inorder(root)
        const expected = [1, 2, 3]
        assert(arraysEqual(result, expected), 
               "Left-skewed tree inorder", expected, result)
    }
    
    // Test 5: Right-skewed tree
    {
        // 1
        //  \
        //   2
        //    \
        //     3
        const root = new Node(1)
        root.right = new Node(2)
        root.right.right = new Node(3)
        
        const result = Inorder(root)
        const expected = [1, 2, 3]
        assert(arraysEqual(result, expected), 
               "Right-skewed tree inorder", expected, result)
    }
    
    // Test 6: Binary Search Tree (should give sorted output)
    {
        //       10
        //      /  \
        //     5    15
        //    / \   / \
        //   3   7 12  20
        //  /   / \    \
        // 1   6   8   25
        const root = new Node(10)
        root.left = new Node(5)
        root.right = new Node(15)
        root.left.left = new Node(3)
        root.left.right = new Node(7)
        root.right.left = new Node(12)
        root.right.right = new Node(20)
        root.left.left.left = new Node(1)
        root.left.right.left = new Node(6)
        root.left.right.right = new Node(8)
        root.right.right.right = new Node(25)
        
        const result = Inorder(root)
        const expected = [1, 3, 5, 6, 7, 8, 10, 12, 15, 20, 25]  // Sorted!
        assert(arraysEqual(result, expected), 
               "BST inorder should give sorted output", expected, result)
    }
    
    // Test 7: Unbalanced tree
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
        
        const result = Inorder(root)
        const expected = [6, 4, 7, 2, 1, 3, 5, 8]
        assert(arraysEqual(result, expected), 
               "Unbalanced tree inorder", expected, result)
    }
    
    // Test 8: Tree with string values
    {
        //       D
        //      / \
        //     B   F
        //    / \ / \
        //   A  C E  G
        const root = new Node("D")
        root.left = new Node("B")
        root.right = new Node("F")
        root.left.left = new Node("A")
        root.left.right = new Node("C")
        root.right.left = new Node("E")
        root.right.right = new Node("G")
        
        const result = Inorder(root)
        const expected = ["A", "B", "C", "D", "E", "F", "G"]  // Alphabetical order!
        assert(arraysEqual(result, expected), 
               "String values inorder", expected, result)
    }
    
    // Test 9: Tree with negative numbers
    {
        //       0
        //      / \
        //    -5   5
        //    / \   \
        //  -10 -2   10
        const root = new Node(0)
        root.left = new Node(-5)
        root.right = new Node(5)
        root.left.left = new Node(-10)
        root.left.right = new Node(-2)
        root.right.right = new Node(10)
        
        const result = Inorder(root)
        const expected = [-10, -5, -2, 0, 5, 10]  // Sorted including negatives
        assert(arraysEqual(result, expected), 
               "Negative numbers inorder", expected, result)
    }
    
    // Test 10: Tree with duplicate values
    {
        const root = new Node(2)
        root.left = new Node(1)
        root.right = new Node(3)
        root.left.left = new Node(1)
        root.left.right = new Node(2)
        root.right.left = new Node(3)
        root.right.right = new Node(3)
        
        const result = Inorder(root)
        const expected = [1, 1, 2, 2, 3, 3, 3]
        assert(arraysEqual(result, expected), 
               "Duplicate values preserved", expected, result)
    }
    
    // Test 11: Only left children (descending values)
    {
        const root = new Node(5)
        root.left = new Node(4)
        root.left.left = new Node(3)
        root.left.left.left = new Node(2)
        root.left.left.left.left = new Node(1)
        
        const result = Inorder(root)
        const expected = [1, 2, 3, 4, 5]
        assert(arraysEqual(result, expected), 
               "Only left children", expected, result)
    }
    
    // Test 12: Only right children (ascending values)
    {
        const root = new Node(1)
        root.right = new Node(2)
        root.right.right = new Node(3)
        root.right.right.right = new Node(4)
        root.right.right.right.right = new Node(5)
        
        const result = Inorder(root)
        const expected = [1, 2, 3, 4, 5]
        assert(arraysEqual(result, expected), 
               "Only right children", expected, result)
    }
    
    // Test 13: Mixed data types (numbers and strings)
    {
        const root = new Node(5)
        root.left = new Node("2")
        root.right = new Node(10)
        root.left.left = new Node("1")
        root.left.right = new Node(3)
        
        const result = Inorder(root)
        const expected = ["1", "2", 3, 5, 10]
        assert(arraysEqual(result, expected), 
               "Mixed data types", expected, result)
    }
    
    // Summary
    console.log("\n" + "=".repeat(40))
    console.log(`Tests Passed: ${testsPassed}`)
    console.log(`Tests Failed: ${testsFailed}`)
    console.log(`Total Tests: ${testsPassed + testsFailed}`)
    console.log("=".repeat(40))
    
    return testsFailed === 0
}

console.log("DFS Inorder Traversal Test Suite")
console.log("=".repeat(40) + "\n")

const allTestsPass = runTests()

if (allTestsPass) {
    console.log("\n✅ All tests passed! Your implementation is correct.")
} else {
    console.log("\n❌ Some tests failed. Please review the implementation.")
}