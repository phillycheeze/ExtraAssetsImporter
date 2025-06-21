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
const assetName = document.getElementById('assetName');
const uiPriority = document.getElementById('uiPriority');
const roundness = document.getElementById('roundness');
const jsonEditor = document.getElementById('jsonEditor');
const generateBtn = document.getElementById('generateBtn');
const baseInput = document.getElementById('baseColor');
const surfaceOptions = document.getElementById('surfaceOptions');
// Mask profile & normal generation controls
const maskProfileOptions = document.getElementsByName('maskProfile');
const generateNormalCheckbox = document.getElementById('generateNormal');
// Preview canvases
const previewOriginal = document.getElementById('previewOriginal');
const previewNormal = document.getElementById('previewNormal');
const previewMask = document.getElementById('previewMask');
const previewIcon = document.getElementById('previewIcon');

// Supported categories for each asset type
const categoriesByType = {
  Decals: ["Alphabet","Beach","Graffiti","Ground","Industry","Leaf","Misc","Numbers","Parking","Puddles","RoadAssets","RoadMarkings","Stains","Trash","WallDecor"],
  Surfaces: ["Agriculture","Concrete","Forestry","Grass","Landfill","Oil","Ore","Pavement","Sand","Tiles","Wood"]
};

// Icon map for each category (uses Iconify)
const iconMap = {
  Alphabet: 'mdi:format-letter-case',
  Beach: 'mdi:beach',
  Graffiti: 'mdi:brush',
  Ground: 'mdi:terrain',
  Industry: 'mdi:factory',
  Leaf: 'mdi:leaf',
  Misc: 'mdi:dots-horizontal',
  Numbers: 'mdi:numeric',
  Parking: 'mdi:parking',
  Puddles: 'mdi:water',
  RoadAssets: 'mdi:road-variant',
  RoadMarkings: 'mdi:sign-direction',
  Stains: 'mdi:water-off',
  Trash: 'mdi:trash-can',
  WallDecor: 'mdi:wall',
  Agriculture: 'mdi:agriculture',
  Concrete: 'mdi:warehouse',
  Forestry: 'mdi:forest',
  Grass: 'mdi:grass',
  Landfill: 'mdi:delete-empty',
  Oil: 'mdi:oil-lamp',
  Ore: 'mdi:mine',
  Pavement: 'mdi:road',
  Sand: 'mdi:beach',
  Tiles: 'mdi:grid',
  Wood: 'mdi:wood'
};

