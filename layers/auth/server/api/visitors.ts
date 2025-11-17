export default defineWebSocketHandler({
  async upgrade(request) {
    await requireUserSession(request);
  },
  async open(peer) {
    const peers = peer.peers.values();
    const users = await useGetUsers(peers);

    peer.subscribe('visitors');
    peer.publish('visitors', JSON.stringify(users));
    peer.send(JSON.stringify(users));
  },
  async close(peer) {
    const peers = peer.peers.values();
    const users = await useGetUsers(peers);

    peer.unsubscribe('visitors');
    peer.publish('visitors', JSON.stringify(users));
  },
});

async function useGetUsers(peers: any) {
  const users = await Promise.all(
    peers
      .map(async (peer: any) => {
        const session = await getUserSession(peer);

        if (session && session.user) {
          return {
            sessionId: session.id,
            peerId: peer.id,
            user: session.user,
          };
        }
      })
      .filter((peer: any) => peer !== null && peer !== undefined),
  );

  return users;
}
