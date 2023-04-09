# notion-ics

convert notion DB to icalender(ics)

## setup

set `NOTION_TOKEN` and `NOTION_DATABASE_ID` in env
(NOTION_DATABASE_ID is optional)

change `SETTING` variable to fit your Notion props on [./src/routes/\[databaseId\]/+server.ts](./src/routes/[databaseId]/+server.ts)

```bash
npm run dev
```

access [http://localhost:3000/](http://localhost:3000/) OR [http://localhost:3000/<NOTION_DATABASE_ID>](http://localhost:3000/<NOTION_DATABASE_ID>)
