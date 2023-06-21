using System.Reflection;

namespace Common.Web
{
    /// <summary>
    /// This class is used to find root path of the web project in;
    /// unit tests (to find views) and entity framework core command line commands (to find conn string).
    /// </summary>
    public static class WebContentDirectoryFinder
    {
        public static string CalculateContentRootFolder()
        {

            var commonAssemblyDirectoryPath = Path.GetDirectoryName(Assembly.GetAssembly(typeof(AppConsts)).Location);
            if (commonAssemblyDirectoryPath == null)
            {
                throw new Exception("Could not find location of Common assembly!");
            }

            var directoryInfo = new DirectoryInfo(commonAssemblyDirectoryPath);
            while (!DirectoryContains(directoryInfo.FullName, "WSH.sln"))
            {
                if (directoryInfo.Parent == null)
                {
                    throw new Exception("Could not find content root folder!");
                }

                directoryInfo = directoryInfo.Parent;
            }

            var webHostFolder = Path.Combine(directoryInfo.FullName, "PKR.Web.Host");
            if (Directory.Exists(webHostFolder))
            {
                return webHostFolder;
            }

            throw new Exception("Could not find root folder of the web project!");
        }

        private static bool DirectoryContains(string directory, string fileName)
        {
            return Directory.GetFiles(directory).Any(filePath => string.Equals(Path.GetFileName(filePath), fileName));
        }
    }
}
