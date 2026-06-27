const STORAGE_KEY = "layout-inventory-prototype-v5";
const CONFIGS_KEY = "layout-inventory-configs-v1";
const LOCAL_FILE_DB = "layout-inventory-file-db";
const LOCAL_FILE_STORE = "handles";
const LOCAL_FILE_KEY = "autosave-json";
const LOCAL_DIR_KEY = "autosave-directory";
const LOCAL_DATA_FILENAME = "layout-inventory-data.json";
const GUIDE_SEEN_KEY = "layout-inventory-guide-seen-v1";

const objectLibrary = [
  { key: "bed", name: "床", iconUrl: "assets/icons/bed.svg", width: 185, height: 90, color: "#d8eadc", group: "基礎物件" },
  { key: "desk", name: "書桌", iconUrl: "assets/icons/desk.svg", width: 120, height: 60, color: "#d6e7f5", group: "基礎物件" },
  { key: "wardrobe", name: "衣櫃", iconUrl: "assets/icons/wardrobe.svg", width: 120, height: 60, color: "#eadccf", group: "基礎物件" },
  { key: "shelf4", name: "4層櫃", iconUrl: "assets/icons/shelf.svg", width: 60, height: 35, color: "#e9d8a6", group: "收納" },
  { key: "fridge", name: "冰箱", iconUrl: "assets/icons/fridge.svg", width: 70, height: 70, color: "#c9e7ef", group: "家電" },
  { key: "shoe-rack", name: "鞋櫃", iconUrl: "assets/icons/shoe-rack.svg", width: 80, height: 35, color: "#e2cab3", group: "收納" },
  { key: "metal-rack", name: "鐵架", iconUrl: "assets/icons/rack.svg", width: 120, height: 45, color: "#d6dde0", group: "收納" }
];

const fixtureLabels = { door: "門", window: "窗", ac: "冷氣", fan: "排風扇", custom: "設施" };
const labelIconChoices = ["✏️", "●", "✂️", "+", "▬", "◆", "◐", "◍", "◇", "□", "▦", "▤", "▥", "▣", "⌂", "☰", "▧", "☉", "💉", "📏", "💊", "📁", "📄", "🧤", "🧻", "🧴", "💄", "🍲", "🥤", "🧰", "📦", "☂️"];

const iconKeywordRules = [
  { icon: "🧴", words: ["膠水", "口紅膠", "膠", "黏"] },
  { icon: "✏️", words: ["筆", "鉛筆", "麥克筆"] },
  { icon: "✂️", words: ["剪刀"] },
  { icon: "💊", words: ["藥", "藥品", "錠", "膠囊"] },
  { icon: "🧤", words: ["手套", "袖套", "布"] },
  { icon: "📦", words: ["箱", "紙箱", "收納箱"] },
  { icon: "🧻", words: ["衛生紙", "抽取式", "紙"] },
  { icon: "💄", words: ["口紅", "化妝品", "唇膏"] },
  { icon: "🍲", words: ["食品", "食物", "罐頭"] },
  { icon: "🥤", words: ["飲料", "水", "茶"] },
  { icon: "🧰", words: ["工具", "螺絲起子"] },
  { icon: "📏", words: ["尺", "直尺", "三角板"] },
  { icon: "💉", words: ["針", "針筒", "醫療"] }
];

const scenePresets = {
  suite: { name: "套房", roomWidth: 330, roomHeight: 300, tileCols: 5.5, tileRows: 5, tileWidth: 60, tileHeight: 60, bathroom: true },
  room: { name: "雅房", roomWidth: 330, roomHeight: 300, tileCols: 5.5, tileRows: 5, tileWidth: 60, tileHeight: 60, bathroom: false },
  home: { name: "整層住家", roomWidth: 760, roomHeight: 520, tileCols: 12.7, tileRows: 8.7, tileWidth: 60, tileHeight: 60, bathroom: true },
  factory: { name: "工廠", roomWidth: 1200, roomHeight: 750, tileCols: 15, tileRows: 9.4, tileWidth: 50, tileHeight: 50, bathroom: false },
  classroom: { name: "教室", roomWidth: 720, roomHeight: 540, tileCols: 12, tileRows: 9, tileWidth: 60, tileHeight: 60, bathroom: false }
};

const defaultCategories = {
  "文具": [{ name: "筆", icon: "✏️" }, { name: "膠水", icon: "🧴" }, { name: "剪刀", icon: "✂️" }],
  "醫療": [{ name: "藥品", icon: "💊" }, { name: "OK繃", icon: "➕" }],
  "化妝品": [{ name: "口紅", icon: "💄" }, { name: "粉底", icon: "◐" }, { name: "眼影", icon: "◍" }],
  "生活用品": [{ name: "衛生紙", icon: "🧻" }, { name: "清潔用品", icon: "🧴" }, { name: "雨具", icon: "☂️" }],
  "食品": [{ name: "乾糧", icon: "🍲" }, { name: "飲料", icon: "🥤" }]
};

const changelogEntries = [
  { date: "2026-06-26", title: "批次修正：位置、匯入、刪除與版面", items: ["搜尋結果可直接點入並編輯物品內容", "物件內容新增物品時會自動帶入目前家具與預設位置，不再出現問號位置", "刪除物品改為進資源回收桶並保留 7 天，刪家具時內部物品先進暫存區", "新增 Excel 可用 CSV 範例與 CSV/TSV 匯入", "新增網頁字體選擇、總面積是否納入廁所、物件內容上下拖拉、四層架本層箱子一次清空"] },
  { date: "2026-06-25", title: "資料與操作整理", items: ["合併「一鍵備份」與「輸出 JSON 檔」，改為單一「備份 JSON 檔」", "更新備份提醒文字，備份後會記錄上次備份時間", "更新日誌補齊近期變更內容"] },
  { date: "2026-06-25", title: "Layout 操作修正", items: ["左側工作列固定保持展開，不再貼一個開關在側邊", "物件可像門窗一樣在畫面上直接鎖定或解除鎖定", "改善小物件與旋轉物件的文字顯示，避免擠成直排看不懂"] },
  { date: "2026-06-25", title: "標籤管理", items: ["標籤管理移到左側工作列", "大標籤與小標籤可改名並更換圖示", "新增大標籤與小標籤的刪除操作", "新增物品表單可直接編輯或刪除目前選取的大、小標籤"] },
  { date: "2026-06-25", title: "介面修正", items: ["左側工作列保持展開", "物件放置位置保持全開", "修復中文顯示與配置提示"] },
  { date: "2026-06-16", title: "基礎功能", items: ["Layout 編輯", "物件內容", "家中庫存"] }
];

let state = getDefaultState();
let localFileHandle = null;
let localDirectoryHandle = null;
let localFileSaveTimer = null;
let localFileSaveInProgress = false;
let localFileSaveQueued = false;
let localFolderPromptShown = false;
let guideTour = { steps: [], index: 0, active: false };
let labelManager = { mode: "category", selectedCategory: "文具", selectedSubcategory: "筆", selectedIcon: "✏️" };
let selectedShelfLayer = "最下層";
let selectedShelfBoxId = "";
let lastSavedStateSnapshot = "";
let undoStack = [];

function createId(prefix) {
  if (globalThis.crypto?.randomUUID) return `${prefix}-${globalThis.crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
let isRestoringUndo = false;
let editingInventoryItemId = "";
let inventoryAlertDismissed = false;
let measureModeActive = false;
let measurement = null;
let lastObjectPointerDown = { id: "", time: 0 };
let objectSelectionRenderTimer = null;
const toolDrawerHomes = new Map();
const $ = (selector) => document.querySelector(selector);

function getDefaultState() {
  const preset = scenePresets.suite;
  return {
    sceneKey: "suite",
    uiStyle: "workspace",
    fontFamily: "jhenghei",
    fontScale: 1,
    personalization: {
      layoutDensity: "comfortable",
      accentColor: "#286f6c",
      highlightColor: "#d8eadc",
      backgroundColor: "#f5f7f4",
      panelColor: "#ffffff"
    },
    appearanceProfiles: {},
    activeAppearanceProfile: "",
    sceneSnapshots: {},
    localFolderPromptDismissed: false,
    sidebarAutoHide: false,
    brand: {
      title: "Layout 管理",
      subtitle: "房間組合、物件、庫存",
      logoDataUrl: ""
    },
    viewNames: {
      "dashboard-view": "首頁",
      "layout-view": "1. 場景 Layout",
      "object-view": "2. 物件內容",
      "stock-view": "3. 家中庫存"
    },
    measureMode: "direct",
    roomWidth: preset.roomWidth,
    roomHeight: preset.roomHeight,
    tileCols: preset.tileCols,
    tileRows: preset.tileRows,
    tileWidth: preset.tileWidth,
    tileHeight: preset.tileHeight,
    tilePreset: "60x60",
    canvasZoom: 1,
    canvasPanX: 0,
    canvasPanY: 0,
    layoutPanelWidth: 360,
    objectPanelWidth: 430,
    objectContentTopHeight: 360,
    includeBathroomArea: true,
    configName: "未命名配置",
    zones: defaultZones("suite", preset),
    fixtures: defaultFixtures("suite", preset),
    objects: [makeObject("bed", 20, 20), makeObject("desk", 195, 25), makeObject("wardrobe", 20, 220)],
    objectLocations: {},
    selectedObjectId: "desk",
    selectedObjectIds: ["desk"],
    selectedFixtureId: "",
    categories: structuredClone(defaultCategories),
    deletedItems: [],
    stagingItems: [],
    inventory: [
      { id: "sample-pencil", objectId: "desk", category: "文具", subcategory: "筆", name: "2B 鉛筆", count: 2, addedAt: localDateString() },
      { id: "sample-marker", objectId: "desk", category: "文具", subcategory: "筆", name: "黑色麥克筆", count: 1, addedAt: localDateString() }
    ],
    activityLog: [],
    lastBackupAt: "",
    schemaVersion: 3
  };
}

function defaultFixtures(sceneKey, preset = scenePresets[sceneKey] || scenePresets.suite) {
  if (sceneKey === "home") {
    return [
      { id: "door-home", zoneId: "main-room", type: "door", side: "bottom", offset: 40, size: 90, openAngle: 90, openDirection: "in-left" },
      { id: "window-living", zoneId: "main-room", type: "window", side: "left", offset: 70, size: 100 },
      { id: "window-bedroom", zoneId: "bedroom-zone", type: "window", side: "top", offset: 70, size: 110 },
      { id: "fan-bathroom", zoneId: "bathroom-zone", type: "fan", side: "right", offset: 60, size: 45 },
      { id: "ac-bedroom", zoneId: "bedroom-zone", type: "ac", side: "right", offset: 55, size: 65 }
    ];
  }
  const fixtures = [
    { id: "door-main", zoneId: "main-room", type: "door", side: "bottom", offset: Math.min(60, preset.roomWidth - 80), size: 80, openAngle: 90, openDirection: "in-left" },
    { id: "window-main", zoneId: "main-room", type: "window", side: "top", offset: Math.max(0, Math.min(160, preset.roomWidth - 90)), size: 90 },
    { id: "ac-main", zoneId: "main-room", type: "ac", side: "right", offset: 45, size: 60 }
  ];
  if (preset.bathroom) fixtures.push({ id: "fan-bathroom", zoneId: "bathroom-zone", type: "fan", side: "bottom", offset: 55, size: 45 });
  return fixtures;
}

function defaultZones(sceneKey, preset = scenePresets[sceneKey] || scenePresets.suite) {
  if (sceneKey === "home") {
    return [
      { id: "main-room", name: "主房間", kind: "main", x: 0, y: 0, width: 340, height: 300 },
      { id: "bedroom-zone", name: "臥室", kind: "zone", x: 350, y: 0, width: 260, height: 300 },
      { id: "kitchen-zone", name: "廚房", kind: "zone", x: 0, y: 310, width: 260, height: 190 },
      { id: "bathroom-zone", name: "廁所", kind: "zone", x: 270, y: 310, width: 150, height: 190 },
      { id: "balcony-zone", name: "陽台", kind: "zone", x: 430, y: 310, width: 180, height: 90 }
    ];
  }
  const mainName = sceneKey === "factory" ? "工廠" : sceneKey === "classroom" ? "教室" : "主房間";
  const zones = [{ id: "main-room", name: mainName, kind: "main", x: 0, y: 0, width: preset.roomWidth, height: preset.roomHeight }];
  if (preset.bathroom) zones.push({ id: "bathroom-zone", name: "廁所", kind: "zone", x: preset.roomWidth + 30, y: 145, width: 120, height: 155 });
  if (sceneKey === "classroom") zones.push({ id: "board-zone", name: "黑板", kind: "zone", x: 180, y: -40, width: 360, height: 28 });
  if (sceneKey === "factory") zones.push({ id: "walkway-zone", name: "走道", kind: "zone", x: 80, y: 380, width: 980, height: 90 });
  return zones;
}

function makeObject(key, x, y) {
  const source = objectLibrary.find((item) => item.key === key);
  return { id: key, key, name: source.name, iconUrl: source.iconUrl, x, y, width: source.width, height: source.height, rotation: 0, color: source.color, zoneId: "main-room" };
}

function init() {
  loadState();
  state.objects.forEach(fitObjectInsideMainRoom);
  const restoreLocalFilePromise = restoreLocalFileHandle();
  moveLabelManagerToSidebar();
  detachSidebarDrawers();
  moveEntryFormsToSidebar();
  moveTopActionsToMenu();
  ensureLayoutSectionIds();
  ensureLayoutHeaderDrawerButtons();
  ensureSelectedLockButton();
  preparePlacementEditorFields();
  ensureInlineLabelActionButtons();
  bindEvents();
  syncControlsFromState();
  renderAll();
  requestAnimationFrame(ensureCanvasContentVisible);
  restoreLocalFilePromise.finally(() => {
    renderDataFolderStatus();
    maybeStartGuideTour();
    maybePromptLocalFolderSetup();
  });
  lastSavedStateSnapshot = JSON.stringify(state);
}

function ensureSelectedLockButton() {
  if ($("#selected-lock-target")) return;
  const deleteButton = $("#delete-selected-target");
  if (!deleteButton) return;
  const button = document.createElement("button");
  button.id = "selected-lock-target";
  button.className = "ghost-button";
  button.type = "button";
  button.textContent = "鎖定目前選取";
  deleteButton.before(button);
}

function preparePlacementEditorFields() {
  $("#item-object-select")?.closest("label")?.classList.add("placement-field");
  $("#location-select")?.closest("label")?.classList.add("placement-field");
  $("#new-location")?.closest(".inline-add")?.classList.add("placement-location-add");
  $("#parent-container-select")?.closest("label")?.classList.add("placement-container-field");
}

function ensureInlineLabelActionButtons() {
  if ($("#category-inline-actions") || !$("#category-select")) return;
  const categoryActions = document.createElement("div");
  categoryActions.id = "category-inline-actions";
  categoryActions.className = "label-inline-actions";
  categoryActions.innerHTML = `
    <button id="edit-current-category" class="ghost-button" type="button">編輯大標籤</button>
    <button id="delete-current-category" class="danger-button" type="button">刪除大標籤</button>
  `;
  $("#category-select").closest("label")?.after(categoryActions);

  const subcategoryActions = document.createElement("div");
  subcategoryActions.id = "subcategory-inline-actions";
  subcategoryActions.className = "label-inline-actions";
  subcategoryActions.innerHTML = `
    <button id="edit-current-subcategory" class="ghost-button" type="button">編輯小標籤</button>
    <button id="delete-current-subcategory" class="danger-button" type="button">刪除小標籤</button>
  `;
  $("#subcategory-select").closest("label")?.after(subcategoryActions);
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.contentEditable = "true";
    tab.spellcheck = false;
    tab.addEventListener("click", () => showView(tab.dataset.view));
    tab.addEventListener("blur", () => saveViewName(tab));
    tab.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        tab.blur();
      }
    });
  });
  document.querySelectorAll('input[name="measure-mode"]').forEach((input) => input.addEventListener("change", () => {
    state.measureMode = input.value;
    updateRoomFromInputs();
    commit();
  }));

  $("#scene-select").addEventListener("change", () => {
    switchScene($("#scene-select").value);
  });

  $("#reset-scene").addEventListener("click", () => {
    if (confirm("重建基礎環境會重置目前 Layout，確定要繼續嗎？")) resetScene(state.sceneKey);
  });

  ["room-width", "room-height", "tile-width", "tile-height"].forEach((id) => {
    $(`#${id}`).addEventListener("input", () => {
      if (id === "tile-width" || id === "tile-height") state.tilePreset = "custom";
      updateRoomFromInputs();
      commit();
    });
  });
  ["tile-cols", "tile-rows"].forEach((id) => {
    $(`#${id}`).addEventListener("input", () => {
      if (/^\d*\.?\d*$/.test($(`#${id}`).value)) {
        updateRoomFromInputs({ preserveTyping: true });
        renderArea();
        renderCanvas();
        saveState();
      }
    });
    $(`#${id}`).addEventListener("blur", () => {
      updateRoomFromInputs();
      commit();
    });
  });
  $("#tile-preset").addEventListener("change", () => {
    const preset = $("#tile-preset").value;
    state.tilePreset = preset;
    if (preset !== "custom") {
      const [width, height] = preset.split("x").map(Number);
      state.tileWidth = width;
      state.tileHeight = height;
      $("#tile-width").value = width;
      $("#tile-height").value = height;
      updateRoomFromInputs();
    }
    syncTilePresetFields();
    commit();
  });

  document.querySelectorAll('input[name="zone-measure-mode"]').forEach((input) => input.addEventListener("change", () => {
    syncZoneMeasureFields();
    updateZonePreview();
  }));
  ["zone-width", "zone-height", "zone-tile-cols", "zone-tile-rows", "zone-tile-width", "zone-tile-height"].forEach((id) => {
    $(`#${id}`).addEventListener("input", updateZonePreview);
  });
  $("#zone-form").addEventListener("submit", addZone);
  $("#fixture-type").addEventListener("change", syncFixtureFields);
  $("#fixture-form").addEventListener("submit", addFixture);
  $("#layout-canvas").addEventListener("wheel", zoomCanvas, { passive: false });
  $("#layout-canvas").addEventListener("pointerdown", handleMeasurePointerDown, true);
  $("#layout-canvas").addEventListener("pointerdown", handleObjectEditorPointerDown, true);
  $("#layout-canvas").addEventListener("dblclick", handleObjectDoubleClick, true);
  $("#layout-canvas").addEventListener("pointerdown", handleCanvasPointerDown);
  $("#layout-canvas").addEventListener("auxclick", (event) => {
    if (event.button === 1) event.preventDefault();
  });
  $("#layout-resizer").addEventListener("pointerdown", startLayoutPanelResize);
  $("#object-resizer").addEventListener("pointerdown", startObjectPanelResize);
  $("#object-content-resizer")?.addEventListener("pointerdown", startObjectContentResize);
  $("#quick-add-object").addEventListener("click", () => openToolDrawer("新增物件", "add-object-section", "object-search"));
  $("#quick-add-fixture").addEventListener("click", () => openToolDrawer("新增門窗設施", "fixture-section", "fixture-type"));
  $("#save-config").addEventListener("click", saveNamedConfig);
  $("#load-config").addEventListener("click", loadSelectedConfig);
  $("#config-select").addEventListener("change", () => {
    $("#config-name").value = $("#config-select").value || "";
  });
  $("#object-search").addEventListener("input", renderAddList);
  $("#custom-object-form").addEventListener("submit", addCustomObject);
  $("#selected-object-select").addEventListener("change", () => selectEditableTarget($("#selected-object-select").value));
  $("#selected-name").addEventListener("input", updateSelectedObjectName);
  ["selected-width", "selected-height", "selected-rotation"].forEach((id) => {
    const input = $(`#${id}`);
    input.addEventListener("blur", updateSelectedObject);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        updateSelectedObject();
        input.blur();
      }
    });
  });
  $("#selected-door-direction").addEventListener("change", updateSelectedObject);
  $("#selected-lock-target").addEventListener("click", toggleSelectedLock);
  $("#delete-selected-target").addEventListener("click", deleteSelectedTarget);
  $("#object-select").addEventListener("change", () => selectObject($("#object-select").value));
  $("#save-object-icon")?.addEventListener("click", saveSelectedIcon);
  $("#ui-style-select").addEventListener("change", () => {
    state.uiStyle = $("#ui-style-select").value;
    state.personalization = personalizationPresetForStyle(state.uiStyle);
    applyUiStyle();
    applyPersonalization();
    syncPersonalizationControls();
    saveState();
  });
  $("#font-family-select")?.addEventListener("change", () => {
    state.fontFamily = $("#font-family-select").value;
    applyFontFamily();
    syncPersonalizationControls();
    saveState();
  });
  $("#font-size-select")?.addEventListener("change", () => {
    state.fontScale = Number($("#font-size-select").value) || 1;
    applyFontFamily();
    syncPersonalizationControls();
    saveState();
  });
  $("#manage-category").addEventListener("click", () => setLabelMode("category"));
  $("#manage-subcategory").addEventListener("click", () => setLabelMode("subcategory"));
  $("#label-name-input").addEventListener("input", suggestManagedLabelIcon);
  $("#save-label").addEventListener("click", saveManagedLabel);
  $("#delete-label")?.addEventListener("click", deleteManagedLabel);
  $("#edit-current-category")?.addEventListener("click", () => editCurrentCategoryFromItemForm());
  $("#delete-current-category")?.addEventListener("click", () => deleteCurrentCategoryFromItemForm());
  $("#edit-current-subcategory")?.addEventListener("click", () => editCurrentSubcategoryFromItemForm());
  $("#delete-current-subcategory")?.addEventListener("click", () => deleteCurrentSubcategoryFromItemForm());
  $("#add-location").addEventListener("click", addLocation);
  $("#item-object-select").addEventListener("change", () => {
    renderLocationSelect();
    renderParentContainerSelect();
    renderSelectedStoragePathFromForm();
    const objectId = $("#item-object-select").value;
    if (objectId && !editingInventoryItemId) {
      state.selectedObjectId = objectId;
      state.selectedObjectIds = [objectId];
      state.selectedFixtureId = "";
      renderShelfPlanner();
    }
  });
  $("#location-select").addEventListener("change", () => {
    renderSelectedStoragePathFromForm();
    renderShelfPlanner();
  });
  document.querySelectorAll("[data-entry-mode]").forEach((button) => button.addEventListener("click", () => setEntryMode(button.dataset.entryMode)));
  $("#batch-category-select").addEventListener("change", () => renderSubcategories("batch-category-select", "batch-subcategory-select"));
  $("#batch-item-form").addEventListener("submit", addBatchItem);
  $("#paste-item-form").addEventListener("submit", addPastedItems);
  $("#global-search-input").addEventListener("input", renderGlobalSearch);
  $("#global-search-input").addEventListener("keydown", (event) => {
    if (event.key === "Escape") $("#global-search-results").classList.add("hidden");
  });
  $("#backup-data")?.addEventListener("click", createBackup);
  $("#dashboard-add-item").addEventListener("click", openQuickAddItem);
  $("#dashboard-search-focus").addEventListener("click", () => $("#global-search-input").focus());
  $("#dashboard-audit").addEventListener("click", openAuditSection);
  $("#dashboard-health").addEventListener("click", openHealthSection);
  document.querySelectorAll("[data-dashboard-view]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.dashboardView)));
  $("#start-audit").addEventListener("click", startInventoryAudit);
  $("#run-health-check").addEventListener("click", renderDataHealth);

  $("#category-select").addEventListener("change", () => {
    renderSubcategories("category-select", "subcategory-select");
    suggestExpiryTrackingForCategory();
  });
  $("#add-category-inline").addEventListener("click", addCategoryInline);
  $("#new-subcategory-inline").addEventListener("input", () => suggestIconForInput("new-subcategory-inline", "new-subcategory-icon-inline"));
  $("#choose-subcategory-icon").addEventListener("click", toggleInlineIconPicker);
  $("#add-subcategory-inline").addEventListener("click", addSubcategoryInline);
  $("#include-bathroom-area")?.addEventListener("change", () => {
    state.includeBathroomArea = $("#include-bathroom-area").checked;
    renderArea();
    saveState();
  });
  $("#stock-category").addEventListener("change", () => {
    renderSubcategories("stock-category", "stock-subcategory");
    renderStock();
  });
  $("#stock-subcategory").addEventListener("change", renderStock);
  $("#stock-keyword").addEventListener("input", renderStock);
  $("#item-form").addEventListener("submit", addItem);
  $("#item-track-expiry").addEventListener("change", syncInventoryOptionFields);
  $("#item-track-usage").addEventListener("change", syncInventoryOptionFields);
  $("#item-track-low-stock").addEventListener("change", syncInventoryOptionFields);
  $("#cancel-inventory-edit").addEventListener("click", resetInventoryForm);
  $("#dismiss-inventory-alert").addEventListener("click", () => {
    inventoryAlertDismissed = true;
    $("#inventory-alert-toast").classList.add("hidden");
  });
  $("#open-inventory-alerts").addEventListener("click", () => {
    showView("stock-view");
    $("#inventory-alert-toast").classList.add("hidden");
    $("#inventory-reminders").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("#category-form").addEventListener("submit", addCategory);
  $("#new-subcategory").addEventListener("input", () => suggestIconForInput("new-subcategory", "new-subcategory-icon"));
  $("#choose-subcategory-icon-side").addEventListener("click", toggleSideIconPicker);
  $("#subcategory-form").addEventListener("submit", addSubcategory);
  $("#back-to-layout").addEventListener("click", () => showView("layout-view"));
  $("#export-data").addEventListener("click", createBackup);
  $("#import-data").addEventListener("click", openImportDialog);
  $("#import-file").addEventListener("change", readImportFile);
  $("#apply-import").addEventListener("click", applyImport);
  $("#download-import-template")?.addEventListener("click", downloadImportTemplate);
  $("#clear-data").addEventListener("click", deleteSelectedConfig);
  $("#open-changelog").addEventListener("click", openChangelog);
  $("#open-changelog-top").addEventListener("click", openChangelog);
  $("#brand-title-input").addEventListener("input", updateBrandText);
  $("#brand-subtitle-input").addEventListener("input", updateBrandText);
  $("#brand-title-input").addEventListener("change", saveState);
  $("#brand-subtitle-input").addEventListener("change", saveState);
  $("#brand-logo-button").addEventListener("click", () => $("#brand-logo-file").click());
  $("#brand-logo-file").addEventListener("change", readBrandLogoFile);
  $("#side-add-object").addEventListener("click", () => {
    openToolDrawer("新增物件", "add-object-section", "object-search");
  });
  $("#side-add-fixture").addEventListener("click", () => {
    openToolDrawer("新增門窗設施", "fixture-section", "fixture-type");
  });
  $("#side-label-manager").addEventListener("click", openLabelManager);
  $("#close-label-manager").addEventListener("click", closeLabelManager);
  $("#side-open-changelog").addEventListener("click", openChangelog);
  $("#sidebar-auto-toggle").addEventListener("click", toggleSidebarAutoHide);
  $("#rotate-group-left").addEventListener("click", () => rotateSelectedObjects(-90));
  $("#rotate-group-right").addEventListener("click", () => rotateSelectedObjects(90));
  $("#clear-group-selection").addEventListener("click", clearGroupSelection);
  $("#toggle-measure-tool").addEventListener("click", () => setMeasureMode(!measureModeActive));
  $("#center-canvas-view")?.addEventListener("click", centerCanvasView);
  $("#undo-layout-action")?.addEventListener("click", restorePreviousState);
  document.querySelectorAll(".info-dot").forEach((button) => {
    button.addEventListener("pointerdown", stopInfoSummaryToggle);
    button.addEventListener("click", toggleInfoTip);
  });
  document.addEventListener("pointerdown", handleGlobalPointerDown);
  window.addEventListener("keydown", handleUndoShortcut);
  window.addEventListener("keydown", handleMeasureShortcut);
  window.addEventListener("keydown", handleGlobalEscape);
}

function resetScene(sceneKey) {
  const snapshots = { ...(state.sceneSnapshots || {}) };
  delete snapshots[sceneKey];
  buildFreshScene(sceneKey, snapshots);
  $("#save-status").textContent = `已重建${sceneDisplayName(sceneKey)}基礎環境`;
}

function handleGlobalPointerDown(event) {
  const target = event.target;
  const moreMenu = $("#top-more-menu");
  if (moreMenu?.open && !moreMenu.contains(target)) moreMenu.removeAttribute("open");
  const labelDrawer = $("#sidebar-label-drawer");
  if (labelDrawer && !labelDrawer.classList.contains("hidden") && !labelDrawer.contains(target) && !target.closest("#side-label-manager")) {
    closeLabelManager();
  }
  const toolDrawer = $("#sidebar-tool-drawer");
  if (toolDrawer && !toolDrawer.classList.contains("hidden") && !toolDrawer.contains(target) && !target.closest("#side-add-object, #side-add-fixture, #quick-add-object, #quick-add-fixture, #open-room-size-drawer, #open-zone-drawer")) {
    closeToolDrawer();
  }
}

function handleGlobalEscape(event) {
  if (event.key !== "Escape") return;
  if (guideTour.active) {
    finishGuideTour();
    return;
  }
  $("#top-more-menu")?.removeAttribute("open");
  closeLabelManager();
  closeToolDrawer();
}

function customBaseObject(id, name, iconUrl, x, y, width, height, color) {
  return { id, key: id, name, iconUrl, x, y, width, height, rotation: 0, color, zoneId: "main-room" };
}

function updateRoomFromInputs(options = {}) {
  state.roomWidth = readNumber("room-width", state.roomWidth);
  state.roomHeight = readNumber("room-height", state.roomHeight);
  const tilePreset = $("#tile-preset")?.value || state.tilePreset || detectTilePreset();
  state.tilePreset = tilePreset;
  if (tilePreset !== "custom") {
    const [width, height] = tilePreset.split("x").map(Number);
    state.tileWidth = width;
    state.tileHeight = height;
  } else {
    state.tileWidth = readNumber("tile-width", state.tileWidth);
    state.tileHeight = readNumber("tile-height", state.tileHeight);
  }
  state.tileCols = parseDecimalInput("tile-cols", state.tileCols);
  state.tileRows = parseDecimalInput("tile-rows", state.tileRows);
  if (state.measureMode === "tile") {
    state.roomWidth = round1(state.tileCols * state.tileWidth);
    state.roomHeight = round1(state.tileRows * state.tileHeight);
  } else {
    state.tileCols = round1(state.roomWidth / state.tileWidth);
    state.tileRows = round1(state.roomHeight / state.tileHeight);
  }
  syncMainZone();
  state.objects.forEach(fitObjectInsideMainRoom);
  if (!options.preserveTyping) syncControlsFromState();
}

function readNumber(id, fallback) {
  const value = Number($(`#${id}`).value);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function parseDecimalInput(id, fallback) {
  const raw = $(`#${id}`).value.trim();
  if (!raw || raw === ".") return fallback;
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function syncMainZone() {
  if (state.sceneKey === "home") return;
  const main = state.zones.find((zone) => zone.kind === "main");
  if (main) {
    main.width = state.roomWidth;
    main.height = state.roomHeight;
  }
}

function syncControlsFromState() {
  $("#scene-select").value = state.sceneKey;
  $("#ui-style-select").value = state.uiStyle || "workspace";
  applyUiStyle();
  applyFontFamily();
  applyPersonalization();
  document.querySelector(`input[name="measure-mode"][value="${state.measureMode}"]`).checked = true;
  $("#direct-fields").classList.toggle("hidden", state.measureMode !== "direct");
  $("#tile-fields").classList.toggle("hidden", state.measureMode !== "tile");
  $("#room-width").value = state.roomWidth;
  $("#room-height").value = state.roomHeight;
  $("#tile-cols").value = state.tileCols;
  $("#tile-rows").value = state.tileRows;
  $("#tile-width").value = state.tileWidth;
  $("#tile-height").value = state.tileHeight;
  $("#tile-preset").value = state.tilePreset || detectTilePreset();
  syncTilePresetFields();
  syncZoneMeasureFields();
  updateZonePreview();
  syncFixtureFields();
}

function syncTilePresetFields() {
  $("#tile-custom-fields").classList.toggle("hidden", $("#tile-preset").value !== "custom");
}

function syncZoneMeasureFields() {
  const isTile = document.querySelector('input[name="zone-measure-mode"]:checked')?.value === "tile";
  $("#zone-direct-fields").classList.toggle("hidden", isTile);
  $("#zone-tile-fields").classList.toggle("hidden", !isTile);
}

function getZoneDraftSize() {
  const isTile = document.querySelector('input[name="zone-measure-mode"]:checked')?.value === "tile";
  return isTile
    ? {
      width: round1(parseDecimalInput("zone-tile-cols", 2) * readNumber("zone-tile-width", 60)),
      height: round1(parseDecimalInput("zone-tile-rows", 2.5) * readNumber("zone-tile-height", 60))
    }
    : { width: readNumber("zone-width", 120), height: readNumber("zone-height", 150) };
}

function updateZonePreview() {
  const { width, height } = getZoneDraftSize();
  const area = width * height / 10000;
  $("#zone-size-preview").textContent = `${width} x ${height} cm`;
  $("#zone-area-preview").textContent = `${area.toFixed(1)} m2 / ${(area / 3.3058).toFixed(1)} 坪`;
}

function syncFixtureFields() {
  const isDoor = $("#fixture-type").value === "door";
  $("#fixture-custom-wrap").classList.toggle("hidden", $("#fixture-type").value !== "custom");
  $("#fixture-angle-wrap").classList.toggle("hidden", !isDoor);
  $("#fixture-direction-wrap").classList.toggle("hidden", !isDoor);
}

function detectTilePreset() {
  return detectTilePresetFor(state.tileWidth, state.tileHeight);
}

function detectTilePresetFor(width, height) {
  const preset = `${width}x${height}`;
  return ["60x60", "50x50", "40x40", "30x30", "20x20"].includes(preset) ? preset : "custom";
}

function addZone(event) {
  event.preventDefault();
  const name = $("#zone-name").value.trim();
  if (!name) return;
  const { width, height } = getZoneDraftSize();
  state.zones.push({ id: createId("zone"), name, kind: "zone", x: state.roomWidth + 30, y: 20 + state.zones.filter((zone) => zone.kind !== "main").length * 170, width, height, locked: false });
  $("#zone-name").value = "";
  commit();
}

function addFixture(event) {
  event.preventDefault();
  state.fixtures.push({
    id: createId("fixture"),
    zoneId: $("#fixture-zone").value,
    type: $("#fixture-type").value,
    customName: $("#fixture-custom-name").value.trim(),
    side: $("#fixture-side").value,
    offset: readNumber("fixture-offset", 0),
    size: readNumber("fixture-size", 80),
    openAngle: $("#fixture-type").value === "door" ? clamp(Number($("#fixture-angle").value) || 0, 0, 180) : 0,
    openDirection: $("#fixture-type").value === "door" ? $("#fixture-direction").value : "",
    locked: false
  });
  commit();
}

function showView(viewId) {
  $("#global-search-results")?.classList.add("hidden");
  document.body.dataset.view = viewId;
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.view === viewId));
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === viewId));
  if (viewId === "layout-view") {
    requestAnimationFrame(() => {
      renderArea();
      renderCanvas();
      ensureCanvasContentVisible();
    });
  }
  if (viewId === "object-view") {
    setInventoryFormTarget(state.selectedObjectId);
    renderShelfPlanner();
    renderItems();
  }
  if (viewId === "stock-view") {
    renderStock();
    renderRecyclePanel();
  }
  if (viewId === "dashboard-view") renderDashboard();
}

