const aliases={sku:["sku","seller-sku","seller sku","商家sku","卖家sku"],errorCode:["error-code","error code","errorcode","错误代码","错误码"],message:["error-message","error message","message","错误信息","错误描述","原因"],rowNumber:["original-record-number","record number","row number","line number","行号","原始行号"],attribute:["attribute-name","attribute name","field-name","field name","字段","属性"],errorType:["error-type","error type","type","错误类型"]};
const flatAliases={sku:["sku","seller-sku","seller sku","item_sku"],parentage:["parentage","parent_child","parent-child","parent child"],parentSku:["parent_sku","parent sku","parent-sku"],relationshipType:["relationship_type","relationship type","relationship-type"],variationTheme:["variation_theme","variation theme","variation-theme"],color:["color_name","color","colour","color map","颜色"],size:["size_name","size","尺寸"],style:["style_name","style","样式"],material:["material_type","material","材质"],productType:["product_type","product type","feed_product_type","item_type_keyword"],brand:["brand_name","brand","品牌"],itemName:["item_name","title","product name","商品名称"],updateDelete:["update_delete","update delete","update-delete"],price:["standard_price","price","list_price","your price"],quantity:["quantity","afn-fulfillable-quantity","mfn-fulfillable-quantity"],fulfillmentLatency:["fulfillment_latency","leadtime-to-ship","handling_time"],itemPackageQuantity:["item_package_quantity","item package quantity"],unitCount:["unit_count","unit count"],unitCountType:["unit_count_type","unit count type"]};
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
const sampleFlatFile=`sku\tparentage\tparent_sku\trelationship_type\tvariation_theme\tcolor_name\tsize_name\tstyle_name\tmaterial_type\titem_package_quantity\tstandard_price\tquantity\tupdate_delete\nPARENT-TEE\tparent\t\t\t\t\t\tClassic\tCotton\t1\t\t\tUpdate\nSKU-RED-001\tchild\tPARENT-TEE\tVariation\tSizeColor\tRed\tS\tClassic\tCotton\t1\t19.99\t20\tUpdate\nSKU-BLUE-003\tchild\tPARENT-TEE\t\t\tBlue\tM\tClassic\tCotton\t1\t19.99\t15\tUpdate\nSKU-GREEN-004\tchild\tPARENT-TEE\tVariation\t\tGreen\t\tClassic\tCotton\t1\t19.99\t8\tUpdate\nSKU-ORPHAN-005\tchild\t\tVariation\tSizeColor\tBlack\tL\tClassic\tCotton\t1\t19.99\t6\tUpdate\nSKU-MISSING-PARENT\tchild\tPARENT-MISSING\tVariation\tSizeColor\tWhite\tXL\tClassic\tCotton\t1\t19.99\t5\tUpdate\nSKU-DUP-001\tchild\tPARENT-TEE\tVariation\tSizeColor\tRed\tXL\tClassic\tCotton\t1\t19.99\t4\tUpdate\nSKU-DUP-001\tchild\tPARENT-TEE\tVariation\tSizeColor\tRed\tXL\tClassic\tCotton\t1\t19.99\t4\tUpdate\nPARENT-SELLABLE\tparent\t\t\tSizeColor\t\t\tSport\tPolyester\t1\t12.99\t3\tUpdate\nSKU-SELLABLE-CHILD\tchild\tPARENT-SELLABLE\tVariation\tSizeColor\tYellow\tM\tSport\tPolyester\t1\t12.99\t3\tUpdate`;
const state={errors:[],diagnosis:null,currentView:"code",fileName:"",flatFileName:"",variation:null};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const els={fileInput:$("#fileInput"),chooseFile:$("#chooseFile"),dropzone:$("#dropzone"),flatFileInput:$("#flatFileInput"),chooseFlatFile:$("#chooseFlatFile"),flatFileStatus:$("#flatFileStatus"),loadSample:$("#loadSample"),loadSampleFlatFile:$("#loadSampleFlatFile"),clearAll:$("#clearAll"),results:$("#results"),summaryCards:$("#summaryCards"),fixabilityPanel:$("#fixabilityPanel"),variationPanel:$("#variationPanel"),errorList:$("#errorList"),tabButtons:$$(".tab-button"),copyMarkdown:$("#copyMarkdown"),downloadCsv:$("#downloadCsv"),ruleGrid:$("#ruleGrid"),toast:$("#toast")};
const h=v=>String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
function trackEvent(name,props={}){const payload={tool:"amazon_flat_file_diagnoser",...props};try{if(window.va?.track)window.va.track(name,payload);if(window.gtag)window.gtag("event",name,payload);window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:name,...payload});}catch(_){}}
const confidenceLabel=v=>({official:"官方来源","official-regional":"官方来源（区域站点）","needs-review":"待人工确认"}[v]||"待确认");
const sourceLine=r=>r.sourceUrl?`<p class="rule-source">规则来源：<a href="${h(r.sourceUrl)}" target="_blank" rel="noopener">${h(r.sourceLabel)}</a> · ${h(confidenceLabel(r.confidence))} · checked ${h(r.lastChecked)}</p>`:`<p class="rule-source">规则来源：${h(r.sourceLabel)} · ${h(confidenceLabel(r.confidence))} · 请以当前 Seller Central Processing Report 和分类模板最终确认。</p>`;
const norm=v=>String(v||"").trim().toLowerCase().replace(/\uFEFF/g,"").replace(/[_\s]+/g," ").replace(/\s*-\s*/g,"-");
const normalizeCode=value=>String(value||"").match(/\b\d{4,5}\b/)?.[0]||"UNKNOWN";
const allAliases=[...Object.values(aliases).flat(),...Object.values(flatAliases).flat()].map(norm), supported=new Set(["txt","csv","tsv"]);
function rule(code){return rules[code]||{title:"未知错误码",severity:"low",likelyFields:["查看原始报告字段"],explanation:"规则库暂未覆盖这个错误码，请先依据原始错误信息定位字段。",fixSteps:["复制错误码和完整错误信息，在 Seller Central 帮助中心搜索。","检查报告中的 SKU、字段名、行号和原始上传文件。","如果同一错误影响多个 SKU，先用一个 SKU 做最小复现文件。","把最小复现文件和 Processing Report 一起提交给 Seller Support。"],sourceLabel:"Processing Report heuristic",sourceUrl:"",confidence:"needs-review",lastChecked:"2026-05-30"};}
const fieldKey=e=>String(e.attribute||rule(e.errorCode).likelyFields[0]||"未识别字段").trim()||"未识别字段";
function splitLine(line,delimiter){const cells=[];let cur="",q=false;for(let i=0;i<line.length;i++){const c=line[i],n=line[i+1];if(c==='"'&&q&&n==='"'){cur+='"';i++;continue;}if(c==='"'){q=!q;continue;}if(c===delimiter&&!q){cells.push(cur.trim());cur="";continue;}cur+=c;}cells.push(cur.trim());return cells;}
function delimiter(line){return ["\t",",",";","|"].map(d=>[d,splitLine(line,d).length]).sort((a,b)=>b[1]-a[1])[0][0];}
function headerScore(line){const d=delimiter(line);return splitLine(line,d).map(norm).reduce((s,c)=>s+(c.length>1&&allAliases.some(a=>c===a||c.includes(a)||a.includes(c))?1:0),0);}
function parseDelimited(text){if(text.length>5000000)throw new Error("文件内容过大，请先导出较小的报告或 flat file 后再试。");const lines=text.replace(/\r\n/g,"\n").replace(/\r/g,"\n").split("\n").filter(l=>l.trim());if(lines.length<2)throw new Error("报告至少需要包含表头和一行错误数据。");const headerIndex=lines.slice(0,30).map((line,index)=>({index,score:headerScore(line)})).sort((a,b)=>b.score-a.score||a.index-b.index)[0];const start=headerIndex.score>=2?headerIndex.index:0;const d=delimiter(lines[start]),headers=splitLine(lines[start],d),data=lines.slice(start+1);if(!data.length)throw new Error("识别到表头，但没有找到错误数据行。");return{headers,delimiter:d,rows:data.map(line=>{const cells=splitLine(line,d);return headers.reduce((row,head,i)=>{row[head]=cells[i]||"";return row;},{});})};}
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

