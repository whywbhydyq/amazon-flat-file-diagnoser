const fieldAliases = {
  sku: ["sku", "seller-sku", "seller sku", "商家sku", "卖家sku"],
  errorCode: ["error-code", "error code", "errorcode", "错误代码", "错误码"],
  message: ["error-message", "error message", "message", "错误信息", "错误描述", "原因"],
  rowNumber: ["original-record-number", "record number", "row number", "line number", "行号", "原始行号"],
  attribute: ["attribute-name", "attribute name", "field-name", "field name", "字段", "属性"],
  errorType: ["error-type", "error type", "type", "错误类型"]
};

const errorRules = {
  "8541": {
    title: "商品编码与现有 ASIN 信息冲突",
    severity: "high",
    likelyFields: ["external_product_id", "brand", "item_name", "manufacturer"],
    explanation: "上传信息与亚马逊目录中已有 ASIN 的关键属性不一致，通常会阻断创建或更新。",
    fixSteps: [
      "确认这个 SKU 是要匹配已有 ASIN，还是创建全新 ASIN。",
      "检查 UPC/EAN/ASIN 是否填错，尤其是复制模板时遗留的商品编码。",
      "对比品牌、标题、制造商、颜色、尺寸、型号等关键字段。",
      "如果目录信息被锁定，准备产品包装图、品牌授权或官网链接后联系 Seller Support。"
    ]
  },
  "99010": {
    title: "缺少必填字段",
    severity: "high",
    likelyFields: ["item_name", "brand", "product_type", "recommended_browse_nodes"],
    explanation: "模板要求的必填属性没有填写，或字段名/列位置不符合当前分类模板。",
    fixSteps: [
      "根据报告中的 attribute-name 找到对应模板列。",
      "补齐标题、品牌、分类、商品类型、变体主题等必填字段。",
      "确认使用的是当前站点和当前分类的最新版模板。",
      "保存为制表符分隔文本后重新上传。"
    ]
  },
  "90112": {
    title: "字段值不符合模板要求",
    severity: "medium",
    likelyFields: ["size_name", "color_name", "fulfillment_channel", "condition_type"],
    explanation: "字段值可能不在允许枚举范围内，或格式与模板要求不一致。",
    fixSteps: [
      "查看错误信息中指向的字段名。",
      "在模板的 Data Definitions 或 Valid Values 页确认允许值。",
      "避免中文标点、额外空格、大小写不一致和自造枚举值。",
      "只修改报错 SKU 后重新上传，确认错误是否消失。"
    ]
  },
  "8560": {
    title: "SKU 创建失败或缺少关键信息",
    severity: "high",
    likelyFields: ["sku", "product_type", "item_name", "external_product_id"],
    explanation: "亚马逊无法用当前行创建 SKU，常见原因是商品类型、编码、分类或必填属性缺失。",
    fixSteps: [
      "确认 SKU、product_type、item_name、brand 已填写。",
      "检查商品编码类型和值是否匹配，例如 UPC/EAN/ASIN。",
      "如果是无编码商品，确认是否已获 GTIN 豁免。",
      "优先用最少字段创建测试 SKU，再逐步补充属性。"
    ]
  },
  "90244": {
    title: "变体关系或父子体字段错误",
    severity: "high",
    likelyFields: ["parentage", "parent_sku", "relationship_type", "variation_theme"],
    explanation: "父体、子体、variation_theme 或 relationship_type 不一致。",
    fixSteps: [
      "确认父体行 parentage 为 parent，子体行为 child。",
      "子体必须填写 parent_sku，并指向同一个父体 SKU。",
      "父体和所有子体使用同一个 variation_theme。",
      "变体属性如 color/size 必须在每个子体中填写且互不冲突。"
    ]
  },
  "8036": {
    title: "商品编码无效",
    severity: "high",
    likelyFields: ["external_product_id", "external_product_id_type"],
    explanation: "UPC、EAN、JAN、ISBN 或 ASIN 格式不合法，或编码类型和值不匹配。",
    fixSteps: [
      "检查 external_product_id_type 是否与编码长度和格式匹配。",
      "删除编码中的空格、连字符和不可见字符。",
      "确认 UPC/EAN 来自 GS1 或合法来源。",
      "如果没有商品编码，先确认该分类是否可申请 GTIN 豁免。"
    ]
  },
  "8008": {
    title: "字段长度或格式错误",
    severity: "medium",
    likelyFields: ["item_name", "bullet_point", "generic_keywords", "description"],
    explanation: "字段内容超出长度限制，或包含模板不接受的格式。",
    fixSteps: [
      "按错误报告定位字段，先减少标题、五点、Search Terms 的长度。",
      "移除 HTML、特殊符号、重复空格和不可见字符。",
      "确认数字、日期、货币、尺寸单位使用模板要求的格式。",
      "重新导出为 UTF-8 文本文件后上传。"
    ]
  },
  "13013": {
    title: "图片或图片链接问题",
    severity: "medium",
    likelyFields: ["main_image_url", "other_image_url1", "swatch_image_url"],
    explanation: "图片 URL 无法访问、格式不支持、链接重定向异常，或图片不符合亚马逊要求。",
    fixSteps: [
      "在无登录浏览器窗口打开图片 URL，确认能直接访问。",
      "使用 https 链接，避免短链、网盘链接和需要权限的链接。",
      "确认主图为白底、足够清晰，且文件格式为 JPG/PNG 等常规格式。",
      "替换图片链接后重新上传对应 SKU。"
    ]
  },
  "20000": {
    title: "通用处理失败",
    severity: "medium",
    likelyFields: ["feed", "template", "encoding"],
    explanation: "报告没有给出明确字段，可能与模板版本、文件编码、站点分类或系统处理有关。",
    fixSteps: [
      "确认模板来自当前站点、当前分类和最新 Seller Central。",
      "只保留 1-3 个报错 SKU 做最小复现文件。",
      "检查文件编码、分隔符、列头是否被 Excel 改动。",
      "若最小文件仍失败，带处理报告联系 Seller Support。"
    ]
  },
  "8058": {
    title: "品牌、制造商或分类属性冲突",
    severity: "medium",
    likelyFields: ["brand", "manufacturer", "product_type", "model_number"],
    explanation: "品牌、制造商、型号或分类属性与亚马逊目录记录不一致。",
    fixSteps: [
      "确认品牌名拼写与 Brand Registry 或目录 ASIN 保持一致。",
      "对比同 ASIN 页面上的品牌、制造商、型号和分类。",
      "不要在 brand 字段里填写店铺名、卖点或无关词。",
      "如目录信息错误，准备证明材料开 Case 请求修正。"
    ]
  }
};

