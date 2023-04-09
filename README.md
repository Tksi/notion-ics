# notion-ics

convert notion DB to icalender(ics)

## setup

set `NOTION_TOKEN` in env

change `SETTING` variable to fit your Notion DB on [./src/routes/\[databaseId\]/+server.ts](./src/routes/[databaseId]/+server.ts)

```bash
npm run dev
```

[http://localhost:3000/<NOTION_DATABASE_ID>](http://localhost:3000/<NOTION_DATABASE_ID>)
