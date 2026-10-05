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

console.log("problem 2");
console.log(
  diffObjects(
    { name: "Setemi", role: "Engineer", country: "Jamaica" },
    { name: "Setemi", role: "Senior Engineer", city: "Kingston" }
  )
);
// { added: { city: 'Kingston' }, removed: { country: 'Jamaica' },
//   changed: { role: { from: 'Engineer', to: 'Senior Engineer' } } }

// ---------- Problem 3 - Deep Freeze ----------
function deepFreze(obj) {
  // Freeze the top level first
  Object.freeze(obj);

  // Then freeze every nested object or array
  Object.values(obj).forEach((value) => {
    if (typeof value === "object" && value ! == null && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });

  return obj;
}

console.log("Problem 3");
const config = deepFreeze({ api: { baseUel: "https://x.com", retries: 3 }, debug: false });
config.api.baseUrl = "https://changed.com"; // should be ignored
config.debug = true;                        // should be ignored
console,log(config.api.baseUrl, config.debug);  // "https://x.com" false
console.log(Object.isFrozen(config.api));       // true

// ---------- Problem 4 - Private Counter Factory ----------
function createCounter() {
  let count = 0; // private: only reachable through the closure

  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    get value() {
      return count;
    },
  };
}

console.log("Problem 4");
const counter = createCounter();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.value); //1
console.log(counter.count); // undefined - not directly accessible

// ---------- Problem 5 - Schema Validator ----------
function validateSchema(obj, schema) {
  const errors = [];

  for (const [key, expectedType] of Object.entries(schema)) {
    if (!Object.hasOwn(obj, key)) {
      errors.push('${key}: missing property');
    } else if (typeof obj[key] !== expectedType) {
      errors.push('${key}: expected ${expectedType}, got ${typeof obj[key]}');
    }
  }

  return errors;
}

cosole.log("Problem 5");
const schema = { name: "string", age: "number", isAdmin: "boolean" };
console.log(validateSchema({ name: "Ada", age: 21, isAdmin: false }, schema));
// []
console.log(validateSchema({ name: "Ada", age: "21" }, schema));
// ['age: expected number, got string', 'isAdmin: missing property']