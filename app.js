const aliases={sku:["sku","seller-sku","seller sku","商家sku","卖家sku"],errorCode:["error-code","error code","errorcode","错误代码","错误码"],message:["error-message","error message","message","错误信息","错误描述","原因"],rowNumber:["original-record-number","record number","row number","line number","行号","原始行号"],attribute:["attribute-name","attribute name","field-name","field name","字段","属性"],errorType:["error-type","error type","type","错误类型"]};
const rules={
  "8008": {
    "title": "子 SKU 无法识别或未正确创建",
    "severity": "high",
    "likelyFields": [
      "sku",
      "item_sku",
      "parent_sku",
      "parentage",
      "relationship_type",
      "variation_theme"
    ],
    "explanation": "Amazon 官方说明 8008 通常出现在 relationship feed 中引用的 child SKU 没有通过 product data feed 正确创建，或父子体关系字段引用了错误的 SKU。",
    "fixSteps": [
      "确认 error-message 是否出现 We cannot recognize your child SKU 或类似提示。",
      "先用 product data feed 成功创建每个 child SKU，再上传 relationship/variation 关系。",
      "检查 parent_sku、child sku、parentage、relationship_type、variation_theme 是否拼写一致，避免引用不存在的 SKU。",
      "如果 child SKU 已存在，下载新的 Processing Report，确认是否是关系字段错误、模板类型错误或站点/分类模板不匹配。"
    ],
    "sourceLabel": "Amazon Seller Central Help",
    "sourceUrl": "https://sellercentral.amazon.com/help/hub/reference/external/G23701",
    "confidence": "official",
    "lastChecked": "2026-05-30"
  },
  "8036": {
    "title": "变体关系创建受限",
    "severity": "high",
    "likelyFields": [
      "parent_sku",
      "parentage",
      "relationship_type",
      "variation_theme",
      "sku",
      "asin"
    ],
    "explanation": "Amazon 官方说明 8036 与创建 ASIN 变体关系的能力被移除有关，常见于近期变体政策违规或账号/目录限制。不要把它简单当成商品编码无效；应以 Processing Report 原文和 Seller Central 提示为准。",
    "fixSteps": [
      "先确认 Processing Report 原文是否提到 policy violations、create variation relationships 或 30 days 等限制。",
      "检查 parent_sku、parentage、relationship_type、variation_theme 和每个 child SKU 是否一致，但不要只靠改字段反复上传。",
      "如果提示为账号/政策限制，准备 batch id、case id、受影响 SKU/ASIN 和 Processing Report，与 Seller Support 或 Account Health 跟进。",
      "限制解除前不要频繁重传同一父子体关系；可先修其它字段错误，再等待或走官方申诉/支持流程。"
    ],
    "sourceLabel": "Amazon Seller Central Help",
    "sourceUrl": "https://sellercentral.amazon.com/help/hub/reference/external/G2SCG3A2RBTHSJMC",
    "confidence": "official",
    "lastChecked": "2026-05-30"
  },
  "8058": {
    "title": "字段值无效或缺少必填值",
    "severity": "medium",
    "likelyFields": [
      "attribute-name",
      "product_type",
      "item_type_keyword",
      "recommended_browse_nodes",
      "valid_values"
    ],
    "explanation": "Inventory file 中某个必填字段缺失，或指定字段的值不在当前模板 Valid Values / Data Definitions 允许范围内。",
    "fixSteps": [
      "先看 Processing Report 的 attribute-name，回到原始 Flat File 的同一列和 original-record-number 行。",
      "打开当前分类模板的 Data Definitions 或 Valid Values 页，确认该字段是否必填以及允许值。",
      "不要自造枚举值、翻译列名或混用其它 marketplace / 分类模板的字段值。",
      "修复指定字段后只上传受影响 SKU 做验证，再批量重传。"
    ],
    "sourceLabel": "Amazon Seller Central Help",
    "sourceUrl": "https://sellercentral.amazon.com/help/hub/reference/external/G24501",
    "confidence": "official",
    "lastChecked": "2026-05-30"
  },
  "8541": {
    "title": "商品编码与现有 ASIN 信息冲突",
    "severity": "high",
    "likelyFields": [
      "external_product_id",
      "brand",
      "item_name",
      "manufacturer"
    ],
    "explanation": "上传信息与亚马逊目录中已有 ASIN 的关键属性不一致，通常会阻断创建或更新。",
    "fixSteps": [
      "确认这个 SKU 是要匹配已有 ASIN，还是创建全新 ASIN。",
      "检查 UPC/EAN/ASIN 是否填错，尤其是复制模板时遗留的商品编码。",
      "对比品牌、标题、制造商、颜色、尺寸、型号等关键字段。",
      "如果目录信息被锁定，准备产品包装图、品牌授权或官网链接后联系 Seller Support。"
    ],
    "sourceLabel": "Amazon Seller Central Help",
    "sourceUrl": "https://sellercentral.amazon.com/gp/help/external/G200692330",
    "confidence": "official",
    "lastChecked": "2026-05-30"
  },
  "8560": {
    "title": "SKU 创建失败或缺少关键信息",
    "severity": "high",
    "likelyFields": [
      "sku",
      "product_type",
      "item_name",
      "external_product_id"
    ],
    "explanation": "亚马逊无法用当前行创建 SKU，常见原因是商品类型、编码、分类或必填属性缺失。",
    "fixSteps": [
      "确认 SKU、product_type、item_name、brand 已填写。",
      "检查商品编码类型和值是否匹配，例如 UPC/EAN/ASIN。",
      "如果是无编码商品，确认是否已获 GTIN 豁免。",
      "优先用最少字段创建测试 SKU，再逐步补充属性。"
    ],
    "sourceLabel": "Amazon Seller Central Help",
    "sourceUrl": "https://sellercentral.amazon.com/help/hub/reference/external/G200692370",
    "confidence": "official",
    "lastChecked": "2026-05-30"
  },
  "13013": {
    "title": "SKU 不在目录中或已被删除",
    "severity": "high",
    "likelyFields": [
      "sku",
      "external_product_id",
      "product-id",
      "product-id-type",
      "update_delete"
    ],
    "explanation": "Amazon 无法把这条记录匹配到可更新的目录商品或有效 SKU，常见于 SKU 尚未成功创建、已删除、跨站点本地化未完成，或 product-id/ASIN/SKU 关系不一致。",
    "fixSteps": [
      "先在 Manage Inventory 中确认该 SKU 是否已经存在且未被删除。",
      "如果是在创建新 listing，检查 product-id、product-id-type、brand、item_name 等建品字段是否足以创建商品。",
      "如果是在更新已有 SKU，确认 update_delete 的动作与当前 SKU 状态一致，不要更新不存在或已删除的 SKU。",
      "跨 marketplace 复制商品时，等待本地化完成后再重传；仍失败时带 Processing Report 联系 Seller Support。"
    ],
    "sourceLabel": "Amazon Seller Central Help",
    "sourceUrl": "https://sellercentral.amazon.com/help/hub/reference/external/G25001",
    "confidence": "official",
    "lastChecked": "2026-05-30"
  },
  "20000": {
    "title": "图片或媒体 URL 无法访问",
    "severity": "medium",
    "likelyFields": [
      "main_image_url",
      "other_image_url1",
      "other_image_url2",
      "swatch_image_url",
      "media_url"
    ],
    "explanation": "Amazon 无法从你提供的 URL 下载图片或媒体文件，常见原因是请求超时、SSL 证书问题、DNS 问题、URL 需要登录、重定向异常或文件不是直接公开媒体地址。",
    "fixSteps": [
      "在无登录浏览器窗口打开图片 URL，确认它直接返回图片文件而不是网页、登录页或重定向页。",
      "使用 HTTPS 直链，并检查 SSL 证书、DNS、服务器防盗链、超时和 robots/CDN 访问限制。",
      "避免网盘分享链接、短链、临时签名链接、带中文空格或特殊字符的 URL。",
      "替换 URL 后只上传 1-3 个受影响 SKU，下载新的 Processing Report 确认 20000 是否消失。"
    ],
    "sourceLabel": "Amazon Seller Central Help",
    "sourceUrl": "https://sellercentral.amazon.com/help/hub/reference/external/GWE4P3MRZPT2ZDW5",
    "confidence": "official-regional",
    "lastChecked": "2026-05-30"
  },
  "90112": {
    "title": "字段值或数据格式不被接受",
    "severity": "medium",
    "likelyFields": [
      "attribute-name",
      "condition_type",
      "fulfillment_channel",
      "date fields",
      "numeric fields"
    ],
    "explanation": "Processing Report 显示某个字段值、日期格式或数值格式不符合当前分类模板要求。常见场景包括日期格式错误、数值包含无效字符、枚举值不在 Valid Values 中，或必填字段为空。",
    "fixSteps": [
      "优先读取 Processing Report 的 error-message 和 attribute-name，不要只看错误码。",
      "回到分类模板的 Data Definitions / Valid Values 页确认字段类型、日期格式、数值范围和允许枚举。",
      "日期字段优先按模板要求改为 YYYY-MM-DD 等指定格式；数值字段删除货币符号、中文单位和多余空格。",
      "只上传受影响的 1-3 个 SKU 做验证，确认 90112 不再出现后再批量重传。"
    ],
    "sourceLabel": "Amazon Seller Central Help",
    "sourceUrl": "https://sellercentral.amazon.com/help/hub/reference/external/G200712890",
    "confidence": "official",
    "lastChecked": "2026-05-30"
  },
  "90244": {
    "title": "变体关系或父子体字段错误",
    "severity": "high",
    "likelyFields": [
      "parentage",
      "parent_sku",
      "relationship_type",
      "variation_theme"
    ],
    "explanation": "父体、子体、variation_theme 或 relationship_type 不一致。",
    "fixSteps": [
      "确认父体行 parentage 为 parent，子体行为 child。",
      "子体必须填写 parent_sku，并指向同一个父体 SKU。",
      "父体和所有子体使用同一个 variation_theme。",
      "变体属性如 color/size 必须在每个子体中填写且互不冲突。"
    ],
    "sourceLabel": "Amazon Seller Central Help",
    "sourceUrl": "https://sellercentral.amazon.com/help/hub/reference/external/GJZZWYN3DEX4ZMUV",
    "confidence": "official",
    "lastChecked": "2026-05-30"
  },
  "99010": {
    "title": "缺少必填字段",
    "severity": "high",
    "likelyFields": [
      "item_name",
      "brand",
      "product_type",
      "recommended_browse_nodes"
    ],
    "explanation": "模板要求的必填属性没有填写，或字段名/列位置不符合当前分类模板。",
    "fixSteps": [
      "根据报告中的 attribute-name 找到对应模板列。",
      "补齐标题、品牌、分类、商品类型、变体主题等必填字段。",
      "确认使用的是当前站点和当前分类的最新版模板。",
      "保存为制表符分隔文本后重新上传。"
    ],
    "sourceLabel": "Amazon Seller Central Help",
    "sourceUrl": "https://sellercentral.amazon.sg/help/hub/reference/external/GKWM4E4QWN663FXX",
    "confidence": "official-regional",
    "lastChecked": "2026-05-30"
  }
};
const sampleReport=`sku\terror-code\terror-message\tattribute-name\toriginal-record-number
SKU-RED-001\t8541\tThe value provided conflicts with the Amazon catalog.\texternal_product_id\t12
SKU-RED-002\t99010\tA value is required for item_name.\titem_name\t13
SKU-BLUE-003\t90244\tThe child SKU does not match the variation relationship.\tparent_sku\t19
SKU-CAT-004\t13013\tYour SKU cannot be added because the product is not in the catalog or has been deleted.\tsku\t21
SKU-IMAGE-004\t20000\tWe could not access the media at URL. The download request timed out.\tmain_image_url\t22
SKU-DATE-005\t90112\tThe value provided is not a valid DATE. Use the required date format.\trelease_date\t25`;
const state={errors:[],diagnosis:null,currentView:"code",fileName:""};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const els={fileInput:$("#fileInput"),chooseFile:$("#chooseFile"),dropzone:$("#dropzone"),loadSample:$("#loadSample"),clearAll:$("#clearAll"),results:$("#results"),summaryCards:$("#summaryCards"),errorList:$("#errorList"),tabButtons:$$(".tab-button"),copyMarkdown:$("#copyMarkdown"),downloadCsv:$("#downloadCsv"),ruleGrid:$("#ruleGrid"),toast:$("#toast")};
const h=v=>String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
const confidenceLabel=v=>({official:"官方来源","official-regional":"官方来源（区域站点）","needs-review":"待人工确认"}[v]||"待确认");
const sourceLine=r=>r.sourceUrl?`<p class="rule-source">规则来源：<a href="${h(r.sourceUrl)}" target="_blank" rel="noopener">${h(r.sourceLabel)}</a> · ${h(confidenceLabel(r.confidence))} · checked ${h(r.lastChecked)}</p>`:`<p class="rule-source">规则来源：${h(r.sourceLabel)} · ${h(confidenceLabel(r.confidence))} · 请以当前 Seller Central Processing Report 和分类模板最终确认。</p>`;
const norm=v=>String(v||"").trim().toLowerCase().replace(/\uFEFF/g,"").replace(/[_\s]+/g," ").replace(/\s*-\s*/g,"-");
const normalizeCode=value=>String(value||"").match(/\b\d{4,5}\b/)?.[0]||"UNKNOWN";
const allAliases=Object.values(aliases).flat().map(norm), supported=new Set(["txt","csv","tsv"]);
function rule(code){return rules[code]||{title:"未知错误码",severity:"low",likelyFields:["查看原始报告字段"],explanation:"规则库暂未覆盖这个错误码，请先依据原始错误信息定位字段。",fixSteps:["复制错误码和完整错误信息，在 Seller Central 帮助中心搜索。","检查报告中的 SKU、字段名、行号和原始上传文件。","如果同一错误影响多个 SKU，先用一个 SKU 做最小复现文件。","把最小复现文件和 Processing Report 一起提交给 Seller Support。"],sourceLabel:"Processing Report heuristic",sourceUrl:"",confidence:"needs-review",lastChecked:"2026-05-30"};}
const fieldKey=e=>String(e.attribute||rule(e.errorCode).likelyFields[0]||"未识别字段").trim()||"未识别字段";
function splitLine(line,delimiter){const cells=[];let cur="",q=false;for(let i=0;i<line.length;i++){const c=line[i],n=line[i+1];if(c==='"'&&q&&n==='"'){cur+='"';i++;continue;}if(c==='"'){q=!q;continue;}if(c===delimiter&&!q){cells.push(cur.trim());cur="";continue;}cur+=c;}cells.push(cur.trim());return cells;}
function delimiter(line){return ["\t",",",";","|"].map(d=>[d,splitLine(line,d).length]).sort((a,b)=>b[1]-a[1])[0][0];}
function headerScore(line){const d=delimiter(line);return splitLine(line,d).map(norm).reduce((s,c)=>s+(c.length>1&&allAliases.some(a=>c===a||c.includes(a)||a.includes(c))?1:0),0);}
function parseDelimited(text){if(text.length>2500000)throw new Error("文件内容过大，请先导出较小的 Processing Report 或只保留报错行后再试。");const lines=text.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n").filter(l=>l.trim());if(lines.length<2)throw new Error("报告至少需要包含表头和一行错误数据。");const headerIndex=lines.slice(0,30).map((line,index)=>({index,score:headerScore(line)})).sort((a,b)=>b.score-a.score||a.index-b.index)[0];const start=headerIndex.score>=2?headerIndex.index:0;const d=delimiter(lines[start]),headers=splitLine(lines[start],d),data=lines.slice(start+1);if(!data.length)throw new Error("识别到表头，但没有找到错误数据行。");return{headers,rows:data.map(line=>{const cells=splitLine(line,d);return headers.reduce((row,head,i)=>{row[head]=cells[i]||"";return row;},{});})};}
function findCol(headers,type){const normalized=headers.map(raw=>({raw,norm:norm(raw)})),keys=aliases[type].map(norm);return (normalized.find(h=>keys.includes(h.norm))||normalized.find(h=>keys.some(k=>h.norm.includes(k)||k.includes(h.norm)))||{}).raw||null;}
function toErrors(parsed){const c={sku:findCol(parsed.headers,"sku"),errorCode:findCol(parsed.headers,"errorCode"),message:findCol(parsed.headers,"message"),rowNumber:findCol(parsed.headers,"rowNumber"),attribute:findCol(parsed.headers,"attribute"),errorType:findCol(parsed.headers,"errorType")};if(!c.errorCode&&!c.message)throw new Error("没有识别到 error-code 或 error-message 字段，请确认文件是 Amazon Processing Report。");return parsed.rows.map((row,index)=>{const codeFromColumn=c.errorCode?normalizeCode(row[c.errorCode]):"UNKNOWN",codeFromMessage=c.message?normalizeCode(row[c.message]):"UNKNOWN",code=codeFromColumn!=="UNKNOWN"?codeFromColumn:codeFromMessage;return{sku:c.sku?row[c.sku]||"未识别 SKU":"未识别 SKU",rowNumber:c.rowNumber?row[c.rowNumber]||String(index+2):String(index+2),errorCode:code,errorType:c.errorType?row[c.errorType]:"",message:c.message?row[c.message]||"":"",attribute:c.attribute?row[c.attribute]||"":"",raw:row};}).filter(x=>x.errorCode!=="UNKNOWN"||x.message);}
const unique=a=>[...new Set(a.filter(Boolean))];
function group(items,getKey){return items.reduce((g,i)=>{const k=getKey(i)||"未识别";(g[k] ||= []).push(i);return g;},{});}
function diagnose(errors){const sev=errors.reduce((a,e)=>{a[rule(e.errorCode).severity]++;return a;},{high:0,medium:0,low:0});return{summary:{totalErrors:errors.length,affectedSkus:unique(errors.map(e=>e.sku)).length,affectedFields:unique(errors.map(fieldKey)).length,...sev},byCode:group(errors,e=>e.errorCode),bySku:group(errors,e=>e.sku),byRow:group(errors,e=>e.rowNumber),byField:group(errors,fieldKey)};}
const sevLabel=s=>({high:"高风险",medium:"中风险",low:"低风险"}[s]||"待确认");
function setActiveView(view){state.currentView=view;els.tabButtons.forEach(b=>{const active=b.dataset.view===view;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));});}
function toast(msg){els.toast.textContent=msg;els.toast.classList.add("show");setTimeout(()=>els.toast.classList.remove("show"),2400);}
function renderSummary(){const s=state.diagnosis.summary,cards=[["错误总数",s.totalErrors,"报告中识别到的错误行"],["影响 SKU",s.affectedSkus,"需要回到模板修复的商品"],["影响字段",s.affectedFields,"需要回到模板定位的列"],["高风险",s.high,"优先处理，会阻断上传"],["中低风险",s.medium+s.low,"格式、图片或待确认问题"]];els.summaryCards.innerHTML=cards.map(([l,v,t])=>`<article class="summary-card"><span>${l}</span><strong>${v}</strong><small>${t}</small></article>`).join("");}
function caseText(e,r){return`Subject: Help needed with Amazon flat file upload error ${e.errorCode||""}\n\nHello Amazon Seller Support,\n\nI received error ${e.errorCode||""} when uploading my inventory flat file.\n\nAffected SKU: ${e.sku||""}\nOriginal record number: ${e.rowNumber||""}\nAttribute: ${e.attribute||""}\nError message: ${e.message||""}\n\nI have checked the relevant fields, including ${r.likelyFields.join(", ")}.\nCould you please help confirm which catalog attribute or template requirement is causing this error?\n\nThank you.`;}
function card(title,subtitle,items,code){const r=rule(code||items[0]?.errorCode),skus=unique(items.map(i=>i.sku)),rows=unique(items.map(i=>i.rowNumber)),attrs=unique(items.map(i=>i.attribute)).slice(0,8),primary=items[0]||{};return`<article class="error-card"><div class="error-card-header"><div><h3>${h(title)}</h3><p>${h(subtitle)}</p></div><span class="severity ${h(r.severity)}">${sevLabel(r.severity)}</span></div><div class="error-body"><div class="fix-list"><h4>${h(r.title)}</h4><p>${h(r.explanation)}</p>${sourceLine(r)}<ol>${r.fixSteps.map(s=>`<li>${h(s)}</li>`).join("")}</ol></div><div class="affected-list"><h4>影响范围</h4><div class="pill-row">${skus.slice(0,12).map(s=>`<span class="pill">SKU ${h(s)}</span>`).join("")}</div><div class="pill-row">${rows.slice(0,12).map(r=>`<span class="pill">行 ${h(r)}</span>`).join("")}</div><div class="pill-row">${(attrs.length?attrs:r.likelyFields).map(f=>`<span class="pill">${h(f)}</span>`).join("")}</div><div class="case-box"><h4>Seller Support Case 话术</h4><textarea readonly>${h(caseText(primary,r))}</textarea></div></div></div></article>`;}
function renderErrors(){const view=state.currentView,d=state.diagnosis,groups=view==="sku"?d.bySku:view==="row"?d.byRow:view==="field"?d.byField:d.byCode,weight={high:3,medium:2,low:1};els.errorList.innerHTML=Object.entries(groups).sort((a,b)=>{const ar=rule(view==="code"?a[0]:a[1][0]?.errorCode),br=rule(view==="code"?b[0]:b[1][0]?.errorCode);return weight[br.severity]-weight[ar.severity]||b[1].length-a[1].length;}).map(([key,items])=>{if(view==="sku")return card(`SKU ${key}`,`包含 ${items.length} 条错误，错误码：${unique(items.map(i=>i.errorCode)).join(", ")}`,items,items[0]?.errorCode);if(view==="row"){const first=items[0];return card(`原始行号 ${key}`,`${first.sku} · Error ${first.errorCode}`,items,first.errorCode);}if(view==="field")return card(`字段 ${key}`,`包含 ${items.length} 条错误，错误码：${unique(items.map(i=>i.errorCode)).join(", ")}`,items,items[0]?.errorCode);const r=rule(key);return card(`Error ${key}`,`${r.title} · 影响 ${items.length} 行`,items,key);}).join("");}
function renderRules(){els.ruleGrid.innerHTML=Object.entries(rules).map(([code,r])=>`<article class="rule-card"><strong>Error ${h(code)}</strong><p>${h(r.title)}</p><small>${r.sourceUrl?`<a href="${h(r.sourceUrl)}" target="_blank" rel="noopener">${h(r.sourceLabel)}</a>`:h(r.sourceLabel)} · ${h(confidenceLabel(r.confidence))}</small></article>`).join("");}
function processText(text,fileName="示例报告"){const errors=toErrors(parseDelimited(text));if(!errors.length)throw new Error("没有识别到错误行。请确认报告中包含 error-code 或 error-message。");state.errors=errors;state.diagnosis=diagnose(errors);state.fileName=fileName;setActiveView("code");els.results.classList.remove("hidden");renderSummary();renderErrors();els.results.scrollIntoView({behavior:"smooth",block:"start"});toast(`已解析 ${errors.length} 条错误`);}
async function decodeFileText(file){const buffer=await file.arrayBuffer(),bytes=new Uint8Array(buffer),head=[...bytes.slice(0,1200)];if(bytes[0]===0xFF&&bytes[1]===0xFE)return new TextDecoder("utf-16le").decode(buffer);if(bytes[0]===0xFE&&bytes[1]===0xFF)return new TextDecoder("utf-16be").decode(buffer);const evenNull=head.filter((b,i)=>i%2===0&&b===0).length,oddNull=head.filter((b,i)=>i%2===1&&b===0).length;if(oddNull>20&&oddNull>evenNull*3)return new TextDecoder("utf-16le").decode(buffer);if(evenNull>20&&evenNull>oddNull*3)return new TextDecoder("utf-16be").decode(buffer);return new TextDecoder("utf-8").decode(buffer).replace(/^\uFEFF/,"");}
async function readFile(file){const ext=file.name.split(".").pop().toLowerCase();if(!supported.has(ext)){toast("第一版暂不支持该格式，请上传 .txt / .csv / .tsv");return;}if(file.size>2*1024*1024){toast("文件过大，请上传 2MB 以内的 Processing Report");return;}processText(await decodeFileText(file),file.name);}
function buildMarkdown(){if(!state.errors.length)return"";const lines=["# Amazon Flat File 错误修复清单","",`文件：${state.fileName}`,`错误总数：${state.diagnosis.summary.totalErrors}`,`影响 SKU：${state.diagnosis.summary.affectedSkus}`,`影响字段：${state.diagnosis.summary.affectedFields}`,""];Object.entries(state.diagnosis.byCode).forEach(([code,items])=>{const r=rule(code);lines.push(`## Error ${code} ${r.title}`,`严重程度：${sevLabel(r.severity)}`,`规则来源：${r.sourceLabel} / ${confidenceLabel(r.confidence)} / checked ${r.lastChecked}`,`影响 SKU：${unique(items.map(i=>i.sku)).join(", ")}`,`建议检查字段：${r.likelyFields.join(", ")}`);r.fixSteps.forEach((s,i)=>lines.push(`${i+1}. ${s}`));lines.push("");});return lines.join("\n");}
function fileSlug(name){const raw=String(name||"report").replace(/\.[^.]+$/,"").trim();if(!raw||raw==="示例报告")return"sample-report";const slug=raw.normalize("NFKD").replace(/[^a-zA-Z0-9_\s-]/g,"").trim().toLowerCase().replace(/[\s_]+/g,"-").replace(/-+/g,"-").slice(0,50);return slug||"report";}
function downloadCsv(){if(!state.errors.length)return;const rows=[["sku","rowNumber","errorCode","severity","attribute","message","recommendedFields","ruleSource","confidence"],...state.errors.map(i=>{const r=rule(i.errorCode);return[i.sku,i.rowNumber,i.errorCode,sevLabel(r.severity),i.attribute,i.message,r.likelyFields.join(" | "),r.sourceLabel,confidenceLabel(r.confidence)];})];const csv=rows.map(row=>row.map(cell=>`"${String(cell||"").replace(/"/g,'""')}"`).join(",")).join("\n"),url=URL.createObjectURL(new Blob([`\uFEFF${csv}`],{type:"text/csv;charset=utf-8"})),a=document.createElement("a");a.href=url;a.download=`amazon-flat-file-fix-list-${fileSlug(state.fileName)}-${new Date().toISOString().slice(0,10)}.csv`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function clearAll(){state.errors=[];state.diagnosis=null;state.fileName="";els.fileInput.value="";els.results.classList.add("hidden");els.errorList.innerHTML="";els.summaryCards.innerHTML="";toast("已清空");}
function copyText(text){const fallback=()=>{const t=document.createElement("textarea");t.value=text;t.readOnly=true;t.style.position="fixed";t.style.left="-9999px";document.body.appendChild(t);t.select();const ok=document.execCommand("copy");t.remove();if(!ok)throw new Error("复制失败，请手动选择结果文本复制。");};return navigator.clipboard?.writeText?navigator.clipboard.writeText(text).catch(fallback):Promise.resolve(fallback());}
els.chooseFile.addEventListener("click",e=>{e.stopPropagation();els.fileInput.click();});
els.dropzone.addEventListener("click",e=>{if(e.target!==els.fileInput)els.fileInput.click();});
els.fileInput.addEventListener("change",e=>{const f=e.target.files?.[0];if(f)readFile(f).catch(err=>toast(err.message));});
["dragenter","dragover"].forEach(n=>els.dropzone.addEventListener(n,e=>{e.preventDefault();els.dropzone.classList.add("dragover");}));
["dragleave","drop"].forEach(n=>els.dropzone.addEventListener(n,e=>{e.preventDefault();els.dropzone.classList.remove("dragover");}));
els.dropzone.addEventListener("drop",e=>{const f=e.dataTransfer.files?.[0];if(f)readFile(f).catch(err=>toast(err.message));});
els.dropzone.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();els.fileInput.click();}});
els.loadSample.addEventListener("click",()=>processText(sampleReport,"sample-processing-report.tsv"));
els.clearAll.addEventListener("click",clearAll);
els.tabButtons.forEach(b=>b.addEventListener("click",()=>{setActiveView(b.dataset.view);renderErrors();}));
els.copyMarkdown.addEventListener("click",async()=>{const text=buildMarkdown();if(!text)return;try{await copyText(text);toast("修复清单已复制");}catch(err){toast(err.message);}});
els.downloadCsv.addEventListener("click",downloadCsv);
setActiveView(state.currentView);renderRules();