function moveLabelManagerToSidebar() {
  const manager = document.querySelector(".object-editor .label-manager");
  const target = $("#sidebar-label-content");
  if (!manager || !target) return;
  manager.previousElementSibling?.remove();
  target.appendChild(manager);
}

function detachSidebarDrawers() {
  ["sidebar-label-drawer", "sidebar-tool-drawer"].forEach((id) => {
    const drawer = $(`#${id}`);
    if (drawer && drawer.parentElement !== document.body) document.body.appendChild(drawer);
  });
}

function moveEntryFormsToSidebar() {
  const target = $("#sidebar-entry-forms");
  if (!target) return;
  ["category-form", "subcategory-form"].forEach((id) => {
    const form = $(`#${id}`);
    if (!form || form.parentElement === target) return;
    target.appendChild(form);
  });
}

function moveTopActionsToMenu() {
  const panel = $("#top-more-panel");
  if (!panel) return;
  ensureTopGuideButton();
  ensureMoreMenuExtras(panel);
  [".style-switcher", ".font-switcher", "#import-data", "#export-data", "#open-changelog-top", "#clear-data"].forEach((selector) => {
    const node = document.querySelector(selector);
    if (node && node.parentElement !== panel) panel.appendChild(node);
  });
  ensurePersonalizationPanel(panel);
}

function ensureLayoutHeaderDrawerButtons() {
  const actions = document.querySelector("#layout-view .header-actions");
  if (!actions || $("#open-room-size-drawer")) return;
  const roomButton = document.createElement("button");
  roomButton.id = "open-room-size-drawer";
  roomButton.className = "ghost-button layout-header-drawer-button";
  roomButton.type = "button";
  roomButton.textContent = "主房間尺寸";
  const zoneButton = document.createElement("button");
  zoneButton.id = "open-zone-drawer";
  zoneButton.className = "ghost-button layout-header-drawer-button";
  zoneButton.type = "button";
  zoneButton.textContent = "空間區塊";
  actions.insertBefore(roomButton, actions.firstChild);
  actions.insertBefore(zoneButton, roomButton.nextSibling);
  roomButton.addEventListener("click", () => openToolDrawer("主房間尺寸", getRoomSizeSectionId(), "room-width"));
  zoneButton.addEventListener("click", () => openToolDrawer("空間區塊", "zone-section", "zone-name"));
}

function ensureLayoutSectionIds() {
  const primary = document.querySelector("#layout-view .tool-panel > details.primary-section");
  if (primary && !primary.id) primary.id = "primary-section";
  getRoomSizeSectionId();
}

function getRoomSizeSectionId() {
  let section = $("#room-size-section");
  if (section) return "room-size-section";
  const details = Array.from(document.querySelectorAll("#layout-view .tool-panel > details"));
  section = details.find((item) => item.querySelector("summary span")?.textContent?.includes("主房間尺寸")) || details[1];
  if (section) section.id = "room-size-section";
  return "room-size-section";
}

function ensureTopGuideButton() {
  const statusActions = $(".status-actions");
  const moreMenu = $("#top-more-menu");
  const existing = $("#top-guide-tour");
  if (existing) {
    if (statusActions && existing.parentElement !== statusActions) {
      statusActions.insertBefore(existing, moreMenu || null);
    } else if (moreMenu && existing.nextElementSibling !== moreMenu) {
      moreMenu.before(existing);
    }
    return;
  }
  const button = document.createElement("button");
  button.id = "top-guide-tour";
  button.className = "ghost-button top-guide-button";
  button.type = "button";
  button.textContent = "教學";
  button.addEventListener("click", () => openGuideTour({ manual: true }));
  if (moreMenu) moreMenu.before(button);
  else statusActions?.appendChild(button);
}

function ensureMoreMenuExtras(panel) {
  $("#start-guide-tour")?.remove();
  if (!$("#font-size-select")) {
    const label = document.createElement("label");
    label.className = "font-size-switcher";
    label.textContent = "字體大小";
    label.innerHTML = `字體大小
      <select id="font-size-select">
        <option value="0.9">小</option>
        <option value="1">標準</option>
        <option value="1.12">大</option>
        <option value="1.25">特大</option>
      </select>`;
    panel.appendChild(label);
    label.querySelector("select").addEventListener("change", () => {
      state.fontScale = Number($("#font-size-select").value) || 1;
      applyFontFamily();
      syncPersonalizationControls();
      saveState();
    });
  }
  if (!$("#connect-local-folder")) {
    const button = document.createElement("button");
    button.id = "connect-local-folder";
    button.type = "button";
    button.textContent = "連接資料資料夾";
    button.title = "選擇本機資料夾，之後修改會自動同步成 JSON 檔";
    button.addEventListener("click", connectLocalDataFolder);
    panel.appendChild(button);
  }
}

function ensurePersonalizationPanel(panel) {
  let wrapper = $("#personalization-panel");
  if (!wrapper) {
    wrapper = document.createElement("details");
    wrapper.id = "personalization-panel";
    wrapper.className = "personalization-panel";
    wrapper.open = false;
    wrapper.innerHTML = `
      <summary>個人化</summary>
      <div class="personalization-content">
        <div id="personalization-style-slot"></div>
        <div id="personalization-font-slot"></div>
        <div id="personalization-size-slot"></div>
        <label>版型
          <select id="personal-layout-density">
            <option value="compact">緊湊</option>
            <option value="comfortable">標準</option>
            <option value="spacious">寬鬆</option>
          </select>
        </label>
        <label>側欄模式
          <select id="personal-sidebar-mode">
            <option value="pinned">常駐顯示</option>
            <option value="auto">滑過顯示</option>
          </select>
        </label>
        <div class="personal-color-grid">
          <label>主色 <input id="personal-accent-color" type="color"></label>
          <label>提示色 <input id="personal-highlight-color" type="color"></label>
          <label>背景 <input id="personal-bg-color" type="color"></label>
          <label>卡片 <input id="personal-panel-color" type="color"></label>
        </div>
        <div class="appearance-profile-box">
          <label>外觀配置
            <select id="appearance-profile-select"></select>
          </label>
          <label>配置名稱 <input id="appearance-profile-name" type="text" placeholder="例：我的暖色版"></label>
          <div class="appearance-profile-actions">
            <button id="save-appearance-profile" type="button">儲存外觀</button>
            <button id="load-appearance-profile" type="button">套用外觀</button>
            <button id="delete-appearance-profile" class="danger-button" type="button">刪除外觀</button>
          </div>
        </div>
      </div>`;
    panel.prepend(wrapper);
  } else if (wrapper.parentElement !== panel) {
    panel.prepend(wrapper);
  }
  const moves = [
    [".style-switcher", "#personalization-style-slot"],
    [".font-switcher", "#personalization-font-slot"],
    [".font-size-switcher", "#personalization-size-slot"]
  ];
  moves.forEach(([sourceSelector, targetSelector]) => {
    const source = document.querySelector(sourceSelector);
    const target = document.querySelector(targetSelector);
    if (source && target && source.parentElement !== target) target.appendChild(source);
  });
  bindPersonalizationControls();
  syncPersonalizationControls();
}

function bindPersonalizationControls() {
  const bindings = [
    ["personal-layout-density", () => { state.personalization.layoutDensity = $("#personal-layout-density").value; applyPersonalization(); saveState(); }],
    ["personal-sidebar-mode", () => { state.sidebarAutoHide = $("#personal-sidebar-mode").value === "auto"; applyUiStyle(); saveState(); }],
    ["personal-accent-color", () => updatePersonalColor("accentColor", $("#personal-accent-color").value)],
    ["personal-highlight-color", () => updatePersonalColor("highlightColor", $("#personal-highlight-color").value)],
    ["personal-bg-color", () => updatePersonalColor("backgroundColor", $("#personal-bg-color").value)],
    ["personal-panel-color", () => updatePersonalColor("panelColor", $("#personal-panel-color").value)],
    ["appearance-profile-select", () => { $("#appearance-profile-name").value = $("#appearance-profile-select").value || ""; }]
  ];
  bindings.forEach(([id, handler]) => {
    const element = $(`#${id}`);
    if (!element || element.dataset.bound === "1") return;
    element.dataset.bound = "1";
    element.addEventListener("change", handler);
  });
  const saveButton = $("#save-appearance-profile");
  if (saveButton && saveButton.dataset.bound !== "1") {
    saveButton.dataset.bound = "1";
    saveButton.addEventListener("click", saveAppearanceProfile);
  }
  const loadButton = $("#load-appearance-profile");
  if (loadButton && loadButton.dataset.bound !== "1") {
    loadButton.dataset.bound = "1";
    loadButton.addEventListener("click", loadAppearanceProfile);
  }
  const deleteButton = $("#delete-appearance-profile");
  if (deleteButton && deleteButton.dataset.bound !== "1") {
    deleteButton.dataset.bound = "1";
    deleteButton.addEventListener("click", deleteAppearanceProfile);
  }
}

function updatePersonalColor(key, value) {
  state.personalization ||= getDefaultState().personalization;
  state.personalization[key] = value;
  applyPersonalization();
  saveState();
}

function openLabelManager() {
  $("#sidebar-label-drawer").classList.remove("hidden");
  renderLabelManager();
}

function closeLabelManager() {
  $("#sidebar-label-drawer").classList.add("hidden");
}

function editCurrentCategoryFromItemForm() {
  const category = $("#category-select")?.value;
  if (!category) return;
  labelManager.mode = "category";
  labelManager.selectedCategory = category;
  labelManager.selectedSubcategory = state.categories[category]?.[0]?.name || "";
  labelManager.selectedIcon = state.categories[category]?.[0]?.icon || "□";
  openLabelManager();
  setTimeout(() => $("#label-name-input")?.focus(), 80);
}

function deleteCurrentCategoryFromItemForm() {
  const category = $("#category-select")?.value;
  if (!category) return;
  labelManager.mode = "category";
  labelManager.selectedCategory = category;
  labelManager.selectedSubcategory = state.categories[category]?.[0]?.name || "";
  labelManager.selectedIcon = state.categories[category]?.[0]?.icon || "□";
  renderLabelManager();
  deleteManagedLabel();
}

function editCurrentSubcategoryFromItemForm() {
  const category = $("#category-select")?.value;
  const subcategory = $("#subcategory-select")?.value;
  if (!category || !subcategory) return;
  const target = state.categories[category]?.find((item) => item.name === subcategory);
  labelManager.mode = "subcategory";
  labelManager.selectedCategory = category;
  labelManager.selectedSubcategory = subcategory;
  labelManager.selectedIcon = target?.icon || "□";
  openLabelManager();
  setTimeout(() => $("#label-name-input")?.focus(), 80);
}

function deleteCurrentSubcategoryFromItemForm() {
  const category = $("#category-select")?.value;
  const subcategory = $("#subcategory-select")?.value;
  if (!category || !subcategory) return;
  const target = state.categories[category]?.find((item) => item.name === subcategory);
  labelManager.mode = "subcategory";
  labelManager.selectedCategory = category;
  labelManager.selectedSubcategory = subcategory;
  labelManager.selectedIcon = target?.icon || "□";
  renderLabelManager();
  deleteManagedLabel();
}

function saveViewName(tab) {
  const viewId = tab.dataset.view;
  if (!viewId) return;
  state.viewNames = state.viewNames || {};
  const fallback = getDefaultState().viewNames[viewId] || tab.textContent.trim();
  state.viewNames[viewId] = tab.textContent.trim() || fallback;
  tab.textContent = state.viewNames[viewId];
  saveState();
}

function renderViewNames() {
  state.viewNames = state.viewNames || getDefaultState().viewNames;
  document.querySelectorAll(".tab").forEach((tab) => {
    if (state.viewNames[tab.dataset.view]) tab.textContent = state.viewNames[tab.dataset.view];
  });
}

function renderBrand() {
  state.brand ||= getDefaultState().brand;
  const title = state.brand.title || "Layout 管理";
  const subtitle = state.brand.subtitle || "房間組合、物件、庫存";
  const titleInput = $("#brand-title-input");
  const subtitleInput = $("#brand-subtitle-input");
  if (titleInput && document.activeElement !== titleInput) titleInput.value = title;
  if (subtitleInput && document.activeElement !== subtitleInput) subtitleInput.value = subtitle;
  const image = $("#brand-logo-image");
  const letter = $("#brand-logo-letter");
  if (image && letter) {
    const hasLogo = Boolean(state.brand.logoDataUrl);
    image.classList.toggle("hidden", !hasLogo);
    letter.classList.toggle("hidden", hasLogo);
    if (hasLogo) image.src = state.brand.logoDataUrl;
    letter.textContent = (title.trim()[0] || "L").toUpperCase();
  }
}

function updateBrandText() {
  state.brand ||= getDefaultState().brand;
  state.brand.title = $("#brand-title-input").value.trim() || "Layout 管理";
  state.brand.subtitle = $("#brand-subtitle-input").value.trim() || "房間組合、物件、庫存";
  renderBrand();
  saveState();
}

function readBrandLogoFile() {
  const file = $("#brand-logo-file").files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    $("#save-status").textContent = "請選擇圖片檔作為縮圖";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    state.brand ||= getDefaultState().brand;
    state.brand.logoDataUrl = String(reader.result || "");
    renderBrand();
    saveState();
  };
  reader.readAsDataURL(file);
}

function renderAll() {
  document.body.dataset.view = document.querySelector(".view.active")?.id || "dashboard-view";
  applyLayoutPanelWidth();
  applyFontFamily();
  renderBrand();
  renderConfigOptions();
  renderViewNames();
  renderSceneSummary();
  renderArea();
  renderFixtureZoneOptions();
  renderObjectZoneOptions();
  renderAddList();
  renderCanvas();
  renderObjectSelects();
  renderItemObjectSelect();
  renderLocationSelect();
  renderParentContainerSelect();
  if (!editingInventoryItemId && $("#item-object-select")?.value === state.selectedObjectId) renderSelectedStoragePathFromForm();
  renderCategorySelects();
  renderLabelManager();
  renderShelfPlanner();
  renderItems();
  renderStock();
  renderRecyclePanel();
  renderInventoryReminders();
  renderDashboard();
  renderDataFolderStatus();
  renderActivityLog();
  renderDataHealth();
  syncBulkEntrySelects();
  syncSelectedEditor();
}

function isLocalDataFolderConnected() {
  return Boolean(localFileHandle);
}

function ensureDataFolderBanner() {
  const dashboard = $("#dashboard-view");
  if (!dashboard) return null;
  let banner = $("#data-folder-banner");
  if (banner) return banner;
  banner = document.createElement("section");
  banner.id = "data-folder-banner";
  banner.className = "data-folder-banner";
  banner.innerHTML = `
    <div>
      <strong>尚未連接本機資料夾</strong>
      <span>資料目前仍主要存在瀏覽器。建議選擇 <b>outputs/data</b>，之後每次修改會自動同步成 ${LOCAL_DATA_FILENAME}。</span>
    </div>
    <button id="connect-local-folder-banner" type="button">連接資料資料夾</button>
  `;
  const header = dashboard.querySelector(".view-header");
  if (header?.nextSibling) dashboard.insertBefore(banner, header.nextSibling);
  else dashboard.prepend(banner);
  banner.querySelector("button").addEventListener("click", connectLocalDataFolder);
  return banner;
}

function renderDataFolderStatus() {
  const banner = ensureDataFolderBanner();
  if (!banner) return;
  banner.classList.toggle("hidden", isLocalDataFolderConnected());
}

function maybePromptLocalFolderSetup() {
  if (localFolderPromptShown || isLocalDataFolderConnected() || state.localFolderPromptDismissed) return;
  if (guideTour.active || document.querySelector("dialog[open]")) return;
  if (!$("#dashboard-view")?.classList.contains("active")) return;
  localFolderPromptShown = true;
  const dialog = document.createElement("dialog");
  dialog.className = "data-folder-dialog";
  dialog.innerHTML = `
    <form method="dialog">
      <h3>先連接資料資料夾</h3>
      <p>GitHub 下載的是整個專案資料夾，所以我已經幫你預留 <b>outputs/data</b>。第一次使用時選這個資料夾，之後每次修改都會自動同步到 <b>${LOCAL_DATA_FILENAME}</b>。</p>
      <p>若你是用 GitHub Pages 網頁版，瀏覽器不能直接寫回 GitHub 專案資料夾，但可以選擇你電腦上的任一資料夾做本機同步。</p>
      <div class="dialog-actions">
        <button id="folder-prompt-connect" class="primary-button" type="button">連接資料資料夾</button>
        <button id="folder-prompt-later" type="button">稍後再說</button>
      </div>
    </form>
  `;
  document.body.appendChild(dialog);
  dialog.querySelector("#folder-prompt-connect").addEventListener("click", async () => {
    await connectLocalDataFolder();
    dialog.close();
  });
  dialog.querySelector("#folder-prompt-later").addEventListener("click", () => {
    state.localFolderPromptDismissed = true;
    saveState();
    dialog.close();
  });
  dialog.addEventListener("close", () => dialog.remove());
  dialog.showModal();
}

function applyLayoutPanelWidth() {
  document.documentElement.style.setProperty("--layout-tools-width", `${clamp(Number(state.layoutPanelWidth) || 360, 360, 640)}px`);
  document.documentElement.style.setProperty("--object-tools-width", `${clamp(Number(state.objectPanelWidth) || 430, 360, 720)}px`);
  document.documentElement.style.setProperty("--object-content-top-height", `${clamp(Number(state.objectContentTopHeight) || 360, 180, 760)}px`);
}

function startLayoutPanelResize(event) {
  event.preventDefault();
  const startX = event.clientX;
  const startWidth = Number(state.layoutPanelWidth) || 360;
  function move(pointerEvent) {
    state.layoutPanelWidth = clamp(startWidth + pointerEvent.clientX - startX, 360, 640);
    applyLayoutPanelWidth();
    renderCanvas();
  }
  function stop() {
    saveState();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
}

function startObjectPanelResize(event) {
  event.preventDefault();
  const startX = event.clientX;
  const startWidth = Number(state.objectPanelWidth) || 430;
  function move(pointerEvent) {
    state.objectPanelWidth = clamp(startWidth + pointerEvent.clientX - startX, 360, 720);
    applyLayoutPanelWidth();
  }
  function stop() {
    saveState();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
}

function startObjectContentResize(event) {
  event.preventDefault();
  const startY = event.clientY;
  const startHeight = Number(state.objectContentTopHeight) || 360;
  function move(pointerEvent) {
    state.objectContentTopHeight = clamp(startHeight + pointerEvent.clientY - startY, 180, 760);
    applyLayoutPanelWidth();
  }
  function stop() {
    saveState();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
}

function openToolSection(sectionId, focusId) {
  const section = $(`#${sectionId}`);
  if (section) section.open = true;
  section?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  const target = $(`#${focusId}`);
  if (target) setTimeout(() => target.focus(), 120);
}

function ensureToolDrawer() {
  let drawer = $("#sidebar-tool-drawer");
  if (drawer) return drawer;
  drawer = document.createElement("section");
  drawer.id = "sidebar-tool-drawer";
  drawer.className = "sidebar-tool-drawer hidden";
  drawer.setAttribute("aria-label", "快速操作小視窗");
  drawer.innerHTML = `
    <header class="sidebar-drawer-heading">
      <div><span>快速操作</span><strong id="sidebar-tool-title">操作</strong></div>
      <button id="close-tool-drawer" type="button" title="關閉快速操作" aria-label="關閉快速操作">×</button>
    </header>
    <div id="sidebar-tool-content" class="sidebar-tool-content"></div>
  `;
  document.body.appendChild(drawer);
  $("#close-tool-drawer").addEventListener("click", closeToolDrawer);
  return drawer;
}

function openToolDrawer(title, sectionId, focusId) {
  showView("layout-view");
  const drawer = ensureToolDrawer();
  const content = $("#sidebar-tool-content");
  const section = $(`#${sectionId}`);
  if (!section || !content) {
    openToolSection(sectionId, focusId);
    return;
  }
  returnToolDrawerSections();
  if (!toolDrawerHomes.has(sectionId)) {
    const marker = document.createComment(`tool-drawer-home-${sectionId}`);
    section.parentNode.insertBefore(marker, section);
    toolDrawerHomes.set(sectionId, marker);
  }
  collapseLayoutToolSections(sectionId);
  content.appendChild(section);
  section.open = true;
  $("#sidebar-tool-title").textContent = title;
  drawer.classList.remove("hidden");
  const target = $(`#${focusId}`);
  if (target) setTimeout(() => target.focus(), 120);
}

function closeToolDrawer() {
  returnToolDrawerSections();
  $("#sidebar-tool-drawer")?.classList.add("hidden");
}

function returnToolDrawerSections() {
  const content = $("#sidebar-tool-content");
  if (!content) return;
  Array.from(content.children).forEach((section) => {
    const marker = toolDrawerHomes.get(section.id);
    if (marker?.parentNode) marker.parentNode.insertBefore(section, marker.nextSibling);
  });
}

function collapseLayoutToolSections(keepId) {
  document.querySelectorAll("#layout-view .tool-panel > details").forEach((section) => {
    section.open = section.id === keepId || section.id === "primary-section";
  });
}

function toggleInfoTip(event) {
  event.preventDefault();
  event.stopPropagation();
  const button = event.currentTarget;
  const summary = button.closest("summary");
  const existing = summary.querySelector(".info-tip");
  document.querySelectorAll(".info-tip").forEach((tip) => {
    if (tip !== existing) tip.remove();
  });
  if (existing) {
    existing.remove();
    return;
  }
  const tip = document.createElement("span");
  tip.className = "info-tip";
  tip.textContent = button.dataset.info || "";
  summary.appendChild(tip);
}

function applyFontFamily() {
  const fonts = {
    jhenghei: '"Microsoft JhengHei", sans-serif',
    kaiti: 'DFKai-SB, "標楷體", serif',
    mingliu: 'PMingLiU, "新細明體", serif',
    "source-serif": '"Noto Serif TC", "Source Han Serif TC", PMingLiU, serif',
    system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  };
  document.documentElement.style.setProperty("--app-font-family", fonts[state.fontFamily] || fonts.jhenghei);
  document.documentElement.style.setProperty("--app-font-size", `${clamp(Number(state.fontScale) || 1, 0.85, 1.35) * 16}px`);
  const select = $("#font-family-select");
  if (select) select.value = state.fontFamily || "jhenghei";
  const sizeSelect = $("#font-size-select");
  if (sizeSelect) sizeSelect.value = String(state.fontScale || 1);
}

function personalizationPresetForStyle(style) {
  const presets = {
    workspace: { layoutDensity: "comfortable", accentColor: "#286f6c", highlightColor: "#d8eadc", backgroundColor: "#f5f7f4", panelColor: "#ffffff" },
    mobile: { layoutDensity: "comfortable", accentColor: "#f23f78", highlightColor: "#ffd15c", backgroundColor: "#ffffff", panelColor: "#ffffff" },
    bold: { layoutDensity: "comfortable", accentColor: "#ef5f78", highlightColor: "#ffcc58", backgroundColor: "#fff7dd", panelColor: "#fffef8" },
    dark: { layoutDensity: "comfortable", accentColor: "#88d8cc", highlightColor: "#24443f", backgroundColor: "#111817", panelColor: "#172221" },
    warm: { layoutDensity: "comfortable", accentColor: "#7f5a3a", highlightColor: "#ead7c2", backgroundColor: "#f7f0e7", panelColor: "#fffaf2" },
    blueprint: { layoutDensity: "comfortable", accentColor: "#1f6f9f", highlightColor: "#cce3f2", backgroundColor: "#eaf2f8", panelColor: "#fafdff" },
    contrast: { layoutDensity: "comfortable", accentColor: "#000000", highlightColor: "#f2f2f2", backgroundColor: "#ffffff", panelColor: "#ffffff" }
  };
  return { ...getDefaultState().personalization, ...(presets[style] || presets.workspace) };
}

function applyPersonalization() {
  const defaults = getDefaultState().personalization;
  state.personalization = { ...defaults, ...(state.personalization || {}) };
  const root = document.documentElement;
  const body = document.body;
  const colors = state.personalization;
  const vars = {
    "--accent": colors.accentColor || defaults.accentColor,
    "--accent-2": colors.accentColor || defaults.accentColor,
    "--style-accent": colors.accentColor || defaults.accentColor,
    "--ghost-text": colors.accentColor || defaults.accentColor,
    "--style-highlight": colors.highlightColor || defaults.highlightColor,
    "--ghost-bg": colors.highlightColor || defaults.highlightColor,
    "--bg": colors.backgroundColor || defaults.backgroundColor,
    "--panel": colors.panelColor || defaults.panelColor,
    "--panel-soft": `color-mix(in srgb, ${colors.highlightColor || defaults.highlightColor} 46%, ${colors.panelColor || defaults.panelColor})`,
    "--line": `color-mix(in srgb, ${colors.accentColor || defaults.accentColor} 26%, ${colors.panelColor || defaults.panelColor})`,
    "--sidebar-bg": `color-mix(in srgb, ${colors.accentColor || defaults.accentColor} 54%, #111111)`,
    "--sidebar-item": `color-mix(in srgb, ${colors.highlightColor || defaults.highlightColor} 18%, transparent)`,
    "--input-bg": colors.panelColor || defaults.panelColor,
    "--canvas-bg": `color-mix(in srgb, ${colors.backgroundColor || defaults.backgroundColor} 72%, ${colors.panelColor || defaults.panelColor})`,
    "--grid-line": `color-mix(in srgb, ${colors.accentColor || defaults.accentColor} 18%, transparent)`,
    "--boundary-line": `color-mix(in srgb, ${colors.accentColor || defaults.accentColor} 62%, #555555)`,
    "--boundary-bg": `color-mix(in srgb, ${colors.panelColor || defaults.panelColor} 52%, transparent)`
  };
  Object.entries(vars).forEach(([name, value]) => {
    root.style.setProperty(name, value);
    body.style.setProperty(name, value);
  });
  document.body.classList.remove("layout-compact", "layout-comfortable", "layout-spacious");
  document.body.classList.add(`layout-${state.personalization.layoutDensity || "comfortable"}`);
  syncPersonalizationControls();
}

function syncPersonalizationControls() {
  const settings = { ...getDefaultState().personalization, ...(state.personalization || {}) };
  const setValue = (id, value) => {
    const element = $(`#${id}`);
    if (element) element.value = value;
  };
  setValue("personal-layout-density", settings.layoutDensity || "comfortable");
  setValue("personal-sidebar-mode", state.sidebarAutoHide ? "auto" : "pinned");
  setValue("personal-accent-color", settings.accentColor || "#286f6c");
  setValue("personal-highlight-color", settings.highlightColor || "#d8eadc");
  setValue("personal-bg-color", settings.backgroundColor || "#f5f7f4");
  setValue("personal-panel-color", settings.panelColor || "#ffffff");
  renderAppearanceProfileOptions();
}

function currentAppearanceSettings() {
  return {
    uiStyle: state.uiStyle || "workspace",
    fontFamily: state.fontFamily || "jhenghei",
    fontScale: state.fontScale || 1,
    sidebarAutoHide: !!state.sidebarAutoHide,
    personalization: { ...getDefaultState().personalization, ...(state.personalization || {}) }
  };
}

function renderAppearanceProfileOptions() {
  const select = $("#appearance-profile-select");
  if (!select) return;
  const previous = select.value || state.activeAppearanceProfile || "";
  const profiles = state.appearanceProfiles || {};
  select.innerHTML = `<option value="">選擇已存外觀</option>${Object.keys(profiles).sort().map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")}`;
  if (profiles[previous]) select.value = previous;
  const nameInput = $("#appearance-profile-name");
  if (nameInput && !nameInput.value) nameInput.value = select.value || "";
}

function saveAppearanceProfile() {
  const name = $("#appearance-profile-name")?.value.trim();
  if (!name) {
    $("#appearance-profile-name")?.focus();
    return;
  }
  state.appearanceProfiles ||= {};
  state.appearanceProfiles[name] = currentAppearanceSettings();
  state.activeAppearanceProfile = name;
  renderAppearanceProfileOptions();
  $("#appearance-profile-select").value = name;
  recordActivity("儲存外觀", { id: name, name }, "個人化設定");
  saveState();
}

function loadAppearanceProfile() {
  const name = $("#appearance-profile-select")?.value || $("#appearance-profile-name")?.value.trim();
  const profile = state.appearanceProfiles?.[name];
  if (!profile) return;
  state.uiStyle = profile.uiStyle || state.uiStyle;
  state.fontFamily = profile.fontFamily || state.fontFamily;
  state.fontScale = Number(profile.fontScale) || state.fontScale;
  state.sidebarAutoHide = !!profile.sidebarAutoHide;
  state.personalization = { ...getDefaultState().personalization, ...(profile.personalization || {}) };
  state.activeAppearanceProfile = name;
  applyUiStyle();
  applyFontFamily();
  applyPersonalization();
  syncPersonalizationControls();
  recordActivity("套用外觀", { id: name, name }, "個人化設定");
  saveState();
}

function deleteAppearanceProfile() {
  const name = $("#appearance-profile-select")?.value || $("#appearance-profile-name")?.value.trim();
  if (!name || !state.appearanceProfiles?.[name]) return;
  if (!confirm(`刪除外觀配置「${name}」？`)) return;
  delete state.appearanceProfiles[name];
  if (state.activeAppearanceProfile === name) state.activeAppearanceProfile = "";
  $("#appearance-profile-name").value = "";
  renderAppearanceProfileOptions();
  recordActivity("刪除外觀", { id: name, name }, "個人化設定");
  saveState();
}

function getGuideStepDefinitions() {
  return [
    { view: "dashboard-view", selector: ".app-shell", title: "先看整體介面", text: "左邊是主要工作列，上方可搜尋、切換配置與開啟更多功能，中間就是目前操作區。" },
    { view: "dashboard-view", selector: "#dashboard-view .view-header", title: "首頁看今天要處理什麼", text: "首頁會整理提醒、最近新增、補貨清單與快速入口，開起來先看這裡就好。" },
    { view: "layout-view", selector: "#scene-select", title: "選擇場景 Layout", text: "這裡可以切換套房、雅房或整層住家。不同場景會各自保留資料，不會因為切換就洗掉。" },
    { view: "layout-view", selector: "#open-room-size-drawer", title: "主房間尺寸", text: "主房間尺寸放在上方按鈕，需要時點開小視窗調整，不佔用左側操作區。" },
    { view: "layout-view", selector: "#sidebar-tool-drawer", prepare: () => openToolDrawer("空間區塊", "zone-section", "zone-name"), title: "新增房間或空間區塊", text: "廁所、陽台、玄關、臥室這類區塊都從這裡新增，可用直接量測或地磚估算。" },
    { view: "layout-view", selector: "#sidebar-tool-drawer", prepare: () => openToolDrawer("新增物件", "add-object-section", "object-search"), title: "新增家具與物件", text: "床、書桌、櫃子、冰箱等家具從這個小視窗加入 Layout。" },
    { view: "layout-view", selector: "#sidebar-tool-drawer", prepare: () => openToolDrawer("新增門窗設施", "fixture-section", "fixture-type"), title: "新增門窗與牆面設施", text: "門、窗、冷氣、排風扇等貼邊設施集中在這裡新增。" },
    { view: "layout-view", selector: "#layout-canvas", title: "在畫布調整位置", text: "家具可以拖曳、旋轉、調整大小；門窗設施會貼著邊框滑動，適合做平面規劃。" },
    { view: "layout-view", selector: ".selected-editor", title: "編輯、刪除與鎖定", text: "選到家具或門窗後，可在目前選取物件區改名稱、尺寸、角度，也能鎖定位置或刪除。" },
    { view: "object-view", selector: "#item-form", title: "登錄物品內容", text: "進到家具或收納容器後，在這裡新增物品，設定大標籤、小標籤、數量與提醒條件。" },
    { view: "stock-view", selector: "#stock-results", title: "查看物品清單與庫存", text: "家中庫存會依照搜尋字、大標籤、小標籤列出結果，找到物品後可以直接編輯內容。" },
    { view: "dashboard-view", selector: ".status-actions", title: "儲存、匯入與配置管理", text: "這裡可以管理目前的空間配置，包含匯入資料、備份 JSON 檔、查看更新日誌，以及刪除不需要的配置。建議每次完成編輯後都先備份 JSON，避免資料遺失。" },
    { view: "dashboard-view", selector: "#personalization-panel", prepare: preparePersonalizationGuideStep, title: "個人化外觀", text: "字體、字級、顏色、版型和側欄模式都集中在這裡。調好後可以存成自己的外觀配置。" },
    { view: "dashboard-view", selector: "#top-guide-tour", title: "需要時再看一次", text: "忘記怎麼操作時，右上角按「教學」就能重新開啟這份引導。" }
  ];
}

function preparePersonalizationGuideStep() {
  const moreMenu = $("#top-more-menu");
  const panel = $("#top-more-panel");
  if (!moreMenu || !panel) return;
  ensureMoreMenuExtras(panel);
  ensurePersonalizationPanel(panel);
  moreMenu.setAttribute("open", "");
}

function maybeStartGuideTour() {
  if (localStorage.getItem(GUIDE_SEEN_KEY) === "1") return;
  if (document.querySelector("dialog[open]")) {
    document.querySelector("dialog[open]")?.addEventListener("close", () => openGuideTour({ auto: true }), { once: true });
    return;
  }
  setTimeout(() => openGuideTour({ auto: true }), 250);
}

function openGuideTour(options = {}) {
  if (guideTour.active) {
    guideTour.active = false;
    clearGuideTourVisuals();
  }
  $("#top-more-menu")?.removeAttribute("open");
  closeLabelManager();
  closeToolDrawer();
  const steps = getGuideStepDefinitions();
  if (!steps.length) return;
  guideTour = { steps, index: 0, active: true, auto: Boolean(options.auto) };
  ensureGuideTourLayer();
  showGuideStep(0);
}

function waitForGuideLayout(ms = 80) {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setTimeout(resolve, ms));
    });
  });
}

