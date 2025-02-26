import BaseLayout from '@layouts/baseLayout';
import NewsFeedLayout from '@layouts/newsfeedLayout';

import { Placeholder } from '@components/note/placeholder';
import { Thread } from '@components/thread';

import { hoursAgo } from '@utils/getDate';

import { dateToUnix, useNostrEvents } from 'nostr-react';
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  Suspense,
  useRef,
} from 'react';

export default function Page() {
  const now = useRef(new Date());

  const { events } = useNostrEvents({
    filter: {
      until: dateToUnix(now.current),
      since: dateToUnix(hoursAgo(1, now.current)),
      kinds: [1],
      limit: 10,
    },
  });

  return (
    <div className="h-full w-full">
      <Suspense fallback={<Placeholder />}>
        <Thread data={events} />
      </Suspense>
    </div>
  );
}

Page.getLayout = function getLayout(
  page:
    | string
    | number
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | ReactFragment
    | ReactPortal
) {
  return (
    <BaseLayout>
      <NewsFeedLayout>{page}</NewsFeedLayout>
    </BaseLayout>
  );
};
