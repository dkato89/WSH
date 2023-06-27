namespace Domain.Models;

public class ListResult<T>
{
    public IReadOnlyList<T> Items { get; set; }

    public ListResult(IEnumerable<T> items)
    {
        this.Items = items.ToList();
    }
}
