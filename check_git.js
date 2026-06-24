import { execSync } from 'child_process';
try {
  const output = execSync('git ls-files client/public/logos', { cwd: 'c:\\Users\\user\\3D Objects\\Portfolio' });
  console.log('TRACKED FILES:');
  console.log(output.toString());
} catch (e) {
  console.error('Error running git:', e.message);
  if (e.stderr) console.error(e.stderr.toString());
}
