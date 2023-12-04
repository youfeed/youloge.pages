export function onRequestPost(context) {
  return new Response(`Hello ${context.params.user}`);
}
