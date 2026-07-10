import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
const root=process.cwd();
const failures=[];
const noindex=['amazon-error-13013.html','amazon-error-20000.html','amazon-error-8008.html','amazon-error-8036.html','amazon-error-8058.html','amazon-error-8541.html','amazon-error-8560.html','amazon-error-90112.html','amazon-error-90244.html','amazon-error-99010.html','amazon-listing-upload-error.html','about.html','contact.html','disclaimer.html','privacy-policy.html','terms.html'];
for(const file of noindex){const text=readFileSync(join(root,file),'utf8');if(!text.includes('noindex,follow'))failures.push(`${file} must be noindex,follow`);if(text.includes('adsbygoogle.js'))failures.push(`${file} must not load ads`);}
const index=readFileSync(join(root,'index.html'),'utf8');if(!index.includes('adsbygoogle.js'))failures.push('Homepage should retain the configured AdSense ownership/runtime');
const sitemap=readFileSync(join(root,'sitemap.xml'),'utf8');for(const slug of ['amazon-error-20000','amazon-error-8541','amazon-listing-upload-error','/about','/contact'])if(sitemap.includes(slug))failures.push(`Sitemap must exclude ${slug}`);
for(const slug of ['amazon-feed-error-codes','amazon-processing-report','amazon-variation-triage'])if(!sitemap.includes(slug))failures.push(`Sitemap missing ${slug}`);
const htmlFiles=readdirSync(root).filter((f)=>f.endsWith('.html'));
const titles=new Map();
for(const file of htmlFiles){const text=readFileSync(join(root,file),'utf8');const m=text.match(/<title>([^<]+)<\/title>/i);if(m){const list=titles.get(m[1])||[];list.push(file);titles.set(m[1],list);}}
for(const [title,files] of titles)if(files.length>1)failures.push(`Duplicate title ${title}: ${files.join(', ')}`);
if(!readFileSync(join(root,'.vercelignore'),'utf8').includes('docs'))failures.push('Internal docs must be excluded from deployment');
if(failures.length){console.error(failures.join('\n'));process.exit(1);}console.log(`Flat File source audit passed (${htmlFiles.length} HTML pages)`);