function guideTargetForStep(step) {
  if (!step?.selector) return null;
  const target = document.querySelector(step.selector);
  if (!target) return null;
  const rect = target.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const styles = getComputedStyle(target);
  if (styles.display === "none" || styles.visibility === "hidden") return null;
  return target;
}

function ensureGuideTourLayer() {
  if ($("#guide-tour-layer")) return;
  const layer = document.createElement("div");
  layer.id = "guide-tour-layer";
  layer.className = "guide-tour-layer hidden";
  layer.innerHTML = `
    <div id="guide-tour-spotlight" class="guide-tour-spotlight"></div>
    <section id="guide-tour-card" class="guide-tour-card" role="dialog" aria-live="polite" aria-label="新手教學">
      <button id="guide-tour-close" class="guide-tour-close" type="button" aria-label="關閉教學">×</button>
      <span id="guide-tour-count"></span>
      <h3 id="guide-tour-title"></h3>
      <p id="guide-tour-text"></p>
      <div class="guide-tour-actions">
        <button id="guide-tour-prev" type="button">上一步</button>
        <button id="guide-tour-next" type="button">下一步</button>
        <button id="guide-tour-finish" type="button">完成</button>
      </div>
    </section>
  `;
  document.body.appendChild(layer);
  $("#guide-tour-prev").addEventListener("click", () => showGuideStep(guideTour.index - 1));
  $("#guide-tour-next").addEventListener("click", () => showGuideStep(guideTour.index + 1));
  $("#guide-tour-finish").addEventListener("click", finishGuideTour);
  $("#guide-tour-close").addEventListener("click", finishGuideTour);
  window.addEventListener("resize", updateGuideTourPosition);
  window.addEventListener("scroll", updateGuideTourPosition, true);
}

async function showGuideStep(index) {
  if (!guideTour.active) return;
  const clampedIndex = clamp(index, 0, guideTour.steps.length - 1);
  const step = guideTour.steps[clampedIndex];
  closeLabelManager();
  closeToolDrawer();
  $("#top-more-menu")?.removeAttribute("open");
  if (step.view) showView(step.view);
  const openTargets = Array.isArray(step.open) ? step.open : step.open ? [step.open] : [];
  openTargets.forEach((selector) => document.querySelector(selector)?.setAttribute("open", ""));
  if (typeof step.prepare === "function") step.prepare();
  await waitForGuideLayout(step.prepare || openTargets.length ? 140 : 40);
  if (!guideTour.active || guideTour.steps[clampedIndex] !== step) return;
  const target = guideTargetForStep(step);
  if (!target) {
    if (clampedIndex + 1 < guideTour.steps.length) showGuideStep(clampedIndex + 1);
    else finishGuideTour();
    return;
  }
  guideTour.index = clampedIndex;
  $("#guide-tour-layer").classList.remove("hidden");
  $("#guide-tour-count").textContent = `${clampedIndex + 1} / ${guideTour.steps.length}`;
  $("#guide-tour-title").textContent = step.title;
  $("#guide-tour-text").textContent = step.text;
  $("#guide-tour-prev").disabled = clampedIndex === 0;
  $("#guide-tour-next").classList.toggle("hidden", clampedIndex === guideTour.steps.length - 1);
  $("#guide-tour-finish").classList.toggle("hidden", clampedIndex !== guideTour.steps.length - 1);
  target.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  await waitForGuideLayout(120);
  if (guideTour.active && guideTour.steps[guideTour.index] === step) updateGuideTourPosition();
}

function updateGuideTourPosition() {
  if (!guideTour.active) return;
  const step = guideTour.steps[guideTour.index];
  const target = guideTargetForStep(step);
  if (!target) {
    showGuideStep(guideTour.index + 1);
    return;
  }
  const rect = target.getBoundingClientRect();
  const padding = 10;
  const spotlight = $("#guide-tour-spotlight");
  const card = $("#guide-tour-card");
  if (!spotlight || !card) return;
  const left = clamp(rect.left - padding, 8, Math.max(8, window.innerWidth - 24));
  const top = clamp(rect.top - padding, 8, Math.max(8, window.innerHeight - 24));
  const width = clamp(rect.width + padding * 2, 72, Math.max(72, window.innerWidth - left - 8));
  const height = clamp(rect.height + padding * 2, 40, Math.max(40, window.innerHeight - top - 8));
  spotlight.style.left = `${left}px`;
  spotlight.style.top = `${top}px`;
  spotlight.style.width = `${width}px`;
  spotlight.style.height = `${height}px`;
  const cardWidth = Math.max(160, Math.min(380, window.innerWidth - 24));
  const estimatedCardHeight = Math.min(260, Math.max(176, card.offsetHeight || 210));
  const spaceBelow = window.innerHeight - (top + height);
  const spaceAbove = top;
  const placeBelow = spaceBelow >= estimatedCardHeight + 18 || spaceBelow >= spaceAbove;
  const cardTop = placeBelow
    ? clamp(top + height + 14, 12, Math.max(12, window.innerHeight - estimatedCardHeight - 12))
    : clamp(top - estimatedCardHeight - 14, 12, Math.max(12, window.innerHeight - estimatedCardHeight - 12));
  const cardLeft = clamp(left, 12, window.innerWidth - cardWidth - 12);
  card.style.width = `${cardWidth}px`;
  card.style.left = `${cardLeft}px`;
  card.style.top = `${cardTop}px`;
}

function finishGuideTour() {
  guideTour.active = false;
  localStorage.setItem(GUIDE_SEEN_KEY, "1");
  clearGuideTourVisuals();
  maybePromptLocalFolderSetup();
}

function clearGuideTourVisuals() {
  const layer = $("#guide-tour-layer");
  const spotlight = $("#guide-tour-spotlight");
  const card = $("#guide-tour-card");
  layer?.classList.add("hidden");
  [spotlight, card].forEach((element) => {
    if (!element) return;
    ["left", "top", "width", "height"].forEach((name) => element.style.removeProperty(name));
  });
  $("#top-more-menu")?.removeAttribute("open");
  closeLabelManager();
  closeToolDrawer();
}

function stopInfoSummaryToggle(event) {
  event.preventDefault();
  event.stopPropagation();
}

function renderSceneSummary() {
  $("#current-scene").textContent = scenePresets[state.sceneKey].name;
}

function getSavedConfigs() {
  try {
    return JSON.parse(localStorage.getItem(CONFIGS_KEY) || "{}");
  } catch {
    return {};
  }
}

function renderConfigOptions() {
  const select = $("#config-select");
  if (!select) return;
  const previous = select.value || state.configName || "";
  const configs = getSavedConfigs();
  select.innerHTML = `<option value="">選擇已儲存配置</option>`;
  Object.keys(configs).sort((a, b) => a.localeCompare(b, "zh-Hant")).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
  if (configs[previous]) select.value = previous;
  $("#config-name").value = state.configName || previous || "";
}

function saveNamedConfig() {
  const name = $("#config-name").value.trim();
  if (!name) {
    $("#config-name").focus();
    return;
  }
  const configs = getSavedConfigs();
  state.configName = name;
  configs[name] = { ...structuredClone(state), savedAt: new Date().toISOString() };
  localStorage.setItem(CONFIGS_KEY, JSON.stringify(configs));
  renderConfigOptions();
  saveState();
}

function loadSelectedConfig() {
  const name = $("#config-select").value;
  const configs = getSavedConfigs();
  if (!name || !configs[name]) return;
  state = normalizeState(configs[name]);
  state.configName = name;
  state.objects.forEach(fitObjectInsideMainRoom);
  syncControlsFromState();
  renderAll();
  requestAnimationFrame(ensureCanvasContentVisible);
  saveState();
}

function totalAreaM2() {
  return state.zones
    .filter((zone) => zone.kind === "main" || zone.includeInTotal !== false)
    .reduce((sum, zone) => sum + (zone.width / 100) * (zone.height / 100), 0);
}

function renderArea() {
  const area = totalAreaM2();
  const ping = area / 3.3058;
  $("#room-size-metric").textContent = `${round1(state.roomWidth)} x ${round1(state.roomHeight)} cm`;
  $("#area-metric").textContent = `${area.toFixed(1)} m2`;
  $("#ping-metric").textContent = `${ping.toFixed(1)} 坪`;
  $("#area-summary").textContent = `${ping.toFixed(1)} 坪`;
  const includeBathroom = $("#include-bathroom-area");
  if (includeBathroom) includeBathroom.closest(".area-include-option")?.classList.add("hidden");
  const zoneMarkup = state.zones.map((zone) => {
    const zoneArea = zone.width * zone.height / 10000;
    const includeControl = zone.kind === "main" ? `<span class="area-include-badge">一定納入總面積</span>` : `<button class="zone-include-toggle ${zone.includeInTotal !== false ? "active" : ""}" type="button" data-toggle-zone-total="${zone.id}" title="切換是否納入總面積">${zone.includeInTotal !== false ? "納入總面積" : "不納入總面積"}</button>`;
    return `<article class="area-zone-row"><div><b>${escapeHtml(zone.name)}</b><small>${round1(zone.width)} x ${round1(zone.height)} cm</small><span>${zoneArea.toFixed(1)} m2 / ${(zoneArea / 3.3058).toFixed(1)} 坪</span></div><div class="area-zone-actions">${includeControl}${zone.kind === "main" ? "" : `<button class="zone-delete-x" type="button" data-delete-zone="${zone.id}" title="刪除${escapeHtml(zone.name)}" aria-label="刪除${escapeHtml(zone.name)}">×</button>`}</div></article>`;
  }).join("");
  const sidebarZoneMarkup = state.zones.map((zone) => {
    const zoneArea = zone.width * zone.height / 10000;
    return `<article class="area-zone-row sidebar-zone-card"><b>${escapeHtml(zone.name)}</b><small>${round1(zone.width)} x ${round1(zone.height)} cm</small><span>${zoneArea.toFixed(1)} m2 / ${(zoneArea / 3.3058).toFixed(1)} 坪</span></article>`;
  }).join("");
  $("#area-breakdown").innerHTML = sidebarZoneMarkup;
  $("#mobile-zone-list").innerHTML = `<strong>空間區塊</strong>${zoneMarkup}`;
  document.querySelectorAll("[data-delete-zone]").forEach((button) => button.addEventListener("click", () => deleteZone(button.dataset.deleteZone)));
  document.querySelectorAll("[data-toggle-zone-total]").forEach((button) => button.addEventListener("click", () => toggleZoneIncludeInTotal(button.dataset.toggleZoneTotal)));
  const label = state.sceneKey === "home" ? "整層住家" : "主房間";
  $("#canvas-size-label").textContent = `${label} ${round1(state.roomWidth)} x ${round1(state.roomHeight)} cm · 縮放 ${Math.round((state.canvasZoom || 1) * 100)}%`;
}

function deleteZone(zoneId) {
  const zone = state.zones.find((item) => item.id === zoneId);
  if (!zone || zone.kind === "main") return;
  if (zone.locked) {
    $("#save-status").textContent = `${zone.name}已鎖定，請先解除鎖定再刪除`;
    return;
  }
  const objects = state.objects.filter((object) => object.zoneId === zoneId);
  const fixtures = state.fixtures.filter((fixture) => fixture.zoneId === zoneId);
  const message = objects.length || fixtures.length
    ? `刪除空間「${zone.name}」？${objects.length} 個家具會移回主房間，${fixtures.length} 個門窗設施會移除。`
    : `刪除空間「${zone.name}」？`;
  if (!confirm(message)) return;
  const main = getMainZone();
  objects.forEach((object, index) => {
    object.zoneId = main.id;
    object.x = main.x + 10 + (index % 4) * 20;
    object.y = main.y + 10 + Math.floor(index / 4) * 20;
    clampObjectToZone(object, main);
  });
  state.fixtures = state.fixtures.filter((fixture) => fixture.zoneId !== zoneId);
  if (!state.fixtures.some((fixture) => fixture.id === state.selectedFixtureId)) state.selectedFixtureId = "";
  state.zones = state.zones.filter((item) => item.id !== zoneId);
  if ($("#object-zone-select")?.value === zoneId) $("#object-zone-select").value = main.id;
  recordActivity("刪除空間", { id: zone.id, name: zone.name }, `${objects.length} 個家具移回主房間，移除 ${fixtures.length} 個門窗設施`);
  commit();
}

function renderFixtureZoneOptions() {
  const select = $("#fixture-zone");
  const previous = select.value;
  select.innerHTML = "";
  state.zones.forEach((zone) => {
    const option = document.createElement("option");
    option.value = zone.id;
    option.textContent = zone.name;
    select.appendChild(option);
  });
  if (state.zones.some((zone) => zone.id === previous)) select.value = previous;
}

function renderObjectZoneOptions() {
  const select = $("#object-zone-select");
  if (!select) return;
  const previous = select.value;
  select.innerHTML = state.zones.map((zone) => `<option value="${zone.id}">${escapeHtml(zone.name)}</option>`).join("");
  if (state.zones.some((zone) => zone.id === previous)) select.value = previous;
}

function selectedObjectPlacementZone() {
  return state.zones.find((zone) => zone.id === $("#object-zone-select")?.value) || getMainZone();
}

function placeObjectInZone(object, zone) {
  object.zoneId = zone.id;
  object.x = round1(zone.x + Math.min(20, Math.max(0, zone.width - object.width)));
  object.y = round1(zone.y + Math.min(20, Math.max(0, zone.height - object.height)));
  clampObjectToZone(object, zone);
  return object;
}

function renderAddList() {
  const keyword = $("#object-search").value.trim().toLowerCase();
  const list = $("#add-list");
  list.innerHTML = "";
  objectLibrary.filter((object) => !keyword || object.name.toLowerCase().includes(keyword) || object.group.toLowerCase().includes(keyword)).forEach((object) => {
    const button = document.createElement("button");
    button.className = "object-library-button";
    button.type = "button";
    button.innerHTML = `<span class="icon"><img src="${escapeHtml(object.iconUrl)}" alt=""></span><span class="name"><b>${object.name}</b><small>${object.width} x ${object.height} cm · ${object.group}</small></span><strong>加入</strong>`;
    button.addEventListener("click", () => {
      const zone = selectedObjectPlacementZone();
      state.objects.push(placeObjectInZone({ ...object, id: createId(object.key), x: zone.x, y: zone.y, rotation: 0 }, zone));
      state.selectedObjectId = state.objects[state.objects.length - 1].id;
      commit();
    });
    list.appendChild(button);
  });
  if (!list.children.length) {
    list.innerHTML = `<div class="empty-state">找不到符合的物件，可以輸入自訂名稱加入 Layout。</div>`;
    $("#custom-object-name").value = $("#object-search").value.trim();
  }
}

function getCanvasBounds() {
  const right = Math.max(...state.zones.map((zone) => zone.x + zone.width), state.roomWidth);
  const bottom = Math.max(...state.zones.map((zone) => zone.y + zone.height), state.roomHeight);
  const left = Math.min(...state.zones.map((zone) => zone.x), 0);
  const top = Math.min(...state.zones.map((zone) => zone.y), 0);
  return { left, top, width: right - left, height: bottom - top };
}

function zoneAtPoint(x, y) {
  return [...state.zones].reverse().find((zone) => x >= zone.x && x <= zone.x + zone.width && y >= zone.y && y <= zone.y + zone.height) || null;
}

function zoneAtRectCenter(x, y, width, height) {
  return zoneAtPoint(x + width / 2, y + height / 2);
}

function getObjectZone(object) {
  return state.zones.find((zone) => zone.id === object.zoneId) || zoneAtRectCenter(object.x, object.y, object.width, object.height) || getMainZone();
}

function getMainZone() {
  return state.zones.find((zone) => zone.kind === "main") || state.zones[0];
}

function clampObjectToZone(object, zone = getObjectZone(object)) {
  if (!zone) return;
  object.zoneId = zone.id;
  const bounds = rotatedObjectBounds(object);
  const centerX = object.x + object.width / 2;
  const centerY = object.y + object.height / 2;
  const clampedCenterX = clamp(centerX, zone.x + bounds.width / 2, zone.x + zone.width - bounds.width / 2);
  const clampedCenterY = clamp(centerY, zone.y + bounds.height / 2, zone.y + zone.height - bounds.height / 2);
  object.x = round1(clampedCenterX - object.width / 2);
  object.y = round1(clampedCenterY - object.height / 2);
}

function rotatedObjectBounds(object) {
  const angle = (object.rotation || 0) * Math.PI / 180;
  const cos = Math.abs(Math.cos(angle));
  const sin = Math.abs(Math.sin(angle));
  return {
    width: object.width * cos + object.height * sin,
    height: object.width * sin + object.height * cos
  };
}

function getScale(canvas) {
  const padding = 28;
  const bounds = getCanvasBounds();
  const usableWidth = Math.max(canvas.clientWidth - padding * 2, 1);
  const usableHeight = Math.max(canvas.clientHeight - padding * 2, 1);
  const baseScale = Math.min(usableWidth / bounds.width, usableHeight / bounds.height);
  const scale = baseScale * (state.canvasZoom || 1);
  return {
    scale,
    offsetX: (canvas.clientWidth - bounds.width * scale) / 2 - bounds.left * scale + (state.canvasPanX || 0),
    offsetY: (canvas.clientHeight - bounds.height * scale) / 2 - bounds.top * scale + (state.canvasPanY || 0)
  };
}

function toggleZoneIncludeInTotal(zoneId) {
  const zone = state.zones.find((item) => item.id === zoneId);
  if (!zone || zone.kind === "main") return;
  zone.includeInTotal = zone.includeInTotal === false;
  recordActivity("修改空間", zone, zone.includeInTotal ? "納入總面積" : "不納入總面積");
  renderArea();
  saveState();
}

function clampCanvasPanIntoView(canvas = $("#layout-canvas")) {
  if (!canvas || canvas.clientWidth < 20 || canvas.clientHeight < 20) return false;
  const { scale, offsetX, offsetY } = getScale(canvas);
  const bounds = getCanvasBounds();
  const marginX = Math.min(120, canvas.clientWidth * 0.35);
  const marginY = Math.min(120, canvas.clientHeight * 0.35);
  const left = offsetX + bounds.left * scale;
  const top = offsetY + bounds.top * scale;
  const right = left + bounds.width * scale;
  const bottom = top + bounds.height * scale;
  let deltaX = 0;
  let deltaY = 0;

  if (right < marginX) deltaX = marginX - right;
  else if (left > canvas.clientWidth - marginX) deltaX = canvas.clientWidth - marginX - left;

  if (bottom < marginY) deltaY = marginY - bottom;
  else if (top > canvas.clientHeight - marginY) deltaY = canvas.clientHeight - marginY - top;

  if (!deltaX && !deltaY) return false;
  state.canvasPanX = round1((state.canvasPanX || 0) + deltaX);
  state.canvasPanY = round1((state.canvasPanY || 0) + deltaY);
  return true;
}

function centerCanvasView() {
  state.canvasZoom = 1;
  state.canvasPanX = 0;
  state.canvasPanY = 0;
  renderArea();
  renderCanvas();
  saveState();
  $("#save-status").textContent = "已將 Layout 畫面置中";
}

function ensureCanvasContentVisible() {
  const canvas = $("#layout-canvas");
  if (!canvas) return;
  if (canvas.clientWidth < 20 || canvas.clientHeight < 20) {
    requestAnimationFrame(ensureCanvasContentVisible);
    return;
  }
  if (clampCanvasPanIntoView(canvas)) {
    renderArea();
    renderCanvas();
    saveState();
  }
}

