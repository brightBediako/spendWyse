# spendWyse Architecture

The following diagram illustrates the high-level structure and relationships between major modules/components in the spendWyse application.

---
config:
  layout: elk
---
flowchart TD
 subgraph Client["Frontend: React App"]
        A["App.jsx"]
        B["HomePage"]
        C["Login / Register"]
        D["PrivateNavbar / PublicNavbar"]
        E["Dashboard"]
        F["TransactionForm"]
        G["CategoriesList / AddCategory / UpdateCategory"]
        H["UserProfile"]
        I["Redux Store"]
        J["Service layer (API calls)"]
        K["React Query Provider"]
  end
 subgraph API["Backend: Express API"]
        L["server.js / app.js"]
        M["auth.route.js"]
        N["category.route.js"]
        O["transaction.route.js"]
        P["user.route.js"]
        Q["Controllers\n(auth, user, category, transaction)"]
        R["Models\n(User, Category, Transaction)"]
        S["DB Config"]
        T["Middleware"]
  end
    A --> B & C & D & E & G & F & H & K & I
    H --> J
    E --> J
    F --> J
    G --> J
    J --> K
    J -- REST (auth, user, category, transaction) --> L
    L --> M & N & O & P & S & T
    M --> Q
    N --> Q
    O --> Q
    P --> Q
    Q --> R