const sampleReport = `sku\terror-code\terror-message\tattribute-name\toriginal-record-number
SKU-RED-001\t8541\tThe value provided conflicts with the Amazon catalog.\texternal_product_id\t12
SKU-RED-002\t99010\tA value is required for item_name.\titem_name\t13
SKU-BLUE-003\t90244\tThe child SKU does not match the variation relationship.\tparent_sku\t19
SKU-GREEN-004\t13013\tMain image URL cannot be accessed.\tmain_image_url\t21
SKU-GREEN-004\t8008\tThe value exceeds the maximum allowed length.\tgeneric_keywords\t22
SKU-GOLD-005\t90112\tThe submitted value is not an accepted value.\tcondition_type\t25`;

const state = {
  errors: [],
  diagnosis: null,
  currentView: "code",
  fileName: ""
};

const els = {
  fileInput: document.querySelector("#fileInput"),
  chooseFile: document.querySelector("#chooseFile"),
  dropzone: document.querySelector("#dropzone"),
  loadSample: document.querySelector("#loadSample"),
  clearAll: document.querySelector("#clearAll"),
  results: document.querySelector("#results"),
  summaryCards: document.querySelector("#summaryCards"),
  errorList: document.querySelector("#errorList"),
  tabButtons: document.querySelectorAll(".tab-button"),
  copyMarkdown: document.querySelector("#copyMarkdown"),
  downloadCsv: document.querySelector("#downloadCsv"),
  ruleGrid: document.querySelector("#ruleGrid"),
  toast: document.querySelector("#toast")
};

function normalizeHeader(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\uFEFF/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/\s*-\s*/g, "-");
}