function canvasPointFromEvent(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function roomPointFromEvent(canvas, event, scaleData = getScale(canvas)) {
  const point = canvasPointFromEvent(canvas, event);
  return {
    x: (point.x - scaleData.offsetX) / scaleData.scale,
    y: (point.y - scaleData.offsetY) / scaleData.scale
  };
}

function zoomCanvas(event) {
  event.preventDefault();
  const direction = event.deltaY > 0 ? -1 : 1;
  state.canvasZoom = clamp((state.canvasZoom || 1) + direction * 0.08, 0.45, 2.8);
  clampCanvasPanIntoView($("#layout-canvas"));
  renderArea();
  renderCanvas();
  saveState();
}

function handleCanvasPointerDown(event) {
  if (event.button === 1) {
    startCanvasPan(event);
    return;
  }
  if (event.button === 0 && event.shiftKey) startBoxSelect(event);
}

function handleMeasureShortcut(event) {
  const target = event.target;
  if (target?.matches?.("input, textarea, select") || target?.isContentEditable) return;
  if (event.key.toLowerCase() === "m" && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault();
    setMeasureMode(!measureModeActive);
  } else if (event.key === "Escape" && (measureModeActive || measurement)) {
    event.preventDefault();
    setMeasureMode(false);
  }
}

function setMeasureMode(active) {
  measureModeActive = Boolean(active);
  if (!measureModeActive) measurement = null;
  const canvas = $("#layout-canvas");
  const button = $("#toggle-measure-tool");
  canvas?.classList.toggle("measuring", measureModeActive);
  if (button) {
    button.classList.toggle("active", measureModeActive);
    button.setAttribute("aria-pressed", String(measureModeActive));
    button.textContent = measureModeActive ? "結束量測 Esc" : "量測 M";
  }
  if ($("#save-status")) {
    $("#save-status").textContent = measureModeActive ? "量測模式：點兩下取得距離" : "已離開量測模式";
  }
  renderCanvas();
}

function handleMeasurePointerDown(event) {
  if (!measureModeActive || event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();
  const canvas = $("#layout-canvas");
  const scaleData = getScale(canvas);
  const start = roomPointFromEvent(canvas, event, scaleData);
  measurement = { start, end: { ...start } };
  renderMeasurementOverlay();

  function move(pointerEvent) {
    let end = roomPointFromEvent(canvas, pointerEvent, scaleData);
    if (pointerEvent.shiftKey) {
      const dx = Math.abs(end.x - start.x);
      const dy = Math.abs(end.y - start.y);
      end = dx >= dy ? { x: end.x, y: start.y } : { x: start.x, y: end.y };
    }
    measurement.end = end;
    renderMeasurementOverlay();
  }

  function stop(pointerEvent) {
    move(pointerEvent);
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
    window.removeEventListener("pointercancel", stop);
  }

  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
  window.addEventListener("pointercancel", stop);
}

function handleObjectEditorPointerDown(event) {
  if (measureModeActive || event.button !== 0) return;
  if (event.target.closest(".delete-object, .resize-handle, .rotate-handle, .object-lock-toggle")) return;
  const objectElement = event.target.closest(".layout-object");
  if (!objectElement) return;
  const now = Date.now();
  const objectId = objectElement.dataset.id;
  const isDoubleClick = lastObjectPointerDown.id === objectId && now - lastObjectPointerDown.time <= 500;
  lastObjectPointerDown = { id: objectId, time: now };
  if (!isDoubleClick) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  clearTimeout(objectSelectionRenderTimer);
  lastObjectPointerDown = { id: "", time: 0 };
  openObjectEditor(objectId);
}

function handleObjectDoubleClick(event) {
  if (measureModeActive) return;
  if (event.target.closest(".delete-object, .resize-handle, .rotate-handle, .object-lock-toggle")) return;
  const objectElement = event.target.closest(".layout-object");
  if (!objectElement) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  clearTimeout(objectSelectionRenderTimer);
  openObjectEditor(objectElement.dataset.id);
}

function renderMeasurementOverlay() {
  const canvas = $("#layout-canvas");
  if (!canvas) return;
  canvas.querySelector(".measurement-overlay")?.remove();
  if (!measurement) return;
  const { scale, offsetX, offsetY } = getScale(canvas);
  const startX = offsetX + measurement.start.x * scale;
  const startY = offsetY + measurement.start.y * scale;
  const endX = offsetX + measurement.end.x * scale;
  const endY = offsetY + measurement.end.y * scale;
  const length = Math.hypot(measurement.end.x - measurement.start.x, measurement.end.y - measurement.start.y);
  const overlay = document.createElement("div");
  overlay.className = "measurement-overlay";
  overlay.innerHTML = `<svg aria-hidden="true"><line class="measurement-line" x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}"></line><circle class="measurement-point" cx="${startX}" cy="${startY}" r="4"></circle><circle class="measurement-point" cx="${endX}" cy="${endY}" r="4"></circle></svg><span class="measurement-label" style="left:${(startX + endX) / 2}px;top:${(startY + endY) / 2}px">${round1(length)} cm</span>`;
  canvas.appendChild(overlay);
}

function startCanvasPan(event) {
  if (event.button !== 1) return;
  event.preventDefault();
  event.stopPropagation();
  const canvas = $("#layout-canvas");
  const startX = event.clientX;
  const startY = event.clientY;
  const startPanX = state.canvasPanX || 0;
  const startPanY = state.canvasPanY || 0;
  canvas.classList.add("panning");
  function move(pointerEvent) {
    state.canvasPanX = startPanX + pointerEvent.clientX - startX;
    state.canvasPanY = startPanY + pointerEvent.clientY - startY;
    clampCanvasPanIntoView(canvas);
    renderCanvas();
  }
  function stop() {
    canvas.classList.remove("panning");
    saveState();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
}

function startBoxSelect(event) {
  event.preventDefault();
  event.stopPropagation();
  const canvas = $("#layout-canvas");
  const scaleData = getScale(canvas);
  const startPoint = canvasPointFromEvent(canvas, event);
  const selector = document.createElement("div");
  selector.className = "selection-box";
  canvas.appendChild(selector);
  function move(pointerEvent) {
    const point = canvasPointFromEvent(canvas, pointerEvent);
    const left = Math.min(startPoint.x, point.x);
    const top = Math.min(startPoint.y, point.y);
    selector.style.left = `${left}px`;
    selector.style.top = `${top}px`;
    selector.style.width = `${Math.abs(point.x - startPoint.x)}px`;
    selector.style.height = `${Math.abs(point.y - startPoint.y)}px`;
  }
  function stop(pointerEvent) {
    const endPoint = canvasPointFromEvent(canvas, pointerEvent);
    const startRoom = {
      x: (startPoint.x - scaleData.offsetX) / scaleData.scale,
      y: (startPoint.y - scaleData.offsetY) / scaleData.scale
    };
    const endRoom = {
      x: (endPoint.x - scaleData.offsetX) / scaleData.scale,
      y: (endPoint.y - scaleData.offsetY) / scaleData.scale
    };
    const rect = {
      x: Math.min(startRoom.x, endRoom.x),
      y: Math.min(startRoom.y, endRoom.y),
      width: Math.abs(endRoom.x - startRoom.x),
      height: Math.abs(endRoom.y - startRoom.y)
    };
    state.selectedObjectIds = state.objects.filter((object) => rectsIntersect(rect, objectRect(object))).map((object) => object.id);
    state.selectedObjectId = state.selectedObjectIds[0] || "";
    state.selectedFixtureId = "";
    selector.remove();
    renderObjectSelects();
    syncSelectedEditor();
    renderCanvas();
    saveState();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
}

function objectRect(object) {
  const bounds = rotatedObjectBounds(object);
  return {
    x: object.x + object.width / 2 - bounds.width / 2,
    y: object.y + object.height / 2 - bounds.height / 2,
    width: bounds.width,
    height: bounds.height
  };
}

function rectsIntersect(a, b) {
  return a.x <= b.x + b.width && a.x + a.width >= b.x && a.y <= b.y + b.height && a.y + a.height >= b.y;
}

function renderCanvas() {
  const canvas = $("#layout-canvas");
  if (!canvas) return;
  if (canvas.clientWidth < 20 || canvas.clientHeight < 20) return;
  constrainAllDoorOpenAngles();
  const { scale, offsetX, offsetY } = getScale(canvas);
  canvas.style.setProperty("--tile-width", `${state.tileWidth * scale}px`);
  canvas.style.setProperty("--tile-height", `${state.tileHeight * scale}px`);
  canvas.innerHTML = "";

  state.zones.forEach((zone) => {
    const el = document.createElement("div");
    const isLocked = !!zone.locked;
    el.className = zone.kind === "main" ? "room-boundary" : `layout-zone ${isLocked ? "locked" : ""}`;
    el.dataset.zoneId = zone.id;
    el.style.left = `${offsetX + zone.x * scale}px`;
    el.style.top = `${offsetY + zone.y * scale}px`;
    el.style.width = `${zone.width * scale}px`;
    el.style.height = `${zone.height * scale}px`;
    if (zone.kind !== "main") {
      const lockControl = `<button class="zone-lock-toggle ${isLocked ? "active" : ""}" type="button" title="${isLocked ? "解除鎖定" : "鎖定位置與大小"}">${isLocked ? "已鎖" : "鎖定"}</button>`;
      const deleteControl = isLocked ? "" : `<button class="zone-canvas-delete" type="button" title="刪除${escapeHtml(zone.name)}" aria-label="刪除${escapeHtml(zone.name)}">×</button>`;
      const resizeControl = isLocked ? "" : `<button class="resize-handle" type="button" title="調整區域大小">↘</button>`;
      el.innerHTML = `${lockControl}${deleteControl}<span>${escapeHtml(zone.name)}<span class="size">${round1(zone.width)} x ${round1(zone.height)} cm${isLocked ? " · 已鎖定" : ""}</span></span>${resizeControl}`;
      el.addEventListener("pointerdown", startZoneDrag);
      el.querySelector(".resize-handle")?.addEventListener("pointerdown", (event) => startZoneResize(event, zone.id));
      el.querySelector(".zone-lock-toggle")?.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
      el.querySelector(".zone-lock-toggle")?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleZoneLock(zone.id);
      });
      el.querySelector(".zone-canvas-delete")?.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
      el.querySelector(".zone-canvas-delete")?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        deleteZone(zone.id);
      });
    }
    canvas.appendChild(el);
  });

  state.fixtures.forEach((fixture) => renderFixture(canvas, fixture, scale, offsetX, offsetY));

  state.objects.forEach((object) => {
    const el = document.createElement("div");
    const isSelected = object.id === state.selectedObjectId || (state.selectedObjectIds || []).includes(object.id);
    const isLocked = !!object.locked;
    const pixelWidth = object.width * scale;
    const pixelHeight = object.height * scale;
    const isCompact = pixelWidth < 90 || pixelHeight < 58;
    el.className = `layout-object ${isSelected ? "selected" : ""} ${isLocked ? "locked" : ""} ${isCompact ? "compact" : ""}`;
    el.style.left = `${offsetX + object.x * scale}px`;
    el.style.top = `${offsetY + object.y * scale}px`;
    el.style.width = `${object.width * scale}px`;
    el.style.height = `${object.height * scale}px`;
    el.style.background = object.color;
    el.style.transform = `rotate(${object.rotation || 0}deg)`;
    el.dataset.id = object.id;
    const controls = isSelected ? `<button class="object-lock-toggle ${isLocked ? "active" : ""}" type="button" title="${isLocked ? "解除鎖定" : "鎖定位置與大小"}">${isLocked ? "已鎖" : "鎖"}</button>${isLocked ? "" : `<button class="rotate-handle" type="button" title="旋轉">↻</button><button class="resize-handle" type="button" title="調整大小">↘</button>`}` : "";
    const labelName = isCompact ? `<span class="compact-name-badge" style="transform: rotate(${-(object.rotation || 0)}deg)">${escapeHtml(object.name)}</span>` : `<span class="object-name">${escapeHtml(object.name)}</span>`;
    el.innerHTML = `<button class="delete-object" title="刪除" type="button">×</button>${controls}<span class="object-label" style="transform: translate(-50%, -50%) rotate(${-(object.rotation || 0)}deg)">${object.iconUrl ? `<img src="${escapeHtml(object.iconUrl)}" alt="">` : ""}${isCompact ? "" : labelName}<span class="size">${round1(object.width)} x ${round1(object.height)} cm · ${round1(object.rotation || 0)}°</span></span>${isCompact ? labelName : ""}`;
    el.title = `${object.name} / ${round1(object.width)} x ${round1(object.height)} cm / ${round1(object.rotation || 0)}°${isLocked ? " / 已鎖定" : ""}`;
    if (isLocked) {
      el.querySelector(".delete-object")?.remove();
      el.querySelector(".rotate-handle")?.remove();
      el.querySelector(".resize-handle")?.remove();
      if (object.id !== state.selectedObjectId) {
        const badge = document.createElement("span");
        badge.className = "object-lock-badge";
        badge.textContent = "鎖";
        el.prepend(badge);
      }
    }
    el.addEventListener("pointerdown", startDrag);
    const resizeHandle = el.querySelector(".resize-handle");
    const rotateHandle = el.querySelector(".rotate-handle");
    if (resizeHandle) resizeHandle.addEventListener("pointerdown", (event) => startObjectResize(event, object.id));
    if (rotateHandle) rotateHandle.addEventListener("pointerdown", (event) => startObjectRotate(event, object.id));
    el.querySelector(".object-lock-toggle")?.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    el.querySelector(".object-lock-toggle")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleObjectLock(object.id);
    });
    el.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openObjectEditor(object.id);
    });
    el.querySelector(".delete-object")?.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteObject(object.id);
    });
    canvas.appendChild(el);
  });
  renderMeasurementOverlay();
  updateGroupControls();
}

function updateLayoutObjectElement(el, object, scale, offsetX, offsetY) {
  if (!el) return;
  const rotation = object.rotation || 0;
  el.style.left = `${offsetX + object.x * scale}px`;
  el.style.top = `${offsetY + object.y * scale}px`;
  el.style.width = `${object.width * scale}px`;
  el.style.height = `${object.height * scale}px`;
  el.style.transform = `rotate(${rotation}deg)`;
  el.title = `${object.name} / ${round1(object.width)} x ${round1(object.height)} cm / ${round1(rotation)}°${object.locked ? " / 已鎖定" : ""}`;
  const label = el.querySelector(".object-label");
  if (label) label.style.transform = `translate(-50%, -50%) rotate(${-rotation}deg)`;
  const compactBadge = el.querySelector(".compact-name-badge");
  if (compactBadge) compactBadge.style.transform = `rotate(${-rotation}deg)`;
  const size = el.querySelector(".size");
  if (size) size.textContent = `${round1(object.width)} x ${round1(object.height)} cm · ${round1(rotation)}°`;
}

function renderFixture(canvas, fixture, scale, offsetX, offsetY) {
  const zone = state.zones.find((item) => item.id === fixture.zoneId);
  if (!zone) return;
  const el = document.createElement("div");
  const isHorizontal = fixture.side === "top" || fixture.side === "bottom";
  el.className = `fixture ${fixture.type} ${fixture.side} ${fixture.locked ? "locked" : ""} ${fixture.id === state.selectedFixtureId ? "selected" : ""}`;
  const thickness = 32;
  const size = Math.min(fixture.size, fixture.side === "top" || fixture.side === "bottom" ? zone.width : zone.height);
  const offset = Math.max(0, Math.min(fixture.offset, (fixture.side === "top" || fixture.side === "bottom" ? zone.width : zone.height) - size));
  let x = zone.x;
  let y = zone.y;
  let width = size;
  let height = thickness;
  if (fixture.side === "top") { x += offset; y -= thickness / 2; }
  if (fixture.side === "bottom") { x += offset; y += zone.height - thickness / 2; }
  if (fixture.side === "left") { y += offset; x -= thickness / 2; width = thickness; height = size; }
  if (fixture.side === "right") { y += offset; x += zone.width - thickness / 2; width = thickness; height = size; }
  el.style.left = `${offsetX + x * scale}px`;
  el.style.top = `${offsetY + y * scale}px`;
  el.style.width = `${Math.max(width * scale, 14)}px`;
  el.style.height = `${Math.max(height * scale, 14)}px`;
  el.dataset.fixtureId = fixture.id;
  const label = fixture.customName || fixtureLabels[fixture.type] || fixtureLabels.custom;
  const directionLabel = fixture.type === "door" ? doorDirectionLabel(fixture.openDirection) : "";
  const angleLabel = fixture.type === "door" ? ` · ${round1(fixture.openAngle ?? 90)}° · ${directionLabel}` : "";
  const dimensionLabel = `${round1(size)} cm ${isHorizontal ? "寬" : "高"}${angleLabel}`;
  const deleteControl = fixture.id === state.selectedFixtureId ? `<button class="delete-fixture" title="刪除設施" type="button">×</button>` : "";
  const lockControl = fixture.id === state.selectedFixtureId ? `<button class="fixture-lock-toggle ${fixture.locked ? "active" : ""}" type="button" title="${fixture.locked ? "解除鎖定" : "鎖定位置"}">${fixture.locked ? "已鎖" : "鎖定"}</button>` : "";
  const doorSwing = fixture.type === "door" ? renderDoorSwing(fixture, size, scale) : "";
  el.innerHTML = `${doorSwing}<button class="fixture-hitbox" type="button" title="${fixture.locked ? "已鎖定" : "拖曳調整位置"}"><span>${escapeHtml(label)}<small>${dimensionLabel}</small></span></button>${lockControl}${deleteControl}${fixture.locked ? "" : `<button class="resize-handle fixture-resize" type="button" title="調整寬度">↔</button>`}`;
  el.addEventListener("pointerdown", (event) => startFixturePointerDown(event, fixture.id));
  el.querySelector(".fixture-resize")?.addEventListener("pointerdown", (event) => startFixtureResize(event, fixture.id));
  el.querySelector(".fixture-lock-toggle")?.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  el.querySelector(".fixture-lock-toggle")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFixtureLock(fixture.id);
  });
  const deleteButton = el.querySelector(".delete-fixture");
  if (deleteButton) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteFixture(fixture.id);
    });
  }
  canvas.appendChild(el);
}

function toggleFixtureLock(fixtureId) {
  const fixture = state.fixtures.find((item) => item.id === fixtureId);
  if (!fixture) return;
  fixture.locked = !fixture.locked;
  renderCanvas();
  saveState();
  $("#save-status").textContent = fixture.locked ? "已鎖定設施" : "已解除設施鎖定";
}

function toggleZoneLock(zoneId) {
  const zone = state.zones.find((item) => item.id === zoneId);
  if (!zone || zone.kind === "main") return;
  zone.locked = !zone.locked;
  renderArea();
  renderCanvas();
  saveState();
  $("#save-status").textContent = zone.locked ? `已鎖定${zone.name}` : `已解除${zone.name}鎖定`;
}

function toggleObjectLock(objectId) {
  const object = state.objects.find((item) => item.id === objectId);
  if (!object) return;
  object.locked = !object.locked;
  state.selectedObjectId = object.id;
  state.selectedObjectIds = [object.id];
  state.selectedFixtureId = "";
  renderObjectSelects();
  syncSelectedEditor();
  renderCanvas();
  saveState();
  $("#save-status").textContent = object.locked ? "已鎖定物件" : "已解除物件鎖定";
}

function toggleSelectedLock() {
  const fixture = getSelectedFixture();
  if (fixture) {
    toggleFixtureLock(fixture.id);
    syncSelectedEditor();
    return;
  }
  const object = getSelectedObject();
  if (!object) return;
  toggleObjectLock(object.id);
}

function renderDoorSwing(fixture, size, scale) {
  const angle = clamp(Number(fixture.openAngle ?? 90), 0, 180);
  const radians = angle * Math.PI / 180;
  const direction = fixture.openDirection || "in-left";
  const hingeLeft = direction.endsWith("left");
  const inward = direction.startsWith("in-");
  const pivotX = hingeLeft ? 0 : 100;
  const closedX = hingeLeft ? 100 : 0;
  const endX = round1(hingeLeft ? 100 * Math.cos(radians) : 100 - 100 * Math.cos(radians));
  const endY = round1((inward ? -1 : 1) * 100 * Math.sin(radians));
  const sweep = hingeLeft ? (inward ? 0 : 1) : (inward ? 1 : 0);
  return `<svg class="door-swing-svg" style="--door-size:${Math.max(size * scale, 20)}px" viewBox="0 -100 100 200" aria-hidden="true"><path class="door-arc" d="M ${closedX} 0 A 100 100 0 0 ${sweep} ${endX} ${endY}"></path><path class="door-leaf" d="M ${pivotX} 0 L ${endX} ${endY}"></path><circle cx="${pivotX}" cy="0" r="3"></circle></svg>`;
}

function constrainAllDoorOpenAngles() {
  state.fixtures.forEach((fixture) => {
    if (fixture.type !== "door") return;
    fixture.openAngle = getDoorAllowedAngle(fixture, fixture.openAngle ?? 90);
  });
}

function getDoorAllowedAngle(fixture, requestedAngle) {
  const target = clamp(Number(requestedAngle) || 0, 0, 180);
  if (!target || !state.objects.length) return target;
  const step = 1;
  let lastClearAngle = 0;
  for (let angle = step; angle < target; angle += step) {
    if (doorLeafHitsObject(fixture, angle)) return lastClearAngle;
    lastClearAngle = angle;
  }
  return doorLeafHitsObject(fixture, target) ? lastClearAngle : target;
}

function doorLeafHitsObject(fixture, angle) {
  const leaf = getDoorLeafSegment(fixture, angle);
  if (!leaf) return false;
  return state.objects.some((object) => segmentTouchesPolygon(leaf.start, leaf.end, rotatedObjectPolygon(object), 2));
}

function getDoorLeafSegment(fixture, angle) {
  const zone = state.zones.find((item) => item.id === fixture.zoneId);
  if (!zone) return null;
  const horizontal = fixture.side === "top" || fixture.side === "bottom";
  const size = Math.min(Number(fixture.size) || 0, horizontal ? zone.width : zone.height);
  const offset = clamp(Number(fixture.offset) || 0, 0, (horizontal ? zone.width : zone.height) - size);
  let origin;
  let wallDirection;
  let outsideNormal;

  if (fixture.side === "bottom") {
    origin = { x: zone.x + offset, y: zone.y + zone.height };
    wallDirection = { x: 1, y: 0 };
    outsideNormal = { x: 0, y: 1 };
  } else if (fixture.side === "top") {
    origin = { x: zone.x + offset + size, y: zone.y };
    wallDirection = { x: -1, y: 0 };
    outsideNormal = { x: 0, y: -1 };
  } else if (fixture.side === "left") {
    origin = { x: zone.x, y: zone.y + offset };
    wallDirection = { x: 0, y: 1 };
    outsideNormal = { x: -1, y: 0 };
  } else {
    origin = { x: zone.x + zone.width, y: zone.y + offset + size };
    wallDirection = { x: 0, y: -1 };
    outsideNormal = { x: 1, y: 0 };
  }

  const direction = fixture.openDirection || "in-left";
  const hingeLeft = direction.endsWith("left");
  const inward = direction.startsWith("in-");
  const start = hingeLeft
    ? origin
    : { x: origin.x + wallDirection.x * size, y: origin.y + wallDirection.y * size };
  const closedDirection = hingeLeft
    ? wallDirection
    : { x: -wallDirection.x, y: -wallDirection.y };
  const swingDirection = inward
    ? { x: -outsideNormal.x, y: -outsideNormal.y }
    : outsideNormal;
  const radians = clamp(angle, 0, 180) * Math.PI / 180;
  return {
    start,
    end: {
      x: start.x + size * (closedDirection.x * Math.cos(radians) + swingDirection.x * Math.sin(radians)),
      y: start.y + size * (closedDirection.y * Math.cos(radians) + swingDirection.y * Math.sin(radians))
    }
  };
}

function rotatedObjectPolygon(object) {
  const center = { x: object.x + object.width / 2, y: object.y + object.height / 2 };
  const radians = (Number(object.rotation) || 0) * Math.PI / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return [
    { x: object.x, y: object.y },
    { x: object.x + object.width, y: object.y },
    { x: object.x + object.width, y: object.y + object.height },
    { x: object.x, y: object.y + object.height }
  ].map((point) => {
    const dx = point.x - center.x;
    const dy = point.y - center.y;
    return { x: center.x + dx * cos - dy * sin, y: center.y + dx * sin + dy * cos };
  });
}

function segmentTouchesPolygon(start, end, polygon, clearance = 0) {
  if (pointInPolygon(start, polygon) || pointInPolygon(end, polygon)) return true;
  for (let index = 0; index < polygon.length; index += 1) {
    const edgeStart = polygon[index];
    const edgeEnd = polygon[(index + 1) % polygon.length];
    if (segmentsIntersect(start, end, edgeStart, edgeEnd)) return true;
    if (segmentDistance(start, end, edgeStart, edgeEnd) <= clearance) return true;
  }
  return false;
}

function pointInPolygon(point, polygon) {
  let inside = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
    const a = polygon[index];
    const b = polygon[previous];
    const crosses = (a.y > point.y) !== (b.y > point.y)
      && point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y || Number.EPSILON) + a.x;
    if (crosses) inside = !inside;
  }
  return inside;
}

function segmentsIntersect(a, b, c, d) {
  const cross = (p, q, r) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
  const onSegment = (p, q, r) => q.x >= Math.min(p.x, r.x) - 0.0001
    && q.x <= Math.max(p.x, r.x) + 0.0001
    && q.y >= Math.min(p.y, r.y) - 0.0001
    && q.y <= Math.max(p.y, r.y) + 0.0001;
  const abC = cross(a, b, c);
  const abD = cross(a, b, d);
  const cdA = cross(c, d, a);
  const cdB = cross(c, d, b);
  if (((abC > 0 && abD < 0) || (abC < 0 && abD > 0))
    && ((cdA > 0 && cdB < 0) || (cdA < 0 && cdB > 0))) return true;
  if (Math.abs(abC) < 0.0001 && onSegment(a, c, b)) return true;
  if (Math.abs(abD) < 0.0001 && onSegment(a, d, b)) return true;
  if (Math.abs(cdA) < 0.0001 && onSegment(c, a, d)) return true;
  return Math.abs(cdB) < 0.0001 && onSegment(c, b, d);
}

function segmentDistance(a, b, c, d) {
  if (segmentsIntersect(a, b, c, d)) return 0;
  return Math.min(
    pointToSegmentDistance(a, c, d),
    pointToSegmentDistance(b, c, d),
    pointToSegmentDistance(c, a, b),
    pointToSegmentDistance(d, a, b)
  );
}