const variationSignalCodes=new Set(["8008","8036","8058","90244","99010"]);
function fixabilityFor(code,attr="",message=""){const text=`${code} ${attr} ${message}`.toLowerCase();if(code==="8541")return{label:"Needs catalog review",detail:"可能涉及 ASIN/catalog contribution、品牌或商品编码冲突。先整理证据，不能承诺只靠文件修复。",cta:"Prepare Seller Support case"};if(code==="90244"||code==="8036")return{label:"Needs variation triage",detail:"这类错误常和 variation_theme、size/color/style valid values 或父子体关系有关。建议补充 flat file 做结构分诊。",cta:"Upload flat file for variation triage"};if(code==="8008")return{label:"Likely file-fixable",detail:"通常需要检查 child SKU 是否已创建、parent_sku 是否拼写一致、relationship_type 和 parentage 是否完整。",cta:"Check parent-child structure"};if(code==="8058"||code==="99010")return text.match(/variation|parent|child|size|color|colour|style|theme|material/)?{label:"Needs variation triage",detail:"错误字段可能属于变体属性或必填字段组。补充 flat file 后可以判断是缺字段、枚举值错误还是 theme mismatch。",cta:"Upload flat file for variation triage"}:{label:"File-fixable",detail:"多数为模板字段缺失、值无效或格式不匹配，可先按字段回到 flat file 修复。",cta:"Copy fix checklist"};if(code==="8560"||code==="13013")return{label:"Check upload sequence",detail:"可能是 SKU 创建、删除状态或更新顺序问题。先确认 SKU 是否存在，再决定是否重建或分批上传。",cta:"Review SKU sequence"};if(code==="20000"||code==="90112")return{label:"Low-risk formatting",detail:"多为 URL、枚举值、长度或格式问题，通常适合批量清洗后重传。",cta:"Copy fix checklist"};return{label:"Needs review",detail:"先按 Processing Report 错误字段定位，再根据是否涉及 catalog/variation 决定是否需要人工。",cta:"Review affected fields"};}
function fixabilityBox(items,r){const first=items[0]||{},f=fixabilityFor(first.errorCode||"",first.attribute||"",first.message||"");return`<div class="fixability-box"><strong>${h(f.label)}</strong><span>${h(f.detail)}</span><span>Next step: ${h(f.cta)}</span></div>`;}
function renderFixabilityPanel(){if(!els.fixabilityPanel)return;const errors=state.errors||[];if(!errors.length){els.fixabilityPanel.classList.add("hidden");els.fixabilityPanel.innerHTML="";return;}const buckets=errors.reduce((acc,e)=>{const f=fixabilityFor(e.errorCode,e.attribute,e.message);acc[f.label]=(acc[f.label]||0)+1;return acc;},{}),variationCount=errors.filter(e=>variationSignalCodes.has(e.errorCode)||`${e.attribute} ${e.message}`.toLowerCase().match(/variation|parent|child|size|color|colour|style|theme|material/)).length,catalogCount=errors.filter(e=>e.errorCode==="8541").length;els.fixabilityPanel.classList.remove("hidden");els.fixabilityPanel.innerHTML=`<h3>Fixability triage</h3><p>先把错误分成文件可修、需要 flat file 结构分诊、需要人工 catalog 判断、可能需要 Seller Support 的几类，避免直接承诺“全自动修复”。</p><div class="triage-grid">${Object.entries(buckets).map(([k,v])=>`<div class="triage-card"><span>${h(k)}</span><strong>${v}</strong></div>`).join("")}<div class="triage-card"><span>Variation signals</span><strong>${variationCount}</strong></div><div class="triage-card"><span>Catalog conflict signals</span><strong>${catalogCount}</strong></div></div><div class="article-cta"><a class="secondary-link" href="/amazon-variation-triage" data-track="variation_triage_clicked" data-source="fixability-panel">Read variation triage flow</a><a class="primary-link" href="/contact?intent=manual-review&source=fixability-panel" data-track="manual_review_clicked" data-intent="manual-review" data-source="fixability-panel">Request manual review</a></div>`;}
function card(title,subtitle,items,code){const r=rule(code||items[0]?.errorCode),skus=unique(items.map(i=>i.sku)),rows=unique(items.map(i=>i.rowNumber)),attrs=unique(items.map(i=>i.attribute)).slice(0,8),primary=items[0]||{};return`<article class="error-card"><div class="error-card-header"><div><h3>${h(title)}</h3><p>${h(subtitle)}</p></div><span class="severity ${h(r.severity)}">${sevLabel(r.severity)}</span></div><div class="error-body"><div class="fix-list"><h4>${h(r.title)}</h4><p>${h(r.explanation)}</p>${sourceLine(r)}${fixabilityBox(items,r)}<ol>${r.fixSteps.map(s=>`<li>${h(s)}</li>`).join("")}</ol></div><div class="affected-list"><h4>影响范围</h4><div class="pill-row">${skus.slice(0,12).map(s=>`<span class="pill">SKU ${h(s)}</span>`).join("")}</div><div class="pill-row">${rows.slice(0,12).map(r=>`<span class="pill">行 ${h(r)}</span>`).join("")}</div><div class="pill-row">${(attrs.length?attrs:r.likelyFields).map(f=>`<span class="pill">${h(f)}</span>`).join("")}</div><div class="case-box"><h4>Seller Support Case 话术</h4><textarea readonly>${h(caseText(primary,r))}</textarea></div></div></div></article>`;}
function renderErrors(){const view=state.currentView,d=state.diagnosis,groups=view==="sku"?d.bySku:view==="row"?d.byRow:view==="field"?d.byField:d.byCode,weight={high:3,medium:2,low:1};els.errorList.innerHTML=Object.entries(groups).sort((a,b)=>{const ar=rule(view==="code"?a[0]:a[1][0]?.errorCode),br=rule(view==="code"?b[0]:b[1][0]?.errorCode);return weight[br.severity]-weight[ar.severity]||b[1].length-a[1].length;}).map(([key,items])=>{if(view==="sku")return card(`SKU ${key}`,`包含 ${items.length} 条错误，错误码：${unique(items.map(i=>i.errorCode)).join(", ")}`,items,items[0]?.errorCode);if(view==="row"){const first=items[0];return card(`原始行号 ${key}`,`${first.sku} · Error ${first.errorCode}`,items,first.errorCode);}if(view==="field")return card(`字段 ${key}`,`包含 ${items.length} 条错误，错误码：${unique(items.map(i=>i.errorCode)).join(", ")}`,items,items[0]?.errorCode);const r=rule(key);return card(`Error ${key}`,`${r.title} · 影响 ${items.length} 行`,items,key);}).join("");}
function renderRules(){els.ruleGrid.innerHTML=Object.entries(rules).map(([code,r])=>`<article class="rule-card"><strong>Error ${h(code)}</strong><p>${h(r.title)}</p><small>${r.sourceUrl?`<a href="${h(r.sourceUrl)}" target="_blank" rel="noopener">${h(r.sourceLabel)}</a>`:h(r.sourceLabel)} · ${h(confidenceLabel(r.confidence))}</small></article>`).join("");}

