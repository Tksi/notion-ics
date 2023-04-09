import { json } from '@sveltejs/kit';
import { Client } from '@notionhq/client';
import { NOTION_KEY, NOTION_DATABASE_ID } from '$env/static/private';
import { generateIcs, generateIcsItems } from '$lib/generateIcs';

const filter = {
	property: 'Category',
	select: {
		equals: '〆mDo'
	}
};

export const GET = async () => {
	const notion = new Client({ auth: NOTION_KEY });

	const databaseId = NOTION_DATABASE_ID;

	const { results } = await notion.databases.query({
		database_id: databaseId,
		filter
	});

	const icsItems = generateIcsItems(results);
	// return json(results);

	// return json(generateIcs(results));

	return new Response(generateIcs(icsItems));
};
