const fs = require('fs');
const path = require('path');

// Extract routes from the app directory
function getRoutes(dir, basePath = '') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith('(') && entry.name.endsWith(')')) {
        // route group, don't include in path
        routes.push(...getRoutes(path.join(dir, entry.name), basePath));
      } else {
        const nextPath = basePath + '/' + entry.name;
        routes.push(...getRoutes(path.join(dir, entry.name), nextPath));
      }
    } else if (entry.name === 'page.tsx' || entry.name === 'page.js') {
      routes.push(basePath || '/');
    }
  }
  return routes;
}

const appRoutes = getRoutes(path.join(__dirname, 'app'));

// Replace dynamic segments for matching (e.g. /flights/[id] -> /flights/[^/]+)
const routeRegexes = appRoutes.map(route => {
  if (route === '/') return new RegExp('^/$');
  const escaped = route.replace(/\[\.\.\.[^\]]+\]/g, '.*').replace(/\[[^\]]+\]/g, '[^/]+');
  return new RegExp('^' + escaped + '(/.*)?$');
});

// Also static assets
const publicAssets = fs.readdirSync(path.join(__dirname, 'public')).map(f => '/' + f);

function isValidRoute(link) {
  // Strip query params and hash
  let cleanLink = link.split('?')[0].split('#')[0];
  if (cleanLink === '') return true; // Just hash or query
  
  if (publicAssets.includes(cleanLink)) return true;

  return routeRegexes.some(r => r.test(cleanLink));
}

function findLinks(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findLinks(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      const linkMatches = [...content.matchAll(/href=["'](\/[^"']*)["']/g)];
      const templateLinks = [...content.matchAll(/href=\{`(\/[^`]*)`\}/g)];
      const pushMatches = [...content.matchAll(/push\(["'](\/[^"']*)["']\)/g)];
      const pushTemplateMatches = [...content.matchAll(/push\(`(\/[^`]*)`\)/g)];
      
      const allMatches = [...linkMatches, ...templateLinks, ...pushMatches, ...pushTemplateMatches];
      
      allMatches.forEach(match => {
        const link = match[1];
        if (!isValidRoute(link)) {
          console.log(`${fullPath.replace(__dirname, '')} -> ${link}`);
        }
      });
    }
  }
}

console.log("Broken links found:");
findLinks(__dirname);
