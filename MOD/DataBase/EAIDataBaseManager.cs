﻿using Colossal.IO.AssetDatabase;
using Colossal.Json;
using ExtraLib;
using Game.Prefabs;
using System;
using System.Collections.Generic;
using System.IO;

namespace ExtraAssetsImporter.DataBase
{
    internal static class EAIDataBaseManager
    {
        const int DataBaseVersion = 2;
        private static readonly string pathToAssetsDatabase = Path.Combine(EAI.pathModsData, "AssetsDataBase.json");
        public static EAIDataBase eaiDataBase;
        private static readonly List<EAIAsset> ValidateAssetsDataBase = new List<EAIAsset>();
        private static List<EAIAsset> AssetsDataBase = new List<EAIAsset>();
        //public static ILocalAssetDatabase assetDataBaseEAI { get; private set; } = AssetDatabase<AssetDataBaseEAI>.instance;
        public static ILocalAssetDatabase assetDataBaseEAI => AssetDatabase<AssetDataBaseEAI>.instance;

        internal static void LoadDataBase()
        {
            if (File.Exists(pathToAssetsDatabase))
            {
                try
                {
                    eaiDataBase = Decoder.Decode(File.ReadAllText(pathToAssetsDatabase)).Make<EAIDataBase>();
                    if (eaiDataBase.DataBaseVersion != DataBaseVersion) return;
                    AssetsDataBase = eaiDataBase.AssetsDataBase;
                }
                catch
                {

                }
            }
            else
            {
                eaiDataBase = new();
            }

            CheckIfDataBaseNeedToBeRelocated();

            AssetDatabase.global.RegisterDatabase(assetDataBaseEAI).Wait();

            EAI.Logger.Info($"DataBase Location : {assetDataBaseEAI.rootPath}.");
        }

        internal static void SaveValidateDataBase()
        {
            if (!EAI.m_Setting.DeleteNotLoadedAssets)
            {
                ValidateAssetsDataBase.AddRange(AssetsDataBase);
                AssetsDataBase.Clear();
            }

            eaiDataBase.DataBaseVersion = DataBaseVersion;
            eaiDataBase.AssetsDataBase = ValidateAssetsDataBase;
            SaveDataBase();

            //assetDataBaseEAI.ResaveCache().Wait();
        }

        internal static void SaveDataBase()
        {
            EAI.Logger.Info($"Saving the database at {pathToAssetsDatabase}, saving {eaiDataBase.AssetsDataBase.Count} assets.");
            string directoryPath = Path.GetDirectoryName(pathToAssetsDatabase);
            if (!Directory.Exists(directoryPath)) Directory.CreateDirectory(directoryPath);
            File.WriteAllText(pathToAssetsDatabase, Encoder.Encode(eaiDataBase, EncodeOptions.None));
        }

        internal static void ClearNotLoadedAssetsFromFiles()
        {
            List<EAIAsset> tempDataBase = new(AssetsDataBase);
            EAI.Logger.Info($"Going to remove unused asset from database, number of asset : {AssetsDataBase.Count}");
            foreach (EAIAsset asset in tempDataBase)
            {
                string path = Path.Combine(AssetDataBaseEAI.kRootPath, asset.AssetPath);
                if (Directory.Exists(path))
                {
                    if (!AssetsDataBase.Remove(asset))
                    {
                        EAI.Logger.Warn($"Failed to remove a none loaded asset at path {path} from the data base.");
                        continue;
                    }
                    Directory.Delete(path, true);
                }
                else EAI.Logger.Warn($"Trying to delete a none loaded asset at path {path}, but this path doesn't exist.");
            }
            EAI.Logger.Info($"Removed unused asset from database, number of asset in database now : {AssetsDataBase.Count}.");
            ValidateAssetsDataBase.AddRange(AssetsDataBase);
            AssetsDataBase.Clear();
        }

        internal static void DeleteDatabase()
        {
            EAI.Logger.Info("Deleting the database.");
            //if(File.Exists(pathToAssetsDatabase)) File.Delete(pathToAssetsDatabase);
            //if(Directory.Exists(AssetDataBaseEAI.kRootPath)) Directory.Delete(AssetDataBaseEAI.kRootPath, true);
            eaiDataBase.AssetsDataBase = new();
            ValidateAssetsDataBase.Clear();
            AssetsDataBase.Clear();
            SaveDataBase();
        }

