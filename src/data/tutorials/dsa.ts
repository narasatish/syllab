import { TutorialTopic } from './types';

/**
 * Data Structures & Algorithms (DSA) — the #1 skill for coding interviews and
 * placements. Python-based examples (readable pseudocode-like), feedback editor.
 * Substantive theory + real code + notes + a practice problem per topic.
 */
export const dsaTopics: TutorialTopic[] = [
  {
    id: 'dsa-intro-bigo',
    category: 'Foundations',
    title: 'What is DSA & Big-O Complexity',
    difficulty: 'Beginner',
    theory: [
      'A data structure is a way of organising data so it can be used efficiently (an array, a linked list, a tree). An algorithm is a step-by-step procedure to solve a problem (searching, sorting, finding a path). DSA is the study of choosing the right data structure and algorithm so your program runs fast and uses little memory — the exact skill product companies test in coding interviews.',
      'We measure efficiency with Big-O notation, which describes how the running time (or memory) grows as the input size n grows — ignoring constants and machine speed. O(1) is constant time (does not grow), O(log n) grows very slowly (binary search), O(n) grows linearly (one pass), O(n log n) is good sorting, O(n²) is nested loops, and O(2ⁿ) is exponential (usually too slow).',
      'Always analyse the worst case unless told otherwise. Two solutions can both be "correct" but one runs in O(n) and the other in O(n²) — for n = 1,000,000 that is the difference between instant and minutes. Interviewers care as much about the complexity as the working code.',
    ],
    code: `# Count how the number of operations grows.

def has_duplicate_slow(nums):      # O(n^2) - compares every pair
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j]:
                return True
    return False

def has_duplicate_fast(nums):      # O(n) - one pass with a set
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False

print(has_duplicate_fast([1, 2, 3, 2]))  # True`,
    output: 'True',
    notes: [
      'Big-O keeps only the fastest-growing term and drops constants: O(2n + 5) becomes O(n).',
      'Space complexity measures extra memory used. The fast version above is O(n) time but O(n) space (the set).',
      'Common order, best → worst: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!).',
    ],
    xp: 15,
    practice: {
      title: 'Classify the complexity',
      description: 'Write a function that returns the sum of all numbers in a list, and state its time complexity in a comment.',
      startCode: `def total(nums):\n    # your code\n    pass\n\n# Time complexity: O(?)`,
      hint: 'One loop over n items means the work grows linearly with n.',
      solution: `def total(nums):\n    s = 0\n    for x in nums:\n        s += x\n    return s\n\n# Time complexity: O(n)`,
    },
  },
  {
    id: 'dsa-arrays',
    category: 'Linear Structures',
    title: 'Arrays & Two Pointers',
    difficulty: 'Beginner',
    theory: [
      'An array stores elements in contiguous memory, so accessing any index is O(1). In Python we use a list. Reading/updating by index is O(1); searching for a value is O(n); inserting or deleting in the middle is O(n) because later elements must shift.',
      'The two-pointer technique is a cornerstone pattern: use two indices that move toward each other (or in the same direction) to solve problems in O(n) instead of O(n²). It works beautifully on sorted arrays — e.g. checking if two numbers add up to a target, or reversing in place.',
    ],
    code: `# Two-pointer: is there a pair summing to target in a SORTED array?

def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        s = nums[left] + nums[right]
        if s == target:
            return (left, right)
        if s < target:
            left += 1        # need a bigger sum
        else:
            right -= 1       # need a smaller sum
    return None

print(two_sum_sorted([1, 3, 4, 6, 8], 10))  # (1, 3) -> 3 + 6? no, 4+6=10 -> (2,3)`,
    output: '(2, 3)',
    notes: [
      'Two pointers turn many O(n²) brute-force scans into a single O(n) pass.',
      'Requires the array to be sorted for the sum/search variants.',
      'Related patterns: sliding window (a moving range) and fast/slow pointers (cycle detection).',
    ],
    xp: 15,
    practice: {
      title: 'Reverse an array in place',
      description: 'Reverse a list without using slicing or the built-in reverse(), using two pointers.',
      startCode: `def reverse(nums):\n    # your code\n    return nums`,
      hint: 'Swap the outermost pair, then move both pointers inward until they meet.',
      solution: `def reverse(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        nums[l], nums[r] = nums[r], nums[l]\n        l += 1\n        r -= 1\n    return nums`,
    },
  },
  {
    id: 'dsa-hashing',
    category: 'Linear Structures',
    title: 'Hash Maps & Sets',
    difficulty: 'Beginner',
    theory: [
      'A hash map (Python dict) stores key → value pairs and gives average O(1) insert, delete and lookup by using a hash function to jump straight to where a key is stored. A hash set (Python set) is the same idea for storing unique values. They are the single most useful tool for turning slow O(n²) solutions into O(n).',
      'The classic example is Two Sum on an UNsorted array: for each number, check in O(1) whether its complement (target − number) has already been seen. One pass, O(n) time, O(n) space — versus the O(n²) double loop.',
    ],
    code: `# Two Sum on an UNSORTED array using a hash map -> O(n)

def two_sum(nums, target):
    seen = {}                     # value -> index
    for i, x in enumerate(nums):
        need = target - x
        if need in seen:
            return (seen[need], i)
        seen[x] = i
    return None

print(two_sum([2, 7, 11, 15], 9))  # (0, 1)`,
    output: '(0, 1)',
    notes: [
      'Average case is O(1) per operation; worst case (many hash collisions) is O(n), but this is rare in practice.',
      'Use a set when you only need "have I seen this?"; use a dict when you need to store something with each key.',
      'Hash maps power frequency counting, de-duplication, grouping and caching.',
    ],
    xp: 15,
    practice: {
      title: 'First non-repeating character',
      description: 'Return the first character in a string that appears exactly once, or None.',
      startCode: `def first_unique(s):\n    # your code\n    pass`,
      hint: 'Count every character with a dict first, then scan the string again and return the first with count 1.',
      solution: `def first_unique(s):\n    from collections import Counter\n    counts = Counter(s)\n    for ch in s:\n        if counts[ch] == 1:\n            return ch\n    return None`,
    },
  },
  {
    id: 'dsa-linked-list',
    category: 'Linear Structures',
    title: 'Linked Lists',
    difficulty: 'Intermediate',
    theory: [
      'A linked list stores each element in a node that also holds a pointer to the next node. Unlike arrays, the elements are not contiguous, so there is no O(1) index access — reaching the k-th node takes O(k). The payoff is O(1) insertion/deletion at a known node (just re-wire pointers), with no shifting.',
      'The fast/slow pointer trick (Floyd\'s algorithm) is a famous linked-list pattern: move one pointer one step and another two steps. It detects a cycle (they meet) and finds the middle node (when fast reaches the end, slow is at the middle).',
    ],
    code: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow.val

# 1 -> 2 -> 3 -> 4 -> 5
head = Node(1, Node(2, Node(3, Node(4, Node(5)))))
print(middle(head))  # 3`,
    output: '3',
    notes: [
      'Reversing a linked list in place (track prev, curr, next) is a must-know O(n) interview question.',
      'Singly linked = one pointer (next); doubly linked = two pointers (next and prev).',
      'Always guard against None (empty list / end of list) to avoid crashes.',
    ],
    xp: 20,
    practice: {
      title: 'Reverse a linked list',
      description: 'Reverse a singly linked list and return the new head.',
      startCode: `def reverse_list(head):\n    # your code\n    pass`,
      hint: 'Keep three references: prev, curr, and the next node. Flip curr.next to prev, then slide all three forward.',
      solution: `def reverse_list(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev`,
    },
  },
  {
    id: 'dsa-stack-queue',
    category: 'Linear Structures',
    title: 'Stacks & Queues',
    difficulty: 'Intermediate',
    theory: [
      'A stack is Last-In-First-Out (LIFO) — like a stack of plates. You push onto the top and pop from the top, both O(1). Stacks power undo history, function calls (the call stack), expression evaluation and matching brackets.',
      'A queue is First-In-First-Out (FIFO) — like a line at a shop. You enqueue at the back and dequeue from the front, both O(1) if you use the right structure (collections.deque, not a list). Queues power scheduling, buffering and breadth-first search.',
    ],
    code: `# Valid parentheses with a stack -> O(n)

def is_balanced(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for ch in s:
        if ch in '([{':
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return len(stack) == 0

print(is_balanced("{[()]}"))  # True
print(is_balanced("{[(])}"))  # False`,
    output: 'True\nFalse',
    notes: [
      'Use collections.deque for queues — popping from the front of a Python list is O(n).',
      'Stack = append()/pop(); queue with deque = append()/popleft().',
      'Bracket matching, "next greater element" and monotonic-stack problems are common interview patterns.',
    ],
    xp: 20,
    practice: {
      title: 'Reverse a string with a stack',
      description: 'Use a stack (list) to reverse a string. Push each character, then pop them all.',
      startCode: `def reverse_with_stack(s):\n    # your code\n    pass`,
      hint: 'Push every char onto a list, then repeatedly pop to build the reversed string.',
      solution: `def reverse_with_stack(s):\n    stack = list(s)\n    out = ''\n    while stack:\n        out += stack.pop()\n    return out`,
    },
  },
  {
    id: 'dsa-recursion',
    category: 'Algorithms',
    title: 'Recursion & Backtracking',
    difficulty: 'Intermediate',
    theory: [
      'Recursion is when a function calls itself on a smaller version of the problem. Every recursive solution needs a base case (when to stop) and a recursive case (how to shrink the problem). Without a base case you get infinite recursion and a stack overflow.',
      'Backtracking is recursion that explores choices, and undoes a choice ("backtracks") when it leads nowhere. It solves permutations, combinations, subsets, mazes, Sudoku and the N-Queens problem — try a choice, recurse, then remove it and try the next.',
    ],
    code: `# Generate all subsets (the power set) with backtracking

def subsets(nums):
    result = []
    def backtrack(start, path):
        result.append(path[:])          # record current subset
        for i in range(start, len(nums)):
            path.append(nums[i])         # choose
            backtrack(i + 1, path)       # explore
            path.pop()                   # un-choose (backtrack)
    backtrack(0, [])
    return result

print(subsets([1, 2, 3]))
# [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]`,
    output: '[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]',
    notes: [
      'Base case first — it stops the recursion and prevents a stack overflow.',
      'The "choose → explore → un-choose" template is the heart of backtracking.',
      'Many recursive solutions can be sped up with memoisation (caching) — that is the bridge to Dynamic Programming.',
    ],
    xp: 20,
    practice: {
      title: 'Factorial by recursion',
      description: 'Write factorial(n) recursively (n! = n × (n−1)!). factorial(0) = 1.',
      startCode: `def factorial(n):\n    # your code\n    pass`,
      hint: 'Base case: n == 0 returns 1. Recursive case: n * factorial(n - 1).',
      solution: `def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)`,
    },
  },
  {
    id: 'dsa-searching',
    category: 'Algorithms',
    title: 'Searching & Binary Search',
    difficulty: 'Intermediate',
    theory: [
      'Linear search scans every element until it finds the target — O(n). It works on any list. Binary search is far faster — O(log n) — but requires the array to be SORTED. It repeatedly halves the search range by comparing the target with the middle element.',
      'Binary search is deceptively tricky: get the boundary conditions (low ≤ high) and the mid calculation right, or you loop forever or miss the answer. It also generalises to "binary search on the answer" — a powerful pattern for optimisation problems.',
    ],
    code: `def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1      # target is in the right half
        else:
            high = mid - 1     # target is in the left half
    return -1                  # not found

print(binary_search([1, 3, 5, 7, 9, 11], 7))  # 3`,
    output: '3',
    notes: [
      'Binary search needs a sorted array; sorting first costs O(n log n).',
      'Use (low + high) // 2 for the midpoint; while low <= high is the safe loop condition.',
      'O(log n) means for a million items you need only ~20 comparisons.',
    ],
    xp: 20,
    practice: {
      title: 'Find the square root (floor)',
      description: 'Return the integer floor of the square root of n using binary search (no math.sqrt).',
      startCode: `def isqrt(n):\n    # your code\n    pass`,
      hint: 'Binary search between 1 and n for the largest m where m*m <= n.',
      solution: `def isqrt(n):\n    if n < 2:\n        return n\n    low, high, ans = 1, n, 0\n    while low <= high:\n        mid = (low + high) // 2\n        if mid * mid <= n:\n            ans = mid\n            low = mid + 1\n        else:\n            high = mid - 1\n    return ans`,
    },
  },
  {
    id: 'dsa-sorting',
    category: 'Algorithms',
    title: 'Sorting Algorithms',
    difficulty: 'Intermediate',
    theory: [
      'Sorting arranges data in order and unlocks binary search, deduplication and many greedy algorithms. Simple sorts — bubble, selection, insertion — are O(n²) and fine for small or nearly-sorted data. Efficient sorts — merge sort and quicksort — run in O(n log n).',
      'Merge sort is a divide-and-conquer algorithm: split the array in half, sort each half recursively, then merge the two sorted halves. It is stable and always O(n log n), at the cost of O(n) extra space. Quicksort picks a pivot and partitions around it — O(n log n) on average, O(n²) worst case, but in place.',
    ],
    code: `def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    # merge two sorted lists
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    out.extend(left[i:]); out.extend(right[j:])
    return out

print(merge_sort([5, 2, 9, 1, 5, 6]))  # [1, 2, 5, 5, 6, 9]`,
    output: '[1, 2, 5, 5, 6, 9]',
    notes: [
      'Python\'s built-in sorted() / .sort() uses Timsort — an optimised O(n log n) merge/insertion hybrid.',
      'A sort is "stable" if equal elements keep their original relative order (merge sort is; quicksort is not).',
      'Know the trade-offs: merge sort = guaranteed O(n log n) but O(n) space; quicksort = in place but O(n²) worst case.',
    ],
    xp: 25,
    practice: {
      title: 'Insertion sort',
      description: 'Sort a list using insertion sort (build the sorted part one element at a time).',
      startCode: `def insertion_sort(a):\n    # your code\n    return a`,
      hint: 'For each element from index 1, shift larger elements on its left one step right, then drop it into place.',
      solution: `def insertion_sort(a):\n    for i in range(1, len(a)):\n        key = a[i]\n        j = i - 1\n        while j >= 0 and a[j] > key:\n            a[j + 1] = a[j]\n            j -= 1\n        a[j + 1] = key\n    return a`,
    },
  },
  {
    id: 'dsa-trees',
    category: 'Non-Linear Structures',
    title: 'Trees & Binary Search Trees',
    difficulty: 'Advanced',
    theory: [
      'A tree is a hierarchical structure of nodes with one root; each node has children. A binary tree limits each node to at most two children (left and right). Trees model file systems, the DOM, decision trees and more. We visit nodes with traversals: inorder (left, node, right), preorder (node, left, right) and postorder (left, right, node) — all O(n).',
      'A Binary Search Tree (BST) keeps a rule: every value in the left subtree is smaller than the node, and every value in the right subtree is larger. This gives O(log n) search, insert and delete when the tree is balanced. An inorder traversal of a BST visits the values in sorted order.',
    ],
    code: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def inorder(node, out):
    if node:
        inorder(node.left, out)
        out.append(node.val)
        inorder(node.right, out)
    return out

#      5
#     / \\
#    3   8
root = TreeNode(5)
root.left = TreeNode(3)
root.right = TreeNode(8)
print(inorder(root, []))  # [3, 5, 8]  (sorted!)`,
    output: '[3, 5, 8]',
    notes: [
      'Inorder traversal of a BST yields sorted values — a common interview check.',
      'A BST degrades to O(n) if it becomes unbalanced (a "linked list"); self-balancing trees (AVL, Red-Black) fix this.',
      'Tree problems are almost always solved with recursion (process node, recurse left, recurse right).',
    ],
    xp: 25,
    practice: {
      title: 'Height of a binary tree',
      description: 'Return the height (max depth) of a binary tree. An empty tree has height 0.',
      startCode: `def height(node):\n    # your code\n    pass`,
      hint: 'Base case: None returns 0. Otherwise 1 + max(height(left), height(right)).',
      solution: `def height(node):\n    if node is None:\n        return 0\n    return 1 + max(height(node.left), height(node.right))`,
    },
  },
  {
    id: 'dsa-heaps',
    category: 'Non-Linear Structures',
    title: 'Heaps & Priority Queues',
    difficulty: 'Advanced',
    theory: [
      'A heap is a special binary tree that keeps the smallest (min-heap) or largest (max-heap) element at the root. Push and pop are O(log n), and peeking at the top is O(1). It is the go-to structure for a priority queue — always serve the most urgent item next.',
      'Heaps shine for "top-K" and "K-th largest/smallest" problems and for merging sorted streams. Python\'s heapq module is a min-heap; for a max-heap, push negated values. Building a heap from n items is O(n).',
    ],
    code: `import heapq

def k_largest(nums, k):
    # A min-heap of size k keeps the k largest seen so far.
    heap = []
    for x in nums:
        heapq.heappush(heap, x)
        if len(heap) > k:
            heapq.heappop(heap)   # drop the smallest
    return sorted(heap, reverse=True)

print(k_largest([3, 1, 5, 12, 2, 11], 3))  # [12, 11, 5]`,
    output: '[12, 11, 5]',
    notes: [
      'heapq is a MIN-heap; for a max-heap, push -x and negate on pop.',
      'Top-K with a size-K heap is O(n log k) — better than sorting the whole list O(n log n) when k is small.',
      'A priority queue backs Dijkstra\'s shortest-path and Huffman coding.',
    ],
    xp: 25,
    practice: {
      title: 'K-th smallest element',
      description: 'Return the k-th smallest number in a list using a heap.',
      startCode: `import heapq\n\ndef kth_smallest(nums, k):\n    # your code\n    pass`,
      hint: 'heapify the list, then pop k times; the k-th pop is your answer.',
      solution: `import heapq\n\ndef kth_smallest(nums, k):\n    heap = list(nums)\n    heapq.heapify(heap)\n    for _ in range(k - 1):\n        heapq.heappop(heap)\n    return heapq.heappop(heap)`,
    },
  },
  {
    id: 'dsa-graphs',
    category: 'Non-Linear Structures',
    title: 'Graphs — BFS & DFS',
    difficulty: 'Advanced',
    theory: [
      'A graph is a set of nodes (vertices) connected by edges. It models roads, social networks, web links and dependencies. We usually store it as an adjacency list (a dict of node → list of neighbours). Graphs can be directed or undirected, weighted or unweighted.',
      'Two core traversals: Breadth-First Search (BFS) explores level by level using a queue — it finds the shortest path in an unweighted graph. Depth-First Search (DFS) goes as deep as possible using recursion or a stack — great for cycle detection, topological sort and connected components. Both are O(V + E).',
    ],
    code: `from collections import deque

def bfs_shortest(graph, start, goal):
    visited = {start}
    queue = deque([(start, 0)])          # (node, distance)
    while queue:
        node, dist = queue.popleft()
        if node == goal:
            return dist
        for nb in graph[node]:
            if nb not in visited:
                visited.add(nb)
                queue.append((nb, dist + 1))
    return -1

graph = {'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': []}
print(bfs_shortest(graph, 'A', 'D'))  # 2`,
    output: '2',
    notes: [
      'BFS uses a QUEUE and finds shortest paths in unweighted graphs; DFS uses a STACK/recursion.',
      'Always keep a "visited" set to avoid infinite loops on cycles.',
      'Weighted shortest path needs Dijkstra (a heap-based BFS), not plain BFS.',
    ],
    xp: 30,
    practice: {
      title: 'Count connected components',
      description: 'Given an undirected graph (adjacency list), count how many separate components it has.',
      startCode: `def count_components(graph):\n    # your code\n    pass`,
      hint: 'Run DFS/BFS from every unvisited node; each new traversal you start is one more component.',
      solution: `def count_components(graph):\n    visited = set()\n    def dfs(node):\n        visited.add(node)\n        for nb in graph[node]:\n            if nb not in visited:\n                dfs(nb)\n    count = 0\n    for node in graph:\n        if node not in visited:\n            dfs(node)\n            count += 1\n    return count`,
    },
  },
  {
    id: 'dsa-dp',
    category: 'Algorithms',
    title: 'Dynamic Programming',
    difficulty: 'Advanced',
    theory: [
      'Dynamic Programming (DP) solves problems that have overlapping subproblems and optimal substructure — the answer is built from answers to smaller versions of the same problem, and those smaller answers repeat. Instead of recomputing them (exponential time), we store and reuse them.',
      'Two styles: top-down (recursion + memoisation — cache each result the first time you compute it) and bottom-up (tabulation — fill an array from the smallest subproblem upward). The classic first example is Fibonacci: naive recursion is O(2ⁿ), but with memoisation it drops to O(n).',
    ],
    code: `# Fibonacci: O(2^n) naive -> O(n) with memoisation

def fib(n, memo={}):
    if n <= 1:
        return n
    if n in memo:
        return memo[n]
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]

print(fib(30))  # 832040 (instant, not seconds)

# Bottom-up version, O(n) time O(1) space
def fib_bottom_up(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`,
    output: '832040',
    notes: [
      'Spot DP when a brute-force recursion recomputes the same inputs repeatedly.',
      'Memoisation = top-down cache; tabulation = bottom-up array. Both remove the repeated work.',
      'Classic DP problems: climbing stairs, coin change, longest common subsequence, 0/1 knapsack, edit distance.',
    ],
    xp: 30,
    practice: {
      title: 'Climbing stairs',
      description: 'You can climb 1 or 2 steps at a time. In how many distinct ways can you reach the n-th step?',
      startCode: `def climb_stairs(n):\n    # your code\n    pass`,
      hint: 'ways(n) = ways(n-1) + ways(n-2) — it is Fibonacci. Use bottom-up to make it O(n).',
      solution: `def climb_stairs(n):\n    if n <= 2:\n        return n\n    a, b = 1, 2\n    for _ in range(n - 2):\n        a, b = b, a + b\n    return b`,
    },
  },
];
