Lab 6 - Interactive Device Design

Part A. Node Canvas
Where in this code does the drawing occur?
Ans. In the client.js file.

What are the inputs to the drawing function?
Ans. The input to the drawing function is the serial value from Potentiometers’ which is pushed from Arduino to the client.js via server.js by calling ‘new-pos’ event.
(sensorCode.ino)
                                
(server.js)
			
(client.js)
How can the screen be cleared?
Ans. By using a trigger (in this case an external push button) to send serial value ‘rst’ to server.js causes it to emit ‘reset’ event which further triggers ‘ctx.clear()’ in client.js which finally removes all strokes from the canvas.
(server.js)
				
(client.js)

Part B. Etch a Sketch
Describe which sensors you are using as inputs and why.
Ans.  I have used two regular potentiometers for x-axis and y-axis values respectively because it offers an easy and intuitive way of sending values.
Further, I have used a button to trigger Screen Reset again because of its intuitive nature and ease of use to the end-user.
In what format does the server expect the X & Y values from the Arduino?
Ans. The server expects a String with format x,y as indicated by the following line of code:

What else does the Arduino need to do? The sensorCode folder has an almost working example.
Ans. 
- Begin serial communication with Baud Rate of 115200.


- Add other sensors’ read outs and convert values into a string.


- Combine string values in a format understandable by server.js and send the string over serial


- Reset the screen using button

What range of output X & Y values do you need? Is it better to map the values from the inputs to the outputs in the Arduino code, the Node code or Client code ? Why?
Ans. X and Y values need to be the height and width of the screen. 
It is better to map the values at Client code side because the client code is the one which is directly accessing the canvas and drawing over it.

To achieve this, the serial data is reduced to the width and height of the screen by using a mapping function.

How often do you need to be sending data from the Arduino?
Ans. Whenever the user changes value using potentiometer, the data is sent over to the client.
Include a copy of the Arduino code, and a copy of your Server and client side code.
Ans. The code can be accessed at the github repository:


Part C. Make it yours
Upload video of your Etch-a-Sketch in action, being used by someone else in the class!
Ans. Features added:
1) Random color generation with an arc-line while in middle of drawing
2) Ability for the user to set Line Stroke thickness while in the middle of drawing.

Link: https://drive.google.com/file/d/1npE6Il8Z9oyuvGW4_-kqzQzVF-Um_T_K/view?usp=sharing
