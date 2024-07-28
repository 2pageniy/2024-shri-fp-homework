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
    all,
    allPass,
    and,
    compose,
    converge,
    count, divide,
    equals,
    filter,
    length,
    not,
    or,
    propEq,
    uniq,
    values,
    without
} from "ramda";
const isRed = x => equals(x, 'red');
const isBlue = x => equals(x, 'blue');
const isGreen = x => equals(x, 'green');
const isWhite = x => equals(x, 'white');

const isRedStar = propEq('star', 'red');
const isGreenSquare = propEq('square', 'green');
const isWhiteTriangle = propEq('triangle', 'white');
const isWhiteCircle = propEq('circle', 'white');

const moreThanOne = x => x > 1;

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
export const validateFieldN3 = (shapes) => {
    console.log(compose(converge(divide, [filter(isRed), filter(isBlue)]), values)(shapes));
}

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = ({star, square, circle}) => {
    return and(equals(circle, 'blue'), and(equals(star, 'red'), equals(square, 'orange')));
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (shapes) => {
    const value = values(shapes);
    const uniqueColor = uniq(value);
    const withoutWhite = without(['white'], value);
    console.log(uniqueColor, value)
    return length(uniqueColor) <= 2 && length(withoutWhite) >= 3;
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (shapes) => {
    const value = values(shapes);

    return and(equals(shapes.triangle, 'green'), and(equals(count(isGreen, value), 2), equals(count(isRed, value), 1)));
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (shapes) => {
    const value = values(shapes);
    return equals(length(without(['orange'], value)), 0);
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({star}) => {
    return not(or(equals(star, 'white'), equals(star, 'red')));
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (shapes) => {
    const value = values(shapes);
    return equals(length(without(['green'], value)), 0);
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = () => {

};
