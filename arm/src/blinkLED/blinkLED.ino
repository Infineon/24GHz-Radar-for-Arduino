#include <Arduino.h> // Include Arduino library

void setup() // Do some preparations (once)
{
  Serial.begin(9600);    // Start a serial connection
  pinMode(LED1, OUTPUT); // Set our LED as an output, so it can be controlled
}

void loop() // Repeat the following code
{
  digitalWrite(LED1, HIGH);   // Turn on the LED
  Serial.println("LED on");   // Send message to the serial port
  delay(500);                 // Wait 0.5 seconds
  digitalWrite(LED1, LOW);    // Send message to the serial port
  Serial.println("LED off");  // Turn of the LED
  delay(500);                 // Wait 0.5 seconds
}