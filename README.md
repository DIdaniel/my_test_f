# 인프런 코딩 테스트

## 환경 구성

1. `yarn` 실행
2. `yarn start` 실행 (API 서버 실행)
    - port : 3000

## 서비스 내용

강의를 검색하고 검색 결과를 리스트로 볼 수 있는 페이지를 만듭니다.
아래 강의 리스트와 강의 검색에 관한 기능 요청을 참고해서 서비스를 만듭니다.

## 강의 리스트 페이지의 구현은 다음을 참고합니다.

1. 아래 API 명세를 참고하여 서버에서 응답으로 받은 강의 리스트를 노출합니다.
2. 무한 스크롤을 이용하여 강의 리스트를 노출합니다.
3. 각 강의는 다음 내용을 포함합니다.
    - 강의 이미지
    - 강의 제목
    - 지식공유자 이름
    - 강의 가격
4. 각 강의는 클릭하면 강의 상세 페이지로 이동할 수 있어야 합니다.
    - 상세 페이지는 구체적으로 구현하지 않습니다.
    - 단, 페이지 이동은 가능해야 합니다.

## 강의 검색의 구현은 다음을 참고합니다.

1. 검색창에 검색어 입력시 입력창 하단에 검색 결과 리스트를 표시합니다. 사용 API는 명세를 참고합니다.
    - 검색 결과는 강의 제목을 나열합니다.
2. 검색어가 2자 이상이면 검색 결과를 노출합니다.
3. 검색창을 포커싱할 때 이미 입력되어있는 검색어가 있다면 검색 결과를 노출합니다.
4. 검색창이 포커싱 아웃(blur)되면 검색결과 리스트를 숨깁니다.
5. 검색 결과에 나타난 강의 제목을 클릭하면 해당 강의 상세 페이지로 이동합니다.
    - 상세 페이지는 구체적으로 구현하지 않습니다.

## 각 구현은 다음을 참고합니다.

1. HTML 페이지를 제공하는 서버는 `server.js`의 NodeJS 서버를 활용해도 되고 별도의 서버를 만들어 사용해도 됩니다.
2. 페이지는 반응형으로 동작 하고 모바일 버전도 고려되어야 합니다.
3. React, Vue, Angular, Svelte와 같은 프론트엔드 라이브러리 또는 프레임워크를 사용하지 않고 Vanilla Javascript를 통해 개발해야합니다.
    - 기타 다른 패키지의 사용에는 제한이 없습니다.