function detectDelimiter(text) {
  const firstLine = text.split(/\r?\n/).find((line) => line.trim()) || "";
  const delimiters = ["\t", ",", ";", "|"];
  return delimiters
    .map((delimiter) => ({
      delimiter,
      count: splitDelimitedLine(firstLine, delimiter).length
    }))
    .sort((a, b) => b.count - a.count)[0].delimiter;
}

function splitDelimitedLine(line, delimiter) {
  const cells = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === delimiter && !quoted) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function parseDelimited(text) {
  const delimiter = detectDelimiter(text);
  const lines = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter((line) => line.trim());

  if (lines.length < 2) {
    throw new Error("报告至少需要包含表头和一行错误数据。");
  }

  const headers = splitDelimitedLine(lines[0], delimiter);
  const rows = lines.slice(1).map((line) => {
    const cells = splitDelimitedLine(line, delimiter);
    return headers.reduce((record, header, index) => {
      record[header] = cells[index] || "";
      return record;
    }, {});
  });

  return { headers, rows };
}

function findColumn(headers, type) {
  const normalized = headers.map((header) => ({
    raw: header,
    normalized: normalizeHeader(header)
  }));

  const aliases = fieldAliases[type].map(normalizeHeader);
  const exact = normalized.find((header) => aliases.includes(header.normalized));
  if (exact) return exact.raw;

  const loose = normalized.find((header) =>
    aliases.some((alias) => header.normalized.includes(alias) || alias.includes(header.normalized))
  );
  return loose ? loose.raw : null;
}

function toProcessingErrors(parsed) {
  const columns = {
    sku: findColumn(parsed.headers, "sku"),
    errorCode: findColumn(parsed.headers, "errorCode"),
    message: findColumn(parsed.headers, "message"),
    rowNumber: findColumn(parsed.headers, "rowNumber"),
    attribute: findColumn(parsed.headers, "attribute"),
    errorType: findColumn(parsed.headers, "errorType")
  };

  if (!columns.errorCode && !columns.message) {
    throw new Error("没有识别到 error-code 或 error-message 字段，请确认文件是 Amazon Processing Report。");
  }

  return parsed.rows
    .map((row, index) => {
      const fallbackCode = Object.values(row).join(" ").match(/\b\d{4,5}\b/)?.[0] || "UNKNOWN";
      const errorCode = columns.errorCode ? row[columns.errorCode] : fallbackCode;
      return {
        sku: columns.sku ? row[columns.sku] || "未识别 SKU" : "未识别 SKU",
        rowNumber: columns.rowNumber ? row[columns.rowNumber] || String(index + 2) : String(index + 2),
        errorCode: String(errorCode || fallbackCode).trim(),
        errorType: columns.errorType ? row[columns.errorType] : "",
        message: columns.message ? row[columns.message] || "" : "",
        attribute: columns.attribute ? row[columns.attribute] || "" : "",
        raw: row
      };
    })
    .filter((item) => item.errorCode || item.message);
}

function groupBy(items, keyGetter) {
  return items.reduce((groups, item) => {
    const key = keyGetter(item) || "未识别";
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});
}

function diagnose(errors) {
  const uniqueSkus = new Set(errors.map((item) => item.sku).filter(Boolean));
  const severities = errors.reduce(
    (acc, item) => {
      const severity = errorRules[item.errorCode]?.severity || "low";
      acc[severity] += 1;
      return acc;
    },
    { high: 0, medium: 0, low: 0 }
  );

  return {
    summary: {
      totalErrors: errors.length,
      affectedSkus: uniqueSkus.size,
      ...severities
    },
    byCode: groupBy(errors, (item) => item.errorCode),
    bySku: groupBy(errors, (item) => item.sku),
    byRow: groupBy(errors, (item) => item.rowNumber)
  };
}

function severityLabel(severity) {
  return { high: "高风险", medium: "中风险", low: "低风险" }[severity] || "待确认";
}

