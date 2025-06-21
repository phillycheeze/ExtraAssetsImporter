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
const category = document.getElementById('category');
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

// Show/hide roundness
assetType.addEventListener('change', () => {
  surfaceOptions.style.display = assetType.value === 'Surfaces' ? 'block' : 'none';
  updateJson();
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

// Main generation
generateBtn.addEventListener('click', async () => {
  let json;
  try { json = JSON.parse(jsonEditor.value); }
  catch (e) { alert('Invalid JSON'); return; }

  const zip = new JSZip();
  const root = zip.folder(assetType.value).folder(category.value).folder(assetName.value);
  const jsonName = assetType.value === 'Decals' ? 'decal.json' : 'surface.json';
  root.file(jsonName, JSON.stringify(json, null, 2));

  // Helper to add file
  async function addFile(input, name) {
    if (!input.files[0]) return false;
    const data = await input.files[0].arrayBuffer();
    root.file(name, data);
    return true;
  }

  await addFile(baseInput, '_BaseColorMap.png');
  await addFile(normalInput, '_NormalMap.png');
  if (await addFile(maskInput, '_MaskMap.png') === false) {
    // auto-generate white mask
    const url = URL.createObjectURL(baseInput.files[0]);
    const img = new Image(); img.src = url;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = img.width; canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
    root.file('_MaskMap.png', await blob.arrayBuffer());
    URL.revokeObjectURL(url);
  }
  await addFile(iconInput, 'icon.png');

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${assetName.value}.zip`);
}); 