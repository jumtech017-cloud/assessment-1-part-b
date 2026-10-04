// ============================================
// Part B - JavaScript problems 1 to 5
// ============================================

// ---------- Problem 1 - Deep Equal (Easy) ----------
function deepEqual(objA, objB) {
  // same value or same reference (also covers equal primitives)
  if (objA === objB) return true;
  
  // if either is not an object (or is null), they are not equal
  if (
    typeof objA !== "object" || objA === null ||
    typeof objB !== "object" || objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // Different number of keys means different objects 
  if (keysA.length !== keysB.length) return false;

  // Every key in A must exist in B with a deeply equal value
  for (const key of keysA) {
    if (!Object.hasOwn(objB, key)) return false;
    if (!deepEqual(objA[key], objB[key])) return false;
  }

  return true;
}

console.log("problem 1");
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })); // false
console.log(deepEqual({ a:1 }, { a:1, b:2 }));

// ---------- Problem 2 - Object Diff (Medium) ----------
function diffObjects(oldObj, newObj) {
  const oldKeys = new Set(Object.keys(oldObj));
  const newKeys = new Set(Object.keys(newObj));

  const added = {};
  const removed = {};
  const changed = {};

  // Keys only in the new object were added
  for (const key of newKeys) {
    if (!oldKeys.has(key)) added[key]= newObj[key];
  }

  for (const key of oldKeys) {
    if (!newKeys.has(key)) {
      // Keys only in the old object were removed
      removed[key] = oldObj[key];
    } else if (oldObj[key] !== newObj[key]) {
      // Keys in both with different values were changed
      changed[key] = { from: oldObj[key], to: newObj[key] };
    }
  }

  return { added, removed, changed };
}