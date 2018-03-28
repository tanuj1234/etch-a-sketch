#define SENSORPINA A0 // x axis
 //TODO: define other sensor inputs
#define SENSORPINB A1 //y axis
const int RESET = 2;
unsigned long targetTime=0;
const unsigned long interval=100; //TODO: How fast should we read
String x = "";
String y = "";



void setup(){
// TODO: begin the serial connection with a baudrate of 115200
Serial.begin(115200);
pinMode(SENSORPINA, INPUT);
pinMode(SENSORPINB, INPUT);
pinMode(RESET, INPUT);

}


void loop(){
	if(millis()>=targetTime){
		targetTime= millis()+interval;
		x = String(analogRead(SENSORPINA),DEC);
		y = String(analogRead(SENSORPINB),DEC);
		Serial.println(String(x + "," + y));

		 //TODO: Add other sensor read outs
     //TODO: convert values into a string https://www.arduino.cc/en/Tutorial/StringConstructors
		 //TODO: combine them into a string that can be understood by server.js
		 //TODO: send the string over serial


	}
	if(digitalRead(RESET)){
		Serial.println("rst");
	
	}
	// TODO: Detect if you want to reset the screen(shake the etch-a-sketch)
  // TODO: write the reset message(see server.js) to the serial port

}
