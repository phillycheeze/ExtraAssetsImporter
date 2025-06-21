// Default JSON templates for Decals and Surfaces
const defaultTemplates = {
  Decals: {
    UiPriority: 0,
    Float: {
      _Metallic: 1,
      _Smoothness: 1,
      colossal_DecalLayerMask: 1,
      _AffectAlbedo: 1,
      _AffectMetal: 1,
      _AffectNormal: 1,
      _AffectSmoothness: 1,
      _DecalColorMask0: 15,
      _DecalColorMask1: 15,
      _DecalColorMask2: 11,
      _DecalColorMask3: 8,
      _DecalMeshBiasType: 0,
      _DecalMeshDepthBias: 0,
      _DecalMeshViewBias: 0,
      _DecalStencilRef: 16,
      _DecalStencilWriteMask: 16,
      _DrawOrder: 0,
      _MetallicAlphaSource: 0,
      _MetallicOpacity: 1,
      _NormalAlphaSource: 0,
      _NormalOpacity: 1
    },
    Vector: {
      _BaseColor: { x: 1, y: 1, z: 1, w: 1 },
      _BaseColorMap_ST: { x: 1, y: 1, z: 0, w: 0 },
      _BaseColorMap_TexelSize: { x: 1, y: 1, z: 1, w: 1 },
      _BaseColorMap_HDR: { x: 1, y: 1, z: 0, w: 0 },
      _MaskMap_ST: { x: 1, y: 1, z: 0, w: 0 },
      _MaskMap_TexelSize: { x: 1, y: 1, z: 1, w: 1 },
      _MaskMap_HDR: { x: 1, y: 1, z: 0, w: 0 },
      _NormalMap_ST: { x: 1, y: 1, z: 0, w: 0 },
      _NormalMap_TexelSize: { x: 1, y: 1, z: 1, w: 1 },
      _NormalMap_HDR: { x: 1, y: 1, z: 0, w: 0 },
      unity_Lightmaps_ST: { x: 1, y: 1, z: 0, w: 0 },
      unity_Lightmaps_TexelSize: { x: 1, y: 1, z: 1, w: 1 },
      unity_Lightmaps_HDR: { x: 1, y: 1, z: 0, w: 0 },
      unity_LightmapsInd_ST: { x: 1, y: 1, z: 0, w: 0 },
      unity_LightmapsInd_TexelSize: { x: 1, y: 1, z: 1, w: 1 },
      unity_LightmapsInd_HDR: { x: 1, y: 1, z: 0, w: 0 },
      unity_ShadowMasks_ST: { x: 1, y: 1, z: 0, w: 0 },
      unity_ShadowMasks_TexelSize: { x: 1, y: 1, z: 1, w: 1 },
      unity_ShadowMasks_HDR: { x: 1, y: 1, z: 0, w: 0 }
    },
    prefabIdentifierInfos: []
  },
  Surfaces: {
    UiPriority: 0,
    m_Roundness: 0.5,
    Float: {
      _Metallic: 1,
      _Smoothness: 1,
      colossal_DecalLayerMask: 1,
      _AffectAlbedo: 1,
      _AffectMetal: 1,
      _AffectNormal: 1,
      _AffectSmoothness: 1,
      _DecalColorMask0: 15,
      _DecalColorMask1: 15,
      _DecalColorMask2: 11,
      _DecalColorMask3: 8,
      _DecalMeshBiasType: 0,
      _DecalMeshDepthBias: 0,
      _DecalMeshViewBias: 0,
      _DecalStencilRef: 16,
      _DecalStencilWriteMask: 16,
      _DrawOrder: 0,
      _MetallicAlphaSource: 0,
      _MetallicOpacity: 1,
      _NormalAlphaSource: 0,
      _NormalOpacity: 1,
      colossal_EdgeNormal: 0,
      colossal_UVScale: 1
    },
    Vector: { /* same structure as decals by default, can be customized */ },
    prefabIdentifierInfos: []
  }
};

// Elements
const assetType = document.getElementById('assetType');
// Category radios populated dynamically; use getSelectedCategory()
const assetName = document.getElementById('assetName');
const uiPriority = document.getElementById('uiPriority');
const roundness = document.getElementById('roundness');
const jsonEditor = document.getElementById('jsonEditor');
const generateBtn = document.getElementById('generateBtn');
const baseInput = document.getElementById('baseColor');
const normalInput = document.getElementById('normalMap');
const maskInput = document.getElementById('maskMap');
const iconInput = document.getElementById('icon');
const surfaceOptions = document.getElementById('surfaceOptions');

