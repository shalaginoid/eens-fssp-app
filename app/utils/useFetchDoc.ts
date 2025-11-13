export default async (messageId: number) => {
  const file: any = await $fetch(`/api/files/${messageId}`);

  const linkSource = `data:${file[0].mimeType};base64,${file[0].attachment}`;
  const downloadLink = document.createElement('a');

  downloadLink.href = linkSource;
  downloadLink.download = file[0].fileName;
  downloadLink.click();
};
