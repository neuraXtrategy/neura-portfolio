const { writeFileSync, mkdirSync } = require('fs');
const path = './src/environments/environment.ts';
const envContent = `export const environment = {
  production : false,
  apiUrl: '${process.env.API_URL}',
  supabaseAnonKey: '${process.env.SUPABASE_ANON_KEY}'
};
`;
mkdirSync('./src/environments', { recursive: true });
writeFileSync(path, envContent);
