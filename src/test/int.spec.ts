import {int, Int} from "../int";
import {bool} from "../bool";
import {ValueError, ZeroDivisionError} from "../exceptions"
import {Chance} from 'chance';

const chance = new Chance();

function valerr(literal, base?) {
    return new ValueError(`invalid literal for int() with base ${base === undefined ? 10 : base}: '${literal}'`)
}

/**\Lib\test\test_int.py*/
describe('CPython Tests', () => {
    const L = [
        ['0', 0],
        ['1', 1],
        ['9', 9],
        ['10', 10],
        ['99', 99],
        ['100', 100],
        ['314', 314],
        [' 314', 314],
        ['314 ', 314],
        [false, 0],
        ['  \t\t  314  \t\t  ', 314],
        // [repr(sys.maxsize), sys.maxsize],
        ['  1  ', 1],
    ];
    describe('test_basic', () => {
        expect(int()).toEqual(0);
        expect(int(false)).toEqual(0);
        test('int(314)', () => expect(int(314)).toEqual(314));
        expect(int(3.14)).toEqual(3);
        // Check that conversion from float truncates towards zero
        expect(int(-3.14)).toEqual(-3);
        expect(int(3.9)).toEqual(3);
        expect(int(-3.9)).toEqual(-3);
        expect(int(3.5)).toEqual(3);
        expect(int(-3.5)).toEqual(-3);
        test('int("-3")', () => expect(int("-3")).toEqual(-3));
        test('int(" -3 ")', () => expect(int(" -3 ", undefined)).toEqual(-3));
        test('int("10", 16)', () => expect(int("10", 16)).toEqual(16));
        
        for (let [s, v] of L) {
            for (let sign of ["", "+", "-"]) {
                for (let prefix of ["", " ", "\t", "  \t\t  "]) {
                    let ss = prefix + sign + s;
                    let vv = v;
                    if (sign == "-") {
                        vv = -v
                    }
                    try {
                        let actual = int(ss);
                        test(`int('${ss}').toEqual(${vv})`, () => expect(actual).toEqual(vv));
                    } catch (e) {
                        let isValueError = e instanceof ValueError;
                        if (!isValueError) {
                            console.log('failed toEqual.\nexpected:', vv, {prefix, sign, s, v, ss, e});
                            throw e
                        } else {
                            // source ignores ValueErrors here
                        }
                    }
                    
                }
            }
        }
        
        
        /*s = repr(-1-sys.maxsize)
        x = int(s)
        self.assertEqual(x+1, -sys.maxsize)
        self.assertIsInstance(x, int)
        # should return int
        self.assertEqual(int(s[1:]), sys.maxsize+1)
        */
        
        // should return int
        expect(int(1e100)).toBeInstanceOf(Int);
        expect(int(-1e100)).toBeInstanceOf(Int);
        
        
        /*x = -1-sys.maxsize
        */
        let x = int('1' * 600);
        expect(x >> 1).toEqual(x / 2);
        
        expect(x).toBeInstanceOf(Int);
        expect(() => int(1, 12)).toThrow(TypeError);
        
        test("int('0x123', 16)", () => expect(int('0x123', 16)).toEqual(291));
        test("int('0x123', 0)", () => expect(int('0x123', 0)).toEqual(291)); // mine
        test("int('0o123', 0)", () => expect(int('0o123', 0)).toEqual(83)); // mine
        
        
        test("int('0x', 16) ValueError", () => expect(() => int('0x', 16)).toThrow(ValueError));
        test("int('0x', 0) ValueError", () => expect(() => int('0x', 0)).toThrow(ValueError));
        test("int('0o', 8) ValueError", () => expect(() => int('0o', 8)).toThrow(ValueError));
        test("int('0o', 0) ValueError", () => expect(() => int('0o', 0)).toThrow(ValueError));
        test("int('0b', 2) ValueError", () => expect(() => int('0b', 2)).toThrow(ValueError));
        test("int('0b', 0) ValueError", () => expect(() => int('0b', 0)).toThrow(ValueError));
        
        // Lib\test\test_int.py
        describe('2**32 (4294967296)', () => {
            
            test("int('100000000000000000000000000000000', 2)", () => expect(int('100000000000000000000000000000000', 2)).toEqual(4294967296));
            test("int('102002022201221111211', 3)", () => expect(int('102002022201221111211', 3)).toEqual(4294967296));
            test("int('10000000000000000', 4)", () => expect(int('10000000000000000', 4)).toEqual(4294967296));
            test("int('32244002423141', 5)", () => expect(int('32244002423141', 5)).toEqual(4294967296));
            test("int('1550104015504', 6)", () => expect(int('1550104015504', 6)).toEqual(4294967296));
            test("int('211301422354', 7)", () => expect(int('211301422354', 7)).toEqual(4294967296));
            test("int('12068657454', 9)", () => expect(int('12068657454', 9)).toEqual(4294967296));
            test("int('4294967296', 10)", () => expect(int('4294967296', 10)).toEqual(4294967296));
            test("int('1904440554', 11)", () => expect(int('1904440554', 11)).toEqual(4294967296));
            test("int('9ba461594', 12)", () => expect(int('9ba461594', 12)).toEqual(4294967296));
            test("int('535a79889', 13)", () => expect(int('535a79889', 13)).toEqual(4294967296));
            test("int('2ca5b7464', 14)", () => expect(int('2ca5b7464', 14)).toEqual(4294967296));
            test("int('1a20dcd81', 15)", () => expect(int('1a20dcd81', 15)).toEqual(4294967296));
            test("int('100000000', 16)", () => expect(int('100000000', 16)).toEqual(4294967296));
            test("int('a7ffda91', 17)", () => expect(int('a7ffda91', 17)).toEqual(4294967296));
            test("int('704he7g4', 18)", () => expect(int('704he7g4', 18)).toEqual(4294967296));
            test("int('4f5aff66', 19)", () => expect(int('4f5aff66', 19)).toEqual(4294967296));
            test("int('3723ai4g', 20)", () => expect(int('3723ai4g', 20)).toEqual(4294967296));
            test("int('281d55i4', 21)", () => expect(int('281d55i4', 21)).toEqual(4294967296));
            test("int('1fj8b184', 22)", () => expect(int('1fj8b184', 22)).toEqual(4294967296));
            test("int('1606k7ic', 23)", () => expect(int('1606k7ic', 23)).toEqual(4294967296));
            test("int('mb994ag', 24)", () => expect(int('mb994ag', 24)).toEqual(4294967296));
            test("int('hek2mgl', 25)", () => expect(int('hek2mgl', 25)).toEqual(4294967296));
            test("int('dnchbnm', 26)", () => expect(int('dnchbnm', 26)).toEqual(4294967296));
            test("int('b28jpdm', 27)", () => expect(int('b28jpdm', 27)).toEqual(4294967296));
            test("int('8pfgih4', 28)", () => expect(int('8pfgih4', 28)).toEqual(4294967296));
            test("int('76beigg', 29)", () => expect(int('76beigg', 29)).toEqual(4294967296));
            test("int('5qmcpqg', 30)", () => expect(int('5qmcpqg', 30)).toEqual(4294967296));
            test("int('4q0jto4', 31)", () => expect(int('4q0jto4', 31)).toEqual(4294967296));
            test("int('4000000', 32)", () => expect(int('4000000', 32)).toEqual(4294967296));
            test("int('3aokq94', 33)", () => expect(int('3aokq94', 33)).toEqual(4294967296));
            test("int('2qhxjli', 34)", () => expect(int('2qhxjli', 34)).toEqual(4294967296));
            test("int('2br45qb', 35)", () => expect(int('2br45qb', 35)).toEqual(4294967296));
            test("int('1z141z4', 36)", () => expect(int('1z141z4', 36)).toEqual(4294967296));
        });
        
        describe('base 0', () => {
            test("int(' 0o123  ', 0)", () => expect(int(' 0o123  ', 0)).toEqual(83));
            test("int('000', 0)", () => expect(int('000', 0)).toEqual(0));
            test("int('0o123', 0)", () => expect(int('0o123', 0)).toEqual(83));
            test("int('0x123', 0)", () => expect(int('0x123', 0)).toEqual(291));
            test("int('0b100', 0)", () => expect(int('0b100', 0)).toEqual(4));
            test("int(' 0O123   ', 0)", () => expect(int(' 0O123   ', 0)).toEqual(83));
            test("int(' 0X123  ', 0)", () => expect(int(' 0X123  ', 0)).toEqual(291));
            test("int(' 0B100 ', 0)", () => expect(int(' 0B100 ', 0)).toEqual(4));
        });
        test('without base still base 10', () => {
            expect(int('0123')).toEqual(123);
            expect(int('0123', 10)).toEqual(123);
        });
        describe('with prefix and base != 0', () => {
            
            test("int('0x123', 16)", () => expect(int('0x123', 16)).toEqual(291));
            test("int('0o123', 8)", () => expect(int('0o123', 8)).toEqual(83));
            test("int('0b100', 2)", () => expect(int('0b100', 2)).toEqual(4));
            test("int('0X123', 16)", () => expect(int('0X123', 16)).toEqual(291));
            test("int('0O123', 8)", () => expect(int('0O123', 8)).toEqual(83));
            test("int('0B100', 2)", () => expect(int('0B100', 2)).toEqual(4))
        });
        
        
        describe('special checks for the first character after the type prefix', () => {
            // 2 >= base 2
            test(`int('0b2', 0) ValueError`, () => expect(() => int('0b2', 0)).toThrow(ValueError));
            test(`int('0b2', 2) ValueError`, () => expect(() => int('0b2', 2)).toThrow(ValueError));
            test(`int('0b02', 2) ValueError`, () => expect(() => int('0b02', 2)).toThrow(ValueError));
            test(`int('0B2', 2) ValueError`, () => expect(() => int('0B2', 2)).toThrow(ValueError));
            test(`int('0B02', 2) ValueError`, () => expect(() => int('0B02', 2)).toThrow(ValueError));
            test(`int('0o8', 8) ValueError`, () => expect(() => int('0o8', 8)).toThrow(ValueError));
            test(`int('0o08', 8) ValueError`, () => expect(() => int('0o08', 8)).toThrow(ValueError));
            test(`int('0O8', 8) ValueError`, () => expect(() => int('0O8', 8)).toThrow(ValueError));
            test(`int('0O08', 8) ValueError`, () => expect(() => int('0O08', 8)).toThrow(ValueError));
            test(`int('0xg', 16) ValueError`, () => expect(() => int('0xg', 16)).toThrow(ValueError));
            test(`int('0x0g', 16) ValueError`, () => expect(() => int('0x0g', 16)).toThrow(ValueError));
            test(`int('0Xg', 16) ValueError`, () => expect(() => int('0Xg', 16)).toThrow(ValueError));
            test(`int('0X0g', 16) ValueError`, () => expect(() => int('0X0g', 16)).toThrow(ValueError));
        });
        
        describe('2**32 + 1 (4294967297)', () => {
            
            
            test("int('100000000000000000000000000000001', 2)", () => expect(int('100000000000000000000000000000001', 2)).toEqual(4294967297));
            test("int('102002022201221111212', 3)", () => expect(int('102002022201221111212', 3)).toEqual(4294967297));
            test("int('10000000000000001', 4)", () => expect(int('10000000000000001', 4)).toEqual(4294967297));
            test("int('32244002423142', 5)", () => expect(int('32244002423142', 5)).toEqual(4294967297));
            test("int('1550104015505', 6)", () => expect(int('1550104015505', 6)).toEqual(4294967297));
            test("int('211301422355', 7)", () => expect(int('211301422355', 7)).toEqual(4294967297));
            test("int('40000000001', 8)", () => expect(int('40000000001', 8)).toEqual(4294967297));
            test("int('12068657455', 9)", () => expect(int('12068657455', 9)).toEqual(4294967297));
            test("int('4294967297', 10)", () => expect(int('4294967297', 10)).toEqual(4294967297));
            test("int('1904440555', 11)", () => expect(int('1904440555', 11)).toEqual(4294967297));
            test("int('9ba461595', 12)", () => expect(int('9ba461595', 12)).toEqual(4294967297));
            test("int('535a7988a', 13)", () => expect(int('535a7988a', 13)).toEqual(4294967297));
            test("int('2ca5b7465', 14)", () => expect(int('2ca5b7465', 14)).toEqual(4294967297));
            test("int('1a20dcd82', 15)", () => expect(int('1a20dcd82', 15)).toEqual(4294967297));
            test("int('100000001', 16)", () => expect(int('100000001', 16)).toEqual(4294967297));
            test("int('a7ffda92', 17)", () => expect(int('a7ffda92', 17)).toEqual(4294967297));
            test("int('704he7g5', 18)", () => expect(int('704he7g5', 18)).toEqual(4294967297));
            test("int('4f5aff67', 19)", () => expect(int('4f5aff67', 19)).toEqual(4294967297));
            test("int('3723ai4h', 20)", () => expect(int('3723ai4h', 20)).toEqual(4294967297));
            test("int('281d55i5', 21)", () => expect(int('281d55i5', 21)).toEqual(4294967297));
            test("int('1fj8b185', 22)", () => expect(int('1fj8b185', 22)).toEqual(4294967297));
            test("int('1606k7id', 23)", () => expect(int('1606k7id', 23)).toEqual(4294967297));
            test("int('mb994ah', 24)", () => expect(int('mb994ah', 24)).toEqual(4294967297));
            test("int('hek2mgm', 25)", () => expect(int('hek2mgm', 25)).toEqual(4294967297));
            test("int('dnchbnn', 26)", () => expect(int('dnchbnn', 26)).toEqual(4294967297));
            test("int('b28jpdn', 27)", () => expect(int('b28jpdn', 27)).toEqual(4294967297));
            test("int('8pfgih5', 28)", () => expect(int('8pfgih5', 28)).toEqual(4294967297));
            test("int('76beigh', 29)", () => expect(int('76beigh', 29)).toEqual(4294967297));
            test("int('5qmcpqh', 30)", () => expect(int('5qmcpqh', 30)).toEqual(4294967297));
            test("int('4q0jto5', 31)", () => expect(int('4q0jto5', 31)).toEqual(4294967297));
            test("int('4000001', 32)", () => expect(int('4000001', 32)).toEqual(4294967297));
            test("int('3aokq95', 33)", () => expect(int('3aokq95', 33)).toEqual(4294967297));
            test("int('2qhxjlj', 34)", () => expect(int('2qhxjlj', 34)).toEqual(4294967297));
            test("int('2br45qc', 35)", () => expect(int('2br45qc', 35)).toEqual(4294967297));
            test("int('1z141z5', 36)", () => expect(int('1z141z5', 36)).toEqual(4294967297))
            
        });
    });
    //\Lib\test\test_int.py.test_underscores()
    describe('test_underscore', () => {
        describe('Various underscore literals', () => {
            
            
            // **  Base 0, different underscores
            test("int('0_0_0', 0)", () => expect(int('0_0_0', 0)).toEqual(0));
            test("int('000', 0)", () => expect(int('000', 0)).toEqual(0));
            
            test("int('4_2', 0)", () => expect(int('4_2', 0)).toEqual(42));
            test("int('42', 0)", () => expect(int('42', 0)).toEqual(42));
            
            test("int('1_0000_0000', 0)", () => expect(int('1_0000_0000', 0)).toEqual(100000000));
            test("int('100000000', 0)", () => expect(int('100000000', 0)).toEqual(100000000));
            
            test("int('0b1001_0100', 0)", () => expect(int('0b1001_0100', 0)).toEqual(148));
            test("int('0_b10010100', 0) ValueError", () => expect(() => int('0_b10010100', 0)).toThrow(ValueError));
            test("int('0b_10010100', 0)", () => expect(int('0b_10010100', 0)).toEqual(148));
            test("int('0b10010100', 0)", () => expect(int('0b10010100', 0)).toEqual(148));
            
            test("int('0xffff_ffff', 0)", () => expect(int('0xffff_ffff', 0)).toEqual(4294967295));
            test("int('0x_ffff_ffff', 0)", () => expect(int('0x_ffff_ffff', 0)).toEqual(4294967295));
            test("int('0_xffffffff', 0) ValueError", () => expect(() => int('0_xffffffff', 0)).toThrow(ValueError));
            test("int('0xffffffff', 0)", () => expect(int('0xffffffff', 0)).toEqual(4294967295));
            
            test("int('0o5_7_7', 0)", () => expect(int('0o5_7_7', 0)).toEqual(383));
            test("int('0o577', 0)", () => expect(int('0o577', 0)).toEqual(383));
            
            // **  Hexa
            // *  Underscore after selector, different bases
            test("int('0xa', 0)", () => expect(int('0xa', 0)).toEqual(10));
            test("int('0x_a', 0)", () => expect(int('0x_a', 0)).toEqual(10));
            test("int('0x_a', 16)", () => expect(int('0x_a', 16)).toEqual(10));
            test("int('0x_a', 33) ValueError", () => expect(() => int('0x_a', 33)).toThrow(ValueError));
            test("int('0x_a', 34)", () => expect(int('0x_a', 34)).toEqual(1132));
            
            // *  Underscore inside selector, different bases (does not throw only when base > selector)
            test("int('0_xa', 0) ValueError", () => expect(() => int('0_xa', 0)).toThrow(ValueError));
            test("int('0_xa', 16) ValueError", () => expect(() => int('0_xa', 16)).toThrow(ValueError));
            test("int('0_xa', 33) ValueError", () => expect(() => int('0_xa', 33)).toThrow(ValueError));
            test("int('0_xa', 34)", () => expect(int('0_xa', 34)).toEqual(1132));
            
            // **  Binary
            // *  Base 0 (throws only with inside underscore)
            test("int('0b0', 0)", () => expect(int('0b0', 0)).toEqual(0));
            test("int('0b_0', 0)", () => expect(int('0b_0', 0)).toEqual(0));
            test("int('0_b0', 0) ValueError", () => expect(() => int('0_b0', 0)).toThrow(ValueError));
            
            // *  Base 2 (throws only with inside underscore)
            test("int('0b0', 2)", () => expect(int('0b0', 2)).toEqual(0));
            test("int('0b_0', 2)", () => expect(int('0b_0', 2)).toEqual(0));
            test("int('0_b0', 2) ValueError", () => expect(() => int('0_b0', 2)).toThrow(ValueError));
            
            // *  Base 11 (all throw because of base, not underscore)
            test("int('0b0', 11) ValueError", () => expect(() => int('0b0', 11)).toThrow(ValueError));
            test("int('0b_0', 11) ValueError", () => expect(() => int('0b_0', 11)).toThrow(ValueError));
            test("int('0_b0', 11) ValueError", () => expect(() => int('0_b0', 11)).toThrow(ValueError));
            
            // *  Base 12 (does not throw)
            test("int('0b0', 12)", () => expect(int('0b0', 12)).toEqual(132));
            test("int('0b_0', 12)", () => expect(int('0b_0', 12)).toEqual(132));
            test("int('0_b0', 12)", () => expect(int('0_b0', 12)).toEqual(132));
            
            test("int('0o_5', 0)", () => expect(int('0o_5', 0)).toEqual(5));
            test("int('0_o5', 0) ValueError", () => expect(() => int('0_o5', 0)).toThrow(ValueError));
            test("int('0o5', 0)", () => expect(int('0o5', 0)).toEqual(5));
        });
        describe('Invalid underscore literals', () => {
            describe('Leading underscore', () => {
                test(`int('_0', 0) ValueError`, () => expect(() => int('_0', 0)).toThrow(ValueError));
                test(`int('_42', 0) ValueError`, () => expect(() => int('_42', 0)).toThrow(ValueError));
                test(`int('_0x', 0) ValueError`, () => expect(() => int('_0x', 0)).toThrow(ValueError));
                test(`int('_0b1', 0) ValueError`, () => expect(() => int('_0b1', 0)).toThrow(ValueError));
                test(`int('_0xf', 0) ValueError`, () => expect(() => int('_0xf', 0)).toThrow(ValueError));
                test(`int('_0o5', 0) ValueError`, () => expect(() => int('_0o5', 0)).toThrow(ValueError));
                test(`int('_0 if 1_Else 1', 0) ValueError`, () => expect(() => int('_0 if 1_Else 1', 0)).toThrow(ValueError));
                
            });
            describe('Trailing underscore', () => {
                test(`int('0_', 0) ValueError`, () => expect(() => int('0_', 0)).toThrow(ValueError));
                test(`int('42_', 0) ValueError`, () => expect(() => int('42_', 0)).toThrow(ValueError));
                test(`int('0x_', 0) ValueError`, () => expect(() => int('0x_', 0)).toThrow(ValueError));
                test(`int('0b1_', 0) ValueError`, () => expect(() => int('0b1_', 0)).toThrow(ValueError));
                test(`int('0xf_', 0) ValueError`, () => expect(() => int('0xf_', 0)).toThrow(ValueError));
                test(`int('0o5_', 0) ValueError`, () => expect(() => int('0o5_', 0)).toThrow(ValueError));
                test(`int('0 if 1_Else 1', 0) ValueError`, () => expect(() => int('0 if 1_Else 1', 0)).toThrow(ValueError));
                
            });
            describe('Underscores in the base selector', () => {
                test(`int('0_b0', 0) ValueError`, () => expect(() => int('0_b0', 0)).toThrow(ValueError));
                test(`int('0_b0', 12)`, () => expect(int('0_b0', 12)).toEqual(132));
                test(`int('0_xf', 0) ValueError`, () => expect(() => int('0_xf', 0)).toThrow(ValueError));
                test(`int('0_xf', 34)`, () => expect(int('0_xf', 34)).toEqual(1137));
                test(`int('0_o5', 0) ValueError`, () => expect(() => int('0_o5', 0)).toThrow(ValueError));
                test(`int('0_o5', 25)`, () => expect(int('0_o5', 25)).toEqual(605));
            });
            describe('Old-style octal', () => {
                test(`int('0_7', 0) ValueError`, () => expect(() => int('0_7', 0)).toThrow(ValueError));
                test(`int('07', 0) ValueError`, () => expect(() => int('07', 0)).toThrow(ValueError));
                test(`int('0_7') == 7`, () => expect(int('0_7', undefined)).toEqual(7));
                test(`int('07') == 7`, () => expect(int('07', undefined)).toEqual(7));
                test(`int('1_7', 0) == 17`, () => expect(int('1_7', 0)).toEqual(17));
                test(`int('19_99', 0) == 1999`, () => expect(int('19_99', 0)).toEqual(1999));
                test(`int('09_99', 0) ValueError`, () => expect(() => int('09_99', 0)).toThrow(ValueError));
            });
            describe('Multiple consecutive underscores', () => {
                test(`int('4_______2', 0) ValueError`, () => expect(() => int('4_______2', 0)).toThrow(ValueError));
                test(`int('0.1__4', 0) ValueError`, () => expect(() => int('0.1__4', 0)).toThrow(ValueError));
                test(`int('0.1__4j', 0) ValueError`, () => expect(() => int('0.1__4j', 0)).toThrow(ValueError));
                test(`int('0b1001__0100', 0) ValueError`, () => expect(() => int('0b1001__0100', 0)).toThrow(ValueError));
                test(`int('0xffff__ffff', 0) ValueError`, () => expect(() => int('0xffff__ffff', 0)).toThrow(ValueError));
                test(`int('0x___', 0) ValueError`, () => expect(() => int('0x___', 0)).toThrow(ValueError));
                test(`int('0o5__77', 0) ValueError`, () => expect(() => int('0o5__77', 0)).toThrow(ValueError));
                test(`int('1e1__0', 0) ValueError`, () => expect(() => int('1e1__0', 0)).toThrow(ValueError));
                test(`int('1e1__0j', 0) ValueError`, () => expect(() => int('1e1__0j', 0)).toThrow(ValueError));
            });
            describe('Underscore right before a dot', () => {
                
                test(`int('1_.4', 0) ValueError`, () => expect(() => int('1_.4', 0)).toThrow(ValueError));
                test(`int('1_.4j', 0) ValueError`, () => expect(() => int('1_.4j', 0)).toThrow(ValueError));
            });
            describe('Underscore right after a dot', () => {
                
                test(`int('1._4', 0) ValueError`, () => expect(() => int('1._4', 0)).toThrow(ValueError));
                test(`int('1._4j', 0) ValueError`, () => expect(() => int('1._4j', 0)).toThrow(ValueError));
                test(`int('._5', 0) ValueError`, () => expect(() => int('._5', 0)).toThrow(ValueError));
                test(`int('._5j', 0) ValueError`, () => expect(() => int('._5j', 0)).toThrow(ValueError));
            });
            describe('Underscore right after a sign', () => {
                
                test(`int('1.0e+_1', 0) ValueError`, () => expect(() => int('1.0e+_1', 0)).toThrow(ValueError));
                test(`int('1.0e+_1j', 0) ValueError`, () => expect(() => int('1.0e+_1j', 0)).toThrow(ValueError));
            });
            describe('Underscore right before j', () => {
                test(`int('1.4_j', 0) ValueError`, () => expect(() => int('1.4_j', 0)).toThrow(ValueError));
                test(`int('1.4e5_j', 0) ValueError`, () => expect(() => int('1.4e5_j', 0)).toThrow(ValueError));
            });
            describe('Underscore right before e', () => {
                test(`int('1_e1', 0) ValueError`, () => expect(() => int('1_e1', 0)).toThrow(ValueError));
                test(`int('1.4_e1', 0) ValueError`, () => expect(() => int('1.4_e1', 0)).toThrow(ValueError));
                test(`int('1.4_e1j', 0) ValueError`, () => expect(() => int('1.4_e1j', 0)).toThrow(ValueError));
            });
            describe('Complex cases with parens', () => {
                test(`int('(1+1.5_j_)', 0) ValueError`, () => expect(() => int('(1+1.5_j_)', 0)).toThrow(ValueError));
                test(`int('(1+1.5_j)', 0) ValueError`, () => expect(() => int('(1+1.5_j)', 0)).toThrow(ValueError));
            });
            
        });
        describe('Additional test cases with bases != 0, only for the constructor', () => {
            test('int("1_00", 3)', () => expect(int("1_00", 3)).toEqual(9));
            test('int("0_100")', () => expect(int("0_100", undefined)).toEqual(100));  // not valid as a literal!
            test('int("_100") ValueError', () => expect(() => int("_100")).toThrow(ValueError));
            test('"int("+_100") ValueError', () => expect(() => int("+_100", undefined)).toThrow(ValueError));
            test('int("1__00") ValueError', () => expect(() => int("1__00")).toThrow(ValueError));
            test('int("100_") ValueError', () => expect(() => int("100_")).toThrow(ValueError))
        });
        
    });
    describe('longobject.c', () => {
        // Objects\longobject.c.PyLong_FromString (2117)
        test('PyLong_FromString', () => {
            expect(int('10')).toEqual(10);
            expect(int('+10')).toEqual(10);
            expect(int('-10')).toEqual(-10);
        })
    })
});
describe('PyPy Tests', () => {
    test('inplace', () => {
        let eight = int(8);
        eight--;
        expect(eight).toEqual(7);
        let seven = int(7);
        seven++;
        expect(seven).toEqual(8);
    });
});
describe('Int vs pure JS', () => {
    test('operands', () => {
        
        let n1 = chance.integer();
        let n2 = chance.integer();
        let n0 = 0;
        let posn = chance.integer({min: 1});
        let negn = -posn;
        let int1 = int(n1);
        let int2 = int(n2);
        let int0 = int(0);
        let posint = int(posn);
        let negint = int(negn);
        expect(() => int1.divide(n0)).toThrow(ZeroDivisionError);
        expect(() => int1.divide("0")).toThrow(ZeroDivisionError);
        expect(() => int1.divide(int0)).toThrow(ZeroDivisionError);
        
        expect(-int1).toEqual(-n1);
        expect(-1 * int1).toEqual(-int1);
        
        expect(+int1).toEqual(+n1);
        expect(+int1).toEqual(n1);
        expect(1 * int1).toEqual(+int1);
        
        expect(int1 + int2).toEqual(n1 + n2);
        expect(int1 - int2).toEqual(n1 - n2);
        expect(int1 * int2).toEqual(n1 * n2);
        expect(int1 / int2).toEqual(n1 / n2);
        
        expect(int1 % int2).toEqual(n1 % n2);
        
        expect(int1 ** int2).toEqual(n1 ** n2);
        expect(int1 ** -int2).toEqual(n1 ** -n2);
        expect((-int1) ** int2).toEqual((-n1) ** n2);
        expect((-int1) ** -int2).toEqual((-n1) ** -n2);
        
        expect(Math.atan2(int1, int2)).toEqual(Math.atan2(n1, n2));
        expect(Math.abs(int1)).toEqual(Math.abs(n1));
        expect(Math.abs(-int1)).toEqual(Math.abs(n1));
        expect(Math.abs(negint)).toEqual(posint);
        expect(Math.abs(negn)).toEqual(posint);
        
        
        //    TODO: divmod
    });
    test('Boolean', () => {
        let pos = chance.integer({min: 1});
        let neg = chance.integer({max: 0});
        
        let intpos = int(pos);
        let intneg = int(neg);
        
        
        expect(Boolean(intpos)).toBe(true);
        
        
        expect(!Boolean(intpos)).toBe(false);
        expect(!intpos).toBe(false);
        
        expect(Boolean(intneg)).toBe(true);
        expect(!!intneg).toBe(true);
        expect(!Boolean(intneg)).toBe(false);
        expect(!intneg).toBe(false);
        
        // TODO: these fail
        /*
        let int0 = int(0);
        expect(Boolean(int0)).toBe(false);
        expect(!int0).toBe(true);
        expect(!!int0).toBe(false);
        
        expect(!!intpos).toBe(true);
        */
    });
    
});
describe.skip('Int vs pythonlang', () => {
    test('TypeError', () => {
        expect(() => int(list()))
            .toThrow(new TypeError(`int() argument must be a string, a bytes-like object or a number, not 'list'`));
        expect(() => int(dict()))
            .toThrow(new TypeError(`int() argument must be a string, a bytes-like object or a number, not 'dict'`));
    });
    test('bool', () => {
        let pos = chance.integer({min: 1});
        let neg = chance.integer({max: 0});
        let int0 = int(0);
        let intpos = int(pos);
        let intneg = int(neg);
        let boolintpos = bool(intpos);
        let boolintneg = bool(intneg);
        let boolint0 = bool(int0);
        
        expect(boolint0).toBe(false);
        expect(!boolint0).toBe(true);
        
        
        expect(boolintpos).toBe(true);
        expect(!boolintpos).toBe(false);
        
        
        expect(boolintneg).toBe(false);
        expect(!boolintneg).toBe(true);
        
        
    });
});
describe('Bitwise', () => {
    test('bitwise operators', () => {
        // https://wiki.python.org/moin/BitwiseOperators
        
    });
    describe('numbers with letters must have some base', () => {
        
        
        test("int('0711')", () => expect(int('0711')).toEqual(711));
        test("int('0b11') ValueError", () => expect(() => int('0b11')).toThrow(valerr('0b11')));
        test("int('0o11') ValueError", () => expect(() => int('0o11')).toThrow(valerr('0o11')));
        test("int('0x11') ValueError", () => expect(() => int('0x11')).toThrow(valerr('0x11')));
        test("int('0c11') ValueError", () => expect(() => int('0c11')).toThrow(valerr('0c11')));
        test("int('1c11') ValueError", () => expect(() => int('0c11')).toThrow(valerr('0c11')));
        test("int('11')", () => expect(int('11')).toEqual(11));
        
    });
    describe('base 0 works only if true bin/hex/oct, otherwise only if x[0] !== "0" and all char < 10 (base:=10)', () => {
        let _valerr = literal => valerr(literal, 0);
        test("int('0711', 0) ValueError", () => expect(() => int('0711', 0)).toThrow(_valerr('0711')));
        test("int('711', 0)", () => expect(int('711', 0)).toEqual(711));
        test("int('0b11', 0)", () => expect(int('0b11', 0)).toEqual(3));
        test("int('1b11', 0) ValueError", () => expect(() => int('1b11', 0)).toThrow(_valerr('1b11')));
        test("int('0o11', 0)", () => expect(int('0o11', 0)).toEqual(9));
        test("int('0x11', 0)", () => expect(int('0x11', 0)).toEqual(17));
        test("int('0c11', 0) ValueError", () => expect(() => int('0c11', 0)).toThrow(_valerr('0c11')));
        test("int('1c11', 0) ValueError", () => expect(() => int('1c11', 0)).toThrow(_valerr('1c11')));
        test("int('11', 0)", () => expect(int('11', 0)).toEqual(11));
    });
    describe('base 2 works only if all digits < 2 (including letters), or if letter - then only true binary of 0b[0-1]', () => {
        let _valerr = literal => valerr(literal, 2);
        describe(`0{foo}11 only bin and '11' don't ValueError`, () => {
            test("int('0711', 2) ValueError", () => expect(() => int('0711', 2)).toThrow(_valerr('0711')));
            test("int('0b11', 2)", () => expect(int('0b11', 2)).toEqual(3));
            test("int('1b11', 2) ValueError", () => expect(() => int('1b11', 2)).toThrow(_valerr('1b11')));
            test("int('0o11', 2) ValueError", () => expect(() => int('0o11', 2)).toThrow(_valerr('0o11')));
            test("int('0x11', 2) ValueError", () => expect(() => int('0x11', 2)).toThrow(_valerr('0x11')));
            test("int('0c11', 2) ValueError", () => expect(() => int('0c11', 2)).toThrow(_valerr('0c11')));
            test("int('11', 2)", () => expect(int('11', 2)).toEqual(3));
        });
        describe('0{foo}12 All ValueErrors', () => {
            
            test("int('0712', 2) ValueError", () => expect(() => int('0712', 2)).toThrow(_valerr('0712')));
            test("int('0b12', 2) ValueError", () => expect(() => int('0b12', 2)).toThrow(_valerr('0b12')));
            test("int('1b12', 2) ValueError", () => expect(() => int('1b12', 2)).toThrow(_valerr('1b12')));
            test("int('0o12', 2) ValueError", () => expect(() => int('0o12', 2)).toThrow(_valerr('0o12')));
            test("int('0x12', 2) ValueError", () => expect(() => int('0x12', 2)).toThrow(_valerr('0x12')));
            test("int('0c12', 2) ValueError", () => expect(() => int('0c12', 2)).toThrow(_valerr('0c12')));
            test("int('12', 2) ValueError", () => expect(() => int('12', 2)).toThrow(_valerr('12')));
        });
        
    });
    describe('bin: base 0, 2 or > 11; oct: base 0, 8 or > 24; hex: base 0, 16 or > 33; ', () => {
        test("int('0711', 8)", () => expect(int('711', 8)).toEqual(457));
        // 11 == b (base must be higher)
        test("int('0b11', 11) ValueError", () => expect(() => int('0b11', 11)).toThrow(valerr('0b11', 11)));
        test("int('0b11', 12)", () => expect(int('0b11', 12)).toEqual(1597));
        test("int('0b19', 12)", () => expect(int('0b19', 12)).toEqual(1605));
        
        // octal == 8
        test("int('0o11', 8)", () => expect(int('0o11', 8)).toEqual(9));
        // 24 == o (base must be higher)
        test("int('0o11', 24) ValueError", () => expect(() => int('0o11', 24)).toThrow(valerr('0o11', 24)));
        test("int('0o11', 25)", () => expect(int('0o11', 25)).toEqual(15026));
        test("int('0o19', 25)", () => expect(int('0o19', 25)).toEqual(15034));
        
        // hex == 16
        test("int('0x11', 16)", () => expect(int('0x11', 16)).toEqual(17));
        // 33 == x (base must be higher)
        test("int('0x11', 33) ValueError", () => expect(() => int('0x11', 33)).toThrow(valerr('0x11', 33)));
        test("int('0x11', 34)", () => expect(int('0x11', 34)).toEqual(38183));
        test("int('0c11', 13)", () => expect(int('0c11', 13)).toEqual(2042));
        test("int('0d11', 14)", () => expect(int('0d11', 14)).toEqual(2563));
        let base = chance.integer({min: 2, max: 36});
        test(`int('11', ${base})`, () => expect(int('11', base)).toEqual(parseInt('11', base)));
    });
    describe('binary numbers', () => {
        test('int(0b11)', () => expect(int(0b11)).toEqual(3));
        test('int(0b11, 0), TypeError', () => expect(() => int(0b11, 0)).toThrow(new TypeError(`int() can't convert non-string with explicit base`)));
        test('int(0b11, 1), ValueError', () => expect(() => int(0b11, 1)).toThrow(new ValueError("int() base must be >= 2 and <= 36, or 0")));
        
        for (let i = 2; i <= 36; i++)
            test(`int(0b11, ${i}) TypeError`, () => expect(() => int(0b11, i)).toThrow(new TypeError(`int() can't convert non-string with explicit base`)));
        
        //int('07111101', 0) throws, int('0b11', 0) doesn't. int('0c111101', 0) throws, int('7111101', 0) doesn't.
        test("int('0b11', 0)", () => expect(int('0b11', 0)).toEqual(3));
        test("int('0b11', 1) ValueError", () => expect(() => int('0b11', 1)).toThrow(new ValueError("int() base must be >= 2 and <= 36, or 0")));
        test("int('  0b11', 1) ValueError", () => expect(() => int('  0b11', 1)).toThrow(new ValueError("int() base must be >= 2 and <= 36, or 0")));
        test("int('0b11', 2)", () => expect(int('0b11', 2)).toEqual(3));
        test("int('  0b11', 2)", () => expect(int('  0b11', 2)).toEqual(3));
        test("int('11', 2)", () => expect(int('11', 2)).toEqual(3));
        test("int('  11', 2)", () => expect(int('  11', 2)).toEqual(3));
        for (let i = 3; i <= 11; i++)
            test(`int('0b11', ${i}) ValueError`, () => expect(() => int('0b11', i)).toThrow(valerr('0b11', i)));
        test("int('0b11', 12).toEqual(1597))", () => expect(int('0b11', 12)).toEqual(1597));
        test("int('0b11', 13).toEqual(1873))", () => expect(int('0b11', 13)).toEqual(1873));
        test("int('0b11', 14).toEqual(2171))", () => expect(int('0b11', 14)).toEqual(2171));
        test("int('0b11', 15).toEqual(2491))", () => expect(int('0b11', 15)).toEqual(2491));
        test("int('0b11', 16).toEqual(2833))", () => expect(int('0b11', 16)).toEqual(2833));
        test("int('0b11', 17).toEqual(3197))", () => expect(int('0b11', 17)).toEqual(3197));
        test("int('0b11', 18).toEqual(3583))", () => expect(int('0b11', 18)).toEqual(3583));
        test("int('0b11', 19).toEqual(3991))", () => expect(int('0b11', 19)).toEqual(3991));
        test("int('0b11', 20).toEqual(4421))", () => expect(int('0b11', 20)).toEqual(4421));
        test("int('0b11', 21).toEqual(4873))", () => expect(int('0b11', 21)).toEqual(4873));
        test("int('0b11', 22).toEqual(5347))", () => expect(int('0b11', 22)).toEqual(5347));
        test("int('0b11', 23).toEqual(5843))", () => expect(int('0b11', 23)).toEqual(5843));
        test("int('0b11', 24).toEqual(6361))", () => expect(int('0b11', 24)).toEqual(6361));
        test("int('0b11', 25).toEqual(6901))", () => expect(int('0b11', 25)).toEqual(6901));
        test("int('0b11', 26).toEqual(7463))", () => expect(int('0b11', 26)).toEqual(7463));
        test("int('0b11', 27).toEqual(8047))", () => expect(int('0b11', 27)).toEqual(8047));
        test("int('0b11', 28).toEqual(8653))", () => expect(int('0b11', 28)).toEqual(8653));
        test("int('0b11', 29).toEqual(9281))", () => expect(int('0b11', 29)).toEqual(9281));
        test("int('0b11', 30).toEqual(9931))", () => expect(int('0b11', 30)).toEqual(9931));
        test("int('0b11', 31).toEqual(10603))", () => expect(int('0b11', 31)).toEqual(10603));
        test("int('0b11', 32).toEqual(11297))", () => expect(int('0b11', 32)).toEqual(11297));
        test("int('0b11', 33).toEqual(12013))", () => expect(int('0b11', 33)).toEqual(12013));
        test("int('0b11', 34).toEqual(12751))", () => expect(int('0b11', 34)).toEqual(12751));
        test("int('0b11', 35).toEqual(13511))", () => expect(int('0b11', 35)).toEqual(13511));
        test("int('0b11') ValueError", () => expect(() => int('0b11')).toThrow(valerr('0b11')));
        
    });
    describe('hexadecimal numbers', () => {
        test("int(0x1)", () => expect(int(0x1)).toEqual(1));
        test("int('0x1', 0)", () => expect(int('0x1', 0)).toEqual(1));
        test("int(0x1, 0) TypeError", () => expect(() => int(0x1, 0)).toThrow(new TypeError(`int() can't convert non-string with explicit base`)));
        test("int(0x1, 1) ValueError", () => expect(() => int(0x1, 1)).toThrow(new ValueError("int() base must be >= 2 and <= 36, or 0")));
        let base = chance.integer({min: 2, max: 36});
        test(`int(0x1, ${base}) TypeError`, () => expect(() => int(0x1, base)).toThrow(new TypeError(`int() can't convert non-string with explicit base`)));
        test("int('0x1', 2) ValueError", () => expect(() => int('0x1', 2)).toThrow(new ValueError(`invalid literal for int() with base 2: '0x1'`)));
        test("int('0x1') ValueError", () => expect(() => int('0x1')).toThrow(new ValueError(`invalid literal for int() with base 10: '0x1'`)));
        test("int('0x1', 3) ValueError", () => expect(() => int('0x1', 3)).toThrow(new ValueError(`invalid literal for int() with base 3: '0x1'`)));
    });
    describe('Native special numbers', () => {
        test("int(0b11)", () => expect(int(0b11)).toEqual(3));
        test("int(0b11, 0) TypeError", () => expect(() => int(0b11, 0)).toThrow(TypeError));
        
        test("int(0o123)", () => expect(int(0o123)).toEqual(83));
        test("int(0o123, 0) TypeError", () => expect(() => int(0o123, 0)).toThrow(TypeError));
        
        test("int(0x123)", () => expect(int(0x123)).toEqual(291));
        test("int(0x123, 0) TypeError", () => expect(() => int(0x123, 0)).toThrow(TypeError));
    });
    describe('Signs', () => {
        test("int(+0b11)", () => expect(int(+0b11)).toEqual(3));
        test("int(-0b11)", () => expect(int(-0b11)).toEqual(-3));
        
        test("int(+0b11, 0) TypeError", () => expect(() => int(+0b11, 0)).toThrow(TypeError));
        test("int(-0b11, 0) TypeError", () => expect(() => int(-0b11, 0)).toThrow(TypeError));
        
        test("int('+0b11') ValueError", () => expect(() => int('+0b11')).toThrow(ValueError));
        test("int('-0b11') ValueError", () => expect(() => int('-0b11')).toThrow(ValueError));
        
        test("int('+0b11', 0)", () => expect(int('+0b11', 0)).toEqual(3));
        test("int('-0b11', 0)", () => expect(int('-0b11', 0)).toEqual(-3));
        
        test("int('+0b11', 2)", () => expect(int('+0b11', 2)).toEqual(3));
        test("int('-0b11', 2)", () => expect(int('-0b11', 2)).toEqual(-3));
        
        test("int('+0b11', 12)", () => expect(int('+0b11', 12)).toEqual(1597));
        test("int('-0b11', 12)", () => expect(int('-0b11', 12)).toEqual(-1597));
    })
});

