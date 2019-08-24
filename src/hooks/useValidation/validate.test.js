import validate from './validate';

import { isRequired, isEmail, lengthBetween, hasCheckedValue } from './rules';

describe('VALIDATE', () => {
    let validatorConfig;

    beforeAll(() => {
        validatorConfig = {
            email: {
                rules: [
                    [isRequired, 'email을 입력하세요.'],
                    [isEmail, '올바른 email 주소가 아닙니다.'],
                ],
            },
            password: {
                rules: [
                    [isRequired, '비밀번호를 입력하세요.'],
                    [lengthBetween(8, 35), '8-35 자를 입력하세요.'],
                ],
            },
        };
    });

    it('should return errors Object for running validation', () => {
        const errors = validate({ email: 'abc@abc.com' }, validatorConfig);
        expect(Object.prototype.toString.call(errors)).toBe('[object Object]');
    });

    describe('email validation', () => {
        it('abc@abc.com', () => {
            const errors = validate({ email: 'abc@abc.com' }, validatorConfig);
            expect(errors['email']).toBe(null);
        });
        it('empty value', () => {
            const errors = validate({ email: '' }, validatorConfig);
            expect(errors['email']).toBe(validatorConfig.email.rules[0][1]);
        });
        it('a bs.sdk', () => {
            const errors = validate({ email: 'a bs.sdk' }, validatorConfig);
            expect(errors['email']).toBe(validatorConfig.email.rules[1][1]);
        });
    });
});
