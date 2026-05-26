import { TutorialTopic } from './types';

export const javaTopics: TutorialTopic[] = [
  {
    id: 'java-intro',
    category: 'Getting Started',
    title: 'Introduction to Java',
    difficulty: 'Beginner',
    theory: [
      'Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It was created by James Gosling at Sun Microsystems (now Oracle) and released in 1995.',
      'Java follows the principle of "Write Once, Run Anywhere" (WORA) — compiled Java code can run on any platform that has the Java Virtual Machine (JVM) installed, without recompilation.',
      'Java is statically typed, meaning you must declare the type of every variable before using it. This catches many bugs at compile time rather than at runtime.',
      'Every Java program must have at least one class, and the entry point of any Java application is the `main` method inside a class. The JVM looks specifically for `public static void main(String[] args)`.',
      'Java is widely used for Android apps, enterprise backend systems, big data tools (like Hadoop), and financial applications due to its reliability and performance.',
    ],
    syntax: `public class ClassName {
    public static void main(String[] args) {
        // your code here
        System.out.println("Hello, World!");
    }
}`,
    code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Java version: " + System.getProperty("java.version"));

        // Variables
        String name = "Syllab";
        int year = 2025;
        System.out.println(name + " was launched in " + year);
    }
}`,
    output: `Hello, World!