// Populate category radio buttons
const categoryFieldset = document.getElementById('categoryFieldset');
function populateCategoryOptions(type) {
  categoryFieldset.innerHTML = '<legend>Category <span class="info" title="Select the asset category/subfolder">ℹ️</span>';
  categoriesByType[type].forEach((cat, i) => {
    const iconId = iconMap[cat] || 'mdi:help-circle';
    const label = document.createElement('label');
    label.innerHTML =
      `<input type="radio" name="category" value="${cat}"${i===0?' checked':''}> ` +
      `<span class="iconify" data-icon="${iconId}" data-inline="false" style="vertical-align:middle;margin-right:4px;"></span> ${cat}`;
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

// Update previews when inputs change
async function updatePreviews() {
  // show loaders
  document.querySelectorAll('.loader').forEach(l=>{ l.style.display='flex'; });
  if (!baseInput.files[0]) {
    document.querySelectorAll('.loader').forEach(l=>{ l.style.display='none'; });
    return;
  }
  const dataURL = await fileToDataURL(baseInput.files[0]);
  const img = new Image();
  img.src = dataURL;
  await img.decode();
  const w = img.width, h = img.height;
  // Original (Base Color)
  previewOriginal.width = w; previewOriginal.height = h;
  const ctxO = previewOriginal.getContext('2d');
  ctxO.clearRect(0,0,w,h);
  ctxO.drawImage(img,0,0);
  // Normal Map (if enabled)
  previewNormal.width = w; previewNormal.height = h;
  const ctxN = previewNormal.getContext('2d');
  ctxN.clearRect(0,0,w,h);
  if (generateNormalCheckbox.checked) {
    // generate normal map via Sobel on brightness
    const hCanvas = document.createElement('canvas'); hCanvas.width=w; hCanvas.height=h;
    const hCtx = hCanvas.getContext('2d');
    hCtx.drawImage(img,0,0);
    const hData = hCtx.getImageData(0,0,w,h).data;
    const nImg = hCtx.createImageData(w,h);
    // kernels
    const sobelX = [-1,0,1,-2,0,2,-1,0,1];
    const sobelY = [1,2,1,0,0,0,-1,-2,-1];
    for (let y=0; y<h; y++) {
      for (let x=0; x<w; x++) {
        let gx=0, gy=0;
        for (let ky=-1; ky<=1; ky++) {
          for (let kx=-1; kx<=1; kx++) {
            const ix = Math.min(w-1, Math.max(0, x+kx));
            const iy = Math.min(h-1, Math.max(0, y+ky));
            const idx = (iy*w + ix)*4;
            const lum = 0.2126*hData[idx] + 0.7152*hData[idx+1] + 0.0722*hData[idx+2];
            const wIdx = (ky+1)*3 + (kx+1);
            gx += sobelX[wIdx]*lum;
            gy += sobelY[wIdx]*lum;
          }
        }
        // normal vector
        let nx = -gx/255, ny = -gy/255, nz = 1;
        const len = Math.sqrt(nx*nx+ny*ny+nz*nz);
        nx/=len; ny/=len; nz/=len;
        const px = ((nx+1)*0.5)*255;
        const py = ((ny+1)*0.5)*255;
        const pz = ((nz+1)*0.5)*255;
        const oidx = (y*w + x)*4;
        nImg.data[oidx] = px;
        nImg.data[oidx+1] = py;
        nImg.data[oidx+2] = pz;
        nImg.data[oidx+3] = 255;
      }
    }
    ctxN.putImageData(nImg,0,0);
  }
  // mask
  const mCanvas = document.createElement('canvas'); mCanvas.width=w; mCanvas.height=h;
  const ctxM = mCanvas.getContext('2d');
  const selected = Array.from(maskProfileOptions).find(r=>r.checked).value;
  if (selected === 'natural') {
    ctxM.drawImage(img,0,0);
    const imgData = ctxM.getImageData(0,0,w,h);
    const data = imgData.data;
    for (let i=0;i<data.length;i+=4){
      const lum = 0.2126*data[i]+0.7152*data[i+1]+0.0722*data[i+2];
      data[i]=data[i+1]=data[i+2]=lum;
    }
    ctxM.putImageData(imgData,0,0);
  } else if (selected === 'silhouette') {
    ctxM.drawImage(img,0,0);
    const imgData2 = ctxM.getImageData(0,0,w,h);
    const data2 = imgData2.data;
    for (let i=0;i<data2.length;i+=4){
      const lum = 0.2126*data2[i]+0.7152*data2[i+1]+0.0722*data2[i+2];
      const v = lum>=128?255:0;
      data2[i]=data2[i+1]=data2[i+2]=v;
    }
    ctxM.putImageData(imgData2,0,0);
  } else if (selected === 'reflective') {
    ctxM.drawImage(img,0,0);
    const imgData3 = ctxM.getImageData(0,0,w,h);
    const data3 = imgData3.data;
    for (let i=0;i<data3.length;i+=4){
      const lum = 0.2126*data3[i]+0.7152*data3[i+1]+0.0722*data3[i+2];
      const v = Math.min(255, (lum-128)*1.5+128);
      data3[i]=data3[i+1]=data3[i+2]=v;
    }
    ctxM.putImageData(imgData3,0,0);
  } else if (selected === 'matte') {
    ctxM.drawImage(img,0,0);
    const imgData4 = ctxM.getImageData(0,0,w,h);
    const data4 = imgData4.data;
    for (let i=0;i<data4.length;i+=4){
      const lum = 0.2126*data4[i]+0.7152*data4[i+1]+0.0722*data4[i+2];
      const v = lum*0.5+64;
      data4[i]=data4[i+1]=data4[i+2]=v;
    }
    ctxM.putImageData(imgData4,0,0);
  }
  previewMask.width=w; previewMask.height=h;
  const ctxPM = previewMask.getContext('2d'); ctxPM.clearRect(0,0,w,h); ctxPM.drawImage(mCanvas,0,0);
  // Icon preview
  previewIcon.width=128; previewIcon.height=128;
  const ctxI = previewIcon.getContext('2d');
  ctxI.clearRect(0,0,128,128);
  const scaleI = 128/Math.max(w,h);
  const iw = w*scaleI, ih = h*scaleI;
  ctxI.drawImage(img,(128-iw)/2,(128-ih)/2,iw,ih);
  // hide loaders
  document.querySelectorAll('.loader').forEach(l=>{ l.style.display='none'; });
}

// bind events for previews
baseInput.addEventListener('change', updatePreviews);
maskProfileOptions.forEach(r=>r.addEventListener('change', updatePreviews));
generateNormalCheckbox.addEventListener('change', updatePreviews);

// Main generation
generateBtn.addEventListener('click', async () => {
  const originalText = generateBtn.innerHTML;
  generateBtn.disabled = true;
  generateBtn.innerHTML = `<span class="button-loader"></span>Preparing...`;
  try {
    let json;
    try { json = JSON.parse(jsonEditor.value); }
    catch (e) { alert('Invalid JSON'); return; }

    const zip = new JSZip();
    const selectedCategory = getSelectedCategory();
    if (!selectedCategory) { alert('Please select a category.'); return; }
    const root = zip.folder(assetType.value).folder(selectedCategory).folder(assetName.value);
    const jsonName = assetType.value === 'Decals' ? 'decal.json' : 'surface.json';
    root.file(jsonName, JSON.stringify(json, null, 2));

    // package textures from previews
    const baseBlob = await new Promise(r => previewOriginal.toBlob(r, 'image/png'));
    root.file('_BaseColorMap.png', await baseBlob.arrayBuffer());
    const normalBlob = await new Promise(r => previewNormal.toBlob(r, 'image/png'));
    root.file('_NormalMap.png', await normalBlob.arrayBuffer());
    const maskBlob = await new Promise(r => previewMask.toBlob(r, 'image/png'));
    root.file('_MaskMap.png', await maskBlob.arrayBuffer());
    const iconBlob = await new Promise(r => previewIcon.toBlob(r, 'image/png'));
    root.file('icon.png', await iconBlob.arrayBuffer());

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${assetName.value}.zip`);
  } catch (e) {
    console.error('ZIP generation error:', e);
    alert('Failed to generate zip.');
  } finally {
    generateBtn.disabled = false;
    generateBtn.innerHTML = originalText;
  }
}); 