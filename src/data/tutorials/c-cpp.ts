import { TutorialTopic } from './types';

/**
 * C & C++ — the foundational systems-programming languages taught in every
 * Indian engineering college and asked about in core-company interviews.
 * Feedback editor (browser can't compile C/C++), so learners write code and
 * compare against the expected output. Substantive theory + real, correct code.
 */
export const cCppTopics: TutorialTopic[] = [
  {
    id: 'ccpp-intro',
    category: 'C Fundamentals',
    title: 'Why C & C++, and Your First Program',
    difficulty: 'Beginner',
    theory: [
      'C (1972) is a small, fast, "close to the hardware" language — operating systems (Linux, Windows kernels), databases and embedded devices are written in it. C++ (1985) is C extended with classes and objects (OOP), templates and a huge standard library (the STL). Learning C first teaches you how memory and pointers actually work; C++ then adds powerful abstractions on top.',
      'Unlike Python or JavaScript, C/C++ are compiled: a compiler (gcc / g++) translates your whole source file into a machine-code executable before it runs. This is why they are fast, but also why a small mistake is caught at compile time rather than while running. The classic toolchain is: write .c/.cpp → compile → run the produced binary.',
      'Every C program starts executing at a function called main(). The return value of main (0) tells the operating system the program finished successfully. #include lines pull in libraries — stdio.h for input/output in C, <iostream> in C++.',
    ],
    syntax: '#include <stdio.h>\nint main(void) {\n    /* statements */\n    return 0;\n}',
    code: `#include <stdio.h>   // gives us printf

int main(void) {
    printf("Hello, Syllab!\\n");   // \\n = newline
    return 0;                      // 0 = success
}`,
    output: 'Hello, Syllab!',
    notes: [
      'Compile & run on your machine: `gcc hello.c -o hello` then `./hello` (use g++ for C++).',
      'Every statement ends with a semicolon `;`. Missing one is the most common beginner compile error.',
      'printf does NOT add a newline automatically — you add `\\n` yourself.',
    ],
    xp: 10,
    practice: {
      title: 'Print your name',
      description: 'Write a complete C program that prints your name on one line and "Class of 2026" on the next.',
      startCode: `#include <stdio.h>\n\nint main(void) {\n    // your code here\n    return 0;\n}`,
      hint: 'Use two printf calls, each ending with \\n, or one printf with \\n in the middle.',
      solution: `#include <stdio.h>\n\nint main(void) {\n    printf("Nara\\n");\n    printf("Class of 2026\\n");\n    return 0;\n}`,
      expectedOutput: 'Nara\nClass of 2026',
    },
  },
  {
    id: 'ccpp-variables',
    category: 'C Fundamentals',
    title: 'Variables, Data Types & printf',
    difficulty: 'Beginner',
    theory: [
      'C is statically typed: you must declare a variable\'s type before using it, and it cannot change. The core types are int (whole numbers), float and double (decimals, double is more precise), char (a single character, stored as a small integer), and in C99 _Bool / <stdbool.h> for true/false. A type also fixes how many bytes the variable occupies in memory.',
      'printf uses format specifiers to insert values: %d for int, %f for float/double, %c for char, %s for a string, %.2f to show 2 decimal places. The number of specifiers must match the arguments you pass — a mismatch is a classic bug that prints garbage.',
      'Integer division truncates: 7 / 2 is 3, not 3.5, because both operands are ints. To get 3.5 at least one operand must be a floating type (7.0 / 2). This trips up almost every beginner.',
    ],
    syntax: 'int age = 17;\ndouble price = 99.5;\nchar grade = \'A\';',
    code: `#include <stdio.h>

int main(void) {
    int age = 17;
    double marks = 87.5;
    char grade = 'A';

    printf("Age: %d\\n", age);
    printf("Marks: %.1f%%\\n", marks);   // %% prints a literal %
    printf("Grade: %c\\n", grade);
    printf("7 / 2 = %d   but 7.0 / 2 = %.1f\\n", 7 / 2, 7.0 / 2);
    return 0;
}`,
    output: 'Age: 17\nMarks: 87.5%\nGrade: A\n7 / 2 = 3   but 7.0 / 2 = 3.5',
    notes: [
      'A char literal uses single quotes (\'A\'); a string uses double quotes ("A").',
      'Use `sizeof(int)` to see how many bytes a type takes (often 4 for int, 8 for double).',
      'Uninitialised variables hold garbage in C — always assign before you read.',
    ],
    xp: 10,
    practice: {
      title: 'Area of a rectangle',
      description: 'Declare length = 8 and width = 5 (as ints), compute the area, and print "Area: 40".',
      startCode: `#include <stdio.h>\n\nint main(void) {\n    int length = 8, width = 5;\n    // compute and print area\n    return 0;\n}`,
      hint: 'Multiply the two variables and print with %d.',
      solution: `#include <stdio.h>\n\nint main(void) {\n    int length = 8, width = 5;\n    int area = length * width;\n    printf("Area: %d\\n", area);\n    return 0;\n}`,
      expectedOutput: 'Area: 40',
    },
  },
  {
    id: 'ccpp-control-flow',
    category: 'C Fundamentals',
    title: 'if / else, Loops & Conditions',
    difficulty: 'Beginner',
    theory: [
      'Control flow decides which statements run. if / else if / else branches on a condition; conditions use relational operators (==, !=, <, >, <=, >=) and logical operators (&& AND, || OR, ! NOT). In C, any non-zero value is "true" and 0 is "false" — there is no separate boolean type in classic C.',
      'Loops repeat work. A for loop is best when you know the count: for(init; condition; update). A while loop runs while a condition holds; a do-while runs the body at least once before testing. break exits a loop early; continue skips to the next iteration.',
      'A very common bug is using = (assignment) instead of == (comparison) inside an if. `if (x = 5)` assigns 5 to x and is always true. Compilers warn about this — never ignore warnings.',
    ],
    syntax: 'for (int i = 0; i < n; i++) { ... }\nwhile (condition) { ... }',
    code: `#include <stdio.h>

int main(void) {
    // FizzBuzz for 1..15
    for (int i = 1; i <= 15; i++) {
        if (i % 15 == 0)      printf("FizzBuzz\\n");
        else if (i % 3 == 0)  printf("Fizz\\n");
        else if (i % 5 == 0)  printf("Buzz\\n");
        else                  printf("%d\\n", i);
    }
    return 0;
}`,
    output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
    notes: [
      'Check divisibility by 15 FIRST — otherwise multiples of 3 and 5 never reach the FizzBuzz branch.',
      '% is the modulo (remainder) operator: 7 % 3 is 1.',
      'Declaring the loop variable inside the for (`int i`) needs C99 or later — standard on modern gcc.',
    ],
    xp: 12,
    practice: {
      title: 'Sum of even numbers',
      description: 'Use a loop to print the sum of all even numbers from 1 to 10 (expected: 30).',
      startCode: `#include <stdio.h>\n\nint main(void) {\n    int sum = 0;\n    // loop 1..10, add evens\n    printf("%d\\n", sum);\n    return 0;\n}`,
      hint: 'An even number satisfies i % 2 == 0.',
      solution: `#include <stdio.h>\n\nint main(void) {\n    int sum = 0;\n    for (int i = 1; i <= 10; i++)\n        if (i % 2 == 0) sum += i;\n    printf("%d\\n", sum);\n    return 0;\n}`,
      expectedOutput: '30',
    },
  },
  {
    id: 'ccpp-functions',
    category: 'C Fundamentals',
    title: 'Functions & Pass-by-Value',
    difficulty: 'Beginner',
    theory: [
      'A function is a named, reusable block of code: it has a return type, a name, a parameter list, and a body. Splitting a program into functions makes it readable and testable. You typically declare a prototype (return type + name + parameters, ending in `;`) before main, and define the body after — or define the whole function before it is used.',
      'C passes arguments by value: the function receives a copy of each argument, so changing a parameter inside the function does NOT change the caller\'s variable. To let a function modify the caller\'s variable you pass a pointer (its address) — covered in the pointers topic. This value/reference distinction is central to C.',
      'A function that returns nothing has return type void. Keep functions small and focused — one job each. Good names (isPrime, celsiusToF) make code self-documenting.',
    ],
    syntax: 'int add(int a, int b);   // prototype\nint add(int a, int b) { return a + b; }',
    code: `#include <stdio.h>

int is_prime(int n) {
    if (n < 2) return 0;               // 0 and 1 are not prime
    for (int i = 2; i * i <= n; i++)   // only check up to sqrt(n)
        if (n % i == 0) return 0;
    return 1;
}

int main(void) {
    for (int n = 2; n <= 20; n++)
        if (is_prime(n)) printf("%d ", n);
    printf("\\n");
    return 0;
}`,
    output: '2 3 5 7 11 13 17 19',
    notes: [
      'Checking divisors only up to √n turns an O(n) primality test into O(√n).',
      'Returning early (`return 0`) as soon as you find a divisor avoids wasted work.',
      'A function must be declared or defined before the line that calls it.',
    ],
    xp: 15,
    practice: {
      title: 'Factorial function',
      description: 'Write int factorial(int n) that returns n! and print factorial(5) — expected 120.',
      startCode: `#include <stdio.h>\n\nint factorial(int n) {\n    // your code\n}\n\nint main(void) {\n    printf("%d\\n", factorial(5));\n    return 0;\n}`,
      hint: 'Multiply 1*2*3*...*n in a loop, or use recursion: n * factorial(n-1) with base case factorial(0)=1.',
      solution: `#include <stdio.h>\n\nint factorial(int n) {\n    int result = 1;\n    for (int i = 2; i <= n; i++) result *= i;\n    return result;\n}\n\nint main(void) {\n    printf("%d\\n", factorial(5));\n    return 0;\n}`,
      expectedOutput: '120',
    },
  },
  {
    id: 'ccpp-arrays-strings',
    category: 'C Fundamentals',
    title: 'Arrays & C Strings',
    difficulty: 'Intermediate',
    theory: [
      'An array is a fixed-size, contiguous block of elements of the same type: `int a[5];`. Indexing is 0-based, so valid indices are 0..4. C does NOT check array bounds — writing a[5] or a[100] compiles and runs but corrupts memory (a leading cause of crashes and security bugs). You must track the length yourself.',
      'A C string is just an array of char terminated by a special null character \'\\0\'. So "Hi" occupies 3 bytes: \'H\', \'i\', \'\\0\'. Functions in <string.h> — strlen, strcpy, strcmp, strcat — rely on that terminator to know where the string ends. Forgetting the \'\\0\' leads to reads running off the end.',
      'Arrays decay to a pointer to their first element when passed to a function, which is why a function receiving an array cannot know its length via sizeof — you pass the length as a separate argument.',
    ],
    syntax: 'int scores[3] = {90, 85, 77};\nchar name[] = "Nara";   // includes \\0',
    code: `#include <stdio.h>
#include <string.h>

int main(void) {
    int scores[5] = {90, 85, 77, 60, 95};
    int n = 5, max = scores[0];
    for (int i = 1; i < n; i++)
        if (scores[i] > max) max = scores[i];
    printf("Highest score: %d\\n", max);

    char name[] = "Syllab";
    printf("'%s' has %zu letters\\n", name, strlen(name));
    return 0;
}`,
    output: "Highest score: 95\n'Syllab' has 6 letters",
    notes: [
      'strlen counts characters up to (not including) the \'\\0\', so "Syllab" → 6.',
      'Use %zu (not %d) to print a size_t like strlen returns, to avoid a warning.',
      'Never write past the last index — C will not stop you, and the bug may surface much later.',
    ],
    xp: 15,
    practice: {
      title: 'Reverse an array',
      description: 'Given int a[] = {1,2,3,4,5}, print it reversed on one line: "5 4 3 2 1 ".',
      startCode: `#include <stdio.h>\n\nint main(void) {\n    int a[] = {1, 2, 3, 4, 5};\n    int n = 5;\n    // print a[n-1] down to a[0]\n    return 0;\n}`,
      hint: 'Loop i from n-1 down to 0 and printf("%d ", a[i]).',
      solution: `#include <stdio.h>\n\nint main(void) {\n    int a[] = {1, 2, 3, 4, 5};\n    int n = 5;\n    for (int i = n - 1; i >= 0; i--)\n        printf("%d ", a[i]);\n    printf("\\n");\n    return 0;\n}`,
      expectedOutput: '5 4 3 2 1',
    },
  },
  {
    id: 'ccpp-pointers',
    category: 'C Fundamentals',
    title: 'Pointers — the Heart of C',
    difficulty: 'Advanced',
    theory: [
      'A pointer is a variable that stores the memory address of another variable. `int *p = &x;` makes p hold the address of x (& is the "address-of" operator). Dereferencing with *p reads or writes the value stored at that address. Pointers are what make C powerful and fast — and what make it dangerous if misused.',
      'The biggest practical use: pass-by-reference. Because C passes copies, a function that must modify a caller\'s variable takes a pointer to it. Inside, *p = value writes through the pointer to the original. This is how swap(), and functions that return multiple results, work.',
      'A pointer that points nowhere valid (NULL, or a freed/uninitialised address) must never be dereferenced — that is the infamous "segmentation fault". Always initialise pointers, check for NULL, and set a pointer to NULL after freeing it.',
    ],
    syntax: 'int x = 10;\nint *p = &x;    // p holds address of x\n*p = 20;        // now x == 20',
    code: `#include <stdio.h>

void swap(int *a, int *b) {   // takes addresses
    int tmp = *a;             // read through pointer
    *a = *b;
    *b = tmp;
}

int main(void) {
    int x = 3, y = 7;
    swap(&x, &y);             // pass addresses
    printf("x = %d, y = %d\\n", x, y);
    return 0;
}`,
    output: 'x = 7, y = 3',
    notes: [
      'Without pointers, swap would only exchange copies and x, y would stay 3, 7.',
      '`&x` = "address of x"; `*p` = "the value p points to". They are inverse operations.',
      'A dangling pointer (used after the thing it points to is gone) is undefined behaviour — a top source of C bugs.',
    ],
    xp: 20,
    practice: {
      title: 'Add via pointer',
      description: 'Write void add_ten(int *p) that adds 10 to whatever p points to. Call it on a variable = 5, then print 15.',
      startCode: `#include <stdio.h>\n\nvoid add_ten(int *p) {\n    // add 10 through the pointer\n}\n\nint main(void) {\n    int v = 5;\n    add_ten(&v);\n    printf("%d\\n", v);\n    return 0;\n}`,
      hint: 'Use *p += 10; to modify the pointed-to value.',
      solution: `#include <stdio.h>\n\nvoid add_ten(int *p) {\n    *p += 10;\n}\n\nint main(void) {\n    int v = 5;\n    add_ten(&v);\n    printf("%d\\n", v);\n    return 0;\n}`,
      expectedOutput: '15',
    },
  },
  {
    id: 'ccpp-structs',
    category: 'C Fundamentals',
    title: 'Structs — Grouping Related Data',
    difficulty: 'Intermediate',
    theory: [
      'A struct bundles several related variables (of possibly different types) into one named type — e.g. a Student has a name, a roll number and marks. This is how C models real-world entities before the language had objects. You access members with the dot operator: s.marks.',
      'When you have a pointer to a struct, use the arrow operator -> instead of dot: p->marks is shorthand for (*p).marks. Passing large structs by pointer avoids copying the whole thing and lets the function modify the original.',
      'A typedef gives a struct a short alias so you can write `Student s;` instead of `struct Student s;`. Structs are the direct ancestor of C++ classes — a class is essentially a struct that can also contain functions and access control.',
    ],
    syntax: 'typedef struct {\n    char name[30];\n    int roll;\n    double marks;\n} Student;',
    code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[30];
    int roll;
    double marks;
} Student;

int main(void) {
    Student s;
    strcpy(s.name, "Asha");
    s.roll = 12;
    s.marks = 91.5;

    Student *p = &s;                 // pointer to the struct
    p->marks += 5;                   // arrow through pointer

    printf("%s (roll %d): %.1f\\n", s.name, s.roll, s.marks);
    return 0;
}`,
    output: 'Asha (roll 12): 96.5',
    notes: [
      'Use strcpy to fill a char[] member — you cannot assign a string with = after declaration.',
      'p->marks and (*p).marks are identical; the arrow is just cleaner.',
      'sizeof(Student) may be larger than the sum of members due to memory alignment/padding.',
    ],
    xp: 15,
    practice: {
      title: 'Point struct',
      description: 'Define a struct Point{int x,y;}, make p = {3,4}, and print "Point: (3, 4)".',
      startCode: `#include <stdio.h>\n\ntypedef struct { int x, y; } Point;\n\nint main(void) {\n    // create and print the point\n    return 0;\n}`,
      hint: 'Point p = {3, 4}; then printf with p.x and p.y.',
      solution: `#include <stdio.h>\n\ntypedef struct { int x, y; } Point;\n\nint main(void) {\n    Point p = {3, 4};\n    printf("Point: (%d, %d)\\n", p.x, p.y);\n    return 0;\n}`,
      expectedOutput: 'Point: (3, 4)',
    },
  },
  {
    id: 'ccpp-memory',
    category: 'C Fundamentals',
    title: 'Dynamic Memory: malloc & free',
    difficulty: 'Advanced',
    theory: [
      'So far arrays had a fixed size known at compile time. When the size is only known at run time (e.g. the user says how many numbers), you allocate memory on the heap with malloc, which returns a pointer to a block of the requested bytes. `int *a = malloc(n * sizeof(int));` gives you an array of n ints.',
      'Heap memory is NOT freed automatically. Every malloc must be matched by exactly one free(a) when you are done, or the program leaks memory — a serious bug in long-running software. Freeing twice, or using memory after freeing it, is undefined behaviour.',
      'Always check whether malloc returned NULL (allocation can fail), and set a pointer to NULL after freeing so you never accidentally reuse it. In C++ the equivalents are `new` / `delete`, but modern C++ prefers containers like std::vector that manage memory for you.',
    ],
    syntax: 'int *a = malloc(n * sizeof(int));\n// ... use a ...\nfree(a);',
    code: `#include <stdio.h>
#include <stdlib.h>   // malloc, free

int main(void) {
    int n = 5;
    int *a = malloc(n * sizeof(int));   // heap array of 5 ints
    if (a == NULL) return 1;            // allocation failed

    for (int i = 0; i < n; i++) a[i] = (i + 1) * (i + 1);

    long sum = 0;
    for (int i = 0; i < n; i++) sum += a[i];
    printf("Sum of first 5 squares: %ld\\n", sum);

    free(a);                            // release the memory
    a = NULL;                           // avoid dangling pointer
    return 0;
}`,
    output: 'Sum of first 5 squares: 55',
    notes: [
      'malloc takes a number of BYTES — always multiply the count by sizeof(type).',
      'A leak (forgetting free) will not crash immediately but grows memory use over time.',
      'Tools like valgrind detect leaks and invalid accesses — standard on Linux for C/C++.',
    ],
    xp: 20,
    practice: {
      title: 'Dynamic array of cubes',
      description: 'Allocate an int array of size 3, fill it with 1, 8, 27 (i³ for i=1..3), print them space-separated, then free it.',
      startCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n = 3;\n    int *a = malloc(n * sizeof(int));\n    // fill, print, free\n    return 0;\n}`,
      hint: 'a[i] = (i+1)*(i+1)*(i+1); loop to print; then free(a).',
      solution: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n = 3;\n    int *a = malloc(n * sizeof(int));\n    for (int i = 0; i < n; i++) a[i] = (i+1)*(i+1)*(i+1);\n    for (int i = 0; i < n; i++) printf("%d ", a[i]);\n    printf("\\n");\n    free(a);\n    return 0;\n}`,
      expectedOutput: '1 8 27',
    },
  },
  {
    id: 'ccpp-classes',
    category: 'C++ & OOP',
    title: 'C++ Classes & Objects',
    difficulty: 'Intermediate',
    theory: [
      'C++ adds classes — a blueprint that bundles data (member variables) with the functions that operate on it (member functions / methods). This is Object-Oriented Programming (OOP): you model the problem as interacting objects. `class BankAccount { ... };` defines a type; `BankAccount a;` creates an object of it.',
      'Access specifiers control encapsulation: members under private: are hidden from outside code (the default for class), members under public: form the interface. You keep data private and expose safe methods, so an object can never be put into an invalid state from outside.',
      'A constructor is a special method with the class\'s name and no return type; it runs automatically when an object is created and initialises its members. This guarantees every object starts valid — a big improvement over C structs.',
    ],
    syntax: 'class Name {\nprivate:\n    int data;\npublic:\n    Name(int d) { data = d; }\n    int get() { return data; }\n};',
    code: `#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance;                       // hidden from outside
public:
    BankAccount(double start) { balance = start; }   // constructor
    void deposit(double amt) { balance += amt; }
    bool withdraw(double amt) {
        if (amt > balance) return false;  // guard invalid state
        balance -= amt;
        return true;
    }
    double getBalance() { return balance; }
};