Java version: 17.0.x
Syllab was launched in 2025`,
    notes: [
      'Java filenames MUST match the class name exactly (case-sensitive): class HelloWorld → file HelloWorld.java.',
      'System.out.println() prints a line and moves to the next line; System.out.print() stays on the same line.',
      'Java is case-sensitive: `Main` and `main` are different identifiers.',
      'Comments: single-line `// comment`, multi-line `/* comment */`, doc `/** JavaDoc */`.',
    ],
    practice: {
      title: 'Your First Java Program',
      description: 'Write a Java program that prints your name, your favorite programming language, and the current year (2025) on three separate lines.',
      startCode: `public class MyFirstProgram {
    public static void main(String[] args) {
        // Print your name

        // Print your favorite language

        // Print the year 2025

    }
}`,
      hint: 'Use System.out.println() three times, once for each piece of information.',
      expectedOutput: 'Your Name\nJava\n2025',
      solution: `public class MyFirstProgram {
    public static void main(String[] args) {
        System.out.println("Alex");
        System.out.println("Java");
        System.out.println(2025);
    }
}`,
    },
  },

  {
    id: 'java-variables',
    category: 'Getting Started',
    title: 'Variables & Data Types',
    difficulty: 'Beginner',
    theory: [
      'Java is a statically-typed language — every variable must have a declared type. Java has two categories of data types: primitive types and reference types.',
      'Primitive types store actual values directly in memory. There are 8 primitive types: byte, short, int, long, float, double, boolean, and char.',
      'Reference types store a reference (memory address) to an object. Strings, arrays, and all class instances are reference types.',
      'The most commonly used primitives are: `int` (whole numbers), `double` (decimal numbers), `boolean` (true/false), and `char` (single character).',
      'Java also provides wrapper classes (Integer, Double, Boolean, Character) for every primitive — these are objects and provide useful utility methods.',
      'Type casting allows you to convert between types. Widening (int → double) happens automatically; narrowing (double → int) requires explicit cast with `(type)`.',
    ],
    syntax: `// Primitive types
int myInt = 10;
double myDouble = 9.99;
boolean myBool = true;
char myChar = 'A';
long myLong = 15000000000L;
float myFloat = 5.75f;

// Reference type
String myString = "Hello";

// Type casting
double d = 9.7;
int i = (int) d;  // narrowing: i = 9 (truncated)`,
    code: `public class DataTypes {
    public static void main(String[] args) {
        // Integer types
        byte b = 127;
        short s = 32000;
        int i = 2_000_000;   // underscores for readability
        long l = 9_000_000_000L;  // L suffix for long

        // Floating-point types
        float f = 3.14f;     // f suffix for float
        double d = 3.14159265358979;

        // Other primitives
        boolean isJavaFun = true;
        char grade = 'A';

        // String (reference type)
        String language = "Java";

        System.out.println("int: " + i);
        System.out.println("double: " + d);
        System.out.println("boolean: " + isJavaFun);
        System.out.println("char: " + grade);
        System.out.println("String: " + language);

        // Type casting
        double price = 9.99;
        int rounded = (int) price;  // truncates decimal
        System.out.println("Truncated: " + rounded);

        // String to int
        String numStr = "42";
        int parsed = Integer.parseInt(numStr);
        System.out.println("Parsed: " + parsed);
    }
}`,
    output: `int: 2000000
double: 3.14159265358979
boolean: true
char: A
String: Java
Truncated: 9
Parsed: 42`,
    notes: [
      'Use `int` by default for whole numbers; use `long` only when values exceed ~2.1 billion.',
      'Use `double` by default for decimals; `float` has less precision and is rarely preferred.',
      'String is not a primitive — it is a class in `java.lang` and is auto-imported.',
      '`final` keyword makes a variable a constant: `final int MAX = 100;`',
      'Java initializes class-level fields to defaults (0, false, null) but local variables must be explicitly initialized.',
    ],
    practice: {
      title: 'Variable Explorer',
      description: 'Declare variables of at least 5 different types (int, double, boolean, char, String). Then print a sentence that uses all of them in a meaningful way.',
      startCode: `public class VariableExplorer {
    public static void main(String[] args) {
        // Declare 5 different variable types

        // Print a meaningful sentence using all variables

    }
}`,
      hint: 'Use String concatenation with + to combine variables into a sentence.',
      expectedOutput: 'Student Alice scored 95.5 in Java. Passed: true. Grade: A.',
      solution: `public class VariableExplorer {
    public static void main(String[] args) {
        String name = "Alice";
        double score = 95.5;
        int subject = 1;
        boolean passed = true;
        char grade = 'A';

        System.out.println("Student " + name + " scored " + score + " in Java. Passed: " + passed + ". Grade: " + grade + ".");
    }
}`,
    },
  },

  {
    id: 'java-control-flow',
    category: 'Control Flow',
    title: 'If/Else, Switch & Loops',
    difficulty: 'Beginner',
    theory: [
      'Control flow statements determine the order in which your code executes. Java provides if/else for branching, switch for multi-way branching, and for/while/do-while for loops.',
      'The `if` statement evaluates a boolean expression. If true, the if-block runs; otherwise the optional `else` block runs.',
      'A `switch` statement compares a variable against multiple constant values (called cases). Java\'s switch works with int, String, char, and enum types.',
      'Java has three loop constructs: `for` (used when the number of iterations is known), `while` (used when iterations depend on a condition), and `do-while` (executes at least once, then checks the condition).',
      'The enhanced for-each loop (`for (type item : collection)`) is ideal for iterating over arrays and collections without needing an index.',
      '`break` exits a loop or switch immediately; `continue` skips the current iteration and moves to the next one.',
    ],
    syntax: `// If/else
if (condition) {
    // runs if true
} else if (anotherCondition) {
    // runs if anotherCondition is true
} else {
    // fallback
}

// Switch
switch (variable) {
    case value1: doSomething(); break;
    case value2: doSomethingElse(); break;
    default: fallback();
}

// For loop
for (int i = 0; i < 5; i++) { }

// While loop
while (condition) { }

// Enhanced for-each
for (String item : array) { }`,
    code: `public class ControlFlow {
    public static void main(String[] args) {
        // --- If/else ---
        int score = 78;
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else if (score >= 70) {
            System.out.println("Grade: C");
        } else {
            System.out.println("Grade: F");
        }

        // --- Switch ---
        String day = "Monday";
        switch (day) {
            case "Saturday":
            case "Sunday":
                System.out.println("Weekend!");
                break;
            case "Monday":
                System.out.println("Start of work week.");
                break;
            default:
                System.out.println("Weekday.");
        }

        // --- For loop ---
        System.out.print("Squares: ");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i * i + " ");
        }
        System.out.println();

        // --- While loop ---
        int n = 1;
        System.out.print("Powers of 2: ");
        while (n <= 32) {
            System.out.print(n + " ");
            n *= 2;
        }
        System.out.println();

        // --- Enhanced for-each ---
        String[] langs = {"Java", "Python", "JavaScript"};
        for (String lang : langs) {
            System.out.println("Language: " + lang);
        }
    }
}`,
    output: `Grade: C
Start of work week.
Squares: 1 4 9 16 25
Powers of 2: 1 2 4 8 16 32
Language: Java
Language: Python
Language: JavaScript`,
    notes: [
      'Always add `break` at the end of each switch case to prevent fall-through (unless fall-through is intentional).',
      'Java 14+ introduced switch expressions with `->` arrow syntax: `String result = switch (day) { case "Mon" -> "Monday"; ... };`',
      'Avoid infinite loops: ensure the while condition eventually becomes false.',
      'The ternary operator is a compact if/else: `int max = (a > b) ? a : b;`',
    ],
    practice: {
      title: 'FizzBuzz',
      description: 'Write the classic FizzBuzz: print numbers 1 to 20. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For multiples of both 3 and 5, print "FizzBuzz".',
      startCode: `public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 20; i++) {
            // Your logic here

        }
    }
}`,
      hint: 'Check divisibility by 15 (both 3 and 5) FIRST, then 3, then 5, then default.',
      expectedOutput: '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz',
      solution: `public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 20; i++) {
            if (i % 15 == 0) System.out.print("FizzBuzz ");
            else if (i % 3 == 0) System.out.print("Fizz ");
            else if (i % 5 == 0) System.out.print("Buzz ");
            else System.out.print(i + " ");
        }
    }
}`,
    },
  },

  {
    id: 'java-arrays-methods',
    category: 'Arrays & Methods',
    title: 'Arrays & Methods',
    difficulty: 'Intermediate',
    theory: [
      'An array in Java is a fixed-size container that holds multiple values of the same type. Arrays are zero-indexed: the first element is at index 0.',
      'Java arrays are objects, so they have a `.length` property (not a method). Arrays cannot be resized after creation — for dynamic sizing, use ArrayList.',
      'Methods (functions) allow you to encapsulate reusable logic. Java methods have: an access modifier, return type, name, parameters, and body.',
      'A method must declare its return type. If it returns nothing, the return type is `void`. Use `return` to send a value back to the caller.',
      'Java supports method overloading: multiple methods with the same name but different parameter lists. The compiler picks the right one based on the arguments provided.',
      'The `Arrays` utility class (from `java.util.Arrays`) provides helpful methods: `Arrays.sort()`, `Arrays.toString()`, `Arrays.fill()`, `Arrays.copyOf()`.',
    ],
    syntax: `// Declare and initialize array
int[] nums = {1, 2, 3, 4, 5};
String[] names = new String[3];  // empty array of size 3

// Access & modify
int first = nums[0];
nums[2] = 99;

// Method declaration
returnType methodName(paramType param1, paramType param2) {
    // body
    return value;  // omit if void
}`,
    code: `import java.util.Arrays;

public class ArraysAndMethods {

    // Static method: sum of array
    static int sum(int[] arr) {
        int total = 0;
        for (int n : arr) total += n;
        return total;
    }

    // Overloaded: sum two ints
    static int sum(int a, int b) {
        return a + b;
    }

    // Find maximum in array
    static int max(int[] arr) {
        int biggest = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > biggest) biggest = arr[i];
        }
        return biggest;
    }

    // Reverse an array in place
    static void reverse(int[] arr) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        int[] numbers = {3, 1, 4, 1, 5, 9, 2, 6};

        System.out.println("Array: " + Arrays.toString(numbers));
        System.out.println("Sum: " + sum(numbers));
        System.out.println("Sum (2 args): " + sum(10, 20));
        System.out.println("Max: " + max(numbers));

        Arrays.sort(numbers);
        System.out.println("Sorted: " + Arrays.toString(numbers));

        reverse(numbers);
        System.out.println("Reversed: " + Arrays.toString(numbers));

        // 2D array
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        System.out.println("Matrix center: " + matrix[1][1]);
    }
}`,
    output: `Array: [3, 1, 4, 1, 5, 9, 2, 6]
Sum: 31
Sum (2 args): 30
Max: 9
Sorted: [1, 1, 2, 3, 4, 5, 6, 9]
Reversed: [9, 6, 5, 4, 3, 2, 1, 1]
Matrix center: 5`,
    notes: [
      'Array indices run from 0 to length-1. Accessing arr[arr.length] throws ArrayIndexOutOfBoundsException.',
      'Use `ArrayList<Integer>` (from java.util) when you need a dynamically growing list.',
      'Static methods belong to the class and can be called without creating an object: `MyClass.myMethod()`.',
      'Pass arrays to methods by reference — changes inside the method affect the original array.',
    ],
    practice: {
      title: 'Statistics Calculator',
      description: 'Write a program with a method `average(int[] arr)` that returns the average of the array. Also write `countAboveAverage(int[] arr)` that counts how many elements are above the average. Test with array {85, 92, 78, 95, 88, 72, 90}.',
      startCode: `public class Statistics {

    static double average(int[] arr) {
        // Return the average of the array

    }

    static int countAboveAverage(int[] arr) {
        // Count elements above the average

    }

    public static void main(String[] args) {
        int[] scores = {85, 92, 78, 95, 88, 72, 90};
        System.out.println("Average: " + average(scores));
        System.out.println("Above average: " + countAboveAverage(scores));
    }
}`,
      hint: 'Calculate sum / length for average. Then loop and count elements > average.',
      expectedOutput: 'Average: 85.71428571428571\nAbove average: 4',
      solution: `public class Statistics {
    static double average(int[] arr) {
        int sum = 0;
        for (int n : arr) sum += n;
        return (double) sum / arr.length;
    }
    static int countAboveAverage(int[] arr) {
        double avg = average(arr);
        int count = 0;
        for (int n : arr) if (n > avg) count++;
        return count;
    }
    public static void main(String[] args) {
        int[] scores = {85, 92, 78, 95, 88, 72, 90};
        System.out.println("Average: " + average(scores));
        System.out.println("Above average: " + countAboveAverage(scores));
    }
}`,
    },
  },

  {
    id: 'java-oop',
    category: 'Object-Oriented Programming',
    title: 'Classes & Objects',
    difficulty: 'Intermediate',
    theory: [
      'Object-Oriented Programming (OOP) is the foundation of Java. Everything in Java is organized around classes and objects.',
      'A class is a blueprint or template. An object is a specific instance of that class created at runtime. For example, `Car` is a class; your specific red Honda Civic is an object.',
      'Classes have fields (data/attributes) and methods (behavior). Fields store the state of an object; methods define what the object can do.',
      'A constructor is a special method called when creating an object with `new`. It has the same name as the class and no return type.',
      'The `this` keyword refers to the current instance of the class. It\'s used to distinguish between instance variables and constructor/method parameters with the same name.',
      'Encapsulation is the practice of making fields `private` and providing `public` getter and setter methods to control access — protecting data integrity.',
    ],
    syntax: `public class ClassName {
    // Fields (private for encapsulation)
    private dataType fieldName;

    // Constructor
    public ClassName(dataType param) {
        this.fieldName = param;
    }

    // Getter
    public dataType getFieldName() { return fieldName; }

    // Setter
    public void setFieldName(dataType val) { fieldName = val; }

    // Method
    public returnType methodName() { ... }
}

// Create object
ClassName obj = new ClassName(value);`,
    code: `public class BankAccount {
    // Private fields (encapsulation)
    private String owner;
    private double balance;
    private int accountNumber;
    private static int nextAccountNumber = 1001;  // shared across all instances

    // Constructor
    public BankAccount(String owner, double initialDeposit) {
        this.owner = owner;
        this.balance = initialDeposit;
        this.accountNumber = nextAccountNumber++;
    }

    // Getters
    public String getOwner() { return owner; }
    public double getBalance() { return balance; }
    public int getAccountNumber() { return accountNumber; }

    // Methods
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited $" + amount + ". Balance: $" + balance);
        }
    }

    public void withdraw(double amount) {
        if (amount > balance) {
            System.out.println("Insufficient funds!");
        } else {
            balance -= amount;
            System.out.println("Withdrew $" + amount + ". Balance: $" + balance);
        }
    }

    @Override
    public String toString() {
        return "Account #" + accountNumber + " | Owner: " + owner + " | Balance: $" + balance;
    }

    public static void main(String[] args) {
        BankAccount alice = new BankAccount("Alice", 1000.0);
        BankAccount bob   = new BankAccount("Bob",   500.0);

        System.out.println(alice);
        System.out.println(bob);

        alice.deposit(250);
        alice.withdraw(100);
        bob.withdraw(600);   // insufficient funds

        System.out.println("\\nFinal state:");
        System.out.println(alice);
        System.out.println(bob);
    }
}`,
    output: `Account #1001 | Owner: Alice | Balance: $1000.0
Account #1002 | Owner: Bob | Balance: $500.0
Deposited $250.0. Balance: $1250.0
Withdrew $100.0. Balance: $1150.0
Insufficient funds!

Final state:
Account #1001 | Owner: Alice | Balance: $1150.0
Account #1002 | Owner: Bob | Balance: $500.0`,
    notes: [
      'Always keep fields private and use getters/setters — this is core OOP encapsulation.',
      '`static` fields/methods belong to the class itself, not any specific instance.',
      '`@Override` annotation is a best practice when overriding inherited methods (like toString from Object).',
      'Every Java class implicitly extends `Object`, which provides toString(), equals(), hashCode(), etc.',
    ],
    practice: {
      title: 'Student Grade Manager',
      description: 'Create a `Student` class with fields: name (String), grades (double array of 3 scores). Add a method `getAverage()` and a method `getLetterGrade()` (A≥90, B≥80, C≥70, F otherwise). Create two Student objects and print their name, average, and letter grade.',
      startCode: `public class Student {
    private String name;
    private double[] grades;

    public Student(String name, double[] grades) {
        // Initialize fields

    }

    public double getAverage() {
        // Return average of grades

    }

    public String getLetterGrade() {
        // Return A, B, C, or F based on average

    }

    public static void main(String[] args) {
        double[] aliceGrades = {92, 88, 95};
        double[] bobGrades = {72, 65, 78};

        Student alice = new Student("Alice", aliceGrades);
        Student bob = new Student("Bob", bobGrades);

        // Print each student's name, average, and letter grade

    }
}`,
      hint: 'Sum all grades and divide by grades.length in getAverage(). Use if/else chain in getLetterGrade() using the average.',
      expectedOutput: 'Alice: Average=91.67, Grade=A\nBob: Average=71.67, Grade=C',
      solution: `public class Student {
    private String name;
    private double[] grades;
    public Student(String name, double[] grades) { this.name = name; this.grades = grades; }
    public double getAverage() {
        double sum = 0; for (double g : grades) sum += g;
        return Math.round(sum / grades.length * 100.0) / 100.0;
    }
    public String getLetterGrade() {
        double avg = getAverage();
        if (avg >= 90) return "A"; if (avg >= 80) return "B"; if (avg >= 70) return "C"; return "F";
    }
    public static void main(String[] args) {
        Student alice = new Student("Alice", new double[]{92,88,95});
        Student bob = new Student("Bob", new double[]{72,65,78});
        System.out.println(alice.name + ": Average=" + alice.getAverage() + ", Grade=" + alice.getLetterGrade());
        System.out.println(bob.name + ": Average=" + bob.getAverage() + ", Grade=" + bob.getLetterGrade());
    }
}`,
    },
  },

  {
    id: 'java-inheritance',
    category: 'Object-Oriented Programming',
    title: 'Inheritance & Polymorphism',
    difficulty: 'Intermediate',
    theory: [
      'Inheritance allows a class (child/subclass) to acquire the fields and methods of another class (parent/superclass). Use the `extends` keyword.',
      'Polymorphism means "many forms" — a parent type reference can hold a child type object. The correct method is called at runtime based on the actual object type (dynamic dispatch).',
      'The `super` keyword refers to the parent class. Use `super()` to call the parent constructor; use `super.method()` to call a parent method from the child.',
      'Method overriding: a child class provides its own implementation of a method defined in the parent. Use `@Override` annotation to signal this intent.',
      'Abstract classes (declared with `abstract`) cannot be instantiated directly. They serve as base classes and can have abstract methods (no body) that subclasses must implement.',
      'Interfaces define a contract — a set of method signatures that implementing classes must provide. A class can implement multiple interfaces (unlike extends, which allows only one parent).',
    ],
    syntax: `// Parent class
public class Animal {
    protected String name;
    public Animal(String name) { this.name = name; }
    public void speak() { System.out.println("..."); }
}

// Child class
public class Dog extends Animal {
    public Dog(String name) { super(name); }  // call parent constructor

    @Override
    public void speak() { System.out.println(name + " says: Woof!"); }
}

// Polymorphism
Animal a = new Dog("Rex");
a.speak();  // calls Dog's speak() at runtime`,
    code: `public class InheritanceDemo {

    // Abstract parent class
    abstract static class Shape {
        String color;
        Shape(String color) { this.color = color; }
        abstract double area();       // must be implemented by subclasses
        abstract double perimeter();

        void describe() {
            System.out.printf("%s %s: area=%.2f, perimeter=%.2f%n",
                color, getClass().getSimpleName(), area(), perimeter());
        }
    }

    static class Circle extends Shape {
        double radius;
        Circle(String color, double radius) { super(color); this.radius = radius; }

        @Override public double area() { return Math.PI * radius * radius; }
        @Override public double perimeter() { return 2 * Math.PI * radius; }
    }

    static class Rectangle extends Shape {
        double width, height;
        Rectangle(String color, double w, double h) { super(color); width=w; height=h; }

        @Override public double area() { return width * height; }
        @Override public double perimeter() { return 2 * (width + height); }
    }

    static class Square extends Rectangle {
        Square(String color, double side) { super(color, side, side); }
        // Inherits area() and perimeter() from Rectangle
    }

    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle("Red", 5),
            new Rectangle("Blue", 4, 6),
            new Square("Green", 3)
        };

        for (Shape s : shapes) {
            s.describe();  // polymorphism — calls correct subclass method
        }

        // instanceof check
        for (Shape s : shapes) {
            if (s instanceof Circle c) {
                System.out.println("Found circle with radius: " + c.radius);
            }
        }
    }
}`,
    output: `Red Circle: area=78.54, perimeter=31.42
Blue Rectangle: area=24.00, perimeter=20.00
Green Square: area=9.00, perimeter=12.00
Found circle with radius: 5.0`,
    notes: [
      'Java supports single inheritance for classes (one parent only) but multiple interface implementation.',
      '`instanceof` checks the actual runtime type; Java 16+ supports pattern matching: `if (s instanceof Circle c)`.',
      'The `final` keyword on a class prevents it from being extended; on a method prevents overriding.',
      'Abstract classes can have concrete methods too — only abstract methods lack a body.',
    ],
    practice: {
      title: 'Vehicle Hierarchy',
      description: 'Create an abstract class `Vehicle` with fields `brand` and `speed`, and an abstract method `fuelType()`. Create two subclasses: `ElectricCar` (fuelType returns "Electric") and `GasCar` (fuelType returns "Petrol"). Add a `describe()` method in Vehicle. Test with polymorphism.',
      startCode: `public class VehicleHierarchy {

    abstract static class Vehicle {
        String brand;
        int speed;

        Vehicle(String brand, int speed) {
            // Initialize fields

        }

        abstract String fuelType();

        void describe() {
            // Print: "Brand: X | Speed: Y km/h | Fuel: Z"

        }
    }

    static class ElectricCar extends Vehicle {
        ElectricCar(String brand, int speed) { super(brand, speed); }

        @Override
        String fuelType() { return "Electric"; }
    }

    static class GasCar extends Vehicle {
        GasCar(String brand, int speed) { super(brand, speed); }

        @Override
        String fuelType() { return "Petrol"; }
    }

    public static void main(String[] args) {
        Vehicle[] fleet = {
            new ElectricCar("Tesla", 250),
            new GasCar("Toyota", 180)
        };

        for (Vehicle v : fleet) {
            v.describe();
        }
    }
}`,
      hint: 'In describe(), use System.out.println with brand, speed, and fuelType() together.',
      expectedOutput: 'Brand: Tesla | Speed: 250 km/h | Fuel: Electric\nBrand: Toyota | Speed: 180 km/h | Fuel: Petrol',
      solution: `public class VehicleHierarchy {
    abstract static class Vehicle {
        String brand; int speed;
        Vehicle(String brand, int speed) { this.brand = brand; this.speed = speed; }
        abstract String fuelType();
        void describe() { System.out.println("Brand: " + brand + " | Speed: " + speed + " km/h | Fuel: " + fuelType()); }
    }
    static class ElectricCar extends Vehicle {
        ElectricCar(String brand, int speed) { super(brand, speed); }
        @Override String fuelType() { return "Electric"; }
    }
    static class GasCar extends Vehicle {
        GasCar(String brand, int speed) { super(brand, speed); }
        @Override String fuelType() { return "Petrol"; }
    }
    public static void main(String[] args) {
        Vehicle[] fleet = { new ElectricCar("Tesla", 250), new GasCar("Toyota", 180) };
        for (Vehicle v : fleet) v.describe();
    }
}`,
    },
  },

  // ─── Exception Handling ──────────────────────────────────────────────────────
  {
    id: 'java-exceptions',
    category: 'Error Handling',
    title: 'Exception Handling — try, catch, finally',
    difficulty: 'Intermediate',
    theory: [
      `An exception is an unexpected event that disrupts normal program flow: dividing by zero, accessing a null reference, reading a file that doesn't exist. Java has a robust exception handling system using try-catch-finally blocks.`,
      `try: code that might throw an exception. catch: what to do when a specific exception occurs. finally: code that ALWAYS runs (use for cleanup — closing files, connections). throw: manually throw an exception. throws: declare that a method might throw an exception.`,
      `Checked exceptions (must be handled — IOException, SQLException) vs Unchecked exceptions (extend RuntimeException — NullPointerException, ArrayIndexOutOfBoundsException, NumberFormatException). Understanding the difference is important for Java exams.`,
    ],
    syntax: `try {
    // risky code
} catch (ExceptionType e) {
    // handle error
    System.out.println(e.getMessage());
} finally {
    // always executes
}`,
    code: `public class ExceptionDemo {
    // Custom exception
    static class InsufficientFundsException extends Exception {
        double amount;
        InsufficientFundsException(double amount) {
            super("Insufficient funds: need ₹" + amount + " more");
            this.amount = amount;
        }
    }

    // Bank account with exception handling
    static class BankAccount {
        String owner;
        double balance;

        BankAccount(String owner, double initialBalance) {
            this.owner = owner;
            this.balance = initialBalance;
        }

        void deposit(double amount) {
            if (amount <= 0) throw new IllegalArgumentException("Deposit must be positive!");
            balance += amount;
            System.out.println("✅ Deposited ₹" + amount + " | Balance: ₹" + balance);
        }

        void withdraw(double amount) throws InsufficientFundsException {
            if (amount <= 0) throw new IllegalArgumentException("Withdrawal must be positive!");
            if (amount > balance) {
                throw new InsufficientFundsException(amount - balance);
            }
            balance -= amount;
            System.out.println("✅ Withdrawn ₹" + amount + " | Balance: ₹" + balance);
        }
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount("Arjun", 5000.0);

        // Normal operations
        try {
            account.deposit(2000);
            account.withdraw(1500);
            account.withdraw(10000);  // This will fail!
        } catch (InsufficientFundsException e) {
            System.out.println("❌ Error: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("❌ Invalid: " + e.getMessage());
        } finally {
            System.out.println("Final balance: ₹" + account.balance);
        }

        // NumberFormatException example
        String input = "abc";
        try {
            int num = Integer.parseInt(input);
        } catch (NumberFormatException e) {
            System.out.println("\n❌ Cannot parse '" + input + "' as number");
        }
    }
}`,
    output: `✅ Deposited ₹2000.0 | Balance: ₹7000.0
✅ Withdrawn ₹1500.0 | Balance: ₹5500.0
❌ Error: Insufficient funds: need ₹4500.0 more
Final balance: ₹5500.0

❌ Cannot parse 'abc' as number`,
    notes: [
      `Multiple catch blocks: order from most specific (child class) to most general (parent class). Catch Exception last — it catches everything.`,
      `finally always runs — even if there's a return statement in try or catch. It's the right place to close connections, files, or database handles.`,
      `CBSE Java exam often asks you to identify which exception a code segment will throw — know: NullPointerException, ArrayIndexOutOfBoundsException, NumberFormatException, ArithmeticException (÷0).`,
    ],
    practice: {
      title: 'Grade Input Validator',
      description: `Build a grade input validator that handles all possible bad inputs: non-numeric input (NumberFormatException), marks out of range 0-100 (throw custom InvalidMarksException), and null input (NullPointerException). Return the grade letter on valid input.`,
      startCode: `public class GradeValidator {
    // Custom exception
    static class InvalidMarksException extends Exception {
        InvalidMarksException(int marks) {
            super("Marks " + marks + " is out of range (0-100)");
        }
    }

    static String getGrade(String input) throws InvalidMarksException {
        // Step 1: Check for null
        if (input == null) throw new NullPointerException("Input cannot be null");

        // Step 2: Parse to integer (may throw NumberFormatException)
        int marks = Integer.parseInt(input.trim());  // throws NumberFormatException

        // Step 3: Validate range
        if (marks < 0 || marks > 100) throw new InvalidMarksException(marks);

        // Step 4: Return grade
        if (marks >= 90) return "A+";
        if (marks >= 80) return "A";
        if (marks >= 70) return "B";
        if (marks >= 40) return "D";
        return "F";
    }

    public static void main(String[] args) {
        String[] inputs = {"85", "abc", "150", null, "-5", "72"};

        for (String inp : inputs) {
            try {
                String grade = getGrade(inp);
                System.out.println("Input: '" + inp + "' → Grade: " + grade);
            } catch (NumberFormatException e) {
                System.out.println("Input: '" + inp + "' → NOT A NUMBER");
            } catch (InvalidMarksException e) {
                System.out.println("Input: '" + inp + "' → " + e.getMessage());
            } catch (NullPointerException e) {
                System.out.println("Input: null → NULL INPUT ERROR");
            }
        }
    }
}`,
      hint: `The code structure is largely given. Make sure the catch blocks are in the right order — more specific exceptions (InvalidMarksException) before more general ones (Exception).`,
      expectedOutput: `Input: '85' → Grade: A
Input: 'abc' → NOT A NUMBER
Input: '150' → Marks 150 is out of range (0-100)
Input: null → NULL INPUT ERROR
Input: '-5' → Marks -5 is out of range (0-100)
Input: '72' → Grade: B`,
    },
  },

  // ─── Collections: ArrayList & HashMap ────────────────────────────────────────
  {
    id: 'java-collections',
    category: 'Collections',
    title: 'ArrayList and HashMap — Java Collections',
    difficulty: 'Intermediate',
    theory: [
      `Java Collections Framework provides pre-built data structures. The most used: ArrayList (dynamic array — like Python list), HashMap (key-value pairs — like Python dict), LinkedList, HashSet, TreeMap.`,
      `ArrayList<Type>: A resizable list. Unlike arrays, it grows automatically. Key methods: add(), get(), remove(), size(), contains(), indexOf(), clear(), sort(). Use when you need an ordered, indexed list that can grow.`,
      `HashMap<K, V>: Stores key-value pairs with O(1) lookup by key. Key methods: put(), get(), remove(), containsKey(), containsValue(), keySet(), values(), entrySet(). Use when you need fast lookups by key (like a phone book or dictionary).`,
    ],
    syntax: `// ArrayList
ArrayList<String> list = new ArrayList<>();
list.add("item");
list.get(0);
list.remove(0);
list.size();

// HashMap
HashMap<String, Integer> map = new HashMap<>();
map.put("Arjun", 85);
map.get("Arjun");       // 85
map.containsKey("key");`,
    code: `import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {

        // ── ARRAYLIST ──────────────────────────────────
        ArrayList<String> students = new ArrayList<>();
        students.add("Arjun");
        students.add("Priya");
        students.add("Rahul");
        students.add("Sneha");

        System.out.println("Students: " + students);
        System.out.println("Size: " + students.size());
        System.out.println("Contains Priya: " + students.contains("Priya"));
        students.remove("Rahul");
        System.out.println("After removing Rahul: " + students);

        // Sort alphabetically
        Collections.sort(students);
        System.out.println("Sorted: " + students);

        // ── ARRAYLIST OF OBJECTS ───────────────────────
        ArrayList<int[]> scores = new ArrayList<>();
        scores.add(new int[]{85, 92, 78});  // Arjun's marks
        scores.add(new int[]{72, 68, 80});  // Priya's marks

        // ── HASHMAP ────────────────────────────────────
        HashMap<String, Integer> markMap = new HashMap<>();
        markMap.put("Arjun", 85);
        markMap.put("Priya", 72);
        markMap.put("Sneha", 96);
        markMap.put("Rahul", 58);

        System.out.println("\n=== HashMap ===");
        System.out.println("Sneha's marks: " + markMap.get("Sneha"));
        System.out.println("Vikram exists: " + markMap.containsKey("Vikram"));
        markMap.put("Rahul", 65);  // Update Rahul's marks
        System.out.println("Rahul updated: " + markMap.get("Rahul"));

        // Iterate over HashMap
        System.out.println("\nAll students and marks:");
        for (Map.Entry<String, Integer> entry : markMap.entrySet()) {
            String name = entry.getKey();
            int marks = entry.getValue();
            System.out.printf("  %-10s: %d%n", name, marks);
        }

        // Find top student
        String topper = Collections.max(markMap.keySet(),
            Comparator.comparingInt(markMap::get));
        System.out.println("Topper: " + topper + " (" + markMap.get(topper) + ")");
    }
}`,
    output: `Students: [Arjun, Priya, Rahul, Sneha]
Size: 4
Contains Priya: true
After removing Rahul: [Arjun, Priya, Sneha]
Sorted: [Arjun, Priya, Sneha]

=== HashMap ===
Sneha's marks: 96
Vikram exists: false
Rahul updated: 65

All students and marks:
  Arjun     : 85
  Priya     : 72
  Sneha     : 96
  Rahul     : 65

Topper: Sneha (96)`,
    notes: [
      `ArrayList vs Array: ArrayList is resizable and has useful methods. Array has fixed size but is faster for simple indexed access. Use ArrayList unless you know the size won't change.`,
      `HashMap vs TreeMap: HashMap is O(1) but unordered. TreeMap is O(log n) but sorted by key. Use TreeMap when you need keys in sorted order.`,
      `For loops with collections: for-each (for (String s : list)) is safe. Iterator is needed if modifying while iterating. Traditional index loop (for i=0; i<list.size(); i++) works like array.`,
    ],
    practice: {
      title: 'Inventory Management',
      description: `Build a simple inventory system using HashMap<String, Integer> where the key is product name and value is quantity. Implement: add stock, sell items (reduce quantity, throw exception if insufficient), check stock, and list all products with low stock (< 5 units).`,
      startCode: `import java.util.*;

public class Inventory {
    static HashMap<String, Integer> stock = new HashMap<>();

    static void addStock(String product, int quantity) {
        int current = stock.getOrDefault(product, 0);
        stock.put(product, current + quantity);
        System.out.println("✅ Added " + quantity + " " + product + " | Total: " + stock.get(product));
    }

    static void sell(String product, int quantity) throws Exception {
        if (!stock.containsKey(product)) {
            throw new Exception("Product not found: " + product);
        }
        int current = stock.get(product);
        if (current < quantity) {
            throw new Exception("Insufficient stock: only " + current + " " + product + " available");
        }
        stock.put(product, current - quantity);
        System.out.println("💰 Sold " + quantity + " " + product + " | Remaining: " + stock.get(product));
    }

    static void showLowStock(int threshold) {
        System.out.println("\n⚠️ Low stock (< " + threshold + " units):");
        for (Map.Entry<String, Integer> entry : stock.entrySet()) {
            if (entry.getValue() < threshold) {
                System.out.println("  " + entry.getKey() + ": " + entry.getValue());
            }
        }
    }

    public static void main(String[] args) {
        addStock("Pencils", 50);
        addStock("Notebooks", 30);
        addStock("Calculators", 8);
        addStock("Rulers", 3);

        try {
            sell("Pencils", 45);      // Should work
            sell("Calculators", 10);  // Should fail
        } catch (Exception e) {
            System.out.println("❌ " + e.getMessage());
        }

        showLowStock(5);
    }
}`,
      hint: `stock.getOrDefault(product, 0) returns 0 if the product doesn't exist yet. For showLowStock, use entrySet() and check entry.getValue() < threshold.`,
    },
  },

  // ─── Interfaces & Abstract Classes ───────────────────────────────────────────
  {
    id: 'java-interfaces',
    category: 'Object-Oriented Programming',
    title: 'Interfaces and Abstract Classes',
    difficulty: 'Advanced',
    theory: [
      `An interface in Java is a contract — it defines what methods a class MUST implement, without specifying how. It's Java's way of achieving full abstraction. A class can implement multiple interfaces (unlike inheritance, which is single-parent).`,
      `Abstract class: A partially implemented class that can't be instantiated directly. Contains both abstract methods (must be implemented by subclasses) and concrete methods (already implemented). Use when you want to share code among related classes.`,
      `Interface vs Abstract class: Interface for "can-do" relationships (a Car can drive, a Boat can navigate — different hierarchies implementing the same capability). Abstract class for "is-a" relationships with shared code (Dog and Cat are both Animals with shared behaviour).`,
    ],
    syntax: `// Interface definition
interface Printable {
    void print();           // abstract — no body
    default void save() {  // default method — has body
        System.out.println("Saving...");
    }
}

// Implementing an interface
class Report implements Printable {
    public void print() { System.out.println("Printing report"); }
}`,
    code: `// Interfaces and Abstract Classes demo

interface Payable {
    double calculateSalary();
    default String getSalarySlip() {
        return "Salary: ₹" + calculateSalary();
    }
}

interface Taxable {
    double TAX_RATE = 0.10;  // constants in interfaces are public static final
    double calculateTax();
}

// Abstract class
abstract class Employee implements Payable, Taxable {
    String name;
    String department;

    Employee(String name, String department) {
        this.name = name;
        this.department = department;
    }

    // Concrete method (shared implementation)
    void displayInfo() {
        System.out.println("Name: " + name + " | Dept: " + department);
        System.out.println(getSalarySlip());
        System.out.println("Tax deducted: ₹" + calculateTax());
        System.out.println("Net pay: ₹" + (calculateSalary() - calculateTax()));
    }

    // Abstract — must be implemented by subclasses
    abstract String getEmployeeType();
}

class SoftwareEngineer extends Employee {
    double baseSalary;
    int stockUnits;

    SoftwareEngineer(String name, double base, int stocks) {
        super(name, "Engineering");
        this.baseSalary = base;
        this.stockUnits = stocks;
    }

    @Override public double calculateSalary() { return baseSalary + (stockUnits * 500); }
    @Override public double calculateTax()    { return calculateSalary() * TAX_RATE; }
    @Override public String getEmployeeType() { return "Software Engineer"; }
}

class TeachingStaff extends Employee {
    double baseSalary;
    int classesPerWeek;

    TeachingStaff(String name, double base, int classes) {
        super(name, "Education");
        this.baseSalary = base;
        this.classesPerWeek = classes;
    }

    @Override public double calculateSalary() { return baseSalary + (classesPerWeek * 200); }
    @Override public double calculateTax()    { return calculateSalary() * 0.05; } // 5% for teachers
    @Override public String getEmployeeType() { return "Teaching Staff"; }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Employee[] employees = {
            new SoftwareEngineer("Arjun Kumar", 80000, 50),
            new TeachingStaff("Priya Sharma", 45000, 20)
        };

        for (Employee e : employees) {
            System.out.println("\n=== " + e.getEmployeeType() + " ===");
            e.displayInfo();
        }
    }
}`,
    output: `=== Software Engineer ===
Name: Arjun Kumar | Dept: Engineering
Salary: ₹105000.0
Tax deducted: ₹10500.0
Net pay: ₹94500.0

=== Teaching Staff ===
Name: Priya Sharma | Dept: Education
Salary: ₹49000.0
Tax deducted: ₹2450.0
Net pay: ₹46550.0`,
    notes: [
      `A class can implement multiple interfaces: class MyClass implements Interface1, Interface2, Interface3 — this is how Java achieves multiple inheritance safely.`,
      `Since Java 8, interfaces can have default methods (with implementation). This allows adding new methods to interfaces without breaking existing implementing classes.`,
      `CBSE and interview question: "What is the difference between interface and abstract class?" — Key: multiple inheritance, complete abstraction (interface) vs partial abstraction (abstract class).`,
    ],
    practice: {
      title: 'Shape Area Calculator',
      description: `Create an interface Shape with methods: double area(), double perimeter(), String getShapeName(). Implement it for Circle, Rectangle, and Triangle. Create a method that takes any Shape array and prints the one with the largest area.`,
      startCode: `interface Shape {
    double area();
    double perimeter();
    String getShapeName();

    default void displayInfo() {
        System.out.printf("%s: Area=%.2f, Perimeter=%.2f%n",
            getShapeName(), area(), perimeter());
    }
}

class Circle implements Shape {
    double radius;
    Circle(double r) { this.radius = r; }

    @Override public double area()      { return Math.PI * radius * radius; }
    @Override public double perimeter() { return 2 * Math.PI * radius; }
    @Override public String getShapeName() { return "Circle (r=" + radius + ")"; }
}

class Rectangle implements Shape {
    double width, height;
    Rectangle(double w, double h) { this.width = w; this.height = h; }

    // YOUR CODE: implement area(), perimeter(), getShapeName()
    @Override public double area()      { return width * height; }
    @Override public double perimeter() { return 2 * (width + height); }
    @Override public String getShapeName() { return "Rectangle (" + width + "×" + height + ")"; }
}

class Triangle implements Shape {
    double a, b, c;  // three sides
    Triangle(double a, double b, double c) { this.a=a; this.b=b; this.c=c; }

    @Override public double area() {
        double s = (a + b + c) / 2;  // Heron's formula
        return Math.sqrt(s * (s-a) * (s-b) * (s-c));
    }
    @Override public double perimeter() { return a + b + c; }
    @Override public String getShapeName() { return "Triangle (" + a + "," + b + "," + c + ")"; }
}

public class ShapeDemo {
    static Shape largestArea(Shape[] shapes) {
        Shape largest = shapes[0];
        for (Shape s : shapes) {
            if (s.area() > largest.area()) largest = s;
        }
        return largest;
    }

    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(8, 6),
            new Triangle(3, 4, 5)
        };

        for (Shape s : shapes) s.displayInfo();

        System.out.println("\nLargest area: " + largestArea(shapes).getShapeName());
    }
}`,
      hint: `Circle area = π*r². Rectangle area = width*height. Heron's formula for triangle is already given. The largestArea method uses polymorphism — it calls area() on each Shape without knowing the concrete type.`,
    },
  },

  // ─── Java Mini Project ────────────────────────────────────────────────────────
  {
    id: 'java-project-bank',
    category: 'Mini Projects',
    title: 'Mini Project — Banking System in Java',
    difficulty: 'Intermediate',
    theory: [
      `A Banking System is one of the most classic Java projects — it uses OOP, exception handling, ArrayList, and all the core concepts together. Real banking software is built similarly, just with databases and security layers on top.`,
      `This project implements: Account creation, Deposit and withdrawal, Balance check, Transaction history, Mini statement. It demonstrates encapsulation (private fields), inheritance (SavingsAccount extends Account), exception handling (InsufficientFunds), and ArrayList (transaction history).`,
    ],
    syntax: `// OOP + Collections + Exception Handling combined`,
    code: `import java.util.*;

public class BankingSystem {

    static class InsufficientFundsException extends Exception {
        InsufficientFundsException(double needed, double available) {
            super(String.format("Need ₹%.2f but only ₹%.2f available", needed, available));
        }
    }

    static class Account {
        private String accountNumber;
        private String holderName;
        private double balance;
        private ArrayList<String> transactions = new ArrayList<>();

        Account(String num, String name, double initialBalance) {
            this.accountNumber = num;
            this.holderName = name;
            this.balance = initialBalance;
            transactions.add("Account opened with ₹" + initialBalance);
        }

        void deposit(double amount) {
            if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
            balance += amount;
            transactions.add("Deposited ₹" + amount + " | Balance: ₹" + balance);
            System.out.println("✅ Deposited ₹" + amount);
        }

        void withdraw(double amount) throws InsufficientFundsException {
            if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
            if (amount > balance) throw new InsufficientFundsException(amount, balance);
            balance -= amount;
            transactions.add("Withdrawn ₹" + amount + " | Balance: ₹" + balance);
            System.out.println("✅ Withdrawn ₹" + amount);
        }

        void transfer(Account target, double amount) throws InsufficientFundsException {
            withdraw(amount);
            target.deposit(amount);
            System.out.println("✅ Transferred ₹" + amount + " to " + target.holderName);
        }

        void printStatement() {
            System.out.println("\n=== MINI STATEMENT ===");
            System.out.println("Account: " + accountNumber + " | " + holderName);
            System.out.println("Current Balance: ₹" + balance);
            System.out.println("Last " + Math.min(5, transactions.size()) + " transactions:");
            int start = Math.max(0, transactions.size() - 5);
            for (int i = start; i < transactions.size(); i++) {
                System.out.println("  " + (i+1) + ". " + transactions.get(i));
            }
        }

        double getBalance() { return balance; }
    }

    static class SavingsAccount extends Account {
        double interestRate;
        SavingsAccount(String num, String name, double balance, double rate) {
            super(num, name, balance);
            this.interestRate = rate;
        }

        void addMonthlyInterest() {
            double interest = getBalance() * interestRate / 12;
            deposit(Math.round(interest * 100.0) / 100.0);
            System.out.println("  (Monthly interest added: ₹" + String.format("%.2f", interest) + ")");
        }
    }

    public static void main(String[] args) {
        SavingsAccount arjun = new SavingsAccount("SB001", "Arjun Kumar", 10000, 0.065);
        Account priya = new Account("CUR001", "Priya Singh", 50000);

        System.out.println("=== BANKING OPERATIONS ===");
        arjun.deposit(5000);
        arjun.addMonthlyInterest();

        try {
            arjun.withdraw(2000);
            arjun.transfer(priya, 1000);
            arjun.withdraw(50000);  // This will fail
        } catch (InsufficientFundsException e) {
            System.out.println("❌ Transaction failed: " + e.getMessage());
        }

        arjun.printStatement();
        priya.printStatement();
    }
}`,
    output: `=== BANKING OPERATIONS ===
✅ Deposited ₹5000.0
✅ Deposited ₹81.25
  (Monthly interest added: ₹81.25)
✅ Withdrawn ₹2000.0
✅ Withdrawn ₹1000.0
✅ Transferred ₹1000.0 to Priya Singh
❌ Transaction failed: Need ₹50000.00 but only ₹12081.25 available

=== MINI STATEMENT ===
Account: SB001 | Arjun Kumar
Current Balance: ₹12081.25
Last 5 transactions:
  1. Account opened with ₹10000.0
  2. Deposited ₹5000.0 | Balance: ₹15000.0
  3. Deposited ₹81.25 | Balance: ₹15081.25
  4. Withdrawn ₹2000.0 | Balance: ₹13081.25
  5. Withdrawn ₹1000.0 | Balance: ₹12081.25`,
    notes: [
      `Real banking apps add: multi-threading (concurrent transactions), database persistence, encryption, audit logs, and regulatory compliance.`,
      `This project covers: encapsulation (private balance), inheritance (SavingsAccount extends Account), exception handling, and ArrayList — a complete OOP demonstration.`,
      `Great for your Java portfolio on GitHub. Add a simple console menu with Scanner for a fully interactive banking simulator.`,
    ],
    practice: {
      title: 'Add ATM Withdrawal Feature',
      description: `Extend the banking system with an ATM class that: (1) only allows withdrawal in multiples of 100, (2) has a per-transaction limit of ₹10,000, (3) has a daily withdrawal limit of ₹25,000 (track with a counter), (4) throws appropriate exceptions for each violation.`,
      startCode: `static class ATM {
    private Account linkedAccount;
    private double dailyWithdrawn = 0;
    private final double DAILY_LIMIT = 25000;
    private final double TRANSACTION_LIMIT = 10000;

    ATM(Account account) { this.linkedAccount = account; }

    void withdraw(double amount) throws Exception {
        // Check multiple of 100
        if (amount % 100 != 0) {
            throw new Exception("ATM only dispenses multiples of ₹100");
        }

        // Check per-transaction limit
        // YOUR CODE

        // Check daily limit
        // YOUR CODE

        // Perform withdrawal
        linkedAccount.withdraw(amount);
        dailyWithdrawn += amount;
        System.out.println("ATM dispensed ₹" + amount);
        System.out.println("Daily limit remaining: ₹" + (DAILY_LIMIT - dailyWithdrawn));
    }
}

// Test ATM
Account myAccount = new Account("SB002", "Test User", 30000);
ATM atm = new ATM(myAccount);

try {
    atm.withdraw(250);    // Should fail: not multiple of 100
    atm.withdraw(500);    // Should work
    atm.withdraw(12000);  // Should fail: exceeds transaction limit
    atm.withdraw(5000);   // Should work
    atm.withdraw(20000);  // Should fail: exceeds daily limit
} catch (Exception e) {
    System.out.println("❌ " + e.getMessage());
}`,
      hint: `if (amount > TRANSACTION_LIMIT) throw new Exception("Transaction limit is ₹"+TRANSACTION_LIMIT). if (dailyWithdrawn + amount > DAILY_LIMIT) throw new Exception("Daily limit of ₹"+DAILY_LIMIT+" exceeded").`,
    },
  },

  // ── INTERMEDIATE ──────────────────────────────────────────────────────────

  {
    id: 'java-strings',
    category: 'Java Fundamentals',
    title: 'Strings & String Methods',
    difficulty: 'Intermediate',
    theory: [
      'Strings in Java are objects of the String class — immutable (cannot be changed). Every time you modify a String, a new object is created in memory.',
      'For frequent modifications, use StringBuilder (not thread-safe, faster) or StringBuffer (thread-safe). Both are mutable.',
      'Important String methods: length(), charAt(i), substring(start,end), indexOf(s), contains(s), startsWith(s), toUpperCase(), toLowerCase(), trim(), replace(old,new), split(regex), equals(), equalsIgnoreCase().',
      'String.format() and printf() use format specifiers: %s (string), %d (integer), %f (float), %n (newline). Java 15+ adds text blocks with triple quotes."""',
    ],
    syntax: `String s = "Hello World";
s.length()           // 11
s.charAt(0)          // 'H'
s.substring(6, 11)   // "World"
s.toUpperCase()      // "HELLO WORLD"
s.contains("World")  // true
s.replace("World","Java")  // "Hello Java"
s.split(" ")         // ["Hello","World"]
s.trim()             // removes leading/trailing spaces

// StringBuilder for mutations
StringBuilder sb = new StringBuilder();
sb.append("Hello").append(" ").append("World");`,
    code: `public class StringDemo {
    public static void main(String[] args) {
        // Basic string operations
        String name = "  Priya Sharma  ";
        System.out.println("Original: '" + name + "'");
        System.out.println("Trimmed: '" + name.trim() + "'");
        System.out.println("Uppercase: " + name.trim().toUpperCase());
        System.out.println("Length: " + name.trim().length());

        // Splitting and joining
        String subjects = "Maths,Science,English,History,Computer";
        String[] parts = subjects.split(",");
        System.out.println("\\nSubjects:");
        for (String s : parts) {
            System.out.println("  - " + s);
        }

        // String.format
        String student = "Priya";
        int marks = 92;
        double percent = 92.5;
        String report = String.format(
            "Student: %-15s | Marks: %3d | Percent: %.1f%%",
            student, marks, percent
        );
        System.out.println("\\nReport: " + report);

        // StringBuilder for building strings efficiently
        StringBuilder sb = new StringBuilder();
        sb.append("Roll: ").append(101)
          .append(" | Name: ").append("Rahul")
          .append(" | Grade: ").append("A");
        System.out.println(sb.toString());

        // Palindrome check
        String word = "racecar";
        String reversed = new StringBuilder(word).reverse().toString();
        System.out.println("\\n'" + word + "' is palindrome: " + word.equals(reversed));

        // Count vowels
        long vowels = word.chars()
                          .filter(c -> "aeiou".indexOf(c) >= 0)
                          .count();
        System.out.println("Vowels in '" + word + "': " + vowels);
    }
}`,
    output: `Original: '  Priya Sharma  '
Trimmed: 'Priya Sharma'
Uppercase: PRIYA SHARMA
Length: 12

Subjects:
  - Maths
  - Science
  - English
  - History
  - Computer

Report: Student: Priya           | Marks:  92 | Percent: 92.5%
Roll: 101 | Name: Rahul | Grade: A

'racecar' is palindrome: true
Vowels in 'racecar': 3`,
    notes: [
      'Use .equals() to compare strings, NOT == (== compares object references)',
      'StringBuilder is much faster than concatenating strings in a loop',
      'String is stored in the String Pool — same literals share the same object',
    ],
    practice: {
      title: 'Word Frequency Counter',
      description: `Write a Java program that:
1. Takes a sentence: "to be or not to be that is the question to be"
2. Splits it into words
3. Counts how many times each word appears (use a HashMap)
4. Prints words and counts, sorted alphabetically

Expected output:
be: 3
is: 1
not: 1
or: 1
question: 1
that: 1
the: 1
to: 3`,
      startCode: `import java.util.*;

public class WordFrequency {
    public static void main(String[] args) {
        String sentence = "to be or not to be that is the question to be";
        String[] words = sentence.split(" ");
        Map<String, Integer> freq = new HashMap<>();

        // Count frequencies
        for (String word : words) {
            // Add your logic here
        }

        // Sort and print
        List<String> sortedKeys = new ArrayList<>(freq.keySet());
        Collections.sort(sortedKeys);
        for (String key : sortedKeys) {
            System.out.println(key + ": " + freq.get(key));
        }
    }
}`,
      hint: `freq.put(word, freq.getOrDefault(word, 0) + 1);`,
    },
  },

  {
    id: 'java-generics',
    category: 'Java Advanced',
    title: 'Generics',
    difficulty: 'Intermediate',
    theory: [
      'Generics allow you to write code that works with any type, specified at compile time. They provide type safety without casting: List<String> vs raw List.',
      'Generic class: class Box<T> { T value; }. Generic method: <T> T getFirst(List<T> list). Use extends for bounds: <T extends Number> means T must be a Number or subclass.',
      'Wildcards: List<?> accepts any type. List<? extends Number> accepts any Number subtype (read-only). List<? super Integer> accepts Integer or any parent (write-only).',
      'Generics are erased at runtime (type erasure) — they exist only at compile time for type checking. At runtime, a List<String> is just a List.',
    ],
    syntax: `// Generic class
class Pair<A, B> {
    private A first;
    private B second;
    Pair(A first, B second) { this.first = first; this.second = second; }
}

// Generic method
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

// Bounded wildcard
public static double sum(List<? extends Number> list) {
    return list.stream().mapToDouble(Number::doubleValue).sum();
}`,
    code: `import java.util.*;

// Generic Stack implementation
class Stack<T> {
    private List<T> items = new ArrayList<>();

    public void push(T item) { items.add(item); }

    public T pop() {
        if (isEmpty()) throw new RuntimeException("Stack is empty!");
        return items.remove(items.size() - 1);
    }

    public T peek() {
        if (isEmpty()) throw new RuntimeException("Stack is empty!");
        return items.get(items.size() - 1);
    }

    public boolean isEmpty() { return items.isEmpty(); }
    public int size() { return items.size(); }

    @Override
    public String toString() { return items.toString(); }
}

// Generic utility methods
class Utils {
    // Find max of any Comparable type
    public static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    // Sum any list of Numbers
    public static double sum(List<? extends Number> list) {
        double total = 0;
        for (Number n : list) total += n.doubleValue();
        return total;
    }
}

public class GenericsDemo {
    public static void main(String[] args) {
        // Integer stack
        Stack<Integer> intStack = new Stack<>();
        intStack.push(10); intStack.push(20); intStack.push(30);
        System.out.println("Stack: " + intStack);
        System.out.println("Pop: " + intStack.pop());
        System.out.println("After pop: " + intStack);

        // String stack
        Stack<String> strStack = new Stack<>();
        strStack.push("Priya"); strStack.push("Rahul");
        System.out.println("\\nString stack: " + strStack);

        // Generic max
        System.out.println("\\nmax(10, 25) = " + Utils.max(10, 25));
        System.out.println("max(\"apple\", \"mango\") = " + Utils.max("apple","mango"));

        // Sum with wildcards
        List<Integer> ints = Arrays.asList(1, 2, 3, 4, 5);
        List<Double> doubles = Arrays.asList(1.5, 2.5, 3.5);
        System.out.println("\\nSum ints: " + Utils.sum(ints));
        System.out.println("Sum doubles: " + Utils.sum(doubles));
    }
}`,
    output: `Stack: [10, 20, 30]
Pop: 30
After pop: [10, 20]

String stack: [Priya, Rahul]

max(10, 25) = 25
max("apple", "mango") = mango

Sum ints: 15.0
Sum doubles: 7.5`,
    notes: [
      'Never use raw types (List instead of List<String>) — you lose type safety',
      '<T extends Comparable<T>> means T can be compared with itself (required for sorting)',
      'Collections.sort() works because List elements implement Comparable',
    ],
    practice: {
      title: 'Generic Repository',
      description: `Create a generic Repository<T> class that:
- Stores items of any type with an Integer id
- add(int id, T item) — adds item
- get(int id) → T — retrieves by id
- getAll() → List<T> — all items
- remove(int id) — removes item
- size() → int

Test with Student and Product classes.`,
      startCode: `import java.util.*;

class Repository<T> {
    private Map<Integer, T> store = new HashMap<>();

    // Add your methods here
}

class Student { String name; int marks; Student(String n, int m){name=n;marks=m;} public String toString(){return name+"("+marks+")";} }
class Product { String name; double price; Product(String n, double p){name=n;price=p;} public String toString(){return name+"@"+price;} }

public class GenericRepo {
    public static void main(String[] args) {
        Repository<Student> students = new Repository<>();
        students.add(1, new Student("Priya", 92));
        students.add(2, new Student("Rahul", 78));
        System.out.println(students.getAll());
        System.out.println(students.get(1));

        Repository<Product> products = new Repository<>();
        products.add(101, new Product("Laptop", 45000));
        System.out.println(products.getAll());
    }
}`,
      hint: `add: store.put(id, item). get: return store.get(id). getAll: return new ArrayList<>(store.values()).`,
    },
  },

  {
    id: 'java-lambda-streams',
    category: 'Java Advanced',
    title: 'Lambda Expressions & Streams',
    difficulty: 'Advanced',
    theory: [
      'Lambda expressions (Java 8+) are anonymous functions: (params) -> expression. They can be passed around as values and implement functional interfaces (interfaces with one abstract method).',
      'Common functional interfaces: Predicate<T> (boolean test), Function<T,R> (T to R), Consumer<T> (accepts T, returns void), Supplier<T> (returns T), Comparator<T>.',
      'The Stream API processes collections with a pipeline of operations: filter(), map(), sorted(), reduce(), collect(), count(), anyMatch(), findFirst().',
      'Streams are lazy — intermediate operations (filter, map) don\'t execute until a terminal operation (collect, count, forEach) is called. This enables optimisation.',
    ],
    syntax: `// Lambda syntax
Predicate<Integer> isEven = n -> n % 2 == 0;
Function<String, Integer> length = s -> s.length();
Comparator<String> byLength = (a, b) -> a.length() - b.length();

// Stream pipeline
list.stream()
    .filter(s -> s.marks >= 60)     // intermediate
    .map(s -> s.name)               // intermediate
    .sorted()                       // intermediate
    .collect(Collectors.toList());  // terminal`,
    code: `import java.util.*;
import java.util.stream.*;

class Student {
    String name; int marks; String subject;
    Student(String n, int m, String s) { name=n; marks=m; subject=s; }
    public String toString() { return name + "(" + marks + ")"; }
}

public class StreamsDemo {
    public static void main(String[] args) {
        List<Student> students = Arrays.asList(
            new Student("Priya", 92, "Maths"),
            new Student("Rahul", 58, "Science"),
            new Student("Sneha", 85, "Maths"),
            new Student("Arun", 45, "English"),
            new Student("Bhavna", 78, "Science"),
            new Student("Chetan", 91, "Maths")
        );

        // 1. Filter + map + collect
        List<String> topStudents = students.stream()
            .filter(s -> s.marks >= 80)
            .map(s -> s.name)
            .sorted()
            .collect(Collectors.toList());
        System.out.println("Top students: " + topStudents);

        // 2. Statistics
        IntSummaryStatistics stats = students.stream()
            .mapToInt(s -> s.marks)
            .summaryStatistics();
        System.out.printf("Avg: %.1f | Max: %d | Min: %d%n",
            stats.getAverage(), stats.getMax(), stats.getMin());

        // 3. Group by subject
        Map<String, List<Student>> bySubject = students.stream()
            .collect(Collectors.groupingBy(s -> s.subject));
        bySubject.forEach((subj, list) ->
            System.out.println(subj + ": " + list));

        // 4. Average marks per subject
        Map<String, Double> avgPerSubject = students.stream()
            .collect(Collectors.groupingBy(
                s -> s.subject,
                Collectors.averagingInt(s -> s.marks)
            ));
        System.out.println("Avg per subject: " + avgPerSubject);

        // 5. Sorted by marks desc
        students.stream()
            .sorted(Comparator.comparingInt((Student s) -> s.marks).reversed())
            .forEach(s -> System.out.printf("  %s: %d%n", s.name, s.marks));
    }
}`,
    output: `Top students: [Chetan, Priya, Sneha]
Avg: 74.8 | Max: 92 | Min: 45

Maths: [Priya(92), Sneha(85), Chetan(91)]
Science: [Rahul(58), Bhavna(78)]
English: [Arun(45)]

Avg per subject: {Maths=89.3, Science=68.0, English=45.0}

  Priya: 92
  Chetan: 91
  Sneha: 85
  Bhavna: 78
  Rahul: 58
  Arun: 45`,
    notes: [
      'Streams are immutable and lazy — each operation returns a new Stream',
      'Use parallel() for large datasets: students.parallelStream().filter(...)',
      'Collectors.joining(", ") joins strings. Collectors.counting() counts elements.',
    ],
    practice: {
      title: 'Product Analytics with Streams',
      description: `Given a list of Product objects (name, category, price, rating, inStock):
Use Java Streams to:
1. Get names of all Electronics products sorted by price
2. Find the highest-rated product
3. Total value of all in-stock products (price * quantity)
4. Average price per category (Collectors.groupingBy + averagingDouble)
5. Check if any product has rating > 4.5`,
      startCode: `import java.util.*;
import java.util.stream.*;

class Product {
    String name, category;
    double price, rating;
    int quantity;
    boolean inStock;
    Product(String n, String c, double p, double r, int q, boolean s) {
        name=n; category=c; price=p; rating=r; quantity=q; inStock=s;
    }
}

public class ProductStreams {
    public static void main(String[] args) {
        List<Product> products = Arrays.asList(
            new Product("Laptop","Electronics",45000,4.5,5,true),
            new Product("Phone","Electronics",25000,4.8,10,true),
            new Product("Pen","Stationery",10,3.9,500,true),
            new Product("Notebook","Stationery",120,4.2,200,true),
            new Product("Tablet","Electronics",18000,4.6,0,false),
            new Product("Backpack","Accessories",1200,4.1,15,true)
        );

        // 1. Electronics sorted by price
        List<String> electronics = products.stream()
            /* your code */
            .collect(Collectors.toList());
        System.out.println("Electronics: " + electronics);

        // 2. Highest rated product
        Optional<Product> topRated = products.stream()
            /* your code */;
        topRated.ifPresent(p -> System.out.println("Top rated: " + p.name));

        // 3. Total stock value (in-stock only)

        // 4. Average price per category

        // 5. Any product rated > 4.5?
    }
}`,
      hint: `filter(p -> p.category.equals("Electronics")).sorted(Comparator.comparingDouble(p->p.price)).map(p->p.name). max(Comparator.comparingDouble(p->p.rating)). mapToDouble(p->p.price*p.quantity).sum() for total value.`,
    },
  },

  {
    id: 'java-multithreading',
    category: 'Java Advanced',
    title: 'Multithreading',
    difficulty: 'Advanced',
    theory: [
      'Java supports multithreading natively — multiple threads run concurrently within the same process, sharing memory. This improves performance for I/O-bound tasks.',
      'Create threads by extending Thread class or implementing Runnable interface (preferred — allows extending other classes). Java 8+ also uses lambda: new Thread(() -> {...}).',
      'Synchronisation prevents race conditions — when multiple threads modify shared data simultaneously. Use synchronized keyword on methods or blocks to lock access.',
      'The Executor framework (ExecutorService) manages thread pools efficiently. Better than creating threads manually. Use Callable and Future for threads that return values.',
    ],
    syntax: `// Runnable (preferred)
Thread t = new Thread(() -> System.out.println("Running"));
t.start();

// ExecutorService (recommended for production)
ExecutorService exec = Executors.newFixedThreadPool(4);
exec.submit(() -> doWork());
exec.shutdown();

// Synchronized method
synchronized void increment() { count++; }

// Callable with Future (returns value)
Future<Integer> f = exec.submit(() -> compute());
int result = f.get(); // blocks until done`,
    code: `import java.util.concurrent.*;
import java.util.*;

class Counter {
    private int count = 0;

    // synchronized: only one thread at a time
    public synchronized void increment() { count++; }
    public int getCount() { return count; }
}

class Task implements Callable<String> {
    private final String name;
    private final int delay;

    Task(String name, int delay) { this.name = name; this.delay = delay; }

    @Override
    public String call() throws Exception {
        Thread.sleep(delay);
        return name + " completed in " + delay + "ms";
    }
}

public class ThreadDemo {
    public static void main(String[] args) throws Exception {
        // 1. Basic thread with lambda
        Thread t1 = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("Thread A: " + i);
            }
        });
        t1.start();
        t1.join(); // wait for t1 to finish

        // 2. Thread-safe counter
        Counter counter = new Counter();
        ExecutorService exec = Executors.newFixedThreadPool(4);
        List<Future<?>> futures = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            futures.add(exec.submit(counter::increment));
        }
        for (Future<?> f : futures) f.get(); // wait for all
        exec.shutdown();
        System.out.println("Counter (should be 1000): " + counter.getCount());

        // 3. Callable with results
        ExecutorService pool = Executors.newFixedThreadPool(3);
        List<Future<String>> results = new ArrayList<>();
        results.add(pool.submit(new Task("Download A", 300)));
        results.add(pool.submit(new Task("Download B", 200)));
        results.add(pool.submit(new Task("Download C", 400)));

        System.out.println("\\nTask results:");
        for (Future<String> r : results) {
            System.out.println("  " + r.get());
        }
        pool.shutdown();
    }
}`,
    output: `Thread A: 1
Thread A: 2
Thread A: 3
Counter (should be 1000): 1000

Task results:
  Download A completed in 300ms
  Download B completed in 200ms
  Download C completed in 400ms`,
    notes: [
      'Always call t.join() to wait for a thread before using its results',
      'volatile keyword ensures visibility of shared variables across threads',
      'Use ConcurrentHashMap instead of HashMap in multi-threaded code',
    ],
    practice: {
      title: 'Parallel File Processor',
      description: `Simulate parallel data processing:
- Create 5 "data chunks" (simulate with Thread.sleep(random 100-500ms))
- Process them using a FixedThreadPool with 3 threads
- Each chunk returns a count of "records processed" (random 100-500)
- Collect all results using Future<Integer>
- Print: total records, time taken (measure with System.currentTimeMillis)
- Compare with sequential time estimate`,
      startCode: `import java.util.concurrent.*;
import java.util.*;

public class ParallelProcessor {
    static Random rand = new Random();

    static int processChunk(int chunkId) throws Exception {
        int delay = 100 + rand.nextInt(400);
        Thread.sleep(delay);
        int records = 100 + rand.nextInt(400);
        System.out.println("Chunk " + chunkId + ": " + records + " records (" + delay + "ms)");
        return records;
    }

    public static void main(String[] args) throws Exception {
        int CHUNKS = 5;
        ExecutorService pool = Executors.newFixedThreadPool(3);

        long start = System.currentTimeMillis();

        // Submit all chunks
        List<Future<Integer>> futures = new ArrayList<>();
        for (int i = 1; i <= CHUNKS; i++) {
            final int id = i;
            futures.add(pool.submit(() -> processChunk(id)));
        }

        // Collect results
        int total = 0;
        for (Future<Integer> f : futures) {
            total += f.get();
        }

        pool.shutdown();
        long elapsed = System.currentTimeMillis() - start;
        System.out.println("Total records: " + total);
        System.out.println("Time: " + elapsed + "ms (parallel)");
    }
}`,
      hint: `The 5 chunks run with only 3 threads. Chunks 4&5 wait for a thread to free up. Total time ≈ max of the two "waves" of processing.`,
    },
  },

  {
    id: 'java-file-io',
    category: 'Java Advanced',
    title: 'File I/O',
    difficulty: 'Advanced',
    theory: [
      'Java\'s java.io and java.nio packages provide classes for reading and writing files. The modern NIO.2 API (Files, Paths) from Java 7+ is cleaner and more powerful.',
      'For reading: Files.readAllLines(), Files.readString() (Java 11+), BufferedReader for large files. For writing: Files.writeString(), Files.write(), BufferedWriter.',
      'Always use try-with-resources to auto-close streams: try (BufferedReader br = ...) { } — ensures the file is closed even if an exception occurs.',
      'Path (java.nio.file.Path) represents a file path in a platform-independent way. Paths.get() creates a Path. Files class provides static utility methods for common operations.',
    ],
    syntax: `import java.nio.file.*;
import java.io.*;

// Read all lines
List<String> lines = Files.readAllLines(Path.of("file.txt"));

// Write string
Files.writeString(Path.of("out.txt"), "Hello World");

// Append to file
Files.writeString(path, "more text", StandardOpenOption.APPEND);

// BufferedReader for large files
try (BufferedReader br = new BufferedReader(new FileReader("big.txt"))) {
    String line;
    while ((line = br.readLine()) != null) { process(line); }
}`,
    code: `import java.nio.file.*;
import java.io.*;
import java.util.*;

public class FileIODemo {
    public static void main(String[] args) throws Exception {
        Path path = Path.of("students.txt");

        // 1. Write a file
        StringBuilder content = new StringBuilder();
        content.append("Priya,92,Maths\\n");
        content.append("Rahul,78,Science\\n");
        content.append("Sneha,85,English\\n");
        content.append("Arun,45,Maths\\n");
        Files.writeString(path, content.toString());
        System.out.println("File written: " + path.toAbsolutePath());

        // 2. Read all lines
        List<String> lines = Files.readAllLines(path);
        System.out.println("Total lines: " + lines.size());

        // 3. Process CSV data
        System.out.println("\\nProcessing student data:");
        for (String line : lines) {
            String[] parts = line.split(",");
            String name = parts[0].trim();
            int marks = Integer.parseInt(parts[1].trim());
            String subject = parts[2].trim();
            String grade = marks >= 80 ? "A" : marks >= 60 ? "B" : "C";
            System.out.printf("  %-10s | %3d | %-8s | %s%n",
                name, marks, subject, grade);
        }

        // 4. Append to file
        Files.writeString(path, "Chetan,91,Science\\n",
            StandardOpenOption.APPEND);

        // 5. File info
        System.out.println("\\nFile size: " + Files.size(path) + " bytes");
        System.out.println("Exists: " + Files.exists(path));

        // 6. Clean up
        Files.delete(path);
        System.out.println("File deleted: " + !Files.exists(path));
    }
}`,
    output: `File written: /path/to/students.txt
Total lines: 4

Processing student data:
  Priya      |  92 | Maths    | A
  Rahul      |  78 | Science  | B
  Sneha      |  85 | English  | A
  Arun       |  45 | Maths    | C

File size: 72 bytes
Exists: true
File deleted: true`,
    notes: [
      'Always use try-with-resources for streams to prevent resource leaks',
      'For CSV files, consider the OpenCSV library for handling quoted fields',
      'StandardOpenOption.APPEND adds to existing file. TRUNCATE_EXISTING overwrites.',
    ],
    practice: {
      title: 'Student Grade Report Generator',
      description: `Write a program that:
1. Reads "marks.csv" containing: student_name,maths,science,english
2. Calculates total and average for each student
3. Assigns grade (A+ >=90, A >=80, B >=70, C >=60, F <60)
4. Writes a report to "report.txt" with formatted output
5. Writes a summary: total students, class average, pass rate

Create the input file in the program itself (writeString), then read and process it.`,
      startCode: `import java.nio.file.*;
import java.util.*;

public class ReportGenerator {
    public static void main(String[] args) throws Exception {
        // 1. Create input file
        Files.writeString(Path.of("marks.csv"),
            "Priya,92,88,95\\n" +
            "Rahul,75,82,68\\n" +
            "Sneha,55,48,62\\n" +
            "Arun,91,87,93\\n"
        );

        // 2. Read and process
        List<String> lines = Files.readAllLines(Path.of("marks.csv"));
        StringBuilder report = new StringBuilder();
        report.append("=== STUDENT REPORT ===\\n\\n");

        int totalStudents = 0;
        double totalAvg = 0;
        int passCount = 0;

        for (String line : lines) {
            String[] p = line.split(",");
            // Parse and calculate
            // Append to report
        }

        // 3. Add summary to report

        // 4. Write report
        Files.writeString(Path.of("report.txt"), report.toString());
        System.out.println(report.toString());

        // Cleanup
        Files.deleteIfExists(Path.of("marks.csv"));
        Files.deleteIfExists(Path.of("report.txt"));
    }
}`,
      hint: `int maths = Integer.parseInt(p[1]); double avg = (maths+science+english)/3.0; String grade = avg>=90?"A+":avg>=80?"A":avg>=70?"B":avg>=60?"C":"F";`,
    },
  },

  // ── TOPIC 1: Operators & Expressions ─────────────────────────────────────────
  {
    id: 'java-operators',
    category: 'Getting Started',
    title: 'Operators & Expressions',
    difficulty: 'Beginner',
    theory: [
      'Java provides several categories of operators: arithmetic (+, -, *, /, %), relational (==, !=, <, >, <=, >=), logical (&&, ||, !), assignment (=, +=, -=, *=, /=), and bitwise (&, |, ^, ~, <<, >>).',
      'The modulo operator % returns the remainder of division: 10 % 3 = 1. It is extremely useful for checking even/odd, cycling through values, and many algorithms.',
      'Java evaluates expressions following operator precedence (BODMAS equivalent). Use parentheses to make precedence explicit and avoid bugs.',
      'The ternary operator is a compact if/else: condition ? valueIfTrue : valueIfFalse. It is an expression (returns a value), not a statement.',
      'Integer division truncates the decimal: 7/2 = 3, not 3.5. Cast at least one operand to double for decimal results: (double)7/2 = 3.5.',
    ],
    syntax: `// Arithmetic
int a = 10, b = 3;
int sum  = a + b;   // 13
int diff = a - b;   // 7
int prod = a * b;   // 30
int quot = a / b;   // 3  (integer division)
int rem  = a % b;   // 1

// Compound assignment
a += 5;  // a = a + 5
a++;     // a = a + 1

// Ternary
String result = (a > b) ? "a is bigger" : "b is bigger";`,
    code: `public class Operators {
    public static void main(String[] args) {
        int x = 17, y = 5;

        System.out.println("=== Arithmetic ===");
        System.out.println("x + y = " + (x + y));
        System.out.println("x - y = " + (x - y));
        System.out.println("x * y = " + (x * y));
        System.out.println("x / y = " + (x / y));
        System.out.println("x % y = " + (x % y));
        System.out.println("x / y (double) = " + ((double) x / y));

        System.out.println("\\n=== Relational & Logical ===");
        boolean isEven = (x % 2 == 0);
        boolean gt10   = (x > 10);
        System.out.println("x is even: " + isEven);
        System.out.println("x > 10: " + gt10);
        System.out.println("both: " + (isEven && gt10));
        System.out.println("either: " + (isEven || gt10));

        System.out.println("\\n=== Ternary ===");
        String grade = (x >= 15) ? "Pass" : "Fail";
        System.out.println("Grade: " + grade);

        System.out.println("\\n=== Compound Assignment ===");
        int n = 10;
        n += 5;  System.out.println("n += 5 -> " + n);
        n -= 3;  System.out.println("n -= 3 -> " + n);
        n *= 2;  System.out.println("n *= 2 -> " + n);
        n /= 4;  System.out.println("n /= 4 -> " + n);

        System.out.println("\\n=== Pre/Post Increment ===");
        int a = 5;
        System.out.println("a++: " + a++);
        System.out.println("++a: " + ++a);
    }
}`,
    output: `=== Arithmetic ===
x + y = 22
x - y = 12
x * y = 85
x / y = 3
x % y = 2
x / y (double) = 3.4

=== Relational & Logical ===
x is even: false
x > 10: true
both: false
either: true

=== Ternary ===
Grade: Pass

=== Compound Assignment ===
n += 5 -> 15
n -= 3 -> 12
n *= 2 -> 24
n /= 4 -> 6

=== Pre/Post Increment ===
a++: 5
++a: 7`,
    notes: [
      'Integer division drops the decimal. Always cast to double when you need a fractional result.',
      'a++ returns the current value then increments; ++a increments first then returns the new value.',
      'Short-circuit evaluation: in a && b, if a is false, b is never evaluated. In a || b, if a is true, b is skipped.',
      'Use parentheses liberally — they make intent clear and prevent precedence bugs.',
    ],
    practice: {
      title: 'Calculator Practice',
      description: 'Write a program that declares two integers a = 25 and b = 7. Print: their sum, difference, product, integer quotient, remainder, double quotient, and whether a is divisible by b. Finally print which is greater using the ternary operator.',
      startCode: '',
      hint: 'Use (double)a/b for decimal division. a % b == 0 checks divisibility.',
      solution: `public class CalcPractice {
    public static void main(String[] args) {
        int a = 25, b = 7;
        System.out.println("Sum: " + (a + b));
        System.out.println("Difference: " + (a - b));
        System.out.println("Product: " + (a * b));
        System.out.println("Quotient (int): " + (a / b));
        System.out.println("Remainder: " + (a % b));
        System.out.println("Quotient (double): " + ((double) a / b));
        System.out.println("a divisible by b: " + (a % b == 0));
        System.out.println("Greater: " + (a > b ? "a" : "b"));
    }
}`,
    },
  },

  // ── TOPIC 2: Math Class ───────────────────────────────────────────────────────
  {
    id: 'java-math-class',
    category: 'Java Fundamentals',
    title: 'Math Class & Utility Methods',
    difficulty: 'Beginner',
    theory: [
      'The java.lang.Math class provides static utility methods for mathematical operations. It is auto-imported — no import statement needed.',
      'Key methods: Math.abs() (absolute value), Math.pow(base, exp), Math.sqrt(), Math.ceil(), Math.floor(), Math.round(), Math.max(), Math.min().',
      'Math.random() returns a random double in [0.0, 1.0). To get a random int from 0 to n-1: (int)(Math.random() * n).',
      'Math.PI and Math.E are built-in constants (double precision). Use them instead of hardcoding 3.14159.',
    ],
    syntax: `Math.abs(-5)          // 5
Math.pow(2, 10)       // 1024.0
Math.sqrt(144)        // 12.0
Math.ceil(4.2)        // 5.0
Math.floor(4.9)       // 4.0
Math.round(4.5)       // 5
Math.max(10, 20)      // 20
Math.min(10, 20)      // 10
Math.random()         // 0.0 to 0.999...
(int)(Math.random() * 6) + 1  // dice roll 1-6`,
    code: `public class MathDemo {
    public static void main(String[] args) {
        System.out.println("abs(-42): " + Math.abs(-42));
        System.out.println("pow(2,8): " + (int)Math.pow(2, 8));
        System.out.println("sqrt(225): " + Math.sqrt(225));
        System.out.println("ceil(3.1): " + Math.ceil(3.1));
        System.out.println("floor(3.9): " + Math.floor(3.9));
        System.out.println("round(3.5): " + Math.round(3.5));

        System.out.printf("PI: %.5f%n", Math.PI);
        System.out.printf("E:  %.5f%n", Math.E);

        double r = 7.0;
        System.out.printf("Circle r=7: area=%.2f, circumference=%.2f%n",
            Math.PI * r * r, 2 * Math.PI * r);

        double a = 3, b = 4;
        System.out.printf("Hypotenuse of 3-4 triangle: %.1f%n",
            Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));

        System.out.println("\\nDice rolls:");
        for (int i = 0; i < 5; i++) {
            System.out.print((int)(Math.random() * 6) + 1 + " ");
        }
        System.out.println();
        System.out.printf("log10(1000): %.1f%n", Math.log10(1000));
    }
}`,
    output: `abs(-42): 42
pow(2,8): 256
sqrt(225): 15.0
ceil(3.1): 4.0
floor(3.9): 3.0
round(3.5): 4
PI: 3.14159
E:  2.71828
Circle r=7: area=153.94, circumference=43.98
Hypotenuse of 3-4 triangle: 5.0

Dice rolls:
3 1 6 2 5
log10(1000): 3.0`,
    notes: [
      'Math methods are all static — call them as Math.sqrt(), never instantiate Math.',
      'Math.round() returns long for double input, int for float — assign accordingly.',
      'For cryptographically secure random numbers use java.security.SecureRandom, not Math.random().',
      'Math.log() is natural log (base e). For base 10 use Math.log10(); for other bases: Math.log(x)/Math.log(base).',
    ],
    practice: {
      title: 'Geometry Calculator',
      description: 'Write a program that calculates: (1) area and perimeter of a rectangle with width=8, height=5; (2) area and circumference of a circle with radius=6; (3) hypotenuse of a right triangle with legs 5 and 12; (4) a random number between 50 and 100 inclusive.',
      startCode: '',
      hint: 'Circle area = PI*r*r. Hypotenuse = sqrt(a*a + b*b). Random 50-100: (int)(Math.random()*51)+50.',
      solution: `public class GeomCalc {
    public static void main(String[] args) {
        System.out.printf("Rect area=%.0f, perimeter=%.0f%n", 8.0*5, 2*(8.0+5));
        System.out.printf("Circle area=%.2f, circumference=%.2f%n", Math.PI*36, 2*Math.PI*6);
        System.out.printf("Hypotenuse=%.1f%n", Math.sqrt(25+144));
        System.out.println("Random 50-100: " + ((int)(Math.random()*51)+50));
    }
}`,
    },
  },

  // ── TOPIC 3: Scanner ──────────────────────────────────────────────────────────
  {
    id: 'java-scanner',
    category: 'Getting Started',
    title: 'Scanner — Reading User Input',
    difficulty: 'Beginner',
    theory: [
      'The Scanner class (java.util.Scanner) reads input from various sources: System.in (keyboard), files, or strings. It is the standard way to read user input in console Java programs.',
      'Import it with: import java.util.Scanner; Then create an instance: Scanner sc = new Scanner(System.in);',
      'Key methods: nextInt(), nextDouble(), nextLong(), next() (reads one word), nextLine() (reads entire line including spaces).',
      'Always close the Scanner when done: sc.close(). This releases the underlying stream resource.',
      'Common pitfall: after calling nextInt() or nextDouble(), a newline character remains in the buffer. Call sc.nextLine() to consume it before calling nextLine() again.',
    ],
    syntax: `import java.util.Scanner;

Scanner sc = new Scanner(System.in);

int n       = sc.nextInt();      // read integer
double d    = sc.nextDouble();   // read decimal
String word = sc.next();         // read one word
String line = sc.nextLine();     // read full line

sc.close();`,
    code: `import java.util.Scanner;

public class ScannerDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = sc.nextLine();

        System.out.print("Enter your age: ");
        int age = sc.nextInt();

        System.out.print("Enter your GPA: ");
        double gpa = sc.nextDouble();

        sc.nextLine(); // consume leftover newline

        System.out.print("Enter your city: ");
        String city = sc.nextLine();

        System.out.println("\\n=== Profile ===");
        System.out.println("Name : " + name);
        System.out.println("Age  : " + age);
        System.out.printf("GPA  : %.2f%n", gpa);
        System.out.println("City : " + city);

        String standing = gpa >= 3.5 ? "Honours" : gpa >= 2.0 ? "Good Standing" : "Probation";
        System.out.println("Status: " + standing);

        sc.close();
    }
}`,
    output: `Enter your name: Alice Johnson
Enter your age: 20
Enter your GPA: 3.8
Enter your city: New York

=== Profile ===
Name : Alice Johnson
Age  : 20
GPA  : 3.80
City : New York
Status: Honours`,
    notes: [
      'Always import java.util.Scanner — it is not auto-imported unlike java.lang classes.',
      'Use sc.nextLine() after sc.nextInt() to consume the trailing newline before the next nextLine() call.',
      'Scanner can also read from a file: new Scanner(new File("input.txt")) — add throws IOException to main.',
      'hasNextInt() checks if the next token is an integer — useful for input validation loops.',
    ],
    practice: {
      title: 'Simple Interest Calculator',
      description: 'Write a program that reads principal (double), rate of interest (double), and time in years (int) from the user, then prints the simple interest (P*R*T/100) and total amount (principal + interest).',
      startCode: '',
      hint: 'Simple interest = (principal * rate * time) / 100. Read with nextDouble(), nextDouble(), nextInt().',
      solution: `import java.util.Scanner;
public class SimpleInterest {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Principal: "); double p = sc.nextDouble();
        System.out.print("Rate (%): "); double r = sc.nextDouble();
        System.out.print("Time (years): "); int t = sc.nextInt();
        double si = (p * r * t) / 100;
        System.out.printf("Simple Interest: %.2f%n", si);
        System.out.printf("Total Amount: %.2f%n", p + si);
        sc.close();
    }
}`,
    },
  },

  // ── TOPIC 4: Wrapper Classes & Autoboxing ─────────────────────────────────────
  {
    id: 'java-wrapper-classes',
    category: 'Java Fundamentals',
    title: 'Wrapper Classes & Autoboxing',
    difficulty: 'Intermediate',
    theory: [
      'Every primitive type in Java has a corresponding Wrapper class: int → Integer, double → Double, boolean → Boolean, char → Character, long → Long, etc.',
      'Wrapper classes turn primitives into objects, enabling them to be stored in Collections (List, Map, etc.) which require objects, not primitives.',
      'Autoboxing is the automatic conversion from primitive to wrapper (int → Integer). Unboxing is the reverse (Integer → int). Java does this transparently.',
      'Wrapper classes provide useful static utility methods: Integer.parseInt(), Double.parseDouble(), Integer.toBinaryString(), Integer.MAX_VALUE, Integer.MIN_VALUE.',
      'Null handling: a wrapper variable can be null (unlike a primitive). Unboxing a null Integer throws NullPointerException.',
    ],
    syntax: `// Autoboxing
Integer a = 42;         // int -> Integer (autoboxing)
int b = a;              // Integer -> int (unboxing)

// Useful methods
int n = Integer.parseInt("123");
String s = Integer.toString(456);
int max = Integer.MAX_VALUE;  // 2147483647

// Collections require wrappers
List<Integer> list = new ArrayList<>();
list.add(10);  // autoboxed to Integer`,
    code: `import java.util.*;

public class WrapperDemo {
    public static void main(String[] args) {
        Integer boxed = 100;
        int unboxed = boxed;
        System.out.println("Boxed: " + boxed + ", Unboxed: " + unboxed);

        int parsed   = Integer.parseInt("256");
        double dbl   = Double.parseDouble("3.14");
        boolean bool = Boolean.parseBoolean("true");
        System.out.println("Parsed int: " + parsed);
        System.out.println("Parsed double: " + dbl);
        System.out.println("Parsed bool: " + bool);

        System.out.println("Integer.MAX_VALUE: " + Integer.MAX_VALUE);
        System.out.println("Integer.MIN_VALUE: " + Integer.MIN_VALUE);

        System.out.println("42 in binary: " + Integer.toBinaryString(42));
        System.out.println("42 in hex: " + Integer.toHexString(42));
        System.out.println("42 in octal: " + Integer.toOctalString(42));

        List<Integer> scores = new ArrayList<>();
        for (int i = 1; i <= 5; i++) scores.add(i * 10);
        System.out.println("Scores: " + scores);
        int total = 0;
        for (int s : scores) total += s;
        System.out.println("Total: " + total);

        char c = 'A';
        System.out.println("isLetter: " + Character.isLetter(c));
        System.out.println("isDigit: " + Character.isDigit(c));
        System.out.println("toLowerCase: " + Character.toLowerCase(c));
    }
}`,
    output: `Boxed: 100, Unboxed: 100
Parsed int: 256
Parsed double: 3.14
Parsed bool: true
Integer.MAX_VALUE: 2147483647
Integer.MIN_VALUE: -2147483648
42 in binary: 101010
42 in hex: 2a
42 in octal: 52
Scores: [10, 20, 30, 40, 50]
Total: 150
isLetter: true
isDigit: false
toLowerCase: a`,
    notes: [
      'Use primitives (int, double) for local variables and arithmetic — they are faster than wrappers.',
      'Use wrapper classes when you need null support, or when working with generics and collections.',
      'Integer caches values from -128 to 127 — two Integer objects with the same value in this range share the same reference. Outside this range, use .equals().',
      'Integer.parseInt() throws NumberFormatException on invalid input — always wrap in try-catch when parsing user input.',
    ],
    practice: {
      title: 'String-to-Number Converter',
      description: 'Write a program that takes an array of strings: {"42", "3.14", "true", "abc", "100", "false"}. For each string, try to parse it as an integer first, then as a double, then treat it as a boolean. Print what each one is, handling NumberFormatException.',
      startCode: '',
      hint: 'Use Integer.parseInt() in a try-catch. If it fails, try Double.parseDouble(). If that fails too, use Boolean.parseBoolean().',
      solution: `public class StringConverter {
    public static void main(String[] args) {
        String[] values = {"42", "3.14", "true", "abc", "100", "false"};
        for (String v : values) {
            try {
                int i = Integer.parseInt(v);
                System.out.println(v + " -> int: " + i);
            } catch (NumberFormatException e1) {
                try {
                    double d = Double.parseDouble(v);
                    System.out.println(v + " -> double: " + d);
                } catch (NumberFormatException e2) {
                    System.out.println(v + " -> boolean: " + Boolean.parseBoolean(v));
                }
            }
        }
    }
}`,
    },
  },

  // ── TOPIC 5: Enum ─────────────────────────────────────────────────────────────
  {
    id: 'java-enum',
    category: 'Java Fundamentals',
    title: 'Enumerations (enum)',
    difficulty: 'Intermediate',
    theory: [
      'An enum (enumeration) defines a fixed set of named constants. Use it when a variable can only hold one of a limited set of values: days of the week, directions, seasons, status codes.',
      'Enums are type-safe — the compiler prevents assigning invalid values, unlike using int constants (0, 1, 2...).',
      'Java enums are full classes — they can have fields, constructors, and methods. This makes them far more powerful than enums in other languages.',
      'Useful enum methods: values() returns all constants as an array, ordinal() returns the position (0-based), name() returns the name as a String, valueOf(String) converts a string to an enum constant.',
    ],
    syntax: `// Basic enum
enum Direction { NORTH, SOUTH, EAST, WEST }

// Enum with fields
enum Priority {
    LOW(1), MEDIUM(5), HIGH(10);
    private final int value;
    Priority(int value) { this.value = value; }
    public int getValue() { return value; }
}

Direction dir = Direction.NORTH;
for (Direction d : Direction.values()) { ... }`,
    code: `public class EnumDemo {

    enum Day {
        MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;
        public boolean isWeekend() {
            return this == SATURDAY || this == SUNDAY;
        }
    }

    enum Priority {
        LOW(1), MEDIUM(5), HIGH(10), CRITICAL(100);
        private final int value;
        Priority(int value) { this.value = value; }
        public int getValue() { return value; }
    }

    enum Status {
        PENDING("Awaiting review"),
        IN_PROGRESS("Currently being worked on"),
        DONE("Completed"),
        CANCELLED("No longer needed");
        private final String description;
        Status(String desc) { this.description = desc; }
        public String getDescription() { return description; }
    }

    public static void main(String[] args) {
        Day today = Day.WEDNESDAY;
        System.out.println("Today: " + today);
        System.out.println("Is weekend: " + today.isWeekend());
        System.out.println("Ordinal: " + today.ordinal());

        System.out.println("\\nAll days:");
        for (Day d : Day.values()) {
            System.out.println("  " + d + (d.isWeekend() ? " (weekend)" : ""));
        }

        Priority p = Priority.HIGH;
        String action = switch (p) {
            case LOW      -> "Schedule for later";
            case MEDIUM   -> "Handle this week";
            case HIGH     -> "Handle today";
            case CRITICAL -> "Handle RIGHT NOW";
        };
        System.out.println("\\n" + p + " (" + p.getValue() + "): " + action);

        Status s = Status.IN_PROGRESS;
        System.out.println("\\nStatus: " + s.name() + " - " + s.getDescription());
    }
}`,
    output: `Today: WEDNESDAY
Is weekend: false
Ordinal: 2

All days:
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY (weekend)
  SUNDAY (weekend)

HIGH (10): Handle today

Status: IN_PROGRESS - Currently being worked on`,
    notes: [
      'Enums implicitly extend java.lang.Enum — you cannot extend another class, but can implement interfaces.',
      'Use enum instead of int constants (0=LOW, 1=MEDIUM) — enums give compile-time safety and self-documenting code.',
      'Enum constants are singleton objects — comparing with == is safe and correct (no need for .equals()).',
      'Java 14+ switch expressions work perfectly with enums and are exhaustive — no default needed if all constants are covered.',
    ],
    practice: {
      title: 'Traffic Light Simulator',
      description: 'Create an enum TrafficLight with values RED, YELLOW, GREEN. Each should have a field duration (seconds): RED=30, YELLOW=5, GREEN=25. Add a method next() that returns the next light in sequence. Simulate 6 cycles, printing the light name and duration each time.',
      startCode: '',
      hint: 'In next(), use: values()[(ordinal()+1) % values().length].',
      solution: `public class TrafficLightSim {
    enum TrafficLight {
        RED(30), YELLOW(5), GREEN(25);
        private final int duration;
        TrafficLight(int d) { this.duration = d; }
        public int getDuration() { return duration; }
        public TrafficLight next() { return values()[(ordinal()+1) % values().length]; }
    }
    public static void main(String[] args) {
        TrafficLight light = TrafficLight.RED;
        for (int i = 0; i < 6; i++) {
            System.out.println(light + " - " + light.getDuration() + "s");
            light = light.next();
        }
    }
}`,
    },
  },

  // ── TOPIC 6: Inner & Nested Classes ───────────────────────────────────────────
  {
    id: 'java-nested-classes',
    category: 'Object-Oriented Programming',
    title: 'Inner & Nested Classes',
    difficulty: 'Intermediate',
    theory: [
      'Java allows classes to be defined inside other classes. There are four types: static nested class, inner class (non-static), local class (defined inside a method), and anonymous class.',
      'A static nested class belongs to the outer class itself, not to any instance. It can only access static members of the outer class.',
      'An inner class (non-static) is associated with an instance of the outer class and can access all outer class members including private ones.',
      'Anonymous classes are often used to provide a one-time implementation of an interface or abstract class — largely replaced by lambda expressions in modern Java.',
    ],
    syntax: `class Outer {
    private int x = 10;

    static class StaticNested {
        void show() { System.out.println("Static nested"); }
    }

    class Inner {
        void show() { System.out.println("x = " + x); }
    }
}

Outer.StaticNested sn = new Outer.StaticNested();
Outer.Inner inner = new Outer().new Inner();`,
    code: `public class NestedClassDemo {

    private String brand = "TechCorp";
    private int year = 2025;

    static class Logger {
        private static int logCount = 0;
        static void log(String message) {
            System.out.println("[LOG " + (++logCount) + "] " + message);
        }
        static int getCount() { return logCount; }
    }

    class Report {
        private String title;
        Report(String title) { this.title = title; }
        void print() {
            System.out.println("=== " + title + " ===");
            System.out.println("Company: " + brand);
            System.out.println("Year: " + year);
        }
    }

    interface Greeting {
        void greet(String name);
    }

    public static void main(String[] args) {
        Logger.log("Application started");
        Logger.log("Loading configuration");
        System.out.println("Total logs: " + Logger.getCount());

        NestedClassDemo app = new NestedClassDemo();
        NestedClassDemo.Report r = app.new Report("Annual Summary");
        r.print();

        Greeting formal = new Greeting() {
            @Override
            public void greet(String name) {
                System.out.println("Good day, " + name + ". Welcome.");
            }
        };

        Greeting casual = name -> System.out.println("Hey " + name + "!");

        formal.greet("Alice");
        casual.greet("Bob");
    }
}`,
    output: `[LOG 1] Application started
[LOG 2] Loading configuration
Total logs: 2
=== Annual Summary ===
Company: TechCorp
Year: 2025
Good day, Alice. Welcome.
Hey Bob!`,
    notes: [
      'Prefer static nested classes over inner classes unless you need access to the outer instance — they are simpler and avoid holding a reference to the outer object.',
      'Anonymous classes are largely replaced by lambda expressions in modern Java — use lambdas when implementing a functional interface.',
      'Inner class instances hold an implicit reference to their outer instance, which can cause memory leaks if retained longer than the outer object.',
      'Local classes (defined inside methods) have access to effectively final local variables only.',
    ],
    practice: {
      title: 'Linked List Node',
      description: 'Create a class MyLinkedList with a static nested class Node (int data, Node next). Implement methods: add(int val) to append to end, print() to display all values separated by "->". Test with values 10, 20, 30, 40.',
      startCode: '',
      hint: 'Node is static nested because it does not need access to MyLinkedList instance fields. Traverse to the last node (node.next == null) to append.',
      solution: `public class MyLinkedList {
    static class Node { int data; Node next; Node(int d){data=d;} }
    Node head;
    void add(int val) {
        if (head == null) { head = new Node(val); return; }
        Node cur = head;
        while (cur.next != null) cur = cur.next;
        cur.next = new Node(val);
    }
    void print() {
        Node cur = head;
        while (cur != null) {
            System.out.print(cur.data + (cur.next != null ? " -> " : ""));
            cur = cur.next;
        }
        System.out.println();
    }
    public static void main(String[] args) {
        MyLinkedList list = new MyLinkedList();
        list.add(10); list.add(20); list.add(30); list.add(40);
        list.print();
    }
}`,
    },
  },

  // ── TOPIC 7: Comparable & Comparator ─────────────────────────────────────────
  {
    id: 'java-comparable-comparator',
    category: 'Collections',
    title: 'Comparable & Comparator',
    difficulty: 'Intermediate',
    theory: [
      'Comparable<T> (java.lang.Comparable) defines the natural ordering of a class. Implement its compareTo(T other) method. Collections.sort() and Arrays.sort() use this.',
      'Comparator<T> (java.util.Comparator) defines an external, custom ordering. Pass it to sort methods as a second argument. Multiple Comparators can exist for one class.',
      'compareTo() convention: return negative if this < other, 0 if equal, positive if this > other. Use Integer.compare(a, b) rather than a - b to avoid overflow.',
      'Java 8+ Comparator.comparing() creates Comparators from key extractors. Chain with .thenComparing() for multi-level sorting. .reversed() inverts order.',
    ],
    syntax: `class Student implements Comparable<Student> {
    int marks;
    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.marks, other.marks);
    }
}

Comparator<Student> byName = Comparator.comparing(s -> s.name);
Comparator<Student> byMarksDesc =
    Comparator.comparingInt((Student s) -> s.marks).reversed();

list.sort(byName.thenComparing(byMarksDesc));`,
    code: `import java.util.*;

class Student implements Comparable<Student> {
    String name; int marks; String subject;

    Student(String name, int marks, String subject) {
        this.name = name; this.marks = marks; this.subject = subject;
    }

    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.marks, other.marks);
    }

    @Override
    public String toString() {
        return String.format("%-10s %3d (%s)", name, marks, subject);
    }
}

public class SortingDemo {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>(Arrays.asList(
            new Student("Priya",  92, "Maths"),
            new Student("Rahul",  78, "Science"),
            new Student("Sneha",  85, "Maths"),
            new Student("Arun",   78, "English"),
            new Student("Chetan", 92, "Science")
        ));

        Collections.sort(students);
        System.out.println("By marks (asc):");
        students.forEach(System.out::println);

        students.sort(Comparator.comparing(s -> s.name));
        System.out.println("\\nBy name:");
        students.forEach(System.out::println);

        students.sort(
            Comparator.comparingInt((Student s) -> s.marks)
                      .reversed()
                      .thenComparing(s -> s.name)
        );
        System.out.println("\\nBy marks desc, then name:");
        students.forEach(System.out::println);
    }
}`,
    output: `By marks (asc):
Rahul       78 (Science)
Arun        78 (English)
Sneha       85 (Maths)
Priya       92 (Maths)
Chetan      92 (Science)

By name:
Arun        78 (English)
Chetan      92 (Science)
Priya       92 (Maths)
Rahul       78 (Science)
Sneha       85 (Maths)

By marks desc, then name:
Chetan      92 (Science)
Priya       92 (Maths)
Sneha       85 (Maths)
Arun        78 (English)
Rahul       78 (Science)`,
    notes: [
      'Implement Comparable for the most natural/default sort order; use Comparator for alternative orderings.',
      'Integer.compare(a, b) is safer than a - b for compareTo — subtraction can overflow for large integers.',
      'Comparator.comparing() accepts a method reference: Comparator.comparing(Student::getName).',
      'To sort in descending order: Collections.sort(list, Collections.reverseOrder()) or .reversed() on a Comparator.',
    ],
    practice: {
      title: 'Product Sorter',
      description: 'Create a Product class with name (String), price (double), and rating (double). Implement Comparable for natural order by price ascending. Also create Comparators for: by name alphabetically, by rating descending. Sort and print a list of 5 products using each ordering.',
      startCode: '',
      hint: 'Double.compare(this.price, other.price) for compareTo. Comparator.comparingDouble(p -> p.rating).reversed() for rating desc.',
      solution: `import java.util.*;
class Product implements Comparable<Product> {
    String name; double price, rating;
    Product(String n, double p, double r){name=n;price=p;rating=r;}
    public int compareTo(Product o){return Double.compare(price,o.price);}
    public String toString(){return String.format("%-12s $%7.2f * %.1f",name,price,rating);}
}
public class ProductSort {
    public static void main(String[] args) {
        List<Product> list = new ArrayList<>(Arrays.asList(
            new Product("Laptop",45000,4.5), new Product("Phone",25000,4.8),
            new Product("Tablet",18000,4.6), new Product("Watch",8000,4.2),
            new Product("Earbuds",3000,4.7)));
        Collections.sort(list);
        System.out.println("By price:"); list.forEach(System.out::println);
        list.sort(Comparator.comparing(p->p.name));
        System.out.println("\\nBy name:"); list.forEach(System.out::println);
        list.sort(Comparator.comparingDouble((Product p)->p.rating).reversed());
        System.out.println("\\nBy rating desc:"); list.forEach(System.out::println);
    }
}`,
    },
  },

  // ── TOPIC 8: LinkedList ───────────────────────────────────────────────────────
  {
    id: 'java-linked-list',
    category: 'Collections',
    title: 'LinkedList — Doubly Linked List',
    difficulty: 'Intermediate',
    theory: [
      'java.util.LinkedList is a doubly linked list that implements both List and Deque interfaces. Each element stores references to the previous and next nodes.',
      'LinkedList excels at O(1) insertions and deletions at the head or tail, but has O(n) random access by index (unlike ArrayList which is O(1)).',
      'As a Deque, LinkedList can be used as a queue (FIFO) with offer()/poll() or as a stack (LIFO) with push()/pop().',
      'Use LinkedList when you frequently add/remove from the beginning or middle of a list. Use ArrayList when you need fast random access by index.',
    ],
    syntax: `LinkedList<String> list = new LinkedList<>();
list.addFirst("x");      // add to head
list.addLast("z");       // add to tail
list.removeFirst();      // remove from head
list.removeLast();       // remove from tail
list.getFirst();         // peek at head

// Queue usage
Queue<String> q = new LinkedList<>();
q.offer("item");  // enqueue
q.poll();         // dequeue`,
    code: `import java.util.*;

public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<String> tasks = new LinkedList<>();
        tasks.add("Task A");
        tasks.add("Task B");
        tasks.add("Task C");
        tasks.addFirst("URGENT Task");
        tasks.addLast("Background Task");

        System.out.println("Tasks: " + tasks);
        System.out.println("First: " + tasks.getFirst());
        System.out.println("Last: " + tasks.getLast());

        System.out.println("Removed first: " + tasks.removeFirst());
        System.out.println("Removed last: " + tasks.removeLast());
        System.out.println("After removals: " + tasks);

        System.out.println("\\n=== Queue (FIFO) ===");
        Queue<String> queue = new LinkedList<>();
        queue.offer("Customer 1");
        queue.offer("Customer 2");
        queue.offer("Customer 3");
        System.out.println("Queue: " + queue);
        System.out.println("Serving: " + queue.poll());
        System.out.println("Serving: " + queue.poll());
        System.out.println("Remaining: " + queue);

        System.out.println("\\n=== Stack (LIFO) ===");
        Deque<Integer> stack = new LinkedList<>();
        stack.push(10); stack.push(20); stack.push(30);
        System.out.println("Stack: " + stack);
        System.out.println("Pop: " + stack.pop());
        System.out.println("Pop: " + stack.pop());
        System.out.println("Remaining: " + stack);
    }
}`,
    output: `Tasks: [URGENT Task, Task A, Task B, Task C, Background Task]
First: URGENT Task
Last: Background Task
Removed first: URGENT Task
Removed last: Background Task
After removals: [Task A, Task B, Task C]

=== Queue (FIFO) ===
Queue: [Customer 1, Customer 2, Customer 3]
Serving: Customer 1
Serving: Customer 2
Remaining: [Customer 3]

=== Stack (LIFO) ===
Stack: [30, 20, 10]
Pop: 30
Pop: 20
Remaining: [10]`,
    notes: [
      'For a Queue, prefer ArrayDeque over LinkedList — it is faster (no node allocation overhead).',
      'poll() returns null if the list is empty; remove() throws NoSuchElementException. Use poll() for safe removal.',
      'Iterating a LinkedList with an index-based loop (get(i)) is O(n²) — always use for-each or iterator.',
      'LinkedList uses more memory than ArrayList because each node stores two extra pointers (previous, next).',
    ],
    practice: {
      title: 'Browser History Simulator',
      description: 'Use two Deques (back and forward stacks) to simulate browser history. Implement: visit(url), goBack(), goForward(). When visiting a new page, clear the forward stack. Test: visit 3 pages, go back 2, visit a new page, attempt goForward (should fail), go back.',
      startCode: '',
      hint: 'Use Deque<String> back and forward. visit() pushes current to back, clears forward. goBack() pushes current to forward, pops from back.',
      solution: `import java.util.*;
public class BrowserHistory {
    Deque<String> back = new ArrayDeque<>(), forward = new ArrayDeque<>();
    String current;
    void visit(String url) { if(current!=null)back.push(current); current=url; forward.clear(); System.out.println("Visiting: "+current); }
    void goBack() { if(back.isEmpty()){System.out.println("No history");return;} forward.push(current); current=back.pop(); System.out.println("Back: "+current); }
    void goForward() { if(forward.isEmpty()){System.out.println("No forward");return;} back.push(current); current=forward.pop(); System.out.println("Forward: "+current); }
    public static void main(String[] args) {
        BrowserHistory b = new BrowserHistory();
        b.visit("google.com"); b.visit("github.com"); b.visit("stackoverflow.com");
        b.goBack(); b.goBack(); b.visit("youtube.com"); b.goForward(); b.goBack();
    }
}`,
    },
  },

  // ── TOPIC 9: Stack & Queue (Deque) ────────────────────────────────────────────
  {
    id: 'java-stack-queue',
    category: 'Collections',
    title: 'Stack & Queue (Deque)',
    difficulty: 'Intermediate',
    theory: [
      'Stack (LIFO — Last In First Out): the last element added is the first removed. Think of a stack of plates. ArrayDeque is the recommended implementation.',
      'Queue (FIFO — First In First Out): the first element added is the first removed. Think of a checkout line. ArrayDeque and LinkedList both implement Queue.',
      'Deque (Double Ended Queue) supports insertion and removal from both ends, making it suitable for both stack and queue patterns.',
      'ArrayDeque is the recommended implementation for both Stack and Queue in modern Java — it is faster than the legacy Stack class (which is synchronized) and LinkedList.',
    ],
    syntax: `// Stack (LIFO)
Deque<Integer> stack = new ArrayDeque<>();
stack.push(10);   // push to top
stack.pop();      // remove from top
stack.peek();     // view top without removing

// Queue (FIFO)
Queue<String> queue = new ArrayDeque<>();
queue.offer("item");  // enqueue
queue.poll();         // dequeue
queue.peek();         // view front`,
    code: `import java.util.*;

public class StackQueueDemo {

    static boolean isBalanced(String expr) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : expr.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else if (c == ')' || c == ']' || c == '}') {
                if (stack.isEmpty()) return false;
                char open = stack.pop();
                if ((c==')' && open!='(') || (c==']' && open!='[') || (c=='}' && open!='{')) return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        String[] tests = {"({[]})", "([)]", "((()))", "{[}"};
        System.out.println("=== Bracket Checker ===");
        for (String t : tests) {
            System.out.println(t + " -> " + (isBalanced(t) ? "BALANCED" : "INVALID"));
        }

        System.out.println("\\n=== Print Queue ===");
        Queue<String> printQueue = new ArrayDeque<>();
        printQueue.offer("Report.pdf");
        printQueue.offer("Slides.pptx");
        printQueue.offer("Invoice.xlsx");
        while (!printQueue.isEmpty()) {
            System.out.println("Printing: " + printQueue.poll());
        }
        System.out.println("Queue empty: " + printQueue.isEmpty());

        System.out.println("\\n=== Undo Stack ===");
        Deque<String> undoStack = new ArrayDeque<>();
        undoStack.push("Type 'Hello'");
        undoStack.push("Bold text");
        undoStack.push("Insert image");
        System.out.println("Actions: " + undoStack);
        System.out.println("Undo: " + undoStack.pop());
        System.out.println("Undo: " + undoStack.pop());
        System.out.println("Remaining: " + undoStack);
    }
}`,
    output: `=== Bracket Checker ===
({[]}) -> BALANCED
([)] -> INVALID
((()))  -> BALANCED
{[} -> INVALID

=== Print Queue ===
Printing: Report.pdf
Printing: Slides.pptx
Printing: Invoice.xlsx
Queue empty: true

=== Undo Stack ===
Actions: [Insert image, Bold text, Type 'Hello']
Undo: Insert image
Undo: Bold text
Remaining: [Type 'Hello']`,
    notes: [
      'Avoid the legacy java.util.Stack class — it extends Vector (synchronized, slow). Use ArrayDeque instead.',
      'peek() returns null if empty; element() throws NoSuchElementException. Use peek() for safe inspection.',
      'offer() is preferred over add() for bounded queues — it returns false instead of throwing on full.',
      'Real-world stack uses: undo/redo, call stack, expression evaluation, DFS graph traversal.',
    ],
    practice: {
      title: 'String Reversal & Palindrome',
      description: 'Write a method that reverses a string using a Stack (push each character, then pop all). Then write a method that checks if a string is a palindrome using the same stack approach. Test with: "hello", "racecar", "madam", "world".',
      startCode: '',
      hint: 'Push each character onto the Deque stack, then build reversed string by popping. Compare original == reversed for palindrome.',
      solution: `import java.util.*;
public class StackPractice {
    static String reverse(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) stack.push(c);
        StringBuilder sb = new StringBuilder();
        while (!stack.isEmpty()) sb.append(stack.pop());
        return sb.toString();
    }
    static boolean isPalindrome(String s) { return s.equals(reverse(s)); }
    public static void main(String[] args) {
        String[] words = {"hello", "racecar", "madam", "world"};
        for (String w : words)
            System.out.println(w + " -> reversed: " + reverse(w) + ", palindrome: " + isPalindrome(w));
    }
}`,
    },
  },

  // ── TOPIC 10: HashSet & TreeSet ───────────────────────────────────────────────
  {
    id: 'java-hashset-treeset',
    category: 'Collections',
    title: 'HashSet & TreeSet',
    difficulty: 'Intermediate',
    theory: [
      'A Set stores unique elements — no duplicates allowed. Adding a duplicate has no effect and does not throw an error.',
      'HashSet uses a hash table internally. O(1) average for add, remove, contains. Does not maintain any order.',
      'TreeSet uses a Red-Black tree internally. O(log n) operations. Always maintains elements in sorted natural order (or custom Comparator order).',
      'LinkedHashSet maintains insertion order while still enforcing uniqueness — a middle ground between HashSet (no order) and TreeSet (sorted order).',
    ],
    syntax: `Set<String> hashSet = new HashSet<>();
hashSet.add("apple");
hashSet.add("apple");      // ignored - duplicate
hashSet.contains("apple"); // true

TreeSet<Integer> treeSet = new TreeSet<>();
treeSet.first();           // smallest
treeSet.last();            // largest
treeSet.headSet(5);        // elements < 5
treeSet.tailSet(5);        // elements >= 5`,
    code: `import java.util.*;

public class SetDemo {
    public static void main(String[] args) {
        Set<String> hashSet = new HashSet<>();
        hashSet.add("Banana"); hashSet.add("Apple");
        hashSet.add("Mango");  hashSet.add("Apple"); // duplicate
        hashSet.add("Cherry");
        System.out.println("HashSet (unordered): " + hashSet);
        System.out.println("Size (no duplicates): " + hashSet.size());
        System.out.println("Contains Mango: " + hashSet.contains("Mango"));

        TreeSet<String> treeSet = new TreeSet<>(hashSet);
        System.out.println("\\nTreeSet (sorted): " + treeSet);
        System.out.println("First: " + treeSet.first());
        System.out.println("Last: " + treeSet.last());
        System.out.println("Before Mango: " + treeSet.headSet("Mango"));

        Set<Integer> setA = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
        Set<Integer> setB = new HashSet<>(Arrays.asList(3, 4, 5, 6, 7));

        Set<Integer> union = new HashSet<>(setA);
        union.addAll(setB);
        System.out.println("\\nUnion: " + new TreeSet<>(union));

        Set<Integer> intersection = new HashSet<>(setA);
        intersection.retainAll(setB);
        System.out.println("Intersection: " + new TreeSet<>(intersection));

        Set<Integer> difference = new HashSet<>(setA);
        difference.removeAll(setB);
        System.out.println("Difference (A-B): " + new TreeSet<>(difference));

        int[] arr = {1, 3, 2, 3, 4, 1, 5};
        Set<Integer> seen = new HashSet<>(), duplicates = new HashSet<>();
        for (int n : arr) if (!seen.add(n)) duplicates.add(n);
        System.out.println("\\nDuplicates in array: " + duplicates);
    }
}`,
    output: `HashSet (unordered): [Apple, Mango, Cherry, Banana]
Size (no duplicates): 4
Contains Mango: true

TreeSet (sorted): [Apple, Banana, Cherry, Mango]
First: Apple
Last: Mango
Before Mango: [Apple, Banana, Cherry]

Union: [1, 2, 3, 4, 5, 6, 7]
Intersection: [3, 4, 5]
Difference (A-B): [1, 2]

Duplicates in array: [1, 3]`,
    notes: [
      'Sets do not have a get(index) method — iterate with for-each or iterator.',
      'For custom objects in a HashSet, override both hashCode() and equals() — HashSet uses them to determine uniqueness.',
      'TreeSet requires elements to be Comparable or a Comparator — adding non-comparable objects throws ClassCastException.',
      'A common interview task: find duplicates in an array — the HashSet seen-set approach is O(n) and elegant.',
    ],
    practice: {
      title: 'Unique Word Counter',
      description: 'Given the sentence "the quick brown fox jumps over the lazy dog the fox", use a HashSet to find unique words, a TreeSet to display them in alphabetical order, and a HashMap to count frequency. Print: total unique words, all words sorted, and words that appear more than once.',
      startCode: '',
      hint: 'split(" ") gives words. Add to HashSet for uniqueness. TreeSet for sorted. HashMap for frequency count. Use freq.getOrDefault(word, 0) + 1.',
      solution: `import java.util.*;
public class UniqueWords {
    public static void main(String[] args) {
        String sentence = "the quick brown fox jumps over the lazy dog the fox";
        String[] words = sentence.split(" ");
        Set<String> unique = new HashSet<>(Arrays.asList(words));
        System.out.println("Unique count: " + unique.size());
        System.out.println("Sorted: " + new TreeSet<>(unique));
        Map<String,Integer> freq = new HashMap<>();
        for (String w : words) freq.put(w, freq.getOrDefault(w, 0) + 1);
        System.out.print("Repeated: ");
        freq.entrySet().stream().filter(e -> e.getValue() > 1)
            .forEach(e -> System.out.print(e.getKey() + "(" + e.getValue() + ") "));
        System.out.println();
    }
}`,
    },
  },

  // ── TOPIC 11: TreeMap ─────────────────────────────────────────────────────────
  {
    id: 'java-treemap',
    category: 'Collections',
    title: 'TreeMap — Sorted Key-Value Store',
    difficulty: 'Intermediate',
    theory: [
      'TreeMap<K,V> is a Map implementation that stores key-value pairs in sorted key order (natural order or custom Comparator). It uses a Red-Black tree internally.',
      'All operations (put, get, remove, containsKey) run in O(log n) time — slower than HashMap (O(1)) but always sorted.',
      'TreeMap provides navigation methods: firstKey(), lastKey(), headMap(toKey), tailMap(fromKey), subMap(from, to), floorKey(), ceilingKey().',
      'Use TreeMap when you need keys in sorted order, or when you need range queries on keys. Use HashMap when order does not matter and you want speed.',
    ],
    syntax: `TreeMap<String, Integer> map = new TreeMap<>();
map.put("banana", 2);
map.put("apple", 5);
map.put("cherry", 1);
// Iterates in key order: apple, banana, cherry

map.firstKey();           // "apple"
map.lastKey();            // "cherry"
map.headMap("cherry");    // keys < "cherry"
map.floorKey("b");        // largest key <= "b"`,
    code: `import java.util.*;

public class TreeMapDemo {
    public static void main(String[] args) {
        TreeMap<String, Integer> scores = new TreeMap<>();
        scores.put("Charlie", 88);
        scores.put("Alice",   95);
        scores.put("Bob",     72);
        scores.put("Diana",   91);
        scores.put("Eve",     85);

        System.out.println("Sorted by name: " + scores);
        System.out.println("First: " + scores.firstKey() + " = " + scores.firstEntry().getValue());
        System.out.println("Last:  " + scores.lastKey()  + " = " + scores.lastEntry().getValue());

        System.out.println("\\nBefore Diana (headMap): " + scores.headMap("Diana"));
        System.out.println("From Diana (tailMap):   " + scores.tailMap("Diana"));
        System.out.println("Bob to Eve (subMap):    " + scores.subMap("Bob", "Eve"));

        System.out.println("\\nFloor of 'C': " + scores.floorKey("C"));
        System.out.println("Ceiling of 'C': " + scores.ceilingKey("C"));

        // Descending order
        System.out.println("\\nDescending: " + scores.descendingMap());

        // Word frequency in sorted order
        String text = "banana apple cherry apple banana apple";
        TreeMap<String, Integer> freq = new TreeMap<>();
        for (String word : text.split(" ")) {
            freq.merge(word, 1, Integer::sum);
        }
        System.out.println("\\nWord frequency (sorted): " + freq);

        // Most frequent word
        String topWord = Collections.max(freq.keySet(), Comparator.comparingInt(freq::get));
        System.out.println("Most frequent: " + topWord + " (" + freq.get(topWord) + ")");
    }
}`,
    output: `Sorted by name: {Alice=95, Bob=72, Charlie=88, Diana=91, Eve=85}
First: Alice = 95
Last:  Eve = 85

Before Diana (headMap): {Alice=95, Bob=72, Charlie=88}
From Diana (tailMap):   {Diana=91, Eve=85}
Bob to Eve (subMap):    {Bob=72, Charlie=88, Diana=91}

Floor of 'C': Bob
Ceiling of 'C': Charlie

Descending: {Eve=85, Diana=91, Charlie=88, Bob=72, Alice=95}

Word frequency (sorted): {apple=3, banana=2, cherry=1}

Most frequent: apple (3)`,
    notes: [
      'TreeMap keys must implement Comparable, or you must provide a Comparator at construction: new TreeMap<>(Comparator.reverseOrder()).',
      'TreeMap never allows null keys (throws NullPointerException). HashMap allows one null key.',
      'For concurrent sorted maps, use ConcurrentSkipListMap instead of synchronizing a TreeMap.',
      'firstEntry()/lastEntry() return Map.Entry — useful when you need both key and value at the boundary.',
    ],
    practice: {
      title: 'Grade Book',
      description: 'Use a TreeMap<String, List<Integer>> where keys are student names and values are lists of scores. Add 4 students with 3 scores each. Print: all students in alphabetical order with their average, the top student, and the bottom student.',
      startCode: '',
      hint: 'Use TreeMap so names are sorted. For each entry, compute average. Use firstEntry()/lastEntry() after sorting by value.',
      solution: `import java.util.*;
public class GradeBook {
    public static void main(String[] args) {
        TreeMap<String, List<Integer>> book = new TreeMap<>();
        book.put("Zara", Arrays.asList(85, 90, 88));
        book.put("Alice", Arrays.asList(92, 95, 91));
        book.put("Mike", Arrays.asList(70, 75, 68));
        book.put("Beth", Arrays.asList(88, 82, 86));
        System.out.println("=== Grade Book ===");
        String top = null, bottom = null;
        double topAvg = -1, bottomAvg = 101;
        for (var entry : book.entrySet()) {
            double avg = entry.getValue().stream().mapToInt(i->i).average().orElse(0);
            System.out.printf("%-10s avg=%.1f%n", entry.getKey(), avg);
            if (avg > topAvg) { topAvg = avg; top = entry.getKey(); }
            if (avg < bottomAvg) { bottomAvg = avg; bottom = entry.getKey(); }
        }
        System.out.println("Top: " + top + " (" + topAvg + ")");
        System.out.println("Bottom: " + bottom + " (" + bottomAvg + ")");
    }
}`,
    },
  },

  // ── TOPIC 12: Optional ────────────────────────────────────────────────────────
  {
    id: 'java-optional',
    category: 'Java Advanced',
    title: 'Optional — Null-Safe Code',
    difficulty: 'Intermediate',
    theory: [
      'Optional<T> (java.util.Optional) is a container that may or may not hold a non-null value. It was introduced in Java 8 to make null-handling explicit and reduce NullPointerExceptions.',
      'Create with: Optional.of(value) (throws NPE if null), Optional.ofNullable(value) (safe, accepts null), Optional.empty() (no value).',
      'Key methods: isPresent(), isEmpty() (Java 11+), get() (throws if empty), orElse(default), orElseGet(supplier), orElseThrow(), ifPresent(consumer), map(), filter().',
      'Optional is best used as a return type for methods that might not find a result — never use it as a field type or method parameter.',
    ],
    syntax: `Optional<String> opt = Optional.ofNullable(getValue());

opt.isPresent()               // true if value exists
opt.get()                     // get value (throws if empty)
opt.orElse("default")         // value or default
opt.orElseGet(() -> compute()) // value or lazy default
opt.orElseThrow()             // value or NoSuchElementException
opt.ifPresent(v -> use(v))    // run if present
opt.map(String::toUpperCase)  // transform if present`,
    code: `import java.util.*;

public class OptionalDemo {

    // Returns Optional - may or may not find a user
    static Optional<String> findUserById(int id) {
        Map<Integer, String> users = Map.of(1, "Alice", 2, "Bob", 3, "Charlie");
        return Optional.ofNullable(users.get(id));
    }

    static Optional<Integer> parseAge(String input) {
        try {
            return Optional.of(Integer.parseInt(input));
        } catch (NumberFormatException e) {
            return Optional.empty();
        }
    }

    public static void main(String[] args) {
        // orElse
        String user1 = findUserById(1).orElse("Unknown");
        String user99 = findUserById(99).orElse("Unknown");
        System.out.println("User 1: " + user1);
        System.out.println("User 99: " + user99);

        // ifPresent
        findUserById(2).ifPresent(name ->
            System.out.println("Found: " + name.toUpperCase()));

        // map — transform if present
        Optional<Integer> nameLength = findUserById(3)
            .map(String::length);
        System.out.println("Name length: " + nameLength.orElse(0));

        // filter
        Optional<String> longName = findUserById(3)
            .filter(name -> name.length() > 5);
        System.out.println("Long name: " + longName.orElse("Name too short"));

        // orElseThrow
        try {
            String missing = findUserById(99).orElseThrow(
                () -> new RuntimeException("User not found"));
        } catch (RuntimeException e) {
            System.out.println("Caught: " + e.getMessage());
        }

        // Chaining
        String[] inputs = {"25", "abc", "30"};
        for (String input : inputs) {
            String result = parseAge(input)
                .filter(age -> age >= 18)
                .map(age -> "Adult (age " + age + ")")
                .orElse("Invalid or minor");
            System.out.println(input + " -> " + result);
        }
    }
}`,
    output: `User 1: Alice
User 99: Unknown
Found: BOB
Name length: 7
Long name: Charlie
Caught: User not found
25 -> Adult (age 25)
abc -> Invalid or minor
30 -> Adult (age 30)`,
    notes: [
      'Never call get() without first checking isPresent() — it throws NoSuchElementException on empty Optional.',
      'Optional is designed as a return type only. Avoid Optional<T> fields (serialization issues) and Optional<T> parameters (just use null checks instead).',
      'orElseGet(() -> expensiveCall()) is lazy — the supplier runs only if the Optional is empty. orElse(expensiveCall()) always evaluates the argument.',
      'Streams return Optional from findFirst(), findAny(), max(), min(), reduce() — these naturally integrate with Optional chaining.',
    ],
    practice: {
      title: 'Safe Config Reader',
      description: 'Create a method getConfig(String key) that looks up a Map<String,String> and returns Optional<String>. Write helper methods: getPort() that parses the "port" config as Optional<Integer>, isDebugMode() returning Optional<Boolean>. Use orElse for defaults. Test with both present and missing keys.',
      startCode: '',
      hint: 'getConfig returns Optional.ofNullable(map.get(key)). getPort() chains: getConfig("port").map(Integer::parseInt). Handle NumberFormatException with a try-catch inside the map lambda or use a separate parseIntSafe helper.',
      solution: `import java.util.*;
public class ConfigReader {
    static Map<String,String> config = Map.of("port","8080","debug","true","host","localhost");
    static Optional<String> getConfig(String key) { return Optional.ofNullable(config.get(key)); }
    static Optional<Integer> getPort() {
        return getConfig("port").map(v -> { try { return Integer.parseInt(v); } catch(Exception e){ return null; } });
    }
    static Optional<Boolean> isDebugMode() { return getConfig("debug").map(Boolean::parseBoolean); }
    public static void main(String[] args) {
        System.out.println("host: " + getConfig("host").orElse("localhost"));
        System.out.println("port: " + getPort().orElse(80));
        System.out.println("debug: " + isDebugMode().orElse(false));
        System.out.println("timeout: " + getConfig("timeout").orElse("30s"));
    }
}`,
    },
  },

  // ── TOPIC 13: Recursion ───────────────────────────────────────────────────────
  {
    id: 'java-recursion',
    category: 'Algorithms',
    title: 'Recursion',
    difficulty: 'Intermediate',
    theory: [
      'Recursion is a technique where a method calls itself to solve a smaller version of the same problem. Every recursive solution has: a base case (stops recursion) and a recursive case (reduces the problem).',
      'The call stack stores each method invocation. Deep recursion can cause StackOverflowError. Iterative solutions use O(1) stack space; recursion uses O(n).',
      'Many problems have elegant recursive solutions: factorial, Fibonacci, tree traversal, merge sort, binary search, Tower of Hanoi.',
      'Memoization (caching results of sub-problems) converts naive exponential recursion to linear time — critical for Fibonacci and similar problems.',
    ],
    syntax: `// Pattern: base case + recursive case
returnType method(params) {
    if (baseCase) return baseResult;    // STOP
    return method(smallerProblem);      // RECURSE
}

// Factorial
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
    code: `import java.util.*;

public class RecursionDemo {

    // 1. Factorial
    static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    // 2. Fibonacci (naive)
    static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }

    // 3. Fibonacci with memoization
    static Map<Integer, Long> memo = new HashMap<>();
    static long fibMemo(int n) {
        if (n <= 1) return n;
        if (memo.containsKey(n)) return memo.get(n);
        long result = fibMemo(n - 1) + fibMemo(n - 2);
        memo.put(n, result);
        return result;
    }

    // 4. Sum of digits
    static int sumDigits(int n) {
        if (n < 10) return n;
        return n % 10 + sumDigits(n / 10);
    }

    // 5. Power (fast)
    static long power(long base, int exp) {
        if (exp == 0) return 1;
        if (exp % 2 == 0) {
            long half = power(base, exp / 2);
            return half * half;
        }
        return base * power(base, exp - 1);
    }

    // 6. Tower of Hanoi
    static void hanoi(int n, char from, char to, char aux) {
        if (n == 1) {
            System.out.println("Move disk 1 from " + from + " to " + to);
            return;
        }
        hanoi(n - 1, from, aux, to);
        System.out.println("Move disk " + n + " from " + from + " to " + to);
        hanoi(n - 1, aux, to, from);
    }

    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));
        System.out.println("10! = " + factorial(10));

        System.out.print("Fibonacci(0-9): ");
        for (int i = 0; i < 10; i++) System.out.print(fib(i) + " ");
        System.out.println();

        System.out.println("Fib(50) memoized: " + fibMemo(50));

        System.out.println("sumDigits(12345) = " + sumDigits(12345));
        System.out.println("2^10 = " + power(2, 10));

        System.out.println("\nTower of Hanoi (3 disks):");
        hanoi(3, 'A', 'C', 'B');
    }
}`,
    output: `5! = 120
