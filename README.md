Budget App

Spending document:
- id: String
- createdAt: Date
- note: String
- labels: Array<String>
- photos[?]: Array<String> (urls)
- category: Category
- amount: Float
- currency: OneOf<String>

Category document (extra):
- id: String
- title: String

Endpoints:
- GET /api/v1/spendings (query: ?period=week&category=food&labels=label1,label2,label3,label4)
- GET /api/v1/spendings/:id
- POST /api/v1/spendings
- PATCH /api/v1/spendings/:id
- DELETE /api/v1/spendings/:id

(extra)
- GET /api/v1/categories
- POST /api/v1/categories
- DELETE /api/v1/categories/id (what if we remove category that used in specific spending?)

Filters:
- period: week, month, year, all time
- category: bills, food, shopping, gifts, healthcare, taxi, etc.
- labels: String

Screens:
- Home: list of spendings for today, period selector, filters
- Spending: specific spending info page
- Add Spending (modal): form with spending fields