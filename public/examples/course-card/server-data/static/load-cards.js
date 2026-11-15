// 서버 주소에서 JSON을 가져와 배열로 반환합니다.
async function loadCards(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("서버 응답을 확인하세요.");
  return response.json();
}