10! = 3628800
Fibonacci(0-9): 0 1 1 2 3 5 8 13 21 34
Fib(50) memoized: 12586269025
sumDigits(12345) = 15
2^10 = 1024

Tower of Hanoi (3 disks):
Move disk 1 from A to C
Move disk 2 from A to B
Move disk 1 from C to B
Move disk 3 from A to C
Move disk 1 from B to A
Move disk 2 from B to C
Move disk 1 from A to C`,
    notes: [
      'Always define your base case first — missing or wrong base cases cause infinite recursion and StackOverflowError.',
      'Naive Fibonacci is O(2^n). With memoization it becomes O(n). Always memoize overlapping sub-problems.',
      'Recursion is natural for tree structures, divide-and-conquer algorithms, and anything defined self-referentially.',
      'For very deep recursion (n > ~10,000 in Java), consider converting to an iterative solution using an explicit stack.',
    ],
    practice: {
      title: 'Recursive Array Operations',
      description: 'Write recursive methods: (1) sum(int[] arr, int index) — sum all elements from index to end; (2) countEvens(int[] arr, int index) — count even numbers; (3) reverseString(String s) — reverse a string recursively. Test each with sample data.',
      startCode: '',
      hint: 'Base case for array: if index >= arr.length return 0. For reverseString: if s.isEmpty() return s, else reverseString(s.substring(1)) + s.charAt(0).',
      solution: `public class RecursivePractice {
    static int sum(int[] arr, int i) { return i>=arr.length ? 0 : arr[i]+sum(arr,i+1); }
    static int countEvens(int[] arr, int i) { return i>=arr.length ? 0 : (arr[i]%2==0?1:0)+countEvens(arr,i+1); }
    static String reverseString(String s) { return s.isEmpty() ? s : reverseString(s.substring(1))+s.charAt(0); }
    public static void main(String[] args) {
        int[] arr = {1,2,3,4,5,6};
        System.out.println("Sum: " + sum(arr,0));
        System.out.println("Even count: " + countEvens(arr,0));
        System.out.println("Reversed: " + reverseString("hello"));
    }
}`,
    },
  },

  // ── TOPIC 14: Sorting Algorithms ──────────────────────────────────────────────
  {
    id: 'java-sorting-algorithms',
    category: 'Algorithms',
    title: 'Sorting Algorithms',
    difficulty: 'Intermediate',
    theory: [
      'Bubble Sort: repeatedly swaps adjacent elements if in wrong order. O(n²) time, O(1) space. Simple but slow — good for teaching, not production.',
      'Selection Sort: finds the minimum element and places it at the front repeatedly. O(n²) time, O(1) space. Makes fewer swaps than bubble sort.',
      'Insertion Sort: builds a sorted portion one element at a time (like sorting playing cards). O(n²) worst, O(n) best (nearly sorted). Efficient for small/nearly-sorted data.',
      'Merge Sort: divide-and-conquer — split into halves, sort each, merge. O(n log n) time, O(n) space. Stable and efficient.',
    ],
    syntax: `// Bubble Sort
