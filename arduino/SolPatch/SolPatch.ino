/*
SolPatch base station firmware.
Nick Wong
*/

#include <GSM.h>

#define GSM_PIN ""
// initialize the library instance
GSM gsmAccess;
GSM_SMS sms;

// Pin definitions
// GSM_RX on pin 2
// GSM_TX on pin 3
#define TRIGGER_PIN 9
#define RELAY_PIN 8
// Pin definitions - end

char serverNumber[] = "+19177466409\0";

char relay_state = '1';

// Array to hold the number a SMS is retreived from
char senderNumber[20];  
char mAh[] = {'9','.','7','5'};

void setup() {
  pinMode(TRIGGER_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);

  Serial.begin(9600);  
  Serial.println("SMS Messages Sender");
 
  // SMS connection state
  boolean smsConnected = false;
  // Start GSM shield
  // If your SIM has PIN, pass it as a parameter of begin() in quotes
  while(!smsConnected) {
    if(gsmAccess.begin(GSM_PIN)==GSM_READY) {
      smsConnected = true;
      Serial.println("GSM initialized");
    }
    else {
      Serial.println("Not connected");
      delay(1000);
    }
  }
}

void sendDatalog(void) {
  Serial.println("Sending SMS to:");
  Serial.println(serverNumber);
  char txtMsg[] = {'s','o','l','p','a','t','c','h','\n',
  'p','o','r','t',' ','1','\n',
  'k','W','h',':','1','.','7','5','\n',
  's','t','a','t','e',':',relay_state,'\n',
  '\0'};
  //char txtMsg[] = {'t','e','s','t','i','n','g','\0'};
  //readSerial(txtMsg);
  Serial.println("SENDING");
  Serial.println();
  Serial.println("Message:");
  Serial.println(txtMsg);
  
  // send the message
  sms.beginSMS(serverNumber);
  sms.print(txtMsg);
  sms.endSMS(); 
  Serial.println("\nCOMPLETE!\n");
  
  return;
}

void receiveSMS(void) {
  char c;
  Serial.println("Message received from:");
  // Get remote number
  sms.remoteNumber(senderNumber, 20);
  Serial.println(senderNumber);

  // An example of message disposal    
  // Any messages starting with # should be discarded
  if(sms.peek()=='#')
  {
    Serial.println("Discarded SMS");
    sms.flush();
  }
  
  // Read message bytes and print them
  /*
  while(c=sms.read())
    Serial.print(c);
  */
  c=sms.read();
  Serial.print(c);
  if (c == 'N') {
    relay_state = '0';
    digitalWrite(RELAY_PIN, LOW);
  }  
  if (c == 'Y') {
    relay_state = '1';
    digitalWrite(RELAY_PIN, HIGH);
  }
  Serial.println("\nEND OF MESSAGE");
  
  // Delete message from modem memory
  sms.flush();
  Serial.println("MESSAGE DELETED");
}

void loop()
{
  if(digitalRead(TRIGGER_PIN) == HIGH) {
      Serial.println("Manual trigger");
      sendDatalog();
  }  
  
  // If there are any SMSs available()  
  if (sms.available())
  {
    receiveSMS();
  }
  

  delay(500);
}

/*
  Read input serial
 */
int readSerial(char result[])
{
  int i = 0;
  while(1)
  {
    while (Serial.available() > 0)
    {
      Serial.println("...");
      char inChar = Serial.read();
      if (inChar == '\n')
      {
        result[i] = '\0';
        Serial.flush();
        return 0;
      }
      if(inChar!='\r')
      {
        result[i] = inChar;
        i++;
      }
    }
  }
}
