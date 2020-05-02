export async function wrapWithTime(callback: () => void | Promise<void>) {
  const start = new Date();
  await callback();
  console.log(`(${(new Date().getTime() - start.getTime()) / 1000}s)`);
}
