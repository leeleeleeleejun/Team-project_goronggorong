<<<<<<< HEAD
# 🐕GoRongGoRong_ShoppingMall🐈
    >애견용품들을 카테고리 별로 확인하고,
    >원하는 제품들은 장바구니에 담으며,
    >주문 및 배송을 할 수 있는 쇼핑몰 웹 서비스 제작 프로젝트 입니다.
--------------------------------------------------------
### 핵심기능
     1. 회원가입, 로그인, 로그아웃, 회원정보 수정 등 유저 정보 관련 CRUD
     2. 관리자 권한으로 로그인 시 아래와 같은 기능 추가
        - 제품추가/수정/삭제 등 제품 관련 CRUD
        - 카테고리 추가/조회/수정/삭제 등 제품 카테고리 관련 CRUD
        -  주문 상태 수정 및 삭제
     3. 제품 목록을 조회 및, 제품 상세 정보를 조회 가능함.
     4. 장바구니에 제품을 추가할 수 있으며, 장바구니에서 CRUD 작업이 가능함.
        - 장바구니는 서버 DB가 아닌, 프론트 단에서 저장 및 관리됨 (sessionStorage)
     5. 장바구니에서 주문을 진행하며, 주문 완료 후 조회 및 삭제가 가능함

###  서비스의 목적(goal)과 목표(objective)
    - 목적: 초보 집사도 간편하고 쉽게 반려동물 관련 제품을 구매 할 수 있는 온라인 쇼핑몰 서비스를 구현합니다.
    - 목표
        - 홈 화면에서 의류 상품 종류를 확인할 수 있습니다.
        - 회원 가입을 하지 않아도 상품을 구경하고 장바구니에 넣을 수 있습니다.
        - 최소한의 클릭으로 상품을 구매하거나 판매할 수 있습니다.
    
### 이용 대상자
     - 홍길동 (23) : “반려동물을 처음 키우는 데 어떻게 시작해야할지 모르겠어요”
       (용돈은 부족하지만 가성비 좋은 물건을 구매하고 싶어요!)
     - 직업: 대학생


### 주요 사용 기술
  <strong>1. 프론트엔드</strong>
    <br/>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"> 
    <img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white"> 
    <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"> 

  <strong>2. 백엔드</strong>
    <br/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white">
	<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white">
	<img src="https://img.shields.io/badge/Babel-F9DC3E?style=flat-square&logo=Babel&logoColor=white">
	<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white">

### Branch
- master: 금요일마다 Merge Request 요청
- dev: 틈틈이 dev 브랜치에 feature 브랜치 Merge Request
  - dev-FE
  - dev-BE
- feature: 기능 1개당 브랜치 하나
  - feature-FE-order
  - featuer-BE-api


### File Setting
```
.root
├── public
└── src
    ├── app.js
    ├── db
    │   ├── models
    │   └── schemas
    ├── routers
    ├── services
    └── views
```
=======
# back-end
>>>>>>> e255a7a (Initial commit)

### Branch
- master: 금요일마다 Merge Request 요청
- dev: 틈틈이 dev 브랜치에 feature 브랜치 Merge Request
- feature: 기능 1개당 브랜치 하나

```
db
	models
	schemas
services
routers
public
views
```
