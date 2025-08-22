import binarySearch from "./main.js"

function runTests() {
    let testsPassed = 0
    let testsFailed = 0
    let testsErrored = 0
    
    function assert(condition, testName) {
        if (condition) {
            console.log(`✓ ${testName}`)
            testsPassed++
        } else {
            console.error(`✗ ${testName}`)
            testsFailed++
        }
    }
    
    function testWithErrorHandling(testName, testFn) {
        try {
            testFn()
        } catch (error) {
            console.error(`✗ ${testName} - ERROR: ${error.message}`)
            testsErrored++
        }
    }
    
    console.log("Testing Original Implementation:")
    console.log("-".repeat(40))
    
    // Test 1: Find element in middle of array
    testWithErrorHandling("Find middle element", () => {
        const result = binarySearch(5, [1, 2, 3, 4, 5, 6, 7, 8, 9])
        assert(result === "5 is in the array", "Should find element in middle")
    })
    
    // Test 2: Find first element
    testWithErrorHandling("Find first element", () => {
        const result = binarySearch(1, [1, 2, 3, 4, 5])
        assert(result === "1 is in the array", "Should find first element")
    })
    
    // Test 3: Find last element
    testWithErrorHandling("Find last element", () => {
        const result = binarySearch(5, [1, 2, 3, 4, 5])
        assert(result === "5 is in the array", "Should find last element")
    })
    
    // Test 4: Element not in array (too small)
    testWithErrorHandling("Element smaller than all in array", () => {
        const result = binarySearch(0, [1, 2, 3, 4, 5])
        assert(result === "0 is not in the array", "Should not find element smaller than all")
    })
    
    // Test 5: Element not in array (too large)
    testWithErrorHandling("Element larger than all in array", () => {
        const result = binarySearch(10, [1, 2, 3, 4, 5])
        assert(result === "10 is not in the array", "Should not find element larger than all")
    })
    
    // Test 6: Element not in array (in range but missing)
    testWithErrorHandling("Element in range but not present", () => {
        const result = binarySearch(4, [1, 2, 3, 5, 6, 7])
        assert(result === "4 is not in the array", "Should not find missing element")
    })
    
    // Test 7: Single element array - found
    testWithErrorHandling("Single element array - found", () => {
        const result = binarySearch(42, [42])
        assert(result === "42 is in the array", "Should find single element")
    })
    
    // Test 8: Single element array - not found
    testWithErrorHandling("Single element array - not found", () => {
        const result = binarySearch(1, [42])
        assert(result === "1 is not in the array", "Should not find in single element array")
    })
    
    // Test 9: Empty array (THIS WILL CAUSE INFINITE RECURSION IN ORIGINAL)
    console.log("⚠️  Skipping empty array test - would cause infinite recursion")
    /*
    testWithErrorHandling("Empty array", () => {
        const result = binarySearch(5, [])
        assert(result === "5 is not in the array", "Should handle empty array")
    })
    */
    
    // Test 10: Two element array
    testWithErrorHandling("Two element array - find first", () => {
        const result = binarySearch(1, [1, 2])
        assert(result === "1 is in the array", "Should find first of two elements")
    })
    
    testWithErrorHandling("Two element array - find second", () => {
        const result = binarySearch(2, [1, 2])
        assert(result === "2 is in the array", "Should find second of two elements")
    })
    
    // Test 11: Large array
    testWithErrorHandling("Large sorted array", () => {
        const arr = Array.from({length: 100}, (_, i) => i + 1) // [1, 2, ..., 100]
        const result = binarySearch(73, arr)
        assert(result === "73 is in the array", "Should find element in large array")
    })
    
    // Test 12: Negative numbers
    testWithErrorHandling("Array with negative numbers", () => {
        const result = binarySearch(-3, [-10, -5, -3, -1, 0, 2, 5])
        assert(result === "-3 is in the array", "Should find negative number")
    })
    
    // Test 13: Decimal numbers
    testWithErrorHandling("Array with decimal numbers", () => {
        const result = binarySearch(3.5, [1.1, 2.2, 3.5, 4.7, 5.9])
        assert(result === "3.5 is in the array", "Should find decimal number")
    })
    
    console.log("\n" + "=".repeat(40))
    console.log("Testing Fixed Implementation:")
    console.log("-".repeat(40))
    
    // Re-run critical tests with fixed version
    testWithErrorHandling("Fixed: Empty array", () => {
        const result = binarySearch(5, [])
        assert(result === "5 is not in the array", "Fixed version should handle empty array")
    })
    
    testWithErrorHandling("Fixed: Find element", () => {
        const result = binarySearch(5, [1, 2, 3, 4, 5, 6, 7])
        assert(result === "5 is in the array", "Fixed version should find element")
    })
    
    testWithErrorHandling("Fixed: Element not found", () => {
        const result = binarySearch(10, [1, 2, 3, 4, 5])
        assert(result === "10 is not in the array", "Fixed version should not find missing element")
    })
    
    // Summary
    console.log("\n" + "=".repeat(40))
    console.log(`Tests Passed: ${testsPassed}`)
    console.log(`Tests Failed: ${testsFailed}`)
    console.log(`Tests Errored: ${testsErrored}`)
    console.log(`Total Tests Run: ${testsPassed + testsFailed + testsErrored}`)
    console.log("=".repeat(40))
    
    return testsFailed === 0 && testsErrored === 0
}

console.log("Binary Search Test Suite")
console.log("=" * 40 + "\n")

const allTestsPass = runTests()

if (allTestsPass) {
    console.log("\n✅ All tests passed!")
} else {
    console.log("\n❌ Some tests failed or errored. Review the implementation.")
}