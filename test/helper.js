import * as helper from '../src/helper';
import test from 'ava';

const defaultErrorHandling = t => error => t.true(error instanceof Error);
const configs = [
    {description: 'empty config', config: {}},
    {description: 'undefined config', config: undefined},
    {description: 'empty endpoint', config: {endpoint: ''}},
    {description: 'onClick callback is not a function', config: {endpoint: 'http://lorem.ipsum', callbacks: {onClick: 'lorem ipsum'}}}
]

configs.forEach(({description, config}) => test(`helper.configChecker Error handling: ${description}`, t => helper.configChecker(config).catch(defaultErrorHandling(t))));

// test('helper.configChecker', t => {
//     return helper.configChecker().catch(defaultErrorHandling(t));
// });

// test('helper.configChecker', t => {
//     return helper.configChecker({
//         endpoint: ''
//     }).catch(defaultErrorHandling(t));
// });

// test('helper.configChecker', t => {
//     return helper.configChecker({
//         endpoint: '',
//         callbacks: {onClick: 'this string is an invalid type for this key'}
//     }).catch(defaultErrorHandling(t));
// });