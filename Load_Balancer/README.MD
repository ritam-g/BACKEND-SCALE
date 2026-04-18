# 🚀 Load Balancer Setup (Nginx + Express)

## 📌 Overview

This project demonstrates how to implement a basic load balancer using:

* Nginx (reverse proxy)
* Node.js Express servers

---

## 🧩 Architecture

```
            Client (Browser/Postman)
                     │
                     ▼
            Nginx Load Balancer
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
   Server 1 (3001)          Server 2 (3002)
```

---

## ⚙️ Technologies Used

* Node.js
* Express.js
* Nginx

---

## 🖥️ Step 1: Create Backend Servers

### server1.js

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Response from Server 1");
});

app.listen(3001, () => console.log("Server 1 running"));
```

### server2.js

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Response from Server 2");
});

app.listen(3002, () => console.log("Server 2 running"));
```

---

## ▶️ Step 2: Run Servers

```
node server1.js
node server2.js
```

---

## ⚙️ Step 3: Configure Nginx

Edit `nginx.conf`:

```nginx
http {

    upstream backend_servers {
        server 127.0.0.1:3001;
        server 127.0.0.1:3002;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend_servers;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

---

## 🔁 Step 4: Restart Nginx

```
nginx -s stop
nginx
```

---

## 🌐 Step 5: Test

Open:

```
http://localhost
```

Refresh multiple times:

* Server 1 response
* Server 2 response

---

## 🔄 Load Balancing Strategy

Default: **Round Robin**

* Requests distributed equally

---

## ⚡ Advanced Options

### Weighted Load Balancing

```nginx
server 127.0.0.1:3001 weight=3;
server 127.0.0.1:3002 weight=1;
```

### Sticky Sessions

```nginx
ip_hash;
```

---

## ❗ Limitations

* Cannot directly route based on request count
* For advanced routing, use application-level logic

---

## 🚀 Future Improvements

* Add Redis for session sharing
* Use Docker for scaling
* Implement Kubernetes for auto-scaling
* Add health checks

---

## 🧠 Conclusion

This setup demonstrates how Nginx distributes incoming client requests across multiple backend servers, improving scalability and availability.
