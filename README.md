# back-end

### Branch
- master: 금요일마다 Merge Request 요청
- dev: 틈틈이 dev 브랜치에 feature 브랜치 Merge Request
- feature: 기능 1개당 브랜치 하나

```
db
	models
	Schema
services(class)
routers
public(img...)
views(Frontend)
package.json
package-lock.json
.gitignore
.env
README.md
```

```
// User Schema
_id
name
email
password
```

```
// Product Schema
_id
name
price
petType
category
```

```
// Order Schema
_id
User, ref: User
ProductList, ref: Product
totalPrice
deliveryStatus
```