// Supported categories for each asset type
const categoriesByType = {
  Decals: ["Alphabet","Beach","Graffiti","Ground","Industry","Leaf","Misc","Numbers","Parking","Puddles","RoadAssets","RoadMarkings","Stains","Trash","WallDecor"],
  Surfaces: ["Agriculture","Concrete","Forestry","Grass","Landfill","Oil","Ore","Pavement","Sand","Tiles","Wood"]
};

// Populate category radio buttons
const categoryFieldset = document.getElementById('categoryFieldset');
function populateCategoryOptions(type) {
  categoryFieldset.innerHTML = '<legend>Category <span class="info" title="Select the asset category/subfolder">ℹ️</span>';
  categoriesByType[type].forEach((cat, i) => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="radio" name="category" value="${cat}"${i===0?' checked':''}> ${cat}`;
    categoryFieldset.appendChild(label);
  });
}

function getSelectedCategory() {
  const sel = Array.from(document.getElementsByName('category')).find(r=>r.checked);
  return sel ? sel.value : '';
}

// Initial category options
populateCategoryOptions(assetType.value);

// Show/hide roundness
assetType.addEventListener('change', () => {
  surfaceOptions.style.display = assetType.value === 'Surfaces' ? 'block' : 'none';
  updateJson();
  populateCategoryOptions(assetType.value);
  updatePreviews();
});

// Update JSON editor
function updateJson() {
  let tpl = defaultTemplates[assetType.value];
  let obj = JSON.parse(JSON.stringify(tpl));
  obj.UiPriority = parseInt(uiPriority.value, 10);
  if (assetType.value === 'Surfaces') obj.m_Roundness = parseFloat(roundness.value);
  jsonEditor.value = JSON.stringify(obj, null, 2);
}

// Initial JSON
updateJson();

// Re-generate JSON on input changes
[uiPriority, roundness].forEach(el => el.addEventListener('input', updateJson));

// Helper to read file as Data URL
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

// Elements for mask generation and preview
const maskOptions = document.getElementsByName('maskOption');
const thresholdControl = document.getElementById('thresholdControl');
const thresholdInput = document.getElementById('threshold');
const previewOriginal = document.getElementById('previewOriginal');
const previewMask = document.getElementById('previewMask');
const previewIcon = document.getElementById('previewIcon');

// Update previews when inputs change
async function updatePreviews() {
  if (!baseInput.files[0]) return;
  const dataURL = await fileToDataURL(baseInput.files[0]);
  const img = new Image();
  img.src = dataURL;
  await img.decode();
  const w = img.width, h = img.height;
  // original
  previewOriginal.width = w; previewOriginal.height = h;
  const ctxO = previewOriginal.getContext('2d');
  ctxO.clearRect(0,0,w,h);
  ctxO.drawImage(img,0,0);
  // mask
  const mCanvas = document.createElement('canvas');
  mCanvas.width = w; mCanvas.height = h;
  const ctxM = mCanvas.getContext('2d');
  const selected = Array.from(maskOptions).find(r=>r.checked).value;
  if (selected === 'upload' && maskInput.files[0]) {
    const maskURL = await fileToDataURL(maskInput.files[0]);
    const mImg = new Image(); mImg.src = maskURL; await mImg.decode();
    ctxM.drawImage(mImg,0,0,w,h);
  } else if (selected === 'luminance') {
    ctxM.drawImage(img,0,0);
    const imgData = ctxM.getImageData(0,0,w,h);
    const data = imgData.data;
    for (let i=0;i<data.length;i+=4){
      const lum = 0.2126*data[i]+0.7152*data[i+1]+0.0722*data[i+2];
      data[i]=data[i+1]=data[i+2]=lum;
    }
    ctxM.putImageData(imgData,0,0);
  } else if (selected === 'threshold') {
    ctxM.drawImage(img,0,0);
    const imgData = ctxM.getImageData(0,0,w,h);
    const data = imgData.data;
    const thresh = parseInt(thresholdInput.value,10);
    for (let i=0;i<data.length;i+=4){
      const lum = 0.2126*data[i]+0.7152*data[i+1]+0.0722*data[i+2];
      const v = lum>=thresh?255:0;
      data[i]=data[i+1]=data[i+2]=v;
    }
    ctxM.putImageData(imgData,0,0);
  } else {
    ctxM.fillStyle='white'; ctxM.fillRect(0,0,w,h);
  }
  previewMask.width=w; previewMask.height=h;
  const ctxPM = previewMask.getContext('2d'); ctxPM.clearRect(0,0,w,h); ctxPM.drawImage(mCanvas,0,0);
  // icon
  previewIcon.width=128; previewIcon.height=128;
  const ctxI = previewIcon.getContext('2d'); ctxI.clearRect(0,0,128,128);
  let iconImg = new Image();
  if (iconInput.files[0]) {
    iconImg.src = await fileToDataURL(iconInput.files[0]);
    await iconImg.decode();
    ctxI.drawImage(iconImg,0,0,128,128);
  } else {
    const scale = 128/Math.max(w,h);
    const iw = w*scale, ih = h*scale;
    ctxI.fillStyle='transparent'; ctxI.fillRect(0,0,128,128);
    ctxI.drawImage(img,(128-iw)/2,(128-ih)/2,iw,ih);
  }
}

// bind events for previews
baseInput.addEventListener('change', updatePreviews);
maskInput.addEventListener('change', updatePreviews);
iconInput.addEventListener('change', updatePreviews);
thresholdInput.addEventListener('input', updatePreviews);
maskOptions.forEach(r=>r.addEventListener('change', e=>{
  thresholdControl.style.display = e.target.value==='threshold'?'block':'none';
  maskInput.disabled = e.target.value!=='upload';
  updatePreviews();
}));

// Main generation
generateBtn.addEventListener('click', async () => {
  let json;
  try { json = JSON.parse(jsonEditor.value); }
  catch (e) { alert('Invalid JSON'); return; }

  const selectedCategory = getSelectedCategory();
  if (!selectedCategory) { alert('Please select a category.'); return; }
  const root = zip.folder(assetType.value).folder(selectedCategory).folder(assetName.value);
  const jsonName = assetType.value === 'Decals' ? 'decal.json' : 'surface.json';
  root.file(jsonName, JSON.stringify(json, null, 2));

  // Helper to add file
  async function addFile(input, name) {
    if (!input.files[0]) return false;
    const data = await input.files[0].arrayBuffer();
    root.file(name, data);
    return true;
  }

  // add base & normal maps
  await addFile(baseInput, '_BaseColorMap.png');
  await addFile(normalInput, '_NormalMap.png');
  // mask map: upload or generate per selection
  const maskOpt = Array.from(maskOptions).find(r=>r.checked).value;
  if (maskOpt === 'upload') {
    if (!await addFile(maskInput, '_MaskMap.png')) {
      // fallback solid white
      const mCanvas = document.createElement('canvas');
      mCanvas.width = previewMask.width; mCanvas.height = previewMask.height;
      const ctxM = mCanvas.getContext('2d');
      ctxM.fillStyle = 'white'; ctxM.fillRect(0,0,mCanvas.width,mCanvas.height);
      const blobM = await new Promise(r=>mCanvas.toBlob(r,'image/png'));
      root.file('_MaskMap.png', await blobM.arrayBuffer());
    }
  } else {
    // generate from preview
    const mCanvas = document.createElement('canvas');
    mCanvas.width = previewMask.width; mCanvas.height = previewMask.height;
    const ctxM = mCanvas.getContext('2d');
    ctxM.drawImage(previewMask,0,0);
    const blobM = await new Promise(r=>mCanvas.toBlob(r,'image/png'));
    root.file('_MaskMap.png', await blobM.arrayBuffer());
  }
  // icon: upload or generate
  if (iconInput.files[0]) {
    await addFile(iconInput, 'icon.png');
  } else {
    const iCanvas = document.createElement('canvas');
    iCanvas.width = 128; iCanvas.height = 128;
    const ctxI = iCanvas.getContext('2d');
    ctxI.drawImage(previewIcon,0,0);
    const blobI = await new Promise(r=>iCanvas.toBlob(r,'image/png'));
    root.file('icon.png', await blobI.arrayBuffer());
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${assetName.value}.zip`);
}); 