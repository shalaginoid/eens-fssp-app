import { NtlmClient } from 'axios-ntlm';
import sharp from 'sharp';

export default defineEventHandler(async (event) => {
  const fullname = getRouterParam(event, 'fullname');
  const { ntlm } = useRuntimeConfig();
  const client = NtlmClient(ntlm);

  try {
    let response = await client({
      url: `http://portal.eksbyt.ru/docum/DocLib1/${fullname}.jpg`,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    const resizedImageBuffer = await sharp(response.data)
      .resize(40, 40)
      .autoOrient()
      .toBuffer();

    return resizedImageBuffer;
  } catch (error: any) {}
});
