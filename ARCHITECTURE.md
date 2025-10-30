# spendWyse Architecture

The following diagram illustrates the high-level structure and relationships between major modules/components in the spendWyse application.

```mermaid
graph TD
  subgraph Client [Frontend: React App]
    A[App.jsx]
    B[HomePage]
    C[Login / Register]
    D[PrivateNavbar/PublicNavbar]
    E[Dashboard]
    F[TransactionForm]
    G[CategoriesList / AddCategory / UpdateCategory]
    H[UserProfile]
    I[Redux Store]
    J[Service layer (API calls)]
    K[React Query Provider]
  end

  subgraph API [Backend: Express API]
    L[server.js / app.js]
    M[auth.route.js]
    N[category.route.js]
    O[transaction.route.js]
    P[user.route.js]
    Q[Controllers<br>(auth, user, category, transaction)]
    R[Models<br>(User, Category, Transaction)]
    S[DB Config]
    T[Middleware]
  end

  %% Internal frontend
  A --> B
  A --> C
  A --> D
  A --> E
  A --> G
  A --> F
  A --> H
  A --> K
  H --> J
  E --> J
  F --> J
  G --> J
  J --> K
  A --> I

  %% API endpoints used by client
  J -- "REST (auth, user, category, transaction)" --> L

  %% Backend structure
  L --> M & N & O & P
  M --> Q
  N --> Q
  O --> Q
  P --> Q
  Q --> R
  L --> S
  L --> T
```