for (int i = 0; i < n-1; i++)
    for (int j = 0; j < n-1-i; j++)
        if (arr[j] > arr[j+1]) swap(arr, j, j+1);

// Merge Sort
void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid+1, right);
        merge(arr, left, mid, right);
    }
}`,
    code: `import java.util.Arrays;

public class SortingAlgorithms {

    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n-1-i; j++) {
                if (arr[j] > arr[j+1]) {
                    int tmp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = tmp;
                    swapped = true;
                }
            }
            if (!swapped) break; // already sorted
        }
    }

    static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i], j = i - 1;
            while (j >= 0 && arr[j] > key) { arr[j+1] = arr[j]; j--; }
            arr[j+1] = key;
        }
    }

    static void mergeSort(int[] arr, int left, int right) {
        if (left >= right) return;
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid+1, right);
        merge(arr, left, mid, right);
    }

    static void merge(int[] arr, int l, int m, int r) {
        int[] left  = Arrays.copyOfRange(arr, l, m+1);
        int[] right = Arrays.copyOfRange(arr, m+1, r+1);
        int i = 0, j = 0, k = l;
        while (i < left.length && j < right.length)
            arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
        while (i < left.length)  arr[k++] = left[i++];
        while (j < right.length) arr[k++] = right[j++];
    }

    public static void main(String[] args) {
        int[] data = {64, 34, 25, 12, 22, 11, 90};

        int[] arr1 = data.clone();
        bubbleSort(arr1);
        System.out.println("Bubble Sort:    " + Arrays.toString(arr1));

        int[] arr2 = data.clone();
        insertionSort(arr2);
        System.out.println("Insertion Sort: " + Arrays.toString(arr2));

        int[] arr3 = data.clone();
        mergeSort(arr3, 0, arr3.length - 1);
        System.out.println("Merge Sort:     " + Arrays.toString(arr3));

        // Built-in sort (TimSort — O(n log n))
        int[] arr4 = data.clone();
        Arrays.sort(arr4);
        System.out.println("Arrays.sort():  " + Arrays.toString(arr4));
    }
}`,
    output: `Bubble Sort:    [11, 12, 22, 25, 34, 64, 90]
