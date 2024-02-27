'use client';

export default function Home() {
  function handleGetPost() {
    fetch('/api/get-post?postId=123&postAuthor=joe-m').then((res) => res.json().then((d) => alert(JSON.stringify(d))));
  }

  function handleGetPostWithParam() {
    fetch('/api/with-param/123/joe-m').then((res) => res.json().then((d) => alert(JSON.stringify(d))));
  }

  function handleGetPostWithInvalidQuery() {
    fetch('/api/get-post?postId=123&postName=joe-m').then((res) => res.json().then((d) => alert(JSON.stringify(d))));
  }

  function handleCatchError() {
    fetch('/api/catch-error').then((res) => res.json().then((d) => alert(JSON.stringify(d))));
  }

  function handleCreatePost() {
    fetch('/api/create-post', {
      method: 'POST',
      body: JSON.stringify({
        postTitle: 'yo',
        postText: 'sup',
      }),
    }).then((res) => res.json().then((d) => alert(JSON.stringify(d))));
  }

  function handleCreatePostWithInvalidBody() {
    fetch('/api/create-post', {
      method: 'POST',
      body: JSON.stringify({
        postTitle: 'yo',
        post: 'sup',
      }),
    }).then((res) => res.json().then((d) => alert(JSON.stringify(d))));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
      <button onClick={handleGetPost}>Run get-post example</button>
      <button onClick={handleGetPostWithParam}>Run get-post with param example</button>
      <button onClick={handleGetPostWithInvalidQuery}>Run get-post with invalid query example</button>
      <button onClick={handleCreatePost}>Run create-post example</button>
      <button onClick={handleCreatePostWithInvalidBody}>Run create-post with invalid body example</button>
      <button onClick={handleCatchError}>Run handle-error example</button>
    </div>
  );
}
