import type { TutorialTopic } from './types';

export const roboticsTopics: TutorialTopic[] = [
  {
    id: 'robotics-intro',
    category: 'Robotics Basics',
    title: 'What is a Robot?',
    difficulty: 'Beginner',
    theory: [
      `A robot is a programmable machine that performs tasks autonomously or semi-autonomously. Robots combine mechanical structures, sensors to perceive the environment, and software to make decisions.`,
      `Robots range from simple devices (automated door openers) to complex systems (self-driving cars, humanoid robots). Every robot has three core components: a body (structure), sensors (eyes), and actuators (muscles).`,
      `Robotics is used in manufacturing, healthcare, exploration, agriculture, and entertainment. Learning robotics teaches you physics, electronics, programming, and problem-solving — skills crucial for engineering and AI careers.`,
    ],
    syntax: `# Pseudocode: Basic robot loop
while robot_is_on:
  sensor_data = read_sensors()
  decision = process_logic(sensor_data)
  execute_action(decision)`,
    code: `// Pseudocode: Simple obstacle avoider
function robotLoop() {
  const distance = ultrasonicSensor.read();

  if (distance > 20) {
    // Clear path ahead
    moveForward();
  } else {
    // Obstacle detected
    stopMotors();
    turnRight(90);
  }
}

// Main execution
setInterval(robotLoop, 100); // Run every 100ms`,
    output: `Robot moves forward until obstacle is detected.
When obstacle < 20cm away, robot stops and turns right 90 degrees.
Process repeats continuously.`,
    notes: [
      `Robots need feedback loops: sense → decide → act. Without this loop, robots cannot adapt.`,
      `Real robots operate in milliseconds. The loop above runs every 100ms (10 times per second).`,
      `Sensors are "eyes", actuators are "muscles" — a robot with no sensors is just a blind machine.`,
    ],
    practice: {
      title: 'Design a Simple Robot',
      description: `Describe a robot for one real-world task (e.g., watering plants, sorting objects, picking trash). List: what sensors it needs, what actuators it needs, and what its main loop would do.`,
      startCode: ``,
      hint: `Think about: What does the robot need to perceive? What actions must it take? How often should it check?`,
    },
  },

  {
    id: 'robotics-sensors',
    category: 'Sensors & Actuators',
    title: 'Sensors: The Robot\'s Eyes',
    difficulty: 'Beginner',
    theory: [
      `Sensors convert the physical world into electrical signals that a robot can understand. Common sensor types: distance (ultrasonic, IR), touch (buttons, pressure), light (photoresistor), temperature, color, camera.`,
      `Each sensor has a range and accuracy. An ultrasonic sensor works well up to 4 meters but fails in noisy conditions. A camera captures rich data but requires image processing.`,
      `Analog sensors return voltage values (0–5V). Digital sensors return 0 or 1. Most microcontrollers have both analog-to-digital (ADC) and digital input pins.`,
    ],
    syntax: `// Arduino: Read sensor values
int sensorPin = A0;           // Analog input
int buttonPin = 2;            // Digital input

int analogValue = analogRead(sensorPin);    // 0-1023
int digitalValue = digitalRead(buttonPin);  // 0 or 1`,
    code: `// Arduino: Multi-sensor reading
const int ultrasonicEcho = 3;
const int ultrasonicTrigger = 4;
const int touchButton = 2;
const int lightSensor = A0;

void setup() {
  Serial.begin(9600);
  pinMode(ultrasonicTrigger, OUTPUT);
  pinMode(ultrasonicEcho, INPUT);
  pinMode(touchButton, INPUT);
}

void loop() {
  // Read distance from ultrasonic sensor
  digitalWrite(ultrasonicTrigger, LOW);
  delayMicroseconds(2);
  digitalWrite(ultrasonicTrigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(ultrasonicTrigger, LOW);

  long duration = pulseIn(ultrasonicEcho, HIGH);
  int distance = duration * 0.034 / 2;  // Convert to cm

  // Read button state
  int buttonPressed = digitalRead(touchButton);

  // Read light intensity
  int lightLevel = analogRead(lightSensor);

  // Print all readings
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.print(" cm | Button: ");
  Serial.print(buttonPressed);
  Serial.print(" | Light: ");
  Serial.println(lightLevel);

  delay(500);
}`,
    output: `Distance: 45 cm | Button: 0 | Light: 512
Distance: 42 cm | Button: 1 | Light: 620
Distance: 40 cm | Button: 0 | Light: 498`,
    notes: [
      `pulseIn() measures the duration of a pulse — essential for ultrasonic distance calculation.`,
      `Analog values range 0–1023 on Arduino. Divide by 1023 to normalize to 0–1.`,
      `Sensor readings are noisy — use averaging or filtering for stable data.`,
    ],
    practice: {
      title: 'Design a Sensor Array',
      description: `A robot must detect light, measure distance, and detect physical touch. Write pseudocode that reads all three sensors and prints their values. What pins would you use on an Arduino?`,
      startCode: ``,
      hint: `Use analogRead() for light sensor (analog pin), digitalRead() for touch button (digital pin), and pulseIn() for ultrasonic distance.`,
    },
  },

  {
    id: 'robotics-actuators',
    category: 'Sensors & Actuators',
    title: 'Actuators: The Robot\'s Muscles',
    difficulty: 'Beginner',
    theory: [
      `Actuators are output devices that convert electrical signals into physical motion or action. Common types: DC motors (continuous rotation), servo motors (precise angle control), stepper motors (fixed steps), electromagnets, pumps.`,
      `DC motors are simple and powerful but spin continuously at one speed. Servos are slower but can hold a specific angle (0–180°). Steppers move in discrete steps — perfect for 3D printers.`,
      `Motors require more current than microcontroller pins can supply, so we use motor drivers (L298N, DRV8833) that act as intermediaries between the microcontroller and motors.`,
    ],
    syntax: `// Arduino: Control DC motor via L298N
int motorPin1 = 5;    // PWM pin
int motorPin2 = 6;    // PWM pin

analogWrite(motorPin1, 255);  // Full speed forward
analogWrite(motorPin1, 128);  // Half speed forward
analogWrite(motorPin1, 0);    // Stop

// Servo control
servo.write(90);   // Move to 90 degrees
servo.write(0);    // Move to 0 degrees
servo.write(180);  // Move to 180 degrees`,
    code: `// Arduino: DC Motor + Servo Demo
#include <Servo.h>

const int motorA = 5;
const int motorB = 6;
const int servoPin = 9;

Servo myServo;

void setup() {
  Serial.begin(9600);
  pinMode(motorA, OUTPUT);
  pinMode(motorB, OUTPUT);
  myServo.attach(servoPin);
}

void loop() {
  // DC motor: ramp up speed
  for (int speed = 0; speed <= 255; speed += 25) {
    analogWrite(motorA, speed);
    analogWrite(motorB, 0);
    Serial.print("Motor speed: ");
    Serial.println(speed);
    delay(1000);
  }

  // DC motor: stop
  analogWrite(motorA, 0);
  analogWrite(motorB, 0);
  delay(1000);

  // Servo: sweep through angles
  for (int angle = 0; angle <= 180; angle += 10) {
    myServo.write(angle);
    Serial.print("Servo angle: ");
    Serial.println(angle);
    delay(200);
  }

  for (int angle = 180; angle >= 0; angle -= 10) {
    myServo.write(angle);
    delay(200);
  }

  delay(2000);
}`,
    output: `Motor speed: 0
Motor speed: 25
Motor speed: 50
Motor speed: 75
Motor speed: 100
Motor speed: 125
Motor speed: 150
Motor speed: 175
Motor speed: 200
Motor speed: 225
Motor speed: 255
Servo angle: 0
Servo angle: 10
... (continues to 180, then back to 0)`,
    notes: [
      `PWM (Pulse Width Modulation) on pins 5, 6, 9, 10 controls motor speed (0–255).`,
      `Servo.attach() must be called before servo.write(). Servos use PWM signals but at specific frequencies.`,
      `Never draw current directly from microcontroller pins — always use a motor driver!`,
    ],
    practice: {
      title: 'Actuator Control Sequence',
      description: `Write code that: turns a DC motor on for 3 seconds at 50% speed, stops it, then sweeps a servo from 0° to 180° and back, slowly. Print status messages at each step.`,
      startCode: ``,
      hint: `Use analogWrite() for DC motor speed control and myServo.write() for angle. delay() creates pauses between actions.`,
    },
  },

  {
    id: 'robotics-motors',
    category: 'Sensors & Actuators',
    title: 'DC vs Servo vs Stepper Motors',
    difficulty: 'Intermediate',
    theory: [
      `DC motors spin continuously in one direction at a speed determined by voltage. They're cheap, powerful, and fast — ideal for wheels and propellers. Drawback: no position feedback.`,
      `Servo motors hold a specific angle (0–180°). They're precise and slow, perfect for robotic arms, camera pan-tilt, or gripper control. Built-in feedback allows position control.`,
      `Stepper motors move in discrete steps (e.g., 200 steps per revolution). Each electrical pulse moves one step. They're precise but slow — common in 3D printers and CNC machines.`,
    ],
    syntax: `// DC Motor: Speed control (PWM)
analogWrite(motorPin, 200);  // Faster

// Servo: Angle control
servo.write(90);  // Hold 90 degrees

// Stepper: Step control (pseudocode)
for (i = 0; i < 200; i++) {
  step_motor_one_step();
}`,
    code: `// Arduino: Compare all three motor types
#include <Servo.h>

const int dcPin = 5;
const int dcPin2 = 6;
const int servoPin = 9;
const int stepperPulse = 11;
const int stepperDir = 12;

Servo myServo;

void setup() {
  Serial.begin(9600);
  pinMode(dcPin, OUTPUT);
  pinMode(dcPin2, OUTPUT);
  pinMode(stepperPulse, OUTPUT);
  pinMode(stepperDir, OUTPUT);
  myServo.attach(servoPin);
}

void loop() {
  // DC Motor: Variable speed
  Serial.println("=== DC Motor ===");
  for (int speed = 50; speed <= 255; speed += 50) {
    analogWrite(dcPin, speed);
    analogWrite(dcPin2, 0);
    Serial.print("Speed: ");
    Serial.println(speed);
    delay(1000);
  }
  analogWrite(dcPin, 0);
  delay(1000);

  // Servo: Precise angle
  Serial.println("=== Servo Motor ===");
  int angles[] = {0, 45, 90, 135, 180};
  for (int i = 0; i < 5; i++) {
    myServo.write(angles[i]);
    Serial.print("Angle: ");
    Serial.println(angles[i]);
    delay(1000);
  }
  delay(1000);

  // Stepper: Fixed steps (pseudocode simulation)
  Serial.println("=== Stepper Motor ===");
  digitalWrite(stepperDir, HIGH);
  for (int step = 0; step < 200; step++) {
    digitalWrite(stepperPulse, HIGH);
    delayMicroseconds(500);
    digitalWrite(stepperPulse, LOW);
    delayMicroseconds(500);
    if (step % 50 == 0) {
      Serial.print("Steps: ");
      Serial.println(step);
    }
  }
  delay(2000);
}`,
    output: `=== DC Motor ===
Speed: 50
Speed: 100
Speed: 150
Speed: 200
Speed: 255
=== Servo Motor ===
Angle: 0
Angle: 45
Angle: 90
Angle: 135
Angle: 180
=== Stepper Motor ===
Steps: 0
Steps: 50
Steps: 100
Steps: 150`,
    notes: [
      `DC motors: Fast, powerful, no feedback. Good for locomotion.`,
      `Servos: Slow, precise, hold position. Good for arms and pan-tilt.`,
      `Steppers: Very precise, can stall. Good for CNC and 3D printers.`,
    ],
    practice: {
      title: 'Motor Selection for Tasks',
      description: `For each task, choose the best motor (DC, servo, or stepper): (1) rotating robot wheels, (2) positioning a robotic arm, (3) moving an X-Y plotter. Justify your choice.`,
      startCode: ``,
      hint: `Consider speed, precision, power needs, and cost for each task.`,
    },
  },

  {
    id: 'robotics-ultrasonic',
    category: 'Sensors & Actuators',
    title: 'Ultrasonic Distance Sensor',
    difficulty: 'Beginner',
    theory: [
      `Ultrasonic sensors emit high-frequency sound waves (40 kHz) and measure the time it takes for echoes to return. Distance = speed of sound × time / 2.`,
      `Range: typically 2 cm to 4 meters. Very reliable in open air but fails in foggy/dusty conditions. No moving parts — robust and long-lasting.`,
      `Most common module: HC-SR04 with 4 pins: VCC (5V), GND, TRIG (send pulse), ECHO (receive pulse).`,
    ],
    syntax: `// HC-SR04 Ultrasonic
const int trigPin = 4;
const int echoPin = 3;

digitalWrite(trigPin, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin, LOW);

long duration = pulseIn(echoPin, HIGH);
int distance = duration * 0.034 / 2;  // cm`,
    code: `// Arduino: Ultrasonic Distance Meter
const int trigPin = 4;
const int echoPin = 3;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Send pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Measure echo time
  long duration = pulseIn(echoPin, HIGH);

  // Convert to distance (speed of sound ≈ 343 m/s)
  int distance = duration * 0.034 / 2;

  // Display result
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  // Simple feedback
  if (distance < 10) {
    Serial.println("WARNING: Very close!");
  } else if (distance < 20) {
    Serial.println("Close");
  } else if (distance < 50) {
    Serial.println("Medium distance");
  } else {
    Serial.println("Far");
  }

  delay(500);
}`,
    output: `Distance: 45 cm
Medium distance
Distance: 22 cm
Close
Distance: 8 cm
WARNING: Very close!
Distance: 120 cm
Far`,
    notes: [
      `The multiplier 0.034 comes from: 343 m/s ÷ 1,000,000 μs/s ÷ 2 (round trip).`,
      `Always delay at least 60 μs between measurements to avoid interference.`,
      `Soft objects (foam, cloth) absorb sound — use hard reflective surfaces for testing.`,
    ],
    practice: {
      title: 'Distance Alert System',
      description: `Write code that reads ultrasonic distance continuously and: prints "SAFE" if > 30 cm, "CAUTION" if 10–30 cm, and "ALERT" if < 10 cm. Test by moving your hand toward/away from the sensor.`,
      startCode: ``,
      hint: `Use if-else statements to categorize distance into safety zones. Take multiple readings for stability.`,
    },
  },

  {
    id: 'robotics-ir-sensor',
    category: 'Sensors & Actuators',
    title: 'IR Proximity Sensor',
    difficulty: 'Beginner',
    theory: [
      `IR (Infrared) sensors detect light in the infrared spectrum. A transmitter LED emits IR light; a receiver detects reflections. Range: typically 2–30 cm, much shorter than ultrasonic.`,
      `IR sensors are fast (no travel time to measure), consume minimal power, and are cheap. Drawback: affected by ambient light and reflectivity of objects.`,
      `Two types: analog (voltage increases with proximity) and digital (binary detect/not-detect). Analog versions are more flexible.`,
    ],
    syntax: `// Analog IR sensor
const int irPin = A0;
int proximity = analogRead(irPin);  // 0-1023

if (proximity > 500) {
  Serial.println("Object detected!");
}`,
    code: `// Arduino: Analog IR Sensor
const int irPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int irValue = analogRead(irPin);

  // Map to distance (rough calibration)
  // IR value 900 = ~2cm, IR value 200 = ~20cm
  int distance = map(irValue, 900, 200, 2, 20);
  distance = constrain(distance, 2, 20);

  Serial.print("IR Value: ");
  Serial.print(irValue);
  Serial.print(" | Distance: ~");
  Serial.print(distance);
  Serial.println(" cm");

  // Simple obstacle detection
  if (irValue > 700) {
    Serial.println("⚠️  Object VERY close (< 5 cm)");
  } else if (irValue > 400) {
    Serial.println("⚠️  Object nearby (< 10 cm)");
  } else if (irValue > 200) {
    Serial.println("✓ Safe distance");
  } else {
    Serial.println("✓ Clear path");
  }

  delay(300);
}`,
    output: `IR Value: 850 | Distance: ~2 cm
⚠️  Object VERY close (< 5 cm)
IR Value: 550 | Distance: ~10 cm
⚠️  Object nearby (< 10 cm)
IR Value: 250 | Distance: ~18 cm
✓ Safe distance
IR Value: 100 | Distance: ~20 cm
✓ Clear path`,
    notes: [
      `IR sensors need calibration — values depend on surface color and reflectivity.`,
      `map() function rescales raw values to meaningful units. constrain() prevents out-of-range values.`,
      `IR sensors work well in low light but fail in bright sunlight — test carefully.`,
    ],
    practice: {
      title: 'Line Tracer Sensor Test',
      description: `Wire an IR sensor below a robot. Read values when the sensor is over white paper (no reflection) and over black paper (strong reflection). Calculate the threshold value for line detection.`,
      startCode: ``,
      hint: `Record raw IR values for white and black surfaces. Threshold = (white_value + black_value) / 2.`,
    },
  },

  {
    id: 'robotics-touch-sensor',
    category: 'Sensors & Actuators',
    title: 'Touch & Button Sensors',
    difficulty: 'Beginner',
    theory: [
      `Touch sensors (buttons, switches) are the simplest digital sensors. They return 0 (not pressed) or 1 (pressed). Used for collision detection, mode selection, or emergency stop.`,
      `A pushbutton is just a switch that creates/breaks a circuit. When wired with a pull-up resistor, pressing the button pulls the pin LOW (active-low logic).`,
      `Debouncing is essential: mechanical switches "bounce" (make/break contact multiple times) in ~10–20 ms. Software debouncing avoids false triggers.`,
    ],
    syntax: `// Arduino: Button with pull-up
const int buttonPin = 2;

pinMode(buttonPin, INPUT_PULLUP);
int buttonState = digitalRead(buttonPin);

if (buttonState == LOW) {  // Button pressed
  Serial.println("Button pressed!");
}`,
    code: `// Arduino: Button with debouncing
const int buttonPin = 2;
const int debounceDelay = 50;  // 50ms

int lastButtonState = HIGH;
int buttonState = HIGH;
unsigned long lastDebounceTime = 0;
int pressCount = 0;

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  int reading = digitalRead(buttonPin);

  // If button state changed, reset debounce timer
  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }

  // If stable for debounceDelay ms, update state
  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonState) {
      buttonState = reading;

      // Button was pressed (transition from HIGH to LOW)
      if (buttonState == LOW) {
        pressCount++;
        Serial.print("Button pressed! Count: ");
        Serial.println(pressCount);
      }
    }
  }

  lastButtonState = reading;

  // Print current state every 1 second
  static unsigned long lastPrint = 0;
  if (millis() - lastPrint > 1000) {
    Serial.print("Current state: ");
    Serial.println(buttonState == LOW ? "PRESSED" : "RELEASED");
    lastPrint = millis();
  }
}`,
    output: `Button pressed! Count: 1
Current state: PRESSED
Current state: RELEASED
Button pressed! Count: 2
Current state: PRESSED
Current state: RELEASED`,
    notes: [
      `INPUT_PULLUP enables the internal pull-up resistor — pin reads HIGH when open, LOW when pressed.`,
      `Debouncing avoids false triggers from mechanical bouncing. 50 ms is a safe debounce time.`,
      `Use millis() for timing without blocking the rest of the code (non-blocking debounce).`,
    ],
    practice: {
      title: 'Multi-Button State Machine',
      description: `Wire 2 buttons: one to increment a counter, one to reset it to 0. Print the counter value whenever it changes. Use debouncing to avoid false counts.`,
      startCode: ``,
      hint: `Use separate debounce timers for each button. Only count transitions from HIGH to LOW.`,
    },
  },

  {
    id: 'robotics-camera',
    category: 'Sensors & Actuators',
    title: 'Camera & Vision Basics',
    difficulty: 'Intermediate',
    theory: [
      `Cameras capture rich visual data but require image processing to extract useful information. Common types: webcam (USB), OV7670 (I2C/SPI), camera modules (Raspberry Pi CSI).`,
      `Vision tasks: object detection (find location of target), color tracking (follow red ball), marker detection (find ArUco codes), shape recognition.`,
      `OpenCV is the industry standard library for computer vision. Python + OpenCV is powerful and beginner-friendly. Real-time processing requires optimization.`,
    ],
    syntax: `# Python: OpenCV basics
import cv2
import numpy as np

cap = cv2.VideoCapture(0)  # Open webcam
ret, frame = cap.read()     # Capture frame

# Detect red color in HSV space
hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
lower_red = np.array([0, 100, 100])
upper_red = np.array([10, 255, 255])
mask = cv2.inRange(hsv, lower_red, upper_red)

cv2.imshow("Red Detection", mask)`,
    code: `# Python: Track red ball with OpenCV
import cv2
import numpy as np

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 320)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 240)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convert BGR to HSV
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Define red color range in HSV
    lower_red1 = np.array([0, 100, 100])
    upper_red1 = np.array([10, 255, 255])
    lower_red2 = np.array([170, 100, 100])
    upper_red2 = np.array([180, 255, 255])

    # Create mask for red
    mask1 = cv2.inRange(hsv, lower_red1, upper_red1)
    mask2 = cv2.inRange(hsv, lower_red2, upper_red2)
    mask = cv2.bitwise_or(mask1, mask2)

    # Find contours
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # Find largest contour (the ball)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        (x, y), radius = cv2.minEnclosingCircle(largest)

        if radius > 5:  # Ignore noise
            cv2.circle(frame, (int(x), int(y)), int(radius), (0, 255, 0), 2)
            print(f"Ball at: ({int(x)}, {int(y)}) Radius: {int(radius)}")

    # Display
    cv2.imshow("Original", frame)
    cv2.imshow("Red Mask", mask)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()`,
    output: `Ball at: (150, 120) Radius: 25
Ball at: (155, 118) Radius: 26
Ball at: (160, 125) Radius: 24
Ball detected and tracked continuously in video feed`,
    notes: [
      `HSV color space is better than BGR for color detection — it's robust to lighting changes.`,
      `Morphological operations (erode, dilate) clean up noisy masks.`,
      `FPS (frames per second) depends on image resolution and processing complexity. Start with 320×240 for speed.`,
    ],
    practice: {
      title: 'Color Detection and Tracking',
      description: `Write code to detect and track a blue object (ball, marker, etc.) using OpenCV. Print the center coordinates and circle size when detected. Test with different lighting.`,
      startCode: ``,
      hint: `Use cv2.inRange() with HSV bounds for blue, find contours, and compute the center using moments or minEnclosingCircle().`,
    },
  },

  {
    id: 'robotics-arduino-intro',
    category: 'Microcontrollers',
    title: 'Arduino Basics & Setup',
    difficulty: 'Beginner',
    theory: [
      `Arduino is an open-source microcontroller platform: a small, programmable computer that runs your code. Popular boards: Arduino Uno (beginner-friendly), Nano (compact), Mega (many pins).`,
      `Arduino IDE (Integrated Development Environment) is where you write, compile, and upload code. Programs are called "sketches". The basic structure: setup() runs once, loop() runs repeatedly.`,
      `Pins are digital (0/1) or analog (0–1023). PWM pins enable variable power output. Serial communication (USB) lets you see debug messages.`,
    ],
    syntax: `// Arduino sketch structure
void setup() {
  Serial.begin(9600);    // Initialize serial at 9600 baud
  pinMode(13, OUTPUT);   // Set pin 13 as output
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}`,
    code: `// Arduino: Blink LED & Serial Monitor Demo
void setup() {
  Serial.begin(9600);          // Start serial communication
  pinMode(13, OUTPUT);         // Built-in LED on pin 13
  Serial.println("Arduino started!");
  Serial.println("Blinking LED...");
}

void loop() {
  // Turn LED on
  digitalWrite(13, HIGH);
  Serial.println("LED: ON");
  delay(1000);

  // Turn LED off
  digitalWrite(13, LOW);
  Serial.println("LED: OFF");
  delay(1000);
}`,
    output: `Arduino started!
Blinking LED...
LED: ON
LED: OFF
LED: ON
LED: OFF
(continues indefinitely)`,
    notes: [
      `delay() pauses execution in milliseconds. 1000 ms = 1 second.`,
      `Serial Monitor (Ctrl+Shift+M in IDE) displays Serial.print() output. Must set correct baud rate (9600 is standard).`,
      `Pin 13 has a built-in resistor and LED — safe to blink without extra components.`,
    ],
    practice: {
      title: 'LED SOS Signal',
      description: `Program an Arduino to blink an LED in SOS Morse code: 3 short blinks, 3 long blinks, 3 short blinks, then a pause. Repeat. Print "SOS" to Serial Monitor each cycle.`,
      startCode: ``,
      hint: `S = 3 × 200ms blink. O = 3 × 600ms blink. Use delay() between blinks and longer pauses between letters.`,
    },
  },

  {
    id: 'robotics-arduino-setup',
    category: 'Microcontrollers',
    title: 'Setting Up Arduino & First Upload',
    difficulty: 'Beginner',
    theory: [
      `Arduino setup involves: (1) Installing IDE from arduino.cc, (2) Connecting board via USB, (3) Selecting board model in Tools menu, (4) Selecting COM port, (5) Writing and uploading code.`,
      `The bootloader is pre-installed firmware that allows code upload via USB. It runs briefly at startup. If upload fails, check board model, port, drivers, or USB cable.`,
      `Boards are available in variants: Arduino Uno (beginner), Pro Mini (compact), Due (faster), Mega (56 I/O pins). Pick based on your project needs.`,
    ],
    syntax: `// Check Arduino version
void setup() {
  Serial.begin(9600);
  Serial.println("Arduino Board Test");
  Serial.print("Running sketch...");
}

void loop() {
  // Code here
}`,
    code: `// Arduino: Board Verification & Pin Test
void setup() {
  Serial.begin(9600);
  Serial.println("=== Arduino Setup Complete ===");
  Serial.println("Board is responding!");

  // Set multiple pins as output
  for (int pin = 8; pin <= 13; pin++) {
    pinMode(pin, OUTPUT);
    Serial.print("Pin ");
    Serial.print(pin);
    Serial.println(" set as OUTPUT");
  }

  Serial.println("=== System Ready ===");
}

void loop() {
  // Test all output pins
  for (int pin = 8; pin <= 13; pin++) {
    digitalWrite(pin, HIGH);
    Serial.print("Pin ");
    Serial.print(pin);
    Serial.println(" is HIGH");
    delay(500);
    digitalWrite(pin, LOW);
  }

  delay(2000);
}`,
    output: `=== Arduino Setup Complete ===
Board is responding!
Pin 8 set as OUTPUT
Pin 9 set as OUTPUT
Pin 10 set as OUTPUT
Pin 11 set as OUTPUT
Pin 12 set as OUTPUT
Pin 13 set as OUTPUT
=== System Ready ===
Pin 8 is HIGH
Pin 8 is LOW
Pin 9 is HIGH
...`,
    notes: [
      `Always check Tools > Board and Tools > Port before uploading.`,
      `If upload fails, try different USB cables and ports. Some cables are data-only and won't upload code.`,
      `Unplug power before wiring sensors to avoid accidental shorts.`,
    ],
    practice: {
      title: 'Multi-Pin Setup Test',
      description: `Write code that: (1) initializes pins 8–13 as outputs, (2) prints a startup message to Serial, (3) cycles through each pin, lighting them one at a time, (4) prints pin status to Serial.`,
      startCode: ``,
      hint: `Use a loop to initialize pins. Use another loop in loop() to cycle through them. Include delays between transitions.`,
    },
  },

  {
    id: 'robotics-led-blink',
    category: 'Robot Programming',
    title: 'LED Blink Project',
    difficulty: 'Beginner',
    theory: [
      `An LED (Light Emitting Diode) emits light when current flows through it. LEDs are directional: the longer leg (anode, +) connects to power, the shorter leg (cathode, −) connects to ground.`,
      `Always use a current-limiting resistor (220Ω–470Ω) in series with the LED to prevent burnout. The resistor reduces current to safe levels.`,
      `Blinking is a fundamental technique: digital output HIGH (5V) turns LED on, LOW (0V) turns it off. Repeated toggling creates a blink effect.`,
    ],
    syntax: `// LED control
const int LED_PIN = 13;

pinMode(LED_PIN, OUTPUT);

digitalWrite(LED_PIN, HIGH);   // Turn on
digitalWrite(LED_PIN, LOW);    // Turn off`,
    code: `// Arduino: Variable Speed LED Blink
const int LED_PIN = 13;

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  Serial.println("LED initialized");
}

void loop() {
  // Fast blink: 200ms on, 200ms off
  Serial.println("Fast blink (200ms):");
  for (int i = 0; i < 5; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(200);
    digitalWrite(LED_PIN, LOW);
    delay(200);
  }

  delay(1000);

  // Medium blink: 500ms on, 500ms off
  Serial.println("Medium blink (500ms):");
  for (int i = 0; i < 5; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(500);
    digitalWrite(LED_PIN, LOW);
    delay(500);
  }

  delay(1000);

  // Slow blink: 1000ms on, 1000ms off
  Serial.println("Slow blink (1000ms):");
  for (int i = 0; i < 5; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(1000);
    digitalWrite(LED_PIN, LOW);
    delay(1000);
  }

  delay(2000);
}`,
    output: `LED initialized
Fast blink (200ms):
(LED blinks rapidly)
Medium blink (500ms):
(LED blinks at medium speed)
Slow blink (1000ms):
(LED blinks slowly)`,
    notes: [
      `Always include a current-limiting resistor in series with the LED.`,
      `The delay times determine blink frequency. Faster delays = faster blink.`,
      `An LED is a one-way device. If it doesn't light, reverse the wires.`,
    ],
    practice: {
      title: 'Custom Blink Pattern',
      description: `Create a custom blink pattern: 3 short blinks (100ms each), pause (300ms), 2 long blinks (500ms each), long pause (1000ms). Repeat continuously and print pattern names to Serial.`,
      startCode: ``,
      hint: `Use variables for timing values (shortBlink, longBlink, pause) to keep code clean. Print at the start of each pattern cycle.`,
    },
  },

  {
    id: 'robotics-sensor-reading',
    category: 'Robot Programming',
    title: 'Reading Sensors with Arduino',
    difficulty: 'Intermediate',
    theory: [
      `Sensor reading combines input (analogRead, digitalRead) and interpretation. Analog sensors give 0–1023 values; digital sensors give 0 or 1.`,
      `Sensor fusion combines multiple sensor inputs to make robust decisions. Example: if ultrasonic AND button both trigger, action is more reliable than one sensor alone.`,
      `Data logging (storing sensor readings) helps debug and optimize robot behavior. Use arrays to buffer data, then analyze patterns.`,
    ],
    syntax: `// Multi-sensor reading
int analog = analogRead(A0);    // 0-1023
int digital = digitalRead(2);   // 0 or 1

if (analog > 512) {
  Serial.println("Bright");
}`,
    code: `// Arduino: Multi-sensor Logging
const int sensorPin = A0;
const int buttonPin = 2;
const int maxReadings = 100;

int readings[maxReadings];
int readIndex = 0;

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  int sensorValue = analogRead(sensorPin);
  int buttonState = digitalRead(buttonPin);

  // Store reading in array
  if (readIndex < maxReadings) {
    readings[readIndex] = sensorValue;
    readIndex++;
  }

  // Print current reading
  Serial.print("Sensor: ");
  Serial.print(sensorValue);
  Serial.print(" | Button: ");
  Serial.println(buttonState == LOW ? "PRESSED" : "RELEASED");

  // If button pressed, print statistics
  if (buttonState == LOW) {
    delay(50);  // Debounce
    if (digitalRead(buttonPin) == LOW) {
      printStatistics();
      readIndex = 0;  // Reset
    }
  }

  delay(100);
}

void printStatistics() {
  if (readIndex == 0) return;

  int minVal = readings[0];
  int maxVal = readings[0];
  long sum = 0;

  for (int i = 0; i < readIndex; i++) {
    sum += readings[i];
    if (readings[i] < minVal) minVal = readings[i];
    if (readings[i] > maxVal) maxVal = readings[i];
  }

  int avgVal = sum / readIndex;

  Serial.println("=== Sensor Statistics ===");
  Serial.print("Min: ");
  Serial.println(minVal);
  Serial.print("Max: ");
  Serial.println(maxVal);
  Serial.print("Avg: ");
  Serial.println(avgVal);
  Serial.print("Readings: ");
  Serial.println(readIndex);
}`,
    output: `Sensor: 412 | Button: RELEASED
Sensor: 415 | Button: RELEASED
Sensor: 420 | Button: RELEASED
Sensor: 418 | Button: PRESSED
=== Sensor Statistics ===
Min: 412
Max: 420
Avg: 416
Readings: 4`,
    notes: [
      `Array storage allows analysis after data collection. Useful for calibration and debugging.`,
      `sum should be a long to avoid integer overflow with large values.`,
      `Reset readings array after printing to log new data.`,
    ],
    practice: {
      title: 'Sensor Calibration Logger',
      description: `Read a light sensor 50 times over 5 seconds. When done, print min, max, and average values. Repeat 3 times and compare results for consistent calibration.`,
      startCode: ``,
      hint: `Use an array to store 50 readings. After each 50-reading cycle, compute min/max/avg. delay(100) between readings gives ~5 seconds total.`,
    },
  },

  {
    id: 'robotics-motor-control',
    category: 'Robot Programming',
    title: 'Controlling Motors',
    difficulty: 'Intermediate',
    theory: [
      `Motor control requires: (1) power supply (enough current for motor), (2) motor driver (interfaces microcontroller to motor), (3) PWM signal (varies speed).`,
      `The L298N is a popular dual-motor driver. It has two motor outputs (each controlled by 2 pins: direction + speed). PWM on the speed pin ranges 0–255 for 0–100% power.`,
      `Differential drive (two motors, independent control) is standard for mobile robots. Left/right speed difference = turning.`,
    ],
    syntax: `// L298N Motor Driver
const int motorAPin1 = 5;   // PWM
const int motorAPin2 = 6;
const int motorBPin1 = 9;   // PWM
const int motorBPin2 = 10;

// Move forward at 200/255 speed
analogWrite(motorAPin1, 200);
digitalWrite(motorAPin2, LOW);
analogWrite(motorBPin1, 200);
digitalWrite(motorBPin2, LOW);`,
    code: `// Arduino: Differential Drive Robot
const int motorAPin1 = 5;
const int motorAPin2 = 6;
const int motorBPin1 = 9;
const int motorBPin2 = 10;

void setup() {
  Serial.begin(9600);
  pinMode(motorAPin1, OUTPUT);
  pinMode(motorAPin2, OUTPUT);
  pinMode(motorBPin1, OUTPUT);
  pinMode(motorBPin2, OUTPUT);
}

void moveForward(int speed) {
  analogWrite(motorAPin1, speed);
  digitalWrite(motorAPin2, LOW);
  analogWrite(motorBPin1, speed);
  digitalWrite(motorBPin2, LOW);
  Serial.println("Moving FORWARD");
}

void moveBackward(int speed) {
  digitalWrite(motorAPin1, LOW);
  analogWrite(motorAPin2, speed);
  digitalWrite(motorBPin1, LOW);
  analogWrite(motorBPin2, speed);
  Serial.println("Moving BACKWARD");
}

void turnLeft(int speed) {
  analogWrite(motorAPin1, speed);
  digitalWrite(motorAPin2, LOW);
  digitalWrite(motorBPin1, LOW);
  analogWrite(motorBPin2, speed);
  Serial.println("Turning LEFT");
}

void turnRight(int speed) {
  digitalWrite(motorAPin1, LOW);
  analogWrite(motorAPin2, speed);
  analogWrite(motorBPin1, speed);
  digitalWrite(motorBPin2, LOW);
  Serial.println("Turning RIGHT");
}

void stopMotors() {
  digitalWrite(motorAPin1, LOW);
  digitalWrite(motorAPin2, LOW);
  digitalWrite(motorBPin1, LOW);
  digitalWrite(motorBPin2, LOW);
  Serial.println("STOPPED");
}

void loop() {
  moveForward(200);
  delay(2000);

  turnRight(150);
  delay(1000);

  moveForward(200);
  delay(2000);

  turnLeft(150);
  delay(1000);

  stopMotors();
  delay(1000);
}`,
    output: `Moving FORWARD
Turning RIGHT
Moving FORWARD
Turning LEFT
STOPPED`,
    notes: [
      `PWM pins on Arduino: 3, 5, 6, 9, 10, 11. These support analogWrite().`,
      `L298N draws significant current — use external power supply, not USB.`,
      `Differential drive: turn = difference in wheel speeds. Same speeds = forward/backward.`,
    ],
    practice: {
      title: 'Square Path Robot',
      description: `Program a robot to move in a square: forward 2s, turn right 1s, repeat 4 times. Vary speed each iteration (decreasing). Print each movement to Serial.`,
      startCode: ``,
      hint: `Create helper functions (moveForward, turnRight, stopMotors). Use a loop to repeat 4 times with decreasing speed parameter.`,
    },
  },

  {
    id: 'robotics-servo-control',
    category: 'Robot Programming',
    title: 'Servo Control',
    difficulty: 'Intermediate',
    theory: [
      `Servo motors hold a specific angle. A pulse signal (1000–2000 μs) sets the position. Width = angle: 1000 μs → 0°, 1500 μs → 90°, 2000 μs → 180°.`,
      `The Servo library (Arduino standard) handles PWM signal generation automatically. Just attach() and write(angle).`,
      `Servos are slow (~60°/second) but precise and power-efficient. Common use cases: robotic arm joints, camera pan-tilt, gripper control.`,
    ],
    syntax: `#include <Servo.h>

Servo myServo;
const int servoPin = 9;

void setup() {
  myServo.attach(servoPin);
}

void loop() {
  myServo.write(90);   // Move to 90 degrees
  delay(500);
}`,
    code: `// Arduino: Servo Sweep & Position Control
#include <Servo.h>

Servo armServo;
Servo panServo;

const int armPin = 9;
const int panPin = 10;

void setup() {
  Serial.begin(9600);
  armServo.attach(armPin);
  panServo.attach(panPin);

  // Home position
  armServo.write(90);
  panServo.write(90);
  Serial.println("Servos homed");
}

void loop() {
  // Sweep arm servo
  Serial.println("=== Arm Sweep ===");
  for (int angle = 0; angle <= 180; angle += 10) {
    armServo.write(angle);
    Serial.print("Arm: ");
    Serial.println(angle);
    delay(150);
  }

  for (int angle = 180; angle >= 0; angle -= 10) {
    armServo.write(angle);
    Serial.print("Arm: ");
    Serial.println(angle);
    delay(150);
  }

  // Pan servo at different positions
  Serial.println("=== Pan Positions ===");
  int positions[] = {0, 45, 90, 135, 180};
  for (int i = 0; i < 5; i++) {
    panServo.write(positions[i]);
    Serial.print("Pan: ");
    Serial.println(positions[i]);
    delay(500);
  }

  delay(1000);
}`,
    output: `Servos homed
=== Arm Sweep ===
Arm: 0
Arm: 10
Arm: 20
...
Arm: 180
=== Pan Positions ===
Pan: 0
Pan: 45
Pan: 90
Pan: 135
Pan: 180`,
    notes: [
      `Servo.write() expects 0–180 degrees. Values outside range are clamped.`,
      `Servos need consistent 5V power. Brown = GND, Red = 5V, Yellow/Orange = Signal.`,
      `Multiple servos can share the same power but may need separate power supply if current exceeds 500mA.`,
    ],
    practice: {
      title: 'Pan-Tilt Camera Mount',
      description: `Create a pan-tilt mount with two servos (one for horizontal pan, one for vertical tilt). Sweep both axes and return to home (90°, 90°). Print current angles to Serial.`,
      startCode: ``,
      hint: `Use nested loops: outer for pan positions, inner for tilt positions. Include a home() function to reset both to 90°.`,
    },
  },

  {
    id: 'robotics-bluetooth',
    category: 'Robot Programming',
    title: 'Bluetooth Module HC-05',
    difficulty: 'Intermediate',
    theory: [
      `The HC-05 is a popular Bluetooth module that enables wireless communication between Arduino and phones/computers. It uses serial communication (TX, RX pins).`,
      `HC-05 wiring: VCC (5V), GND, TX (to RX), RX (to TX via voltage divider, since HC-05 is 3.3V logic). Use SoftwareSerial to communicate.`,
      `A paired phone can send/receive data wirelessly. Common use: mobile robot remote control, data logging, status display.`,
    ],
    syntax: `#include <SoftwareSerial.h>

SoftwareSerial BTSerial(10, 11);  // RX, TX

void setup() {
  BTSerial.begin(9600);
}

void loop() {
  if (BTSerial.available()) {
    char command = BTSerial.read();
    // Process command
  }
}`,
    code: `// Arduino: HC-05 Robot Control
#include <SoftwareSerial.h>

SoftwareSerial BTSerial(10, 11);  // RX on 10, TX on 11

// Motor pins
const int motorAPin1 = 5;
const int motorAPin2 = 6;
const int motorBPin1 = 9;
const int motorBPin2 = 3;

void setup() {
  Serial.begin(9600);
  BTSerial.begin(9600);

  pinMode(motorAPin1, OUTPUT);
  pinMode(motorAPin2, OUTPUT);
  pinMode(motorBPin1, OUTPUT);
  pinMode(motorBPin2, OUTPUT);

  Serial.println("Bluetooth Robot Ready");
}

void loop() {
  if (BTSerial.available()) {
    char command = BTSerial.read();

    switch(command) {
      case 'F':  // Forward
        analogWrite(motorAPin1, 200);
        digitalWrite(motorAPin2, LOW);
        analogWrite(motorBPin1, 200);
        digitalWrite(motorBPin2, LOW);
        Serial.println("Moving FORWARD");
        break;

      case 'B':  // Backward
        digitalWrite(motorAPin1, LOW);
        analogWrite(motorAPin2, 200);
        digitalWrite(motorBPin1, LOW);
        analogWrite(motorBPin2, 200);
        Serial.println("Moving BACKWARD");
        break;

      case 'L':  // Left
        analogWrite(motorAPin1, 200);
        digitalWrite(motorAPin2, LOW);
        digitalWrite(motorBPin1, LOW);
        analogWrite(motorBPin2, 200);
        Serial.println("Turning LEFT");
        break;

      case 'R':  // Right
        digitalWrite(motorAPin1, LOW);
        analogWrite(motorAPin2, 200);
        analogWrite(motorBPin1, 200);
        digitalWrite(motorBPin2, LOW);
        Serial.println("Turning RIGHT");
        break;

      case 'S':  // Stop
        digitalWrite(motorAPin1, LOW);
        digitalWrite(motorAPin2, LOW);
        digitalWrite(motorBPin1, LOW);
        digitalWrite(motorBPin2, LOW);
        Serial.println("STOPPED");
        break;
    }

    // Echo back to phone
    BTSerial.write(command);
  }
}`,
    output: `Bluetooth Robot Ready
Moving FORWARD
Turning RIGHT
Moving FORWARD
STOPPED`,
    notes: [
      `HC-05 RX pin is 3.3V. Connect via voltage divider: 1kΩ to HC-05, 2kΩ to GND from Arduino TX.`,
      `Default baud rate is 9600. Some modules can be reprogrammed with AT commands.`,
      `Test with free app like "Serial Bluetooth Terminal" on Android or similar on iOS.`,
    ],
    practice: {
      title: 'Wireless Robot Controller',
      description: `Create a Bluetooth-controlled robot: send 'F', 'B', 'L', 'R', 'S' from a phone app to move forward, backward, left, right, or stop. Include feedback messages to the app.`,
      startCode: ``,
      hint: `Use a switch statement to handle different commands. Echo the received command back to show it was received.`,
    },
  },

  {
    id: 'robotics-line-follower',
    category: 'Advanced Robotics',
    title: 'Line Following Robot Logic',
    difficulty: 'Intermediate',
    theory: [
      `A line-following robot detects a black line (dark) on white background (or vice versa) using IR sensors. Typical setup: 2–3 IR sensors under the robot.`,
      `Logic: if middle sensor sees line, go straight. If left sensor sees line, turn left. If right sensor sees line, turn right. Speed-based turning offers smoother control.`,
      `Proportional control: turn speed proportional to error from line. Example: far left = maximum left turn; slightly left = gentle left turn.`,
    ],
    syntax: `// Line follower: 3-sensor setup
const int leftSensor = A0;
const int midSensor = A1;
const int rightSensor = A2;

int threshold = 500;

void loop() {
  int left = analogRead(leftSensor) > threshold;
  int mid = analogRead(midSensor) > threshold;
  int right = analogRead(rightSensor) > threshold;

  if (mid) {
    moveForward(200);
  } else if (left) {
    turnLeft(200);
  } else if (right) {
    turnRight(200);
  }
}`,
    code: `// Arduino: Line Follower Robot
const int leftSensor = A0;
const int midSensor = A1;
const int rightSensor = A2;
const int motorAPin1 = 5;
const int motorAPin2 = 6;
const int motorBPin1 = 9;
const int motorBPin2 = 3;

int threshold = 500;  // Adjust based on calibration

void setup() {
  Serial.begin(9600);
  pinMode(motorAPin1, OUTPUT);
  pinMode(motorAPin2, OUTPUT);
  pinMode(motorBPin1, OUTPUT);
  pinMode(motorBPin2, OUTPUT);
  Serial.println("Line Follower Ready");
}

void loop() {
  int leftVal = analogRead(leftSensor);
  int midVal = analogRead(midSensor);
  int rightVal = analogRead(rightSensor);

  int left = leftVal > threshold ? 1 : 0;
  int mid = midVal > threshold ? 1 : 0;
  int right = rightVal > threshold ? 1 : 0;

  // Sensor debug
  Serial.print("L:");
  Serial.print(left);
  Serial.print(" M:");
  Serial.print(mid);
  Serial.print(" R:");
  Serial.println(right);

  // Line following logic
  if (mid) {
    // Line under middle sensor — go straight
    moveForward(220);
  } else if (left && !right) {
    // Line veering left — turn left
    turnLeft(180);
  } else if (right && !left) {
    // Line veering right — turn right
    turnRight(180);
  } else if (left && right) {
    // Line lost, both sensors see line (junction?) — go straight slowly
    moveForward(100);
  } else {
    // No line detected — stop
    stopMotors();
  }

  delay(50);
}

void moveForward(int speed) {
  analogWrite(motorAPin1, speed);
  digitalWrite(motorAPin2, LOW);
  analogWrite(motorBPin1, speed);
  digitalWrite(motorBPin2, LOW);
}

void turnLeft(int speed) {
  analogWrite(motorAPin1, speed / 2);
  digitalWrite(motorAPin2, LOW);
  analogWrite(motorBPin1, speed);
  digitalWrite(motorBPin2, LOW);
}

void turnRight(int speed) {
  analogWrite(motorAPin1, speed);
  digitalWrite(motorAPin2, LOW);
  analogWrite(motorBPin1, speed / 2);
  digitalWrite(motorBPin2, LOW);
}

void stopMotors() {
  digitalWrite(motorAPin1, LOW);
  digitalWrite(motorAPin2, LOW);
  digitalWrite(motorBPin1, LOW);
  digitalWrite(motorBPin2, LOW);
}`,
    output: `Line Follower Ready
L:0 M:1 R:0
L:0 M:1 R:0
L:1 M:0 R:0
L:0 M:1 R:0
L:0 M:1 R:0
L:0 M:0 R:1`,
    notes: [
      `Calibrate threshold by testing sensors on white and black surfaces. Choose midpoint.`,
      `Proportional control (variable speed based on error) gives smoother following than on/off.`,
      `Test on practice tracks before complex paths. Adjust motor speeds for balanced turning.`,
    ],
    practice: {
      title: 'Calibrated Line Follower',
      description: `Calibrate 3 IR sensors on your robot: read values on white (no line) and black (line). Compute midpoint threshold. Then run line-following logic and print sensor states continuously.`,
      startCode: ``,
      hint: `Record 10 readings on white surface and 10 on black. Threshold = (white_average + black_average) / 2. Use this for detection.`,
    },
  },

  {
    id: 'robotics-obstacle-avoidance',
    category: 'Advanced Robotics',
    title: 'Obstacle Avoidance Logic',
    difficulty: 'Intermediate',
    theory: [
      `Obstacle avoidance is a reactive strategy: sense distance → if too close, stop and turn. Variants: simple (on/off), reactive (degree of turn based on distance), wall-following (hug walls).`,
      `Ultrasonic sensors scan the front. When distance < threshold (e.g., 20 cm), robot stops, spins ~90°, then continues. Some robots use 3 sensors (left, front, right) for better awareness.`,
      `Edge case: robot trapped in corner. Solution: try backing up, reversing turn direction, or using different threshold.`,
    ],
    syntax: `const int trigPin = 4;
const int echoPin = 3;

int distance = getDistance();

if (distance < 20) {
  stopMotors();
  turnRight(90);  // Arbitrary turn
  delay(1000);
} else {
  moveForward(200);
}`,
    code: `// Arduino: Ultrasonic Obstacle Avoider
const int trigPin = 4;
const int echoPin = 3;
const int motorAPin1 = 5;
const int motorAPin2 = 6;
const int motorBPin1 = 9;
const int motorBPin2 = 3;

const int safeDistance = 20;  // cm
int attemptCount = 0;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(motorAPin1, OUTPUT);
  pinMode(motorAPin2, OUTPUT);
  pinMode(motorBPin1, OUTPUT);
  pinMode(motorBPin2, OUTPUT);
}

int getDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  return duration * 0.034 / 2;
}

void loop() {
  int distance = getDistance();

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  if (distance > safeDistance) {
    // Clear path ahead
    moveForward(200);
    attemptCount = 0;
  } else {
    // Obstacle detected
    Serial.println("Obstacle! Turning...");
    stopMotors();
    delay(500);

    // Try turning right
    turnRight(150);
    delay(1000);

    // Check if path is clear now
    int newDistance = getDistance();
    if (newDistance < safeDistance) {
      // Still blocked, try left
      Serial.println("Still blocked. Trying left...");
      turnLeft(150);
      delay(1000);
    }

    attemptCount++;
  }

  delay(100);
}

void moveForward(int speed) {
  analogWrite(motorAPin1, speed);
  digitalWrite(motorAPin2, LOW);
  analogWrite(motorBPin1, speed);
  digitalWrite(motorBPin2, LOW);
}

void turnRight(int speed) {
  digitalWrite(motorAPin1, LOW);
  analogWrite(motorAPin2, speed);
  analogWrite(motorBPin1, speed);
  digitalWrite(motorBPin2, LOW);
}

void turnLeft(int speed) {
  analogWrite(motorAPin1, speed);
  digitalWrite(motorAPin2, LOW);
  digitalWrite(motorBPin1, LOW);
  analogWrite(motorBPin2, speed);
}

void stopMotors() {
  digitalWrite(motorAPin1, LOW);
  digitalWrite(motorAPin2, LOW);
  digitalWrite(motorBPin1, LOW);
  digitalWrite(motorBPin2, LOW);
}`,
    output: `Distance: 45 cm
Distance: 42 cm
Distance: 18 cm
Obstacle! Turning...
Distance: 15 cm
Still blocked. Trying left...
Distance: 35 cm
Distance: 40 cm`,
    notes: [
      `Setback threshold: scan left/right before committing to a turn. Reduces getting stuck.`,
      `Add timeout: if robot is turning for > 5 seconds, it's likely stuck. Try different escape strategy.`,
      `Use 3 sensors (left, front, right) for smarter decisions: turn toward clearer side.`,
    ],
    practice: {
      title: 'Smart Obstacle Avoider',
      description: `Build logic that: scans front distance, if clear (> 20cm) goes forward. If blocked (< 20cm), scans left and right, then turns toward the direction with more space. Repeat.`,
      startCode: ``,
      hint: `Create functions: getDistance(direction), scanLeft(), scanRight(). Choose turn direction based on which scan returned larger distance.`,
    },
  },

  {
    id: 'robotics-pid-control',
    category: 'Advanced Robotics',
    title: 'PID Control Introduction',
    difficulty: 'Advanced',
    theory: [
      `PID (Proportional, Integral, Derivative) is a control algorithm that adjusts output based on error from a target. Example: maintain constant speed despite obstacles.`,
      `P (proportional) term: error × Kp. Larger error = larger correction. I (integral) term: sum of past errors. D (derivative) term: rate of change of error. Together, PID smooths and stabilizes control.`,
      `Tuning: start with P only, add I if error doesn't converge, add D if output oscillates. Values (Kp, Ki, Kd) are specific to each system.`,
    ],
    syntax: `// Simplified PID
float error = targetSpeed - currentSpeed;
float pTerm = Kp * error;
float iTerm = Ki * (integral + error);
float dTerm = Kd * (error - lastError);

int output = pTerm + iTerm + dTerm;
integral += error;
lastError = error;`,
    code: `// Arduino: PID Speed Control for Motor
const int motorPin = 5;
const int sensorPin = A0;

float Kp = 2.0;
float Ki = 0.5;
float Kd = 0.1;

int targetSpeed = 150;
float integral = 0;
float lastError = 0;

void setup() {
  Serial.begin(9600);
  pinMode(motorPin, OUTPUT);
}

void loop() {
  // Get current speed (0-1023 → 0-255 scale)
  int sensorValue = analogRead(sensorPin);
  int currentSpeed = map(sensorValue, 0, 1023, 0, 255);

  // Calculate error
  float error = targetSpeed - currentSpeed;

  // PID components
  float pTerm = Kp * error;
  integral += error;
  float iTerm = Ki * integral;
  float dTerm = Kd * (error - lastError);

  // Total output
  float output = pTerm + iTerm + dTerm;
  output = constrain(output, 0, 255);

  // Apply to motor
  analogWrite(motorPin, (int)output);

  // Debug output
  Serial.print("Target: ");
  Serial.print(targetSpeed);
  Serial.print(" | Current: ");
  Serial.print(currentSpeed);
  Serial.print(" | Error: ");
  Serial.print(error);
  Serial.print(" | Output: ");
  Serial.println((int)output);

  lastError = error;
  delay(100);
}`,
    output: `Target: 150 | Current: 80 | Error: 70 | Output: 140
Target: 150 | Current: 120 | Error: 30 | Output: 145
Target: 150 | Current: 145 | Error: 5 | Output: 148
Target: 150 | Current: 149 | Error: 1 | Output: 149
Target: 150 | Current: 150 | Error: 0 | Output: 150`,
    notes: [
      `Start with only P term. If it oscillates, add small D. If it doesn't reach target, add small I.`,
      `Integral windup: limit integral to prevent huge values. Use: integral = constrain(integral, -100, 100).`,
      `Different systems need different tuning. Test incrementally and adjust Kp, Ki, Kd.`,
    ],
    practice: {
      title: 'Self-Balancing Bot PID',
      description: `Write PID controller that maintains a robot at a fixed distance from an obstacle (e.g., 30 cm). If closer, slow down. If farther, speed up. Print error and output at each cycle.`,
      startCode: ``,
      hint: `Target distance = 30. Current distance from ultrasonic. Error = target - current. Adjust motor speed based on PID output.`,
    },
  },

  {
    id: 'robotics-robot-arm',
    category: 'Advanced Robotics',
    title: 'Robot Arm Kinematics',
    difficulty: 'Advanced',
    theory: [
      `Kinematics relates joint angles to end-effector (gripper) position. Forward kinematics: given joint angles, calculate end position. Inverse kinematics: given desired position, find required angles.`,
      `A 2-link arm with lengths L1, L2 and angles θ1, θ2: end X = L1·cos(θ1) + L2·cos(θ1+θ2), Y = L1·sin(θ1) + L2·sin(θ1+θ2).`,
      `Inverse kinematics is harder — often solved numerically. For simple arms, geometric approach works: solve using law of cosines.`,
    ],
    syntax: `// Forward kinematics: 2-link arm
float L1 = 10, L2 = 8;  // Segment lengths (cm)
float theta1 = 45;      // Degrees
float theta2 = 30;

float rad1 = radians(theta1);
float rad2 = radians(theta2);

float endX = L1*cos(rad1) + L2*cos(rad1+rad2);
float endY = L1*sin(rad1) + L2*sin(rad1+rad2);`,
    code: `// Arduino: 2-Link Robot Arm Kinematics
#include <Servo.h>
#include <math.h>

Servo servo1, servo2;
const float L1 = 10.0;  // First segment (cm)
const float L2 = 8.0;   // Second segment (cm)

void setup() {
  Serial.begin(9600);
  servo1.attach(9);
  servo2.attach(10);
}

// Forward kinematics: angles to position
void forwardKinematics(float theta1Deg, float theta2Deg) {
  float theta1 = radians(theta1Deg);
  float theta2 = radians(theta2Deg);

  float endX = L1*cos(theta1) + L2*cos(theta1+theta2);
  float endY = L1*sin(theta1) + L2*sin(theta1+theta2);

  Serial.print("Angles: ");
  Serial.print(theta1Deg);
  Serial.print(", ");
  Serial.print(theta2Deg);
  Serial.print(" → Position: (");
  Serial.print(endX, 2);
  Serial.print(", ");
  Serial.print(endY, 2);
  Serial.println(")");
}

// Inverse kinematics (simplified): position to angles
bool inverseKinematics(float targetX, float targetY, float &theta1Deg, float &theta2Deg) {
  float d = sqrt(targetX*targetX + targetY*targetY);

  if (d > (L1 + L2) || d < abs(L1 - L2)) {
    return false;  // Unreachable
  }

  // Law of cosines
  float cosTheta2 = (d*d - L1*L1 - L2*L2) / (2*L1*L2);
  cosTheta2 = constrain(cosTheta2, -1.0, 1.0);

  float theta2 = acos(cosTheta2);
  float k1 = L1 + L2*cos(theta2);
  float k2 = L2*sin(theta2);

  float theta1 = atan2(targetY, targetX) - atan2(k2, k1);

  theta1Deg = degrees(theta1);
  theta2Deg = degrees(theta2);

  return true;
}

void loop() {
  // Test forward kinematics
  Serial.println("=== Forward Kinematics ===");
  forwardKinematics(45, 30);
  forwardKinematics(90, 45);
  forwardKinematics(0, 90);

  delay(1000);

  // Test inverse kinematics
  Serial.println("=== Inverse Kinematics ===");
  float theta1, theta2;

  if (inverseKinematics(15, 10, theta1, theta2)) {
    Serial.print("Target (15, 10) → Angles: ");
    Serial.print(theta1, 2);
    Serial.print(", ");
    Serial.println(theta2, 2);

    servo1.write((int)theta1);
    servo2.write((int)theta2);
  }

  delay(2000);
}`,
    output: `=== Forward Kinematics ===
Angles: 45.00, 30.00 → Position: (16.32, 13.81)
Angles: 90.00, 45.00 → Position: (5.66, 13.66)
Angles: 0.00, 90.00 → Position: (10.00, 8.00)
=== Inverse Kinematics ===
Target (15, 10) → Angles: 31.72, 24.53`,
    notes: [
      `Forward kinematics is straightforward math. Inverse kinematics is harder and may have multiple solutions.`,
      `Clamp angles to servo range: 0–180°. Out-of-range targets are unreachable.`,
      `For complex arms (3+ joints), use numerical methods (iterative optimization) instead of closed-form solutions.`,
    ],
    practice: {
      title: 'Arm Trajectory Planner',
      description: `Plan a 2-link arm to move through 5 waypoints: (10,5), (12,8), (15,10), (14,6), (10,5). Use inverse kinematics for each waypoint. Servo to each position with 1s delay.`,
      startCode: ``,
      hint: `Store waypoints in arrays. Loop through, compute angles using inverseKinematics(), servo to each angle, delay 1s.`,
    },
  },

  {
    id: 'robotics-gripper-design',
    category: 'Advanced Robotics',
    title: 'Gripper Design & Control',
    difficulty: 'Intermediate',
    theory: [
      `A gripper (end-effector) picks up objects. Simple grippers use 1 servo to open/close jaws. Advanced grippers use multiple actuators for complex manipulation.`,
      `Servo-based gripper: servo at 0° = fully open, 90° = fully closed. Mechanical linkage transfers servo rotation to jaw motion.`,
      `Torque is critical: calculate force needed to grip the heaviest object, then select servo with sufficient torque rating.`,
    ],
    syntax: `#include <Servo.h>

Servo gripper;
const int gripPin = 9;

void setup() {
  gripper.attach(gripPin);
}

void grip() {
  gripper.write(90);  // Close
  delay(500);
}

void release() {
  gripper.write(0);   // Open
  delay(500);
}`,
    code: `// Arduino: Gripper Control with Pick-and-Place
#include <Servo.h>

Servo gripper;
const int gripPin = 9;
const int motorPin1 = 5;
const int motorPin2 = 6;
const int motorPin3 = 9;
const int motorPin4 = 10;

void setup() {
  Serial.begin(9600);
  gripper.attach(gripPin);
  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
  pinMode(motorPin3, OUTPUT);
  pinMode(motorPin4, OUTPUT);

  gripper.write(0);  // Start open
}

void gripObject() {
  Serial.println("Closing gripper...");
  for (int angle = 0; angle <= 90; angle += 5) {
    gripper.write(angle);
    delay(50);
  }
  Serial.println("Gripper closed");
}

void releaseObject() {
  Serial.println("Opening gripper...");
  for (int angle = 90; angle >= 0; angle -= 5) {
    gripper.write(angle);
    delay(50);
  }
  Serial.println("Gripper open");
}

void moveRobot(int direction, int duration) {
  // direction: 1=forward, -1=backward
  if (direction > 0) {
    analogWrite(motorPin1, 200);
    digitalWrite(motorPin2, LOW);
    analogWrite(motorPin3, 200);
    digitalWrite(motorPin4, LOW);
  } else {
    digitalWrite(motorPin1, LOW);
    analogWrite(motorPin2, 200);
    digitalWrite(motorPin3, LOW);
    analogWrite(motorPin4, 200);
  }
  delay(duration);
  stopMotors();
}

void stopMotors() {
  digitalWrite(motorPin1, LOW);
  digitalWrite(motorPin2, LOW);
  digitalWrite(motorPin3, LOW);
  digitalWrite(motorPin4, LOW);
}

void loop() {
  // Pick-and-place sequence
  Serial.println("=== Pick & Place ===");

  // Move to object
  moveRobot(1, 2000);

  // Grip
  gripObject();
  delay(500);

  // Move to destination
  moveRobot(1, 2000);

  // Release
  releaseObject();

  delay(3000);
}`,
    output: `=== Pick & Place ===
Closing gripper...
Gripper closed
Opening gripper...
Gripper open`,
    notes: [
      `Smooth servo motion: use loops with small angle increments instead of sudden jumps.`,
      `Servo grasping force depends on torque. Check servo torque rating (kg·cm) vs. object weight.`,
      `Sensor feedback (pressure, proximity) helps detect object presence and prevent damage.`,
    ],
    practice: {
      title: 'Robotic Pick-and-Place',
      description: `Create a program that: moves robot forward 2s, closes gripper smoothly over 1s, backs up 2s, opens gripper. Repeat 3 times. Print status at each stage.`,
      startCode: ``,
      hint: `Combine moveRobot(), gripObject(), releaseObject() functions. Use loop() to repeat 3 times. Add delays between movements for stability.`,
    },
  },

  {
    id: 'robotics-maze-solver',
    category: 'Advanced Robotics',
    title: 'Maze Solving Algorithm',
    difficulty: 'Advanced',
    theory: [
      `Wall-following algorithm: keep right hand on wall (or left), follow it. Works for simply connected mazes (no islands). Fails in mazes with loops.`,
      `Recursive backtracker: explore all paths. If dead-end, backtrack. More robust but slower. Requires memory to track visited cells.`,
      `Graph-based solvers (BFS, DFS, A*) build a map, then find shortest path. Best if robot can map the maze first.`,
    ],
    syntax: `// Simplified wall-follower pseudo-code
while not at_exit:
  left_distance = scan_left()
  front_distance = scan_front()
  right_distance = scan_right()

  if front_distance > threshold:
    move_forward()
  elif left_distance > threshold:
    turn_left()
  else:
    turn_right()`,
    code: `// Arduino: Wall-Following Maze Solver
const int trigPin = 4;
const int echoPin = 3;
const int leftIR = A0;
const int rightIR = A1;
const int motorPin1 = 5, motorPin2 = 6;
const int motorPin3 = 9, motorPin4 = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

int getDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH, 30000);
  return duration * 0.034 / 2;
}

int getLeftWall() {
  return analogRead(leftIR);
}

int getRightWall() {
  return analogRead(rightIR);
}

void moveForward() {
  analogWrite(motorPin1, 150);
  digitalWrite(motorPin2, LOW);
  analogWrite(motorPin3, 150);
  digitalWrite(motorPin4, LOW);
}

void turnLeft() {
  analogWrite(motorPin1, 100);
  digitalWrite(motorPin2, LOW);
  digitalWrite(motorPin3, LOW);
  analogWrite(motorPin4, 100);
  delay(300);
}

void turnRight() {
  digitalWrite(motorPin1, LOW);
  analogWrite(motorPin2, 100);
  analogWrite(motorPin3, 100);
  digitalWrite(motorPin4, LOW);
  delay(300);
}

void stopMotors() {
  digitalWrite(motorPin1, LOW);
  digitalWrite(motorPin2, LOW);
  digitalWrite(motorPin3, LOW);
  digitalWrite(motorPin4, LOW);
}

void loop() {
  int frontDist = getDistance();
  int leftWall = getLeftWall();
  int rightWall = getRightWall();

  Serial.print("Front: ");
  Serial.print(frontDist);
  Serial.print(" | Left Wall: ");
  Serial.print(leftWall);
  Serial.print(" | Right Wall: ");
  Serial.println(rightWall);

  // Wall-following logic: keep right wall
  if (frontDist > 20) {
    // Path ahead clear
    if (rightWall < 400) {
      // Right wall present — follow it
      moveForward();
    } else {
      // No right wall — turn right to find it
      turnRight();
    }
  } else {
    // Obstacle ahead
    if (leftWall > 600) {
      // Left side open — turn left
      turnLeft();
    } else {
      // Dead end — back up and try
      stopMotors();
      delay(500);
      turnRight();
    }
  }

  delay(100);
}`,
    output: `Front: 45 | Left Wall: 250 | Right Wall: 680
Front: 42 | Left Wall: 260 | Right Wall: 700
Front: 18 | Left Wall: 550 | Right Wall: 200
Front: 40 | Left Wall: 620 | Right Wall: 350`,
    notes: [
      `Wall-following is simple but fails in mazes with multiple paths (it chooses arbitrarily).`,
      `Combine line-following (detect marked path) with wall-following for robust maze solving.`,
      `Data logging (store path) allows replay: if stuck, backtrack to last good position.`,
    ],
    practice: {
      title: 'Maze Explorer',
      description: `Implement wall-following: keep right hand on wall. Use front ultrasonic and side IR sensors. Turn left if wall on right disappears, turn right if obstacle ahead. Log path taken.`,
      startCode: ``,
      hint: `Right wall threshold = 500 (IR). Front obstacle = 20cm. When right IR drops < threshold, turn right. When front < 20cm, turn left.`,
    },
  },

  {
    id: 'robotics-ros-intro',
    category: 'Advanced Robotics',
    title: 'Introduction to ROS',
    difficulty: 'Advanced',
    theory: [
      `ROS (Robot Operating System) is a middleware framework for building robot applications. It manages communication between sensors, processors, and actuators via a publish-subscribe model.`,
      `ROS runs on Linux (Ubuntu). Key concepts: nodes (processes), topics (data streams), services (request-reply), messages (data format).`,
      `A typical ROS robot: sensor nodes publish data → processing node subscribes and calculates → control node publishes commands → motor drivers execute.`,
    ],
    syntax: `// ROS node structure (Python)
#!/usr/bin/env python
import rospy
from sensor_msgs.msg import Range

class RobotController:
  def __init__(self):
    rospy.init_node('robot_controller')
    self.sonar_sub = rospy.Subscriber('/sonar', Range, self.sonar_callback)

  def sonar_callback(self, msg):
    distance = msg.range
    rospy.loginfo(f"Distance: {distance}")

if __name__ == '__main__':
  controller = RobotController()
  rospy.spin()`,
    code: `# ROS Node: Simple Line Follower
#!/usr/bin/env python
import rospy
from sensor_msgs.msg import Image
from geometry_msgs.msg import Twist
from cv_bridge import CvBridge
import cv2
import numpy as np

class LineFollower:
  def __init__(self):
    rospy.init_node('line_follower')

    # Subscribers
    self.image_sub = rospy.Subscriber('/camera/image', Image, self.image_callback)

    # Publishers
    self.cmd_vel_pub = rospy.Publisher('/cmd_vel', Twist, queue_size=1)

    # OpenCV bridge
    self.bridge = CvBridge()

  def image_callback(self, data):
    # Convert ROS image to OpenCV format
    frame = self.bridge.imgmsg_to_cv2(data, 'bgr8')

    # Detect black line
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    lower_black = np.array([0, 0, 0])
    upper_black = np.array([180, 255, 50])
    mask = cv2.inRange(hsv, lower_black, upper_black)

    # Find line center
    moments = cv2.moments(mask)
    if moments['m00'] > 0:
      cx = int(moments['m10'] / moments['m00'])
      error = cx - frame.shape[1] / 2

      # PID control
      angular = -error * 0.01

      # Publish velocity command
      msg = Twist()
      msg.linear.x = 0.2
      msg.angular.z = angular
      self.cmd_vel_pub.publish(msg)

      rospy.loginfo(f'Line at: {cx}, Error: {error}')
    else:
      # No line found
      msg = Twist()
      msg.linear.x = 0
      msg.angular.z = 0
      self.cmd_vel_pub.publish(msg)
      rospy.logwarn('Line lost')

if __name__ == '__main__':
  follower = LineFollower()
  rospy.spin()`,
    output: `[INFO] Line at: 320, Error: 10
[INFO] Line at: 318, Error: 8
[INFO] Line at: 320, Error: 10
[WARN] Line lost
[INFO] Line at: 322, Error: 12`,
    notes: [
      `ROS uses a distributed architecture. Nodes can run on different computers, communicated via network.`,
      `rospy.loginfo() for normal messages, rospy.logwarn() for warnings, rospy.logerr() for errors.`,
      `Use 'rosbag' to record and replay sensor data for debugging without re-running tests.`,
    ],
    practice: {
      title: 'ROS Obstacle Avoider',
      description: `Create a ROS node that: subscribes to '/sonar' (distance), publishes '/cmd_vel' (robot velocity). If distance > 1m, move forward. If < 1m, stop and turn. Log all actions.`,
      startCode: ``,
      hint: `Subscribe to sonar topic, check range field. Publish Twist message with linear.x (forward) and angular.z (turn). Use rospy.loginfo() to track decisions.`,
    },
  },

  {
    id: 'robotics-cv-basics',
    category: 'Advanced Robotics',
    title: 'Computer Vision Basics',
    difficulty: 'Advanced',
    theory: [
      `Computer vision teaches robots to "see". Tasks: object detection (locate things), segmentation (identify regions), tracking (follow motion), classification (recognize types).`,
      `Common techniques: edge detection (Canny), feature extraction (SIFT, ORB), template matching, machine learning (CNN, YOLO for fast detection).`,
      `Real-time constraints: FPS (frames per second) matters. Optimize: lower resolution, simpler algorithms, GPU acceleration.`,
    ],
    syntax: `# OpenCV: Object Detection
import cv2
import numpy as np

img = cv2.imread('robot.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Detect edges
edges = cv2.Canny(gray, 100, 200)

# Detect contours
contours, _ = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)`,
    code: `# Python: Marker Detection with OpenCV
import cv2
import numpy as np

def detect_markers(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect ArUco markers (if available)
    # Otherwise use simple shape detection

    # Detect circles using Hough transform
    circles = cv2.HoughCircles(
        gray,
        cv2.HOUGH_GRADIENT,
        dp=1,
        minDist=30,
        param1=50,
        param2=30,
        minRadius=5,
        maxRadius=50
    )

    if circles is not None:
        circles = np.uint16(np.around(circles))
        for i in circles[0, :]:
            center = (i[0], i[1])
            radius = i[2]
            cv2.circle(frame, center, radius, (0, 255, 0), 2)
            cv2.circle(frame, center, 2, (0, 0, 255), 3)
            print(f"Marker at: {center}, Radius: {radius}")

    return frame

def main():
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame = detect_markers(frame)

        cv2.imshow('Marker Detection', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()`,
    output: `Marker at: (150, 120), Radius: 25
Marker at: (320, 200), Radius: 30
Marker at: (80, 90), Radius: 20`,
    notes: [
      `Hough Circle Detector parameters need tuning for your camera and lighting conditions.`,
      `For faster detection, use pre-trained models (YOLOv4, OpenCV DNN module).`,
      `Lighting matters: test under consistent illumination. Add IR ring light for consistency.`,
    ],
    practice: {
      title: 'Ball Tracking Robot',
      description: `Detect a colored ball (red or blue) in camera feed. Calculate its center coordinates. Print position. In a real robot, move toward the ball by adjusting motor speeds.`,
      startCode: ``,
      hint: `Use HSV color range for ball color. Find contours. Compute center using cv2.moments(). Calculate error from image center to drive motors.`,
    },
  },

  {
    id: 'robotics-ml-intro',
    category: 'Advanced Robotics',
    title: 'Machine Learning in Robotics',
    difficulty: 'Advanced',
    theory: [
      `Machine learning enables robots to learn from data rather than be programmed with hardcoded rules. Examples: image classification (is this a ball or cube?), behavior prediction, anomaly detection.`,
      `Common approaches: supervised (labeled training data), unsupervised (clustering), reinforcement (reward-based learning).`,
      `Challenges: training data scarcity, real-time inference (must be fast on robot), adaptation (learn from new experiences).`,
    ],
    syntax: `# TensorFlow: Simple classifier
import tensorflow as tf

model = tf.keras.Sequential([
  tf.keras.layers.Flatten(input_shape=(28, 28)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy')
model.fit(train_images, train_labels)`,
    code: `# Python: Simple Neural Network for Obstacle Classification
import numpy as np
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import StandardScaler

# Training data: [distance, angle] -> classification [0=safe, 1=dangerous]
X_train = np.array([
    [50, 0], [45, 10], [40, 20],   # Safe distances
    [30, 30], [25, 45], [20, 60],  # Risky
    [15, 90], [10, 120], [5, 150]  # Dangerous
])

y_train = np.array([0, 0, 0, 1, 1, 1, 2, 2, 2])  # 0=safe, 1=caution, 2=danger

# Normalize data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# Train model
clf = MLPClassifier(hidden_layer_sizes=(10, 5), max_iter=1000)
clf.fit(X_train_scaled, y_train)

# Test on new data
test_data = np.array([[35, 15], [12, 95]])
test_scaled = scaler.transform(test_data)
predictions = clf.predict(test_scaled)

for i, pred in enumerate(predictions):
    status = ['SAFE', 'CAUTION', 'DANGER'][pred]
    print(f"Distance: {test_data[i][0]}, Angle: {test_data[i][1]} → {status}")`,
    output: `Distance: 35, Angle: 15 → SAFE
Distance: 12, Angle: 95 → DANGER`,
    notes: [
      `Collect diverse training data covering all scenarios the robot will face.`,
      `Use techniques like data augmentation to expand limited datasets.`,
      `Monitor model performance continuously; robot behavior may degrade if data distribution shifts.`,
    ],
    practice: {
      title: 'Obstacle Risk Classifier',
      description: `Train a neural network on obstacle data: distance + angle → risk level (safe/caution/danger). Test on 5 unseen scenarios. Print confidence levels for each prediction.`,
      startCode: ``,
      hint: `Create synthetic training data with clear separation between classes. Use scikit-learn MLPClassifier or TensorFlow. Include edge cases (corner angles, very close).`,
    },
  },

  {
    id: 'robotics-ethics',
    category: 'Advanced Robotics',
    title: 'Robot Ethics & Safety',
    difficulty: 'Beginner',
    theory: [
      `Robot ethics addresses: safety (preventing harm), autonomy (decision-making authority), liability (who is responsible?), and fairness (bias in AI).`,
      `Key safety principles: (1) fail-safe design (defaults to safe state), (2) emergency stop (human override always available), (3) testing in safe environments.`,
      `Real-world risks: robots are physical systems that can injure people. Regulatory compliance (ISO 10218 for industrial robots) is mandatory in many applications.`,
    ],
    syntax: `// Safe robot shutdown
void emergencyStop() {
  stopMotors();
  disengageActuators();
  logEvent("EMERGENCY STOP");
  waitForManualReset();
}`,
    code: `// Arduino: Safe Robot with Emergency Stop
const int emergencyButtonPin = 2;
const int motorPin1 = 5, motorPin2 = 6;
const int motorPin3 = 9, motorPin4 = 10;

volatile bool emergencyStop = false;

void setup() {
  Serial.begin(9600);
  pinMode(emergencyButtonPin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(emergencyButtonPin), handleEmergency, FALLING);

  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
  pinMode(motorPin3, OUTPUT);
  pinMode(motorPin4, OUTPUT);

  Serial.println("Robot initialized. Press button to stop.");
}

void handleEmergency() {
  emergencyStop = true;
  Serial.println("EMERGENCY STOP ACTIVATED");
}

void motorsOff() {
  digitalWrite(motorPin1, LOW);
  digitalWrite(motorPin2, LOW);
  digitalWrite(motorPin3, LOW);
  digitalWrite(motorPin4, LOW);
}

void moveForward(int speed) {
  if (emergencyStop) {
    motorsOff();
    return;
  }
  analogWrite(motorPin1, speed);
  digitalWrite(motorPin2, LOW);
  analogWrite(motorPin3, speed);
  digitalWrite(motorPin4, LOW);
}

void loop() {
  if (emergencyStop) {
    motorsOff();
    Serial.println("Waiting for manual reset...");
    delay(5000);
    emergencyStop = false;
    Serial.println("Ready to resume");
  } else {
    moveForward(150);
    delay(100);
  }
}`,
    output: `Robot initialized. Press button to stop.
Waiting for manual reset...
EMERGENCY STOP ACTIVATED
Waiting for manual reset...
Ready to resume`,
    notes: [
      `Always implement hardware emergency stop (separate circuit, not just software).`,
      `Test edge cases: what happens if battery dies mid-mission? Design graceful degradation.`,
      `Log all critical events (collision, sensor failure, emergency stop) for analysis.`,
    ],
    practice: {
      title: 'Safe Robot Design Doc',
      description: `Write a safety checklist for a delivery robot: (1) emergency stop mechanism, (2) sensor failure handling, (3) collision limits, (4) human interaction safety. List 5 failure scenarios and mitigation.`,
      startCode: ``,
      hint: `Consider: power loss, sensor malfunction, unexpected obstacles, pedestrian interaction, GPS loss. For each, define safe response.`,
    },
  },

  {
    id: 'robotics-competitions',
    category: 'Advanced Robotics',
    title: 'Robotics Competitions',
    difficulty: 'Intermediate',
    theory: [
      `Robotics competitions (RoboRave, RoboCup, IARC) challenge students to solve real problems. Categories: autonomous navigation, object manipulation, multi-robot coordination.`,
      `Participating teaches: systems integration (sensors + code + mechanics), debugging under pressure, teamwork, and innovation.`,
      `Competition constraints (size, weight, cost, time limits) force smart design choices and resource optimization.`,
    ],
    syntax: `// Competition-ready code structure
class CompetitionRobot {
  void initialize() { /* setup */ }
  void perceive() { /* read all sensors */ }
  void decide() { /* control logic */ }
  void act() { /* execute commands */ }
  void run() {
    while (not_finished) {
      perceive();
      decide();
      act();
    }
  }
}`,
    code: `// Arduino: Competition-ready Maze Solver
#include <Servo.h>

class CompetitionRobot {
private:
  unsigned long startTime;
  int moves = 0;

public:
  void initialize() {
    Serial.begin(9600);
    Serial.println("Competition Mode: READY");
    startTime = millis();
  }

  void perceive() {
    // Read all sensors
    // Distance, line sensors, battery
  }

  void decide() {
    // Plan next move
    // Wall-follow, avoid obstacles
  }

  void act() {
    // Execute: move motors, servos
    // Log action
  }

  void logPerformance() {
    unsigned long elapsed = millis() - startTime;
    Serial.print("Time: ");
    Serial.print(elapsed / 1000);
    Serial.print("s | Moves: ");
    Serial.println(moves);
  }
};

CompetitionRobot robot;

void setup() {
  robot.initialize();
}

void loop() {
  robot.perceive();
  robot.decide();
  robot.act();
  robot.logPerformance();
  delay(100);
}`,
    output: `Competition Mode: READY
Time: 5s | Moves: 23
Time: 10s | Moves: 45
Time: 15s | Moves: 68`,
    notes: [
      `Test extensively before competition. Practice on courses identical to competition.`,
      `Build for reliability, not just speed. A slower but stable solution beats a fast buggy one.`,
      `Reserve battery capacity: allocate 20% for contingencies (extra searches, retries).`,
    ],
    practice: {
      title: 'Competition Prep Checklist',
      description: `Plan a maze-solving competition entry. List: (1) hardware (sensors, motors), (2) algorithms (maze solver, calibration), (3) testing milestones, (4) contingency plans if sensor fails.`,
      startCode: ``,
      hint: `Include timeline for build (4 weeks), integration (2 weeks), testing (2 weeks), competition tuning (1 week). Identify critical path tasks.`,
    },
  },

  {
    id: 'robotics-career',
    category: 'Advanced Robotics',
    title: 'Career Paths in Robotics',
    difficulty: 'Beginner',
    theory: [
      `Robotics careers span: hardware engineering (mechanical, electrical), software (firmware, AI, ROS), design (CAD, simulation), research, and applications (manufacturing, healthcare, agriculture).`,
      `In-demand skills: C/C++ (embedded), Python (AI, scripting), ROS, OpenCV, MATLAB/Simulink, CAD (SolidWorks, Fusion 360).`,
      `Growth sectors: autonomous vehicles, collaborative robots (cobots), medical robotics, drones, space exploration. India's robotics market is growing; companies like IFlex, Steer, Noccarc are hiring.`,
    ],
    syntax: `// Typical job postings ask for:
// - Embedded C/C++ for microcontroller firmware
// - Python for automation and AI
// - ROS for robotic systems
// - Linux command-line proficiency
// - Experience with motor control, sensor integration`,
    code: `// Portfolio Project: Autonomous Delivery Robot
// Demonstrates: sensors, control, navigation, integration

#include <Servo.h>
#include <WiFi.h>

const char* ssid = "RobotWiFi";
const char* password = "secure123";

Servo motors[2];
const int lidarPin = A0;
const int cameraCSIPin = 18;

void setup() {
  Serial.begin(115200);

  // WiFi for remote monitoring
  WiFi.begin(ssid, password);

  // Sensor initialization
  pinMode(lidarPin, INPUT);

  // Motor initialization
  motors[0].attach(9);
  motors[1].attach(10);

  Serial.println("Autonomous Delivery Bot: INITIALIZED");
  Serial.println("Features: LIDAR navigation, WiFi telemetry, autonomous pathfinding");
}

void loop() {
  // Perceive environment
  int distance = readLidar();

  // Autonomous decision
  if (distance > 50) {
    moveForward(150, 150);
  } else {
    scanAndAvoid();
  }

  // Report telemetry
  if (WiFi.status() == WL_CONNECTED) {
    sendTelemetry(distance);
  }

  delay(100);
}

void scanAndAvoid() {
  // Complex navigation logic
  // This demonstrates problem-solving ability in interviews
}

void sendTelemetry(int distance) {
  // WiFi transmission to cloud dashboard
}

int readLidar() {
  return analogRead(lidarPin) * 4;  // Simplified
}

void moveForward(int leftSpeed, int rightSpeed) {
  motors[0].write(leftSpeed);
  motors[1].write(rightSpeed);
}`,
    output: `Autonomous Delivery Bot: INITIALIZED
Features: LIDAR navigation, WiFi telemetry, autonomous pathfinding`,
    notes: [
      `Build portfolio projects: line followers, maze solvers, vision-based robots. Open-source them on GitHub.`,
      `Internships (IIT, research labs, robotics startups) are valuable experience.`,
      `Stay updated: follow robotics conferences (IROS, ICRA), research papers, industry trends.`,
    ],
    practice: {
      title: 'Career Development Plan',
      description: `Plan a robotics career path: (1) skills to learn (next 12 months), (2) projects to build, (3) competitions/internships to pursue, (4) industry certifications (e.g., ROS certification).`,
      startCode: ``,
      hint: `Research 3 companies you'd want to work for. Identify their tech stack. Map a learning path to match their requirements.`,
    },
  },

  {
    id: 'robotics-sumo',
    category: 'Mini Projects',
    title: 'Mini Project: Sumo Robot',
    difficulty: 'Intermediate',
    theory: [
      `A sumo robot (2–3 kg, square shape) competes by pushing opponents out of a ring. Challenges: detect ring edge, track opponent, push with controlled force.`,
      `Design: low center of gravity (aggressive pushing), edge detection (IR sensors under chassis), opponent detection (front sensors), powerful motors.`,
      `Strategy: circle opponent, detect ring edge before losing balance, engage for push, disengage if losing.`,
    ],
    syntax: `const int leftIR = A0, rightIR = A1, centerIR = A2;
const int motorL1 = 5, motorL2 = 6;
const int motorR1 = 9, motorR2 = 10;

void detectRingEdge() {
  int left = analogRead(leftIR);
  int right = analogRead(rightIR);
  int center = analogRead(centerIR);

  // If IR reading is high (white), at edge
  if (left > 800) reverseTurn(LEFT);
  if (right > 800) reverseTurn(RIGHT);
}`,
    code: `// Arduino: Sumo Robot Strategy
const int leftEdge = A0, rightEdge = A1, centerEdge = A2;
const int motorL1 = 5, motorL2 = 6;
const int motorR1 = 9, motorR2 = 10;

const int edgeThreshold = 700;
const int pushPower = 255;
const int spinPower = 180;

void setup() {
  Serial.begin(9600);
  pinMode(motorL1, OUTPUT);
  pinMode(motorL2, OUTPUT);
  pinMode(motorR1, OUTPUT);
  pinMode(motorR2, OUTPUT);
}

void fullAttack() {
  // Maximum forward push
  analogWrite(motorL1, pushPower);
  digitalWrite(motorL2, LOW);
  analogWrite(motorR1, pushPower);
  digitalWrite(motorR2, LOW);
}

void spinClockwise() {
  // Turn right to find opponent
  analogWrite(motorL1, spinPower);
  digitalWrite(motorL2, LOW);
  digitalWrite(motorR1, LOW);
  analogWrite(motorR2, spinPower);
}

void reverseBacktrack(int direction) {
  // Back away from edge
  analogWrite(motorL1, 0);
  analogWrite(motorL2, 150);
  analogWrite(motorR1, 0);
  analogWrite(motorR2, 150);
  delay(500);

  // Turn away
  if (direction == 0) spinClockwise();
  else spinCounterClockwise();
}

void spinCounterClockwise() {
  digitalWrite(motorL1, LOW);
  analogWrite(motorL2, spinPower);
  analogWrite(motorR1, spinPower);
  digitalWrite(motorR2, LOW);
}

void loop() {
  int left = analogRead(leftEdge);
  int right = analogRead(rightEdge);
  int center = analogRead(centerEdge);

  // Edge detection: stay away from ring edge
  if (left > edgeThreshold) {
    Serial.println("Edge detected LEFT. Reversing...");
    reverseBacktrack(1);  // Turn right
  } else if (right > edgeThreshold) {
    Serial.println("Edge detected RIGHT. Reversing...");
    reverseBacktrack(0);  // Turn left
  } else {
    // No edge — attack or search
    fullAttack();
    delay(2000);
    spinClockwise();  // Search for opponent
    delay(1000);
  }

  delay(100);
}`,
    output: `Edge detected LEFT. Reversing...
(robot backs up and turns right)
(resumes forward attack)
Edge detected RIGHT. Reversing...
(robot backs up and turns left)`,
    notes: [
      `Sumo requires aggressive acceleration and fast reactions. Use large PWM values (200+).`,
      `Test edge detection on the actual competition ring's white border.`,
      `Low center of gravity is critical: place battery and heavy components as low as possible.`,
    ],
    practice: {
      title: 'Build & Test a Sumo Bot',
      description: `Design a 2-motor sumo bot: test edge detection with 3 IR sensors, verify push power reaches 255 PWM, confirm it reverses when edge detected. Drive against a dummy opponent.`,
      startCode: ``,
      hint: `Use two high-torque motors for pushing power. Mount IR sensors just under chassis front edge. Test on white paper (simulating ring edge).`,
    },
  },

  {
    id: 'robotics-vision-tracker',
    category: 'Mini Projects',
    title: 'Mini Project: Vision-Based Tracker',
    difficulty: 'Intermediate',
    theory: [
      `A tracker robot uses a camera to detect and follow a colored object (ball, person, target). Requires: real-time image processing, motor control feedback, stable PID tuning.`,
      `Challenges: lighting changes, object loss (reacquire), scale changes (object moving closer/farther), multiple candidates (pick the right one).`,
      `Solution: OpenCV + servo-controlled camera + differential motor control. PID loop maintains object centered in frame.`,
    ],
    syntax: `# Python: Ball Tracker
import cv2
import numpy as np

def track_ball(frame):
  hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
  lower = np.array([0, 100, 100])
  upper = np.array([10, 255, 255])

  mask = cv2.inRange(hsv, lower, upper)
  contours, _ = cv2.findContours(mask, ...)

  if contours:
    c = max(contours, key=cv2.contourArea)
    (x, y), r = cv2.minEnclosingCircle(c)
    error = x - (frame.shape[1] / 2)
    return error
  return 0`,
    code: `# Python: Vision Tracker with Motor Control
import cv2
import numpy as np
import serial

class VisionTracker:
  def __init__(self):
    self.cap = cv2.VideoCapture(0)
    self.serial = serial.Serial('/dev/ttyACM0', 9600)

    # PID parameters
    self.Kp = 1.5
    self.Ki = 0.1
    self.Kd = 0.3
    self.integral = 0
    self.lastError = 0

  def track(self):
    ret, frame = self.cap.read()
    if not ret:
      return

    # Detect red ball in HSV
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    lower_red = np.array([0, 100, 100])
    upper_red = np.array([10, 255, 255])

    mask = cv2.inRange(hsv, lower_red, upper_red)
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    if contours:
      c = max(contours, key=cv2.contourArea)
      (x, y), r = cv2.minEnclosingCircle(c)

      # PID control
      frameCenter = frame.shape[1] / 2
      error = x - frameCenter

      self.integral += error
      derivative = error - self.lastError

      motorSpeed = int(self.Kp * error + self.Ki * self.integral + self.Kd * derivative)
      motorSpeed = np.clip(motorSpeed, -255, 255)

      # Send to Arduino
      self.serial.write(f"M{motorSpeed}\n".encode())

      print(f"Ball at: {x:.0f}, Error: {error:.0f}, Motor: {motorSpeed}")

      # Draw tracking circle
      cv2.circle(frame, (int(x), int(y)), int(r), (0, 255, 0), 2)
      cv2.line(frame, (int(frameCenter), 0), (int(frameCenter), frame.shape[0]), (255, 0, 0), 1)

      self.lastError = error
    else:
      # Ball lost
      self.serial.write(b"S\n")  # Stop motors
      print("Ball lost. Searching...")

    cv2.imshow('Tracker', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
      self.cap.release()
      cv2.destroyAllWindows()
      self.serial.close()

if __name__ == '__main__':
  tracker = VisionTracker()
  while True:
    tracker.track()`,
    output: `Ball at: 315, Error: 15, Motor: 23
Ball at: 318, Error: 18, Motor: 27
Ball at: 320, Error: 20, Motor: 30
Ball lost. Searching...
Ball at: 310, Error: 10, Motor: 15`,
    notes: [
      `Real-time processing: target 30+ FPS. Lower resolution or skip frames if too slow.`,
      `Robust color detection: test under varied lighting. Store color ranges per environment.`,
      `Graceful degradation: if ball is lost, spin or backup to reacquire.`,
    ],
    practice: {
      title: 'Build a Real Tracker',
      description: `Using a camera, servo, and two motors: detect a red ball, keep it centered in the frame using PID, and drive toward it. Print ball coordinates and motor commands.`,
      startCode: ``,
      hint: `Use HSV color space. Compute error = ball_x - frame_center_x. Apply PID. Positive error = turn right, negative = turn left. Forward speed is constant.`,
    },
  },

  {
    id: 'robotics-final-project',
    category: 'Mini Projects',
    title: 'Mini Project: Integrated Robot',
    difficulty: 'Intermediate',
    theory: [
      `An integrated robotics project combines all learned skills: sensors (multi-modal), control (motors, servos), decision-making (logic/AI), and communication (wireless/wired).`,
      `Example: an autonomous delivery bot that navigates via LIDAR, grasps objects with a gripper, and reports progress via Bluetooth.`,
      `Project scope must be realistic: 4–8 weeks of development, 2–3 person team, budget constraints, access to tools.`,
    ],
    syntax: `// Integrated system pseudocode
void setup() {
  initializeSensors();
  initializeMotors();
  initializeWireless();
}

void loop() {
  perceiveEnvironment();
  planPath();
  executeMotion();
  reportStatus();
}`,
    code: `// Final Project: Search & Rescue Robot
#include <Servo.h>
#include <SoftwareSerial.h>

// Hardware
Servo gripperServo;
SoftwareSerial btSerial(10, 11);

const int ultrasonicTrig = 4, ultrasonicEcho = 3;
const int motorL1 = 5, motorL2 = 6;
const int motorR1 = 9, motorR2 = 3;
const int gripperPin = 8;
const int ledPin = 13;

// State machine
enum State { SEARCHING, APPROACHING, GRASPING, RETURNING, IDLE };
State currentState = SEARCHING;

void setup() {
  Serial.begin(9600);
  btSerial.begin(9600);

  pinMode(motorL1, OUTPUT); pinMode(motorL2, OUTPUT);
  pinMode(motorR1, OUTPUT); pinMode(motorR2, OUTPUT);
  pinMode(ledPin, OUTPUT);

  gripperServo.attach(gripperPin);
  gripperServo.write(0);  // Open

  reportStatus("System initialized");
}

int getDistance() {
  digitalWrite(ultrasonicTrig, LOW);
  delayMicroseconds(2);
  digitalWrite(ultrasonicTrig, HIGH);
  delayMicroseconds(10);
  digitalWrite(ultrasonicTrig, LOW);

  long duration = pulseIn(ultrasonicEcho, HIGH);
  return duration * 0.034 / 2;
}

void moveForward(int speed) {
  analogWrite(motorL1, speed);
  digitalWrite(motorL2, LOW);
  analogWrite(motorR1, speed);
  digitalWrite(motorR2, LOW);
}

void stopMotors() {
  digitalWrite(motorL1, LOW);
  digitalWrite(motorL2, LOW);
  digitalWrite(motorR1, LOW);
  digitalWrite(motorR2, LOW);
}

void gripObject() {
  for (int angle = 0; angle <= 90; angle += 5) {
    gripperServo.write(angle);
    delay(50);
  }
}

void releaseObject() {
  for (int angle = 90; angle >= 0; angle -= 5) {
    gripperServo.write(angle);
    delay(50);
  }
}

void reportStatus(String msg) {
  Serial.print("[STATUS] ");
  Serial.println(msg);
  btSerial.print("[STATUS] ");
  btSerial.println(msg);
  digitalWrite(ledPin, HIGH);
  delay(100);
  digitalWrite(ledPin, LOW);
}

void loop() {
  int distance = getDistance();

  switch(currentState) {
    case SEARCHING:
      Serial.println("State: SEARCHING");
      moveForward(150);
      if (distance < 30) {
        reportStatus("Object detected!");
        currentState = APPROACHING;
      }
      break;

    case APPROACHING:
      Serial.println("State: APPROACHING");
      if (distance > 10) {
        moveForward(100);
      } else {
        stopMotors();
        currentState = GRASPING;
      }
      break;

    case GRASPING:
      Serial.println("State: GRASPING");
      gripObject();
      reportStatus("Object grasped");
      delay(500);
      currentState = RETURNING;
      break;

    case RETURNING:
      Serial.println("State: RETURNING");
      // Navigate back (simplified: just reverse)
      for (int i = 0; i < 100; i++) {
        digitalWrite(motorL1, LOW);
        analogWrite(motorL2, 150);
        digitalWrite(motorR1, LOW);
        analogWrite(motorR2, 150);
        delay(50);
      }
      stopMotors();
      releaseObject();
      reportStatus("Object delivered");
      currentState = IDLE;
      break;

    case IDLE:
      Serial.println("State: IDLE");
      delay(2000);
      currentState = SEARCHING;
      break;
  }

  delay(100);
}`,
    output: `[STATUS] System initialized
State: SEARCHING
State: SEARCHING
[STATUS] Object detected!
State: APPROACHING
State: APPROACHING
[STATUS] Object grasped
State: RETURNING
[STATUS] Object delivered
State: IDLE`,
    notes: [
      `State machines (FSM) organize complex behavior. Each state has clear entry/exit conditions.`,
      `Logging (Serial + Bluetooth) enables remote debugging and mission analysis.`,
      `Integration testing: test each subsystem separately before combining.`,
    ],
    practice: {
      title: 'Complete Integrated Project',
      description: `Propose a 4-week robotics project: autonomous delivery, search & rescue, or agricultural robot. Define: (1) hardware BOM, (2) sensor/motor specs, (3) control algorithm, (4) testing plan, (5) success criteria.`,
      startCode: ``,
      hint: `Scope realistically. Focus on core features (navigation, detection, manipulation). Skip nice-to-haves. Build MVP first, then enhance.`,
    },
  },
];