Insertion Sort: [11, 12, 22, 25, 34, 64, 90]
Merge Sort:     [11, 12, 22, 25, 34, 64, 90]
Arrays.sort():  [11, 12, 22, 25, 34, 64, 90]`,
    notes: [
      'In production, always use Arrays.sort() or Collections.sort() — they use TimSort (O(n log n), stable, optimised for real-world data).',
      'Bubble Sort with the "swapped" early exit is O(n) for already-sorted arrays — a useful optimisation.',
      'Merge Sort is stable (preserves order of equal elements). Quick Sort is not stable but is O(n log n) average.',
      'Insertion Sort is excellent for nearly-sorted arrays and small arrays (n < 20). TimSort uses Insertion Sort for small subarrays.',
    ],
    practice: {
      title: 'Selection Sort Implementation',
      description: 'Implement Selection Sort: find the minimum element in the unsorted portion and swap it to the front. Sort the array {38, 27, 43, 3, 9, 82, 10} and print the array after each pass.',
      startCode: '',
      hint: 'Outer loop i from 0 to n-2. Inner loop j from i+1 to n-1, track minIndex. After inner loop, swap arr[i] with arr[minIndex].',
      solution: `import java.util.Arrays;
public class SelectionSort {
    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        int n = arr.length;
        for (int i = 0; i < n-1; i++) {
            int minIdx = i;
            for (int j = i+1; j < n; j++) if (arr[j] < arr[minIdx]) minIdx = j;
            int tmp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = tmp;
            System.out.println("Pass " + (i+1) + ": " + Arrays.toString(arr));
        }
    }
}`,
    },
  },

  // ── TOPIC 15: Binary Search ───────────────────────────────────────────────────
  {
    id: 'java-binary-search',
    category: 'Algorithms',
    title: 'Binary Search',
    difficulty: 'Intermediate',
    theory: [
      'Binary search finds an element in a sorted array in O(log n) time by repeatedly halving the search space. Compare the middle element with the target: if equal, found; if target is smaller, search left half; if larger, search right half.',
      'Precondition: the array MUST be sorted. Binary search on an unsorted array produces incorrect results.',
      'Iterative and recursive implementations both achieve O(log n) time. Iterative uses O(1) space; recursive uses O(log n) stack space.',
      'Java provides Arrays.binarySearch(arr, target) and Collections.binarySearch(list, target) for sorted arrays and lists.',
    ],
    syntax: `// Iterative binary search
int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;  // avoids overflow
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1; // not found
}`,
    code: `import java.util.Arrays;

public class BinarySearch {

    // Iterative
    static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }

    // Recursive
    static int binarySearchRecursive(int[] arr, int target, int left, int right) {
        if (left > right) return -1;
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) return binarySearchRecursive(arr, target, mid+1, right);
        return binarySearchRecursive(arr, target, left, mid-1);
    }

    // Find first occurrence (left boundary)
    static int firstOccurrence(int[] arr, int target) {
        int left = 0, right = arr.length - 1, result = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) { result = mid; right = mid - 1; }
            else if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return result;
    }

    public static void main(String[] args) {
        int[] arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("Search 23: index " + binarySearch(arr, 23));
        System.out.println("Search 91: index " + binarySearch(arr, 91));
        System.out.println("Search 2:  index " + binarySearch(arr, 2));
        System.out.println("Search 99: index " + binarySearch(arr, 99));

        System.out.println("Recursive 56: index " +
            binarySearchRecursive(arr, 56, 0, arr.length-1));

        // Built-in
        System.out.println("Arrays.binarySearch(38): " + Arrays.binarySearch(arr, 38));

        // First occurrence in array with duplicates
        int[] dup = {1, 2, 2, 2, 3, 4, 4, 5};
        System.out.println("\nDuplicates: " + Arrays.toString(dup));
        System.out.println("First occurrence of 2: index " + firstOccurrence(dup, 2));
        System.out.println("First occurrence of 4: index " + firstOccurrence(dup, 4));
    }
}`,
    output: `Array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
Search 23: index 5
Search 91: index 9
Search 2:  index 0
Search 99: index -1
Recursive 56: index 7
Arrays.binarySearch(38): 6

Duplicates: [1, 2, 2, 2, 3, 4, 4, 5]
First occurrence of 2: index 1
First occurrence of 4: index 5`,
    notes: [
      'Use mid = left + (right - left) / 2 instead of (left + right) / 2 to prevent integer overflow for large arrays.',
      'Arrays.binarySearch() returns a negative value (-(insertion point) - 1) when the element is not found — not just -1.',
      'Binary search requires the array to be sorted. Sorting takes O(n log n), so binary search is only worth it for multiple searches.',
      'Binary search can be adapted for many problems: finding insertion point, first/last occurrence, search in rotated array.',
    ],
    practice: {
      title: 'Search Variations',
      description: 'Given the sorted array {1, 3, 5, 7, 9, 11, 13, 15, 17, 19}: (1) find the index of 11; (2) return the index where 10 would be inserted to keep the array sorted (lower bound); (3) count how many elements are less than or equal to 13.',
      startCode: '',
      hint: 'For insertion point: when element not found, left gives the insertion index. For count <= target: use upper bound binary search.',
      solution: `public class BinarySearchVariants {
    static int search(int[] arr, int t) {
        int l=0,r=arr.length-1;
        while(l<=r){int m=l+(r-l)/2; if(arr[m]==t)return m; if(arr[m]<t)l=m+1; else r=m-1;}
        return -1;
    }
    static int lowerBound(int[] arr, int t) {
        int l=0,r=arr.length;
        while(l<r){int m=l+(r-l)/2; if(arr[m]<t)l=m+1; else r=m;}
        return l;
    }
    static int countLeq(int[] arr, int t) {
        int l=0,r=arr.length;
        while(l<r){int m=l+(r-l)/2; if(arr[m]<=t)l=m+1; else r=m;}
        return l;
    }
    public static void main(String[] args) {
        int[] arr = {1,3,5,7,9,11,13,15,17,19};
        System.out.println("Index of 11: " + search(arr, 11));
        System.out.println("Insert position for 10: " + lowerBound(arr, 10));
        System.out.println("Count <= 13: " + countLeq(arr, 13));
    }
}`,
    },
  },

  // ── TOPIC 16: 2D Arrays ───────────────────────────────────────────────────────
  {
    id: 'java-2d-arrays',
    category: 'Arrays & Methods',
    title: '2D Arrays & Matrix Operations',
    difficulty: 'Intermediate',
    theory: [
      'A 2D array in Java is an array of arrays. Declare with: int[][] matrix = new int[rows][cols]; or using an initialiser: int[][] m = {{1,2},{3,4}};',
      'Access elements with two indices: matrix[row][col]. Rows and columns are zero-indexed.',
      'Iterate with nested loops: outer loop over rows (i), inner loop over columns (j). matrix.length gives the number of rows; matrix[0].length gives the number of columns.',
      'Java supports jagged arrays (rows of different lengths) since each row is a separate array object.',
    ],
    syntax: `// Declaration
int[][] matrix = new int[3][4];   // 3 rows, 4 cols
int[][] grid   = {{1,2,3},{4,5,6},{7,8,9}};

// Access
int val = grid[1][2];  // row 1, col 2 = 6

// Iterate
for (int i = 0; i < matrix.length; i++)
    for (int j = 0; j < matrix[i].length; j++)
        matrix[i][j] = i * matrix[i].length + j;`,
    code: `import java.util.Arrays;

public class Matrix2D {

    static void print(int[][] m) {
        for (int[] row : m) System.out.println(Arrays.toString(row));
    }

    static int[][] multiply(int[][] A, int[][] B) {
        int n = A.length, m = B[0].length, k = B.length;
        int[][] C = new int[n][m];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                for (int p = 0; p < k; p++)
                    C[i][j] += A[i][p] * B[p][j];
        return C;
    }

    static int[][] transpose(int[][] m) {
        int rows = m.length, cols = m[0].length;
        int[][] t = new int[cols][rows];
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                t[j][i] = m[i][j];
        return t;
    }

    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        System.out.println("Original matrix:");
        print(matrix);

        // Sum of diagonal
        int diagSum = 0;
        for (int i = 0; i < matrix.length; i++) diagSum += matrix[i][i];
        System.out.println("Diagonal sum: " + diagSum);

        // Row sums
        System.out.print("Row sums: ");
        for (int[] row : matrix) {
            int sum = 0;
            for (int v : row) sum += v;
            System.out.print(sum + " ");
        }
        System.out.println();

        // Transpose
        System.out.println("\\nTranspose:");
        print(transpose(matrix));

        // Matrix multiplication
        int[][] A = {{1,2},{3,4}};
        int[][] B = {{5,6},{7,8}};
        System.out.println("\\nA * B:");
        print(multiply(A, B));

        // Search in sorted 2D matrix
        int[][] sorted = {{1,3,5},{7,9,11},{13,15,17}};
        int target = 9;
        boolean found = false;
        outer:
        for (int[] row : sorted)
            for (int v : row)
                if (v == target) { found = true; break outer; }
        System.out.println("\\nFound " + target + ": " + found);
    }
}`,
    output: `Original matrix:
[1, 2, 3]
[4, 5, 6]
[7, 8, 9]
Diagonal sum: 15
Row sums: 6 15 24

Transpose:
[1, 4, 7]
[2, 5, 8]
[3, 6, 9]

A * B:
[19, 22]
[43, 50]

Found 9: true`,
    notes: [
      'matrix.length gives rows; matrix[0].length gives columns (assuming uniform rows).',
      'Use Arrays.deepToString(matrix) to print a 2D array as a string.',
      'For large matrix operations, consider libraries like Apache Commons Math or EJML.',
      'Java initialises numeric 2D arrays to 0 automatically — no manual fill needed for zero matrices.',
    ],
    practice: {
      title: 'Spiral Matrix',
      description: 'Given a 4x4 matrix filled with numbers 1-16, print all elements in spiral order (top row left-to-right, right column top-to-bottom, bottom row right-to-left, left column bottom-to-top, then inward).',
      startCode: '',
      hint: 'Use four pointers: top, bottom, left, right. Print top row, right col, bottom row (reversed), left col (reversed), then shrink the boundaries inward.',
      solution: `public class SpiralMatrix {
    public static void main(String[] args) {
        int[][] m = {{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}};
        int top=0,bottom=m.length-1,left=0,right=m[0].length-1;
        System.out.print("Spiral: ");
        while(top<=bottom && left<=right){
            for(int i=left;i<=right;i++) System.out.print(m[top][i]+" "); top++;
            for(int i=top;i<=bottom;i++) System.out.print(m[i][right]+" "); right--;
            if(top<=bottom){for(int i=right;i>=left;i--) System.out.print(m[bottom][i]+" "); bottom--;}
            if(left<=right){for(int i=bottom;i>=top;i--) System.out.print(m[i][left]+" "); left++;}
        }
        System.out.println();
    }
}`,
    },
  },

  // ── TOPIC 17: Varargs ─────────────────────────────────────────────────────────
  {
    id: 'java-varargs',
    category: 'Java Fundamentals',
    title: 'Varargs & Variable Arguments',
    difficulty: 'Intermediate',
    theory: [
      'Varargs (variable arguments) allow a method to accept any number of arguments of a specified type. Declared with three dots: type... paramName.',
      'Inside the method, varargs are treated as an array. You can iterate over them, check length, and use array methods.',
      'A method can only have one varargs parameter, and it must be the last parameter.',
      'You can call a varargs method with zero arguments, individual arguments, or pass an array directly.',
    ],
    syntax: `// Varargs declaration
void printAll(String... items) {
    for (String item : items) System.out.println(item);
}