        private static void ValidateAssets(string AssetID)
        {
            if (AssetID == null) { EAI.Logger.Warn("Try to validate an assets with a null AssetID."); return; }
            ValidateAssets(GetEAIAsset(AssetID));
        }

        private static void ValidateAssets(EAIAsset asset)
        {
            if (asset == EAIAsset.Null) return;
            AssetsDataBase.Remove(asset);
            ValidateAssetsDataBase.Add(asset);
        }

        //   internal static void AddAssets(string AssetID, int Hash, string AssetPath)
        //{
        //	EAIAsset asset = new()
        //	{
        //		AssetID = AssetID,
        //		AssetHash = Hash
        //	};
        //	AddAssets(asset);
        //}

        internal static void AddAssets(EAIAsset asset)
        {
            if (IsAssetsInDataBase(asset))
            {
                EAI.Logger.Info($"Try to add {asset.AssetID} in the data base, it is already in the data base. Validating this asset instead.");
                ValidateAssets(asset);
                return;
            }
            ValidateAssetsDataBase.Add(asset);
        }

        internal static bool IsAssetsInDataBase(EAIAsset asset)
        {
            return IsAssetsInDataBase(asset.AssetID);
        }

        internal static bool IsAssetsInDataBase(string AssetID)
        {
            foreach (var asset in AssetsDataBase)
            {
                if (asset.AssetID == AssetID) return true;
            }

            foreach (var asset in ValidateAssetsDataBase)
            {
                if (asset.AssetID == AssetID) return true;
            }

            return false;
        }

        internal static EAIAsset GetEAIAsset(string AssetID)
        {
            foreach (var asset in AssetsDataBase)
            {
                if (asset.AssetID == AssetID) return asset;
            }
            EAI.Logger.Warn($"Try to get an asset with this ID '{AssetID}', but it's not in the dataBase");
            return EAIAsset.Null;
        }

        internal static bool TryGetEAIAsset(string AssetID, out EAIAsset asset)
        {
            asset = AssetsDataBase.Find(asset => asset.AssetID == AssetID);
            return asset != EAIAsset.Null;
        }


        internal static int GetAssetHash(string assetFolder)
        {
            DirectoryInfo directoryInfo = new(assetFolder);
            int hash = 0;
            foreach (FileInfo file in directoryInfo.GetFiles())
            {
                hash += file.LastWriteTimeUtc.GetHashCode();
            }
            return hash;
        }

        internal static List<PrefabBase> LoadAsset(string AssetID)
        {
            return LoadAsset(GetEAIAsset(AssetID));
        }

        internal static List<PrefabBase> LoadAsset(EAIAsset asset)
        {
            List<PrefabBase> output = new();

            List<PrefabAsset> prefabAssets = new();

            string assetPath = Path.Combine(AssetDataBaseEAI.kRootPath, asset.AssetPath);

            if (!Directory.Exists(assetPath)) return output;

            foreach (string s in DefaultAssetFactory.instance.GetSupportedExtensions())
            {
                foreach (string file in Directory.GetFiles(assetPath, $"*{s}"))
                {
                    string assetSubPath = assetPath.Replace(AssetDataBaseEAI.kRootPath + Path.DirectorySeparatorChar, "");
                    AssetDataPath assetDataPath = AssetDataPath.Create(assetSubPath, Path.GetFileName(file), true, EscapeStrategy.None); //Path.GetDirectoryName(file)
                    //EAI.Logger.Info($"Loading asset {assetDataPath}.");
                    try
                    {
                        //if (!assetDataBaseEAI.Exists(assetDataPath, out IAssetData assetData)) continue;
                        IAssetData assetData = assetDataBaseEAI.AddAsset(assetDataPath);
                        if (assetData is PrefabAsset prefabAsset) prefabAssets.Add(prefabAsset);
                    }
                    catch (Exception e)
                    {
                        EAI.Logger.Warn(e);
                    }
                }
            }

            foreach (PrefabAsset prefabAsset in prefabAssets)
            {
                if (!prefabAsset.isValid)
                {
                    EAI.Logger.Info($"Prefab Asset wasn't valid, prefab asset path: {prefabAsset.path}, prefab asset id: {prefabAsset.id} ");
                    continue;
                }
                //EAI.Logger.Info($"Loading prefab {prefabAsset.path} subPath {prefabAsset.subPath}.");
                PrefabBase prefabBase = prefabAsset.Load<PrefabBase>();
                if (EL.m_PrefabSystem.TryGetPrefab(prefabBase.GetPrefabID(), out PrefabBase prefabBase1))
                {
                    prefabBase = prefabBase1;
                }
                else
                {
                    EL.m_PrefabSystem.AddPrefab(prefabBase);
                }
                output.Add(prefabBase);
            }

            ValidateAssets(asset);
            return output;
        }

