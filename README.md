[![Build Status](https://travis-ci.org/evandvlad/domra.svg?branch=master)](https://travis-ci.org/evandvlad/domra)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/86cd6afa55f14c8ebb053df38e94a634)](https://www.codacy.com/app/evandvlad/domra?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=evandvlad/domra&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/86cd6afa55f14c8ebb053df38e94a634)](https://www.codacy.com/app/evandvlad/domra?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=evandvlad/domra&amp;utm_campaign=Badge_Coverage)

# Общее описание
Библиотека для работы с тегированными шаблонными строками и DOM элементами. Библиотека позволяет смешивать обычные строки или html строки с DOM элементами. В зависимости от необходимости, можно получать различный тип результата, это может как строкое значение, так и различные вариации DOM элементов. Чтобы каким-то образом помечать внедряемые DOM элементы, их нужно упаковать в предоставленные библиотекой компоненты-обертки, также при необходимости, можно добавлять свои к компоненты-обертки, наследуясь от имеющихся и дополняя или изменяя их функциональность.
 
 Библиотека не предоставляет собранного или минимизированного кода для сред не имеющих поддержки ES2015, а также не включает в себя полифилов, только исходный код без дополнительной обработки.
  
```javascript
const domra, { WElement } from "../domra";

const b = document.createElement("b");
b.innerHTML = "world";

document.body.appendChild(domra() `<p>Hello ${ new WElement(b) }.</p>`);
```

# Компоненты-обертки
Это компоненты позволяют дать понять, что их нужно обрабатывать особым образом. Предоставлено три компонента - WNode, WElement и WList. Первый служит базовым классом, остальные являются его наследниками. Компонент должен реализовать только один метод - getDOMElement. Метод не принимает никаких параметров, вызывается внутри библиотеки и должен вернуть Node элемент (Element, DocumentFragment и т.п.), элемент, который может использоваться в методе replaceChild в качестве параметра. Для базового класса и для класса WElement этот метод просто возвращает элемент переданный в конструктор. 

```javascript
const domra, { WElement, WList, WNode } from "../domra";
```

Класс WList принимает в качестве параметра конструктора массивы, массиво-подобные объекты (NodeList, HTMLCollection, Arguments), итераторы, в общем, все что может корректно преобразовать методом Array.from в массив, содержащие Node элементы. Эти элементы запаковываются в DocumentFragment.

```javascript
const { WList } from "../domra";
const elements = new WList([
    document.createElement("div"),
    document.createElement("p")
]);
```

Если необходимо создать кастомный враппер, то нужно отнаследоваться от имеющихся компонентов.
```javascript
const { WNode } from "../domra";

class WText extends WNode {
    getDOMElement() {
        return document.createTextNode(super.getDOMElement());
    }
}
 
const textNode = new WText("Hello world");
 
textNode instanceof WText // true
textNode instanceof WNode // true
textNode.getDOMElement() instanceof Text // true 
textNode.getDOMElement().nodeValue === "Hello world" // true
``` 
# Основной компонент

Основной компонент, импортированный как default, представляет собой функцию возвращающую функцию обрабатывающую тегированные шаблонные строки. 
Этой функции в качестве опционального параметра можно передать объект конфигурации, с помощью которого можно настроить вывод результата, его обработку и т.д.

``` javascript
const domra, { WElement } from "../domra";
const element = document.createElement("p");
element.innerHTML = "Hello world";
document.body.innerHTML = domra({ outputFormat: "string" }) `${ new WElement(element) }`;
```