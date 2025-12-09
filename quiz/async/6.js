// 특정 유저의 정보와 게시글 목록을 리턴하는 함수를 작성하시오.
//  - 예) 1번 유저의 글목록: https://jsonplaceholder.typicode.com/posts?userId=1
//- 댓글 목록: https://jsonplaceholder.typicode.com/posts/<postId>/comments
getUserPosts(1);
//   ⇒ 다음 형식으로 리턴 (format 준수!)
//   {
//     id: 유저ID,
//     name: 유저명,
//     posts: [
//        {id: 글ID, title: 글제목, body: 글내용}, {...
//     ]
//   }

async function getUserPosts(n) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${n}`
  );

  const posts = await res.json();

  const result = [];
  for (const post of posts) {
    const commentRes = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
    );
    const comments = await commentRes.json();

    result.push({
      postId: post.id,
      title: post.title,
      comments: comments,
    });
  }
  console.log(result[0].comments);
  return result;
}
