import { Client } from '@notionhq/client';
import { NOTION_DATABASE_ID, NOTION_KEY } from '$env/static/private';
import { generateIcs, generateIcsItems } from '$lib/generateIcs';

const SETTING = {
  filter: {
    and: [
      {
        property: 'Category',
        select: {
          does_not_equal: '🗑️Trush',
        },
      },
      {
        property: 'Category',
        select: {
          does_not_equal: '✔Done',
        },
      },
    ],
  },
  props: [
    { dateProp: 'Date', prefix: '' },
    { dateProp: '〆', prefix: '〆' },
  ],
};

export const GET = async ({ url }) => {
  const notion = new Client({ auth: NOTION_KEY });

  const databaseId = NOTION_DATABASE_ID ?? url.pathname.split('/')[1];
  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: SETTING.filter,
  });

  const icsItems = [];

  for (const prop of SETTING.props) {
    icsItems.push(...generateIcsItems(results, prop.dateProp, prop.prefix));
  }

  return new Response(generateIcs(icsItems));
};