// Calling with varargs
printAll();                        // 0 args
printAll("Hello");                 // 1 arg
printAll("a", "b", "c");          // 3 args
printAll(new String[]{"x","y"});   // array`,
    code: `public class VarargsDemo {

    // Sum any number of ints
    static int sum(int... nums) {
        int total = 0;
        for (int n : nums) total += n;
        return total;
    }

    // Max of any number of doubles
    static double max(double first, double... rest) {
        double max = first;
        for (double d : rest) if (d > max) max = d;
        return max;
    }

    // Format message with any number of args (like printf)
    static String format(String template, Object... args) {
        String result = template;
        for (int i = 0; i < args.length; i++) {
            result = result.replace("{" + i + "}", String.valueOf(args[i]));
        }
        return result;
    }

    // Log with level + any messages
    static void log(String level, String... messages) {
        for (String msg : messages) {
            System.out.println("[" + level + "] " + msg);
        }
    }

    public static void main(String[] args) {
        System.out.println("sum()          = " + sum());
        System.out.println("sum(5)         = " + sum(5));
        System.out.println("sum(1,2,3)     = " + sum(1, 2, 3));
        System.out.println("sum(1..5)      = " + sum(1, 2, 3, 4, 5));

        System.out.println("max(3,1,4,1,5) = " + max(3, 1, 4, 1, 5));
        System.out.println("max(9.5, 7.2)  = " + max(9.5, 7.2));

        System.out.println(format("Hello {0}, you are {1} years old!", "Alice", 25));
        System.out.println(format("Score: {0}/{1} = {2}%", 45, 50, 90));

        log("INFO", "Server started", "Listening on port 8080");
        log("ERROR", "Connection failed");
    }
}`,
    output: `sum()          = 0
sum(5)         = 5
sum(1,2,3)     = 6
sum(1..5)      = 15
max(3,1,4,1,5) = 5.0
max(9.5, 7.2)  = 9.5
Hello Alice, you are 25 years old!
Score: 45/50 = 90%
[INFO] Server started
[INFO] Listening on port 8080
[ERROR] Connection failed`,
    notes: [
      'Varargs parameter must be last: void method(int x, String... tags) is valid; void method(String... tags, int x) is not.',
      'A varargs method can be called with an explicit array: sum(new int[]{1,2,3}) works.',
      'Avoid overloading a varargs method with another version that could match — ambiguous calls cause compile errors.',
      'System.out.printf and String.format use varargs internally: printf(String format, Object... args).',
    ],
    practice: {
      title: 'Statistics Utility',
      description: 'Write a class MathUtils with static varargs methods: average(double... nums), min(double... nums), max(double... nums), and range(double... nums) (max-min). Test each with different numbers of arguments.',
      startCode: '',
      hint: 'For average: sum all and divide by nums.length. Guard against empty arrays with an if check. For min/max, initialise with the first element.',
      solution: `public class MathUtils {
    static double average(double... nums) {
        if(nums.length==0)return 0;
        double s=0; for(double n:nums)s+=n; return s/nums.length;
    }
    static double min(double... nums) {
        double m=nums[0]; for(double n:nums)if(n<m)m=n; return m;
    }
    static double max(double... nums) {
        double m=nums[0]; for(double n:nums)if(n>m)m=n; return m;
    }
    static double range(double... nums) { return max(nums)-min(nums); }
    public static void main(String[] args) {
        System.out.printf("avg=%.2f%n",average(10,20,30,40,50));
        System.out.println("min="+min(5,3,8,1,9));
        System.out.println("max="+max(5,3,8,1,9));
        System.out.println("range="+range(5,3,8,1,9));
    }
}`,
    },
  },

  // ── TOPIC 18: Regular Expressions ────────────────────────────────────────────
  {
    id: 'java-regex',
    category: 'Java Advanced',
    title: 'Regular Expressions',
    difficulty: 'Advanced',
    theory: [
      'Regular expressions (regex) are patterns for matching, searching, and manipulating text. Java provides them through java.util.regex (Pattern, Matcher) and String methods.',
      'Common patterns: \\d (digit), \\w (word char), \\s (whitespace), . (any char), * (0+), + (1+), ? (0 or 1), {n} (exactly n), {n,m} (n to m), ^ (start), $ (end), [] (character class), | (or), () (group).',
      'Pattern.compile() compiles the regex (expensive — cache it). Matcher checks the pattern against input: matches() (full match), find() (substring match), group() (captured group).',
      'String shortcuts: s.matches(regex), s.replaceAll(regex, replacement), s.split(regex) — these create a new Pattern each call, so use Pattern.compile() in loops.',
    ],
    syntax: `import java.util.regex.*;

Pattern p = Pattern.compile("\\\\d{3}-\\\\d{4}");
Matcher m = p.matcher("Call 555-1234 now");
while (m.find()) {
    System.out.println("Found: " + m.group()); // 555-1234
}

// String shortcuts
"hello123".matches("[a-z]+\\\\d+");  // true
"a1b2c3".replaceAll("\\\\d", "X");  // "aXbXcX"
"a,b,,c".split(",+");               // ["a","b","c"]`,
    code: `import java.util.regex.*;
import java.util.*;

public class RegexDemo {

    static boolean isValidEmail(String email) {
        return email.matches("[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}");
    }

    static boolean isValidPhone(String phone) {
        return phone.matches("(\\+91[\\-\\s]?)?[789]\\d{9}");
    }

    static List<String> extractNumbers(String text) {
        List<String> numbers = new ArrayList<>();
        Matcher m = Pattern.compile("\\d+(\\.\\d+)?").matcher(text);
        while (m.find()) numbers.add(m.group());
        return numbers;
    }

    public static void main(String[] args) {
        // Email validation
        String[] emails = {"user@example.com", "bad@", "test.name+tag@domain.co.in", "no-at-sign"};
        System.out.println("=== Email Validation ===");
        for (String e : emails)
            System.out.println(e + ": " + (isValidEmail(e) ? "VALID" : "INVALID"));

        // Phone validation
        System.out.println("\n=== Phone Validation ===");
        String[] phones = {"+919876543210", "9876543210", "12345", "+91-9876543210"};
        for (String p : phones)
            System.out.println(p + ": " + (isValidPhone(p) ? "VALID" : "INVALID"));

        // Extract numbers from text
        String text = "Price: $29.99, Qty: 3, Discount: 10.5%";
        System.out.println("\n=== Extract Numbers ===");
        System.out.println("From: \"" + text + "\"");
        System.out.println("Numbers: " + extractNumbers(text));

        // Replace and split
        String messy = "  Hello   World   Java  ";
        System.out.println("\nCleaned: '" + messy.trim().replaceAll("\\s+", " ") + "'");

        String csv = "apple, banana,,cherry,  date";
        String[] parts = csv.split(",\\s*");
        System.out.println("CSV parts: " + Arrays.toString(parts));

        // Groups: extract date parts
        String date = "2025-07-15";
        Matcher dm = Pattern.compile("(\\d{4})-(\\d{2})-(\\d{2})").matcher(date);
        if (dm.matches()) {
            System.out.println("\nYear: " + dm.group(1) + ", Month: " + dm.group(2) + ", Day: " + dm.group(3));
        }
    }
}`,
    output: `=== Email Validation ===
user@example.com: VALID
bad@: INVALID
test.name+tag@domain.co.in: VALID
no-at-sign: INVALID

=== Phone Validation ===
+919876543210: VALID
9876543210: VALID
12345: INVALID
+91-9876543210: VALID

=== Extract Numbers ===
From: "Price: $29.99, Qty: 3, Discount: 10.5%"
Numbers: [29.99, 3, 10.5]

Cleaned: 'Hello World Java'
CSV parts: [apple, banana, , cherry, date]

Year: 2025, Month: 07, Day: 15`,
    notes: [
      'In Java strings, use double backslash \\\\d for regex \\d because \\ is the Java string escape character.',
      'Compile Pattern once outside of loops: static final Pattern PATTERN = Pattern.compile(...).',
      'matches() checks the entire string; find() searches for the pattern anywhere in the string.',
      'Use named groups for readability: (?<year>\\\\d{4}) then matcher.group("year").',
    ],
    practice: {
      title: 'Input Validator',
      description: 'Write a validator class with methods: isValidUsername(String s) — 3-16 chars, only letters, digits, underscores; isValidPassword(String s) — at least 8 chars, at least one digit, one uppercase, one lowercase; isValidIPv4(String s) — four groups of 0-255 separated by dots.',
      startCode: '',
      hint: 'Username: ^[a-zA-Z0-9_]{3,16}$. Password needs lookaheads: (?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}. IPv4: each octet is (25[0-5]|2[0-4]\\d|[01]?\\d\\d?).',
      solution: `public class Validator {
    static boolean isValidUsername(String s){return s.matches("[a-zA-Z0-9_]{3,16}");}
    static boolean isValidPassword(String s){return s.matches("(?=.*[A-Z])(?=.*[a-z])(?=.*\\\\d).{8,}");}
    static boolean isValidIPv4(String s){
        return s.matches("((25[0-5]|2[0-4]\\\\d|[01]?\\\\d\\\\d?)\\\\.){3}(25[0-5]|2[0-4]\\\\d|[01]?\\\\d\\\\d?)");
    }
    public static void main(String[] args) {
        System.out.println(isValidUsername("alice_99"));   // true
        System.out.println(isValidUsername("a"));          // false
        System.out.println(isValidPassword("Secure1!"));   // true
        System.out.println(isValidPassword("weakpass"));   // false
        System.out.println(isValidIPv4("192.168.1.1"));    // true
        System.out.println(isValidIPv4("999.1.1.1"));      // false
    }
}`,
    },
  },

  // ── TOPIC 19: Date & Time API ─────────────────────────────────────────────────
  {
    id: 'java-datetime',
    category: 'Java Advanced',
    title: 'Date & Time API (java.time)',
    difficulty: 'Intermediate',
    theory: [
      'Java 8 introduced the java.time package — a modern, immutable, thread-safe date/time API. It replaces the old java.util.Date and Calendar classes which were error-prone.',
      'Key classes: LocalDate (date only, no time), LocalTime (time only), LocalDateTime (date + time), ZonedDateTime (with time zone), Duration (time-based), Period (date-based), Instant (Unix timestamp).',
      'All java.time objects are immutable — operations return new objects. Use DateTimeFormatter for parsing and formatting.',
      'Use LocalDate.now(), LocalTime.now(), LocalDateTime.now() to get current values. Use of() factory methods for specific values.',
    ],
    syntax: `LocalDate date = LocalDate.now();           // today
LocalDate specific = LocalDate.of(2025, 7, 15);
LocalTime time = LocalTime.of(14, 30, 0);
LocalDateTime dt = LocalDateTime.now();

date.plusDays(7);              // add 7 days
date.minusMonths(1);           // subtract 1 month
date.getDayOfWeek();           // MONDAY, TUESDAY...
date.isLeapYear();             // boolean

Duration.between(start, end).toHours();
Period.between(date1, date2).getDays();`,
    code: `import java.time.*;
import java.time.format.*;
import java.time.temporal.ChronoUnit;

public class DateTimeDemo {
    public static void main(String[] args) {
        // Current date/time
        LocalDate today = LocalDate.now();
        LocalTime now   = LocalTime.now();
        LocalDateTime dt = LocalDateTime.now();

        System.out.println("Today:    " + today);
        System.out.printf("Time:     %s%n", now.format(DateTimeFormatter.ofPattern("HH:mm:ss")));
        System.out.println("DateTime: " + dt.format(DateTimeFormatter.ofPattern("dd MMM yyyy HH:mm")));

        // Date arithmetic
        LocalDate nextWeek  = today.plusDays(7);
        LocalDate lastMonth = today.minusMonths(1);
        LocalDate birthday  = LocalDate.of(2000, 6, 15);

        System.out.println("\nNext week:  " + nextWeek);
        System.out.println("Last month: " + lastMonth);
        System.out.println("Day of week: " + today.getDayOfWeek());
        System.out.println("Is leap year: " + today.isLeapYear());

        // Age calculation
        Period age = Period.between(birthday, today);
        System.out.printf("Age: %d years, %d months, %d days%n",
            age.getYears(), age.getMonths(), age.getDays());

        // Days until next event
        LocalDate event = LocalDate.of(today.getYear(), 12, 31);
        long daysUntil = ChronoUnit.DAYS.between(today, event);
        System.out.println("Days until Dec 31: " + daysUntil);

        // Parsing
        LocalDate parsed = LocalDate.parse("2025-07-15");
        LocalDate formatted = LocalDate.parse("15/07/2025",
            DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        System.out.println("\nParsed ISO:   " + parsed);
        System.out.println("Parsed custom: " + formatted);

        // Time difference
        LocalTime start = LocalTime.of(9, 0);
        LocalTime end   = LocalTime.of(17, 30);
        Duration shift  = Duration.between(start, end);
        System.out.printf("Shift: %dh %dm%n", shift.toHours(), shift.toMinutesPart());
    }
}`,
    output: `Today:    2025-07-15
Time:     14:32:10
DateTime: 15 Jul 2025 14:32

Next week:  2025-07-22
Last month: 2025-06-15
Day of week: TUESDAY
Is leap year: false
Age: 25 years, 1 months, 0 days
Days until Dec 31: 169

Parsed ISO:   2025-07-15
Parsed custom: 2025-07-15
Shift: 8h 30m`,
    notes: [
      'All java.time objects are immutable — date.plusDays(7) does not change date; it returns a new object.',
      'Use DateTimeFormatter.ofPattern() for custom formats: "dd/MM/yyyy", "HH:mm:ss", "EEE, d MMM yyyy".',
      'ZonedDateTime handles time zones: ZonedDateTime.now(ZoneId.of("Asia/Kolkata")).',
      'Instant is for machine time (Unix epoch milliseconds). Use it for logging and timing, convert with Instant.toEpochMilli().',
    ],
    practice: {
      title: 'Meeting Scheduler',
      description: 'Write a program that: (1) creates a meeting on the next Monday from today; (2) adds a 90-minute duration to find the end time; (3) calculates how many days away it is; (4) formats it as "Monday, 21 Jul 2025 at 10:00 AM - 11:30 AM".',
      startCode: '',
      hint: 'Use today.with(java.time.temporal.TemporalAdjusters.next(DayOfWeek.MONDAY)). Add Duration.ofMinutes(90) to LocalTime. ChronoUnit.DAYS.between(today, meetingDate) for days away.',
      solution: `import java.time.*;
import java.time.format.*;
import java.time.temporal.*;
public class MeetingScheduler {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        LocalDate meeting = today.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
        LocalTime startTime = LocalTime.of(10, 0);
        LocalTime endTime = startTime.plusMinutes(90);
        long daysAway = ChronoUnit.DAYS.between(today, meeting);
        DateTimeFormatter dayFmt = DateTimeFormatter.ofPattern("EEEE, d MMM yyyy");
        DateTimeFormatter timeFmt = DateTimeFormatter.ofPattern("h:mm a");
        System.out.println(meeting.format(dayFmt) + " at " + startTime.format(timeFmt) + " - " + endTime.format(timeFmt));
        System.out.println("Days away: " + daysAway);
    }
}`,
    },
  },

  // ── TOPIC 20: Method References ───────────────────────────────────────────────
  {
    id: 'java-method-references',
    category: 'Java Advanced',
    title: 'Method References',
    difficulty: 'Advanced',
    theory: [
      'A method reference is a shorthand for a lambda expression that calls a single existing method. Syntax: ClassName::methodName or instance::methodName.',
      'Four types: (1) Static method: ClassName::staticMethod, (2) Instance method of a specific object: obj::method, (3) Instance method of an arbitrary instance: ClassName::instanceMethod, (4) Constructor reference: ClassName::new.',
      'Method references improve readability when a lambda does nothing but call a method: s -> s.toUpperCase() becomes String::toUpperCase.',
      'They work wherever a functional interface is expected — any context that accepts a lambda.',
    ],
    syntax: `// Lambda vs Method Reference
list.forEach(s -> System.out.println(s));  // lambda
list.forEach(System.out::println);          // method ref

list.stream().map(s -> s.toUpperCase())    // lambda
list.stream().map(String::toUpperCase)      // method ref (instance method)

Arrays.sort(arr, (a,b) -> Integer.compare(a,b));  // lambda
Arrays.sort(arr, Integer::compare);                // method ref (static)

// Constructor reference
List<String> list = Stream.of("a","b").collect(Collectors.toCollection(ArrayList::new));`,
    code: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

class Person {
    String name; int age;
    Person(String name, int age) { this.name = name; this.age = age; }
    String getName() { return name; }
    int getAge() { return age; }
    static int compareByAge(Person a, Person b) { return Integer.compare(a.age, b.age); }
    @Override public String toString() { return name + "(" + age + ")"; }
}

public class MethodRefDemo {

    static String shout(String s) { return s.toUpperCase() + "!"; }

    public static void main(String[] args) {
        List<String> words = Arrays.asList("hello", "world", "java", "streams");

        // Static method reference
        System.out.println("Static ref:");
        words.stream().map(MethodRefDemo::shout).forEach(System.out::println);

        // Instance method of arbitrary object
        System.out.println("\nTo uppercase:");
        words.stream().map(String::toUpperCase).forEach(System.out::println);

        // Instance method of specific object
        System.out.println("\nJoin with prefix:");
        String prefix = ">> ";
        words.stream().map(prefix::concat).forEach(System.out::println);

        // Constructor reference
        System.out.println("\nConstructor ref:");
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        List<Person> people = names.stream()
            .map(name -> new Person(name, name.length() * 3))
            .collect(Collectors.toList());
        System.out.println("People: " + people);

        // Sort with static method reference
        people.sort(Person::compareByAge);
        System.out.println("Sorted by age: " + people);

        // Predicate and Function references
        Predicate<String> isEmpty = String::isEmpty;
        Function<String, Integer> length = String::length;
        System.out.println("\nEmpty check: " + isEmpty.test(""));
        System.out.println("Length of 'hello': " + length.apply("hello"));
    }
}`,
    output: `Static ref:
HELLO!
WORLD!
JAVA!
STREAMS!

To uppercase:
HELLO
WORLD
JAVA
STREAMS

Join with prefix:
>> hello
>> world
>> java
>> streams

People: [Alice(15), Bob(9), Charlie(21)]
Sorted by age: [Bob(9), Alice(15), Charlie(21)]

Empty check: true
Length of 'hello': 5`,
    notes: [
      'Method references and lambdas are interchangeable — use whichever is more readable in context.',
      'System.out::println is the most common method reference — an instance method reference on the specific System.out object.',
      'Constructor references (ClassName::new) are particularly useful with Streams: stream.map(Person::new).',
      'Method references do not capture extra state — they are pure delegation to the referenced method.',
    ],
    practice: {
      title: 'Stream Pipeline with Method References',
      description: 'Given a list of strings {"java", "python", "JavaScript", "go", "TypeScript", "rust"}, use method references to: (1) convert all to uppercase; (2) filter strings with length > 4; (3) sort alphabetically; (4) print each with System.out.println. Chain into a single stream pipeline.',
      startCode: '',
      hint: 'String::toUpperCase for map, System.out::println for forEach. Filter uses a lambda s -> s.length() > 4 (no direct method ref here, but you can write a static helper).',
      solution: `import java.util.*;
import java.util.stream.*;
public class MethodRefPractice {
    static boolean longerThan4(String s) { return s.length() > 4; }
    public static void main(String[] args) {
        List<String> langs = Arrays.asList("java","python","JavaScript","go","TypeScript","rust");
        langs.stream()
            .map(String::toUpperCase)
            .filter(MethodRefPractice::longerThan4)
            .sorted()
            .forEach(System.out::println);
    }
}`,
    },
  },

  // ── TOPIC 21: Functional Interfaces ──────────────────────────────────────────
  {
    id: 'java-functional-interfaces',
    category: 'Java Advanced',
    title: 'Functional Interfaces',
    difficulty: 'Advanced',
    theory: [
      'A functional interface has exactly one abstract method. It can be implemented with a lambda expression or method reference. The @FunctionalInterface annotation is optional but recommended.',
      'Built-in functional interfaces (java.util.function): Predicate<T> (T -> boolean), Function<T,R> (T -> R), Consumer<T> (T -> void), Supplier<T> (() -> T), BiFunction<T,U,R> (T,U -> R), UnaryOperator<T> (T -> T).',
      'Predicate has and(), or(), negate() methods for composition. Function has andThen() and compose() for chaining transforms.',
      'Custom functional interfaces allow you to define domain-specific function types: @FunctionalInterface interface Validator<T> { boolean validate(T value); }',
    ],
    syntax: `@FunctionalInterface
interface Transformer<T> { T transform(T input); }

Predicate<Integer> isEven = n -> n % 2 == 0;
Function<String, Integer> length = String::length;
Consumer<String> print = System.out::println;
Supplier<String> greet = () -> "Hello!";
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

// Composition
Predicate<Integer> isEvenAndPositive = isEven.and(n -> n > 0);
Function<String, String> upper = String::toUpperCase;
Function<String, String> trim = String::trim;
Function<String, String> trimThenUpper = trim.andThen(upper);`,
    code: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class FunctionalInterfaceDemo {

    @FunctionalInterface
    interface Validator<T> {
        boolean validate(T value);
        default Validator<T> and(Validator<T> other) {
            return value -> this.validate(value) && other.validate(value);
        }
    }

    static <T> List<T> filterList(List<T> list, Predicate<T> predicate) {
        return list.stream().filter(predicate).collect(Collectors.toList());
    }

    static <T, R> List<R> transformList(List<T> list, Function<T, R> transform) {
        return list.stream().map(transform).collect(Collectors.toList());
    }

    public static void main(String[] args) {
        // Predicate composition
        Predicate<Integer> isPositive = n -> n > 0;
        Predicate<Integer> isEven     = n -> n % 2 == 0;
        Predicate<Integer> isEvenAndPositive = isPositive.and(isEven);
        Predicate<Integer> isEvenOrNeg = isEven.or(isPositive.negate());

        List<Integer> nums = Arrays.asList(-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6);
        System.out.println("Even & positive: " + filterList(nums, isEvenAndPositive));
        System.out.println("Even or negative: " + filterList(nums, isEvenOrNeg));

        // Function chaining
        Function<String, String> trim   = String::trim;
        Function<String, String> upper  = String::toUpperCase;
        Function<String, Integer> length = String::length;
        Function<String, String> process = trim.andThen(upper);

        List<String> names = Arrays.asList("  alice  ", "BOB", "  Charlie ");
        System.out.println("\nProcessed: " + transformList(names, process));
        System.out.println("Lengths:   " + transformList(names, trim.andThen(length)));

        // Consumer chaining
        Consumer<String> print  = System.out::println;
        Consumer<String> log    = s -> System.out.println("[LOG] " + s);
        Consumer<String> both   = print.andThen(log);
        System.out.println("\nConsumer chain:");
        both.accept("Test message");

        // Custom Validator composition
        Validator<String> notEmpty = s -> !s.isEmpty();
        Validator<String> notTooLong = s -> s.length() <= 10;
        Validator<String> usernameValidator = notEmpty.and(notTooLong);

        String[] usernames = {"", "alice", "this_username_is_way_too_long"};
        System.out.println("\nUsername validation:");
        for (String u : usernames)
            System.out.println("'" + u + "': " + usernameValidator.validate(u));

        // Supplier
        Supplier<List<String>> newList = ArrayList::new;
        List<String> list1 = newList.get();
        List<String> list2 = newList.get();
        list1.add("a"); list2.add("b");
        System.out.println("\nlist1=" + list1 + ", list2=" + list2);
    }
}`,
    output: `Even & positive: [2, 4, 6]
Even or negative: [-4, -3, -2, -1, 0, 2, 4, 6]

Processed: [ALICE, BOB, CHARLIE]
Lengths:   [5, 3, 7]

Consumer chain:
Test message
[LOG] Test message

Username validation:
'': false
'alice': true
'this_username_is_way_too_long': false

list1=[a], list2=[b]`,
    notes: [
      'Always annotate with @FunctionalInterface — the compiler will catch mistakes if you accidentally add a second abstract method.',
      'The built-in java.util.function interfaces cover most cases. Define custom ones only when the semantics need a meaningful name.',
      'BiFunction takes two inputs; BinaryOperator<T> is a shorthand for BiFunction<T,T,T> (both inputs and output are the same type).',
      'Predicate.not(Predicate) (Java 11+) is a static helper for negation: Predicate.not(String::isEmpty).',
    ],
    practice: {
      title: 'Data Pipeline',
      description: 'Build a generic pipeline that applies a list of Functions in sequence to a value. Create: Pipeline<T,R> class with a method pipe(Function<T,R>) that chains transforms. Test by building a String pipeline that: trims, converts to lowercase, replaces spaces with underscores, and appends "_v1".',
      startCode: '',
      hint: 'Store the composed Function<T,T> internally. pipe() uses andThen() to chain the new function. Use Function.identity() as the initial value.',
      solution: `import java.util.function.*;
class Pipeline<T> {
    private Function<T,T> fn;
    Pipeline(Function<T,T> fn) { this.fn = fn; }
    static <T> Pipeline<T> of(Function<T,T> fn) { return new Pipeline<>(fn); }
    Pipeline<T> pipe(Function<T,T> next) { return new Pipeline<>(fn.andThen(next)); }
    T execute(T input) { return fn.apply(input); }
}
public class FuncPractice {
    public static void main(String[] args) {
        Pipeline<String> pipeline = Pipeline.<String>of(String::trim)
            .pipe(String::toLowerCase)
            .pipe(s -> s.replace(' ', '_'))
            .pipe(s -> s + "_v1");
        System.out.println(pipeline.execute("  Hello World  "));
        System.out.println(pipeline.execute(" Java Streams "));
    }
}`,
    },
  },

  // ── TOPIC 22: var keyword ─────────────────────────────────────────────────────
  {
    id: 'java-var-keyword',
    category: 'Java Fundamentals',
    title: 'var — Local Variable Type Inference',
    difficulty: 'Beginner',
    theory: [
      'Java 10 introduced var for local variable type inference. The compiler infers the type from the initializer — you write less boilerplate without losing static typing.',
      'var is not a keyword in the traditional sense — it is a reserved type name. The type is determined at compile time and cannot change (still statically typed).',
      'var can only be used for local variables with an initializer. It cannot be used for fields, method parameters, return types, or variables initialized to null.',
      'Use var when the type is obvious from context (var list = new ArrayList<String>()) and avoid it when it hides important type information.',
    ],
    syntax: `// Instead of: ArrayList<String> list = new ArrayList<>();
var list = new ArrayList<String>();   // type inferred

// Instead of: Map.Entry<String, Integer> entry = ...
for (var entry : map.entrySet()) { ... }

// Works for any local variable
var count = 0;               // int
var price = 29.99;           // double
var name  = "Alice";         // String
var items = new int[]{1,2};  // int[]`,
    code: `import java.util.*;
import java.util.stream.*;

public class VarDemo {
    public static void main(String[] args) {
        // Basic type inference
        var count  = 42;
        var price  = 9.99;
        var name   = "Alice";
        var active = true;

        System.out.println("count  = " + count  + " (" + ((Object)count).getClass().getSimpleName() + ")");
        System.out.println("price  = " + price  + " (" + ((Object)price).getClass().getSimpleName() + ")");
        System.out.println("name   = " + name   + " (" + name.getClass().getSimpleName() + ")");
        System.out.println("active = " + active + " (" + ((Object)active).getClass().getSimpleName() + ")");

        // Collections
        var scores = new ArrayList<Integer>();
        scores.add(85); scores.add(92); scores.add(78);
        System.out.println("\nScores: " + scores);

        var studentMap = new HashMap<String, Integer>();
        studentMap.put("Alice", 95); studentMap.put("Bob", 82);

        // Enhanced for with var
        for (var entry : studentMap.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }

        // With streams
        var result = scores.stream()
            .filter(s -> s >= 80)
            .collect(Collectors.toList());
        System.out.println("High scores: " + result);

        // With arrays
        var numbers = new int[]{3, 1, 4, 1, 5, 9};
        System.out.println("Array length: " + numbers.length);

        // Try-with-resources
        var sb = new StringBuilder("Hello");
        sb.append(", World!");
        System.out.println(sb);
    }
}`,
    output: `count  = 42 (Integer)
price  = 9.99 (Double)
name   = Alice (String)
active = true (Boolean)

Scores: [85, 92, 78]
Alice -> 95
Bob -> 82
High scores: [85, 92]
Array length: 6
Hello, World!`,
    notes: [
      'var requires an initializer: var x; is invalid. var x = null; is also invalid (type cannot be inferred).',
      'var is only for local variables — not for fields, parameters, or return types.',
      'Do not overuse var when it hides a non-obvious type. var result = compute() is fine if compute() returns something clear from context.',
      'var works with diamond operator: var list = new ArrayList<String>() — always include the type in the constructor for clarity.',
    ],
    practice: {
      title: 'Refactor with var',
      description: 'Rewrite the following code using var where appropriate: create a HashMap<String, List<Integer>>, add three students with score lists, compute the average for each student using a stream, and print results. Use var for all local variable declarations.',
      startCode: '',
      hint: 'var map = new HashMap<String, List<Integer>>(). var avg = entry.getValue().stream().mapToInt(i->i).average().orElse(0). Use var in the for-each loop over entrySet().',
      solution: `import java.util.*;
import java.util.stream.*;
public class VarPractice {
    public static void main(String[] args) {
        var map = new HashMap<String, List<Integer>>();
        map.put("Alice", List.of(90,85,92));
        map.put("Bob", List.of(75,80,70));
        map.put("Carol", List.of(88,91,95));
        for (var entry : map.entrySet()) {
            var avg = entry.getValue().stream().mapToInt(i->i).average().orElse(0);
            System.out.printf("%s: avg=%.1f%n", entry.getKey(), avg);
        }
    }
}`,
    },
  },

  // ── TOPIC 23: Switch Expressions ──────────────────────────────────────────────
  {
    id: 'java-switch-expressions',
    category: 'Java Fundamentals',
    title: 'Switch Expressions (Java 14+)',
    difficulty: 'Intermediate',
    theory: [
      'Java 14 made switch expressions standard. Unlike old switch statements, switch expressions return a value and use arrow (->) syntax that does not fall through.',
      'Arrow case syntax: case value -> result; No break needed. Multiple labels per case: case 1, 2, 3 -> "low".',
      'For multi-line cases use blocks and yield: case X -> { ... yield value; }',
      'Traditional switch with colon syntax still works (and still falls through). The new arrow syntax is preferred for expressions.',
    ],
    syntax: `// Old style (statement, fall-through risk)
switch (day) {
    case MONDAY: result = "Start"; break;
    default: result = "Other";
}

// New style (expression, no fall-through)
String result = switch (day) {
    case MONDAY           -> "Start of week";
    case FRIDAY           -> "TGIF!";
    case SATURDAY, SUNDAY -> "Weekend";
    default               -> "Midweek";
};

// With yield (multi-line)
int value = switch (grade) {
    case "A" -> 4;
    case "B" -> { System.out.println("Good"); yield 3; }
    default  -> 0;
};`,
    code: `public class SwitchExpressions {

    enum Season { SPRING, SUMMER, AUTUMN, WINTER }

    static int numDays(int month, int year) {
        return switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11            -> 30;
            case 2 -> (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? 29 : 28;
            default -> throw new IllegalArgumentException("Invalid month: " + month);
        };
    }

    static String getActivity(Season season) {
        return switch (season) {
            case SPRING -> "Gardening";
            case SUMMER -> "Swimming";
            case AUTUMN -> "Hiking";
            case WINTER -> {
                String activity = "Skiing";
                yield "Indoor activities and " + activity;
            }
        };
    }

    static int letterGradeToGPA(String grade) {
        return switch (grade.toUpperCase()) {
            case "A+", "A"  -> 4;
            case "A-"       -> 3;
            case "B+", "B"  -> 3;
            case "B-"       -> 2;
            case "C"        -> 2;
            default         -> 0;
        };
    }

    public static void main(String[] args) {
        // Days in month
        int[] months = {1, 2, 4, 2};
        int[] years  = {2025, 2025, 2025, 2024};
        for (int i = 0; i < months.length; i++) {
            System.out.printf("Month %2d/%d: %d days%n", months[i], years[i], numDays(months[i], years[i]));
        }

        // Seasons
        System.out.println();
        for (Season s : Season.values()) {
            System.out.println(s + ": " + getActivity(s));
        }

        // GPA
        System.out.println();
        String[] grades = {"A+", "B", "C", "D"};
        for (String g : grades) {
            System.out.println("Grade " + g + " = GPA " + letterGradeToGPA(g));
        }
    }
}`,
    output: `Month  1/2025: 31 days
Month  2/2025: 28 days
Month  4/2025: 30 days
Month  2/2024: 29 days

SPRING: Gardening
SUMMER: Swimming
AUTUMN: Hiking
WINTER: Indoor activities and Skiing

Grade A+ = GPA 4
Grade B = GPA 3
Grade C = GPA 2
Grade D = GPA 0`,
    notes: [
      'Switch expressions with -> are exhaustive for enums — the compiler checks all cases are covered (no default needed if all enum values are listed).',
      'yield is only needed inside a block ({ ... }) in a switch expression. For single expressions, just write the value after ->.',
      'Switch expressions can throw exceptions as a case: case X -> throw new Exception(...);',
      'Old switch statements with : and break still work — mix is allowed but avoid it for clarity.',
    ],
    practice: {
      title: 'HTTP Status Classifier',
      description: 'Write a method classify(int statusCode) that uses a switch expression to return a category: 200-299 -> "Success", 300-399 -> "Redirect", 400-499 -> "Client Error", 500-599 -> "Server Error". Use integer division (code/100) and switch on the result.',
      startCode: '',
      hint: 'Switch on statusCode/100: case 2 -> "Success", case 3 -> "Redirect", etc.',
      solution: `public class HttpStatus {
    static String classify(int code) {
        return switch (code / 100) {
            case 2 -> "Success";
            case 3 -> "Redirect";
            case 4 -> "Client Error";
            case 5 -> "Server Error";
            default -> "Unknown";
        };
    }
    public static void main(String[] args) {
        int[] codes = {200, 201, 301, 302, 400, 404, 500, 503};
        for (int c : codes) System.out.println(c + " -> " + classify(c));
    }
}`,
    },
  },

  // ── TOPIC 24: Text Blocks ─────────────────────────────────────────────────────
  {
    id: 'java-text-blocks',
    category: 'Java Fundamentals',
    title: 'Text Blocks (Java 15+)',
    difficulty: 'Beginner',
    theory: [
      'Text blocks (Java 15+) are multi-line string literals surrounded by triple double-quotes """. They preserve formatting and eliminate the need for escape sequences.',
      'The opening """ must be followed by a newline. Indentation is automatically stripped based on the least-indented line (incidental whitespace removal).',
      'Text blocks support the same escape sequences as regular strings. Use \\n for explicit newlines, \\t for tabs. String.formatted() or formatted() works the same as String.format().',
      'Text blocks are ideal for: SQL queries, JSON/XML literals, HTML templates, and any multi-line string content.',
    ],
    syntax: `// Old way
String html = "<html>\\n" +
              "  <body>Hello</body>\\n" +
              "</html>";

// Text block
String html = """
        <html>
          <body>Hello</body>
        </html>
        """;

// With formatting
String json = """
        { "name": "%s", "age": %d }
        """.formatted(name, age);`,
    code: `public class TextBlocks {
    public static void main(String[] args) {
        // HTML template
        String name = "Alice";
        int score = 92;
        String html = """
                <!DOCTYPE html>
                <html>
                  <head><title>Report</title></head>
                  <body>
                    <h1>Student: %s</h1>
                    <p>Score: %d</p>
                  </body>
                </html>
                """.formatted(name, score);
        System.out.println("=== HTML ===");
        System.out.println(html);

        // JSON
        String json = """
                {
                  "student": {
                    "name": "%s",
                    "score": %d,
                    "grade": "%s"
                  }
                }
                """.formatted(name, score, score >= 90 ? "A" : "B");
        System.out.println("=== JSON ===");
        System.out.println(json);

        // SQL query
        String sql = """
                SELECT s.name, s.score, s.subject
                FROM students s
                WHERE s.score >= 80
                  AND s.subject = 'Maths'
                ORDER BY s.score DESC;
                """;
        System.out.println("=== SQL ===");
        System.out.println(sql);

        // Comparing old vs new
        String oldWay = "Line 1\nLine 2\nLine 3";
        String newWay = """
                Line 1
                Line 2
                Line 3""";
        System.out.println("Same content: " + oldWay.equals(newWay));
    }
}`,
    output: `=== HTML ===
<!DOCTYPE html>
<html>
  <head><title>Report</title></head>
  <body>
    <h1>Student: Alice</h1>
    <p>Score: 92</p>
  </body>
</html>

=== JSON ===
{
  "student": {
    "name": "Alice",
    "score": 92,
    "grade": "A"
  }
}

=== SQL ===
SELECT s.name, s.score, s.subject
FROM students s
WHERE s.score >= 80
  AND s.subject = 'Maths'
ORDER BY s.score DESC;

Same content: true`,
    notes: [
      'The closing """ position determines trailing newline: on its own line adds a newline; after content does not.',
      'Incidental indentation is removed based on the column of the closing """. Align closing """ at the left-most desired column.',
      'Text blocks are still String objects — all String methods work normally.',
      'Use \\s (space) escape at line end to prevent trimming of trailing spaces in text blocks.',
    ],
    practice: {
      title: 'Template Generator',
      description: 'Write a method generateEmailTemplate(String recipientName, String courseName, int score) that returns a formatted email body using a text block. The email should have a greeting, a message about the score, and a closing. Test with two different students.',
      startCode: '',
      hint: 'Use triple quotes and .formatted(recipientName, courseName, score) to inject values into the text block.',
      solution: `public class EmailTemplate {
    static String generateEmail(String recipient, String course, int score) {
        String grade = score>=90?"A":score>=80?"B":"C";
        return """
                Dear %s,

                Congratulations on completing the %s course!
                Your final score was %d/100, which earns you a grade of %s.

                %s

                Best regards,
                The Syllab Team
                """.formatted(recipient, course, score,
                    grade, score >= 80 ? "Keep up the excellent work!" : "We encourage you to review and retry.");
    }
    public static void main(String[] args) {
        System.out.println(generateEmail("Alice", "Java Fundamentals", 95));
        System.out.println(generateEmail("Bob", "Data Structures", 72));
    }
}`,
    },
  },

  // ── TOPIC 25: Records ─────────────────────────────────────────────────────────
  {
    id: 'java-records',
    category: 'Object-Oriented Programming',
    title: 'Records — Immutable Data Classes (Java 16+)',
    difficulty: 'Intermediate',
    theory: [
      'Records (Java 16+) are concise immutable data classes. A single record declaration automatically generates: constructor, private final fields, getters (accessor methods), equals(), hashCode(), and toString().',
      'Records are immutable — all fields are final and set at construction time. They are ideal for DTOs (Data Transfer Objects), value objects, and data carriers.',
      'Record components are accessed with component-name() methods (not getXxx()): for record Point(int x, int y), use point.x() and point.y().',
      'Records can have: compact constructors (for validation), additional methods, static fields, and can implement interfaces. They cannot extend classes (they implicitly extend Record).',
    ],
    syntax: `// Define a record
record Point(int x, int y) {}

// Automatically has:
// - public Point(int x, int y) constructor
// - public int x(), public int y() accessors
// - equals(), hashCode(), toString()

Point p = new Point(3, 4);
p.x();         // 3
p.y();         // 4
p.toString();  // "Point[x=3, y=4]"`,
    code: `import java.util.*;
import java.util.stream.*;

record Student(String name, int age, double gpa) {
    // Compact constructor for validation
    Student {
        if (age < 0 || age > 150) throw new IllegalArgumentException("Invalid age: " + age);
        if (gpa < 0.0 || gpa > 4.0) throw new IllegalArgumentException("Invalid GPA: " + gpa);
        name = name.trim();  // normalise name
    }

    // Additional method
    String letterGrade() {
        if (gpa >= 3.7) return "A";
        if (gpa >= 3.0) return "B";
        if (gpa >= 2.0) return "C";
        return "F";
    }

    boolean isHonours() { return gpa >= 3.5; }
}

record Point(double x, double y) {
    double distanceTo(Point other) {
        return Math.sqrt(Math.pow(x - other.x, 2) + Math.pow(y - other.y, 2));
    }
    static Point origin() { return new Point(0, 0); }
}

public class RecordsDemo {
    public static void main(String[] args) {
        var students = List.of(
            new Student("Alice", 20, 3.9),
            new Student("Bob",   22, 3.2),
            new Student("Carol", 21, 2.8),
            new Student("Dave",  23, 3.7)
        );

        // Auto-generated toString
        System.out.println(students.get(0));

        // Access components
        students.forEach(s -> System.out.printf("%-8s GPA=%.1f Grade=%s Honours=%b%n",
            s.name(), s.gpa(), s.letterGrade(), s.isHonours()));

        // Stream with records
        var honourStudents = students.stream()
            .filter(Student::isHonours)
            .sorted(Comparator.comparingDouble(Student::gpa).reversed())
            .map(Student::name)
            .collect(Collectors.toList());
        System.out.println("\nHonours: " + honourStudents);

        // equals and hashCode
        var p1 = new Point(3, 4);
        var p2 = new Point(3, 4);
        var p3 = new Point(0, 0);
        System.out.println("\np1.equals(p2): " + p1.equals(p2));
        System.out.printf("p1 to origin: %.2f%n", p1.distanceTo(Point.origin()));
    }
}`,
    output: `Student[name=Alice, age=20, gpa=3.9]
Alice    GPA=3.9 Grade=A Honours=true
Bob      GPA=3.2 Grade=B Honours=false
Carol    GPA=2.8 Grade=C Honours=false
Dave     GPA=3.7 Grade=A Honours=true

Honours: [Alice, Dave]

p1.equals(p2): true
p1 to origin: 5.00`,
    notes: [
      'Records are implicitly final — they cannot be extended. They also cannot extend other classes.',
      'The compact constructor (no parameter list) lets you validate and normalise inputs. It runs before field assignment.',
      'Records implement equals() based on all components — two records are equal if all their fields are equal.',
      'Records are a great replacement for simple POJOs/DTOs — they cut boilerplate drastically while remaining type-safe.',
    ],
    practice: {
      title: 'Product Catalog',
      description: 'Define a record Product(String name, String category, double price, int stock) with: a compact constructor that validates price > 0 and stock >= 0; a method isAvailable() returning stock > 0; a method discountedPrice(double percent) returning price * (1 - percent/100). Create 5 products and print those in stock, sorted by price.',
      startCode: '',
      hint: 'Compact constructor: if (price <= 0) throw new IllegalArgumentException(...). Filter with p.isAvailable(), sort with Comparator.comparingDouble(Product::price).',
      solution: `import java.util.*;
import java.util.stream.*;
record Product(String name, String category, double price, int stock) {
    Product { if(price<=0)throw new IllegalArgumentException("Price must be positive"); if(stock<0)throw new IllegalArgumentException("Stock cannot be negative"); }
    boolean isAvailable() { return stock > 0; }
    double discountedPrice(double percent) { return price * (1 - percent/100); }
}
public class ProductCatalog {
    public static void main(String[] args) {
        var products = List.of(
            new Product("Laptop","Electronics",45000,5),
            new Product("Phone","Electronics",25000,0),
            new Product("Pen","Stationery",10,500),
            new Product("Notebook","Stationery",120,200),
            new Product("Tablet","Electronics",18000,3));
        products.stream().filter(Product::isAvailable)
            .sorted(Comparator.comparingDouble(Product::price))
            .forEach(p->System.out.printf("%-12s $%.0f (stock:%d)%n",p.name(),p.price(),p.stock()));
    }
}`,
    },
  },

  // ── TOPIC 26: Pattern Matching & instanceof ────────────────────────────────────
  {
    id: 'java-pattern-matching',
    category: 'Java Advanced',
    title: 'Pattern Matching & instanceof (Java 16+)',
    difficulty: 'Intermediate',
    theory: [
      'Java 16 introduced pattern matching for instanceof. Instead of: if (obj instanceof String) { String s = (String) obj; ... } you write: if (obj instanceof String s) { ... }',
      'The pattern variable s is automatically cast and scoped to the block where the condition is true. This eliminates the explicit cast.',
      'Java 21 introduced sealed classes (classes that restrict which classes can extend them) and pattern matching in switch — powerful for exhaustive type handling.',
      'Pattern matching makes polymorphic type dispatch cleaner and safer — the compiler ensures all cases are handled.',
    ],
    syntax: `// Old way
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// Pattern matching (Java 16+)
if (obj instanceof String s) {
    System.out.println(s.length());  // s is String here
}

// In switch (Java 21)
String result = switch (obj) {
    case Integer i -> "int: " + i;
    case String s  -> "string: " + s.toUpperCase();
    case null      -> "null";
    default        -> "other";
};`,
    code: `public class PatternMatchingDemo {

    sealed interface Shape permits Circle, Rectangle, Triangle {}
    record Circle(double radius) implements Shape {}
    record Rectangle(double width, double height) implements Shape {}
    record Triangle(double base, double height) implements Shape {}

    static double area(Shape shape) {
        return switch (shape) {
            case Circle c     -> Math.PI * c.radius() * c.radius();
            case Rectangle r  -> r.width() * r.height();
            case Triangle t   -> 0.5 * t.base() * t.height();
        };
    }

    static String describe(Object obj) {
        return switch (obj) {
            case Integer i when i < 0  -> "Negative integer: " + i;
            case Integer i             -> "Positive integer: " + i;
            case String s when s.isEmpty() -> "Empty string";
            case String s              -> "String of length " + s.length() + ": " + s;
            case int[] arr             -> "int array of length " + arr.length;
            case null                  -> "null value";
            default                    -> "Unknown: " + obj.getClass().getSimpleName();
        };
    }

    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Triangle(3, 8)
        };

        System.out.println("=== Shape Areas ===");
        for (Shape s : shapes) {
            System.out.printf("%-30s area = %.2f%n", s, area(s));
        }

        System.out.println("\n=== Type Descriptions ===");
        Object[] objects = {42, -7, "Hello", "", new int[]{1,2,3}, null, 3.14};
        for (Object obj : objects) {
            System.out.println(describe(obj));
        }

        // Old vs new instanceof
        Object value = "Hello, World!";

        // Old style
        if (value instanceof String) {
            String s = (String) value;
            System.out.println("\nOld style length: " + s.length());
        }

        // New style
        if (value instanceof String s && s.length() > 5) {
            System.out.println("New style: " + s.toUpperCase());
        }
    }
}`,
    output: `=== Shape Areas ===
Circle[radius=5.0]               area = 78.54
Rectangle[width=4.0, height=6.0] area = 24.00
Triangle[base=3.0, height=8.0]   area = 12.00

=== Type Descriptions ===
Positive integer: 42
Negative integer: -7
String of length 5: Hello
Empty string
int array of length 3
null value
Unknown: Double

Old style length: 13
New style: HELLO, WORLD!`,
    notes: [
      'Pattern variables are in scope only in the true branch of the condition — the compiler enforces this.',
      'Guarded patterns with when (case Integer i when i > 0) allow fine-grained matching within a type.',
      'Sealed classes guarantee exhaustiveness — the compiler knows all possible subtypes and checks that your switch covers them all.',
      'Pattern matching in switch is a Java 21 preview feature that became standard — verify your Java version supports it.',
    ],
    practice: {
      title: 'JSON Value Parser',
      description: 'Create a method printJsonValue(Object value) that uses pattern matching instanceof to handle: String (print with quotes), Integer/Long (print as number), Double (print with 2 decimal places), Boolean (print true/false), List<?> (print array notation with size), null (print "null"). Test with various types.',
      startCode: '',
      hint: 'Use if (value instanceof String s) ..., else if (value instanceof Integer i) ..., etc. For List use if (value instanceof List<?> list).',
      solution: `import java.util.*;
public class JsonPrinter {
    static void printJsonValue(Object value) {
        if (value instanceof String s) System.out.println("\\"" + s + "\\"");
        else if (value instanceof Integer i) System.out.println(i);
        else if (value instanceof Long l) System.out.println(l);
        else if (value instanceof Double d) System.out.printf("%.2f%n", d);
        else if (value instanceof Boolean b) System.out.println(b);
        else if (value instanceof List<?> list) System.out.println("[array of " + list.size() + " items]");
        else if (value == null) System.out.println("null");
        else System.out.println("unknown");
    }
    public static void main(String[] args) {
        printJsonValue("Hello"); printJsonValue(42); printJsonValue(3.14);
        printJsonValue(true); printJsonValue(List.of(1,2,3)); printJsonValue(null);
    }
}`,
    },
  },

  // ── TOPIC 27: Design Pattern: Singleton ───────────────────────────────────────
  {
    id: 'java-design-singleton',
    category: 'Design Patterns',
    title: 'Design Pattern: Singleton',
    difficulty: 'Advanced',
    theory: [
      'The Singleton pattern ensures a class has only one instance and provides a global access point to it. Used for: configuration, logging, thread pools, database connections.',
      'Classic lazy-initialization: the instance is created only when first needed. Thread-safe version uses double-checked locking with volatile.',
      'The enum singleton (Josh Bloch\'s recommendation) is the safest and simplest: it handles serialization and reflection attacks automatically.',
      'Overuse of Singleton is an anti-pattern — it creates hidden global state and makes testing harder. Prefer dependency injection when possible.',
    ],
    syntax: `// Thread-safe lazy singleton
public class Config {
    private static volatile Config instance;
    private Config() {}  // private constructor

    public static Config getInstance() {
        if (instance == null) {
            synchronized (Config.class) {
                if (instance == null)
                    instance = new Config();
            }
        }
        return instance;
    }
}

// Enum singleton (best approach)
enum AppConfig { INSTANCE;
    public String get(String key) { ... }
}`,
    code: `import java.util.*;

// Thread-safe singleton with double-checked locking
class DatabasePool {
    private static volatile DatabasePool instance;
    private List<String> connections = new ArrayList<>();
    private int maxConnections = 5;
    private int nextId = 1;

    private DatabasePool() {
        System.out.println("DatabasePool initialised");
    }

    public static DatabasePool getInstance() {
        if (instance == null) {
            synchronized (DatabasePool.class) {
                if (instance == null) {
                    instance = new DatabasePool();
                }
            }
        }
        return instance;
    }

    public synchronized String getConnection() {
        if (connections.size() >= maxConnections)
            throw new RuntimeException("Connection pool exhausted!");
        String conn = "conn-" + nextId++;
        connections.add(conn);
        System.out.println("  Acquired: " + conn + " (pool size: " + connections.size() + ")");
        return conn;
    }

    public synchronized void releaseConnection(String conn) {
        connections.remove(conn);
        System.out.println("  Released: " + conn + " (pool size: " + connections.size() + ")");
    }

    public int getPoolSize() { return connections.size(); }
}

// Enum singleton — simplest, safest
enum AppLogger {
    INSTANCE;
    private List<String> logs = new ArrayList<>();

    public void log(String level, String message) {
        String entry = "[" + level + "] " + message;
        logs.add(entry);
        System.out.println(entry);
    }

    public List<String> getLogs() { return Collections.unmodifiableList(logs); }
}

public class SingletonDemo {
    public static void main(String[] args) {
        // DatabasePool singleton
        DatabasePool pool1 = DatabasePool.getInstance();
        DatabasePool pool2 = DatabasePool.getInstance();
        System.out.println("Same instance: " + (pool1 == pool2));

        String c1 = pool1.getConnection();
        String c2 = pool1.getConnection();
        pool1.releaseConnection(c1);
        String c3 = pool2.getConnection(); // same pool!
        System.out.println("Pool size: " + pool1.getPoolSize());

        // Enum singleton logger
        AppLogger.INSTANCE.log("INFO", "Application started");
        AppLogger.INSTANCE.log("WARN", "Low memory");
        AppLogger.INSTANCE.log("INFO", "Request processed");
        System.out.println("Total logs: " + AppLogger.INSTANCE.getLogs().size());
    }
}`,
    output: `DatabasePool initialised
Same instance: true
  Acquired: conn-1 (pool size: 1)
  Acquired: conn-2 (pool size: 2)
  Released: conn-1 (pool size: 1)
  Acquired: conn-3 (pool size: 2)
Pool size: 2
[INFO] Application started
[WARN] Low memory
[INFO] Request processed
Total logs: 3`,
    notes: [
      'The volatile keyword ensures changes to the instance variable are visible across threads — required for double-checked locking.',
      'Enum singleton prevents reflection attacks (reflection cannot create a second instance) and handles serialization correctly.',
      'Consider using dependency injection frameworks (Spring, Guice) instead of hand-rolled Singletons for testability.',
      'If a Singleton holds mutable state, all methods that read/write that state must be synchronized.',
    ],
    practice: {
      title: 'Configuration Manager',
      description: 'Implement a Singleton ConfigManager that: stores key-value pairs in a HashMap, has set(String key, String value) and get(String key, String defaultValue) methods, has a loadDefaults() method that sets common defaults, and ensures only one instance exists. Test by getting the instance from two variables and verifying they are the same.',
      startCode: '',
      hint: 'Use the enum singleton pattern: enum ConfigManager { INSTANCE; private Map<String,String> config = new HashMap<>(); }. loadDefaults() calls set() for each default.',
      solution: `import java.util.*;
enum ConfigManager {
    INSTANCE;
    private final Map<String,String> config = new HashMap<>();
    public void set(String k, String v) { config.put(k,v); }
    public String get(String k, String def) { return config.getOrDefault(k,def); }
    public void loadDefaults() {
        set("host","localhost"); set("port","8080"); set("timeout","30"); set("debug","false");
    }
}
public class ConfigTest {
    public static void main(String[] args) {
        ConfigManager c1 = ConfigManager.INSTANCE;
        ConfigManager c2 = ConfigManager.INSTANCE;
        System.out.println("Same: " + (c1==c2));
        c1.loadDefaults();
        c1.set("debug","true");
        System.out.println("host=" + c2.get("host","?"));
        System.out.println("debug=" + c2.get("debug","false"));
        System.out.println("maxConn=" + c2.get("maxConn","100"));
    }
}`,
    },
  },

  // ── TOPIC 28: Design Pattern: Factory ─────────────────────────────────────────
  {
    id: 'java-design-factory',
    category: 'Design Patterns',
    title: 'Design Pattern: Factory',
    difficulty: 'Advanced',
    theory: [
      'The Factory pattern provides a way to create objects without specifying the exact class. A factory method returns an instance of one of several possible classes depending on the input.',
      'It promotes loose coupling — the caller does not need to know which concrete class is being created, only the interface/abstract type.',
      'Simple Factory: one class with a static method that returns different subtypes. Factory Method Pattern: subclasses decide which class to instantiate. Abstract Factory: family of related factories.',
      'Common uses: database drivers (DriverManager.getConnection()), UI components for different platforms, parser creation (JSON vs XML), payment processor selection.',
    ],
    syntax: `interface Animal { void speak(); }
class Dog implements Animal { public void speak() { System.out.println("Woof"); } }
class Cat implements Animal { public void speak() { System.out.println("Meow"); } }

class AnimalFactory {
    public static Animal create(String type) {
        return switch (type.toLowerCase()) {
            case "dog" -> new Dog();
            case "cat" -> new Cat();
            default -> throw new IllegalArgumentException("Unknown: " + type);
        };
    }
}

Animal a = AnimalFactory.create("dog");
a.speak();`,
    code: `import java.util.*;

// Payment processing factory example
interface PaymentProcessor {
    void processPayment(double amount);
    String getType();
}

class CreditCardProcessor implements PaymentProcessor {
    private String cardNumber;
    CreditCardProcessor(String cardNumber) { this.cardNumber = cardNumber; }
    @Override public void processPayment(double amount) {
        System.out.printf("Credit Card ****%s: Charged $%.2f%n",
            cardNumber.substring(cardNumber.length()-4), amount);
    }
    @Override public String getType() { return "Credit Card"; }
}

class UPIProcessor implements PaymentProcessor {
    private String upiId;
    UPIProcessor(String upiId) { this.upiId = upiId; }
    @Override public void processPayment(double amount) {
        System.out.printf("UPI (%s): Paid $%.2f%n", upiId, amount);
    }
    @Override public String getType() { return "UPI"; }
}

class CryptoProcessor implements PaymentProcessor {
    private String walletAddress;
    CryptoProcessor(String address) { this.walletAddress = address; }
    @Override public void processPayment(double amount) {
        System.out.printf("Crypto (wallet %s...): Sent $%.2f%n",
            walletAddress.substring(0, 8), amount);
    }
    @Override public String getType() { return "Cryptocurrency"; }
}

class PaymentFactory {
    public static PaymentProcessor create(String method, String identifier) {
        return switch (method.toUpperCase()) {
            case "CREDIT", "DEBIT" -> new CreditCardProcessor(identifier);
            case "UPI"             -> new UPIProcessor(identifier);
            case "CRYPTO"          -> new CryptoProcessor(identifier);
            default -> throw new IllegalArgumentException("Unsupported payment: " + method);
        };
    }
}

public class FactoryDemo {
    public static void main(String[] args) {
        List<String[]> payments = Arrays.asList(
            new String[]{"CREDIT", "4111111111111234"},
            new String[]{"UPI",    "alice@phonepe"},
            new String[]{"CRYPTO", "0xAbCdEf1234567890"}
        );

        double amount = 1500.00;
        System.out.println("=== Processing Payments of $" + amount + " ===");
        for (String[] p : payments) {
            PaymentProcessor processor = PaymentFactory.create(p[0], p[1]);
            System.out.print("Type: " + processor.getType() + " -> ");
            processor.processPayment(amount);
        }

        // Error handling
        try {
            PaymentFactory.create("CASH", "unknown");
        } catch (IllegalArgumentException e) {
            System.out.println("\nError: " + e.getMessage());
        }
    }
}`,
    output: `=== Processing Payments of $1500.0 ===
Type: Credit Card -> Credit Card ****1234: Charged $1500.00
Type: UPI -> UPI (alice@phonepe): Paid $1500.00
Type: Cryptocurrency -> Crypto (wallet 0xAbCdEf...): Sent $1500.00

Error: Unsupported payment: CASH`,
    notes: [
      'The Factory hides which concrete class is created — callers only depend on the interface, making it easy to add new types without changing client code.',
      'Move from Simple Factory to Factory Method Pattern when subclasses should decide what to create — each subclass overrides a createProduct() method.',
      'The Registry pattern is a variation: store factories in a Map<String, Supplier<T>> for extensible, data-driven factory creation.',
      'In Spring, @Bean methods are factories — the framework calls them to create and manage object instances.',
    ],
    practice: {
      title: 'Shape Factory',
      description: 'Create a ShapeFactory with a create(String type, double... dimensions) method that creates: Circle (1 dimension: radius), Rectangle (2 dimensions: width, height), Triangle (3 dimensions: base, height, hypotenuse). Each shape has area() and perimeter() methods. Test creating all three types.',
      startCode: '',
      hint: 'Use varargs double... dimensions. In the factory, switch on type.toLowerCase() and pass dimensions[0], dimensions[1] etc. to the appropriate constructor.',
      solution: `interface Shape { double area(); double perimeter(); String name(); }
record Circle(double r) implements Shape {
    public double area(){return Math.PI*r*r;} public double perimeter(){return 2*Math.PI*r;} public String name(){return "Circle";}
}
record Rect(double w,double h) implements Shape {
    public double area(){return w*h;} public double perimeter(){return 2*(w+h);} public String name(){return "Rectangle";}
}
record Tri(double b,double h,double hyp) implements Shape {
    public double area(){return 0.5*b*h;} public double perimeter(){return b+h+hyp;} public String name(){return "Triangle";}
}
class ShapeFactory {
    static Shape create(String type, double... d) {
        return switch(type.toLowerCase()){
            case "circle" -> new Circle(d[0]);
            case "rectangle" -> new Rect(d[0],d[1]);
            case "triangle" -> new Tri(d[0],d[1],d[2]);
            default -> throw new IllegalArgumentException("Unknown: "+type);
        };
    }
}
public class ShapeFactoryDemo {
    public static void main(String[] args) {
        Shape[] shapes = {ShapeFactory.create("circle",5), ShapeFactory.create("rectangle",4,6), ShapeFactory.create("triangle",3,4,5)};
        for(Shape s:shapes) System.out.printf("%-12s area=%.2f perimeter=%.2f%n",s.name(),s.area(),s.perimeter());
    }
}`,
    },
  },

  // ── TOPIC 29: Design Pattern: Builder ─────────────────────────────────────────
  {
    id: 'java-design-builder',
    category: 'Design Patterns',
    title: 'Design Pattern: Builder',
    difficulty: 'Advanced',
    theory: [
      'The Builder pattern constructs complex objects step by step. It separates object construction from its representation, allowing the same construction process to create different objects.',
      'It solves the "telescoping constructor" problem — when a class has many optional parameters, you end up with many constructors or long parameter lists that are hard to read.',
      'A Builder class has setter-like methods that return this (for method chaining), and a build() method that creates and returns the final object.',
      'In Java, Lombok\'s @Builder annotation auto-generates builders. The standard library uses this pattern in StringBuilder, ProcessBuilder, and Stream.Builder.',
    ],
    syntax: `class Pizza {
    private String size, crust;
    private boolean cheese, pepperoni;

    private Pizza(Builder b) {
        size = b.size; crust = b.crust;
        cheese = b.cheese; pepperoni = b.pepperoni;
    }

    static class Builder {
        private String size, crust = "thin";
        private boolean cheese, pepperoni;

        Builder size(String s) { this.size = s; return this; }
        Builder cheese(boolean c) { this.cheese = c; return this; }
        Pizza build() { return new Pizza(this); }
    }
}

Pizza p = new Pizza.Builder().size("large").cheese(true).build();`,
    code: `import java.util.*;

class HttpRequest {
    private final String method;
    private final String url;
    private final Map<String, String> headers;
    private final String body;
    private final int timeout;
    private final boolean followRedirects;

    private HttpRequest(Builder b) {
        this.method          = b.method;
        this.url             = b.url;
        this.headers         = Collections.unmodifiableMap(b.headers);
        this.body            = b.body;
        this.timeout         = b.timeout;
        this.followRedirects = b.followRedirects;
    }

    @Override
    public String toString() {
        return String.format(
            "HttpRequest{method=%s, url=%s, headers=%s, body=%s, timeout=%ds, redirect=%b}",
            method, url, headers, body != null ? "'" + body + "'" : "null", timeout, followRedirects);
    }

    static class Builder {
        private String method = "GET";
        private String url;
        private Map<String, String> headers = new LinkedHashMap<>();
        private String body;
        private int timeout = 30;
        private boolean followRedirects = true;

        Builder url(String url) { this.url = url; return this; }
        Builder method(String m) { this.method = m.toUpperCase(); return this; }
        Builder header(String key, String value) { this.headers.put(key, value); return this; }
        Builder body(String body) { this.body = body; return this; }
        Builder timeout(int seconds) { this.timeout = seconds; return this; }
        Builder noRedirects() { this.followRedirects = false; return this; }

        HttpRequest build() {
            if (url == null || url.isBlank())
                throw new IllegalStateException("URL is required");
            if ((method.equals("POST") || method.equals("PUT")) && body == null)
                System.out.println("Warning: POST/PUT without body");
            return new HttpRequest(this);
        }
    }
}

public class BuilderDemo {
    public static void main(String[] args) {
        // Simple GET
        HttpRequest getReq = new HttpRequest.Builder()
            .url("https://api.example.com/users")
            .header("Authorization", "Bearer token123")
            .header("Accept", "application/json")
            .timeout(15)
            .build();
        System.out.println("GET: " + getReq);

        // POST with body
        HttpRequest postReq = new HttpRequest.Builder()
            .url("https://api.example.com/users")
            .method("POST")
            .header("Content-Type", "application/json")
            .body("{\"name\":\"Alice\",\"age\":25}")
            .timeout(60)
            .noRedirects()
            .build();
        System.out.println("\nPOST: " + postReq);

        // Validation error
        try {
            new HttpRequest.Builder().build();
        } catch (IllegalStateException e) {
            System.out.println("\nError: " + e.getMessage());
        }
    }
}`,
    output: `GET: HttpRequest{method=GET, url=https://api.example.com/users, headers={Authorization=Bearer token123, Accept=application/json}, body=null, timeout=15s, redirect=true}

POST: HttpRequest{method=POST, url=https://api.example.com/users, headers={Content-Type=application/json}, body='{"name":"Alice","age":25}', timeout=60s, redirect=false}

Error: URL is required`,
    notes: [
      'The built object is usually immutable (all fields final) — the Builder holds mutable state during construction.',
      'Always validate in build(), not in individual setters — the object is only valid when complete.',
      'Java\'s StringBuilder is a builder for String — append() chains, toString() builds the final product.',
      'Lombok @Builder annotation eliminates this boilerplate entirely. Worth knowing in a professional setting.',
    ],
    practice: {
      title: 'SQL Query Builder',
      description: 'Build a simple QueryBuilder class with methods: from(String table), select(String... columns), where(String condition), orderBy(String column), limit(int n), and build() that returns a SQL string. Test with: SELECT name, score FROM students WHERE score > 80 ORDER BY score LIMIT 10.',
      startCode: '',
      hint: 'Store each part as a field. build() joins the parts: "SELECT " + cols + " FROM " + table + (where != null ? " WHERE " + where : "") + ...',
      solution: `import java.util.*;
class QueryBuilder {
    private String table, where, orderCol;
    private String[] cols = {"*"};
    private int limit = -1;
    QueryBuilder from(String t){table=t;return this;}
    QueryBuilder select(String... c){cols=c;return this;}
    QueryBuilder where(String w){where=w;return this;}
    QueryBuilder orderBy(String c){orderCol=c;return this;}
    QueryBuilder limit(int n){limit=n;return this;}
    String build(){
        StringBuilder sb=new StringBuilder("SELECT ");
        sb.append(String.join(", ",cols)).append(" FROM ").append(table);
        if(where!=null)sb.append(" WHERE ").append(where);
        if(orderCol!=null)sb.append(" ORDER BY ").append(orderCol);
        if(limit>0)sb.append(" LIMIT ").append(limit);
        return sb.toString();
    }
}
public class QueryBuilderDemo {
    public static void main(String[] args) {
        System.out.println(new QueryBuilder().from("students").select("name","score").where("score > 80").orderBy("score").limit(10).build());
        System.out.println(new QueryBuilder().from("products").build());
    }
}`,
    },
  },

  // ── TOPIC 30: Collections Utility Methods ─────────────────────────────────────
  {
    id: 'java-collections-utility',
    category: 'Collections',
    title: 'Collections Utility Methods',
    difficulty: 'Intermediate',
    theory: [
      'The java.util.Collections class provides static utility methods for working with collections: sorting, searching, shuffling, filling, copying, finding min/max, and creating immutable/synchronized wrappers.',
      'Key methods: sort(), reverse(), shuffle(), min(), max(), frequency(), disjoint(), fill(), copy(), nCopies(), singletonList(), unmodifiableList(), synchronizedList().',
      'Java 9+ introduced factory methods on collection interfaces: List.of(), Set.of(), Map.of() — these create immutable collections directly without needing Collections utility.',
      'unmodifiableList() wraps a list in a read-only view — the underlying list can still be modified through the original reference. Use List.copyOf() for a truly immutable copy.',
    ],
    syntax: `List<Integer> list = new ArrayList<>(Arrays.asList(3,1,4,1,5));
Collections.sort(list);          // [1,1,3,4,5]
Collections.reverse(list);       // [5,4,3,1,1]
Collections.shuffle(list);       // random order
Collections.max(list);           // 5
Collections.min(list);           // 1
Collections.frequency(list, 1);  // 2

List<String> immutable = List.of("a","b","c");  // Java 9+
Map<String,Integer> map = Map.of("k1",1,"k2",2);`,
    code: `import java.util.*;

public class CollectionsUtilDemo {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(Arrays.asList(64, 25, 12, 22, 11));

        System.out.println("Original: " + nums);
        Collections.sort(nums);
        System.out.println("Sorted: " + nums);
        Collections.reverse(nums);
        System.out.println("Reversed: " + nums);
        System.out.println("Max: " + Collections.max(nums));
        System.out.println("Min: " + Collections.min(nums));

        // Frequency and disjoint
        List<String> fruits = Arrays.asList("apple","banana","apple","cherry","apple");
        System.out.println("\nfrequency('apple'): " + Collections.frequency(fruits, "apple"));
        List<String> vegs  = Arrays.asList("carrot","potato");
        List<String> more  = Arrays.asList("apple","carrot");
        System.out.println("disjoint(fruits,vegs): " + Collections.disjoint(fruits, vegs));
        System.out.println("disjoint(fruits,more): " + Collections.disjoint(fruits, more));

        // Fill and nCopies
        List<String> blanks = new ArrayList<>(Collections.nCopies(5, "N/A"));
        System.out.println("\nnCopies: " + blanks);
        Collections.fill(blanks, "DONE");
        System.out.println("fill:    " + blanks);

        // Immutable collections (Java 9+)
        List<String> immList = List.of("red","green","blue");
        Set<Integer>  immSet = Set.of(1, 2, 3, 4, 5);
        Map<String,Integer> immMap = Map.of("a",1,"b",2,"c",3);
        System.out.println("\nimmutable list: " + immList);
        System.out.println("immutable set:  " + immSet);
        System.out.println("immutable map:  " + immMap);

        // Unmodifiable wrapper
        List<String> mutable = new ArrayList<>(Arrays.asList("x","y","z"));
        List<String> view = Collections.unmodifiableList(mutable);
        mutable.add("w");  // original can change
        System.out.println("\nunmodifiable view sees change: " + view);
        try {
            view.add("fail");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot add to unmodifiable: " + e.getClass().getSimpleName());
        }
    }
}`,
    output: `Original: [64, 25, 12, 22, 11]
Sorted: [11, 12, 22, 25, 64]
Reversed: [64, 25, 22, 12, 11]
Max: 64
Min: 11

frequency('apple'): 3
disjoint(fruits,vegs): true
disjoint(fruits,more): false

nCopies: [N/A, N/A, N/A, N/A, N/A]
fill:    [DONE, DONE, DONE, DONE, DONE]

immutable list: [red, green, blue]
immutable set:  [1, 2, 3, 4, 5]
immutable map:  {a=1, b=2, c=3}

unmodifiable view sees change: [x, y, z, w]
Cannot add to unmodifiable: UnsupportedOperationException`,
    notes: [
      'Collections.sort() modifies the list in place. It uses TimSort (O(n log n), stable).',
      'List.of() creates a truly immutable list — neither the list nor its size can change. Collections.unmodifiableList() only wraps.',
      'Collections.swap(list, i, j) swaps two elements; Collections.rotate(list, distance) rotates elements.',
      'For thread-safe collections, use Collections.synchronizedList(list) or prefer ConcurrentHashMap, CopyOnWriteArrayList from java.util.concurrent.',
    ],
    practice: {
      title: 'Playlist Manager',
      description: 'Build a music playlist using Collections utilities. Create a List<String> of 6 songs. Operations: sort alphabetically, print, shuffle, find most repeated (add duplicates first), rotate by 2 positions, create an unmodifiable copy for sharing. Print results after each operation.',
      startCode: '',
      hint: 'Collections.shuffle(list, new Random(42)) for reproducible shuffles. Collections.rotate(list, 2) rotates forward by 2. Collections.frequency() for counts.',
      solution: `import java.util.*;
public class Playlist {
    public static void main(String[] args) {
        List<String> songs = new ArrayList<>(Arrays.asList("Bohemian Rhapsody","Hotel California","Stairway to Heaven","Imagine","Yesterday","Let It Be"));
        Collections.sort(songs);
        System.out.println("Sorted: " + songs);
        songs.add("Imagine"); songs.add("Yesterday");
        System.out.println("Most repeated: Imagine("+Collections.frequency(songs,"Imagine")+"), Yesterday("+Collections.frequency(songs,"Yesterday")+")");
        songs = new ArrayList<>(new LinkedHashSet<>(songs));
        Collections.shuffle(songs, new Random(42));
        System.out.println("Shuffled: " + songs);
        Collections.rotate(songs, 2);
        System.out.println("Rotated: " + songs);
        List<String> shared = Collections.unmodifiableList(songs);
        System.out.println("Shared: " + shared);
    }
}`,
    },
  },

  // ── TOPIC 31: PriorityQueue ───────────────────────────────────────────────────
  {
    id: 'java-priority-queue',
    category: 'Collections',
    title: 'PriorityQueue — Min/Max Heap',
    difficulty: 'Intermediate',
    theory: [
      'PriorityQueue is a min-heap by default — poll() always returns the smallest element. Use Collections.reverseOrder() or a custom Comparator for a max-heap.',
      'Operations: offer(e) (insert), poll() (remove smallest), peek() (view smallest without removing). All are O(log n) except peek which is O(1).',
      'PriorityQueue does not maintain sorted order for iteration — only the head element (accessible via peek/poll) is guaranteed to be the minimum.',
      'Common uses: Dijkstra\'s shortest path, A* search, task scheduling by priority, merging sorted lists, finding top-K elements.',
    ],
    syntax: `// Min-heap (default)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5); minHeap.offer(1); minHeap.offer(3);
minHeap.poll();  // 1 (smallest)

// Max-heap
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());

// Custom priority
PriorityQueue<Task> tasks = new PriorityQueue<>(
    Comparator.comparingInt(t -> t.priority));`,
    code: `import java.util.*;

class Task {
    String name; int priority; // lower = higher priority

    Task(String name, int priority) { this.name = name; this.priority = priority; }

    @Override
    public String toString() { return name + "(p=" + priority + ")"; }
}

public class PriorityQueueDemo {
    public static void main(String[] args) {
        // Min-heap of integers
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        int[] nums = {5, 1, 8, 3, 7, 2, 9};
        for (int n : nums) minHeap.offer(n);
        System.out.print("Min-heap drain: ");
        while (!minHeap.isEmpty()) System.out.print(minHeap.poll() + " ");
        System.out.println();

        // Max-heap
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int n : nums) maxHeap.offer(n);
        System.out.print("Max-heap drain: ");
        while (!maxHeap.isEmpty()) System.out.print(maxHeap.poll() + " ");
        System.out.println();

        // Top-K largest elements
        int k = 3;
        PriorityQueue<Integer> topK = new PriorityQueue<>(); // min-heap, size k
        for (int n : nums) {
            topK.offer(n);
            if (topK.size() > k) topK.poll(); // remove smallest
        }
        System.out.println("Top " + k + " largest: " + new ArrayList<>(topK));

        // Task scheduler with custom priority
        PriorityQueue<Task> scheduler = new PriorityQueue<>(
            Comparator.comparingInt(t -> t.priority));
        scheduler.offer(new Task("Send email",    3));
        scheduler.offer(new Task("Fix bug",       1));
        scheduler.offer(new Task("Write tests",   2));
        scheduler.offer(new Task("Deploy",        1));
        scheduler.offer(new Task("Update docs",   4));

        System.out.println("\nTask execution order:");
        while (!scheduler.isEmpty()) {
            System.out.println("  " + scheduler.poll());
        }
    }
}`,
    output: `Min-heap drain: 1 2 3 5 7 8 9
Max-heap drain: 9 8 7 5 3 2 1
Top 3 largest: [7, 8, 9]

Task execution order:
  Fix bug(p=1)
  Deploy(p=1)
  Write tests(p=2)
  Send email(p=3)
  Update docs(p=4)`,
    notes: [
      'PriorityQueue is not thread-safe. Use PriorityBlockingQueue for concurrent access.',
      'poll() on an empty PriorityQueue returns null; remove() throws NoSuchElementException.',
      'For top-K smallest: use a max-heap of size K; for top-K largest: use a min-heap of size K.',
      'The internal array of PriorityQueue is not sorted — only the root (index 0) is guaranteed to be the minimum.',
    ],
    practice: {
      title: 'Merge K Sorted Arrays',
      description: 'Given 3 sorted arrays, merge them into one sorted array using a PriorityQueue. Each element in the queue should track its value, which array it came from, and its index in that array. Poll the minimum each time and enqueue the next element from the same array.',
      startCode: '',
      hint: 'Create a helper class/array int[]{value, arrayIndex, elementIndex}. Offer all first elements. Poll minimum, add to result, offer next from same array if exists.',
      solution: `import java.util.*;
public class MergeKSorted {
    public static void main(String[] args) {
        int[][] arrays = {{1,4,7},{2,5,8},{3,6,9}};
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a->a[0]));
        for (int i=0;i<arrays.length;i++) pq.offer(new int[]{arrays[i][0],i,0});
        List<Integer> result = new ArrayList<>();
        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            result.add(top[0]);
            int ai=top[1], idx=top[2]+1;
            if (idx<arrays[ai].length) pq.offer(new int[]{arrays[ai][idx],ai,idx});
        }
        System.out.println("Merged: " + result);
    }
}`,
    },
  },

  // ── TOPIC 32: Iterator & Iterable ─────────────────────────────────────────────
  {
    id: 'java-iterator',
    category: 'Collections',
    title: 'Iterator & Iterable',
    difficulty: 'Intermediate',
    theory: [
      'Iterator<T> defines a standard way to traverse a collection: hasNext() checks if more elements remain, next() returns the next element, remove() removes the last returned element.',
      'Iterable<T> (implemented by all collections) enables the enhanced for-each loop. Any class implementing Iterable must return an Iterator from iterator().',
      'The key advantage of Iterator.remove() is safe removal while iterating — removing from a collection during for-each throws ConcurrentModificationException.',
      'ListIterator extends Iterator with bidirectional traversal (previous(), hasPrevious()) and allows set() and add() operations during iteration.',
    ],
    syntax: `// Iterator usage
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    if (shouldRemove(s)) it.remove(); // safe removal
}

// For-each uses Iterable internally
for (String s : list) { ... }

// Custom Iterable class
class Range implements Iterable<Integer> {
    public Iterator<Integer> iterator() { ... }
}`,
    code: `import java.util.*;

// Custom Iterable: a range of integers
class Range implements Iterable<Integer> {
    private final int start, end, step;

    Range(int start, int end, int step) {
        this.start = start; this.end = end; this.step = step;
    }

    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<Integer>() {
            int current = start;

            @Override public boolean hasNext() { return current < end; }
            @Override public Integer next() {
                if (!hasNext()) throw new NoSuchElementException();
                int val = current;
                current += step;
                return val;
            }
        };
    }
}

public class IteratorDemo {
    public static void main(String[] args) {
        // Safe removal with Iterator
        List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
        System.out.println("Original: " + nums);

        Iterator<Integer> it = nums.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) it.remove();  // remove evens safely
        }
        System.out.println("Odds only: " + nums);

        // ListIterator (bidirectional)
        List<String> words = new ArrayList<>(Arrays.asList("hello","world","java"));
        ListIterator<String> lit = words.listIterator();
        while (lit.hasNext()) {
            String w = lit.next();
            lit.set(w.toUpperCase());  // modify in place
        }
        System.out.println("Upper: " + words);

        // Backward iteration
        System.out.print("Backward: ");
        while (lit.hasPrevious()) System.out.print(lit.previous() + " ");
        System.out.println();

        // Custom Iterable
        Range range = new Range(0, 20, 3);
        System.out.print("Range(0,20,3): ");
        for (int n : range) System.out.print(n + " ");
        System.out.println();

        // Using iterator() with streams
        Range r2 = new Range(1, 11, 1);
        int sum = 0;
        for (int n : r2) sum += n;
        System.out.println("Sum 1-10: " + sum);
    }
}`,
    output: `Original: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Odds only: [1, 3, 5, 7, 9]
Upper: [HELLO, WORLD, JAVA]
Backward: JAVA WORLD HELLO
Range(0,20,3): 0 3 6 9 12 15 18
Sum 1-10: 55`,
    notes: [
      'Never call next() without first calling hasNext() — it throws NoSuchElementException on an exhausted iterator.',
      'ConcurrentModificationException is thrown when you add/remove from a list inside a for-each loop. Use Iterator.remove() or collect-then-remove.',
      'For concurrent iteration, use CopyOnWriteArrayList (snapshot iteration) or iterate with a synchronized block.',
      'Java for-each (for (T item : collection)) compiles to iterator() + hasNext() + next() calls under the hood.',
    ],
    practice: {
      title: 'Filtered Iterator',
      description: 'Implement a FilteredIterator<T> class that wraps an existing Iterator<T> and only returns elements matching a given Predicate<T>. Test it by creating an iterator over a list of integers that only yields even numbers, and one that only yields strings longer than 3 characters.',
      startCode: '',
      hint: 'Store the underlying iterator and predicate. In hasNext(), advance with next() and peek ahead (cache the next valid item). hasNext() finds and stores the next matching item.',
      solution: `import java.util.*;
import java.util.function.*;
class FilteredIterator<T> implements Iterator<T> {
    private final Iterator<T> source;
    private final Predicate<T> pred;
    private T next;
    private boolean hasNext;
    FilteredIterator(Iterator<T> source, Predicate<T> pred) {
        this.source=source; this.pred=pred; advance();
    }
    private void advance() {
        hasNext=false;
        while(source.hasNext()){T v=source.next();if(pred.test(v)){next=v;hasNext=true;break;}}
    }
    public boolean hasNext(){return hasNext;}
    public T next(){if(!hasNext)throw new NoSuchElementException();T v=next;advance();return v;}
}
public class FilterIterPractice {
    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(1,2,3,4,5,6,7,8);
        Iterator<Integer> evens = new FilteredIterator<>(ints.iterator(), n->n%2==0);
        while(evens.hasNext()) System.out.print(evens.next()+" ");
        System.out.println();
        List<String> words = Arrays.asList("hi","hello","ok","world","java","go");
        Iterator<String> long3 = new FilteredIterator<>(words.iterator(), s->s.length()>3);
        while(long3.hasNext()) System.out.print(long3.next()+" ");
        System.out.println();
    }
}`,
    },
  },

  // ── TOPIC 33: Static Members ──────────────────────────────────────────────────
  {
    id: 'java-static-members',
    category: 'Java Fundamentals',
    title: 'Static Members & Utility Classes',
    difficulty: 'Intermediate',
    theory: [
      'Static members (fields and methods) belong to the class itself, not to any instance. They are shared across all instances and accessed via the class name: ClassName.field or ClassName.method().',
      'Static fields are useful for constants (static final), counters, and shared state. Static methods are utility methods that do not need instance state.',
      'A utility class is typically a class with only static methods and a private constructor (to prevent instantiation): Math, Arrays, Collections, Objects are all utility classes.',
      'Static initializer blocks run once when the class is loaded, before any constructor: static { ... }. Useful for initialising complex static fields.',
    ],
    syntax: `class Counter {
    private static int count = 0;  // shared across all instances
    private int id;

    Counter() { this.id = ++count; }

    static int getCount() { return count; }  // static method
    int getId() { return id; }               // instance method
}

// Utility class pattern
final class MathUtils {
    private MathUtils() {}  // prevent instantiation

    static int clamp(int val, int min, int max) {
        return Math.max(min, Math.min(max, val));
    }
}`,
    code: `public class StaticMembersDemo {

    // Static field: shared counter
    private static int instanceCount = 0;

    // Static constant
    static final String COMPANY = "Syllab";
    static final double VERSION = 1.0;

    // Instance field
    private final int id;
    private String name;

    // Static initializer block
    static {
        System.out.println("Class loaded. Company: " + COMPANY + " v" + VERSION);
    }

    StaticMembersDemo(String name) {
        this.id = ++instanceCount;
        this.name = name;
    }

    static int getInstanceCount() { return instanceCount; }

    @Override public String toString() { return "Instance #" + id + " (" + name + ")"; }

    // ── Utility class pattern ──
    static final class StringUtils {
        private StringUtils() {} // cannot instantiate

        static String capitalize(String s) {
            if (s == null || s.isEmpty()) return s;
            return Character.toUpperCase(s.charAt(0)) + s.substring(1).toLowerCase();
        }

        static String repeat(String s, int n) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < n; i++) sb.append(s);
            return sb.toString();
        }

        static boolean isPalindrome(String s) {
            String clean = s.toLowerCase().replaceAll("[^a-z0-9]", "");
            return clean.equals(new StringBuilder(clean).reverse().toString());
        }
    }

    public static void main(String[] args) {
        System.out.println("Count: " + StaticMembersDemo.getInstanceCount());

        StaticMembersDemo a = new StaticMembersDemo("Alpha");
        StaticMembersDemo b = new StaticMembersDemo("Beta");
        StaticMembersDemo c = new StaticMembersDemo("Gamma");

        System.out.println(a);
        System.out.println(b);
        System.out.println(c);
        System.out.println("Total instances: " + StaticMembersDemo.getInstanceCount());

        // Utility class
        System.out.println("\n=== StringUtils ===");
        System.out.println(StringUtils.capitalize("hELLO wORLD"));
        System.out.println(StringUtils.repeat("ab", 4));
        System.out.println("racecar palindrome: " + StringUtils.isPalindrome("racecar"));
        System.out.println("A man a plan palindrome: " + StringUtils.isPalindrome("A man a plan a canal Panama"));
    }
}`,
    output: `Class loaded. Company: Syllab v1.0
Count: 0
Instance #1 (Alpha)
Instance #2 (Beta)
Instance #3 (Gamma)
Total instances: 3

=== StringUtils ===
Hello world
abababab
racecar palindrome: true
A man a plan palindrome: true`,
    notes: [
      'Static fields are initialised once when the class is loaded. Their values persist for the JVM\'s lifetime.',
      'Call static methods on the class name, not an instance: MathUtils.clamp() not obj.clamp(). Calling on an instance works but is misleading.',
      'Static methods cannot access instance (non-static) fields or methods — they have no this reference.',
      'A utility class should be final with a private constructor to prevent subclassing and instantiation.',
    ],
    practice: {
      title: 'NumberUtils Utility Class',
      description: 'Create a utility class NumberUtils with static methods: isPrime(int n), factorial(long n), gcd(int a, int b) using Euclid\'s algorithm, lcm(int a, int b), and digitSum(int n). Test each method with sample inputs.',
      startCode: '',
      hint: 'isPrime: check divisors up to sqrt(n). gcd(a,b): return a if b==0 else gcd(b, a%b). lcm(a,b) = a*b/gcd(a,b). digitSum: sum of n%10 recursively.',
      solution: `public final class NumberUtils {
    private NumberUtils(){}
    static boolean isPrime(int n){if(n<2)return false;for(int i=2;i<=Math.sqrt(n);i++)if(n%i==0)return false;return true;}
    static long factorial(long n){return n<=1?1:n*factorial(n-1);}
    static int gcd(int a,int b){return b==0?a:gcd(b,a%b);}
    static int lcm(int a,int b){return a/gcd(a,b)*b;}
    static int digitSum(int n){n=Math.abs(n);return n<10?n:n%10+digitSum(n/10);}
    public static void main(String[] args){
        System.out.println("isPrime(17)="+isPrime(17));
        System.out.println("factorial(10)="+factorial(10));
        System.out.println("gcd(48,18)="+gcd(48,18));
        System.out.println("lcm(12,18)="+lcm(12,18));
        System.out.println("digitSum(12345)="+digitSum(12345));
    }
}`,
    },
  },

  // ── TOPIC 34: Mini Project: Student Management System ─────────────────────────
  {
    id: 'java-project-student-management',
    category: 'Mini Projects',
    title: 'Mini Project: Student Management System',
    difficulty: 'Intermediate',
    theory: [
      'A Student Management System is a classic Java project that combines: OOP (classes, encapsulation), Collections (ArrayList, HashMap), sorting (Comparable/Comparator), and file I/O or console interaction.',
      'This project demonstrates a layered architecture: data model (Student class), service layer (StudentService with business logic), and a main/controller layer.',
      'Key features: add/remove students, search by name or ID, calculate grade statistics, rank students, generate report cards.',
      'Real student management systems add: database persistence (JDBC), GUI (JavaFX/Swing), authentication, and export to CSV/PDF.',
    ],
    syntax: `// Architecture overview
record Student(String id, String name, Map<String,Integer> grades) {
    double average() { ... }
    String letterGrade() { ... }
}

class StudentService {
    private List<Student> students = new ArrayList<>();
    void addStudent(Student s) { ... }
    Optional<Student> findById(String id) { ... }
    List<Student> getRanking() { ... }
}`,
    code: `import java.util.*;
import java.util.stream.*;

record Student(String id, String name, Map<String, Integer> subjects) implements Comparable<Student> {
    double average() {
        return subjects.values().stream().mapToInt(i -> i).average().orElse(0);
    }

    String letterGrade() {
        double avg = average();
        if (avg >= 90) return "A+"; if (avg >= 80) return "A";
        if (avg >= 70) return "B";  if (avg >= 60) return "C"; return "F";
    }

    boolean hasPassed() { return average() >= 60; }

    @Override
    public int compareTo(Student other) {
        return Double.compare(other.average(), this.average()); // descending
    }

    void printReport() {
        System.out.printf("┌─────────────────────────────────────┐%n");
        System.out.printf("│ ID: %-8s  Name: %-18s │%n", id, name);
        System.out.printf("├─────────────────────────────────────┤%n");
        subjects.forEach((subj, score) ->
            System.out.printf("│  %-12s : %3d/100 %-10s│%n",
                subj, score, score >= 60 ? "PASS" : "FAIL"));
        System.out.printf("├─────────────────────────────────────┤%n");
        System.out.printf("│  Average: %5.1f%%  Grade: %-6s      │%n", average(), letterGrade());
        System.out.printf("│  Status:  %-27s│%n", hasPassed() ? "PROMOTED" : "HELD BACK");
        System.out.printf("└─────────────────────────────────────┘%n");
    }
}

class StudentService {
    private List<Student> students = new ArrayList<>();

    void addStudent(Student s) { students.add(s); }

    Optional<Student> findById(String id) {
        return students.stream().filter(s -> s.id().equals(id)).findFirst();
    }

    List<Student> getTopStudents(int n) {
        return students.stream().sorted().limit(n).collect(Collectors.toList());
    }

    Map<String, Double> subjectAverages() {
        Map<String, Double> avgs = new TreeMap<>();
        if (students.isEmpty()) return avgs;
        Set<String> subjects = students.get(0).subjects().keySet();
        for (String subj : subjects) {
            double avg = students.stream()
                .mapToInt(s -> s.subjects().getOrDefault(subj, 0)).average().orElse(0);
            avgs.put(subj, avg);
        }
        return avgs;
    }

    void printSummary() {
        System.out.println("\n=== CLASS SUMMARY ===");
        System.out.println("Total students: " + students.size());
        long passed = students.stream().filter(Student::hasPassed).count();
        System.out.printf("Pass rate: %.1f%%%n", 100.0 * passed / students.size());
        System.out.printf("Class average: %.1f%%%n",
            students.stream().mapToDouble(Student::average).average().orElse(0));
        System.out.println("Subject averages: " + subjectAverages());
    }
}

public class StudentManagement {
    public static void main(String[] args) {
        StudentService svc = new StudentService();

        svc.addStudent(new Student("S001", "Alice Johnson",
            new LinkedHashMap<>(Map.of("Maths",92,"Science",88,"English",95))));
        svc.addStudent(new Student("S002", "Bob Smith",
            new LinkedHashMap<>(Map.of("Maths",78,"Science",72,"English",68))));
        svc.addStudent(new Student("S003", "Carol Davis",
            new LinkedHashMap<>(Map.of("Maths",55,"Science",48,"English",62))));
        svc.addStudent(new Student("S004", "Dave Wilson",
            new LinkedHashMap<>(Map.of("Maths",91,"Science",85,"English",90))));

        // Print report cards
        System.out.println("=== REPORT CARDS ===");
        svc.findById("S001").ifPresent(Student::printReport);
        svc.findById("S003").ifPresent(Student::printReport);

        // Top students
        System.out.println("\n=== TOP 2 STUDENTS ===");
        svc.getTopStudents(2).forEach(s ->
            System.out.printf("  %s - %.1f%% (%s)%n", s.name(), s.average(), s.letterGrade()));

        // Summary
        svc.printSummary();
    }
}`,
    output: `=== REPORT CARDS ===
┌─────────────────────────────────────┐
│ ID: S001      Name: Alice Johnson      │
├─────────────────────────────────────┤
│  Maths        :  92/100 PASS       │
│  Science      :  88/100 PASS       │
│  English      :  95/100 PASS       │
├─────────────────────────────────────┤
│  Average:  91.7%  Grade: A+        │
│  Status:  PROMOTED                  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ ID: S003      Name: Carol Davis        │
├─────────────────────────────────────┤
│  Maths        :  55/100 FAIL       │
│  Science      :  48/100 FAIL       │
│  English      :  62/100 PASS       │
├─────────────────────────────────────┤
│  Average:  55.0%  Grade: F         │
│  Status:  HELD BACK                 │
└─────────────────────────────────────┘

=== TOP 2 STUDENTS ===
  Alice Johnson - 91.7% (A+)
  Dave Wilson - 88.7% (A)

=== CLASS SUMMARY ===
Total students: 4
Pass rate: 75.0%
Class average: 77.0%
Subject averages: {English=78.75, Maths=79.0, Science=73.25}`,
    notes: [
      'This project uses records (Student), service pattern (StudentService), Streams for analytics, and Optional for safe lookup.',
      'Extend this project: add a Scanner-based menu for interactive use, export to CSV using Files.writeString(), add CRUD persistence.',
      'Consider making subjects a separate Grade record(String subject, int score, String grade) for more structure.',
      'Great GitHub portfolio project — add a GUI with JavaFX or a REST API with Spring Boot to showcase to employers.',
    ],
    practice: {
      title: 'Extend with Attendance Tracking',
      description: 'Extend the Student record to include an attendance map (subject -> daysPresent/daysTotal). Add a method attendancePercent(String subject) and isEligibleForExam(String subject) returning true if attendance >= 75%. Print attendance alongside grades in the report.',
      startCode: '',
      hint: 'Add Map<String, int[]> attendance where int[]{present, total}. attendancePercent = 100.0 * present / total.',
      solution: `// Add to Student record:
// Map<String,int[]> attendance
// double attendancePercent(String s){ int[] a=attendance.get(s); return a==null?0:100.0*a[0]/a[1]; }
// boolean isEligibleForExam(String s){ return attendancePercent(s)>=75; }
// In printReport(), add attendance row for each subject`,
    },
  },

  // ── TOPIC 35: Mini Project: Quiz Application ──────────────────────────────────
  {
    id: 'java-project-quiz',
    category: 'Mini Projects',
    title: 'Mini Project: Quiz Application',
    difficulty: 'Intermediate',
    theory: [
      'A Quiz Application combines: OOP (Question class, Quiz class), Collections (ArrayList for questions), control flow (looping through questions), and user input (Scanner).',
      'This project demonstrates: encapsulation (private fields), enum (difficulty levels), Collections (shuffled question pool), and tracking state (score, time).',
      'Key features: multiple choice questions, score tracking, timer per question (optional), randomised question order, difficulty filtering, result grading.',
      'Real quiz apps add: database for questions, user authentication, leaderboard persistence, rich UI (web/mobile), and analytics on common wrong answers.',
    ],
    syntax: `record Question(String text, String[] options, int correctIndex, Difficulty difficulty) {
    boolean isCorrect(int chosen) { return chosen == correctIndex; }
}

enum Difficulty { EASY, MEDIUM, HARD }

class Quiz {
    List<Question> questions;
    int score;
    void run(Scanner sc) { ... }
}`,
    code: `import java.util.*;
import java.util.stream.*;

enum Difficulty { EASY, MEDIUM, HARD }

record Question(String text, String[] options, int correctIndex, Difficulty difficulty, String explanation) {
    boolean isCorrect(int chosen) { return chosen == correctIndex; }

    void display(int num) {
        System.out.printf("%nQ%d [%s]: %s%n", num, difficulty, text);
        for (int i = 0; i < options.length; i++) {
            System.out.printf("  %c) %s%n", (char)('A' + i), options[i]);
        }
    }
}

class Quiz {
    private List<Question> questions;
    private int score = 0;
    private List<String> wrongAnswers = new ArrayList<>();

    Quiz(List<Question> questions, Difficulty filter) {
        this.questions = questions.stream()
            .filter(q -> filter == null || q.difficulty() == filter)
            .collect(Collectors.toCollection(ArrayList::new));
        Collections.shuffle(this.questions);
    }

    void run(Scanner sc) {
        if (questions.isEmpty()) { System.out.println("No questions for this filter!"); return; }

        System.out.println("╔══════════════════════════════╗");
        System.out.println("║       JAVA QUIZ APP          ║");
        System.out.println("╚══════════════════════════════╝");
        System.out.println("Questions: " + questions.size() + " | Enter A/B/C/D\n");

        long start = System.currentTimeMillis();

        for (int i = 0; i < questions.size(); i++) {
            Question q = questions.get(i);
            q.display(i + 1);

            System.out.print("Your answer: ");
            String input = sc.nextLine().trim().toUpperCase();
            int chosen = input.isEmpty() ? -1 : input.charAt(0) - 'A';

            if (q.isCorrect(chosen)) {
                System.out.println("✓ Correct!");
                score++;
            } else {
                char correct = (char)('A' + q.correctIndex());
                System.out.printf("✗ Wrong! Correct: %c) %s%n", correct, q.options()[q.correctIndex()]);
                wrongAnswers.add("Q" + (i+1) + ": " + q.text() + " → " + q.explanation());
            }
        }

        long elapsed = (System.currentTimeMillis() - start) / 1000;
        printResult(elapsed);
    }

    void printResult(long seconds) {
        int total = questions.size();
        double pct = 100.0 * score / total;
        String grade = pct >= 90 ? "A+" : pct >= 80 ? "A" : pct >= 70 ? "B" : pct >= 60 ? "C" : "F";

        System.out.println("\n╔══════════════════════════════╗");
        System.out.printf( "║  Score: %d/%d (%.0f%%) Grade: %s   %n", score, total, pct, grade);
        System.out.printf( "║  Time:  %ds%n", seconds);
        System.out.println("╚══════════════════════════════╝");

        if (!wrongAnswers.isEmpty()) {
            System.out.println("\n=== Review Wrong Answers ===");
            wrongAnswers.forEach(System.out::println);
        }
    }
}

public class QuizApp {
    static List<Question> buildQuestions() {
        return Arrays.asList(
            new Question("What is the default value of an int field in Java?",
                new String[]{"null", "0", "-1", "undefined"}, 1, Difficulty.EASY,
                "int fields default to 0"),
            new Question("Which collection maintains insertion order and allows duplicates?",
                new String[]{"HashSet", "TreeSet", "ArrayList", "HashMap"}, 2, Difficulty.EASY,
                "ArrayList maintains insertion order and allows duplicates"),
            new Question("What does the 'volatile' keyword guarantee?",
                new String[]{"Atomicity", "Visibility across threads", "Synchronization", "Immutability"}, 1, Difficulty.HARD,
                "volatile ensures visibility but not atomicity"),
            new Question("Which sorting algorithm does Arrays.sort() use for object arrays?",
                new String[]{"QuickSort", "MergeSort", "TimSort", "HeapSort"}, 2, Difficulty.MEDIUM,
                "Arrays.sort() uses TimSort for object arrays"),
            new Question("What is the time complexity of HashMap.get()?",
                new String[]{"O(n)", "O(log n)", "O(1) average", "O(n log n)"}, 2, Difficulty.MEDIUM,
                "HashMap.get() is O(1) average with a good hash function")
        );
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Question> pool = buildQuestions();

        // Simulate pre-set answers for demo
        String[] simulatedAnswers = {"B", "C", "A", "C", "C"};
        int answerIdx = 0;

        // Run quiz with simulated input
        Quiz quiz = new Quiz(pool, null);
        System.out.println("╔══════════════════════════════╗");
        System.out.println("║       JAVA QUIZ APP          ║");
        System.out.println("╚══════════════════════════════╝");
        System.out.println("Questions: " + pool.size() + " | Demo mode\n");

        int score = 0;
        List<String> wrong = new ArrayList<>();
        for (int i = 0; i < pool.size(); i++) {
            Question q = pool.get(i);
            q.display(i + 1);
            String ans = simulatedAnswers[i];
            int chosen = ans.charAt(0) - 'A';
            System.out.println("Answer: " + ans);
            if (q.isCorrect(chosen)) { System.out.println("Correct!"); score++; }
            else { System.out.println("Wrong! Answer: " + (char)('A'+q.correctIndex())); wrong.add(q.text()); }
        }
        System.out.printf("%nFinal Score: %d/%d (%.0f%%)%n", score, pool.size(), 100.0*score/pool.size());
        if (!wrong.isEmpty()) { System.out.println("Review: " + wrong); }
        sc.close();
    }
}`,
    output: `╔══════════════════════════════╗
║       JAVA QUIZ APP          ║
╚══════════════════════════════╝
Questions: 5 | Demo mode

Q1 [EASY]: What is the default value of an int field in Java?
  A) null
  B) 0
  C) -1
  D) undefined
Answer: B
Correct!

Q2 [EASY]: Which collection maintains insertion order and allows duplicates?
  A) HashSet
  B) TreeSet
  C) ArrayList
  D) HashMap
Answer: C
Correct!

Q3 [HARD]: What does the 'volatile' keyword guarantee?
  A) Atomicity
  B) Visibility across threads
  C) Synchronization
  D) Immutability
Answer: A
Wrong! Answer: B

Q4 [MEDIUM]: Which sorting algorithm does Arrays.sort() use for object arrays?
  A) QuickSort
  B) MergeSort
  C) TimSort
  D) HeapSort
Answer: C
Correct!

Q5 [MEDIUM]: What is the time complexity of HashMap.get()?
  A) O(n)
  B) O(log n)
  C) O(1) average
  D) O(n log n)
Answer: C
Correct!

Final Score: 4/5 (80%)
Review: [What does the 'volatile' keyword guarantee?]`,
    notes: [
      'Extend with Scanner for live interactive input: replace the simulated answers array with sc.nextLine() calls.',
      'Add a question bank loaded from a JSON file (using a JSON library) or a database for a production quiz system.',
      'Track analytics: store wrong answer frequency to identify concepts students struggle with most.',
      'Add a timer: capture System.currentTimeMillis() before each question and warn if over the limit.',
    ],
    practice: {
      title: 'Add Category Filtering and High Score',
      description: 'Extend the quiz to support: (1) categories (String field in Question — e.g., "OOP", "Collections", "Algorithms"); (2) filter questions by category at startup; (3) a static high score tracker (int highScore, String topPlayer) using static fields; (4) update and display high score after each game.',
      startCode: '',
      hint: 'Add category to Question record. Filter with .filter(q -> category.equals(q.category())). Use static int highScore = 0 and update if current score > highScore.',
      solution: `// Add category field to Question record
// Add static int highScore = 0; static String topPlayer = "";
// After quiz ends: if (score > highScore) { highScore = score; topPlayer = playerName; }
// Print: System.out.println("High score: " + topPlayer + " - " + highScore);`,
    },
  },
];