function flatFindCol(headers,type){const normalized=headers.map(raw=>({raw,norm:norm(raw)})),keys=(flatAliases[type]||[]).map(norm),exact=normalized.find(h=>keys.includes(h.norm));if(exact)return exact.raw;const strictTypes=new Set(["quantity","fulfillmentLatency","itemPackageQuantity","unitCount","unitCountType","price"]);if(strictTypes.has(type))return null;return (normalized.find(h=>keys.some(k=>{if(k.length<4)return false;return h.norm===k||h.norm.startsWith(`${k} `)||h.norm.endsWith(` ${k}`)||h.norm.includes(` ${k} `)||k.includes(` ${h.norm} `);} ))||{}).raw||null;}
function flatCell(row,cols,type){const col=cols[type];return col?String(row[col]||"").trim():"";}
function familyTheme(parent,items){return unique([parent?.variationTheme,...items.map(i=>i.variationTheme)].filter(Boolean));}
function buildRepairPlan({cols,parents,children,families,duplicateSkuSet=new Set()}){const parentBySku=new Map(parents.map(r=>[r.sku,r])),plan=[];
  const familyThemes=(parentSku)=>familyTheme(parentBySku.get(parentSku),families[parentSku]||[]);
  const hasResolvableParent=child=>child.sku&&!duplicateSkuSet.has(child.sku)&&child.parentSku&&parentBySku.has(child.parentSku)&&!duplicateSkuSet.has(child.parentSku);
  const isSafeThemeChild=child=>hasResolvableParent(child)&&familyThemes(child.parentSku).length===1;
  const isSafeParent=parent=>parent.sku&&!duplicateSkuSet.has(parent.sku)&&(families[parent.sku]||[]).length>0&&familyTheme(parent,families[parent.sku]||[]).length===1;
  children.forEach(child=>{
    if(cols.relationshipType&&!child.relationshipType&&hasResolvableParent(child)){plan.push({rowIndex:child.index,sku:child.sku,column:cols.relationshipType,from:"",to:"Variation",reason:"Child row is missing relationship_type and references a present, non-duplicate parent SKU",confidence:"safe"});}
    const themes=child.parentSku?familyThemes(child.parentSku):[];
    if(cols.variationTheme&&!child.variationTheme&&isSafeThemeChild(child)){plan.push({rowIndex:child.index,sku:child.sku,column:cols.variationTheme,from:"",to:themes[0],reason:"Fill missing variation_theme from the same present, non-duplicate parent family",confidence:"safe"});}
  });
  parents.forEach(parent=>{
    if(!isSafeParent(parent))return;
    const themes=familyTheme(parent,families[parent.sku]||[]);
    if(cols.variationTheme&&!parent.variationTheme&&themes.length===1){plan.push({rowIndex:parent.index,sku:parent.sku,column:cols.variationTheme,from:"",to:themes[0],reason:"Fill missing parent variation_theme from child rows in a present, non-duplicate family",confidence:"safe"});}
  });
  return plan;}
