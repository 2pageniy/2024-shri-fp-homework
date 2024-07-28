/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
    allPass,
    and,
    compose,
    converge, countBy,
    divide,
    equals,
    filter, includes,
    length, lte,
    not,
    or,
    propEq, reject, toLower,
    values,
} from "ramda";
import {eq} from "lodash/lang";
const isRed = x => equals(x, 'red');
const isBlue = x => equals(x, 'blue');
const isGreen = x => equals(x, 'green');
const isWhite = x => equals(x, 'white');
const isOrange = x => equals(x, 'orange');

const isRedStar = propEq('star', 'red');
const isWhiteStar = propEq('star', 'white');
const isGreenSquare = propEq('square', 'green');
const isGreenTriangle = propEq('triangle', 'green');
const isWhiteTriangle = propEq('triangle', 'white');
const isNotWhiteTriangle = compose(not, isWhiteTriangle);
const isWhiteCircle = propEq('circle', 'white');
const isBlueCircle = propEq('circle', 'blue');
const isOrangeSquare = propEq('square', 'orange');

const getTriangle = x => x.triangle;
const getSquare = x => x.square;

const lengthFilter = filter => compose(length, filter)

const moreThanOne = lte(2);

const isSameColor = filterColor => compose(
    equals(4),
    length,
    filter(filterColor),
    values
)

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    isRedStar,
    isGreenSquare,
    isWhiteTriangle,
    isWhiteCircle
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(
    moreThanOne,
    length,
    filter(isGreen),
    values
);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(
    equals(1),
    converge(divide, [
        lengthFilter(filter(isRed)),
        lengthFilter(filter(isBlue))
    ]),
    values
);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    isBlueCircle,
    isRedStar,
    isOrangeSquare
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(
    converge(or,[
        includes(3),
        includes(4),
    ]),
    values,
    countBy(toLower),
    reject(isWhite),
    values
)

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = converge(and,[
    isGreenTriangle,
    compose(
        equals(2),
        converge(divide,[
            lengthFilter(filter(isGreen)),
            lengthFilter(filter(isRed))
        ]),
        values
    )
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = isSameColor(isOrange);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = compose(
    not,
    converge(or, [
        isRedStar,
        isWhiteStar
    ])
);

// 9. Все фигуры зеленые.
export const validateFieldN9 = isSameColor(isGreen);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = compose(
    converge(and,[
        isNotWhiteTriangle,
        converge(equals,[
            getTriangle,
            getSquare
        ])
    ])

);