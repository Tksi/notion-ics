import { addDays, format } from 'date-fns';
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.d';

type IcsItem = {
  BEGIN: string;
  'DTSTART;VALUE=DATE': string;
  'DTEND;VALUE=DATE': string;
  UID: any;
  SUMMARY: any;
  END: string;
};

export const generateIcsItems = (
  results: (PageObjectResponse | PartialPageObjectResponse)[],
  dateProp = 'Date',
  prefix = ''
): IcsItem[] => {
  const body = results
    .filter(({ properties }) => properties[dateProp]?.date)
    .map(({ properties }) => {
      const startDate = new Date(properties[dateProp].date.start);
      const endDate = new Date(
        properties[dateProp].date.end ?? addDays(startDate, 1)
      );

      return {
        BEGIN: 'VEVENT',
        'DTSTART;VALUE=DATE': format(startDate, 'yyyyMMdd'),
        'DTEND;VALUE=DATE': format(endDate, 'yyyyMMdd'),
        UID: prefix + properties.Name.title[0].plain_text,
        SUMMARY: prefix + properties.Name.title[0].plain_text,
        END: 'VEVENT',
      };
    });

  return body;
};

export const generateIcs = (items: IcsItem[]): string => {
  return `BEGIN:VCALENDAR
PRODID:-
VERSION:2.0
CALSCALE:GREGORIAN
X-WR-CALNAME:Notion
X-WR-TIMEZONE:Asia/Tokyo
BEGIN:VTIMEZONE
TZID:Asia/Tokyo
X-LIC-LOCATION:Asia/Tokyo
BEGIN:STANDARD
TZOFFSETFROM:+0900
TZOFFSETTO:+0900
TZNAME:JST
DTSTART:19700101T000000
END:STANDARD
END:VTIMEZONE
${items
  .map((item) =>
    Object.entries(item)
      .map((arr) => arr.join(':'))
      .join('\n')
  )
  .join('\n')}
END:VCALENDAR
`;
};
