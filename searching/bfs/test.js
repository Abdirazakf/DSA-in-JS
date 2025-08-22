import {Node,levelOrder} from './main.js'

function runTests() {
    let testsPassed = 0
    let testsFailed = 0
    
    function assert(condition, testName) {
        if (condition) {
            console.log(`✓ ${testName}`)
            testsPassed++
        } else {
            console.error(`✗ ${testName}`)
            testsFailed++
        }
    }
    
    function arraysEqual(a, b) {
        if (a.length !== b.length) return false
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false
        }
        return true
    }
    
    // Test 1: Empty tree
    {
        const result = levelOrder(null)
        assert(arraysEqual(result, []), "Empty tree should return empty array")
    }
    
    // Test 2: Single node tree
    {
        const root = new Node(1)
        const result = levelOrder(root)
        assert(arraysEqual(result, [1]), "Single node tree should return [1]")
    }
    
    // Test 3: Complete binary tree
    {
        //       1
        //      / \
        //     2   3
        //    / \ / \
        //   4  5 6  7
        const root = new Node(1)
        root.left = new Node(2)
        root.right = new Node(3)
        root.left.left = new Node(4)
        root.left.right = new Node(5)
        root.right.left = new Node(6)
        root.right.right = new Node(7)
        
        const result = levelOrder(root)
        assert(arraysEqual(result, [1, 2, 3, 4, 5, 6, 7]), 
               "Complete binary tree should traverse level by level")
    }
    
    // Test 4: Left-skewed tree
    {
        //     1
        //    /
        //   2
        //  /
        // 3
        const root = new Node(1)
        root.left = new Node(2)
        root.left.left = new Node(3)
        
        const result = levelOrder(root)
        assert(arraysEqual(result, [1, 2, 3]), 
               "Left-skewed tree should traverse correctly")
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
        
        const result = levelOrder(root)
        assert(arraysEqual(result, [1, 2, 3]), 
               "Right-skewed tree should traverse correctly")
    }
    
    // Test 6: Unbalanced tree
    {
        //       1
        //      / \
        //     2   3
        //    /     \
        //   4       5
        //  /         \
        // 6           7
        const root = new Node(1)
        root.left = new Node(2)
        root.right = new Node(3)
        root.left.left = new Node(4)
        root.right.right = new Node(5)
        root.left.left.left = new Node(6)
        root.right.right.right = new Node(7)
        
        const result = levelOrder(root)
        assert(arraysEqual(result, [1, 2, 3, 4, 5, 6, 7]), 
               "Unbalanced tree should traverse level by level")
    }
    
    // Test 7: Tree with string values
    {
        const root = new Node("A")
        root.left = new Node("B")
        root.right = new Node("C")
        root.left.left = new Node("D")
        root.left.right = new Node("E")
        
        const result = levelOrder(root)
        assert(arraysEqual(result, ["A", "B", "C", "D", "E"]), 
               "Tree with string values should work correctly")
    }
    
    // Test 8: Tree with negative numbers
    {
        const root = new Node(-1)
        root.left = new Node(-2)
        root.right = new Node(-3)
        root.left.left = new Node(-4)
        
        const result = levelOrder(root)
        assert(arraysEqual(result, [-1, -2, -3, -4]), 
               "Tree with negative numbers should work correctly")
    }
    
    // Test 9: Tree with duplicate values
    {
        const root = new Node(1)
        root.left = new Node(2)
        root.right = new Node(2)
        root.left.left = new Node(3)
        root.right.right = new Node(3)
        
        const result = levelOrder(root)
        assert(arraysEqual(result, [1, 2, 2, 3, 3]), 
               "Tree with duplicate values should preserve all occurrences")
    }
    
    // Test 10: Large tree performance test
    {
        //         1
        //       /   \
        //      2     3
        //     / \   / \
        //    4   5 6   7
        //   / \ / \
        //  8  9 10 11
        const root = new Node(1)
        root.left = new Node(2)
        root.right = new Node(3)
        root.left.left = new Node(4)
        root.left.right = new Node(5)
        root.right.left = new Node(6)
        root.right.right = new Node(7)
        root.left.left.left = new Node(8)
        root.left.left.right = new Node(9)
        root.left.right.left = new Node(10)
        root.left.right.right = new Node(11)
        
        const result = levelOrder(root)
        assert(arraysEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), 
               "Larger tree should traverse all nodes in correct order")
    }
    
    // Summary
    console.log("\n" + "=".repeat(40))
    console.log(`Tests Passed: ${testsPassed}`)
    console.log(`Tests Failed: ${testsFailed}`)
    console.log(`Total Tests: ${testsPassed + testsFailed}`)
    console.log("=".repeat(40))
    
    return testsFailed === 0
}

// Run the tests
console.log("Running BFS Test Suite...\n")
const allTestsPass = runTests()

if (allTestsPass) {
    console.log("\n✅ All tests passed!")
} else {
    console.log("\n❌ Some tests failed. Please review the implementation.")
}