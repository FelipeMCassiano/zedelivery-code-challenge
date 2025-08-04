# Zé Delivery Challenge

A backend service for managing delivery partners, built with Fastify, TypeScript, and MongoDB.

## 🚀 Features

-   Register new delivery partners
-   Search partners by location (GeoJSON)
-   Retrieve partner details by ID
-   MongoDB geospatial queries

## 🛠️ Tech Stack

-   Fastify
-   TypeScript
-   MongoDB
-   Mongoose

## 📦 Project Structure

```
backend/
├── src/
│   ├── config/
│   ├── services/
│   └── index.ts
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

## ⚡ Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/zedelivery-challenge.git
cd zedelivery-challenge/backend
```

### 2. Start Project with Docker

```sh
docker-compose up -d
```

## 📚 API Endpoints

| Method | Endpoint               | Description                    |
| ------ | ---------------------- | ------------------------------ |
| GET    | `/partners/:partnerId` | Get partner by ID              |
| GET    | `/partners?long=&lat=` | Search partners by coordinates |
| POST   | `/partners`            | Register a new partner         |

## 📝 Partner JSON Example

```json
{
    "id": 1,
    "tradingName": "Zé Beer",
    "ownerName": "José",
    "document": "123456789",
    "coverageArea": {
        "type": "MultiPolygon",
        "coordinates": [
            [
                [
                    [
                        [0, 0],
                        [1, 1],
                        [1, 0],
                        [0, 0]
                    ]
                ]
            ]
        ]
    },
    "address": {
        "type": "Point",
        "coordinates": [0, 0]
    }
}
```

## 🧑‍💻 Author

Made with ❤️ by FelipeMCassiano

---

Feel free to contribute or open issues!
