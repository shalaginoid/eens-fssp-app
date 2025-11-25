import type { Peer } from 'crossws';

export default defineWebSocketHandler({
  async upgrade(request) {
    await requireUserSession(request);
  },
  async open(peer: Peer) {
    const peers = peer.peers.values();
    const users = await getVisitors(peers);

    peer.subscribe('visitors');
    peer.publish('visitors', JSON.stringify(users));
    peer.send(JSON.stringify(users));
  },
  async close(peer: Peer) {
    const peers = peer.peers.values();
    const users = await getVisitors(peers);

    peer.unsubscribe('visitors');
    peer.publish('visitors', JSON.stringify(users));
  },
});

async function getVisitors(peers: any) {
  const visitors: Visitor[] = [];

  for (const peer of peers) {
    try {
      const session = await requireUserSession(peer);

      if (session.user) {
        visitors.push({
          sessionId: session.id,
          peerId: peer.id,
          user: session.user,
        });
      }
    } catch (error: any) {}
  }

  return visitors;
}
