---
author: "joostdecock"
caption: "Ця публікація здебільшого про нашу роботу над прогресивним розкриттям інформації. І ще: Три нові візерунки!"
date: "2019-10-06"
image: "https://cdn.sanity.io/images/hl5bw8cj/site-content/52db6852590a15208dace4a16a6a1c824037e400-2000x1500.jpg"
intro: "Ми щойно випустили FreeSewing v2.1 🎉."
title: "FreeSewing v2.1: Три нові викрійки, експертний режим та допомога з вимірами"
---


Ми щойно випустили FreeSewing v2.1 🎉.

## Познайомтеся з Пенелопою, Варалі та Сімоною

У цьому випуску 3 нових шаблони:

 - [Пенелопа](/patterns/penelope) - спідниця-олівець від [Wouter Van Wageningen](/users/wouter.vdub)
 - [Waralee](/patterns/waralee) - це штани-обгортки, також від [Wouter](/users/wouter.vdub)
 - [Simone](/patterns/simone) - це Симон (наш універсальний викрійка на ґудзиках), адаптований для грудей від [Joost De Cock](/users/joost)

Всі ці моделі - або жіночий одяг, або - у випадку з Waralee - одяг унісекс. Це свідчить про наше прагнення додати більше моделей жіночого одягу на сайт.

Окрім створення нових патернів, багато зусиль було докладено до того, щоб зробити речі простішими, не роблячи їх тупішими. Дозвольте мені пояснити:

## Наша робота над прогресивним розкриттям інформації

Досягнення балансу між наданням нашим користувачам усієї потужності платформи та полегшенням початку роботи для новачків - це постійний виклик. Ми почали робити кроки у вирішенні цієї проблеми за допомогою так званого *прогресивного розкриття складності*.

Ідея - яку ми не вигадали, але яка є концепцією в UX-дизайні - полягає в тому, щоб спростити користувацький досвід для більшості людей, не обмежуючи можливості більш просунутих користувачів.

Для поступового розкриття інформації ми зосереджуємо нашу увагу на двох сферах, з якими наші користувачі найчастіше стикаються:

 - **Варіанти візерунків**: Наші візерунки часто мають десятки варіантів. Це чудово підходить для тих, хто любить точно налаштовувати кожну деталь свого візерунка, але може бути дещо складним для новачків
 - **Вимірювання**: Точне вимірювання має вирішальне значення для отримання хороших результатів з нашими лекалами, але це не так тривіально, як ви можете подумати.

Хоча ми, звичайно, ще не там, ми досягли прогресу в обох цих напрямках. Давайте подивимося, чим ми займалися:

### Параметри візерунка: Тепер у нас є експертний режим, і за замовчуванням він вимкнений

(деякі) Наші шаблони деякий час мали *розширені опції* , але зараз вони приховані за замовчуванням. Так буде до тих пір, поки ви не увімкнете **Експертний режим** в налаштуваннях (під опціями шаблону).

Окрім розширених параметрів шаблону, режим експорту також відкриває рідше використовувані параметри чернетки, такі як можливість змінювати мову, одиниці виміру, деталі, поля і вміст чернетки.

![Розширений режим](https://posts.freesewing.org/uploads/recreate_a6e2f9c4d6.png)

<Note> 

###### Також показано: Шаблон vs Рецепт за замовчуванням

Під час налаштування чернетки, кожна опція має маленьку кнопку для відновлення значення за замовчуванням для цієї опції.
Все ускладнюється, коли ви створюєте рецепт заново. Тепер, коли ви відновлюєте значення за замовчуванням, це буде значення за замовчуванням шаблону чи рецепту?

Раніше відповіддю був шаблон за замовчуванням, але в цьому випуску ви побачите, що опції, де рецепт за замовчуванням відрізняється від шаблону
за замовчуванням, матимуть дві кнопки. Один раз, щоб відновити шаблон за замовчуванням, а другий, щоб відновити рецепт за замовчуванням. 

Ви можете побачити це на скріншоті вище.

</Note>

### Вимірювання: Допомога у виявленні помилок у ваших вимірюваннях

Ми додали декілька показників, аби допомогти Вам побачити можливі помилки чи проблеми з Вашими замірами. Тепер ваші моделі відображатимуть графічне представлення вимірів вашого тіла, що дозволить вам виявити будь-які відхилення від норми.

![Графічне представлення вимірювань вашої моделі](https://posts.freesewing.org/uploads/model_c3fa8fc50c.png)

Крім того, поруч з фактичним значенням ми показуємо оцінку ваших різних вимірів (на основі обхвату шиї). Якщо різниця стане більшою, ми звернемо на це вашу увагу.

Для нас це складна сфера для роботи. Ми хочемо допомогти вам отримати найкращі результати, і це включає в себе допомогу у виявленні проблем з вашими вимірюваннями. З іншого боку, ми жодним чином не хочемо сказати, що чиїсь вимірювання *неправильні* якимось чином.

Наша платформа має великий діапазон розмірів, та найбільша частина наших користувачів - люди, яким важко знаходити одяг чи викрійки в інших місцях. Тож, з одного боку, може здатися, що ми налаштовуємо себе на невдачу, порівнюючи вимірювання з набором більш-менш *стандартних* вимірювань. Але Ви знаєте своє тіло. Ви знаєте які з Ваших вимірів відрізняються від загальних розмірних таблиць. І це є лише підтвердженням правильного зняття мірок, якщо ми зауважимо їх відмінність. З іншого боку, якщо таке зауваження стосується виміру, який зазвичай збігається з розмірними таблицями - Ви зможете перевірити цей вимір.

І останнє, але не менш важливе: хоча ми намагаємося надати рекомендації щодо вимірювань, щоб допомогти виявити помилки, ми ніколи нікого не виключаємо на основі розміру або вимірів. Незалежно від того, що ви нам кинете, ми розробимо шаблон, який буде працювати для вас, або (наше програмне забезпечення) помре, намагаючись.

## Інші зміни

 - Ми розширили діапазон розмірів для наших порівняльних оглядів. Розміри чоловічого одягу тепер представлені від 32 до 48 розміру, а жіночого - від 28 до 46 розміру.
 - Ми внесли деякі зміни до налаштувань за замовчуванням у шаблоні Simon на основі наших тестів з Simone
 - Ми додали підтримку попереднього завантаження моделей з грудьми в наше середовище розробки для дизайнерів лекал
 - Ми впровадили виправлення та покращення в наші шаблони Jaeger, Bruce, Benajamin, Simon, Carlton та Carlita
 - Ми додали купу відсутніх зображень до документації, а [розпочали роботу над тим, щоб усі опції мали зображення, що ілюструють їхнє призначення](https://github.com/freesewing/freesewing.org/issues/190).

Більш детальна інформація доступна [в журналі змін](https://github.com/freesewing/freesewing/blob/develop/CHANGELOG.md).

Ми сподіваємося, що вам сподобається цей випуск, і, будь ласка, [завітайте до нашого чату](https://discord.freesewing.org/) , щоб поділитися своїми думками, відгуками, пропозиціями чи ідеями. Ми будемо раді почути від вас 




