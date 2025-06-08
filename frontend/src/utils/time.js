export async function saveTime(time) {
  const res = await fetch('http://localhost:5555/times', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ time }),
  })
  return res.json()
}

export async function deleteTime(id) {
  const res = await fetch(`http://localhost:5555/time/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}
