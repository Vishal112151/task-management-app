namespace Backend.DTOs.Task;

public class CreateTaskRequest
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Status { get; set; } = "Pending";

    public string Priority { get; set; } = "Medium";

    public DateTime DueDate { get; set; }
}