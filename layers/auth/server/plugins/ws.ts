import type { Peer } from 'crossws';
import type { Layer } from 'h3';
import { joinURL, parseURL } from 'ufo';

function createResolver(stack: Layer[]) {
  return async (path: string) => {
    let _layerPath;
    let lastMatchedRes = null;
    let resolvedRes = null;

    for (const layer of stack) {
      if (layer.route === '/' && !layer.handler.__resolve__) {
        continue;
      }

      if (!path.startsWith(layer.route)) {
        continue;
      }

      _layerPath = path.slice(layer.route.length) || '/';

      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }

      let res = { route: layer.route, handler: layer.handler };

      lastMatchedRes = res;

      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }

        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || '/', _res.route || '/'),
        };

        resolvedRes = res;
      }
    }

    return resolvedRes || lastMatchedRes;
  };
}

export default defineNitroPlugin(async (nitro) => {
  if (!nitro.h3App.websocket) return;

  const resolver = createResolver(nitro.h3App.stack);

  nitro.h3App.websocket.resolve = async (info) => {
    const url = (info as Peer).request?.url || '/';
    const { pathname } = typeof url === 'string' ? parseURL(url) : url;
    const resolved = await resolver(pathname);
    return resolved?.handler?.__websocket__ || {};
  };
});
