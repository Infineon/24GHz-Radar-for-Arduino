#include <Arduino.h>

void setup()
{
  Serial.begin(38400);
  Serial.println("Init done!");

  // Only necessary when directly communicating with the board
  pinMode(BGT_ON, OUTPUT);
  digitalWrite(BGT_ON, LOW); // Turn on the board
}

void loop()
{
  Serial.print(analogRead(CH_I));   // Read and print I
  Serial.print(' ');
  Serial.println(analogRead(CH_Q)); // Read and print Q
}