// Default JSON templates for Decals and Surfaces
// requires UPNG.js (https://github.com/photopea/UPNG.js) for pure JS PNG decoding/encoding
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

// Supported categories for each asset type
const categoriesByType = {
  Decals: ["Text","Beach","Graffiti","Ground","Misc","Parking","RoadMarkings"],
  Surfaces: ["Agriculture","Concrete","Forestry","Grass","Landfill","Oil","Ore","Pavement","Sand","Tiles","Wood"]
};

// Icon map for each category (uses Iconify)
const iconMap = {
  Text: 'mdi:format-letter-case',
  Beach: 'mdi:beach',
  Graffiti: 'mdi:brush',
  Ground: 'mdi:terrain',
  Misc: 'mdi:dots-horizontal',
  Parking: 'mdi:parking',
  RoadMarkings: 'mdi:sign-direction',
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

// Add a color map to tint each category icon
const iconColorMap = {
  Text: 'text-indigo-400',
  Beach: 'text-yellow-400',
  Graffiti: 'text-pink-400',
  Ground: 'text-green-400',
  Misc: 'text-gray-400',
  Parking: 'text-green-500',
  RoadMarkings: 'text-yellow-500',
  Agriculture: 'text-green-600',
  Concrete: 'text-gray-500',
  Forestry: 'text-green-700',
  Grass: 'text-green-300',
  Landfill: 'text-green-800',
  Oil: 'text-yellow-600',
  Ore: 'text-gray-600',
  Pavement: 'text-gray-500',
  Sand: 'text-yellow-300',
  Tiles: 'text-yellow-500',
  Wood: 'text-yellow-700'
};

// Map decal categories to colossal_DecalLayerMask values (1=Terrain,2=Roads,4=Buildings,8=Vehicles,16=Creatures,32=Props)
const categoryMaskMap = {
  Text: 4,
  Beach: 1,
  Graffiti: 4,
  Ground: 1,
  Misc: 32,
  Parking: 2,
  RoadMarkings: 2
};

// Insert AssetJsonBuilder to encapsulate JSON creation logic
class AssetJsonBuilder {
  constructor(assetType, category, roundness, priorityPrefix) {
    this.assetType = assetType;
    this.category = category;
    this.roundness = roundness;
    this.priorityPrefix = priorityPrefix || AssetJsonBuilder.randomPrefix();
  }
  static defaultTemplates = defaultTemplates;
  static categoryMaskMap = categoryMaskMap;
  static drawOrderMap = categoriesByType['Decals'].reduce((map, cat, idx) => {
    map[cat] = idx;
    return map;
  }, {});
  static randomPrefix() { return String(Math.floor(Math.random() * 1000)).padStart(3, '0'); }
  build(index, widthPx, heightPx) {
    const json = JSON.parse(JSON.stringify(AssetJsonBuilder.defaultTemplates[this.assetType]));
    const lastDigit = (index % 9) + 1;
    json.UiPriority = Number(this.priorityPrefix + lastDigit);
    if (this.assetType === 'Surfaces' && typeof this.roundness === 'number') {
      json.m_Roundness = this.roundness;
      json.Float.colossal_EdgeFadeRange = this.roundness;
      json.Float.colossal_EdgeNoise = 1 - this.roundness;
    }
    if (this.assetType === 'Decals') {
      const mask = AssetJsonBuilder.categoryMaskMap[this.category];
      if (mask != null) json.Float.colossal_DecalLayerMask = mask;
      const order = AssetJsonBuilder.drawOrderMap[this.category];
      if (order != null) json.Float._DrawOrder = order;
      if (typeof widthPx === 'number' && typeof heightPx === 'number') {
        json.Float.colossal_MeshSize = {
          x: widthPx / 200,
          y: 0.01,
          z: heightPx / 200
        };
      }
    }
    return json;
  }
}

class AssetGenerator {
  constructor() {
    // Elements
    this.assetType = document.getElementById('assetType');
    this.assetName = document.getElementById('assetName');
    this.roundness = document.getElementById('roundness');
    this.jsonEditor = document.getElementById('jsonEditor');
    this.generateBtn = document.getElementById('generateBtn');
    this.baseInput = document.getElementById('baseColor');
    this.surfaceOptions = document.getElementById('surfaceOptions');
    this.maskProfileOptions = Array.from(document.getElementsByName('maskProfile'));
    this.generateNormalCheckbox = document.getElementById('generateNormal');
    this.previewOriginal = document.getElementById('previewOriginal');
    this.previewNormal = document.getElementById('previewNormal');
    this.previewMask = document.getElementById('previewMask');
    this.previewIcon = document.getElementById('previewIcon');
    this.categoryFieldset = document.getElementById('categoryFieldset');
    this.loaderEls = Array.from(document.querySelectorAll('.loader'));
    this.previewContainer = document.getElementById('previewContainer');

    // Bind events
    this.assetType.addEventListener('change', () => this.onTypeChange());
    this.roundness.addEventListener('input', () => this.updateJson());
    this.baseInput.addEventListener('change', () => this.updatePreviews());
    this.maskProfileOptions.forEach(r => r.addEventListener('change', () => this.updatePreviews()));
    this.generateNormalCheckbox.addEventListener('change', () => this.updatePreviews());
    this.generateBtn.addEventListener('click', () => this.onGenerate());

    // Toggle preview info overlay
    this.previewInfoBtn = document.getElementById('previewInfoBtn');
    this.previewInfoOverlay = document.getElementById('previewInfoOverlay');
    this.closePreviewInfo = document.getElementById('closePreviewInfo');
    this.previewInfoBtn.addEventListener('click', () => this.previewInfoOverlay.classList.remove('hidden'));
    this.closePreviewInfo.addEventListener('click', () => this.previewInfoOverlay.classList.add('hidden'));

    // Initial setup
    this.populateCategoryOptions();
    this.onTypeChange();
    this.updateJson();
    this.updatePreviews();
  }

  onTypeChange() {
    this.surfaceOptions.style.display = this.assetType.value === 'Surfaces' ? 'block' : 'none';
    this.populateCategoryOptions();
    this.updateJson();
    this.updatePreviews();
  }

  populateCategoryOptions() {
    this.categoryFieldset.innerHTML = '<legend>Category <div class="flex flex-wrap gap-4 mt-2"></div>';
    const container = this.categoryFieldset.querySelector('div');
    categoriesByType[this.assetType.value].forEach((cat, i) => {
      const iconId = iconMap[cat] || 'mdi:help-circle';
      const iconColorClass = iconColorMap[cat] || 'text-gray-200';
      const inputId = `category-${cat}`;
      const label = document.createElement('label');
      label.className = 'block w-36';
      label.innerHTML =
        `<input id="${inputId}" type="radio" name="category" value="${cat}" ${i===0?'checked':''} class="sr-only peer">` +
        `<div class="flex cursor-pointer items-center p-2 border rounded-lg text-sm transition-colors peer-checked:border-blue-500 peer-checked:bg-gray-700 peer-checked:text-gray-100">` +
        `<span class="iconify mr-2 ${iconColorClass}" data-icon="${iconId}" data-inline="false"></span>` +
        `<span>${cat}</span></div>`;
      container.appendChild(label);
    });
  }

  updateJson() {
    const tpl = defaultTemplates[this.assetType.value];
    const obj = JSON.parse(JSON.stringify(tpl));
    if (this.assetType.value === 'Surfaces') obj.m_Roundness = parseFloat(this.roundness.value);
    this.jsonEditor.value = JSON.stringify(obj, null, 2);
  }

  async updatePreviews() {
    this._showLoaders();
    const files = Array.from(this.baseInput.files);
    // Clear old previews (keep header)
    const container = document.getElementById('previewContainer');
    while (container.children.length > 1) container.removeChild(container.lastChild);
    if (files.length === 0) { this._hideLoaders(); return; }
    for (const file of files) {
      // load image
      const dataURL = await this.fileToDataURL(file);
      const img = new Image(); img.src = dataURL; await img.decode();
      const origW = img.width, origH = img.height;
      // Ensure both dimensions are divisible by 4 by padding transparent pixels
      const padTo4 = x => x % 4 === 0 ? x : x + (4 - (x % 4));
      const newW = padTo4(origW);
      const newH = padTo4(origH);
      // Create a canvas of the padded size and draw the original at top-left
      const resizeCanvas = this._createCanvas(newW, newH);
      const resizeCtx = resizeCanvas.getContext('2d');
      resizeCtx.clearRect(0, 0, newW, newH);
      resizeCtx.drawImage(img, 0, 0, origW, origH);
      const pixels = resizeCtx.getImageData(0, 0, newW, newH).data;
      // create row
      const row = document.createElement('div');
      row.className = 'grid grid-cols-[auto,1fr,1fr,1fr] gap-4';
      // Icon cell
      const iconCell = document.createElement('div'); iconCell.className = 'preview-box relative';
      const iconCanvas = this._createCanvas(128, 128);
      iconCanvas.className = 'border w-32 h-32';
      // Draw the resized image into the icon canvas, preserving aspect ratio
      const iconCtx = iconCanvas.getContext('2d');
      iconCtx.clearRect(0, 0, 128, 128);
      const fitScale = Math.min(128 / newW, 128 / newH);
      const fitW = Math.floor(newW * fitScale);
      const fitH = Math.floor(newH * fitScale);
      const offsetX = Math.floor((128 - fitW) / 2);
      const offsetY = Math.floor((128 - fitH) / 2);
      // Use the resized full-size canvas as source
      iconCtx.drawImage(resizeCanvas, 0, 0, newW, newH, offsetX, offsetY, fitW, fitH);
      iconCell.appendChild(iconCanvas);
      row.appendChild(iconCell);
      // Original cell
      const origCell = document.createElement('div'); origCell.className = 'preview-box relative';
      const origCanvas = this._createCanvas(newW, newH);
      origCanvas.className = 'border w-full h-auto';
      origCanvas.getContext('2d').drawImage(resizeCanvas, 0, 0);
      origCell.appendChild(origCanvas);
      row.appendChild(origCell);
      // Mask cell
      const maskCell = document.createElement('div'); maskCell.className = 'preview-box relative';
      const maskCanvas = this._createCanvas(newW, newH);
      maskCanvas.className = 'border w-full h-auto';
      const maskPixels = AssetGenerator.generateMaskPixels(pixels, newW, newH, this.getSelectedMaskProfile());
      maskCanvas.getContext('2d').putImageData(new ImageData(maskPixels, newW, newH), 0, 0);
      maskCell.appendChild(maskCanvas);
      row.appendChild(maskCell);
      // Normal cell
      const normCell = document.createElement('div'); normCell.className = 'preview-box relative';
      const normCanvas = this._createCanvas(newW, newH);
      normCanvas.className = 'border w-full h-auto';
      if (this.generateNormalCheckbox.checked) {
        const normPixels = AssetGenerator.generateNormalPixels(pixels, newW, newH);
        normCanvas.getContext('2d').putImageData(new ImageData(normPixels, newW, newH), 0, 0);
      }
      normCell.appendChild(normCanvas);
      row.appendChild(normCell);
      container.appendChild(row);
    }
    this._hideLoaders();
  }

  async onGenerate() {
    const origText = this.generateBtn.innerHTML;
    this.generateBtn.disabled = true;
    this.generateBtn.innerHTML = `<span class="button-loader"></span>Preparing...`;
    try {
      // Replaced JSON.parse and mask override with builder instantiation
      const category = this.getSelectedCategory();
      const builder = new AssetJsonBuilder(this.assetType.value, category, parseFloat(this.roundness.value));

      // Build a ZIP containing AssetPack.json plus one subfolder per uploaded image
      const zip = new JSZip();
      // Include AssetPack.json at the root, using the user-provided asset name as PackName
      zip.file('AssetPack.json', JSON.stringify({ PackName: this.assetName.value }, null, 2));
      // Add category icon SVG to the zip
      try {
        const iconName = iconMap[category];
        const svgUrl = `https://api.iconify.design/${iconName}.svg`;
        const response = await fetch(svgUrl);
        if (response.ok) {
          const svgText = await response.text();
          zip.folder(this.assetType.value).folder(category).file('icon.svg', svgText);
        }
      } catch (e) {
        console.warn('Failed to fetch category icon SVG:', e);
      }
      // Preview rows start after the header row
      const container = document.getElementById('previewContainer');
      const rows = Array.from(container.children).slice(1);
      const files = Array.from(this.baseInput.files);
      const jsonName = this.assetType.value === 'Decals' ? 'decal.json' : 'surface.json';
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const row = rows[i];
        const nameNoExt = file.name.replace(/\.png$/i, '');
        const root = zip.folder(this.assetType.value).folder(category).folder(nameNoExt);
        // add JSON with mesh size
        const canvases = row.querySelectorAll('canvas');
        const origCanvas = canvases[1];
        const widthPx = origCanvas.width;
        const heightPx = origCanvas.height;
        const jsonObj = builder.build(i, widthPx, heightPx);
        root.file(jsonName, JSON.stringify(jsonObj, null, 2));
        // gather canvases: [icon, original, mask, normal]
        const suffixes = ['icon.png', '_BaseColorMap.png', '_MaskMap.png', '_NormalMap.png'];
        for (let j = 0; j < canvases.length; j++) {
          const blob = await new Promise(r => canvases[j].toBlob(r, 'image/png'));
          root.file(suffixes[j], await blob.arrayBuffer());
        }
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, `${this.assetName.value}.zip`);
    } catch (e) {
      console.error(e);
      alert('Failed to generate zip.');
    } finally {
      this.generateBtn.disabled = false;
      this.generateBtn.innerHTML = origText;
    }
  }

  getSelectedCategory() {
    const sel = Array.from(document.getElementsByName('category')).find(r => r.checked);
    return sel ? sel.value : '';
  }

  getSelectedMaskProfile() {
    const sel = this.maskProfileOptions.find(r => r.checked);
    return sel ? sel.value : '';
  }

  fileToDataURL(file) {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result);
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });
  }

  _createCanvas(w, h) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; return c;
  }

  _drawToCanvas(target, src, w, h) {
    target.width = w; target.height = h;
    const ctx = target.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(src, 0, 0, w, h);
  }

  _showLoaders() { this.loaderEls.forEach(l => l.style.display = 'flex'); }
  _hideLoaders() { this.loaderEls.forEach(l => l.style.display = 'none'); }

  static generateNormalPixels(pixels, w, h) {
    const out = new Uint8ClampedArray(pixels.length);
    const sobelX = [-1,0,1,-2,0,2,-1,0,1];
    const sobelY = [1,2,1,0,0,0,-1,-2,-1];
    const ALPHA_THRESHOLD = 16; // ignore pixels with low alpha (transparent halos)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const baseIdx = (y * w + x) * 4;
        const origAlpha = pixels[baseIdx + 3];
        if (origAlpha < ALPHA_THRESHOLD) {
          // flat normal for transparent areas
          out[baseIdx]     = 128;
          out[baseIdx + 1] = 128;
          out[baseIdx + 2] = 255;
          out[baseIdx + 3] = 255;
          continue;
        }
        let gx = 0, gy = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const ix = Math.min(w-1, Math.max(0, x+kx));
            const iy = Math.min(h-1, Math.max(0, y+ky));
            const idx = (iy*w + ix)*4;
            const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2];
            const lum = 0.2126*r + 0.7152*g + 0.0722*b;
            const wIdx = (ky+1)*3 + (kx+1);
            gx += sobelX[wIdx]*lum;
            gy += sobelY[wIdx]*lum;
          }
        }
        let nx = -gx/255, ny = -gy/255, nz = 1;
        const len = Math.sqrt(nx*nx+ny*ny+nz*nz);
        nx /= len; ny /= len; nz /= len;
        const px = ((nx+1)*0.5)*255;
        const py = ((ny+1)*0.5)*255;
        const pz = ((nz+1)*0.5)*255;
        const oidx = (y*w + x)*4;
        out[oidx] = px; out[oidx+1] = py; out[oidx+2] = pz; out[oidx+3] = 255;
      }
    }
    return out;
  }

  static generateMaskPixels(pixels, w, h, profile) {
    // Pack channels for Unity HDRP mask map: R=Metallic, G=AO, B=Detail, A=Smoothness
    const out = new Uint8ClampedArray(pixels.length);
    const ALPHA_THRESHOLD = 16; // ignore pixels with low alpha (e.g., drop glow)
    for (let i = 0; i < pixels.length; i += 4) {
      const origAlpha = pixels[i + 3];
      if (origAlpha < ALPHA_THRESHOLD) {
        // fully transparent: no mask
        out[i] = 0; out[i + 1] = 0; out[i + 2] = 0; out[i + 3] = 0;
        continue;
      }
      const r = pixels[i], g = pixels[i+1], b = pixels[i+2];
      const lum = 0.2126*r + 0.7152*g + 0.0722*b;
      let detailMask, smoothness;
      if (profile === 'natural') {
        detailMask = smoothness = lum;
      } else if (profile === 'silhouette') {
        detailMask = smoothness = lum >= 128 ? 255 : 0;
      } else if (profile === 'reflective') {
        detailMask = smoothness = Math.min(255, (lum - 128) * 1.5 + 128);
      } else if (profile === 'matte') {
        detailMask = smoothness = lum * 0.5 + 64;
      } else {
        detailMask = smoothness = lum;
      }
      const metallic = 128; // default 0.5
      const ao = 128;       // default 0.5
      out[i]     = metallic;   // Red channel: Metallic
      out[i + 1] = ao;         // Green channel: Ambient Occlusion
      out[i + 2] = detailMask; // Blue channel: Detail Mask
      out[i + 3] = smoothness; // Alpha channel: Smoothness
    }
    return out;
  }

  static scalePixels(pixels, w, h, nw, nh) {
    const out = new Uint8ClampedArray(nw*nh*4);
    for (let y = 0; y < nh; y++) {
      for (let x = 0; x < nw; x++) {
        const sx = Math.floor(x * w / nw);
        const sy = Math.floor(y * h / nh);
        const sIdx = (sy*w + sx)*4;
        const dIdx = (y*nw + x)*4;
        out[dIdx] = pixels[sIdx]; out[dIdx+1] = pixels[sIdx+1];
        out[dIdx+2] = pixels[sIdx+2]; out[dIdx+3] = pixels[sIdx+3];
      }
    }
    return out;
  }

  // helper: get RGBA pixels from Image via hidden canvas
  _getImageDataPixels(img, w, h) {
    const c = this._createCanvas(w,h);
    const ctx = c.getContext('2d'); ctx.drawImage(img,0,0);
    return ctx.getImageData(0,0,w,h).data;
  }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => new AssetGenerator()); 