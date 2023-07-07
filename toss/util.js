/* repository가 undefined인 경우 */
const object1 = {
  repository: undefined,
};

/* repository의 readme가 undefined인 경우 */
const object2 = {
  repository: {
    readme: undefined,
  },
};

/** repository.readme 모두가 존재하는 경우 */
const object3 = {
  repository: {
    readme: {
      extension: 'md',
      content: '금융을 쉽고 간편하게',
    }
  }
};

// 깊게 undefined 일 수 있는 객체의 값을 안전하게 가져올 수 있도록 safelyGet 함수를 구현해 주세요.

/* 조건
 *
  safelyGet 함수는 첫 번째 인자로 객체를, 두 번째 인자로 문자열을 입력받습니다.
  첫 번째 인자인 객체는 Plain object로만 입력됩니다. 배열이나 함수 등 Plain object가 아닌 객체는 고려하지 않습니다.
  각 객체의 프로퍼티(Property)는 알파벳으로만 구성됩니다. 점(.)이나 숫자 등을 포함하는 경우는 고려하지 않습니다.
  각 객체의 값(Value)은 문자열, undefined, 또는 그런 값을 가지는 Plain object만 고려합니다.
  두 번째 인자인 문자열은 점(.)과 알파벳으로만 구성됩니다. 올바른 JavaScript 프로퍼티 접근 형식을 따릅니다. (foo..bar, .foo, bar. 와 같은 올바르지 않은 형태는 고려하지 않습니다.)
*/

function safelyGet(obj, str) {
  const properties = str.split('.');
  let current = obj;

  for (let property of properties) {
    if (!current) {
      return undefined;
    }

    current = current[property];
  }

  return current;
}

//입출력 예시
safelyGet(object1, 'repository.readme.extension')
// -> 반환 값: undefined

safelyGet(object1, 'repository.readme')
// -> 반환 값: undefined

safelyGet(object1, 'repository')
// -> 반환 값: undefined

safelyGet(object2, 'repository.readme.extension')
// -> 반환 값: undefined

safelyGet(object2, 'repository.readme')
// -> 반환 값: undefined

safelyGet(object2, 'repository')
// -> 반환 값: { readme: undefined }

safelyGet(object3, 'repository.readme.extension')
// -> 반환 값: 'md'

safelyGet(object3, 'repository.readme')
// -> 반환 값: { extension: 'md' }