function pointToSegmentDistance(point, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSquared = dx * dx + dy * dy;
  if (!lengthSquared) return Math.hypot(point.x - start.x, point.y - start.y);
  const ratio = clamp(((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared, 0, 1);
  return Math.hypot(point.x - (start.x + ratio * dx), point.y - (start.y + ratio * dy));
}

function doorDirectionLabel(direction = "in-left") {
  return {
    "in-left": "左鉸鏈・向內",
    "in-right": "右鉸鏈・向內",
    "out-left": "左鉸鏈・向外",
    "out-right": "右鉸鏈・向外"
  }[direction] || "左鉸鏈・向內";
}

function startFixturePointerDown(event, fixtureId) {
  if (event.button === 1) return;
  if (event.target.closest(".fixture-resize") || event.target.closest(".delete-fixture")) return;
  state.selectedFixtureId = fixtureId;
  state.selectedObjectId = "";
  renderObjectSelects();
  syncSelectedEditor();
  if (state.fixtures.find((item) => item.id === fixtureId)?.locked) {
    renderCanvas();
    return;
  }
  startFixtureDrag(event, fixtureId);
}

function startObjectResize(event, objectId) {
  event.stopPropagation();
  const object = state.objects.find((item) => item.id === objectId);
  if (!object || object.locked) return;
  const canvas = $("#layout-canvas");
  const { scale } = getScale(canvas);
  const startX = event.clientX;
  const startY = event.clientY;
  const startWidth = object.width;
  const startHeight = object.height;
  function move(pointerEvent) {
    object.width = Math.max(10, Math.round((startWidth + (pointerEvent.clientX - startX) / scale) / 5) * 5);
    object.height = Math.max(10, Math.round((startHeight + (pointerEvent.clientY - startY) / scale) / 5) * 5);
    fitObjectInsideMainRoom(object);
    syncSelectedEditor();
    renderCanvas();
  }
  function stop() {
    saveState();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
}

function startObjectRotate(event, objectId) {
  event.preventDefault();
  event.stopPropagation();
  const object = state.objects.find((item) => item.id === objectId);
  if (!object || object.locked) return;
  const canvas = $("#layout-canvas");
  const { scale, offsetX, offsetY } = getScale(canvas);
  const objectEl = canvas.querySelector(`.layout-object[data-id="${objectId}"]`);
  const centerX = offsetX + (object.x + object.width / 2) * scale;
  const centerY = offsetY + (object.y + object.height / 2) * scale;
  const startPoint = canvasPointFromEvent(canvas, event);
  const startPointerAngle = pointerAngle(startPoint.x, startPoint.y, centerX, centerY);
  const startRotation = object.rotation || 0;
  let frame = 0;
  function applyRotationVisual() {
    frame = 0;
    fitObjectInsideMainRoom(object);
    updateLayoutObjectElement(objectEl, object, scale, offsetX, offsetY);
    $("#selected-rotation").value = round1(object.rotation || 0);
  }
  function move(pointerEvent) {
    pointerEvent.preventDefault();
    const currentPoint = canvasPointFromEvent(canvas, pointerEvent);
    const currentPointerAngle = pointerAngle(currentPoint.x, currentPoint.y, centerX, centerY);
    object.rotation = normalizeAngle(startRotation + currentPointerAngle - startPointerAngle);
    if (!frame) frame = requestAnimationFrame(applyRotationVisual);
  }
  function stop() {
    if (frame) {
      cancelAnimationFrame(frame);
      applyRotationVisual();
    }
    renderCanvas();
    saveState();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
}

function pointerAngle(x, y, centerX, centerY) {
  return Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
}

function startZoneResize(event, zoneId) {
  if (event.button === 1) return;
  event.stopPropagation();
  const zone = state.zones.find((item) => item.id === zoneId);
  if (!zone || zone.locked) return;
  const canvas = $("#layout-canvas");
  const { scale } = getScale(canvas);
  const startX = event.clientX;
  const startY = event.clientY;
  const startWidth = zone.width;
  const startHeight = zone.height;
  function move(pointerEvent) {
    zone.width = Math.max(20, Math.round((startWidth + (pointerEvent.clientX - startX) / scale) / 5) * 5);
    zone.height = Math.max(20, Math.round((startHeight + (pointerEvent.clientY - startY) / scale) / 5) * 5);
    renderArea();
    renderCanvas();
  }
  function stop() {
    saveState();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
}

function startZoneDrag(event) {
  if (event.button === 1) return;
  if (event.target.closest(".resize-handle") || event.target.closest(".zone-canvas-delete") || event.target.closest(".zone-lock-toggle")) return;
  const zone = state.zones.find((item) => item.id === event.currentTarget.dataset.zoneId);
  if (!zone || zone.locked) return;
  const canvas = $("#layout-canvas");
  const { scale, offsetX, offsetY } = getScale(canvas);
  const startPoint = canvasPointFromEvent(canvas, event);
  const offsetPointerX = startPoint.x - (offsetX + zone.x * scale);
  const offsetPointerY = startPoint.y - (offsetY + zone.y * scale);
  function move(pointerEvent) {
    const point = canvasPointFromEvent(canvas, pointerEvent);
    zone.x = Math.round(((point.x - offsetX - offsetPointerX) / scale) / 5) * 5;
    zone.y = Math.round(((point.y - offsetY - offsetPointerY) / scale) / 5) * 5;
    renderCanvas();
  }
  function stop() {
    saveState();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
}

function startDrag(event) {
  if (event.button === 1) return;
  if (event.target.classList.contains("delete-object") || event.target.closest(".resize-handle") || event.target.closest(".rotate-handle") || event.target.closest(".object-lock-toggle")) return;
  event.preventDefault();
  event.stopPropagation();
  const object = state.objects.find((item) => item.id === event.currentTarget.dataset.id);
  if (!object) return;
  const canvas = $("#layout-canvas");
  const { scale, offsetX, offsetY } = getScale(canvas);
  const startPoint = canvasPointFromEvent(canvas, event);
  let didMove = false;
  const offsetPointerX = startPoint.x - (offsetX + object.x * scale);
  const offsetPointerY = startPoint.y - (offsetY + object.y * scale);
  state.selectedObjectId = object.id;
  state.selectedObjectIds = [object.id];
  state.selectedFixtureId = "";
  renderObjectSelects();
  syncSelectedEditor();
  document.querySelectorAll(".layout-object").forEach((element) => {
    element.classList.toggle("selected", element.dataset.id === object.id);
  });
  clearTimeout(objectSelectionRenderTimer);
  objectSelectionRenderTimer = setTimeout(() => {
    if (state.selectedObjectId === object.id) renderCanvas();
  }, 500);
  if (object.locked) return;
  function move(pointerEvent) {
    const point = canvasPointFromEvent(canvas, pointerEvent);
    if (Math.hypot(point.x - startPoint.x, point.y - startPoint.y) > 4) {
      didMove = true;
      clearTimeout(objectSelectionRenderTimer);
    }
    const nextX = Math.round(((point.x - offsetX - offsetPointerX) / scale) / 5) * 5;
    const nextY = Math.round(((point.y - offsetY - offsetPointerY) / scale) / 5) * 5;
    const pointerRoomX = (point.x - offsetX) / scale;
    const pointerRoomY = (point.y - offsetY) / scale;
    const targetZone = zoneAtPoint(pointerRoomX, pointerRoomY) || getObjectZone(object);
    object.zoneId = targetZone.id;
    object.x = nextX;
    object.y = nextY;
    clampObjectToZone(object, targetZone);
    renderCanvas();
  }
  function stop() {
    if (didMove) lastObjectPointerDown = { id: "", time: 0 };
    saveState();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
}

function openObjectEditor(objectId) {
  if (!state.objects.some((object) => object.id === objectId)) return;
  state.selectedObjectId = objectId;
  state.selectedObjectIds = [objectId];
  state.selectedFixtureId = "";
  showView("object-view");
  renderObjectSelects();
  syncSelectedEditor();
  setInventoryFormTarget(objectId);
  renderShelfPlanner();
  renderItems();
  saveState();
  $("#object-title")?.scrollIntoView({ block: "start" });
}

function startFixtureDrag(event, fixtureId) {
  if (event.button === 1) return;
  event.preventDefault();
  event.stopPropagation();
  const fixture = state.fixtures.find((item) => item.id === fixtureId);
  if (!fixture || fixture.locked) return;
  const zone = state.zones.find((item) => item.id === fixture.zoneId);
  if (!zone) return;
  const dragTarget = event.currentTarget;
  try {
    dragTarget?.setPointerCapture?.(event.pointerId);
  } catch {}
  const canvas = $("#layout-canvas");
  const scaleData = getScale(canvas);
  moveFixtureToPointer(event);
  function move(pointerEvent) {
    pointerEvent.preventDefault();
    moveFixtureToPointer(pointerEvent);
  }
  function moveFixtureToPointer(pointerEvent) {
    const roomPoint = roomPointFromEvent(canvas, pointerEvent, scaleData);
    const localX = roomPoint.x - zone.x;
    const localY = roomPoint.y - zone.y;
    perimeterToFixtureCenter(fixture, projectPointToPerimeter(localX, localY, zone), zone);
    renderCanvas();
  }
  function stop() {
    try {
      dragTarget?.releasePointerCapture?.(event.pointerId);
    } catch {}
    saveState();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
}

function startFixtureResize(event, fixtureId) {
  if (event.button === 1) return;
  event.stopPropagation();
  const fixture = state.fixtures.find((item) => item.id === fixtureId);
  if (!fixture || fixture.locked) return;
  const zone = state.zones.find((item) => item.id === fixture.zoneId);
  if (!zone) return;
  const canvas = $("#layout-canvas");
  const { scale } = getScale(canvas);
  const startPointer = fixture.side === "top" || fixture.side === "bottom" ? event.clientX : event.clientY;
  const startSize = fixture.size;
  function move(pointerEvent) {
    const currentPointer = fixture.side === "top" || fixture.side === "bottom" ? pointerEvent.clientX : pointerEvent.clientY;
    const sideLength = fixture.side === "top" || fixture.side === "bottom" ? zone.width : zone.height;
    fixture.size = clamp(round1(startSize + (currentPointer - startPointer) / scale), 10, sideLength);
    fixture.offset = clamp(fixture.offset, 0, sideLength - fixture.size);
    renderCanvas();
  }
  function stop() {
    saveState();
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  }
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
}

function fixtureToPerimeter(fixture, zone) {
  const width = zone.width;
  const height = zone.height;
  if (fixture.side === "top") return fixture.offset;
  if (fixture.side === "right") return width + fixture.offset;
  if (fixture.side === "bottom") return width + height + (width - fixture.offset);
  return width + height + width + (height - fixture.offset);
}

function fixtureCenterToPerimeter(fixture, zone) {
  const width = zone.width;
  const height = zone.height;
  const sideLength = fixture.side === "top" || fixture.side === "bottom" ? width : height;
  const size = Math.min(fixture.size, sideLength);
  const centerOffset = clamp(fixture.offset + size / 2, size / 2, sideLength - size / 2);
  if (fixture.side === "top") return centerOffset;
  if (fixture.side === "right") return width + centerOffset;
  if (fixture.side === "bottom") return width + height + (width - centerOffset);
  return width + height + width + (height - centerOffset);
}

function normalizePerimeter(value, zone) {
  const perimeter = (zone.width + zone.height) * 2;
  return ((value % perimeter) + perimeter) % perimeter;
}

function projectPointToPerimeter(localX, localY, zone) {
  const x = clamp(localX, 0, zone.width);
  const y = clamp(localY, 0, zone.height);
  const distances = [
    { side: "top", distance: Math.abs(localY), value: x },
    { side: "right", distance: Math.abs(zone.width - localX), value: zone.width + y },
    { side: "bottom", distance: Math.abs(zone.height - localY), value: zone.width + zone.height + (zone.width - x) },
    { side: "left", distance: Math.abs(localX), value: zone.width + zone.height + zone.width + (zone.height - y) }
  ];
  return distances.sort((a, b) => a.distance - b.distance)[0].value;
}

function perimeterToFixture(fixture, perimeterValue, zone) {
  const width = zone.width;
  const height = zone.height;
  const value = normalizePerimeter(perimeterValue, zone);
  if (value <= width) {
    fixture.side = "top";
    fixture.size = Math.min(fixture.size, width);
    fixture.offset = clamp(value, 0, width - fixture.size);
    return;
  }
  if (value <= width + height) {
    fixture.side = "right";
    fixture.size = Math.min(fixture.size, height);
    fixture.offset = clamp(value - width, 0, height - fixture.size);
    return;
  }
  if (value <= width + height + width) {
    fixture.side = "bottom";
    fixture.size = Math.min(fixture.size, width);
    fixture.offset = clamp(width - (value - width - height), 0, width - fixture.size);
    return;
  }
  fixture.side = "left";
  fixture.size = Math.min(fixture.size, height);
  fixture.offset = clamp(height - (value - width - height - width), 0, height - fixture.size);
}

function perimeterToFixtureCenter(fixture, perimeterValue, zone) {
  const width = zone.width;
  const height = zone.height;
  const value = normalizePerimeter(perimeterValue, zone);
  if (value <= width) {
    setFixtureFromCenter(fixture, "top", value, width);
    return;
  }
  if (value <= width + height) {
    setFixtureFromCenter(fixture, "right", value - width, height);
    return;
  }
  if (value <= width + height + width) {
    setFixtureFromCenter(fixture, "bottom", width - (value - width - height), width);
    return;
  }
  setFixtureFromCenter(fixture, "left", height - (value - width - height - width), height);
}

function setFixtureFromCenter(fixture, side, centerOffset, sideLength) {
  fixture.side = side;
  fixture.size = Math.min(fixture.size, sideLength);
  fixture.offset = clamp(centerOffset - fixture.size / 2, 0, sideLength - fixture.size);
}

function addCustomObject(event) {
  event.preventDefault();
  const name = $("#custom-object-name").value.trim();
  const width = Number($("#custom-object-width").value);
  const height = Number($("#custom-object-height").value);
  if (!name || width < 1 || height < 1) return;
  const zone = selectedObjectPlacementZone();
  state.objects.push(placeObjectInZone({ id: createId("custom"), key: "custom", name, iconUrl: "assets/icons/box.svg", x: zone.x, y: zone.y, width, height, rotation: 0, color: "#ece7d8" }, zone));
  state.selectedObjectId = state.objects[state.objects.length - 1].id;
  $("#custom-object-name").value = "";
  commit();
}

function selectObject(id) {
  state.selectedObjectId = id;
  state.selectedObjectIds = id ? [id] : [];
  state.selectedFixtureId = "";
  syncSelectedEditor();
  renderCanvas();
  setInventoryFormTarget(id);
  renderShelfPlanner();
  renderItems();
  saveState();
}

function selectFixture(id) {
  state.selectedFixtureId = id;
  state.selectedObjectId = "";
  state.selectedObjectIds = [];
  syncSelectedEditor();
  renderCanvas();
  saveState();
}

function selectEditableTarget(value) {
  if (value.startsWith("fixture:")) {
    selectFixture(value.replace("fixture:", ""));
    return;
  }
  selectObject(value.replace("object:", ""));
}

function deleteSelectedTarget() {
  if (state.selectedFixtureId) {
    deleteFixture(state.selectedFixtureId);
    return;
  }
  if (state.selectedObjectId) deleteObject(state.selectedObjectId);
}

function deleteObject(objectId) {
  const object = state.objects.find((item) => item.id === objectId);
  if (object?.locked) {
    $("#save-status").textContent = "物件已鎖定，請先解除鎖定再刪除";
    return;
  }
  const movedItems = state.inventory.filter((item) => item.objectId === objectId);
  if (movedItems.length && !confirm(`刪除家具「${object.name}」？裡面的 ${movedItems.length} 筆物品會先移到暫存區，不會直接刪掉。`)) return;
  state.stagingItems ||= [];
  const stagedAt = new Date().toISOString();
  movedItems.forEach((item) => state.stagingItems.unshift({ ...structuredClone(item), stagedAt, originalObjectName: object.name }));
  state.objects = state.objects.filter((item) => item.id !== objectId);
  state.inventory = state.inventory.filter((item) => item.objectId !== objectId);
  if (movedItems.length) recordActivity("移到暫存區", object, `${movedItems.length} 筆物品等待重新指定位置`);
  state.selectedObjectId = state.objects[0]?.id || "";
  state.selectedObjectIds = state.selectedObjectId ? [state.selectedObjectId] : [];
  state.selectedFixtureId = "";
  commit();
}

function deleteFixture(fixtureId) {
  state.fixtures = state.fixtures.filter((item) => item.id !== fixtureId);
  state.selectedFixtureId = "";
  state.selectedObjectId = state.objects[0]?.id || "";
  state.selectedObjectIds = state.selectedObjectId ? [state.selectedObjectId] : [];
  commit();
}

function selectedObjects() {
  const ids = state.selectedObjectIds?.length ? state.selectedObjectIds : state.selectedObjectId ? [state.selectedObjectId] : [];
  return state.objects.filter((object) => ids.includes(object.id));
}

function rotateSelectedObjects(degrees) {
  const objects = selectedObjects().filter((object) => !object.locked);
  if (!objects.length) return;
  pushUndoSnapshot();
  const group = groupBounds(objects);
  const centerX = group.x + group.width / 2;
  const centerY = group.y + group.height / 2;
  const radians = degrees * Math.PI / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  objects.forEach((object) => {
    const objectCenterX = object.x + object.width / 2;
    const objectCenterY = object.y + object.height / 2;
    const dx = objectCenterX - centerX;
    const dy = objectCenterY - centerY;
    const nextCenterX = centerX + dx * cos - dy * sin;
    const nextCenterY = centerY + dx * sin + dy * cos;
    object.x = round1(nextCenterX - object.width / 2);
    object.y = round1(nextCenterY - object.height / 2);
    object.rotation = normalizeAngle((object.rotation || 0) + degrees);
    fitObjectInsideMainRoom(object);
  });
  state.selectedObjectId = objects[0].id;
  state.selectedObjectIds = objects.map((object) => object.id);
  commit();
}

function groupBounds(objects) {
  const rects = objects.map(objectRect);
  const left = Math.min(...rects.map((rect) => rect.x));
  const top = Math.min(...rects.map((rect) => rect.y));
  const right = Math.max(...rects.map((rect) => rect.x + rect.width));
  const bottom = Math.max(...rects.map((rect) => rect.y + rect.height));
  return { x: left, y: top, width: right - left, height: bottom - top };
}

function clearGroupSelection() {
  state.selectedObjectIds = state.selectedObjectId ? [state.selectedObjectId] : [];
  renderCanvas();
}

function updateGroupControls() {
  const controls = $("#group-controls");
  if (!controls) return;
  const count = state.selectedObjectIds?.length || 0;
  controls.classList.toggle("hidden", count < 2);
  $("#group-count-label").textContent = `已選取 ${count} 個`;
}

function updateSelectedObjectName() {
  const fixture = getSelectedFixture();
  if (fixture) {
    fixture.customName = $("#selected-name").value;
    renderCanvas();
    renderObjectSelects();
    saveState();
    return;
  }
  const object = getSelectedObject();
  if (!object) return;
  object.name = $("#selected-name").value;
  renderCanvas();
  renderObjectSelects();
  renderItems();
  renderStock();
  saveState();
}

function updateSelectedObject() {
  const fixture = getSelectedFixture();
  if (fixture) {
    const size = Number($("#selected-width").value);
    if (Number.isFinite(size) && size > 0) fixture.size = Math.max(10, size);
    if (fixture.type === "door") {
      const angle = Number($("#selected-rotation").value);
      if (Number.isFinite(angle)) fixture.openAngle = clamp(angle, 0, 180);
      fixture.openDirection = $("#selected-door-direction").value;
      fixture.openAngle = getDoorAllowedAngle(fixture, fixture.openAngle);
    }
    syncSelectedEditor();
    renderCanvas();
    saveState();
    return;
  }
  const object = getSelectedObject();
  if (!object) return;
  if (object.locked) {
    syncSelectedEditor();
    $("#save-status").textContent = "物件已鎖定，請先解除鎖定再修改";
    return;
  }
  const width = Number($("#selected-width").value);
  const height = Number($("#selected-height").value);
  const rotation = Number($("#selected-rotation").value);
  if (Number.isFinite(width) && width > 0) object.width = width;
  if (Number.isFinite(height) && height > 0) object.height = height;
  if (Number.isFinite(rotation)) object.rotation = normalizeAngle(rotation);
  fitObjectInsideMainRoom(object);
  commit();
}

function saveSelectedIcon() {
  const object = getSelectedObject();
  if (!object) return;
  const input = $("#selected-icon-url");
  if (!input) return;
  object.iconUrl = input.value.trim();
  commit();
}

function renderObjectSelects() {
  fillObjectOnlySelect($("#object-select"));
  fillEditableTargetSelect($("#selected-object-select"));
}

function fillObjectOnlySelect(select) {
  select.innerHTML = "";
  state.objects.forEach((object) => {
    const option = document.createElement("option");
    option.value = object.id;
    option.textContent = object.name;
    select.appendChild(option);
  });
  select.value = state.selectedObjectId || state.objects[0]?.id || "";
}

function fillEditableTargetSelect(select) {
  select.innerHTML = "";
  const objectGroup = document.createElement("optgroup");
  objectGroup.label = "家具與物件";
  state.objects.forEach((object) => {
    const option = document.createElement("option");
    option.value = `object:${object.id}`;
    option.textContent = object.name;
    objectGroup.appendChild(option);
  });
  select.appendChild(objectGroup);
  const fixtureGroup = document.createElement("optgroup");
  fixtureGroup.label = "門窗與固定設施";
  state.fixtures.forEach((fixture) => {
    const option = document.createElement("option");
    option.value = `fixture:${fixture.id}`;
    option.textContent = fixtureDisplayName(fixture);
    fixtureGroup.appendChild(option);
  });
  select.appendChild(fixtureGroup);
  select.value = state.selectedFixtureId ? `fixture:${state.selectedFixtureId}` : `object:${state.selectedObjectId}`;
}

function syncSelectedEditor() {
  const object = getSelectedObject();
  const fixture = getSelectedFixture();
  $("#selected-object-select").value = fixture ? `fixture:${fixture.id}` : `object:${state.selectedObjectId}`;
  $("#object-select").value = object?.id || state.objects[0]?.id || "";
  $("#selected-name").value = fixture ? fixtureDisplayName(fixture) : object?.name || "";
  $("#selected-width").value = fixture ? fixture.size : object?.width || "";
  $("#selected-width").disabled = !!fixture?.locked || !!object?.locked;
  $("#selected-height").value = fixture ? "" : object?.height || "";
  $("#selected-height").disabled = !!fixture || !!object?.locked;
  const isDoor = fixture?.type === "door";
  $("#selected-rotation-label").textContent = isDoor ? "開門角度" : "角度";
  $("#selected-rotation").value = isDoor ? fixture.openAngle ?? 90 : fixture ? 0 : object?.rotation || 0;
  $("#selected-rotation").min = "0";
  $("#selected-rotation").max = isDoor ? "180" : "359";
  $("#selected-rotation").disabled = (!!fixture && !isDoor) || !!object?.locked;
  $("#selected-door-direction-wrap").classList.toggle("hidden", !isDoor);
  if (isDoor) $("#selected-door-direction").value = fixture.openDirection || "in-left";
  const lockButton = $("#selected-lock-target");
  if (lockButton) {
    const locked = !!fixture?.locked || !!object?.locked;
    lockButton.classList.toggle("active", locked);
    lockButton.textContent = locked ? "已鎖定" : "鎖定目前選取";
    lockButton.disabled = !fixture && !object;
  }
  $("#delete-selected-target").disabled = !!fixture?.locked || !!object?.locked;
  const iconInput = $("#selected-icon-url");
  if (iconInput) iconInput.value = object?.iconUrl || "";
  renderLocationSelect();
}

function getSelectedObject() {
  if (state.selectedFixtureId) return null;
  return state.objects.find((item) => item.id === state.selectedObjectId);
}

function getSelectedFixture() {
  return state.fixtures.find((item) => item.id === state.selectedFixtureId);
}

function fixtureDisplayName(fixture) {
  const label = fixture.type === "custom" ? (fixture.customName || fixtureLabels.custom) : fixtureLabels[fixture.type];
  const zoneName = state.zones.find((zone) => zone.id === fixture.zoneId)?.name || fixture.zoneId;
  return fixture.customName || `${label} / ${zoneName}`;
}

function defaultLocationsForObject(object) {
  if (!object) return ["未指定位置"];
  const name = object.name || "";
  if (object.key?.includes("bed") || name.includes("床")) return ["上面", "床下", "床頭", "床邊"];
  if (object.key?.includes("desk") || name.includes("書桌") || name.includes("桌")) return ["桌面", "抽屜", "桌下", "旁邊"];
  if (object.key?.includes("wardrobe") || name.includes("衣櫃") || name.includes("櫃")) return ["上層", "中層", "下層", "吊掛區"];
  if (object.key?.includes("shelf4") || name.includes("4層") || name.includes("四層")) return defaultShelfLayers();
  if (object.key?.includes("shelf") || name.includes("架") || name.includes("層")) return ["上層", "中層", "下層", "旁邊"];
  return ["上面", "裡面", "下方", "旁邊"];
}

function locationsForObject(objectId) {
  const object = state.objects.find((item) => item.id === objectId);
  const saved = state.objectLocations?.[objectId] || [];
  return [...new Set([...(object?.storageLayers || defaultLocationsForObject(object)), ...saved])];
}

function getItemFormObjectId() {
  return $("#item-object-select")?.value || state.selectedObjectId;
}

function setInventoryFormTarget(objectId, location = "", parentId = "") {
  if (!objectId || editingInventoryItemId) return;
  const object = state.objects.find((item) => item.id === objectId);
  if (!object) return;
  renderItemObjectSelect();
  $("#item-object-select").value = object.id;
  renderLocationSelect();
  const locations = locationsForObject(object.id);
  const nextLocation = location && locations.includes(location) ? location : locations[0] || "未指定位置";
  if (nextLocation && ![...$("#location-select").options].some((option) => option.value === nextLocation)) {
    state.objectLocations ||= {};
    state.objectLocations[object.id] ||= [];
    state.objectLocations[object.id].push(nextLocation);
    renderLocationSelect();
  }
  $("#location-select").value = nextLocation;
  renderParentContainerSelect();
  $("#parent-container-select").value = parentId || "";
  renderSelectedStoragePath(object, nextLocation, parentId ? state.inventory.find((item) => item.id === parentId) : null);
  syncBulkEntrySelects();
  ["batch-location-select", "paste-location-select"].forEach((id) => {
    const select = $(`#${id}`);
    if (select && [...select.options].some((option) => option.value === nextLocation)) select.value = nextLocation;
  });
}

function renderItemObjectSelect() {
  const select = $("#item-object-select");
  if (!select) return;
  const previous = editingInventoryItemId ? select.value : state.selectedObjectId;
  select.innerHTML = state.objects.map((object) => `<option value="${object.id}">${escapeHtml(object.name)}</option>`).join("");
  if (state.objects.some((object) => object.id === previous)) select.value = previous;
}

function renderLocationSelect() {
  const select = $("#location-select");
  if (!select) return;
  const previous = select.value;
  select.innerHTML = "";
  locationsForObject(getItemFormObjectId()).forEach((location) => {
    const option = document.createElement("option");
    option.value = location;
    option.textContent = location;
    select.appendChild(option);
  });
  if ([...select.options].some((option) => option.value === previous)) select.value = previous;
}

function renderParentContainerSelect() {
  const select = $("#parent-container-select");
  if (!select) return;
  const previous = select.value;
  select.innerHTML = `<option value="">不放入容器</option>`;
  state.inventory
    .filter((item) => item.objectId === getItemFormObjectId() && item.isContainer && item.id !== editingInventoryItemId)
    .sort((a, b) => (a.order || 999) - (b.order || 999))
    .forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = `${item.location || "未指定位置"} / ${item.name}`;
      select.appendChild(option);
    });
  if ([...select.options].some((option) => option.value === previous)) select.value = previous;
}

function addLocation() {
  const name = $("#new-location").value.trim();
  const objectId = getItemFormObjectId();
  if (!name || !objectId) return;
  state.objectLocations ||= {};
  state.objectLocations[objectId] ||= [];
  if (!state.objectLocations[objectId].includes(name)) {
    state.objectLocations[objectId].push(name);
  }
  $("#new-location").value = "";
  renderLocationSelect();
  saveState();
}

function fitObjectInsideMainRoom(object) {
  clampObjectToZone(object);
}

function normalizeAngle(value) {
  const angle = round1(value) % 360;
  return angle < 0 ? round1(angle + 360) : angle;
}

function renderCategorySelects() {
  fillCategorySelect($("#category-select"));
  fillCategorySelect($("#stock-category"));
  fillCategorySelect($("#label-parent-select"));
  renderSubcategories("category-select", "subcategory-select");
  renderSubcategories("stock-category", "stock-subcategory");
}

function setLabelMode(mode) {
  labelManager.mode = mode;
  renderLabelManager();
}

function renderLabelManager() {
  const grid = $("#label-grid");
  if (!grid) return;
  $("#manage-category").classList.toggle("active", labelManager.mode === "category");
  $("#manage-subcategory").classList.toggle("active", labelManager.mode === "subcategory");
  $("#label-parent-wrap").classList.toggle("hidden", labelManager.mode === "category");
  fillCategorySelect($("#label-parent-select"));
  $("#label-parent-select").value = labelManager.selectedCategory;
  grid.innerHTML = "";

  const labels = labelManager.mode === "category"
    ? Object.keys(state.categories).map((name) => ({ name, icon: state.categories[name]?.[0]?.icon || inferIconForName(name) || "□" }))
    : (state.categories[labelManager.selectedCategory] || []);

  labels.forEach((label) => {
    const button = document.createElement("button");
    button.className = "label-tile";
    const isActive = labelManager.mode === "category"
      ? label.name === labelManager.selectedCategory
      : label.name === labelManager.selectedSubcategory;
    button.classList.toggle("active", isActive);
    button.type = "button";
    button.innerHTML = `<span class="label-icon">${escapeHtml(label.icon || inferIconForName(label.name) || "□")}</span><span>${escapeHtml(label.name)}</span>`;
    button.addEventListener("click", () => selectManagedLabel(label));
    grid.appendChild(button);
  });

  renderIconPicker();
  const currentName = labelManager.mode === "category" ? labelManager.selectedCategory : labelManager.selectedSubcategory;
  $("#label-name-input").value = currentName || "";
}

function selectManagedLabel(label) {
  if (labelManager.mode === "category") {
    labelManager.selectedCategory = label.name;
    labelManager.selectedSubcategory = state.categories[label.name]?.[0]?.name || "";
  } else {
    labelManager.selectedSubcategory = label.name;
  }
  labelManager.selectedIcon = label.icon || inferIconForName(label.name) || "□";
  renderLabelManager();
}

function renderIconPicker() {
  const picker = $("#icon-picker");
  if (!picker) return;
  picker.innerHTML = "";
  labelIconChoices.forEach((icon) => {
    const button = document.createElement("button");
    button.className = "icon-choice";
    button.classList.toggle("active", icon === labelManager.selectedIcon);
    button.type = "button";
    button.textContent = icon;
    button.addEventListener("click", () => {
      labelManager.selectedIcon = icon;
      renderIconPicker();
    });
    picker.appendChild(button);
  });
  picker.querySelector(".icon-choice.active")?.scrollIntoView({ block: "nearest", inline: "nearest" });
}

function inferIconForName(name) {
  const text = String(name || "").trim().toLowerCase();
  if (!text) return "";
  const matches = [];
  iconKeywordRules.forEach((rule, ruleIndex) => {
    rule.words.forEach((word) => {
      const keyword = word.toLowerCase();
      if (text.includes(keyword)) matches.push({ icon: rule.icon, weight: keyword.length, ruleIndex });
    });
  });
  matches.sort((a, b) => b.weight - a.weight || a.ruleIndex - b.ruleIndex);
  return matches[0]?.icon || "";
}

function suggestManagedLabelIcon() {
  const icon = inferIconForName($("#label-name-input").value);
  if (!icon) return;
  labelManager.selectedIcon = icon;
  renderIconPicker();
}

function suggestIconForInput(nameInputId, iconInputId) {
  const icon = inferIconForName($(`#${nameInputId}`).value);
  if (icon) $(`#${iconInputId}`).value = icon;
}

function toggleInlineIconPicker() {
  const picker = $("#inline-icon-picker");
  if (!picker) return;
  if (!picker.children.length) renderInlineIconPicker();
  picker.classList.toggle("hidden");
}

function toggleSideIconPicker() {
  const picker = $("#side-icon-picker");
  if (!picker) return;
  if (!picker.children.length) renderSideIconPicker();
  picker.classList.toggle("hidden");
}

function renderInlineIconPicker() {
  const picker = $("#inline-icon-picker");
  if (!picker) return;
  picker.innerHTML = "";
  labelIconChoices.forEach((icon) => {
    const button = document.createElement("button");
    button.className = "icon-choice";
    button.type = "button";
    button.textContent = icon;
    button.addEventListener("click", () => {
      $("#new-subcategory-icon-inline").value = icon;
      picker.classList.add("hidden");
      $("#new-subcategory-inline").focus();
    });
    picker.appendChild(button);
  });
}

function renderSideIconPicker() {
  const picker = $("#side-icon-picker");
  if (!picker) return;
  picker.innerHTML = "";
  labelIconChoices.forEach((icon) => {
    const button = document.createElement("button");
    button.className = "icon-choice";
    button.type = "button";
    button.textContent = icon;
    button.addEventListener("click", () => {
      $("#new-subcategory-icon").value = icon;
      picker.classList.add("hidden");
      $("#new-subcategory").focus();
    });
    picker.appendChild(button);
  });
}

function saveManagedLabel() {
  const newName = $("#label-name-input").value.trim();
  const icon = labelManager.selectedIcon || inferIconForName(name) || "□";
  if (!newName) return;

  if (labelManager.mode === "category") {
    const oldName = labelManager.selectedCategory;
    if (!state.categories[oldName]) state.categories[oldName] = [];
    if (newName !== oldName) {
      state.categories[newName] = state.categories[oldName];
      delete state.categories[oldName];
      state.inventory.forEach((item) => {
        if (item.category === oldName) item.category = newName;
      });
      labelManager.selectedCategory = newName;
    }
    if (!state.categories[newName].length) state.categories[newName].push({ name: "未分類", icon: icon || "□" });
    state.categories[newName][0].icon = icon;
  } else {
    const category = $("#label-parent-select").value || labelManager.selectedCategory;
    const oldName = labelManager.selectedSubcategory;
    const list = state.categories[category] || [];
    const target = list.find((item) => item.name === oldName) || list[0];
    if (target) {
      state.inventory.forEach((item) => {
        if (item.category === category && item.subcategory === target.name) item.subcategory = newName;
      });
      target.name = newName;
      target.icon = icon;
    } else {
      list.push({ name: newName, icon });
      state.categories[category] = list;
    }
    labelManager.selectedCategory = category;
    labelManager.selectedSubcategory = newName;
  }
  renderCategorySelects();
  renderItems();
  renderStock();
  saveState();
}

function ensureUncategorizedCategory() {
  if (!state.categories["未分類"]) state.categories["未分類"] = [{ name: "未分類", icon: "□" }];
  if (!state.categories["未分類"].some((item) => item.name === "未分類")) {
    state.categories["未分類"].unshift({ name: "未分類", icon: "□" });
  }
}

function ensureUncategorizedSubcategory(category) {
  if (!state.categories[category]) state.categories[category] = [];
  if (!state.categories[category].some((item) => item.name === "未分類")) {
    state.categories[category].push({ name: "未分類", icon: "□" });
  }
}

function deleteManagedLabel() {
  if (labelManager.mode === "category") {
    const category = labelManager.selectedCategory;
    if (!category || !state.categories[category]) return;
    if (Object.keys(state.categories).length <= 1) {
      $("#save-status").textContent = "至少要保留一個大標籤";
      return;
    }
    if (!confirm(`刪除大標籤「${category}」？原本屬於此大標籤的物品會移到「未分類」。`)) return;
    ensureUncategorizedCategory();
    state.inventory.forEach((item) => {
      if (item.category === category) {
        item.category = "未分類";
        item.subcategory = "未分類";
      }
    });
    delete state.categories[category];
    labelManager.selectedCategory = Object.keys(state.categories)[0] || "未分類";
    labelManager.selectedSubcategory = state.categories[labelManager.selectedCategory]?.[0]?.name || "未分類";
    $("#save-status").textContent = `已刪除大標籤 ${category}`;
  } else {
    const category = $("#label-parent-select").value || labelManager.selectedCategory;
    const subcategory = labelManager.selectedSubcategory;
    const list = state.categories[category] || [];
    const targetIndex = list.findIndex((item) => item.name === subcategory);
    if (!category || targetIndex < 0) return;
    if (!confirm(`刪除小標籤「${subcategory}」？原本屬於此小標籤的物品會移到「未分類」。`)) return;
    list.splice(targetIndex, 1);
    ensureUncategorizedSubcategory(category);
    state.inventory.forEach((item) => {
      if (item.category === category && item.subcategory === subcategory) item.subcategory = "未分類";
    });
    labelManager.selectedCategory = category;
    labelManager.selectedSubcategory = state.categories[category][0]?.name || "未分類";
    $("#save-status").textContent = `已刪除小標籤 ${subcategory}`;
  }
  renderCategorySelects();
  renderLabelManager();
  renderItems();
  renderStock();
  saveState();
}

function addCategoryInline() {
  const name = $("#new-category-inline").value.trim();
  if (!name || state.categories[name]) return;
  state.categories[name] = [{ name: "未分類", icon: "□" }];
  $("#new-category-inline").value = "";
  renderCategorySelects();
  $("#category-select").value = name;
  renderSubcategories("category-select", "subcategory-select");
  saveState();
}

function addSubcategoryInline() {
  const category = $("#category-select").value;
  const name = $("#new-subcategory-inline").value.trim();
  const icon = $("#new-subcategory-icon-inline").value.trim() || inferIconForName(name) || "□";
  if (!category || !name) return;
  if (!state.categories[category].some((item) => item.name === name)) {
    state.categories[category].push({ name, icon });
  }
  $("#new-subcategory-inline").value = "";
  $("#new-subcategory-icon-inline").value = "";
  renderSubcategories("category-select", "subcategory-select");
  $("#subcategory-select").value = name;
  saveState();
}

function fillCategorySelect(select) {
  const previous = select.value;
  select.innerHTML = "";
  Object.keys(state.categories).forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });
  if (state.categories[previous]) select.value = previous;
}

function renderSubcategories(categoryId, subcategoryId) {
  const category = $(`#${categoryId}`).value;
  const select = $(`#${subcategoryId}`);
  const previous = select.value;
  select.innerHTML = "";
  (state.categories[category] || []).forEach((subcategory) => {
    const option = document.createElement("option");
    option.value = subcategory.name;
    option.textContent = `${subcategory.icon}  ${subcategory.name}`;
    select.appendChild(option);
  });
  if ((state.categories[category] || []).some((item) => item.name === previous)) select.value = previous;
}

function addItem(event) {
  event.preventDefault();
  const name = $("#item-name").value.trim();
  const count = Number($("#item-count").value);
  const targetObjectId = getItemFormObjectId();
  if (!name || count < 1 || !targetObjectId) return;
  const existing = state.inventory.find((item) => item.id === editingInventoryItemId);
  const previous = existing ? { ...existing } : null;
  const itemData = {
    id: existing?.id || createId("item"),
    objectId: targetObjectId,
    location: $("#location-select").value,
    parentId: $("#parent-container-select").value || "",
    order: Number($("#item-order").value) || 1,
    isContainer: $("#item-is-container").checked,
    category: $("#category-select").value,
    subcategory: $("#subcategory-select").value,
    name,
    count,
    trackExpiry: $("#item-track-expiry").checked,
    expiryDate: $("#item-track-expiry").checked ? $("#item-expiry-date").value : "",
    expiryWarningDays: Math.max(0, Number($("#item-expiry-warning-days").value) || 30),
    trackUsage: $("#item-track-usage").checked,
    usageDaysPerUnit: $("#item-track-usage").checked ? Math.max(0, Number($("#item-usage-days").value) || 0) : 0,
    usageStartDate: $("#item-track-usage").checked ? ($("#item-usage-start-date").value || localDateString()) : "",
    purchaseWarningDays: Math.max(0, Number($("#item-purchase-warning-days").value) || 7),
    trackLowStock: $("#item-track-low-stock").checked,
    lowStockThreshold: Math.max(0, Number($("#item-low-stock-threshold").value) || 0),
    addedAt: existing?.addedAt || localDateString()
  };
  if (existing) {
    Object.assign(existing, itemData);
    if (existing.isContainer && previous.objectId !== existing.objectId) moveContainerChildren(existing.id, existing.objectId);
    const type = previous.objectId !== existing.objectId ? "移動位置" : previous.count !== existing.count ? (existing.count > previous.count ? "數量增加" : "數量減少") : "修改物品";
    recordActivity(type, existing, `${describeItemLocation(previous)} → ${describeItemLocation(existing)}`);
  } else {
    state.inventory.push(itemData);
    recordActivity("新增物品", itemData, describeItemLocation(itemData));
  }
  resetInventoryForm();
  inventoryAlertDismissed = false;
  commit();
}

function syncInventoryOptionFields() {
  $("#item-expiry-fields").classList.toggle("hidden", !$("#item-track-expiry").checked);
  $("#item-usage-fields").classList.toggle("hidden", !$("#item-track-usage").checked);
  $("#item-low-stock-fields").classList.toggle("hidden", !$("#item-track-low-stock").checked);
  if ($("#item-track-usage").checked && !$("#item-usage-start-date").value) {
    $("#item-usage-start-date").value = localDateString();
  }
}

function suggestExpiryTrackingForCategory() {
  if (editingInventoryItemId) return;
  const category = $("#category-select").value;
  const shouldTrack = ["食品", "藥品", "醫療", "乾糧"].some((key) => category.includes(key));
  $("#item-track-expiry").checked = shouldTrack;
  syncInventoryOptionFields();
}

function editInventoryItem(itemId) {
  const item = state.inventory.find((candidate) => candidate.id === itemId);
  if (!item) return;
  editingInventoryItemId = item.id;
  state.selectedObjectId = item.objectId;
  state.selectedObjectIds = [item.objectId];
  if (!$("#object-view").classList.contains("active")) showView("object-view");
  renderItemObjectSelect();
  $("#item-object-select").value = item.objectId;
  renderLocationSelect();
  $("#location-select").value = item.location || "";
  renderParentContainerSelect();
  $("#parent-container-select").value = item.parentId || "";
  $("#item-order").value = item.order || 1;
  $("#item-is-container").checked = !!item.isContainer;
  $("#category-select").value = item.category;
  renderSubcategories("category-select", "subcategory-select");
  $("#subcategory-select").value = item.subcategory;
  $("#item-name").value = item.name;
  $("#item-count").value = item.count;
  $("#item-track-expiry").checked = !!item.trackExpiry;
  $("#item-expiry-date").value = item.expiryDate || "";
  $("#item-expiry-warning-days").value = item.expiryWarningDays ?? 30;
  $("#item-track-usage").checked = !!item.trackUsage;
  $("#item-usage-days").value = item.usageDaysPerUnit || "";
  $("#item-usage-start-date").value = item.usageStartDate || item.addedAt || localDateString();
  $("#item-purchase-warning-days").value = item.purchaseWarningDays ?? 7;
  $("#item-track-low-stock").checked = !!item.trackLowStock;
  $("#item-low-stock-threshold").value = item.lowStockThreshold ?? 1;
  $("#save-inventory-item").textContent = "儲存修改";
  $("#cancel-inventory-edit").classList.remove("hidden");
  syncInventoryOptionFields();
  $("#item-form").scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetInventoryForm() {
  editingInventoryItemId = "";
  setInventoryFormTarget(state.selectedObjectId);
  $("#item-name").value = "";
  $("#item-count").value = "1";
  $("#item-order").value = "1";
  $("#item-is-container").checked = false;
  $("#item-track-expiry").checked = false;
  $("#item-expiry-date").value = "";
  $("#item-expiry-warning-days").value = "30";
  $("#item-track-usage").checked = false;
  $("#item-usage-days").value = "";
  $("#item-usage-start-date").value = localDateString();
  $("#item-purchase-warning-days").value = "7";
  $("#item-track-low-stock").checked = false;
  $("#item-low-stock-threshold").value = "1";
  $("#save-inventory-item").textContent = "新增物品紀錄";
  $("#cancel-inventory-edit").classList.add("hidden");
  syncInventoryOptionFields();
}

function setEntryMode(mode) {
  const forms = { single: "item-form", batch: "batch-item-form", paste: "paste-item-form" };
  document.querySelectorAll("[data-entry-mode]").forEach((button) => button.classList.toggle("active", button.dataset.entryMode === mode));
  Object.entries(forms).forEach(([key, id]) => $(`#${id}`).classList.toggle("hidden", key !== mode));
  syncBulkEntrySelects();
  if (mode === "batch") $("#batch-item-name").focus();
  if (mode === "paste") $("#paste-items-text").focus();
}

function syncBulkEntrySelects() {
  ["batch-location-select", "paste-location-select"].forEach((id) => {
    const select = $(`#${id}`);
    if (!select) return;
    const previous = select.value;
    select.innerHTML = locationsForObject(state.selectedObjectId).map((location) => `<option value="${escapeHtml(location)}">${escapeHtml(location)}</option>`).join("");
    if ([...select.options].some((option) => option.value === previous)) select.value = previous;
  });
  fillCategorySelect($("#batch-category-select"));
  renderSubcategories("batch-category-select", "batch-subcategory-select");
}

function addBatchItem(event) {
  event.preventDefault();
  const name = $("#batch-item-name").value.trim();
  const count = Math.max(1, Number($("#batch-item-count").value) || 1);
  if (!name || !state.selectedObjectId) return;
  const item = createSimpleInventoryItem({
    name,
    count,
    location: $("#batch-location-select").value,
    category: $("#batch-category-select").value,
    subcategory: $("#batch-subcategory-select").value
  });
  state.inventory.push(item);
  recordActivity("批次新增", item, describeItemLocation(item));
  const line = document.createElement("span");
  line.textContent = `已加入 ${name} x ${count}`;
  $("#batch-added-list").prepend(line);
  $("#batch-item-name").value = "";
  $("#batch-item-count").value = "1";
  commit();
  setEntryMode("batch");
}

function addPastedItems(event) {
  event.preventDefault();
  const lines = $("#paste-items-text").value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (!lines.length || !state.selectedObjectId) return;
  let added = 0;
  lines.forEach((line) => {
    const [nameRaw, countRaw, categoryRaw, subcategoryRaw] = line.split(/[,，\t]/).map((part) => part.trim());
    if (!nameRaw) return;
    const category = categoryRaw || inferCategoryForItem(nameRaw);
    ensureCategoryAndSubcategory(category, subcategoryRaw || "未分類");
    const item = createSimpleInventoryItem({
      name: nameRaw,
      count: Math.max(1, Number(countRaw) || 1),
      location: $("#paste-location-select").value,
      category,
      subcategory: subcategoryRaw || "未分類"
    });
    state.inventory.push(item);
    recordActivity("清單貼上", item, "貼上建立");
    added += 1;
  });
  $("#paste-items-text").value = "";
  commit();
  $("#save-status").textContent = `已貼上新增 ${added} 筆`;
}

function createSimpleInventoryItem({ name, count, location, category, subcategory }) {
  return {
    id: createId("item"),
    objectId: state.selectedObjectId,
    location: location || "未指定",
    parentId: "",
    order: state.inventory.filter((item) => item.objectId === state.selectedObjectId).length + 1,
    isContainer: false,
    category,
    subcategory,
    name,
    count,
    trackExpiry: false,
    trackUsage: false,
    trackLowStock: false,
    addedAt: localDateString()
  };
}

function inferCategoryForItem(name) {
  const text = String(name || "");
  if (["\u7b46", "\u81a0", "\u526a", "\u6587\u5177"].some((key) => text.includes(key))) return "\u6587\u5177";
  if (["\u85e5", "OK", "\u7e43", "\u91ab\u7642"].some((key) => text.includes(key))) return "\u91ab\u7642";
  if (["\u6ce1\u9eb5", "\u98f2\u6599", "\u9905", "\u98df\u54c1"].some((key) => text.includes(key))) return "\u98df\u54c1";
  if (["\u8863", "\u8932", "\u96e8\u8863", "\u624b\u5957", "\u978b", "\u885b\u751f\u7d19", "\u6e05\u6f54"].some((key) => text.includes(key))) return "\u65e5\u7528\u54c1";
  return "\u6536\u7d0d";
}

function ensureCategoryAndSubcategory(category, subcategory) {
  state.categories[category] ||= [];
  if (!state.categories[category].some((item) => item.name === subcategory)) {
    state.categories[category].push({ name: subcategory, icon: inferIconForName(subcategory) || "□" });
  }
}

function renderGlobalSearch() {
  const input = $("#global-search-input");
  const container = $("#global-search-results");
  const query = normalizeSearchText(input.value);
  if (!query) {
    container.classList.add("hidden");
    return;
  }
  const aliases = { "雨": ["雨衣", "雨傘", "雨鞋"], "紙": ["衛生紙", "抽取式衛生紙"], "筆": ["鉛筆", "麥克筆"] };
  const expanded = [query, ...Object.entries(aliases).filter(([key]) => query.includes(key)).flatMap(([, words]) => words.map(normalizeSearchText))];
  const results = state.inventory.filter((item) => {
    const object = state.objects.find((candidate) => candidate.id === item.objectId);
    const parent = item.parentId ? state.inventory.find((candidate) => candidate.id === item.parentId) : null;
    const haystack = normalizeSearchText([item.name, item.category, item.subcategory, item.location, object?.name, parent?.name].join(" "));
    return expanded.some((term) => fuzzyIncludes(haystack, term));
  }).slice(0, 30);
  container.innerHTML = results.length ? results.map((item) => {
    const object = state.objects.find((candidate) => candidate.id === item.objectId);
    return `<button class="search-result-button" type="button" data-search-item="${item.id}"><span>${getSubcategoryIcon(item.category, item.subcategory)}</span><span><b>${escapeHtml(item.name)} x ${item.count}</b><small>${escapeHtml(buildItemPath(item))}${object ? ` · ${escapeHtml(object.name)}` : ""}</small></span></button>`;
  }).join("") : `<div class="empty-state">找不到「${escapeHtml(input.value)}」相關物品</div>`;
  container.classList.remove("hidden");
  container.querySelectorAll("[data-search-item]").forEach((button) => button.addEventListener("click", () => locateInventoryItem(button.dataset.searchItem)));
}

function normalizeSearchText(value) {
  return String(value || "").toLowerCase().replace(/[\s_-]/g, "");
}

function fuzzyIncludes(text, query) {
  if (text.includes(query)) return true;
  let index = 0;
  for (const character of text) if (character === query[index]) index += 1;
  return index === query.length;
}

function buildItemPath(item) {
  const object = state.objects.find((candidate) => candidate.id === item.objectId);
  const chain = [];
  let parent = item.parentId ? state.inventory.find((candidate) => candidate.id === item.parentId) : null;
  const visited = new Set();
  while (parent && !visited.has(parent.id)) {
    visited.add(parent.id);
    chain.unshift(parent.name);
    parent = parent.parentId ? state.inventory.find((candidate) => candidate.id === parent.parentId) : null;
  }
  return [state.zones.find((zone) => zone.id === object?.zoneId)?.name, object?.name, item.location, ...chain, item.name].filter(Boolean).join(" › ");
}

function locateInventoryItem(itemId) {
  const item = state.inventory.find((candidate) => candidate.id === itemId);
  if (!item) return;
  state.selectedObjectId = item.objectId;
  state.selectedFixtureId = "";
  $("#global-search-results").classList.add("hidden");
  $("#stock-keyword").value = item.name;
  $("#stock-category").value = item.category || "";
  renderSubcategories("stock-category", "stock-subcategory");
  $("#stock-subcategory").value = item.subcategory || "";
  showView("stock-view");
  renderAll();
  requestAnimationFrame(() => {
    const card = document.querySelector(`[data-stock-item="${item.id}"]`);
    card?.classList.add("highlight-stock");
    card?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function moveContainerChildren(containerId, objectId) {
  state.inventory.filter((item) => item.parentId === containerId).forEach((child) => {
    child.objectId = objectId;
    if (child.isContainer) moveContainerChildren(child.id, objectId);
  });
}

function describeItemLocation(item) {
  const object = state.objects.find((candidate) => candidate.id === item.objectId);
  return `${object?.name || "未知物件"} / ${item.location || "未指定"}`;
}

function deleteInventoryItem(itemId) {
  const item = state.inventory.find((candidate) => candidate.id === itemId);
  if (!item || !confirm(`移到資源回收桶：${item.name}${item.isContainer ? "？容器內物品會一起放入回收桶，7 天後才會永久刪除。" : "？7 天後才會永久刪除。"}`)) return;
  const ids = new Set([itemId]);
  let changed = true;
  while (changed) {
    changed = false;
    state.inventory.forEach((candidate) => {
      if (candidate.parentId && ids.has(candidate.parentId) && !ids.has(candidate.id)) {
        ids.add(candidate.id);
        changed = true;
      }
    });
  }
  const removedItems = state.inventory.filter((candidate) => ids.has(candidate.id));
  state.deletedItems ||= [];
  const deletedAt = new Date().toISOString();
  removedItems.forEach((removed) => state.deletedItems.unshift({ ...structuredClone(removed), deletedAt, purgeAfter: addDaysIso(deletedAt, 7) }));
  purgeExpiredDeletedItems();
  recordActivity("移到回收桶", item, `保留 7 天，共 ${ids.size} 筆`);
  state.inventory = state.inventory.filter((candidate) => !ids.has(candidate.id));
  commit();
}

function sceneSnapshotForSave() {
  const snapshot = structuredClone(state);
  delete snapshot.sceneSnapshots;
  return snapshot;
}

function rememberCurrentSceneSnapshot() {
  state.sceneSnapshots ||= {};
  state.sceneSnapshots[state.sceneKey] = sceneSnapshotForSave();
}

function switchScene(sceneKey) {
  if (!sceneKey || sceneKey === state.sceneKey) return;
  rememberCurrentSceneSnapshot();
  const snapshots = state.sceneSnapshots || {};
  if (snapshots[sceneKey]) {
    const allSnapshots = { ...snapshots };
    state = normalizeState({ ...structuredClone(snapshots[sceneKey]), sceneSnapshots: allSnapshots });
    state.sceneKey = sceneKey;
    syncControlsFromState();
    renderAll();
    requestAnimationFrame(ensureCanvasContentVisible);
    saveState();
    $("#save-status").textContent = `已切換到${sceneDisplayName(sceneKey)}，並保留其他場景資料`;
    return;
  }
  buildFreshScene(sceneKey, snapshots);
}

function sceneDisplayName(sceneKey) {
  return $("#scene-select")?.querySelector(`option[value="${sceneKey}"]`)?.textContent?.trim() || sceneKey;
}

function buildFreshScene(sceneKey, sceneSnapshots = state.sceneSnapshots || {}) {
  const preset = scenePresets[sceneKey];
  const keep = {
    uiStyle: state.uiStyle,
    fontFamily: state.fontFamily,
    fontScale: state.fontScale,
    personalization: structuredClone(state.personalization || {}),
    appearanceProfiles: structuredClone(state.appearanceProfiles || {}),
    activeAppearanceProfile: state.activeAppearanceProfile || "",
    sidebarAutoHide: !!state.sidebarAutoHide,
    brand: structuredClone(state.brand || getDefaultState().brand),
    viewNames: structuredClone(state.viewNames || getDefaultState().viewNames),
    sceneSnapshots
  };
  state = normalizeState({ ...getDefaultState(), ...keep, sceneKey, roomWidth: preset.roomWidth, roomHeight: preset.roomHeight, tileCols: preset.tileCols, tileRows: preset.tileRows, tileWidth: preset.tileWidth, tileHeight: preset.tileHeight, tilePreset: detectTilePresetFor(preset.tileWidth, preset.tileHeight), zones: defaultZones(sceneKey, preset), fixtures: defaultFixtures(sceneKey, preset) });
  if (sceneKey === "home") {
    state.objects = [
      { ...makeObject("bed", 380, 35), zoneId: "bedroom-zone" },
      { ...makeObject("desk", 40, 40), zoneId: "main-room" },
      { ...makeObject("wardrobe", 470, 210), zoneId: "bedroom-zone" },
      { ...customBaseObject("fridge-home", "冰箱", "assets/icons/fridge.svg", 35, 340, 70, 70, "#c9e7ef"), zoneId: "kitchen-zone" }
    ];
  }
  if (sceneKey === "factory") state.objects = [customBaseObject("machine-1", "機台", "assets/icons/rack.svg", 80, 80, 260, 200, "#cdddea")];
  if (sceneKey === "classroom") state.objects = [customBaseObject("teacher-desk", "講桌", "assets/icons/desk.svg", 300, 55, 120, 60, "#d6e7f5")];
  state.selectedObjectId = state.objects[0]?.id || "";
  state.selectedObjectIds = state.selectedObjectId ? [state.selectedObjectId] : [];
  state.objectLocations = {};
  syncControlsFromState();
  renderAll();
  requestAnimationFrame(ensureCanvasContentVisible);
  saveState();
  $("#save-status").textContent = `已建立${sceneDisplayName(sceneKey)}基礎環境`;
}

function addDaysIso(value, days) {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function purgeExpiredDeletedItems() {
  const now = Date.now();
  state.deletedItems = (state.deletedItems || []).filter((item) => !item.purgeAfter || new Date(item.purgeAfter).getTime() > now);
}

function recordActivity(type, item, detail = "") {
  state.activityLog ||= [];
  state.activityLog.unshift({ id: createId("log"), type, itemId: item?.id || "", itemName: item?.name || "", detail, time: new Date().toISOString() });
  state.activityLog = state.activityLog.slice(0, 300);
}

function addCategory(event) {
  event.preventDefault();
  const name = $("#new-category").value.trim();
  if (!name || state.categories[name]) return;
  state.categories[name] = [{ name: "未分類", icon: "□" }];
  $("#new-category").value = "";
  commit();
}

function addSubcategory(event) {
  event.preventDefault();
  const category = $("#category-select").value;
  const name = $("#new-subcategory").value.trim();
  const icon = $("#new-subcategory-icon").value.trim() || inferIconForName(name) || "□";
  if (!category || !name) return;
  if (!state.categories[category].some((item) => item.name === name)) state.categories[category].push({ name, icon });
  $("#new-subcategory").value = "";
  $("#new-subcategory-icon").value = "";
  commit();
  $("#subcategory-select").value = name;
}

function isShelfObject(object) {
  return !!object && (object.key?.includes("shelf") || object.key?.includes("rack") || object.name?.includes("架") || object.name?.includes("櫃") || object.name?.includes("層"));
}

function defaultShelfLayers() {
  return ["頂部平台", "最上層", "第二層", "第三層", "最下層"];
}

function shelfLayerNames(object = getSelectedObject()) {
  if (!object) return defaultShelfLayers();
  if (!Array.isArray(object.storageLayers) || !object.storageLayers.length) object.storageLayers = defaultLocationsForObject(object);
  return object.storageLayers;
}

function ensureObjectStorageLayers(object) {
  if (!object) return [];
  if (!Array.isArray(object.storageLayers) || !object.storageLayers.length) object.storageLayers = defaultLocationsForObject(object);
  return object.storageLayers;
}

function renderShelfPlanner() {
  const panel = $("#shelf-planner");
  if (!panel) return;
  const object = getSelectedObject();
  if (!object) {
    panel.classList.add("hidden");
    panel.innerHTML = "";
    return;
  }
  if (!isShelfObject(object)) {
    renderFurniturePlanner(panel, object);
    return;
  }
  renderShelfStoragePlanner(panel, object);
}

function renderShelfStoragePlanner(panel, object) {
  panel.classList.remove("hidden");
  const layers = shelfLayerNames(object);
  if (!layers.includes(selectedShelfLayer)) selectedShelfLayer = layers[0] || "未指定位置";
  normalizeShelfLayerBoxLayout(object, selectedShelfLayer);
  const boxes = getShelfLayerBoxes(object.id, selectedShelfLayer);
  if (selectedShelfBoxId && !boxes.some((box) => box.id === selectedShelfBoxId)) selectedShelfBoxId = "";
  const selectedBox = boxes.find((box) => box.id === selectedShelfBoxId);
  renderSelectedStoragePath(object, selectedShelfLayer, selectedBox);
  const usedWidth = boxes.reduce((sum, box) => sum + clamp(Number(box.boxWidth) || object.width / Math.max(boxes.length, 1), 1, object.width), 0);
  const boxMarkup = boxes.map((box) => {
    const boxWidth = clamp(Number(box.boxWidth) || object.width / Math.max(boxes.length, 1), 1, object.width);
    const boxDepth = clamp(Number(box.boxDepth) || object.height, 1, object.height);
    const boxX = clamp(Number(box.boxX) || 0, 0, Math.max(0, object.width - boxWidth));
    const boxY = clamp(Number(box.boxY) || 0, 0, Math.max(0, object.height - boxDepth));
    box.boxX = round1(boxX);
    box.boxY = round1(boxY);
    return `<div class="shelf-box ${box.id === selectedShelfBoxId ? "selected" : ""}" data-box-id="${box.id}" role="button" tabindex="0" style="left:${boxX / object.width * 100}%;top:${boxY / object.height * 100}%;width:${boxWidth / object.width * 100}%;height:${boxDepth / object.height * 100}%"><button class="shelf-box-delete" type="button" title="刪除${escapeHtml(box.name)}" aria-label="刪除${escapeHtml(box.name)}">×</button><b>${escapeHtml(box.name)}</b><small>${round1(boxWidth)} x ${round1(boxDepth)} cm</small><span class="shelf-drag-hint">拖曳擺放</span></div>`;
  }).join("");
  panel.innerHTML = `
    <div class="shelf-mode-row">
      <div><strong>四層架平視</strong><span>${object.width} x ${object.height} cm，Layout 保持俯視佔地</span></div>
      <div class="box-fill-actions">
        <button type="button" data-box-count="1">1 箱</button>
        <button type="button" data-box-count="2">2 箱</button>
        <button type="button" data-box-count="3">3 箱</button>
        <button type="button" data-box-count="4">4 箱</button>
      </div>
    </div>
    <div class="shelf-layer-editor">
      <label>目前層板名稱 <input id="shelf-layer-name" type="text" value="${escapeHtml(selectedShelfLayer)}"></label>
      <button id="rename-shelf-layer" type="button">重新命名層板</button>
      <label>新增層板 <input id="new-shelf-layer-name" type="text" placeholder="例：頂部平台、側掛區"></label>
      <button id="add-shelf-layer" type="button">新增層板</button>
    </div>
    <div class="shelf-size-editor">
      <strong>架子尺寸</strong>
      <label>總寬 cm <input id="shelf-total-width" type="number" min="10" step="0.1" value="${object.width}"></label>
      <label>總深 cm <input id="shelf-total-depth" type="number" min="10" step="0.1" value="${object.height}"></label>
      <button id="save-shelf-size" type="button">套用架子尺寸</button>
    </div>
    <div class="shelf-workbench">
      <div class="shelf-front" aria-label="四層架層板">
        ${layers.map((layer) => {
          const count = getShelfLayerBoxes(object.id, layer).length;
          return `<button type="button" class="shelf-layer ${layer === selectedShelfLayer ? "active" : ""}" data-layer="${escapeHtml(layer)}"><span>${escapeHtml(layer)}</span><small>${count ? `${count} 箱` : "空"}</small></button>`;
        }).join("")}
      </div>
      <div class="shelf-top-view">
        <div class="shelf-top-title"><strong>${escapeHtml(selectedShelfLayer)}俯視</strong><div class="shelf-layer-actions"><span>深 ${round1(object.height)} cm</span><button id="add-shelf-box" type="button">+ 新增箱子</button><button id="clear-shelf-layer" class="danger-button" type="button">清空本層箱子</button></div></div>
        <div class="shelf-layer-plane" style="aspect-ratio:${Math.max(object.width, 1)} / ${Math.max(object.height, 1)}">
          ${boxes.length ? boxMarkup : `<div class="empty-layer">這一層還沒有箱子，可以按上方新增箱子或選擇箱數。</div>`}
        </div>
        ${selectedBox ? `<form id="shelf-box-editor" class="shelf-box-editor">
          <strong>編輯選取箱子</strong>
          <label>名稱 <input id="shelf-box-name" type="text" value="${escapeHtml(selectedBox.name)}"></label>
          <label>寬 cm <input id="shelf-box-width" type="number" min="1" step="0.1" value="${round1(selectedBox.boxWidth || object.width / Math.max(boxes.length, 1))}"></label>
          <label>深 cm <input id="shelf-box-depth" type="number" min="1" step="0.1" value="${round1(selectedBox.boxDepth || object.height)}"></label>
          <label>顯示順序 <input id="shelf-box-order" type="number" min="1" max="${boxes.length}" value="${selectedBox.order || 1}"></label>
          <button type="submit">儲存箱子尺寸</button>
          <button id="delete-shelf-box" class="danger-button" type="button">刪除箱子</button>
          <span id="shelf-box-size-hint">本層已使用 ${round1(usedWidth)} / ${object.width} cm</span>
        </form>` : `<div class="shelf-box-help">選一個箱子後，可以修改尺寸或雙擊進入箱內物品。</div>`}
      </div>
    </div>`;
  $("#save-shelf-size").addEventListener("click", () => updateShelfSize(object));
  panel.querySelectorAll("[data-layer]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedShelfLayer = button.dataset.layer;
      selectedShelfBoxId = "";
      prepareShelfItemForm(object, selectedShelfLayer, "");
    });
    button.addEventListener("dblclick", () => focusShelfLayerEntry(object, button.dataset.layer));
  });
  $("#rename-shelf-layer")?.addEventListener("click", () => renameShelfLayer(object));
  $("#add-shelf-layer")?.addEventListener("click", () => addShelfLayer(object));
  panel.querySelectorAll("[data-box-count]").forEach((button) => button.addEventListener("click", () => autoFillShelfBoxes(object, selectedShelfLayer, Number(button.dataset.boxCount))));
  $("#add-shelf-box")?.addEventListener("click", () => addShelfBox(object, selectedShelfLayer));
  $("#clear-shelf-layer")?.addEventListener("click", () => clearShelfLayerBoxes(object, selectedShelfLayer));
  panel.querySelectorAll("[data-box-id]").forEach((boxElement) => {
    boxElement.addEventListener("pointerdown", (event) => startShelfBoxDrag(event, object, boxElement.dataset.boxId));
    boxElement.addEventListener("click", () => { if (boxElement.dataset.dragged !== "true") selectShelfBox(boxElement.dataset.boxId); });
    boxElement.addEventListener("dblclick", (event) => { event.preventDefault(); event.stopPropagation(); focusShelfBoxEntry(object, boxElement.dataset.boxId); });
    boxElement.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") selectShelfBox(boxElement.dataset.boxId); });
    boxElement.querySelector(".shelf-box-delete").addEventListener("click", (event) => { event.preventDefault(); event.stopPropagation(); deleteShelfBox(boxElement.dataset.boxId); });
  });
  $("#shelf-box-editor")?.addEventListener("submit", (event) => updateShelfBox(event, object));
  $("#delete-shelf-box")?.addEventListener("click", () => deleteShelfBox(selectedShelfBoxId));
}

function renderFurniturePlanner(panel, object) {
  panel.classList.remove("hidden");
  const locations = ensureObjectStorageLayers(object);
  let location = $("#location-select")?.value || locations[0] || "未指定位置";
  if (!locations.includes(location)) location = locations[0] || "未指定位置";
  renderSelectedStoragePath(object, location, null);
  const locationItems = state.inventory
    .filter((item) => item.objectId === object.id && (item.location || "未指定位置") === location && !item.parentId)
    .sort((a, b) => (a.order || 999) - (b.order || 999) || a.name.localeCompare(b.name));
  panel.innerHTML = `
    <div class="furniture-planner">
      <div class="shelf-mode-row">
        <div><strong>${escapeHtml(object.name)}的收納位置</strong><span>${object.width} x ${object.height} cm，Layout 保持俯視佔地</span></div>
        <button id="add-location-item" type="button">在這裡新增物品</button>
      </div>
      <div class="furniture-location-grid">
        ${locations.map((item) => `<button class="${item === location ? "active" : ""}" type="button" data-furniture-location="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join("")}
      </div>
      <div class="furniture-surface-plane">
        ${locationItems.length ? locationItems.map((item) => `<article class="surface-item-card" data-surface-item="${item.id}"><strong><span class="item-icon">${getSubcategoryIcon(item.category, item.subcategory)}</span> ${escapeHtml(item.name)} x ${item.count}</strong><small>${escapeHtml(item.category)} / ${escapeHtml(item.subcategory)}</small></article>`).join("") : `<div class="empty-layer">這個位置還沒有登錄物品。可以按「在這裡新增物品」或直接填左側表單。</div>`}
      </div>
      <div class="shelf-box-help">點位置會同步左側表單；雙擊下方清單的物品可編輯內容。</div>
    </div>`;
  panel.querySelectorAll("[data-furniture-location]").forEach((button) => {
    button.addEventListener("click", () => prepareObjectLocationItemForm(object, button.dataset.furnitureLocation));
  });
  panel.querySelectorAll("[data-surface-item]").forEach((card) => {
    card.addEventListener("dblclick", () => editInventoryItem(card.dataset.surfaceItem));
  });
  $("#add-location-item")?.addEventListener("click", () => prepareObjectLocationItemForm(object, location));
}

function prepareObjectLocationItemForm(object, location) {
  state.selectedObjectId = object.id;
  state.selectedObjectIds = [object.id];
  setEntryMode("single");
  setInventoryFormTarget(object.id, location, "");
  renderShelfPlanner();
  renderItems();
  $("#item-form").scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => $("#item-name")?.focus(), 120);
}

function renameShelfLayer(object) {
  const layers = shelfLayerNames(object);
  const oldName = selectedShelfLayer;
  const nextName = $("#shelf-layer-name")?.value.trim();
  if (!nextName || nextName === oldName) return;
  if (layers.includes(nextName)) {
    $("#save-status").textContent = "這個層板名稱已存在";
    return;
  }
  pushUndoSnapshot();
  object.storageLayers = layers.map((layer) => layer === oldName ? nextName : layer);
  state.inventory.forEach((item) => {
    if (item.objectId === object.id && item.location === oldName) item.location = nextName;
  });
  state.objectLocations ||= {};
  state.objectLocations[object.id] = (state.objectLocations[object.id] || []).map((layer) => layer === oldName ? nextName : layer);
  selectedShelfLayer = nextName;
  recordActivity("修改物品", object, `層板「${oldName}」改名為「${nextName}」`);
  commit();
}

function addShelfLayer(object) {
  const name = $("#new-shelf-layer-name")?.value.trim();
  if (!name) return;
  const layers = shelfLayerNames(object);
  if (layers.includes(name)) {
    $("#save-status").textContent = "這個層板名稱已存在";
    return;
  }
  pushUndoSnapshot();
  object.storageLayers = [...layers, name];
  selectedShelfLayer = name;
  recordActivity("修改物品", object, `新增層板「${name}」`);
  commit();
}

function getShelfLayerBoxes(objectId, layer) {
  return state.inventory
    .filter((item) => item.objectId === objectId && item.isContainer && item.location === layer && item.shelfBox)
    .sort((a, b) => (a.order || 999) - (b.order || 999));
}

function positionShelfBoxElement(panel, object, box) {
  const element = panel.querySelector(`[data-box-id="${CSS.escape(box.id)}"]`);
  if (!element) return;
  const boxWidth = clamp(Number(box.boxWidth) || 1, 1, object.width);
  const boxDepth = clamp(Number(box.boxDepth) || 1, 1, object.height);
  const boxX = clamp(Number(box.boxX) || 0, 0, Math.max(0, object.width - boxWidth));
  const boxY = clamp(Number(box.boxY) || 0, 0, Math.max(0, object.height - boxDepth));
  element.style.left = `${boxX / object.width * 100}%`;
  element.style.top = `${boxY / object.height * 100}%`;
  element.style.width = `${boxWidth / object.width * 100}%`;
  element.style.height = `${boxDepth / object.height * 100}%`;
}

function autoFillShelfBoxes(object, layer, count) {
  if (!object || !count) return;
  pushUndoSnapshot();
  const existing = getShelfLayerBoxes(object.id, layer);
  const width = round1(object.width / count);
  existing.slice(count).forEach((box) => {
    state.inventory = state.inventory.filter((item) => item.id !== box.id && item.parentId !== box.id);
  });
  for (let index = 0; index < count; index += 1) {
    const current = existing[index];
    const boxData = {
      objectId: object.id,
      location: layer,
      parentId: "",
      order: index + 1,
      isContainer: true,
      shelfBox: true,
      boxWidth: width,
      boxDepth: object.height,
      boxX: round1(width * index),
      boxY: 0,
      category: "收納",
      subcategory: "收納箱",
      name: `${layer}箱子 ${index + 1}`,
      count: 1
    };
    if (current) Object.assign(current, boxData);
    else state.inventory.push({ id: createId("box"), ...boxData });
  }
  selectedShelfBoxId = existing[0]?.id || state.inventory.find((item) => item.objectId === object.id && item.location === layer && item.shelfBox)?.id || "";
  ensureStorageCategory();
  renderCategorySelects();
  renderParentContainerSelect();
  renderShelfPlanner();
  renderItems();
  saveState();
}

function addShelfBox(object, layer) {
  if (!object) return;
  pushUndoSnapshot();
  const boxes = getShelfLayerBoxes(object.id, layer);
  const nextCount = boxes.length + 1;
  const equalWidth = round1(object.width / nextCount);
  boxes.forEach((box, index) => {
    box.order = index + 1;
    box.boxWidth = equalWidth;
    box.boxDepth = Math.min(Number(box.boxDepth) || object.height, object.height);
    box.boxX = round1(equalWidth * index);
    box.boxY = clamp(Number(box.boxY) || 0, 0, Math.max(0, object.height - box.boxDepth));
  });
  const box = {
    id: createId("box"),
    objectId: object.id,
    location: layer,
    parentId: "",
    order: nextCount,
    isContainer: true,
    shelfBox: true,
    boxWidth: equalWidth,
    boxDepth: object.height,
    boxX: round1(equalWidth * (nextCount - 1)),
    boxY: 0,
    category: "收納",
    subcategory: "收納箱",
    name: `${layer}箱子 ${nextCount}`,
    count: 1
  };
  state.inventory.push(box);
  selectedShelfBoxId = box.id;
  ensureStorageCategory();
  recordActivity("新增物品", box, `${object.name} / ${layer}`);
  renderCategorySelects();
  renderParentContainerSelect();
  renderShelfPlanner();
  renderItems();
  saveState();
}

function startShelfBoxDrag(event, object, boxId) {
  if (event.button !== 0 || event.target.closest(".shelf-box-delete")) return;
  event.preventDefault();
  const element = event.currentTarget;
  const plane = element.closest(".shelf-layer-plane");
  const movingBox = state.inventory.find((box) => box.id === boxId && box.shelfBox);
  if (!plane || !movingBox) return;
  const rect = plane.getBoundingClientRect();
  const startX = event.clientX;
  const startY = event.clientY;
  const startBoxX = Number(movingBox.boxX) || 0;
  const startBoxY = Number(movingBox.boxY) || 0;
  const boxWidth = clamp(Number(movingBox.boxWidth) || 1, 1, object.width);
  const boxDepth = clamp(Number(movingBox.boxDepth) || 1, 1, object.height);
  let moved = false;
  selectedShelfBoxId = boxId;
  element.classList.add("selected");

  function setBoxPosition(pointerEvent, previewOnly = false) {
    const deltaCmX = (pointerEvent.clientX - startX) / Math.max(rect.width, 1) * object.width;
    const deltaCmY = (pointerEvent.clientY - startY) / Math.max(rect.height, 1) * object.height;
    const nextX = clamp(startBoxX + deltaCmX, 0, Math.max(0, object.width - boxWidth));
    const nextY = clamp(startBoxY + deltaCmY, 0, Math.max(0, object.height - boxDepth));
    if (previewOnly) {
      element.style.left = `${nextX / object.width * 100}%`;
      element.style.top = `${nextY / object.height * 100}%`;
      return { nextX, nextY };
    }
    movingBox.boxX = round1(nextX);
    movingBox.boxY = round1(nextY);
    return { nextX, nextY };
  }

  function move(pointerEvent) {
    if (Math.hypot(pointerEvent.clientX - startX, pointerEvent.clientY - startY) > 4) moved = true;
    if (!moved) return;
    element.classList.add("dragging");
    setBoxPosition(pointerEvent, true);
  }

  function stop(pointerEvent) {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
    window.removeEventListener("pointercancel", stop);
    if (!moved) {
      selectShelfBox(boxId);
      return;
    }
    pushUndoSnapshot();
    setBoxPosition(pointerEvent, false);
    element.dataset.dragged = "true";
    recordActivity("移動箱子", movingBox, `${selectedShelfLayer} X ${movingBox.boxX} cm / Y ${movingBox.boxY} cm`);
    renderParentContainerSelect();
    renderShelfPlanner();
    renderItems();
    saveState();
  }

  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
  window.addEventListener("pointercancel", stop);
}

function ensureStorageCategory() {
  state.categories ||= structuredClone(defaultCategories);
  state.categories["收納"] ||= [{ name: "收納箱", icon: "📦" }];
  if (!state.categories["收納"].some((item) => item.name === "收納箱")) state.categories["收納"].push({ name: "收納箱", icon: "📦" });
}

function selectShelfBox(boxId) {
  selectedShelfBoxId = boxId;
  const box = state.inventory.find((item) => item.id === boxId);
  renderSelectedStoragePath(getSelectedObject(), box?.location || selectedShelfLayer, box);
  renderParentContainerSelect();
  const select = $("#parent-container-select");
  if (select) {
    select.value = boxId;
  }
  renderShelfPlanner();
}

function renderSelectedStoragePath(object = getSelectedObject(), layer = selectedShelfLayer, box = null) {
  const path = $("#selected-storage-path");
  if (!path) return;
  if (!object) {
    path.textContent = "尚未選擇放置位置";
    return;
  }
  const parts = [object.name];
  if (layer) parts.push(layer);
  if (box) parts.push(box.name);
  path.innerHTML = `<span>目前放置位置</span><strong>${parts.map(escapeHtml).join(" <b>›</b> ")}</strong>`;
}
function renderSelectedStoragePathFromForm() {
  const object = state.objects.find((item) => item.id === $("#item-object-select")?.value) || getSelectedObject();
  const location = $("#location-select")?.value || "";
  const box = state.inventory.find((item) => item.id === $("#parent-container-select")?.value);
  renderSelectedStoragePath(object, location, box || null);
}

function focusShelfLayerEntry(object, layer) {
  selectedShelfLayer = layer;
  selectedShelfBoxId = "";
  prepareShelfItemForm(object, layer, "");
}

function focusShelfBoxEntry(object, boxId) {
  const box = state.inventory.find((item) => item.id === boxId && item.shelfBox);
  if (!box) return;
  selectedShelfLayer = box.location;
  selectedShelfBoxId = box.id;
  prepareShelfItemForm(object, box.location, box.id);
}

function prepareShelfItemForm(object, layer, parentId) {
  state.selectedObjectId = object.id;
  state.selectedObjectIds = [object.id];
  setEntryMode("single");
  setInventoryFormTarget(object.id, layer, parentId);
  renderShelfPlanner();
  renderSelectedStoragePath(object, layer, parentId ? state.inventory.find((item) => item.id === parentId) : null);
  $("#item-form").scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => $("#item-name")?.focus(), 250);
}

function updateShelfSize(object) {
  const width = Math.max(10, Number($("#shelf-total-width").value) || object.width);
  const depth = Math.max(10, Number($("#shelf-total-depth").value) || object.height);
  object.width = round1(width);
  object.height = round1(depth);
  shelfLayerNames(object).forEach((layer) => {
    const boxes = getShelfLayerBoxes(object.id, layer);
    const total = boxes.reduce((sum, box) => sum + (Number(box.boxWidth) || 0), 0);
    if (total > object.width && total > 0) {
      const ratio = object.width / total;
      boxes.forEach((box) => { box.boxWidth = round1((Number(box.boxWidth) || 1) * ratio); });
    }
    boxes.forEach((box) => {
      box.boxDepth = Math.min(Number(box.boxDepth) || depth, depth);
      box.boxX = round1(clamp(Number(box.boxX) || 0, 0, Math.max(0, object.width - (Number(box.boxWidth) || 1))));
      box.boxY = round1(clamp(Number(box.boxY) || 0, 0, Math.max(0, object.height - (Number(box.boxDepth) || 1))));
    });
  });
  fitObjectInsideMainRoom(object);
  recordActivity("修改物品", { id: object.id, name: object.name }, `架子尺寸改為 ${object.width} x ${object.height} cm`);
  commit();
}

function updateShelfBox(event, object) {
  event.preventDefault();
  const box = state.inventory.find((item) => item.id === selectedShelfBoxId);
  if (!box) return;
  const boxes = getShelfLayerBoxes(object.id, selectedShelfLayer);
  pushUndoSnapshot();
  box.name = $("#shelf-box-name").value.trim() || box.name;
  box.boxWidth = round1(clamp(Number($("#shelf-box-width").value) || box.boxWidth || 1, 1, object.width));
  box.boxDepth = round1(clamp(Number($("#shelf-box-depth").value) || box.boxDepth || object.height, 1, object.height));
  box.boxX = round1(clamp(Number(box.boxX) || 0, 0, Math.max(0, object.width - box.boxWidth)));
  box.boxY = round1(clamp(Number(box.boxY) || 0, 0, Math.max(0, object.height - box.boxDepth)));
  const desiredOrder = clamp(Math.round(Number($("#shelf-box-order")?.value) || box.order || 1), 1, boxes.length);
  const reordered = boxes.filter((item) => item.id !== box.id).sort((a, b) => (a.order || 999) - (b.order || 999));
  reordered.splice(desiredOrder - 1, 0, box);
  reordered.forEach((item, index) => { item.order = index + 1; });
  recordActivity("修改物品", box, `箱子尺寸改為 ${box.boxWidth} x ${box.boxDepth} cm`);
  commit();
}

function deleteShelfBox(boxId) {
  const box = state.inventory.find((item) => item.id === boxId);
  if (!box) return;
  selectedShelfBoxId = "";
  deleteInventoryItem(boxId);
}

function renderItems() {
  const object = getSelectedObject();
  $("#object-content-title").textContent = object ? `${object.name}的東西` : "尚未選取物件";
  const list = $("#item-list");
  const items = state.inventory.filter((item) => item.objectId === state.selectedObjectId);
  list.innerHTML = "";
  if (!items.length) {
    list.innerHTML = `<div class="empty-state">這個位置還沒有登錄物品。</div>`;
    return;
  }
  const renderedIds = new Set();
  renderItemTree(list, items, "", 0, renderedIds);
  items.filter((item) => !renderedIds.has(item.id)).forEach((item) => renderItemTree(list, items, item.id, 0, renderedIds, true));
}

function renderItemTree(list, items, parentId = "", depth = 0, renderedIds = new Set(), renderSelf = false) {
  const candidates = renderSelf
    ? items.filter((item) => item.id === parentId)
    : items.filter((item) => (item.parentId || "") === parentId);
  candidates.sort((a, b) => (a.order || 999) - (b.order || 999) || a.name.localeCompare(b.name)).forEach((item) => {
    if (renderedIds.has(item.id)) return;
    renderedIds.add(item.id);
    const card = document.createElement("article");
    card.className = `item-card ${depth ? "child" : ""}`;
    card.style.setProperty("--depth", depth);
    const parent = item.parentId ? state.inventory.find((candidate) => candidate.id === item.parentId) : null;
    const parentTag = parent ? `<span class="tag parent">在 ${escapeHtml(parent.name)} 內</span>` : "";
    const containerTag = item.isContainer ? `<span class="tag container">收納容器</span>` : "";
    card.innerHTML = `<h4><span class="item-icon">${getSubcategoryIcon(item.category, item.subcategory)}</span> ${item.order || 1}. ${escapeHtml(item.name)} x ${item.count}</h4><div class="tag-row"><span class="tag location">${escapeHtml(item.location || "未指定")}</span>${parentTag}${containerTag}<span class="tag">${escapeHtml(item.category)}</span><span class="tag small">${escapeHtml(item.subcategory)}</span>${inventoryTimingTags(item)}</div><div class="item-card-actions"><button type="button" data-edit-inventory="${item.id}">編輯</button><button type="button" data-delete-inventory="${item.id}">刪除</button></div>`;
    list.appendChild(card);
    renderItemTree(list, items, item.id, depth + 1, renderedIds);
  });
  list.querySelectorAll("[data-edit-inventory]").forEach((button) => button.onclick = () => editInventoryItem(button.dataset.editInventory));
  list.querySelectorAll("[data-delete-inventory]").forEach((button) => button.onclick = () => deleteInventoryItem(button.dataset.deleteInventory));
}

function renderStock() {
  const container = $("#stock-results");
  const keyword = normalizeSearchText($("#stock-keyword").value);
  const category = $("#stock-category").value;
  const subcategory = $("#stock-subcategory").value;
  const items = state.inventory.filter((item) => {
    const matchKeyword = !keyword || normalizeSearchText([item.name, item.category, item.subcategory, item.location].join(" ")).includes(keyword);
    const matchCategory = !category || item.category === category;
    const matchSubcategory = !subcategory || item.subcategory === subcategory;
    return matchKeyword && matchCategory && matchSubcategory;
  });
  container.innerHTML = "";
  if (!items.length) {
    container.innerHTML = `<div class="empty-state">找不到符合條件的庫存。</div>`;
    return;
  }
  items.forEach((item) => {
    const object = state.objects.find((candidate) => candidate.id === item.objectId);
    const card = document.createElement("article");
    card.className = "stock-card";
    card.dataset.stockItem = item.id;
    card.innerHTML = `<h4><span class="item-icon">${getSubcategoryIcon(item.category, item.subcategory)}</span> ${escapeHtml(item.name)} x ${item.count}</h4><div class="tag-row"><span class="tag">${escapeHtml(object?.name || "未知物件")}</span><span class="tag location">${escapeHtml(item.location || "未指定")}</span><span class="tag">${escapeHtml(item.category || "未分類")}</span><span class="tag small">${escapeHtml(item.subcategory || "未分類")}</span>${inventoryTimingTags(item)}</div><p class="stock-path">${escapeHtml(buildItemPath(item))}</p><div class="item-card-actions"><button type="button" data-edit-inventory="${item.id}">編輯內容</button><button type="button" data-delete-inventory="${item.id}">移到回收桶</button></div>`;
    container.appendChild(card);
  });
  container.querySelectorAll("[data-edit-inventory]").forEach((button) => button.onclick = () => editInventoryItem(button.dataset.editInventory));
  container.querySelectorAll("[data-delete-inventory]").forEach((button) => button.onclick = () => deleteInventoryItem(button.dataset.deleteInventory));
}

function ensureRecyclePanel() {
  let panel = $("#recycle-panel");
  if (panel) return panel;
  const stockView = $("#stock-view");
  const resultsPanel = $("#stock-results")?.closest(".stock-panel");
  if (!stockView || !resultsPanel) return null;
  panel = document.createElement("section");
  panel.id = "recycle-panel";
  panel.className = "stock-panel recycle-panel";
  panel.innerHTML = `<div class="management-heading"><div><h3>資源回收桶</h3><p>刪除後保留 7 天，可在期限內復原。</p></div><strong id="recycle-count">0</strong></div><div id="recycle-list" class="recycle-list"></div>`;
  resultsPanel.insertAdjacentElement("afterend", panel);
  return panel;
}

function renderRecyclePanel() {
  const panel = ensureRecyclePanel();
  if (!panel) return;
  purgeExpiredDeletedItems();
  const list = $("#recycle-list");
  const items = state.deletedItems || [];
  $("#recycle-count").textContent = items.length;
  list.innerHTML = items.length ? items.slice(0, 12).map((item) => {
    const purgeText = item.purgeAfter ? `保留到 ${formatDate(item.purgeAfter)}` : "保留 7 天";
    return `<article class="recycle-item"><div><strong>${escapeHtml(item.name || "未命名物品")}</strong><span>${escapeHtml(item.category || "未分類")} / ${escapeHtml(item.subcategory || "未分類")} · ${escapeHtml(purgeText)}</span></div><button type="button" data-restore-deleted="${escapeHtml(item.id)}">復原</button></article>`;
  }).join("") : `<div class="empty-state compact-empty">目前沒有刪除的物品。</div>`;
  list.querySelectorAll("[data-restore-deleted]").forEach((button) => button.addEventListener("click", () => restoreDeletedItem(button.dataset.restoreDeleted)));
}

function restoreDeletedItem(itemId) {
  const item = (state.deletedItems || []).find((candidate) => candidate.id === itemId);
  if (!item) return;
  pushUndoSnapshot();
  const restored = structuredClone(item);
  delete restored.deletedAt;
  delete restored.purgeAfter;
  if (!state.objects.some((object) => object.id === restored.objectId)) restored.objectId = state.objects[0]?.id || "";
  if (restored.parentId && !state.inventory.some((candidate) => candidate.id === restored.parentId)) restored.parentId = "";
  if (state.inventory.some((candidate) => candidate.id === restored.id)) restored.id = createId("item");
  state.inventory.push(restored);
  state.deletedItems = (state.deletedItems || []).filter((candidate) => candidate.id !== itemId);
  recordActivity("復原物品", restored, describeItemLocation(restored));
  commit();
}

function renderInventoryReminders() {
  const alerts = getInventoryAlerts();
  const container = $("#inventory-reminders");
  $("#reminder-count").textContent = alerts.length;
  container.innerHTML = alerts.length
    ? alerts.map((alert) => `<article class="reminder-card ${alert.severity}"><b>${alert.icon}</b><div><strong>${escapeHtml(alert.item.name)}</strong><span>${escapeHtml(alert.message)}</span></div></article>`).join("")
    : `<div class="empty-state">目前沒有即將過期或需要補貨的提醒。</div>`;

  const toast = $("#inventory-alert-toast");
  if (!alerts.length || inventoryAlertDismissed) {
    toast.classList.add("hidden");
    return;
  }
  const urgentCount = alerts.filter((alert) => alert.severity === "danger").length;
  $("#inventory-alert-title").textContent = urgentCount ? `有 ${urgentCount} 個急件提醒` : "庫存提醒";
  $("#inventory-alert-summary").textContent = alerts.slice(0, 2).map((alert) => alert.message).join("、");
  toast.classList.remove("hidden");
}

function renderDashboard() {
  const alerts = collectInventoryAlerts();
  const recentItems = [...state.inventory].sort((a, b) => String(b.addedAt || "").localeCompare(String(a.addedAt || ""))).slice(0, 6);
  const activities = [...(state.activityLog || [])].slice(-6).reverse();
  const backupDays = state.lastBackupAt ? Math.floor((Date.now() - new Date(state.lastBackupAt).getTime()) / 86400000) : null;
  const dashboardAlerts = backupDays === null || backupDays >= 7
    ? [{ item: { name: "備份提醒" }, message: state.lastBackupAt ? `距離上次備份 ${backupDays} 天` : "尚未建立備份" }, ...alerts]
    : alerts;
  const stagingAlerts = [
    ...(state.stagingItems?.length ? [{ item: { name: "暫存區" }, message: `${state.stagingItems.length} 筆物品等待重新指定位置` }] : []),
    ...(state.deletedItems?.length ? [{ item: { name: "資源回收桶" }, message: `${state.deletedItems.length} 筆物品將在 7 天後永久刪除` }] : [])
  ];
  renderDashboardList($("#dashboard-reminder-list"), [...stagingAlerts, ...dashboardAlerts].slice(0, 6).map((alert) => ({ title: alert.item.name, text: alert.message })), "目前沒有提醒" );
  renderDashboardList($("#dashboard-restock-list"), alerts.slice(0, 6).map((alert) => ({ title: alert.item.name, text: alert.message })), "目前沒有需要補貨的物品" );
  renderDashboardList($("#dashboard-recent-items"), recentItems.map((item) => ({ title: `${item.name} x ${item.count}`, text: buildItemPath(item) })), "尚未新增物品" );
  renderDashboardList($("#dashboard-recent-activity"), activities.map((entry) => ({ title: `${entry.type}：${entry.itemName}`, text: entry.detail || formatActivityTime(entry.time) })), "尚未有異動紀錄" );
  renderCategoryStats();
  $("#dashboard-reminder-count").textContent = dashboardAlerts.length + stagingAlerts.length;
  $("#dashboard-date").textContent = new Date().toLocaleDateString("zh-TW", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function renderDashboardList(container, entries, emptyText) {
  container.className = "dashboard-list";
  container.innerHTML = entries.length ? entries.map((entry) => `<article class="dashboard-list-item"><strong>${escapeHtml(entry.title)}</strong><span>${escapeHtml(entry.text)}</span></article>`).join("") : `<div class="empty-state">${emptyText}</div>`;
}

function renderCategoryStats() {
  const container = $("#dashboard-category-stats");
  if (!container) return;

  const totals = new Map();
  state.inventory
    .filter((item) => !item.deletedAt)
    .forEach((item) => {
      const key = item.category || "未分類";
      const count = Math.max(1, Number(item.count) || 1);
      totals.set(key, (totals.get(key) || 0) + count);
    });

  const entries = [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  if (!entries.length) {
    container.innerHTML = `<div class="empty-state">尚未有分類統計。</div>`;
    return;
  }

  const max = Math.max(...entries.map((entry) => entry[1]), 1);
  container.innerHTML = entries.map(([category, count]) => {
    const width = Math.max(8, Math.round((count / max) * 100));
    return `<article class="category-stat"><strong>${escapeHtml(category)}</strong><span class="category-stat-bar"><i style="width:${width}%"></i></span><b>${count}</b></article>`;
  }).join("");
}

function formatActivityTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleString("zh-TW", { hour12: false });
}

function openQuickAddItem() {
  showView("object-view");
  setEntryMode("single");
  $("#item-name").focus();
}

function openAuditSection() {
  showView("stock-view");
  $("#inventory-audit-section").scrollIntoView({ behavior: "smooth", block: "start" });
}

function openHealthSection() {
  showView("stock-view");
  renderDataHealth();
  $("#data-health-section").scrollIntoView({ behavior: "smooth", block: "start" });
}

function startInventoryAudit() {
  const items = state.inventory.filter((item) => !item.isContainer);
  const workspace = $("#audit-workspace");
  workspace.innerHTML = `<table class="audit-table"><thead><tr><th>物品</th><th>位置</th><th>系統數量</th><th>實際數量</th><th>狀態</th></tr></thead><tbody>${items.map((item) => `<tr data-audit-item="${item.id}"><td>${escapeHtml(item.name)}</td><td>${escapeHtml(describeItemLocation(item))}</td><td>${item.count}</td><td><input type="number" min="0" step="1" value="${item.count}"></td><td class="audit-status-ok">正常</td></tr>`).join("")}</tbody></table><div class="audit-actions"><button id="cancel-audit" class="ghost-button" type="button">取消</button><button id="apply-audit" type="button">套用盤點結果</button></div>`;
  workspace.classList.remove("hidden");
  workspace.querySelectorAll("input").forEach((input) => input.addEventListener("input", () => {
    const row = input.closest("tr");
    const item = state.inventory.find((candidate) => candidate.id === row.dataset.auditItem);
    const difference = Number(input.value) - Number(item.count);
    const status = row.lastElementChild;
    status.className = difference ? "audit-status-diff" : "audit-status-ok";
    status.textContent = difference > 0 ? `增加 ${difference}` : difference < 0 ? `減少 ${Math.abs(difference)}` : "正常";
  }));
  $("#cancel-audit").addEventListener("click", () => workspace.classList.add("hidden"));
  $("#apply-audit").addEventListener("click", applyInventoryAudit);
}

function applyInventoryAudit() {
  let changed = 0;
  $("#audit-workspace").querySelectorAll("[data-audit-item]").forEach((row) => {
    const item = state.inventory.find((candidate) => candidate.id === row.datasetAuditItem || candidate.id === row.dataset.auditItem);
    const actual = Math.max(0, Number(row.querySelector("input").value) || 0);
    if (!item || actual === Number(item.count)) return;
    const before = item.count;
    item.count = actual;
    recordActivity("盤點修正", item, `${before} → ${actual}`);
    changed += 1;
  });
  $("#audit-workspace").classList.add("hidden");
  commit();
  $("#save-status").textContent = `盤點已更新 ${changed} 筆`;
}

function renderActivityLog() {
  const container = $("#activity-log");
  if (!container) return;
  const entries = (state.activityLog || []).slice(0, 50);
  container.innerHTML = entries.length ? entries.map((entry) => `<article class="activity-entry"><time>${escapeHtml(formatActivityTime(entry.time))}</time><div><strong>${escapeHtml(entry.type)}：${escapeHtml(entry.itemName)}</strong><div>${escapeHtml(entry.detail || "")}</div></div></article>`).join("") : `<div class="empty-state">還沒有異動紀錄，新增或修改物品後會顯示在這裡。</div>`;
}

function getDataHealthIssues() {
  const issues = [];
  const objectIds = new Set(state.objects.map((object) => object.id));
  const itemIds = new Set(state.inventory.map((item) => item.id));
  state.inventory.forEach((item) => {
    if (!objectIds.has(item.objectId)) issues.push({ severity: "danger", item, message: "所屬家具不存在", action: "移到未分類區或重新指定家具" });
    if (item.parentId && !itemIds.has(item.parentId)) issues.push({ severity: "danger", item, message: "所在容器不存在", action: "重新指定容器" });
    if (!state.categories[item.category]) issues.push({ severity: "warning", item, message: "大標籤不存在", action: "重新分類或建立標籤" });
    else if (!state.categories[item.category].some((sub) => sub.name === item.subcategory)) issues.push({ severity: "warning", item, message: "小標籤不存在", action: "重新分類或建立小標籤" });
    if (["食品", "醫療"].includes(item.category) && !item.trackExpiry) issues.push({ severity: "warning", item, message: "未設定有效期限", action: "補登期限或忽略" });
  });
  return issues;
}

function renderDataHealth() {
  const container = $("#data-health-results");
  if (!container) return;
  const issues = getDataHealthIssues();
  container.className = "health-list";
  container.innerHTML = issues.length ? issues.map((issue) => `<article class="health-entry ${issue.severity === "warning" ? "warning" : ""}"><b>!</b><div><strong>${escapeHtml(issue.item.name)}：${escapeHtml(issue.message)}</strong><div>${escapeHtml(issue.action)}</div></div></article>`).join("") : `<div class="empty-state">資料健康狀態良好，沒有需要處理的問題。</div>`;
}

function createBackup() {
  state.lastBackupAt = new Date().toISOString();
  state.schemaVersion = 3;
  recordActivity("備份資料", { name: "JSON 備份" }, `資料格式版本 ${state.schemaVersion}`);
  saveState();
  exportDataFile();
}

function getInventoryAlerts() {
  const today = startOfLocalDay(new Date());
  const alerts = [];
  state.inventory.forEach((item) => {
    if (item.isContainer) return;
    if (item.trackExpiry && item.expiryDate) {
      const days = daysBetween(today, parseLocalDate(item.expiryDate));
      const warningDays = Number(item.expiryWarningDays ?? 30);
      if (days < 0) alerts.push({ item, severity: "danger", icon: "!", message: `${item.name} 已過期 ${Math.abs(days)} 天` });
      else if (days <= warningDays) alerts.push({ item, severity: days <= 3 ? "danger" : "warning", icon: "!", message: `${item.name} 還有 ${days} 天到期` });
    }
    const runoutDate = getEstimatedRunoutDate(item);
    if (runoutDate) {
      const days = daysBetween(today, parseLocalDate(runoutDate));
      const warningDays = Number(item.purchaseWarningDays ?? 7);
      if (days < 0) alerts.push({ item, severity: "danger", icon: "!", message: `${item.name} 預估已用完` });
      else if (days <= warningDays) alerts.push({ item, severity: days <= 2 ? "danger" : "warning", icon: "!", message: `${item.name} 預估 ${days} 天後用完` });
    }
    if (item.trackLowStock && Number(item.count) <= Number(item.lowStockThreshold ?? 1)) {
      alerts.push({ item, severity: Number(item.count) === 0 ? "danger" : "info", icon: "!", message: `${item.name} 剩 ${item.count}，低於安全庫存` });
    }
  });
  const severityOrder = { danger: 0, warning: 1, info: 2 };
  return alerts.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
}

function collectInventoryAlerts() {
  return getInventoryAlerts();
}

function getEstimatedRunoutDate(item) {
  if (!item.trackUsage || !(Number(item.usageDaysPerUnit) > 0) || !(Number(item.count) > 0)) return "";
  const start = parseLocalDate(item.usageStartDate || item.addedAt || localDateString());
  start.setDate(start.getDate() + Math.ceil(Number(item.count) * Number(item.usageDaysPerUnit)));
  return localDateString(start);
}

function localDateString(date = new Date()) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function parseLocalDate(value) {
  const [year, month, day] = String(value).split("-").map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysBetween(start, end) {
  return Math.ceil((startOfLocalDay(end) - startOfLocalDay(start)) / 86400000);
}

function formatDate(value) {
  const date = typeof value === "string" ? parseLocalDate(value) : value;
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

function getSubcategoryIcon(category, subcategory) {
  return state.categories[category]?.find((item) => item.name === subcategory)?.icon || inferIconForName(subcategory || category) || "□";
}

function pushUndoSnapshot() {
  if (isRestoringUndo || !lastSavedStateSnapshot) return;
  const current = JSON.stringify(state);
  if (current === lastSavedStateSnapshot) return;
  if (undoStack[undoStack.length - 1] !== lastSavedStateSnapshot) undoStack.push(lastSavedStateSnapshot);
  undoStack = undoStack.slice(-40);
}

function handleUndoShortcut(event) {
  if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "z" || event.shiftKey || event.altKey) return;
  const target = event.target;
  if (target?.matches?.("input, textarea, select") || target?.isContentEditable) return;
  event.preventDefault();
  restorePreviousState();
}

function restorePreviousState() {
  const snapshot = undoStack.pop();
  if (!snapshot) {
    $("#save-status").textContent = "沒有可復原的紀錄";
    return;
  }
  try {
    isRestoringUndo = true;
    state = normalizeState(JSON.parse(snapshot));
    syncControlsFromState();
    renderAll();
    saveState();
    $("#save-status").textContent = "已復原上一個操作";
  } finally {
    isRestoringUndo = false;
  }
}

function commit() {
  pushUndoSnapshot();
  constrainAllDoorOpenAngles();
  syncControlsFromState();
  renderAll();
  saveState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  lastSavedStateSnapshot = JSON.stringify(state);
  $("#save-status").textContent = "已自動儲存";
  $("#save-time").textContent = new Date().toLocaleString("zh-TW", { hour12: false });
  scheduleLocalFileAutosave();
}

function applyUiStyle() {
  const styles = ["mobile", "bold", "dark", "warm", "blueprint", "contrast"];
  document.body.classList.remove(...styles.map((style) => `ui-${style}`));
  if (styles.includes(state.uiStyle)) document.body.classList.add(`ui-${state.uiStyle}`);
  document.body.classList.toggle("sidebar-auto-hide", !!state.sidebarAutoHide);
  const toggle = $("#sidebar-auto-toggle");
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(!!state.sidebarAutoHide));
    toggle.title = state.sidebarAutoHide ? "左側工作列滑過顯示，點一下改為常駐" : "左側工作列常駐，點一下改為滑過顯示";
    toggle.textContent = state.sidebarAutoHide ? "›" : "‹";
  }
}

function toggleSidebarAutoHide() {
  state.sidebarAutoHide = !state.sidebarAutoHide;
  applyUiStyle();
  saveState();
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    state = normalizeState(JSON.parse(raw));
  } catch {
    state = getDefaultState();
  }
}

function normalizeShelfLayerBoxLayout(object, layer) {
  const boxes = getShelfLayerBoxes(object.id, layer);
  let cursorX = 0;
  boxes.forEach((box) => {
    const width = clamp(Number(box.boxWidth) || object.width / Math.max(boxes.length, 1), 1, object.width);
    const depth = clamp(Number(box.boxDepth) || object.height, 1, object.height);
    const wantedX = clamp(Number(box.boxX) || 0, 0, Math.max(0, object.width - width));
    box.boxWidth = round1(width);
    box.boxDepth = round1(depth);
    box.boxX = round1(clamp(Math.max(wantedX, cursorX), 0, Math.max(0, object.width - width)));
    box.boxY = round1(clamp(Number(box.boxY) || 0, 0, Math.max(0, object.height - depth)));
    cursorX = box.boxX + width;
    if (cursorX > object.width) {
      box.boxX = round1(Math.max(0, object.width - width));
      cursorX = object.width;
    }
  });
}

function inventoryTimingTags(item) {
  const tags = [];
  if (item.trackExpiry) {
    tags.push(item.expiryDate ? `期限 ${formatDate(item.expiryDate)}` : "管理有效期限");
  }
  const runoutDate = getEstimatedRunoutDate(item);
  if (item.trackUsage) {
    tags.push(runoutDate ? `預估用完 ${formatDate(runoutDate)}` : "推估用量");
  }
  if (item.trackLowStock) {
    tags.push(`低庫存 ${Number(item.lowStockThreshold ?? 1)}`);
  }
  return tags.map((tag) => `<span class="tag timing">${escapeHtml(tag)}</span>`).join("");
}

function clearShelfLayerBoxes(object, layer) {
  const boxes = getShelfLayerBoxes(object.id, layer);
  if (!boxes.length) return;
  if (!confirm(`清空「${layer}」的 ${boxes.length} 個箱子？箱子與箱內物品會先移到資源回收桶，7 天後才會永久刪除。`)) return;
  boxes.forEach((box) => {
    const ids = new Set([box.id]);
    let changed = true;
    while (changed) {
      changed = false;
      state.inventory.forEach((candidate) => {
        if (candidate.parentId && ids.has(candidate.parentId) && !ids.has(candidate.id)) {
          ids.add(candidate.id);
          changed = true;
        }
      });
    }
    const deletedAt = new Date().toISOString();
    state.deletedItems ||= [];
    state.inventory.filter((item) => ids.has(item.id)).forEach((item) => state.deletedItems.unshift({ ...structuredClone(item), deletedAt, purgeAfter: addDaysIso(deletedAt, 7) }));
    state.inventory = state.inventory.filter((item) => !ids.has(item.id));
  });
  selectedShelfBoxId = "";
  recordActivity("移到回收桶", { id: object.id, name: `${object.name} ${layer}` }, `清空 ${boxes.length} 個箱子`);
  commit();
}

function isGarbledText(value) {
  const text = String(value || "");
  return text.includes("\uFFFD") || text.includes("??") || text.includes("?") || text.includes("?") || text.includes("?湔");
}

function normalizeLegacyText(value, fallback = "") {
  const text = String(value || "");
  if (!text) return fallback;
  if (text.includes("銝惜")) return "最下層";
  if (text.includes("銝餅") || text.includes("餅")) return "主房間";
  if (text.includes("撱")) return "廁所";
  if (text.includes("蝞")) return "收納箱";
  if (text.includes("嗥")) return "收納";
  if (text.includes("菜") || text.includes("")) return "鐵架";
  if (text.includes("豢")) return "書桌";
  if (text.includes("啁拳")) return "冰箱";
  if (text.includes("銵")) return "衣櫃";
  if (text.includes("摨")) return "床";
  return isGarbledText(text) ? fallback : text;
}

function normalizeLegacyCategories(categories = {}) {
  const normalized = {};
  Object.entries(categories || {}).forEach(([categoryName, subcategories]) => {
    const category = normalizeLegacyText(categoryName, categoryName || "未分類");
    normalized[category] ||= [];
    (Array.isArray(subcategories) ? subcategories : []).forEach((subcategory) => {
      const name = normalizeLegacyText(subcategory?.name, subcategory?.name || "未分類");
      const icon = isGarbledText(subcategory?.icon) ? inferIconForName(name) || "□" : subcategory?.icon || inferIconForName(name) || "□";
      if (!normalized[category].some((item) => item.name === name)) normalized[category].push({ name, icon });
    });
  });
  Object.entries(defaultCategories).forEach(([category, subcategories]) => {
    normalized[category] ||= [];
    subcategories.forEach((subcategory) => {
      if (!normalized[category].some((item) => item.name === subcategory.name)) normalized[category].push({ ...subcategory });
    });
  });
  if (!normalized["收納"]?.some((item) => item.name === "收納箱")) {
    normalized["收納"] ||= [];
    normalized["收納"].push({ name: "收納箱", icon: "📦" });
  }
  return normalized;
}

function repairStateReferences(target) {
  const zoneIds = new Set((target.zones || []).map((zone) => zone.id));
  const mainZone = (target.zones || []).find((zone) => zone.kind === "main") || target.zones?.[0];
  (target.objects || []).forEach((object) => {
    if (!zoneIds.has(object.zoneId)) object.zoneId = mainZone?.id || "main-room";
    object.width = Math.max(1, Number(object.width) || 1);
    object.height = Math.max(1, Number(object.height) || 1);
    object.rotation = normalizeAngle(Number(object.rotation) || 0);
  });

  const objectIds = new Set((target.objects || []).map((object) => object.id));
  const fallbackObjectId = target.objects?.[0]?.id || "";
  const usedItemIds = new Set();
  (target.inventory || []).forEach((item) => {
    if (!item.id || usedItemIds.has(item.id)) item.id = createId("item");
    usedItemIds.add(item.id);
    if (!objectIds.has(item.objectId)) item.objectId = fallbackObjectId;
    item.order = Math.max(1, Number(item.order) || 1);
    item.count = Math.max(0, Number(item.count) || 0);
    item.category = item.category || inferCategoryForItem(item.name) || "未分類";
    item.subcategory = item.subcategory || "未分類";
    target.categories ||= {};
    target.categories[item.category] ||= [];
    if (!target.categories[item.category].some((categoryItem) => categoryItem.name === item.subcategory)) {
      target.categories[item.category].push({ name: item.subcategory, icon: inferIconForName(item.subcategory) || "□" });
    }
  });

  const itemIds = new Set((target.inventory || []).map((item) => item.id));
  (target.inventory || []).forEach((item) => {
    if (item.parentId && (!itemIds.has(item.parentId) || item.parentId === item.id)) item.parentId = "";
    const object = (target.objects || []).find((candidate) => candidate.id === item.objectId);
    if (item.shelfBox && object) {
      item.boxWidth = round1(clamp(Number(item.boxWidth) || object.width, 1, object.width));
      item.boxDepth = round1(clamp(Number(item.boxDepth) || object.height, 1, object.height));
      item.boxX = round1(clamp(Number(item.boxX) || 0, 0, Math.max(0, object.width - item.boxWidth)));
      item.boxY = round1(clamp(Number(item.boxY) || 0, 0, Math.max(0, object.height - item.boxDepth)));
      item.isContainer = true;
    }
  });

  const fixtureIds = new Set((target.fixtures || []).map((fixture) => fixture.id));
  (target.fixtures || []).forEach((fixture) => {
    if (!zoneIds.has(fixture.zoneId)) fixture.zoneId = mainZone?.id || "main-room";
    fixture.size = Math.max(1, Number(fixture.size) || 80);
    fixture.offset = Math.max(0, Number(fixture.offset) || 0);
  });
  if (!objectIds.has(target.selectedObjectId)) target.selectedObjectId = fallbackObjectId;
  if (!fixtureIds.has(target.selectedFixtureId)) target.selectedFixtureId = "";
  target.selectedObjectIds = (target.selectedObjectIds || []).filter((id) => objectIds.has(id));
  if (!target.selectedObjectIds.length && target.selectedObjectId) target.selectedObjectIds = [target.selectedObjectId];

  Object.keys(target.objectLocations || {}).forEach((objectId) => {
    if (!objectIds.has(objectId)) delete target.objectLocations[objectId];
  });
  return target;
}

function normalizeState(saved) {
  const base = getDefaultState();
  const merged = { ...base, ...saved, categories: { ...structuredClone(defaultCategories), ...(saved.categories || {}) }, fixtures: saved.fixtures?.length ? saved.fixtures : defaultFixtures(saved.sceneKey || base.sceneKey, scenePresets[saved.sceneKey || base.sceneKey]), objectLocations: saved.objectLocations || {}, viewNames: { ...base.viewNames, ...(saved.viewNames || {}) }, brand: { ...base.brand, ...(saved.brand || {}) } };
  merged.uiStyle = saved.uiStyle || "workspace";
  merged.sidebarAutoHide = Boolean(saved.sidebarAutoHide);
  merged.personalization = { ...base.personalization, ...(saved.personalization || {}) };
  merged.appearanceProfiles = saved.appearanceProfiles && typeof saved.appearanceProfiles === "object" ? saved.appearanceProfiles : {};
  merged.activeAppearanceProfile = saved.activeAppearanceProfile || "";
  merged.sceneSnapshots = saved.sceneSnapshots && typeof saved.sceneSnapshots === "object" ? saved.sceneSnapshots : {};
  merged.tilePreset = saved.tilePreset || detectTilePresetFor(merged.tileWidth, merged.tileHeight);
  merged.canvasZoom = clamp(Number(saved.canvasZoom) || 1, 0.45, 2.8);
  merged.canvasPanX = Number(saved.canvasPanX) || 0;
  merged.canvasPanY = Number(saved.canvasPanY) || 0;
  merged.layoutPanelWidth = clamp(Number(saved.layoutPanelWidth) || 360, 360, 640);
  merged.objectPanelWidth = clamp(Number(saved.objectPanelWidth) || 430, 360, 720);
  merged.objectContentTopHeight = clamp(Number(saved.objectContentTopHeight) || 360, 180, 760);
  merged.configName = saved.configName && !isGarbledText(saved.configName) ? saved.configName : "未命名配置";
  merged.activityLog = Array.isArray(saved.activityLog) ? saved.activityLog : [];
  merged.deletedItems = Array.isArray(saved.deletedItems) ? saved.deletedItems : [];
  merged.stagingItems = Array.isArray(saved.stagingItems) ? saved.stagingItems : [];
  purgeExpiredDeletedItemsFor(merged);
  merged.lastBackupAt = saved.lastBackupAt || "";
  merged.includeBathroomArea = saved.includeBathroomArea !== false;
  merged.fontFamily = saved.fontFamily || "jhenghei";
  merged.fontScale = clamp(Number(saved.fontScale) || 1, 0.85, 1.35);
  merged.localFolderPromptDismissed = Boolean(saved.localFolderPromptDismissed);
  merged.schemaVersion = Number(saved.schemaVersion) || 2;
  merged.selectedObjectIds = Array.isArray(saved.selectedObjectIds) ? saved.selectedObjectIds : merged.selectedObjectId ? [merged.selectedObjectId] : [];
  merged.zones = (merged.zones || []).map((zone) => {
    const fallbackName = zone.kind === "main" ? "主房間" : zone.id?.includes("bathroom") ? "廁所" : "空間區塊";
    const name = normalizeLegacyText(zone.name, fallbackName);
    const includeInTotal = zone.kind === "main" ? true : zone.includeInTotal ?? (saved.includeBathroomArea !== false || !name.includes("廁所"));
    return { locked: false, ...zone, name, includeInTotal };
  });
  merged.objects = (merged.objects || []).map((object) => {
    const libraryItem = objectLibrary.find((item) => item.key === object.key);
    const fallbackName = libraryItem?.name || "物件";
    const normalized = { locked: false, ...object, name: normalizeLegacyText(object.name, fallbackName), group: normalizeLegacyText(object.group, object.group || libraryItem?.group || "物件") };
    if (!Array.isArray(normalized.storageLayers) || !normalized.storageLayers.length) normalized.storageLayers = defaultLocationsForObject(normalized);
    return normalized;
  });
  merged.categories = normalizeLegacyCategories(merged.categories);
  merged.fixtures = (merged.fixtures || []).map((fixture) => ({ openAngle: fixture.type === "door" ? 90 : 0, openDirection: fixture.type === "door" ? "in-left" : "", locked: false, ...fixture }));
  merged.inventory = (merged.inventory || []).map((item, index) => ({
    id: item.id || `legacy-item-${index}`,
    parentId: item.parentId || "",
    order: item.order || index + 1,
    isContainer: !!item.isContainer,
    trackExpiry: false,
    expiryDate: "",
    expiryWarningDays: 30,
    trackUsage: false,
    usageDaysPerUnit: 0,
    usageStartDate: "",
    purchaseWarningDays: 7,
    trackLowStock: false,
    lowStockThreshold: 1,
    addedAt: localDateString(),
    ...item,
    location: normalizeLegacyText(item.location, "未指定位置"),
    category: normalizeLegacyText(item.category, item.category || "未分類"),
    subcategory: normalizeLegacyText(item.subcategory, item.subcategory || "未分類"),
    name: normalizeLegacyText(item.name, item.name || "物品")
  }));
  Object.entries(merged.objectLocations || {}).forEach(([objectId, locations]) => {
    merged.objectLocations[objectId] = (Array.isArray(locations) ? locations : [])
      .map((location) => normalizeLegacyText(location, "未指定位置"))
      .filter((location, index, list) => location && list.indexOf(location) === index);
  });
  merged.inventory = merged.inventory.map((item) => item.shelfBox ? { boxX: 0, boxY: 0, ...item } : item);
  merged.objects = (merged.objects || []).map((object) => ({ iconUrl: "assets/icons/box.svg", rotation: 0, zoneId: "main-room", ...object }));
  merged.zones = merged.zones?.length ? merged.zones : defaultZones(merged.sceneKey, scenePresets[merged.sceneKey]);
  repairStateReferences(merged);
  syncMainZoneForState(merged);
  return merged;
}

function purgeExpiredDeletedItemsFor(target) {
  const now = Date.now();
  target.deletedItems = (target.deletedItems || []).filter((item) => !item.purgeAfter || new Date(item.purgeAfter).getTime() > now);
}

function syncMainZoneForState(target) {
  if (target.sceneKey === "home") return;
  const main = target.zones.find((zone) => zone.kind === "main");
  if (main) {
    main.width = target.roomWidth;
    main.height = target.roomHeight;
  }
}

async function saveLocalDataFile() {
  const suggestedName = `layout-inventory-${new Date().toISOString().slice(0, 10)}.json`;
  try {
    if ("showSaveFilePicker" in window) {
      if (localFileHandle && !await verifyFilePermission(localFileHandle, true)) localFileHandle = null;
      localFileHandle = localFileHandle || await window.showSaveFilePicker({
        suggestedName,
        types: [{ description: "JSON", accept: { "application/json": [".json"] } }]
      });
      await persistLocalFileHandle(localFileHandle);
      await writeLocalDataFile();
      state.localFolderPromptDismissed = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      renderDataFolderStatus();
      return;
    }
  } catch (error) {
    if (error?.name === "AbortError") return;
  }
  exportDataFile();
}

async function connectLocalDataFolder() {
  try {
    if ("showDirectoryPicker" in window) {
      localDirectoryHandle = await window.showDirectoryPicker({ mode: "readwrite" });
      if (!await verifyFilePermission(localDirectoryHandle, true)) return;
      localFileHandle = await localDirectoryHandle.getFileHandle(LOCAL_DATA_FILENAME, { create: true });
      await persistLocalHandle(LOCAL_DIR_KEY, localDirectoryHandle);
      await persistLocalHandle(LOCAL_FILE_KEY, localFileHandle);
      await writeLocalDataFile({ folder: true });
      state.localFolderPromptDismissed = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      renderDataFolderStatus();
      return;
    }
    await saveLocalDataFile();
  } catch (error) {
    if (error?.name !== "AbortError") {
      $("#save-status").textContent = "無法連接資料資料夾，已改用手動 JSON 備份";
      exportDataFile();
    }
  }
}

function scheduleLocalFileAutosave() {
  if (!localFileHandle) return;
  clearTimeout(localFileSaveTimer);
  localFileSaveTimer = setTimeout(() => writeLocalDataFile({ silent: true }), 350);
}

async function writeLocalDataFile(options = {}) {
  if (!localFileHandle) return;
  if (localFileSaveInProgress) {
    localFileSaveQueued = true;
    return;
  }
  localFileSaveInProgress = true;
  try {
    state.lastBackupAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const writable = await localFileHandle.createWritable();
    await writable.write(JSON.stringify(state, null, 2));
    await writable.close();
    $("#save-status").textContent = options.silent ? "已同步到本機資料檔" : options.folder ? `已連接資料夾並建立 ${LOCAL_DATA_FILENAME}` : "已儲存到本機資料檔";
    $("#save-time").textContent = new Date().toLocaleString("zh-TW", { hour12: false });
    renderDataFolderStatus();
  } catch {
    localFileHandle = null;
    localDirectoryHandle = null;
    $("#save-status").textContent = "本機資料檔無法寫入，請重新連接資料夾";
    renderDataFolderStatus();
  } finally {
    localFileSaveInProgress = false;
    if (localFileSaveQueued) {
      localFileSaveQueued = false;
      scheduleLocalFileAutosave();
    }
  }
}

async function restoreLocalFileHandle() {
  try {
    const directory = await getStoredLocalHandle(LOCAL_DIR_KEY);
    if (directory && await verifyFilePermission(directory, false)) {
      localDirectoryHandle = directory;
      localFileHandle = await directory.getFileHandle(LOCAL_DATA_FILENAME, { create: true });
      $("#save-status").textContent = "已連接上次選擇的資料資料夾";
      renderDataFolderStatus();
      return;
    }
    const handle = await getStoredLocalHandle(LOCAL_FILE_KEY);
    if (handle && await verifyFilePermission(handle, false)) {
      localFileHandle = handle;
      $("#save-status").textContent = "已連接上次選擇的本機資料檔";
      renderDataFolderStatus();
    }
  } catch {
    localFileHandle = null;
    localDirectoryHandle = null;
    renderDataFolderStatus();
  }
}

async function verifyFilePermission(handle, requestPermission) {
  if (!handle?.queryPermission) return true;
  const options = { mode: "readwrite" };
  if (await handle.queryPermission(options) === "granted") return true;
  return requestPermission && handle.requestPermission && await handle.requestPermission(options) === "granted";
}

function openLocalFileDb() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is not available"));
      return;
    }
    const request = indexedDB.open(LOCAL_FILE_DB, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(LOCAL_FILE_STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function persistLocalFileHandle(handle) {
  return persistLocalHandle(LOCAL_FILE_KEY, handle);
}

async function persistLocalHandle(key, handle) {
  try {
    const db = await openLocalFileDb();
    const tx = db.transaction(LOCAL_FILE_STORE, "readwrite");
    tx.objectStore(LOCAL_FILE_STORE).put(handle, key);
  } catch {
    // The current session can still autosave even if the handle cannot be persisted.
  }
}

async function getStoredLocalFileHandle() {
  return getStoredLocalHandle(LOCAL_FILE_KEY);
}

async function getStoredLocalHandle(key) {
  const db = await openLocalFileDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(LOCAL_FILE_STORE, "readonly");
    const request = tx.objectStore(LOCAL_FILE_STORE).get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

function exportDataFile() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `layout-inventory-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function openImportDialog() {
  $("#data-json").value = "";
  $("#import-file").value = "";
  $("#data-dialog").showModal();
}

function readImportFile() {
  const file = $("#import-file").files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { $("#data-json").value = String(reader.result || ""); };
  reader.readAsText(file, "utf-8");
}

function readSelectedImportFile() {
  const file = $("#import-file").files?.[0];
  if (!file) return Promise.resolve("");
  return file.text();
}

function normalizeImportPayload(payload) {
  if (!payload || typeof payload !== "object") throw new Error("empty payload");
  const candidates = [
    payload,
    payload.state,
    payload.data,
    payload.layout,
    payload.layoutInventory,
    payload.layoutInventoryState
  ].filter(Boolean);
  const imported = candidates.find((candidate) => Array.isArray(candidate.objects) && Array.isArray(candidate.inventory));
  if (!imported) throw new Error("invalid schema");
  return imported;
}

async function applyImport() {
  try {
    const fileText = await readSelectedImportFile();
    const inputText = fileText || $("#data-json").value;
    const importFileName = $("#import-file")?.files?.[0]?.name || "";
    if (isTableImport(importFileName, inputText)) {
      const added = importInventoryRows(inputText);
      $("#data-dialog").close();
      $("#save-status").textContent = `已從 Excel/CSV 匯入 ${added} 筆物品`;
      commit();
      return;
    }
    const imported = normalizeImportPayload(JSON.parse(inputText.trim().replace(/^\uFEFF/, "")));
    const summary = `準備匯入：${imported.zones?.length || 0} 個空間區塊、${imported.objects.length} 個物件、${imported.inventory.length} 筆物品。\n\n匯入會覆蓋目前畫面資料，確定要繼續嗎？`;
    if (!confirm(summary)) return;
    state = normalizeState(imported);
    recordActivity("匯入資料", { name: "匯入資料" }, `${state.objects.length} 個物件、${state.inventory.length} 筆物品`);
    commit();
    requestAnimationFrame(ensureCanvasContentVisible);
    $("#data-dialog").close();
  } catch (error) {
    $("#data-json").value = `匯入失敗：這個檔案不是目前支援的 Layout 備份格式。\n\n可匯入格式需要包含 objects 與 inventory。若這是系統輸出的備份，請把這個檔案保留，我可以再幫你做相容修復。\n\n錯誤原因：${error.message}`;
  }
}

function isTableImport(fileName, text) {
  const lowerName = String(fileName || "").toLowerCase();
  if (lowerName.endsWith(".csv") || lowerName.endsWith(".tsv")) return true;
  const firstLine = String(text || "").split(/\r?\n/)[0] || "";
  return firstLine.includes("物品名稱") && (firstLine.includes(",") || firstLine.includes("\t"));
}

function splitTableLine(line, delimiter) {
  const cells = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"' && line[index + 1] === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      cells.push(value.trim());
      value = "";
    } else {
      value += char;
    }
  }
  cells.push(value.trim());
  return cells;
}

function importInventoryRows(text) {
  const lines = String(text || "").replace(/^\uFEFF/, "").split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return 0;
  const delimiter = lines[0].includes("\t") ? "\t" : ",";
  const headers = splitTableLine(lines.shift(), delimiter);
  const indexOf = (name) => headers.findIndex((header) => header.trim() === name);
  const nameIndex = indexOf("物品名稱");
  if (nameIndex < 0) throw new Error("CSV 需要包含「物品名稱」欄位");
  const objectIndex = indexOf("所屬家具");
  const locationIndex = indexOf("放置位置");
  const categoryIndex = indexOf("大標籤");
  const subcategoryIndex = indexOf("小標籤");
  const countIndex = indexOf("數量");
  const expiryIndex = indexOf("有效期限");
  const lowStockIndex = indexOf("低庫存提醒");
  let added = 0;
  lines.forEach((line) => {
    const cells = splitTableLine(line, delimiter);
    const name = cells[nameIndex]?.trim();
    if (!name) return;
    const objectName = cells[objectIndex]?.trim();
    const object = objectName
      ? state.objects.find((candidate) => candidate.name === objectName) || getSelectedObject()
      : getSelectedObject();
    if (!object) return;
    const category = cells[categoryIndex]?.trim() || inferCategoryForItem(name);
    const subcategory = cells[subcategoryIndex]?.trim() || "未分類";
    ensureCategoryAndSubcategory(category, subcategory);
    const location = cells[locationIndex]?.trim() || locationsForObject(object.id)[0] || "未指定位置";
    state.objectLocations ||= {};
    state.objectLocations[object.id] ||= [];
    if (!locationsForObject(object.id).includes(location)) state.objectLocations[object.id].push(location);
    const item = {
      id: createId("item"),
      objectId: object.id,
      location,
      parentId: "",
      order: state.inventory.filter((candidate) => candidate.objectId === object.id).length + 1,
      isContainer: false,
      category,
      subcategory,
      name,
      count: Math.max(1, Number(cells[countIndex]) || 1),
      trackExpiry: Boolean(cells[expiryIndex]?.trim()),
      expiryDate: cells[expiryIndex]?.trim() || "",
      expiryWarningDays: 30,
      trackUsage: false,
      usageDaysPerUnit: 0,
      usageStartDate: "",
      purchaseWarningDays: 7,
      trackLowStock: Boolean(cells[lowStockIndex]?.trim()),
      lowStockThreshold: Math.max(0, Number(cells[lowStockIndex]) || 1),
      addedAt: localDateString()
    };
    state.inventory.push(item);
    recordActivity("Excel 匯入", item, describeItemLocation(item));
    added += 1;
  });
  return added;
}

function downloadImportTemplate() {
  const rows = [
    ["所屬家具", "放置位置", "物品名稱", "數量", "大標籤", "小標籤", "有效期限", "低庫存提醒"],
    [getSelectedObject()?.name || "書桌", locationsForObject(state.selectedObjectId)[0] || "桌面", "雨衣", "2", "生活用品", "雨具", "", ""],
    [getSelectedObject()?.name || "書桌", locationsForObject(state.selectedObjectId)[0] || "桌面", "乖乖", "1", "食品", "日常溫食品", "2026-12-31", "1"]
  ];
  const csv = "\uFEFF" + rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "layout-inventory-import-template.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function openChangelog() {
  const list = $("#changelog-list");
  list.innerHTML = changelogEntries.map((entry) => `
    <article class="changelog-entry">
      <div>
        <time>${escapeHtml(entry.date)}</time>
        <h4>${escapeHtml(entry.title)}</h4>
      </div>
      <ul>
        ${entry.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </article>
  `).join("");
  $("#changelog-dialog").showModal();
}

function deleteSelectedConfig() {
  const configs = getSavedConfigs();
  const name = $("#config-select").value || $("#config-name").value.trim();
  if (!name || !configs[name]) {
    $("#config-select").focus();
    return;
  }
  if (!confirm(`刪除配置「${name}」？這只會刪除已儲存的配置，不會刪除目前畫面上的 Layout 與庫存資料。`)) return;
  delete configs[name];
  localStorage.setItem(CONFIGS_KEY, JSON.stringify(configs));
  if (state.configName === name) state.configName = "未命名配置";
  renderConfigOptions();
  saveState();
  $("#save-status").textContent = `已刪除配置 ${name}`;
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

window.addEventListener("resize", renderCanvas);
init();

