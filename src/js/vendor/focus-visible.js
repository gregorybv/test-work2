// /**
//  Применяет полифилл :focus-visible в заданной области видимости.
//  Область видимости в данном случае - это либо Документ верхнего уровня, либо Корень тени.
//  *
//  * @param {(Document|ShadowRoot)} scope
//  * @see https://github.com/WICG/focus-visible
//  */
// function applyFocusVisiblePolyfill(scope) {
//   const hadKeyboardEvent = true;
//   const hadFocusVisibleRecently = false;
//   const hadFocusVisibleRecentlyTimeout = null;

//   const inputTypesAllowlist = {
//     text: true,
//     search: true,
//     url: true,
//     tel: true,
//     email: true,
//     password: true,
//     number: true,
//     date: true,
//     month: true,
//     week: true,
//     time: true,
//     datetime: true,
//     "datetime-local": true,
//   };

//   /**
//    Вспомогательная функция для устаревших браузеров и iframe, в которых иногда фокусируются
//    элементы, такие как document, body и неинтерактивные SVG.
//    * @param {Element} el
//    */
//   function isValidFocusTarget(el) {
//     if (
//       el &&
//       el !== document &&
//       el.nodeName !== "HTML" &&
//       el.nodeName !== "BODY" &&
//       "classList" in el &&
//       "contains" in el.classList
//     ) {
//       return true;
//     }
//     return false;
//   }

//   /**
//    Вычисляет, должен ли данный элемент автоматически вызывать добавление класса
//    `focus-visible`, т.е. должен ли он всегда соответствовать классу
//    `:focus-visible` при фокусировке.
//    * @param {Element} el
//    * @return {boolean}
//    */
//   function focusTriggersKeyboardModality(el) {
//     const type = el.type;
//     const tagName = el.tagName;

//     if (tagName === "INPUT" && inputTypesAllowlist[type] && !el.readOnly) {
//       return true;
//     }

//     if (tagName === "TEXTAREA" && !el.readOnly) {
//       return true;
//     }

//     if (el.isContentEditable) {
//       return true;
//     }

//     return false;
//   }

//   /**
//    Добавляет класс `focus-visible` к данному элементу, если он не был добавлен автором.
//    * @param {Element} el
//    */
//   function addFocusVisibleClass(el) {
//     if (el.classList.contains("focus-visible")) {
//       return;
//     }
//     el.classList.add("focus-visible");
//     el.setAttribute("data-focus-visible-added", "");
//   }

//   /**
//    Удалить класс `focus-visible` из данного элемента, если он не был
//    изначально добавлен автором.
//    * @param {Element} el
//    */
//   function removeFocusVisibleClass(el) {
//     if (!el.hasAttribute("data-focus-visible-added")) {
//       return;
//     }
//     el.classList.remove("focus-visible");
//     el.removeAttribute("data-focus-visible-added");
//   }

//   /**
//    Если последнее взаимодействие с пользователем осуществлялось с помощью клавиатуры
//    и нажатие клавиши не включало мета, alt/option или клавишу управления
//    то модальность является клавиатурной. В противном случае модальность не является клавиатурной.
//    Применим `focus-visible` к любому текущему активному элементу и отследим
//    состояние модальности клавиатуры с помощью `hadKeyboardEvent`.
//    * @param {KeyboardEvent} e
//    */
//   function onKeyDown(e) {
//     if (e.metaKey || e.altKey || e.ctrlKey) {
//       return;
//     }

//     if (isValidFocusTarget(scope.activeElement)) {
//       addFocusVisibleClass(scope.activeElement);
//     }

//     hadKeyboardEvent = true;
//   }

//   /**
//    Если в какой-то момент пользователь щелкнет указательным устройством, убедитесь, что мы изменили
//    модальность с клавиатуры.
//    Это позволит избежать ситуации, когда пользователь нажимает клавишу на уже сфокусированном
//    элементе, а затем нажимает на другой элемент, фокусируя его с помощью
//    при этом мы все еще думаем, что находимся в модальности клавиатуры.
//    * @param {Event} e
//    */
//   function onPointerDown(e) {
//     hadKeyboardEvent = false;
//   }

//   /**
//    При `фокусе`, добавьте класс `focus-visible` к цели, если:
//    - цель получила фокус в результате клавиатурной навигации, или
//    - цель события является элементом, который, вероятно, потребует взаимодействия
//    с помощью клавиатуры (например, текстовое поле).
//    * @param {Event} e
//    */
//   function onFocus(e) {
//     // Prevent IE from focusing the document or HTML element.
//     if (!isValidFocusTarget(e.target)) {
//       return;
//     }

//     if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
//       addFocusVisibleClass(e.target);
//     }
//   }

//   /**
//    При `blur`, удалите класс `focus-visible` из цели.
//    * @param {Event} e
//    */
//   function onBlur(e) {
//     if (!isValidFocusTarget(e.target)) {
//       return;
//     }

//     if (
//       e.target.classList.contains("focus-visible") ||
//       e.target.hasAttribute("data-focus-visible-added")
//     ) {
//       hadFocusVisibleRecently = true;
//       window.clearTimeout(hadFocusVisibleRecentlyTimeout);
//       hadFocusVisibleRecentlyTimeout = window.setTimeout(function () {
//         hadFocusVisibleRecently = false;
//       }, 100);
//       removeFocusVisibleClass(e.target);
//     }
//   }