        public static void RemoveAllPrefab()
        {
            IEnumerable<IAssetData> assetsData = assetDataBaseEAI.AllAssets();

            foreach (IAssetData assetData in assetsData)
            {
                if (assetData is not PrefabAsset prefabAsset) continue;

                PrefabBase prefabBase = prefabAsset.Load<PrefabBase>();

                if (EL.m_PrefabSystem.RemovePrefab(prefabBase)) continue;

                EAI.Logger.Warn($"Failed to remove prefab {assetData.name} from prefab system.");

            }
        }

        internal static void CheckIfDataBaseNeedToBeRelocated(bool saveSettings = true)
        {
            string newPath = EAI.m_Setting.SavedDatabasePath ?? eaiDataBase.ActualDataBasePath;

            if (EAI.m_Setting.SavedDatabasePath == null)
            {
                EAI.m_Setting.SavedDatabasePath = newPath;
                if (saveSettings) EAI.m_Setting.ApplyAndSave();
            }

            if (newPath != eaiDataBase.ActualDataBasePath)
            {
                if (!RelocateAssetDataBase(newPath))
                {
                    EAI.m_Setting.SavedDatabasePath = eaiDataBase.ActualDataBasePath;
                    if (saveSettings) EAI.m_Setting.ApplyAndSave();
                }
            }
        }

        public static bool RelocateAssetDataBase(string newDirectory)
        {
            if (!Directory.Exists(newDirectory)) return false;

            if (newDirectory == eaiDataBase.ActualDataBasePath) return false;

            if (!Directory.Exists(eaiDataBase.ActualDataBasePath))
            {
                eaiDataBase.ActualDataBasePath = newDirectory;
                SaveDataBase();
                return true;
            }

            //RemoveAllPrefab();
            //AssetDatabase.global.UnregisterDatabase(assetDataBaseEAI).Wait();
            //assetDataBaseEAI.Dispose();

            try
            {
                Directory.Delete(newDirectory, false);
                Directory.Move(eaiDataBase.ActualDataBasePath, newDirectory);
                eaiDataBase.ActualDataBasePath = newDirectory;
                SaveDataBase();
            }
            catch (Exception ex)
            {
                EAI.Logger.Warn($"Failed to relocate the asset database, this could be because you try to move the database in a non empty folder.\nActual path : {eaiDataBase.ActualDataBasePath},\nthe target new path : {newDirectory}. \nHere is the error {ex.ToString()}");
                return false;
            }

            //AssetDatabase.global.RegisterDatabase(assetDataBaseEAI).Wait();

            //EAI.Initialize();

            return true;
        }
    }

    internal class EAIDataBase
    {
        public int DataBaseVersion = 0;
        public string ActualDataBasePath = Path.Combine(EAI.pathModsData, "Database");
        public List<EAIAsset> AssetsDataBase = new List<EAIAsset>();
    }

    public struct EAIAsset
    {
        public static EAIAsset Null => default;
        public string AssetID { get; set; }
        public int AssetHash { get; set; }
        public string AssetPath { get; set; }

        public EAIAsset(string assetID, int assetHash, string assetPath)
        {
            AssetID = assetID;
            AssetHash = assetHash;
            AssetPath = assetPath;
        }

        public static bool operator ==(EAIAsset lhs, EAIAsset rhs)
        {
            return lhs.AssetID == rhs.AssetID;
        }

        public static bool operator !=(EAIAsset lhs, EAIAsset rhs)
        {
            return !(lhs == rhs);
        }

        public override readonly bool Equals(object compare)
        {
            if (compare is EAIAsset asset)
            {
                return Equals(asset);
            }

            return false;
        }

        public readonly bool Equals(EAIAsset asset)
        {
            return asset.AssetID == AssetID;
        }

        public override readonly int GetHashCode()
        {
            return AssetHash;
        }
    }
}