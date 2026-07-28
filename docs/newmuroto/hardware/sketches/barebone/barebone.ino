#include <avr/delay_basic.h>

// ---- PORT CONFIG ----
// PB0
// PB1
// PB2 <- Optocoupler Q1
// PB3 <- Optocoupler Q2
// PB4
// PB5 <- Optocoupler Q3
// PC0 -> LED 0
// PC1 -> LED 1
// PC2
// PC3
// PC4 == I2C SDA
// PC5 == I2C SCL
// PD0 == UART RxD
// PD1 == UART TxD
// PD2 <- SW0
// PD3 <- SW1
// PD4
// PD5 -> 595 STCP
// PD6 -> 595 SHCP
// PD7 -> 595 DATA

#define _nop()  __asm__("nop\n\t")

void relay_out(uint8_t dt)
{ // output relay data, MSB == P27, LSB == P20
  PORTD &= 0x1f;
  for (uint8_t i = 0; i < 8; i++) {
    PORTD |= dt & 0x80;
    PORTD |= 0x40;
    dt <<= 1;
    _nop();
    PORTD &= 0x1f;
  }
  PORTD |= 0x20;
  _nop();
  _nop();
  PORTD &= 0x1f;
}

void led_out(uint8_t dt)
{ // output LED, 0x02 == LED 1, 0x01 == LED 0
  dt &= 3;
  PORTC = (PORTC & 0xfc) | dt;
}

uint8_t opto_in()
{ // input optocouplers, 0x04 == Q3, 0x02 == Q2, 0x01 == Q1
  // bit high == dark, bit low == bright
  uint8_t rt = (PINB >> 2) & 0x0b;
  rt |= ((rt >> 1) & 0x04);
  rt &= 0x07;
  return (rt);
}

uint8_t switch_in()
{ // input switches, 0x02 == SW1, 0x01 == SW0
  // bit high == not pressed, bit low == pressed
  return ((PIND >> 2) & 3);
}


void setup()
{
  DDRD |= 0xe0;
  PORTD |= 0x0c;
  DDRC |= 0x03;
  DDRB = 0x13;
}

void loop()
{
  uint8_t dt = 1;
  if ((switch_in() & 1) == 0) {
    delay(100);
    for (uint8_t i = 0; i < 8; i++) {
      relay_out(dt);
      delay(50);
      relay_out(0);
      delay(25);
      dt <<= 1;
    }
  }
  if ((switch_in() & 2) == 0) {
    uint8_t opto = opto_in();
    relay_out(opto);
    led_out(opto);
  }
  
}
  