int main() {
    BankAccount a(100);
    a.deposit(50);
    a.withdraw(30);
    cout << "Balance: " << a.getBalance() << endl;
    return 0;
}`,
    output: 'Balance: 120',
    notes: [
      'C++ uses cout << ... << endl for output instead of printf — type-safe and simpler.',
      'Because balance is private, no outside code can set it negative — encapsulation in action.',
      '`using namespace std;` lets you write cout instead of std::cout (fine for learning).',
    ],
    xp: 18,
    practice: {
      title: 'Counter class',
      description: 'Write a class Counter starting at 0 with increment() and get(). Increment 3 times and print 3.',
      startCode: `#include <iostream>\nusing namespace std;\n\nclass Counter {\n    // your code\n};\n\nint main() {\n    Counter c;\n    c.increment(); c.increment(); c.increment();\n    cout << c.get() << endl;\n    return 0;\n}`,
      hint: 'private int count = 0; public increment() { count++; } and get() { return count; }.',
      solution: `#include <iostream>\nusing namespace std;\n\nclass Counter {\nprivate:\n    int count = 0;\npublic:\n    void increment() { count++; }\n    int get() { return count; }\n};\n\nint main() {\n    Counter c;\n    c.increment(); c.increment(); c.increment();\n    cout << c.get() << endl;\n    return 0;\n}`,
      expectedOutput: '3',
    },
  },
  {
    id: 'ccpp-inheritance',
    category: 'C++ & OOP',
    title: 'Inheritance & Polymorphism',
    difficulty: 'Advanced',
    theory: [
      'Inheritance lets a class reuse and extend another. A derived class (Dog) inherits the members of a base class (Animal) and can add its own. This models "is-a" relationships and avoids duplicating shared code. Syntax: `class Dog : public Animal { ... };`.',
      'Polymorphism means "many forms": a base-class pointer or reference can point to any derived object, and calling a virtual function runs the version belonging to the actual object\'s type, decided at run time. Mark the base method `virtual` and override it in the derived class. This is how one loop can treat many different shapes/animals uniformly.',
      'Always give a base class a virtual destructor if you delete derived objects through a base pointer, otherwise the derived part may not be cleaned up. Together, encapsulation + inheritance + polymorphism are the three pillars of OOP that C++ interviews test.',
    ],
    syntax: 'class Base { public: virtual void speak(); };\nclass Derived : public Base { public: void speak() override; };',
    code: `#include <iostream>
using namespace std;

class Animal {
public:
    virtual string sound() { return "..."; }   // virtual = overridable
};

class Dog : public Animal {
public:
    string sound() override { return "Woof"; }
};

class Cat : public Animal {
public:
    string sound() override { return "Meow"; }
};

int main() {
    Animal *pets[2] = { new Dog(), new Cat() };
    for (int i = 0; i < 2; i++)
        cout << pets[i]->sound() << " ";   // right version each time
    cout << endl;
    for (int i = 0; i < 2; i++) delete pets[i];
    return 0;
}`,
    output: 'Woof Meow',
    notes: [
      'Without `virtual`, pets[i]->sound() would always call Animal\'s version (static binding).',
      '`override` is optional but lets the compiler catch typos in the overriding signature.',
      'One base-type array holding different derived objects is the essence of polymorphism.',
    ],
    xp: 20,
    practice: {
      title: 'Shape area',
      description: 'Base class Shape with virtual double area()=0 style; make a Square(side=4) returning 16 and print it via a Shape*.',
      startCode: `#include <iostream>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual double area() { return 0; }\n};\n\n// define Square here\n\nint main() {\n    Shape *s = /* new Square(4) */ nullptr;\n    // cout << s->area() << endl;\n    return 0;\n}`,
      hint: 'Square stores side; area() returns side*side; create with new Square(4).',
      solution: `#include <iostream>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual double area() { return 0; }\n};\n\nclass Square : public Shape {\n    double side;\npublic:\n    Square(double s) { side = s; }\n    double area() override { return side * side; }\n};\n\nint main() {\n    Shape *s = new Square(4);\n    cout << s->area() << endl;\n    delete s;\n    return 0;\n}`,
      expectedOutput: '16',
    },
  },
  {
    id: 'ccpp-stl',
    category: 'C++ & OOP',
    title: 'The STL: vector, map & algorithms',
    difficulty: 'Intermediate',
    theory: [
      'The Standard Template Library (STL) is why competitive programmers love C++. Instead of raw arrays and malloc, you use ready-made containers: std::vector is a dynamic array that grows automatically, std::map / std::unordered_map is a key→value dictionary, std::set stores unique sorted values. They manage their own memory — no free needed.',
      'Templates make these containers work for any type: vector<int>, vector<string>, map<string,int>. You add with push_back, get the size with .size(), and iterate with a range-based for: `for (int x : v)`. This is far safer than manual C arrays because the container knows its own length.',
      'The <algorithm> header provides sort, max_element, count, find and more that work on any container via iterators — `sort(v.begin(), v.end())` sorts a vector in O(n log n). Knowing the STL well means you write less code and fewer bugs in interviews.',
    ],
    syntax: '#include <vector>\nvector<int> v = {3, 1, 2};\nv.push_back(5);\nsort(v.begin(), v.end());',
    code: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1};
    v.push_back(3);
    sort(v.begin(), v.end());
    cout << "Sorted: ";
    for (int x : v) cout << x << " ";
    cout << endl;

    map<string, int> marks;
    marks["Asha"] = 91;
    marks["Ravi"] = 84;
    for (auto &kv : marks)
        cout << kv.first << " -> " << kv.second << endl;
    return 0;
}`,
    output: 'Sorted: 1 2 3 5 8\nAsha -> 91\nRavi -> 84',
    notes: [
      'A std::map keeps keys sorted, so Asha prints before Ravi automatically.',
      'Use unordered_map for average O(1) lookups when you don\'t need sorted keys.',
      'Range-based for (`for (int x : v)`) is the modern, clean way to iterate.',
    ],
    xp: 18,
    practice: {
      title: 'Vector max',
      description: 'Put {4, 9, 2, 7} in a vector<int> and print the maximum (9) using max_element.',
      startCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {4, 9, 2, 7};\n    // print the max\n    return 0;\n}`,
      hint: '*max_element(v.begin(), v.end()) gives the largest value (note the * to dereference).',
      solution: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v = {4, 9, 2, 7};\n    cout << *max_element(v.begin(), v.end()) << endl;\n    return 0;\n}`,
      expectedOutput: '9',
    },
  },
];
