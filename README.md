<h1 align="middle">🎱</h1>
<h2 align="middle">level1 - 행운의 로또</h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션</p>

### 실행방법

```
npm install npm
npm run start-step1
```

감사합니다 !


### 폴더구조 간결요약

#### controller : 실행흐름, 입출력 담당

- MainController : 두 컨트롤러를 관리. + 재시작 담당
- PurchaseLottoController : 로또구매 담당
- WinningLottoController : 당첨 결과 실행흐름/입출력 담당

#### domain/entity

- IsRetry : 게임 다시시작 원시값래핑. 검증
- LottoNumber : 로또 번호 원시값 래핑. 검증
- Lotto : 로또 번호의 일급 컬렉션. 검증.
- WInningLotto : 당첨로또 자료형. 검증.

#### domain/service : 비즈니스로직. 계산

- PurchaseLottoService : 로또 구매. 구매한 로또 반환 담당
- WinningResultService : 당첨 통계 계산 담당
- WInningRewardService : 수익률 계산 담당

#### view : 입출력
- InputView : 입력 담당. 무한 재입력도 담당
- OutputView : 출력 담당.


# 고민한 사항 및 코드 의도

## 가장 중요시 한 것

이번 프로젝트를 진행하면서 가장 중요하게 여긴 것은,

- **크론이 시연**한 것과 거의 완전히 동일한 방식으로 **TDD**를 해보는 것
- 클래스간의 **결합도를 최소한으로**.
- **리팩토링 내성을 가진 테스트코드** 작성이었습니다. 그 중에서도 결합도를 낮추는것과 리팩토링 내성을 가장 중요하게 생각하였습니다.

### TDD

- 수업 중에 보여준 TDD 순서를 **모두 그대로 따르려고** 노력했습니다.
- **테스트추가 -> 엉망진창 꼼수로 빠른 테스트통과 -> 리팩터링 순서.**
- 커밋메시지는 test, feat을 따로하지않고, 테스트구현후 -> 기능구현을 한 다음에 한꺼번에 feat으로 올렸습니다.

### TDD를 하면서 느낀 것

- TDD를 하기 전에 생각한 것 : TDD는 매우 많이 유용하지만, 설계를 갈아엎게 될 경우 **테스트 코드들이 전부 깨지기 때문에**, 그것들도 전부 갈아엎기 때문에 상황에 따라서는 **자칫 양날의 검이 될 수 있다**는 것입니다.
- TDD를 할 때 생각한 것 : TDD를 하는 경우 주의해야 할 것은, TDD로 할 경우는 테스트코드를 작성하기전에 **더욱 설계를 상당히 잘 해두어야 한다**는 생각을 하였습니다.
- TDD를 하고 나서 생각한 것 : 빨간불ㅡ파란불 테스트를 잘 해보니, 코드 작성 시에 **걱정이 상당히 줄어든다**는 것을 느꼈습니다. (빠른 피드백 효과)

## 결합도를 낮추려는 노력

### 클래스들의 인자(input) 및 출력 값은 ( 순수 JS 원시자료형 or JS Object) 으로

- 상황 : 최근, 클래스끼리 주고받는 값(메시지)로 **클래스 객체를 지양하고, JS 자료형을 사용하면 클래스간 결합도를 매우 낮출 수 있다는 점**을 많이 중요하게 인식하고 있습니다.
- 이에 따라 **클래스끼리 주고받는 값(메시지)은 무조건 JS 자료형**을 사용하여, 클래스 간의 결합도를 많이 낮췄습니다.
- 이를 통해 테스트코드의 import는 2개를 넘지 않도록 할 수 있는 등, 더욱 테스트 용이한 코드가 되어, **테스트코드의 리팩토링 내성**을 끌어올릴 수 있었습니다.
- 실제로 구현의 꽤 큰 규모 수정이 발생했을 때도 (두 핵심 클래스(LottoNumber,LottoNumberList)의 생성자수정), 테스트코드의 수정이나 구현의 수정이 매우 적게 발생하였습니다.

## 그 외 이번에 도입해 본 것

### 원시값 래핑과 일급 컬렉션 (First Class Collection) 사용

- 판단: 객체지향 생활체조에도 나오는 '중요 원시값은 래핑'은 이번에 로또번호에 도입하기에 매우 적합한 상황으로 판단.
- 이번에 로또 내의 숫자(LottoNumber)를 원시값 래핑하고
- 로또(LottoNumberList)는 그것을 담는 일급 컬렉션으로 구성하였습니다.
- 검증 로직 중복이 없고,
- 더 일관성 있고, 신뢰성 있게(1~45 무조건보장 등) 이용할 수 있어 좋았습니다.

### 기능목록 작성방법 변경

- 크론의 기능 목록 작성 시연을 보고, 그 방식이 좋다 느껴 적용해보았습니다.
- 기존엔 입력, 계산 , 출력 이런 식으로, 하고 프로그램 진행순서대로 나누는 방법에서 -> 클래스 단위로 기능 목록 작성으로 변경.
- 좋은 점 : TDD와 잘 어울리는 거 같습니다. 기능 목록 작성과정에서 클래스설계를 하게되어, 기능목록 작성 하는 동안 클래스설계를 할수있어 사전 클래스설계가 중요한 TDD에 도움이 되었다.

### 테스트코드 문구 컨벤션 변경

- 테스트코드 문구가 마치 기능목록을 대신할 수 있도록 하는 방법론(문구 컨벤션)에 감명을 받아 적용해보았습니다.
- 기존에 최대한 짧게 작성하던 방식에서 -> '언제, 어떤 조건이 주어졌을 때, 기대하는 결과' 형태로 작성하게 되었습니다.
- 개인적으로 마음에 들어 계속 이 컨벤션을 이용할 생각입니다.

### 페어프로그래밍하며 느낀 것

- 이번에는 페어에게 옆에서 이렇게저렇게하면 좋을거같아요. 이런 느낌보다 약간 옆에서 도와주는/설명해주는 느낌으로 해 보았는데 이 방식이 오히려 페어의 성장에도 도움이 된 것같고, 프로젝트 진행도 더 빨리, 스무스하게 된 것 같아서 좋았던 거 같다.

### 케빈에게 의견을 가볍게 묻고 싶은 것

저는 TDD를 할 때에는, 미 적용 경우(프로덕션구현->테스트구현순)보다 기본적으로 설계를 더 잘 해두어야 한다고 생각을 하였습니다. 케빈도 동일하게 생각하시는지 아닌지 가볍게 궁금합니다. (TDD에대한 다른 얘기도 괜찮습니다.)

- 이번에는 커밋메시지를 test 커밋과, feat커밋 이렇게 두번에 나누어서 커밋하지 않고, 테스트구현후 -> 기능구현을 한 다음에 한꺼번에 feat으로 커밋 메시지를 올렸는데, 케빈은 TDD를 할 경우 test, feat 순서로 분리해서 커밋을 하시는 편이신지 궁금합니다.
- 또, 이번에는
- 메소드 단위로 커밋을 하기도 하고, 클래스 단위(기능단위)로 커밋을하기도하였는데, 커밋은 작게하는 것이 좋다고는 하지만 너무 자주하기엔 커밋메세지작성이 오래걸리는거같습니다. 케빈은 보통 커밋 빈도를 어느정도로 맞추는 편인지 궁금합니다.

