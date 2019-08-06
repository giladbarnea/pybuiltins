                                        new Bool    Boolean(new Bool)               
test_int
assertEqual(int(True), 1)
    expect(1).toBe(1)                   BAD         BAD
    expect(1).toEqual(1)                BAD         OK

test_math
(152) assertEqual(+False, 0)
    toBe                                OK          BAD        
    toEqual                             OK          BAD

(159) assertEqual(abs(False), 0)
    toBe                                OK          BAD        
    toEqual                             OK          BAD
    
(166) assertEqual(~False, -1)
    toBe                                OK          BAD        
    toEqual                             OK          BAD
    
(171) assertEqual(False+2, 2)
    toBe                                OK          BAD        
    toEqual                             OK          BAD
 
 173 assertEqual(2+False, 2)            OK          BAD
 
 177 assertEqual(False+False, 0)        OK          BAD
 
 179 assertEqual(False+True, 1)         OK          BAD
 
 181 assertEqual(True+False, 1)         OK          BAD
    
 190 assertEqual(True-False, 1)         OK          BAD
 
 192 assertEqual(False-True, -1)        OK          BAD
 
 196 assertEqual(False*1, 0)            OK          BAD
 
 202 assertEqual(False/1, 0)            OK          BAD
 
(218) assertEqual(b**1, int(b)**1)
(218) assertEqual(b**2, int(b)**2)
    toBe                                BAD         OK          
    toEqual                             BAD         OK