describe('Literal string numbers with bases just on the limit', () => {
    
    test('int("00", 0)', () => expect(int("00", 0)).toEqual(0));
    test('int("01", 0) ValueError', () => expect(() => int("01", 0)).toThrow(valerr('01', 0)));     // parseInt("01", 0) => 1
    test('int("-01", 0) ValueError', () => expect(() => int("-01", 0)).toThrow(valerr('-01', 0)));   // parseInt("-01", 0) => -1
    test('int("02", 2) ValueError', () => expect(() => int("02", 2)).toThrow(valerr("02", 2))); // parseInt("02", 2) => 0
    test('int("02", 3)', () => expect(int("02", 3)).toEqual(2));
    test('int("07", 0) ValueError', () => expect(() => int("07", 0)).toThrow(valerr('07', 0)));
    test('int("07", 7) ValueError', () => expect(() => int("07", 7)).toThrow(valerr('07', 7)));
    test('int("07", 8)', () => expect(int("07", 8)).toEqual(7));
    test('int("07", 10)', () => expect(int("07", 10)).toEqual(7));
    test('int("016", 6) ValueError', () => expect(() => int("016", 6)).toThrow(valerr('016', 6))); // parseInt("016", 6) => 1
    test('int("016", 7)', () => expect(int("016", 7)).toEqual(13));
    test('int("33", 4)', () => expect(int("33", 4)).toEqual(15));
    test('int("033", 4)', () => expect(int("033", 4)).toEqual(15));
    test('int("033", 2) ValueError', () => expect(() => int("033", 2)).toThrow(valerr('033', 2)));
    test('int("33", 2) ValueError', () => expect(() => int("33", 2)).toThrow(valerr('33', 2)));
    test('int("034", 4) ValueError', () => expect(() => int("034", 4)).toThrow(valerr('034', 4)));
    
    
});
describe('ValueError misc', () => {
    // \pypy\objspace\std\test\test_intobject.py test_leading_zero_literal()
    test('pypy/objspace/std/test/test_intobject.py test_leading_zero_literal()', () => {
        const invalids = [
            ["07777777777777777777777777777777777777", 0],
            ["00000000000000000000000000000000000007", 0],
            ["00000000000000000077777777777777777777", 0],
        ];
        for (let [val, base] of invalids) {
            expect(() => int(val, base))
                .toThrow(valerr(val, base));
        }
        
        
    });
    
    describe('invalid literal', () => {
        test(`int("") ValueError`, () => expect(() => int("")).toThrow(valerr('')));
        test(`int('') ValueError`, () => expect(() => int('')).toThrow(valerr('')));
        test('int(``) ValueError', () => expect(() => int(``)).toThrow(valerr('')));
        test(`int(" ") ValueError`, () => expect(() => int(" ")).toThrow(valerr(' ')));
        test(`int(' ') ValueError`, () => expect(() => int(' ')).toThrow(valerr(' ')));
        test('int(` `) ValueError', () => expect(() => int(` `)).toThrow(valerr(' ')));
        test(`int('  \t\t  ') ValueError`, () => expect(() => int('  \t\t  ')).toThrow(valerr('  \t\t  ')));
        test(`int("+314").toEqual(314)`, () => expect(int("+314", undefined)).toEqual(314));
        test(`int("+ 314") ValueError`, () => expect(() => int("+ 314", undefined)).toThrow(valerr('+ 314')));
        test(`int("+ 314", undefined) ValueError`, () => expect(() => int("+ 314", undefined)).toThrow(valerr('+ 314')));
        test(`int("+ 314", 25) ValueError`, () => expect(() => int("+ 314", 25)).toThrow(valerr('+ 314', 25)));
        test(`int("+ 314", 10) ValueError`, () => expect(() => int("+ 314", 10)).toThrow(valerr('+ 314')));
        test(`int("+ 314", 0) ValueError`, () => expect(() => int("+ 314", 0)).toThrow(valerr("+ 314", 0)));
        test(`int('  1x') ValueError`, () => expect(() => int('  1x')).toThrow(valerr('  1x')));
        test(`int('_1') ValueError`, () => expect(() => int('_1')).toThrow(valerr('_1')));
        test(`int('1.5') ValueError`, () => expect(() => int('1.5')).toThrow(valerr('1.5')));
        test(`int('15.0') ValueError`, () => expect(() => int('15.0')).toThrow(valerr('15.0')));
        test(`int('-1.5') ValueError`, () => expect(() => int('-1.5')).toThrow(valerr('-1.5')));
        test(`int('-15.0') ValueError`, () => expect(() => int('-15.0')).toThrow(valerr('-15.0')));
        test(`int('hello5') ValueError`, () => expect(() => int('hello5')).toThrow(valerr('hello5')));
        // TODO:
        //  ['  1\02  ', ValueError],
        //  ["\u0200", ValueError]
        
    });
    test('base out of range', () => {
        for (let [val, base] of [["+ 314", 1], ["+ 314", 37]]) {
            expect(() => int(val, base)).toThrow(new ValueError("int() base must be >= 2 and <= 36, or 0"));
        }
    });
    
    
});
describe('TypeError misc', () => {
    test('argument must be', () => {
        const badargs = [
            [int],
            [null],
            [[]],
        ];
        for (let [val, base] of badargs) {
            expect(() => int(val, base))
                .toThrow(new TypeError(`int() argument must be a string, a bytes-like object or a number, not '${typeof val}'`));
        }
    });
    test('cannot be interpreted', () => {
        expect(() => int("+ 314", null))
            .toThrow(new TypeError(`'null' object cannot be interpreted as an integer`));
        
    });
    test(`can't convert`, () => {
        const badargs = [
            [5, 5],
        ];
        for (let [val, base] of badargs) {
            expect(() => int(val, base))
                .toThrow(new TypeError(`int() can't convert non-string with explicit base`));
        }
    });
    
    
});


