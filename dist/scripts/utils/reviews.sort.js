class ReviewSort{sortByDate(e){let t=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];return Object.keys(e).map(t=>e[t]).sort(function(e,n){return t.indexOf(e.month)>t.indexOf(n.month)?-1:t.indexOf(e.month)<t.indexOf(n.month)?1:e.day>n.day?-1:e.day<n.day?1:0})}sortByPageAndPageSize(e,t,n){let r=[],o=Object.keys(n).length;t>o&&(t=o);for(let i=(e-1)*t;i<e*t;i++)i<o&&r.push(n[Object.keys(n)[i]]);return r}}const reviewSort=new ReviewSort;export{reviewSort};