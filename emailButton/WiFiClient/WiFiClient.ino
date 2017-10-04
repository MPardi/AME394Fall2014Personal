

#include <ESP8266WiFi.h>

const char* ssid     = "Tejaswi";
const char* password = "12345678";

const char* host = "52.34.69.96";

String emailAddress;

const int buttonPin = D2;
int buttonState = 0;         // variable for reading the pushbutton status

void setup() {
  pinMode(buttonPin, INPUT);

  Serial.begin(115200);
  delay(10);


  // We start by connecting to a WiFi network

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

}

int lastVal = 1;
int num = 1;
void handleButtonPress(String email)
{
  Serial.print("Button Press #");
  Serial.println(num);
  num++;


  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  const int httpPort = 8080;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  // We now create a URI for the request
  String url = "/update?email=";
  url += email;

  Serial.print("Requesting URL: ");
  Serial.println(url);

  // This will send the request to the server
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "Connection: close\r\n\r\n");
  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 5000) {
      Serial.println(">>> Client Timeout !");
      client.stop();
      return;
    }
  }

  // Read all the lines of the reply from server and print them to Serial
  while (client.available()) {
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }

  Serial.println();
  Serial.println("closing connection");

}

void loop() {
  buttonState = digitalRead(buttonPin);
  //Serial.println(buttonState);
  if (buttonState == 1 && lastVal == 0) {
    Serial.print("Please enter desired email address: ");
    emailAddress = Serial.read();
    handleButtonPress(emailAddress);
  }
  lastVal = buttonState;
  /*
    delay(5000);


    Serial.print("connecting to ");
    Serial.println(host);


  */
}

