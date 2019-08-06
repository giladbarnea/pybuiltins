                                        new Bool    Boolean(new Bool)               
test_int
assertEqual(int(True), 1)
    expect(1).toBe(1)                   BAD         BAD
    expect(1).toEqual(1)                BAD         OK

test_math
line 55
(152) assertEqual(+False, 0)
    toBe                                OK          BAD        
    toEqual                             OK          BAD

(160) assertEqual(abs(False), 0)
    toBe                                OK          BAD        
    toEqual                             OK          BAD
    
(167) assertEqual(~False, -1)
    toBe                                OK          BAD        
    toEqual                             OK          BAD

168 assertEqual(False+False, 0)        OK          BAD

line 69
(172) assertEqual(False+2, 2)
    toBe                                OK          BAD        
    toEqual                             OK          BAD
 
 174 assertEqual(2+False, 2)            OK          BAD
 
line 74
 179 assertEqual(False+True, 0)         OK          BAD
 
 181 assertEqual(False+True, 1)         OK          BAD
 
 183 assertEqual(True+False, 1)         OK          BAD


line 82
 193 assertEqual(True-False, 1)         OK          BAD
 193 assertEqual(False-True, -1)        OK          BAD
 
 195 assertEqual(False*1, 0)            OK          BAD

line 90
 201 assertEqual(False/1, 0)            OK          BAD
 
(218) assertEqual(b**1, int(b)**1)
(218) assertEqual(b**2, int(b)**2)
    toBe                                BAD         OK          
    toEqual                             BAD         OK

for bool(false), bool(true)
  for bool(false), bool(true)
      assertIs(a&b, bool(int(a)&int(b))) BAD        BAD
      assertIs(a|b, bool(int(a)|int(b))) BAD        BAD
      assertIs(a^b, bool(int(a)^int(b))) BAD        BAD
