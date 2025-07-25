#include <SoftwareSerial.h>
#include <Servo.h>

Servo myservo1;  // create servo object to control a servo
Servo myservo2;

SoftwareSerial nodemcu(0,1);

int parking1_slot1_ir_s = 3; // parking slot1 infrared sensor connected with pin number 4 of arduino
int parking1_slot2_ir_s = 4;
int parking1_slot3_ir_s = 5;

int parking2_slot1_ir_s = 6;
int parking2_slot2_ir_s = 7;
int parking2_slot3_ir_s = 8;

int entrance_gate = 11;
int exit_gate = 12;

int pos1 = 3;    // variable to store the servo position(entrance gate)
int pos2 = 13;    // exit gate

String sensor1; 
String sensor2; 
String sensor3; 
String sensor4; 
String sensor5; 
String sensor6; 


String cdata =""; // complete data, consisting of sensors values

void setup()
{
Serial.begin(9600); 
nodemcu.begin(9600);

pinMode(parking1_slot1_ir_s, INPUT);
pinMode(parking1_slot2_ir_s, INPUT);
pinMode(parking1_slot3_ir_s, INPUT);

pinMode(parking2_slot1_ir_s, INPUT);
pinMode(parking2_slot2_ir_s, INPUT);
pinMode(parking2_slot3_ir_s, INPUT);

pinMode(entrance_gate, INPUT);
pinMode(exit_gate, INPUT);

myservo1.attach(13);  // attaches the servo on pin 9 to the servo object
myservo2.attach(3);


}

void loop()
{

p1slot1(); 
p1slot2();
p1slot3(); 

p2slot1();
p2slot2();
p2slot3();

gates();
//conditions();

  
  
   cdata = cdata + sensor1 +"," + sensor2 + ","+ sensor3 +","+ sensor4 + "," + sensor5 + "," + sensor6 +","; // comma will be used a delimeter
   Serial.println(cdata); 
   nodemcu.println(cdata);
   delay(6000); // 100 milli seconds
   cdata = ""; 
digitalWrite(parking1_slot1_ir_s, HIGH); 
digitalWrite(parking1_slot2_ir_s, HIGH); 
digitalWrite(parking1_slot3_ir_s, HIGH);

digitalWrite(parking2_slot1_ir_s, HIGH);
digitalWrite(parking2_slot2_ir_s, HIGH);
digitalWrite(parking2_slot3_ir_s, HIGH);

digitalWrite(entrance_gate, HIGH);
digitalWrite(exit_gate, HIGH);
}


void p1slot1() // parkng 1 slot1
{
  if( digitalRead(parking1_slot1_ir_s) == LOW) 
  {
  sensor1 = "255";
 delay(200); 
  } 
if( digitalRead(parking1_slot1_ir_s) == HIGH)
{
  sensor1 = "0";  
 delay(200);  
}

}

void p1slot2() // parking 1 slot2
{
  if( digitalRead(parking1_slot2_ir_s) == LOW) 
  {
  sensor2 = "255"; 
  delay(200); 
  }
if( digitalRead(parking1_slot2_ir_s) == HIGH)  
  {
  sensor2 = "0";  
 delay(200);
  } 
}


void p1slot3() // parking 1 slot3
{
  if( digitalRead(parking1_slot3_ir_s) == LOW) 
  {
  sensor3 = "255"; 
  delay(200); 
  }
if( digitalRead(parking1_slot3_ir_s) == HIGH)  
  {
  sensor3 = "0";  
 delay(200);
  } 
}


// now for parking 2

void p2slot1() // parking 1 slot3
{
  if( digitalRead(parking2_slot1_ir_s) == LOW) 
  {
  sensor4 = "255"; 
  delay(200); 
  }
if( digitalRead(parking2_slot1_ir_s) == HIGH)  
  {
  sensor4 = "0";  
 delay(200);
  } 
}


void p2slot2() // parking 1 slot3
{
  if( digitalRead(parking2_slot2_ir_s) == LOW) 
  {
  sensor5 = "255"; 
  delay(200); 
  }
if( digitalRead(parking2_slot2_ir_s) == HIGH)  
  {
  sensor5 = "0";  
 delay(200);
  } 
}


void p2slot3() // parking 1 slot3
{
  if( digitalRead(parking2_slot3_ir_s) == LOW) 
  {
  sensor6 = "255"; 
  delay(200); 
  }
if( digitalRead(parking2_slot3_ir_s) == HIGH)  
  {
  sensor6 = "0";  
 delay(200);
  } 
}

// for the gates

void gates()
{
  if (digitalRead(exit_gate) == LOW)
      {
        for (pos2 = 90; pos2 <= 180 ; pos2 += 1) { // goes from 0 degrees to 180 degrees
          // in steps of 1 degree
          myservo2.write(pos2);              // tell servo to go to position in variable 'pos'
          delay(15);                       // waits 15ms for the servo to reach the position
        }
          delay(1000);
        for (pos2 = 180; pos2 >= 90; pos2 -= 1) { // goes from 180 degrees to 0 degrees
          myservo2.write(pos2);              // tell servo to go to position in variable 'pos'
          delay(15);                       // waits 15ms for the servo to reach the position
        }
      }
  
  if (((digitalRead(entrance_gate) == LOW)) && (( digitalRead(parking1_slot1_ir_s) == HIGH) || ( digitalRead(parking1_slot2_ir_s) == HIGH) || ( digitalRead(parking1_slot3_ir_s) == HIGH) || ( digitalRead(parking2_slot1_ir_s) == HIGH) || ( digitalRead(parking2_slot2_ir_s) == HIGH)|| ( digitalRead(parking2_slot3_ir_s) == HIGH)))
      {
        for (pos1 = 0; pos1 <= 90 ; pos1 += 1) { // goes from 0 degrees to 180 degrees
          // in steps of 1 degree
          myservo1.write(pos1);              // tell servo to go to position in variable 'pos'
          delay(15);                       // waits 15ms for the servo to reach the position
        }
          delay(1000);
        for (pos1 = 90; pos1 >= 0; pos1 -= 1) { // goes from 180 degrees to 0 degrees
          myservo1.write(pos1);              // tell servo to go to position in variable 'pos'
          delay(15);                       // waits 15ms for the servo to reach the position
        }
      }


}
