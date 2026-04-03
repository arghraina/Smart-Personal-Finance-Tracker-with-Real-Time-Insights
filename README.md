- I have used lucide-react for clean and modern SVG icons, `npm install lucide-react`.

- In the `Header.jsx` file, I have added the Admin Toggle Button, which controls access. If you are in Admin controle, you can modify the data , whereas if you are in viwer only mode, you can only see the data.

# Data persistence:
- I have used Zustand to save the state in the Browser Storage. I have used this to maintain the Toggle button. Basically, without it , the app forgets everything, but with this user state persists `npm install zustand`. So, now even when the page refreshes, the state of the Toggle button persists.
- Also, although the data is hard-coded, but once a change is made in the UI, say Add or Delete, it actually reflects in dashboard.
To revisit to original form, we do `localStorage.clear()` in the console.
- It also manages the state of Read and Unread messages/notifications. When an item is added or deleted, a notification is generated and can be seen by clicking on the notification icon in Header Section. It flashes the number of unread messages on top of it which gets cleared after we see the message.

# Database:
- I have used only the temporary data which is there in the `src/store/Usestore.jsx`. We can also add the backend to extend this database.

# Graphs:
- I have used the recharts for building all the charts, `npm install recharts`.