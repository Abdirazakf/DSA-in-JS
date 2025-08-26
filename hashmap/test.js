import HashMap from "./main.js";

// Unit tests for HashMap rehashing functionality

function runAllTests() {
    console.log('Starting HashMap Rehashing Tests...\n');
    
    testRehashingTriggers();
    testCapacityDoubles();
    testAllKeysPreservedAfterRehash();
    testGetAndHasWorkAfterRehash();
    testMultipleRehashes();
    testRehashWithCollisions();
    testUpdateAfterRehash();
    testRemoveAfterRehash();
    
    console.log('\n✓ All tests completed!');
}

// Test 1: Verify rehashing triggers at correct load factor
function testRehashingTriggers() {
    console.log('Test 1: Rehashing triggers at 80% capacity');
    const map = new HashMap();
    
    // Initial capacity is 16, load factor is 0.8
    // Should rehash when storedKeys >= 13 (16 * 0.8 = 12.8)
    
    // Add 12 items - should NOT trigger rehash
    for (let i = 1; i <= 12; i++) {
        map.set(`key${i}`, `value${i}`);
    }
    console.assert(map.capacity === 16, 'Capacity should still be 16 after 12 items');
    console.assert(map.storedKeys === 12, 'Should have 12 stored keys');
    
    // Add 13th item - SHOULD trigger rehash
    map.set('key13', 'value13');
    console.assert(map.capacity === 32, 'Capacity should double to 32 after rehashing');
    console.assert(map.storedKeys === 13, 'Should have 13 stored keys after rehash');
    
    console.log('  ✓ Rehashing triggers correctly');
}

// Test 2: Verify capacity doubles after rehashing
function testCapacityDoubles() {
    console.log('Test 2: Capacity doubles when rehashing');
    const map = new HashMap();
    
    console.assert(map.capacity === 16, 'Initial capacity should be 16');
    
    // Force first rehash
    for (let i = 1; i <= 13; i++) {
        map.set(`key${i}`, `value${i}`);
    }
    console.assert(map.capacity === 32, 'Capacity should be 32 after first rehash');
    
    // Force second rehash (32 * 0.8 = 25.6, so need 26 items)
    for (let i = 14; i <= 26; i++) {
        map.set(`key${i}`, `value${i}`);
    }
    console.assert(map.capacity === 64, 'Capacity should be 64 after second rehash');
    
    console.log('  ✓ Capacity doubles correctly');
}

// Test 3: Verify all keys are preserved after rehashing
function testAllKeysPreservedAfterRehash() {
    console.log('Test 3: All keys preserved after rehashing');
    const map = new HashMap();
    
    // Create test data
    const testData = [];
    for (let i = 1; i <= 15; i++) {
        testData.push({key: `testKey${i}`, value: `testValue${i}`});
    }
    
    // Add all test data (will trigger rehash at 13th item)
    testData.forEach(item => {
        map.set(item.key, item.value);
    });
    
    // Verify all keys exist
    const keys = map.keys();
    console.assert(keys.length === 15, `Should have 15 keys, got ${keys.length}`);
    
    // Verify each key-value pair
    testData.forEach(item => {
        const value = map.get(item.key);
        console.assert(value === item.value, 
            `Key ${item.key} should have value ${item.value}, got ${value}`);
    });
    
    console.log('  ✓ All keys preserved correctly');
}

// Test 4: Verify get() and has() work correctly after rehashing
function testGetAndHasWorkAfterRehash() {
    console.log('Test 4: get() and has() work after rehashing');
    const map = new HashMap();
    
    // Add items to trigger rehash
    const items = [
        {key: 'apple', value: 'red'},
        {key: 'banana', value: 'yellow'},
        {key: 'carrot', value: 'orange'},
        {key: 'dog', value: 'brown'},
        {key: 'elephant', value: 'gray'},
        {key: 'frog', value: 'green'},
        {key: 'grape', value: 'purple'},
        {key: 'hat', value: 'black'},
        {key: 'ice cream', value: 'white'},
        {key: 'jacket', value: 'blue'},
        {key: 'kite', value: 'pink'},
        {key: 'lion', value: 'golden'},
        {key: 'moon', value: 'silver'}, // This triggers rehash
        {key: 'night', value: 'dark'},
        {key: 'ocean', value: 'blue'}
    ];
    
    items.forEach(item => map.set(item.key, item.value));
    
    // Test get() for all items
    items.forEach(item => {
        const value = map.get(item.key);
        console.assert(value === item.value, 
            `get('${item.key}') should return '${item.value}', got '${value}'`);
    });
    
    // Test has() for all items
    items.forEach(item => {
        console.assert(map.has(item.key) === true, 
            `has('${item.key}') should return true`);
    });
    
    // Test has() for non-existent keys
    console.assert(map.has('nonexistent') === false, 
        'has() should return false for non-existent key');
    
    console.log('  ✓ get() and has() work correctly');
}