function getRule(code) {
  return (
    errorRules[code] || {
      title: "未知错误码",
      severity: "low",
      likelyFields: ["查看原始报告字段"],
      explanation: "规则库暂未覆盖这个错误码，请先依据原始错误信息定位字段。",
      fixSteps: [
        "复制错误码和完整错误信息，在 Seller Central 帮助中心搜索。",
        "检查报告中的 SKU、字段名、行号和原始上传文件。",
        "如果同一错误影响多个 SKU，先用一个 SKU 做最小复现文件。",
        "把最小复现文件和 Processing Report 一起提交给 Seller Support。"
      ]
    }
  );
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function renderSummary() {
  const { summary } = state.diagnosis;
  const cards = [
    ["错误总数", summary.totalErrors, "报告中识别到的错误行"],
    ["影响 SKU", summary.affectedSkus, "需要回到模板修复的商品"],
    ["高风险", summary.high, "优先处理，会阻断上传"],
    ["中低风险", summary.medium + summary.low, "格式、图片或待确认问题"]
  ];

  els.summaryCards.innerHTML = cards
    .map(
      ([label, value, help]) => `
        <article class="summary-card">
          <span>${label}</span>
          <strong>${value}</strong>
          <small>${help}</small>
        </article>
      `
    )
    .join("");
}

function renderGroupCard(title, subtitle, items, codeForRule) {
  const rule = getRule(codeForRule || items[0]?.errorCode);
  const affectedSkus = unique(items.map((item) => item.sku));
  const affectedRows = unique(items.map((item) => item.rowNumber));
  const attributes = unique(items.map((item) => item.attribute)).slice(0, 8);
  const primary = items[0] || {};
  const caseText = createCaseTemplate(primary, rule);

  return `
    <article class="error-card">
      <div class="error-card-header">
        <div>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(subtitle)}</p>
        </div>
        <span class="severity ${rule.severity}">${severityLabel(rule.severity)}</span>
      </div>
      <div class="error-body">
        <div class="fix-list">
          <h4>${escapeHtml(rule.title)}</h4>
          <p>${escapeHtml(rule.explanation)}</p>
          <ol>
            ${rule.fixSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
          </ol>
        </div>
        <div class="affected-list">
          <h4>影响范围</h4>
          <div class="pill-row">
            ${affectedSkus.slice(0, 12).map((sku) => `<span class="pill">SKU ${escapeHtml(sku)}</span>`).join("")}
          </div>
          <div class="pill-row">
            ${affectedRows.slice(0, 12).map((row) => `<span class="pill">行 ${escapeHtml(row)}</span>`).join("")}
          </div>
          <div class="pill-row">
            ${(attributes.length ? attributes : rule.likelyFields)
              .map((field) => `<span class="pill">${escapeHtml(field)}</span>`)
              .join("")}
          </div>
          <div class="case-box">
            <h4>Seller Support Case 话术</h4>
            <textarea readonly>${escapeHtml(caseText)}</textarea>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderErrorList() {
  const view = state.currentView;
  const diagnosis = state.diagnosis;
  let groups;

  if (view === "sku") groups = diagnosis.bySku;
  else if (view === "row") groups = diagnosis.byRow;
  else groups = diagnosis.byCode;

  const sorted = Object.entries(groups).sort((a, b) => {
    const severityWeight = { high: 3, medium: 2, low: 1 };
    const aRule = getRule(view === "code" ? a[0] : a[1][0]?.errorCode);
    const bRule = getRule(view === "code" ? b[0] : b[1][0]?.errorCode);
    return severityWeight[bRule.severity] - severityWeight[aRule.severity] || b[1].length - a[1].length;
  });

  els.errorList.innerHTML = sorted
    .map(([key, items]) => {
      if (view === "sku") {
        const codes = unique(items.map((item) => item.errorCode)).join(", ");
        return renderGroupCard(`SKU ${key}`, `包含 ${items.length} 条错误，错误码：${codes}`, items, items[0]?.errorCode);
      }
      if (view === "row") {
        const first = items[0];
        return renderGroupCard(`原始行号 ${key}`, `${first.sku} · Error ${first.errorCode}`, items, first.errorCode);
      }
      const rule = getRule(key);
      return renderGroupCard(`Error ${key}`, `${rule.title} · 影响 ${items.length} 行`, items, key);
    })
    .join("");
}

function renderRules() {
  els.ruleGrid.innerHTML = Object.entries(errorRules)
    .map(
      ([code, rule]) => `
      <article class="rule-card">
        <strong>Error ${code}</strong>
        <p>${escapeHtml(rule.title)}</p>
      </article>
    `
    )
    .join("");
}

function createCaseTemplate(error, rule) {
  return `Subject: Help needed with Amazon flat file upload error ${error.errorCode || ""}

Hello Amazon Seller Support,

I received error ${error.errorCode || ""} when uploading my inventory flat file.

Affected SKU: ${error.sku || ""}
Original record number: ${error.rowNumber || ""}
Attribute: ${error.attribute || ""}
Error message: ${error.message || ""}

I have checked the relevant fields, including ${rule.likelyFields.join(", ")}.
Could you please help confirm which catalog attribute or template requirement is causing this error?

Thank you.`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.setTimeout(() => els.toast.classList.remove("show"), 2400);
}

function processText(text, fileName = "示例报告") {
  const parsed = parseDelimited(text);
  const errors = toProcessingErrors(parsed);

  if (!errors.length) {
    throw new Error("没有识别到错误行。请确认报告中包含 error-code 或 error-message。");
  }

  state.errors = errors;
  state.diagnosis = diagnose(errors);
  state.fileName = fileName;
  state.currentView = "code";

  els.tabButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === "code"));
  els.results.classList.remove("hidden");
  renderSummary();
  renderErrorList();
  els.results.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast(`已解析 ${errors.length} 条错误`);
}

async function readFile(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  if (!["txt", "csv", "tsv"].includes(extension)) {
    showToast("第一版暂不支持该格式，请上传 .txt / .csv / .tsv");
    return;
  }
  const text = await file.text();
  processText(text, file.name);
}

function buildMarkdown() {
  if (!state.errors.length) return "";
  const lines = [
    `# Amazon Flat File 错误修复清单`,
    ``,
    `文件：${state.fileName}`,
    `错误总数：${state.diagnosis.summary.totalErrors}`,
    `影响 SKU：${state.diagnosis.summary.affectedSkus}`,
    ``
  ];

  Object.entries(state.diagnosis.byCode).forEach(([code, items]) => {
    const rule = getRule(code);
    lines.push(`## Error ${code} ${rule.title}`);
    lines.push(`严重程度：${severityLabel(rule.severity)}`);
    lines.push(`影响 SKU：${unique(items.map((item) => item.sku)).join(", ")}`);
    lines.push(`建议检查字段：${rule.likelyFields.join(", ")}`);
    rule.fixSteps.forEach((step, index) => lines.push(`${index + 1}. ${step}`));
    lines.push("");
  });

  return lines.join("\n");
}