4. API는 아래 [API 명세](#API-명세)를 참고합니다.
5. 아래 [**구현 설명**](#구현-설명) 영역에는 과제에 대해 설명 또는 전달하고 싶은 내용을 자유롭게 적어주시면 됩니다.
6. 위 참고 내용 외에 다른 내용을 구현하는 것은 자유롭게 진행합니다.
    - 위에 요구된 내용은 필수 항목입니다. 즉, 필수 요구사항을 충족한다면 구현 방식은 자유입니다.

## API 명세

<table>
<tbody>
<tr>
<th>Method</th>
<th>URL</th>
<th>Query String</th>
<th>Body</th>
<th>Response</th>
<th>비고</th>
</tr>
<tr>
<td>GET</td>
<td>

`/api/courses`

</td>
<td>

`page`: (_기본값: 1, 값: 1 이상의 number_) 페이지<br/>
`count`: (_기본값: 20, 값: 1 이상의 number_) 페이지당 컨텐츠 수<br/>
`lastContentId`: (_값: 1 이상의 number_) 요청하는 페이지의 이전 페이지 마지막 컨텐츠 id<br/>
`search`: (_값: string_) 검색어

</td>
<td></td>
<td>

success

```javascript
{
   "ok": true,
   "data": {
      "courses": [
         {
            "id": (number) 강의 ID,
            "title": (string) 강의 제목,
            "instructorName": (string) 지식공유자 이름,
            "price": (number) 강의 가격,
            "coverImageUrl": (string) 강의 커버 이미지
         },
         ...
      ]
   }
}
```

fail

```javascript
{
   "ok": false,
   "error": {
      "message": (string) 에러 메세지
   }
}
```

</td>
<td>강의리스트</td>
</tr>
<tr>
<td>GET</td>
<td>

`/api/courses/:courseId`

</td>
<td></td>
<td></td>
<td>

success

```javascript
{
   "ok": true,
   "data": {
      "course": {
         "id": (number) 강의 ID,
         "title": (string) 강의 제목,
         "instructorName": (string) 지식공유자 이름,
         "price": (number) 강의 가격,
         "coverImageUrl": (string) 강의 커버 이미지
      }
   }
}
```

fail

```javascript
{
   "ok": false,
   "error": {
      "message": (string) 에러 메세지
   }
}
```

</td>
<td>강의상세</td>
</tr>
<tr>
<td>GET</td>
<td>

`/api/search/courses`

</td>
<td>

`keyword`: (_값: string_) 검색어<br/>
`max`: (_기본값: 10, 값: 1 이상의 number_) 검색결과 최대 갯수<br/>

</td>
<td></td>
<td>

success

```javascript
{
   "ok": true,
   "data": {
      "results": [
         {
            "id": (number) 강의 ID,
            "title": (string) 강의 제목,
            "instructorName": (string) 지식공유자 이름,
         },
         ...
      ]
   }
}
```

fail

```javascript
{
   "ok": false,
   "error": {
      "message": (string) 에러 메세지
   }
}
```

</td>
<td>검색</td>
</tr>
</tbody>
</table>

## 구현 설명

## [ 기술과제 _ 김동일 ]

## 프로젝트 실행

1. `yarn` 실행
2. `yarn start` 실행 (API 서버 실행)
    - port : 3000
3. client 폴더 > pages 폴더 > main 폴더 > index.html
    - Open with Live Server or Command + L + Command + O (Client 실행)

## 미션

위의 주어진 것처럼 "강의 리스트 페이지의 구현", "강의 검색의 구현"을 참고하였습니다.

## 준비

과제를 구현하기 전, 간단하게 diagram 사이트를 이용하여 간단하게 기획을 하고 실시하였으며, 구성은 아래와 같습니다.

[main]
-- index.html

-   Header
-   Carousel
-   Search

-- main.js

-   Lecture Cards

-- style.css

[detail]

-   Header
-   Deatil Lecture Card

## 고민 했던 점

-   기타 다른 패키지 사용에 제약은 없다 라고 명시했지만, 기왕 자바스크립트를 사용하는 김에 아무런 도움 없이 바닐라 자바스크립트로 구현하는게 재미있을 것 같아서 다른 패키지 사용 하지 않고 구현 했습니다

** 1. 자동완성 기능 만들기 **
<br>
<br>
기술적인 면을 크게 세 가지로 구분 해볼 수 있을 것입니다.
<br>
첫 번째는 인피닛 스크롤(Infinite scroll),<br>
두 번째는 자동완성기능 구현, <br>
세 번째는 자동 완성 된 글을 클릭 했을 때, 페이지가 이동 되며 클릭 한 강의에 대한 정보가 나오는 것입니다.<br>
<br>
인피닛 스크롤의 경우 그리 어려운 일이 아닐 것입니다.
api를 잘 가져와서 화면 사이즈의 비율에서 어느정도 내려갔을 때 조금씩 보여주기만 하면 됩니다.
<br>
자동완성기능은 이번에 만들어본 것이 처음인데 생각보다 재밋었습니다.
우선 input 박스에 onkeyup이 된 후, 2자 이상 작성이 되면 나타날 수 있도록 했습니다.
postman을 이용해서 api courses를 먼저 확인했는데, 그 안에는 영어도 섞여있어서 toLocaleLowerCase 메서드를 사용하여 소문자로 만들었습니다.
그리고 startWith 메서드를 활용하여 검색창에 입력했을 때 첫번째 문자열이 소문자로 시작하는지 체크했습니다.
<br>
이 후, class가 search-box인것을 클릭하게 되면 focus라는 클래스가 붙게 되고, 두 자 이상 검색하여 나온 검색어들에게 onclick을 붙여주어, 클릭 하면 session storage에 저장되도록 했습니다.
그리고 디테일 창으로 넘어가게 됩니다.
<br>
<br>
** 2. 어떤 방식을 이용해서 선택 된 강의를 디테일 페이지에 띄울 것인가? **
<br>
<br>
이 방식에 대해서는 특히 고민을 많이 하게 되었습니다.
React를 사용했다면 이 정도의 경우 단순히 props 전달만으로도 해결 할 수 있었겠지만, 자바스크립트를 이용해서 다른 페이지로 데이터 전달을 해본 적이 없었기에 재미있었습니다.
리액트도 결국 자바스크립트의 라이브러리인 만큼 자바스크립트로 충분히 할 수 있을 것 같아 도전했습니다.
앞서 session에 저장했다고 했는데, 그 전에 Class로 만들어서 render()를 해야하나 생각도 했습니다.
로컬 스토리지의 경우 영속성을 가지고 있어서 브라우저를 닫았다가 다시 열었을 떄도 지속 되는데, 이 부분은 단순하여 잠시 디테일 페이지로 가서 보는 동안만 저장했다가 지워져도 되는 것이므로 브라우저가 종료되면 데이터가 지워지는 세션 스토리지에 저장 하게 되었습니다.
그리고 모든 데이터를 다 fetch 해와서 검색창에서 클릭 한 것과 같은 것이 있다면 나타나도록 했습니다.
이슈가 하나 있었다면, 처음에는 제대로 되지 않았다가 뒤로 가기를 해서 다시 검색하고 난 이후 즉, 첫 번째 이후부터 잘 작동한다는 것이었습니다.
이런 상태를 막기 위해 리랜더링 즉, 새로고침을 하도록 만들어서 이슈를 없앨 수 있도록 했습니다.

\*\* 혹시 Detail page가 제대로 열리지 않는다면 새로고침 한 후 다시 시도 부탁드립니다!

## 아쉬운 점

1. 실제 서비스가 진행되는 것이라면 UI 쪽에서도 더 많은 신경을 썼을 것입니다.
2. 세션 전달이 끊기는 경우가 발생하는데 이 점에 대해서도 더 고민이 필요할것입니다.
3. 변수명 짓는 것이 힘들어 변수명 짓는 법에 대한 것을 다시 보게 되었습니다.
4. 직접 만들고도 정리가 안된 자바스크립트라는 생각이 들어 리팩토링2 책을 구매하는 계기가 되었습니다.
