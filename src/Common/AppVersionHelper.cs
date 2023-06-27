namespace Common;

public class AppVersionHelper
{
    public const string Version = "1.0.0";

    public static DateTime ReleaseDate => new FileInfo(typeof(AppVersionHelper).Assembly.Location).LastWriteTime;
}
