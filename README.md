[![Build Status](https://travis-ci.org/evandvlad/domra.svg?branch=master)](https://travis-ci.org/evandvlad/domra)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/86cd6afa55f14c8ebb053df38e94a634)](https://www.codacy.com/app/evandvlad/domra?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=evandvlad/domra&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/86cd6afa55f14c8ebb053df38e94a634)](https://www.codacy.com/app/evandvlad/domra?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=evandvlad/domra&amp;utm_campaign=Badge_Coverage)

# Общее описание
Библиотека для работы с тегированными шаблонными строками и DOM элементами. Библиотека позволяет смешивать обычные строки или html строки с DOM элементами. В зависимости от необходимости, можно получать различный тип результата, это может как строкое значение, так и различные вариации DOM элементов. Чтобы каким-то образом помечать внедряемые DOM элементы, их нужно упаковать в предоставленные библиотекой компоненты-обертки, также при необходимости, можно добавлять свои к компоненты-обертки, наследуясь от имеющихся и дополняя или изменяя их функциональность.
 
 Библиотека не предоставляет собранного или минимизированного кода для сред не имеющих поддержки ES2015, а также не включает в себя полифилов, только исходный код без дополнительной обработки. 