import * as R from 'ramda';

export default R.curry((aObject, bObject, propsArray) => {
    const operands = propsArray.reduce((acc, curr) => {
        acc[0].push(aObject[curr]);
        acc[1].push(bObject[curr]);
        return acc;
    }, [[], []]);

    return R.equals(operands[0], operands[1]);
});