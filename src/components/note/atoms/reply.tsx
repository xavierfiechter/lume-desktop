import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { useNostrEvents } from 'nostr-react';

export default function Reply({ eventID }: { eventID: string }) {
  const { events } = useNostrEvents({
    filter: {
      '#e': [eventID],
      since: 0,
      kinds: [1],
      limit: 10,
    },
  });

  return (
    <button className="group flex w-16 items-center gap-1.5 text-sm text-zinc-500">
      <div className="rounded-lg p-1 group-hover:bg-zinc-600">
        <ChatBubbleIcon className="h-4 w-4 group-hover:text-orange-400" />
      </div>
      <span>{events.length || 0}</span>
    </button>
  );
}