//   /**
//    Если пользователь меняет вкладку, отследите, был ли ранее
//    сфокусированный элемент имел .focus-visible.
//    * @param {Event} e
//    */
//   function onVisibilityChange(e) {
//     if (document.visibilityState === "hidden") {
//       if (hadFocusVisibleRecently) {
//         hadKeyboardEvent = true;
//       }
//       addInitialPointerMoveListeners();
//     }
//   }

//   /**
//    Добавьте группу слушателей для обнаружения использования любых указывающих устройств.
//    Эти слушатели будут добавлены при первой загрузке полифилла и в любое время, когда
//    когда окно размывается, чтобы они были активны, когда окно вновь обретет
//    фокус.
//    */
//   function addInitialPointerMoveListeners() {
//     document.addEventListener("mousemove", onInitialPointerMove);
//     document.addEventListener("mousedown", onInitialPointerMove);
//     document.addEventListener("mouseup", onInitialPointerMove);
//     document.addEventListener("pointermove", onInitialPointerMove);
//     document.addEventListener("pointerdown", onInitialPointerMove);
//     document.addEventListener("pointerup", onInitialPointerMove);
//     document.addEventListener("touchmove", onInitialPointerMove);
//     document.addEventListener("touchstart", onInitialPointerMove);
//     document.addEventListener("touchend", onInitialPointerMove);
//   }

//   function removeInitialPointerMoveListeners() {
//     document.removeEventListener("mousemove", onInitialPointerMove);
//     document.removeEventListener("mousedown", onInitialPointerMove);
//     document.removeEventListener("mouseup", onInitialPointerMove);
//     document.removeEventListener("pointermove", onInitialPointerMove);
//     document.removeEventListener("pointerdown", onInitialPointerMove);
//     document.removeEventListener("pointerup", onInitialPointerMove);
//     document.removeEventListener("touchmove", onInitialPointerMove);
//     document.removeEventListener("touchstart", onInitialPointerMove);
//     document.removeEventListener("touchend", onInitialPointerMove);
//   }

//   /**
//    При первой загрузке polfyill предполагается, что пользователь находится в клавиатурной модальности.
//    Если получено какое-либо событие от указывающего устройства (например, мыши, указателя,
//    прикосновение), отключите клавиатурную модальность.
//    Это учитывает ситуации, когда фокус попадает на страницу из строки URL.
//    * @param {Event} e
//    */
//   function onInitialPointerMove(e) {
//     if (e.target.nodeName && e.target.nodeName.toLowerCase() === "html") {
//       return;
//     }

//     hadKeyboardEvent = false;
//     removeInitialPointerMoveListeners();
//   }

//   document.addEventListener("keydown", onKeyDown, true);
//   document.addEventListener("mousedown", onPointerDown, true);
//   document.addEventListener("pointerdown", onPointerDown, true);
//   document.addEventListener("touchstart", onPointerDown, true);
//   document.addEventListener("visibilitychange", onVisibilityChange, true);

//   addInitialPointerMoveListeners();

//   // Для фокуса и размытия мы специально заботимся об изменениях состояния в локальной
//   // области видимости. Это связано с тем, что события фокуса / размытия, которые происходят внутри
//   // теневого корня, не перераспределяются от основного элемента, если он уже был
//   // активным элементом в своей собственной области видимости:
//   scope.addEventListener("focus", onFocus, true);
//   scope.addEventListener("blur", onBlur, true);

//   // Мы определяем, что узел является ShadowRoot, убедившись, что он представляет собой
//   // DocumentFragment и также имеет свойство host. Эта проверка охватывает родную
//   // реализацию и реализацию полифилла прозрачно. Если бы нас волновала только
//   // о родной реализации, мы могли бы просто проверить, является ли область видимости
//   // экземпляром ShadowRoot.
//   if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {
//     // Поскольку ShadowRoot является особым видом DocumentFragment, у него нет
//     // не имеет корневого элемента, к которому можно добавить класс. Поэтому мы добавляем этот атрибут к
//     // принимающему элементу:
//     scope.host.setAttribute("data-js-focus-visible", "");
//   } else if (scope.nodeType === Node.DOCUMENT_NODE) {
//     document.documentElement.classList.add("js-focus-visible");
//     document.documentElement.setAttribute("data-js-focus-visible", "");
//   }
// }
// // Важно обернуть все ссылки на глобальное окно и документ в
// // эти проверки для поддержки случаев использования рендеринга на стороне сервера
// // @see https://github.com/WICG/focus-visible/issues/199
// if (typeof window !== "undefined" && typeof document !== "undefined") {
//   // Сделайте помощник полифилла глобально доступным. Это может быть использовано как сигнал
//   // для заинтересованных библиотек, которые хотят скоординироваться с полифиллом, например,
//   // применения полифилла к теневому корню:
//   window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill;

//   // Уведомляем заинтересованные библиотеки о наличии полифилла, в случае, если полифилл
//   // был загружен лениво:
//   let event;

//   try {
//     event = new CustomEvent("focus-visible-polyfill-ready");
//   } catch (error) {
//     event = document.createEvent("CustomEvent");
//     event.initCustomEvent("focus-visible-polyfill-ready", false, false, {});
//   }

//   window.dispatchEvent(event);
// }

// if (typeof document !== "undefined") {
//   applyFocusVisiblePolyfill(document);
// }