function missingAttrsForRow(r){const theme=String(r.variationTheme||"").toLowerCase(),missing=[];if(theme.includes("size")&&!r.size)missing.push("size");if((theme.includes("color")||theme.includes("colour"))&&!r.color)missing.push("color");if(theme.includes("style")&&!r.style)missing.push("style");if(theme.includes("material")&&!r.material)missing.push("material");if(theme.includes("count")){if(!r.unitCount)missing.push("unit_count");if(!r.unitCountType)missing.push("unit_count_type");}return missing;}
function manualReviewItem({sku="",rowIndex="",issue="",column="",reason="",parentSku="",fixability="Manual review"}){return{sku,rowIndex,issue,column,reason,parentSku,fixability};}
function analyzeVariationFlatFile(parsed){const cols=Object.fromEntries(Object.keys(flatAliases).map(k=>[k,flatFindCol(parsed.headers,k)])),rows=parsed.rows.map((row,index)=>({index:index+2,row,sku:flatCell(row,cols,"sku"),parentage:flatCell(row,cols,"parentage").toLowerCase(),parentSku:flatCell(row,cols,"parentSku"),relationshipType:flatCell(row,cols,"relationshipType").toLowerCase(),variationTheme:flatCell(row,cols,"variationTheme"),color:flatCell(row,cols,"color"),size:flatCell(row,cols,"size"),style:flatCell(row,cols,"style"),material:flatCell(row,cols,"material"),unitCount:flatCell(row,cols,"unitCount"),unitCountType:flatCell(row,cols,"unitCountType"),price:flatCell(row,cols,"price"),quantity:flatCell(row,cols,"quantity")})).filter(r=>r.sku||r.parentSku||r.parentage),skuSet=new Set(rows.map(r=>r.sku).filter(Boolean)),parents=rows.filter(r=>r.parentage==="parent"),children=rows.filter(r=>r.parentage==="child"),orphanChildren=children.filter(r=>!r.parentSku),missingParents=children.filter(r=>r.parentSku&&!skuSet.has(r.parentSku)),duplicateSkus=Object.entries(group(rows.filter(r=>r.sku),r=>r.sku)).filter(([,items])=>items.length>1),families=group(children.filter(r=>r.parentSku),r=>r.parentSku),themeMismatch=Object.entries(families).filter(([,items])=>unique(items.map(i=>i.variationTheme)).length>1),missingTheme=rows.filter(r=>(r.parentage==="parent"||r.parentage==="child")&&!r.variationTheme),missingRelationship=children.filter(r=>!r.relationshipType),parentSellableFields=parents.filter(r=>r.price||r.quantity),missingVariationAttrs=children.filter(r=>missingAttrsForRow(r).length),reportSkuSet=new Set((state.errors||[]).map(e=>e.sku).filter(s=>s&&s!=="未识别 SKU")),matchedReportSkus=rows.filter(r=>reportSkuSet.has(r.sku)).length,issues=[];if(orphanChildren.length)issues.push(["Child rows missing parent_sku",orphanChildren.length,"Manual inference"]);if(missingParents.length)issues.push(["parent_sku points to missing SKU",missingParents.length,"Manual review"]);if(themeMismatch.length)issues.push(["Variation theme mismatch inside family",themeMismatch.length,"Needs review"]);if(missingTheme.length)issues.push(["Missing variation_theme",missingTheme.length,"Potentially file-fixable"]);if(missingRelationship.length)issues.push(["Child rows missing relationship_type",missingRelationship.length,"File-fixable"]);if(missingVariationAttrs.length)issues.push(["Missing size/color/style/material fields",missingVariationAttrs.length,"Manual data needed"]);if(parentSellableFields.length)issues.push(["Parent rows contain price or quantity",parentSellableFields.length,"Review before clearing"]);if(duplicateSkus.length)issues.push(["Duplicate SKU rows",duplicateSkus.length,"Review"]);const duplicateSkuSet=new Set(duplicateSkus.map(([sku])=>sku)),repairPlan=buildRepairPlan({cols,parents,children,families,duplicateSkuSet}),safeFixKeys=new Set(repairPlan.map(i=>`${i.rowIndex}::${i.column}`)),manualReviewRows=[];orphanChildren.forEach(r=>manualReviewRows.push(manualReviewItem({sku:r.sku,rowIndex:r.index,parentSku:r.parentSku,issue:"Child row missing parent_sku",column:cols.parentSku||"parent_sku",reason:"The checker cannot infer the correct parent SKU without source catalog intent."})));missingParents.forEach(r=>manualReviewRows.push(manualReviewItem({sku:r.sku,rowIndex:r.index,parentSku:r.parentSku,issue:"parent_sku points to missing SKU",column:cols.parentSku||"parent_sku",reason:"The referenced parent SKU is not present in this flat file. Confirm upload order or add the parent row before re-upload."})));themeMismatch.forEach(([parentSku,items])=>manualReviewRows.push(manualReviewItem({sku:parentSku,rowIndex:"family",parentSku,issue:"Variation theme mismatch inside family",column:cols.variationTheme||"variation_theme",reason:`Themes detected under this parent: ${unique(items.map(i=>i.variationTheme)).join(" | ")}. Choose the correct theme before repair.`})));missingTheme.forEach(r=>{const key=`${r.index}::${cols.variationTheme}`;if(cols.variationTheme&&!safeFixKeys.has(key))manualReviewRows.push(manualReviewItem({sku:r.sku,rowIndex:r.index,parentSku:r.parentSku,issue:"Missing variation_theme not safely inferable",column:cols.variationTheme,reason:"No single non-empty theme was found in the same family, so this field cannot be filled safely."}));});missingVariationAttrs.forEach(r=>manualReviewRows.push(manualReviewItem({sku:r.sku,rowIndex:r.index,parentSku:r.parentSku,issue:"Missing variation attribute value",column:missingAttrsForRow(r).join(" | "),reason:"Required variation attribute values must come from product source data. The checker will not invent size, color, style, material, or unit count values."})));parentSellableFields.forEach(r=>manualReviewRows.push(manualReviewItem({sku:r.sku,rowIndex:r.index,issue:"Parent row contains sellable fields",column:[r.price&&cols.price,r.quantity&&cols.quantity].filter(Boolean).join(" | "),reason:"Parent rows often should not carry sellable price or quantity, but clearing these fields can change catalog behavior. Review before editing."})));duplicateSkus.forEach(([sku,items])=>items.forEach(r=>manualReviewRows.push(manualReviewItem({sku,rowIndex:r.index,parentSku:r.parentSku,issue:"Duplicate SKU row",column:cols.sku||"sku",reason:"Duplicate SKU rows can overwrite or conflict with each other. Confirm which row should be kept before repair."}))));return{parsed,cols,rows,parents,children,families,orphanChildren,missingParents,duplicateSkus,themeMismatch,missingTheme,missingRelationship,parentSellableFields,missingVariationAttrs,matchedReportSkus,issues,repairPlan,manualReviewRows};}
function repairPlanRows(plan){if(!plan.length)return"";return plan.slice(0,30).map(item=>`<tr><td>${h(item.sku||"Unknown SKU")}</td><td>Row ${h(item.rowIndex)}</td><td>${h(item.column)}</td><td>${h(item.from||"blank")}</td><td>${h(item.to)}</td><td>${h(item.reason)}</td></tr>`).join("");}
function manualReviewRows(rows){if(!rows.length)return"";return rows.slice(0,30).map(item=>`<tr><td>${h(item.sku||"Family")}</td><td>${item.rowIndex==="family"?"Family":`Row ${h(item.rowIndex)}`}</td><td>${h(item.issue)}</td><td>${h(item.column||"-")}</td><td>${h(item.reason)}</td></tr>`).join("");}
function renderRepairDraft(v){const repairCount=v.repairPlan?.length||0,manualCount=v.manualReviewRows?.length||0,repairTable=repairCount?`<div class="table-wrap"><table class="article-table"><thead><tr><th>SKU</th><th>Row</th><th>Column</th><th>Before</th><th>After</th><th>Reason</th></tr></thead><tbody>${repairPlanRows(v.repairPlan)}</tbody></table></div>${repairCount>30?`<p class="rule-source">Showing first 30 of ${repairCount} safe draft edits. The downloaded draft includes all safe edits.</p>`:""}<button type="button" class="primary-button" id="downloadRepairedFlatFile" data-track="repaired_file_downloaded" data-source="variation-panel">Download repaired flat file draft</button>`:`<div class="muted-box"><strong>No safe auto-repair draft yet.</strong><span>The checker found no low-risk field fills that can be generated from this file alone.</span></div>`,manualTable=manualCount?`<div class="table-wrap"><table class="article-table"><thead><tr><th>SKU / Family</th><th>Row</th><th>Issue</th><th>Column</th><th>Why manual</th></tr></thead><tbody>${manualReviewRows(v.manualReviewRows)}</tbody></table></div>${manualCount>30?`<p class="rule-source">Showing first 30 of ${manualCount} manual-review rows. The CSV export includes all rows.</p>`:""}<button type="button" class="secondary-button" id="downloadManualReviewCsv" data-track="manual_review_csv_downloaded" data-source="variation-panel">Download manual-review-needed CSV</button>`:`<div class="muted-box"><strong>No manual-review rows flagged.</strong><span>This does not guarantee Amazon will accept the upload; it only means this file scan did not find the supported manual-review signals.</span></div>`;return`<div class="repair-draft"><h4>Repair preview and manual-review split</h4><p>The draft only fills low-risk blank fields inferred from this same file. It does not infer parent_sku, invent size/color/style values, clear parent price/quantity, resolve duplicate SKU rows, or fix catalog ownership conflicts.</p><h5>Safe draft edits</h5>${repairTable}<h5>Manual review needed</h5>${manualTable}</div>`;}
function renderVariationPanel(){if(!els.variationPanel)return;const v=state.variation;if(!v){els.variationPanel.classList.add("hidden");els.variationPanel.innerHTML="";return;}els.variationPanel.classList.remove("hidden");const familyCount=Object.keys(v.families).length,manualCount=v.manualReviewRows?.length||0,issueRows=v.issues.length?v.issues.map(([name,count,fix])=>`<tr><td>${h(name)}</td><td>${count}</td><td>${h(fix)}</td></tr>`).join(""):`<tr><td colspan="3">No obvious parent-child structure issue detected in the uploaded flat file.</td></tr>`;els.variationPanel.innerHTML=`<h3>Variation family map</h3><p>Flat file: ${h(state.flatFileName)}. This first version checks structure only; it does not upload to Amazon or guarantee catalog-level repair.</p><div class="triage-grid"><div class="triage-card"><span>Parent rows</span><strong>${v.parents.length}</strong></div><div class="triage-card"><span>Child rows</span><strong>${v.children.length}</strong></div><div class="triage-card"><span>Families</span><strong>${familyCount}</strong></div><div class="triage-card"><span>Matched report SKUs</span><strong>${v.matchedReportSkus}</strong></div><div class="triage-card"><span>Safe draft fixes</span><strong>${v.repairPlan.length}</strong></div><div class="triage-card"><span>Manual-review rows</span><strong>${manualCount}</strong></div></div><div class="table-wrap"><table class="article-table"><thead><tr><th>Issue</th><th>Count</th><th>Fixability</th></tr></thead><tbody>${issueRows}</tbody></table></div>${renderRepairDraft(v)}<div class="article-cta"><a class="primary-link" href="/contact?intent=repaired-flat-file&source=variation-panel" data-track="repaired_file_clicked" data-intent="repaired-flat-file" data-source="variation-panel">Request repaired flat file</a><a class="secondary-link" href="/amazon-variation-triage" data-track="variation_triage_clicked" data-source="variation-panel">How triage works</a></div>`;}
function csvCell(value){return`"${String(value??"").replace(/"/g,'""')}"`;}
function manualReviewCsvText(){const v=state.variation;if(!v?.manualReviewRows?.length)return"";const rows=[["sku","row","parent_sku","issue","column","fixability","reason"],...v.manualReviewRows.map(i=>[i.sku,i.rowIndex,i.parentSku,i.issue,i.column,i.fixability,i.reason])];return rows.map(row=>row.map(csvCell).join(",")).join("\n");}
function downloadManualReviewCsv(){const text=manualReviewCsvText();if(!text){toast("没有需要导出的人工复核行");return;}const base=fileSlug(state.flatFileName||"flat-file"),url=URL.createObjectURL(new Blob([`\uFEFF${text}`],{type:"text/csv;charset=utf-8"})),a=document.createElement("a");a.href=url;a.download=`amazon-manual-review-needed-${base}-${new Date().toISOString().slice(0,10)}.csv`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);trackEvent("manual_review_needed_csv_downloaded",{row_count:state.variation.manualReviewRows.length});}
function escapeDelimitedCell(value,d){const text=String(value??"");return text.includes(d)||text.includes('"')||text.includes("\n")?`"${text.replace(/"/g,'""')}"`:text;}
function serializeDelimited(headers,rows,d){return [headers.map(v=>escapeDelimitedCell(v,d)).join(d),...rows.map(row=>headers.map(head=>escapeDelimitedCell(row[head]||"",d)).join(d))].join("\n");}
function repairedFlatFileText(){const v=state.variation;if(!v?.repairPlan?.length)return"";const headers=[...v.parsed.headers],rows=v.parsed.rows.map(row=>({...row}));v.repairPlan.forEach(item=>{const row=rows[item.rowIndex-2];if(row&&item.column&&Object.prototype.hasOwnProperty.call(row,item.column))row[item.column]=item.to;});return serializeDelimited(headers,rows,v.parsed.delimiter||"\t");}
function downloadRepairedFlatFile(){const text=repairedFlatFileText();if(!text){toast("没有可自动生成的低风险修复草稿");return;}const ext=(state.flatFileName.split(".").pop()||"tsv").toLowerCase(),base=fileSlug(state.flatFileName||"flat-file"),mime=ext==="csv"?"text/csv;charset=utf-8":"text/tab-separated-values;charset=utf-8",url=URL.createObjectURL(new Blob([`\uFEFF${text}`],{type:mime})),a=document.createElement("a");a.href=url;a.download=`amazon-repaired-draft-${base}-${new Date().toISOString().slice(0,10)}.${ext}`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);trackEvent("repaired_flat_file_draft_downloaded",{fix_count:state.variation.repairPlan.length,file_extension:ext});}
function processVariationText(text,fileName){const parsed=parseDelimited(text),variation=analyzeVariationFlatFile(parsed);els.results.classList.remove("hidden");renderFixabilityPanel();state.variation=variation;state.flatFileName=fileName;renderVariationPanel();if(els.flatFileStatus)els.flatFileStatus.textContent=`已解析 ${fileName}：${variation.parents.length} 个 parent、${variation.children.length} 个 child、${variation.issues.length} 类结构信号、${variation.repairPlan.length} 个安全草稿修复、${variation.manualReviewRows.length} 行需要人工复核。`;toast(`已解析 flat file：${variation.rows.length} 行`);}
async function readFlatFile(file){const ext=file.name.split(".").pop().toLowerCase();if(!supported.has(ext)){toast("第一版暂不支持该格式，请上传 .txt / .csv / .tsv flat file");return;}if(file.size>4*1024*1024){toast("文件过大，请上传 4MB 以内的 flat file");return;}processVariationText(await decodeFileText(file),file.name);trackEvent("flat_file_uploaded",{file_extension:ext,file_size:file.size});}
function processText(text,fileName="示例报告"){const errors=toErrors(parseDelimited(text));if(!errors.length)throw new Error("没有识别到错误行。请确认报告中包含 error-code 或 error-message。");state.errors=errors;state.diagnosis=diagnose(errors);state.fileName=fileName;setActiveView("code");els.results.classList.remove("hidden");renderSummary();renderFixabilityPanel();renderVariationPanel();renderErrors();els.results.scrollIntoView({behavior:"smooth",block:"start"});toast(`已解析 ${errors.length} 条错误`);}
async function decodeFileText(file){const buffer=await file.arrayBuffer(),bytes=new Uint8Array(buffer),head=[...bytes.slice(0,1200)];if(bytes[0]===0xFF&&bytes[1]===0xFE)return new TextDecoder("utf-16le").decode(buffer);if(bytes[0]===0xFE&&bytes[1]===0xFF)return new TextDecoder("utf-16be").decode(buffer);const evenNull=head.filter((b,i)=>i%2===0&&b===0).length,oddNull=head.filter((b,i)=>i%2===1&&b===0).length;if(oddNull>20&&oddNull>evenNull*3)return new TextDecoder("utf-16le").decode(buffer);if(evenNull>20&&evenNull>oddNull*3)return new TextDecoder("utf-16be").decode(buffer);return new TextDecoder("utf-8").decode(buffer).replace(/^\uFEFF/,"");}
async function readFile(file){const ext=file.name.split(".").pop().toLowerCase();if(!supported.has(ext)){toast("第一版暂不支持该格式，请上传 .txt / .csv / .tsv");return;}if(file.size>2*1024*1024){toast("文件过大，请上传 2MB 以内的 Processing Report");return;}processText(await decodeFileText(file),file.name);trackEvent("processing_report_uploaded",{file_extension:ext,file_size:file.size});}
function buildMarkdown(){if(!state.errors.length)return"";const lines=["# Amazon Flat File 错误修复清单","",`文件：${state.fileName}`,`错误总数：${state.diagnosis.summary.totalErrors}`,`影响 SKU：${state.diagnosis.summary.affectedSkus}`,`影响字段：${state.diagnosis.summary.affectedFields}`,""];Object.entries(state.diagnosis.byCode).forEach(([code,items])=>{const r=rule(code);lines.push(`## Error ${code} ${r.title}`,`严重程度：${sevLabel(r.severity)}`,`规则来源：${r.sourceLabel} / ${confidenceLabel(r.confidence)} / checked ${r.lastChecked}`,`影响 SKU：${unique(items.map(i=>i.sku)).join(", ")}`,`建议检查字段：${r.likelyFields.join(", ")}`);r.fixSteps.forEach((s,i)=>lines.push(`${i+1}. ${s}`));lines.push("");});return lines.join("\n");}
function fileSlug(name){const raw=String(name||"report").replace(/\.[^.]+$/,"").trim();if(!raw||raw==="示例报告")return"sample-report";const slug=raw.normalize("NFKD").replace(/[^a-zA-Z0-9_\s-]/g,"").trim().toLowerCase().replace(/[\s_]+/g,"-").replace(/-+/g,"-").slice(0,50);return slug||"report";}
function downloadCsv(){if(!state.errors.length)return;const rows=[["sku","rowNumber","errorCode","severity","attribute","message","recommendedFields","ruleSource","confidence"],...state.errors.map(i=>{const r=rule(i.errorCode);return[i.sku,i.rowNumber,i.errorCode,sevLabel(r.severity),i.attribute,i.message,r.likelyFields.join(" | "),r.sourceLabel,confidenceLabel(r.confidence)];})];const csv=rows.map(row=>row.map(cell=>`"${String(cell||"").replace(/"/g,'""')}"`).join(",")).join("\n"),url=URL.createObjectURL(new Blob([`\uFEFF${csv}`],{type:"text/csv;charset=utf-8"})),a=document.createElement("a");a.href=url;a.download=`amazon-flat-file-fix-list-${fileSlug(state.fileName)}-${new Date().toISOString().slice(0,10)}.csv`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function clearAll(){state.errors=[];state.diagnosis=null;state.fileName="";state.flatFileName="";state.variation=null;els.fileInput.value="";if(els.flatFileInput)els.flatFileInput.value="";if(els.flatFileStatus)els.flatFileStatus.textContent="先上传 Processing Report，再按需补充 flat file。";els.results.classList.add("hidden");els.errorList.innerHTML="";els.summaryCards.innerHTML="";if(els.fixabilityPanel){els.fixabilityPanel.classList.add("hidden");els.fixabilityPanel.innerHTML="";}if(els.variationPanel){els.variationPanel.classList.add("hidden");els.variationPanel.innerHTML="";}toast("已清空");}
function copyText(text){const fallback=()=>{const t=document.createElement("textarea");t.value=text;t.readOnly=true;t.style.position="fixed";t.style.left="-9999px";document.body.appendChild(t);t.select();const ok=document.execCommand("copy");t.remove();if(!ok)throw new Error("复制失败，请手动选择结果文本复制。");};return navigator.clipboard?.writeText?navigator.clipboard.writeText(text).catch(fallback):Promise.resolve(fallback());}
els.chooseFile.addEventListener("click",e=>{e.stopPropagation();els.fileInput.click();});
els.dropzone.addEventListener("click",e=>{if(e.target!==els.fileInput)els.fileInput.click();});
els.fileInput.addEventListener("change",e=>{const f=e.target.files?.[0];if(f)readFile(f).catch(err=>toast(err.message));});
["dragenter","dragover"].forEach(n=>els.dropzone.addEventListener(n,e=>{e.preventDefault();els.dropzone.classList.add("dragover");}));
["dragleave","drop"].forEach(n=>els.dropzone.addEventListener(n,e=>{e.preventDefault();els.dropzone.classList.remove("dragover");}));
els.dropzone.addEventListener("drop",e=>{const f=e.dataTransfer.files?.[0];if(f)readFile(f).catch(err=>toast(err.message));});
els.dropzone.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();els.fileInput.click();}});
if(els.chooseFlatFile&&els.flatFileInput){els.chooseFlatFile.addEventListener("click",e=>{e.stopPropagation();els.flatFileInput.click();});els.flatFileInput.addEventListener("change",e=>{const f=e.target.files?.[0];if(f)readFlatFile(f).catch(err=>toast(err.message));});}
els.loadSample.addEventListener("click",()=>{processText(sampleReport,"sample-processing-report.tsv");trackEvent("sample_report_loaded");});
if(els.loadSampleFlatFile){els.loadSampleFlatFile.addEventListener("click",()=>{processVariationText(sampleFlatFile,"sample-variation-flat-file.tsv");trackEvent("sample_flat_file_loaded");});}
els.clearAll.addEventListener("click",()=>{clearAll();trackEvent("results_cleared");});
els.tabButtons.forEach(b=>b.addEventListener("click",()=>{setActiveView(b.dataset.view);renderErrors();}));
els.copyMarkdown.addEventListener("click",async()=>{const text=buildMarkdown();if(!text)return;try{await copyText(text);trackEvent("fix_list_copied",{error_count:state.errors.length});toast("修复清单已复制");}catch(err){toast(err.message);}});
els.downloadCsv.addEventListener("click",()=>{downloadCsv();trackEvent("csv_exported",{error_count:state.errors.length});});
document.addEventListener("click",e=>{const repairButton=e.target.closest("#downloadRepairedFlatFile");if(repairButton){downloadRepairedFlatFile();return;}const manualButton=e.target.closest("#downloadManualReviewCsv");if(manualButton){downloadManualReviewCsv();return;}const target=e.target.closest("[data-track]");if(!target)return;trackEvent(target.dataset.track,{intent:target.dataset.intent||"",source:target.dataset.source||"",href:target.getAttribute("href")||""});});
setActiveView(state.currentView);renderRules();
