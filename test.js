import fetch from 'node-fetch';

async function testMicroservice() {
  console.log("=== Starting Preference Manager Test ===");

  const postRes = await fetch('http://localhost:4001/api/preferences', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'theme', value: 'dark' })
  });
  const postData = await postRes.json();
  console.log("POST Response:", postData);

  const getRes = await fetch('http://localhost:4001/api/preferences');
  const getData = await getRes.json();
  console.log("GET Response:", getData);

  const patchRes = await fetch('http://localhost:4001/api/preferences', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'theme', value: 'light' })
  });
  const patchData = await patchRes.json();
  console.log("PATCH Response:", patchData);

  const finalRes = await fetch('http://localhost:4001/api/preferences');
  const finalData = await finalRes.json();
  console.log("Final GET Response:", finalData);

  console.log("=== Test Complete ===");
}

testMicroservice();