function downloadCsv() {
  if (!state.errors.length) return;
  const headers = ["sku", "rowNumber", "errorCode", "severity", "attribute", "message", "recommendedFields"];
  const rows = state.errors.map((item) => {
    const rule = getRule(item.errorCode);
    return [
      item.sku,
      item.rowNumber,
      item.errorCode,
      severityLabel(rule.severity),
      item.attribute,
      item.message,
      rule.likelyFields.join(" | ")
    ];
  });

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell || "").replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "amazon-flat-file-fix-list.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function clearAll() {
  state.errors = [];
  state.diagnosis = null;
  state.fileName = "";
  els.fileInput.value = "";
  els.results.classList.add("hidden");
  els.errorList.innerHTML = "";
  els.summaryCards.innerHTML = "";
  showToast("已清空");
}

els.chooseFile.addEventListener("click", () => els.fileInput.click());
els.fileInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (file) readFile(file).catch((error) => showToast(error.message));
});

["dragenter", "dragover"].forEach((eventName) => {
  els.dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    els.dropzone.classList.add("dragover");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  els.dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    els.dropzone.classList.remove("dragover");
  });
});

els.dropzone.addEventListener("drop", (event) => {
  const file = event.dataTransfer.files?.[0];
  if (file) readFile(file).catch((error) => showToast(error.message));
});

els.dropzone.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    els.fileInput.click();
  }
});

els.loadSample.addEventListener("click", () => processText(sampleReport, "sample-processing-report.tsv"));
els.clearAll.addEventListener("click", clearAll);

els.tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.currentView = button.dataset.view;
    els.tabButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderErrorList();
  });
});

els.copyMarkdown.addEventListener("click", async () => {
  const text = buildMarkdown();
  if (!text) return;
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  showToast("修复清单已复制");
});

els.downloadCsv.addEventListener("click", downloadCsv);

renderRules();