// Test 5: Test multiple consecutive rehashes
function testMultipleRehashes() {
    console.log('Test 5: Multiple consecutive rehashes');
    const map = new HashMap();
    let rehashCount = 0;
    
    // Override rehash to count calls
    const originalRehash = map.rehash.bind(map);
    map.rehash = function() {
        rehashCount++;
        originalRehash();
    };
    
    // Add 50 items (should trigger multiple rehashes)
    // Rehash at 13 (capacity 16->32), 26 (32->64), won't reach 52
    for (let i = 1; i <= 50; i++) {
        map.set(`key${i}`, `value${i}`);
    }
    
    console.assert(rehashCount === 2, `Should have rehashed 2 times, got ${rehashCount}`);
    console.assert(map.capacity === 64, 'Final capacity should be 64');
    console.assert(map.storedKeys === 50, 'Should have 50 stored keys');
    
    // Verify all keys still accessible
    for (let i = 1; i <= 50; i++) {
        console.assert(map.get(`key${i}`) === `value${i}`, 
            `Key key${i} should have correct value after multiple rehashes`);
    }
    
    console.log('  ✓ Multiple rehashes work correctly');
}

// Test 6: Test rehashing with collision-prone keys
function testRehashWithCollisions() {
    console.log('Test 6: Rehashing preserves collision handling');
    const map = new HashMap();
    
    // These keys are designed to potentially collide
    const collisionKeys = [
        'a', 'q', // Simple keys that might collide
        'aa', 'bP', // Multi-char keys
        'test1', 'test2', 'test3', // Similar keys
        'key1', 'key2', 'key3', 'key4', 'key5',
        'item1', 'item2', 'item3', 'item4', 'item5'
    ];
    
    // Add all keys
    collisionKeys.forEach((key, index) => {
        map.set(key, `value${index}`);
    });
    
    // Force a rehash by adding one more
    map.set('trigger', 'rehash');
    
    // Verify all keys still exist with correct values
    collisionKeys.forEach((key, index) => {
        const value = map.get(key);
        console.assert(value === `value${index}`, 
            `Key '${key}' should have value 'value${index}', got '${value}'`);
    });
    
    console.log('  ✓ Collision handling preserved after rehash');
}

// Test 7: Test updating values after rehash
function testUpdateAfterRehash() {
    console.log('Test 7: Updating values works after rehashing');
    const map = new HashMap();
    
    // Add items to trigger rehash
    for (let i = 1; i <= 15; i++) {
        map.set(`key${i}`, `oldValue${i}`);
    }
    
    // Update some values after rehash
    for (let i = 1; i <= 5; i++) {
        map.set(`key${i}`, `newValue${i}`);
    }
    
    // Verify updates
    for (let i = 1; i <= 5; i++) {
        console.assert(map.get(`key${i}`) === `newValue${i}`, 
            `Key 'key${i}' should have updated value`);
    }
    
    // Verify unchanged values
    for (let i = 6; i <= 15; i++) {
        console.assert(map.get(`key${i}`) === `oldValue${i}`, 
            `Key 'key${i}' should have original value`);
    }
    
    // Verify key count didn't change
    console.assert(map.storedKeys === 15, 
        'Updating existing keys should not change storedKeys count');
    
    console.log('  ✓ Updates work correctly after rehash');
}

// Test 8: Test removing items after rehash
function testRemoveAfterRehash() {
    console.log('Test 8: Removing items works after rehashing');
    const map = new HashMap();
    
    // Add items to trigger rehash
    for (let i = 1; i <= 15; i++) {
        map.set(`key${i}`, `value${i}`);
    }
    
    const initialCount = map.storedKeys;
    
    // Remove some items
    map.remove('key5');
    map.remove('key10');
    map.remove('key15');
    
    // Verify removals
    console.assert(map.get('key5') === null, 'key5 should be removed');
    console.assert(map.get('key10') === null, 'key10 should be removed');
    console.assert(map.get('key15') === null, 'key15 should be removed');
    
    console.assert(map.has('key5') === false, 'has() should return false for removed key5');
    console.assert(map.has('key10') === false, 'has() should return false for removed key10');
    console.assert(map.has('key15') === false, 'has() should return false for removed key15');
    
    // Verify count decreased
    console.assert(map.storedKeys === initialCount - 3, 
        `storedKeys should be ${initialCount - 3}, got ${map.storedKeys}`);
    
    // Verify other keys still exist
    for (let i of [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14]) {
        console.assert(map.get(`key${i}`) === `value${i}`, 
            `key${i} should still exist with correct value`);
    }
    
    console.log('  ✓ Removals work correctly after rehash');
}

// Helper function to visualize hash distribution (optional)
function analyzeHashDistribution(map) {
    console.log('\nHash Distribution Analysis:');
    let occupied = 0;
    let maxChainLength = 0;
    let totalNodes = 0;
    
    for (let i = 0; i < map.array.length; i++) {
        if (map.array[i]) {
            occupied++;
            let chainLength = 0;
            let current = map.array[i].head;
            while (current) {
                chainLength++;
                totalNodes++;
                current = current.next;
            }
            maxChainLength = Math.max(maxChainLength, chainLength);
        }
    }
    
    console.log(`  Capacity: ${map.capacity}`);
    console.log(`  Buckets used: ${occupied}/${map.capacity} (${(occupied/map.capacity*100).toFixed(1)}%)`);
    console.log(`  Total nodes: ${totalNodes}`);
    console.log(`  Max chain length: ${maxChainLength}`);
    console.log(`  Load factor: ${(map.storedKeys/map.capacity).toFixed(2)}`);
}

// Run all tests
runAllTests();

// Optional: Test with your specific example and analyze distribution
console.log('\n--- Testing with provided example ---');
const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');

analyzeHashDistribution(test);